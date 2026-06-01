<script setup lang="ts">
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import { computed, ref } from "vue";
import {
  Chart,
  DashboardCard,
  Tabs,
  TabsList,
  TabsTrigger,
  ChartFilters,
  type ChartFilterModel,
} from "ui";
import {
  useListTickersQuery,
  useGetForexAggregatesQuery,
  GetForexAggregatesTimespanEnum,
  ListTickersMarketEnum,
} from "data-access";


// #region Constants
enum Timespan {
  Day = "1d",
  Week = "1w",
  Month = "1m",
  ThreeMonths = "3m",
  SixMonths = "6m",
  Year = "1y",
  All = "all"
}
const TABS = [Timespan.Day, Timespan.Week, Timespan.Month, Timespan.ThreeMonths, Timespan.SixMonths, Timespan.Year, Timespan.All];
const MARKETS_OPTIONS = [
  ListTickersMarketEnum.Fx,
  ListTickersMarketEnum.Crypto,
  ListTickersMarketEnum.Indices,
  ListTickersMarketEnum.Otc,
  ListTickersMarketEnum.Stocks,
];
// #endregion

// #region State
const timeRange = ref("1d");
const filters = ref<ChartFilterModel>({
  market: ListTickersMarketEnum.Fx,
  selectedTicker: "",
});
// #endregion


// #region Ticker
const listTickerQueryOptions = computed(() => ({
  market: filters.value.market as ListTickersMarketEnum,
}));
const { data: tickersData } = useListTickersQuery(listTickerQueryOptions);
// #endregion

// #region Chart
const forexAggregatesQueryOptions = computed(() => {
  const today = new Date();
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(today.getFullYear() - 2);

  return {
    forexTicker: filters.value.selectedTicker,
    multiplier: 1,
    timespan: GetForexAggregatesTimespanEnum.Day,
    to: today.toISOString().split("T")[0],
    from: twoYearsAgo.toISOString().split("T")[0],
  };
});
const { data: aggregates } = useGetForexAggregatesQuery(forexAggregatesQueryOptions);

const chartData = computed(() =>
  (aggregates.value?.results ?? [])
    .filter(
      (result) => typeof result.t === "number" && typeof result.c === "number",
    )
    .map((result) => ({
      date: new Date(result.t!),
      price: result.c!,
    })),
);

const filteredChartData = computed(() => {
  const data = chartData.value;
  const latestPoint = data[data.length - 1];

  if (!latestPoint || timeRange.value === "all") {
    return data;
  }

  const daysByRange: Record<string, number> = {
    "1d": 1,
    "1w": 7,
    "1m": 30,
    "3m": 90,
    "6m": 180,
    "1y": 365,
  };
  const startDate = new Date(latestPoint.date);
  startDate.setDate(
    startDate.getDate() - (daysByRange[timeRange.value] ?? 365 * 10),
  );

  return data.filter((item) => item.date >= startDate);
});
// #endregion

// #region Computed
const tickers = computed(() => tickersData.value?.results ?? []);
const selectedTickerData = computed(() => tickers.value.find((t) => t.ticker === filters.value.selectedTicker));
const tickerOptions = computed(() =>
  tickers.value.map((ticker) => ({
    value: ticker.ticker,
    label: `${ticker.ticker} - ${ticker.base_currency_name} - ${ticker.currency_name}`,
  })),
);
// #endregion

</script>
<template>
  <main class="h-screen p-2 md:p-8 flex justify-center items-center flex-col">
    <DashboardCard>
      <ChartFilters :markets="MARKETS_OPTIONS" :tickerOptions="tickerOptions" v-model="filters" />
      <div class="flex gap-4" v-if="
        filters.selectedTicker && filters.market == ListTickersMarketEnum.Fx
      ">
        <img
          :src="`https://wise.com/public-resources/assets/flags/rectangle/${selectedTickerData?.base_currency_symbol?.toLowerCase()}.png`"
          :alt="selectedTickerData?.base_currency_name" />
        <img
          :src="`https://wise.com/public-resources/assets/flags/rectangle/${selectedTickerData?.currency_symbol?.toLowerCase()}.png`"
          :alt="selectedTickerData?.currency_name" />
        <h2 class="text-xl font-bold">
          {{ selectedTickerData?.base_currency_symbol }} -
          {{ selectedTickerData?.currency_symbol }}
        </h2>
      </div>
      <Tabs v-model="timeRange" class="overflow-x-auto">
        <TabsList>
          <TabsTrigger :value="tab" v-for="tab in TABS" class="p-4">
            {{ $t("dashboard.filters.periods." + tab) }}
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Chart :data="filteredChartData" />
    </DashboardCard>
    <VueQueryDevtools />
  </main>
</template>
