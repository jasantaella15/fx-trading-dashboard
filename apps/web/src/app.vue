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
  Separator,
  Badge,
  type ChartFilterModel,
} from "ui";
import {
  useListTickersQuery,
  useGetForexAggregatesQuery,
  ListTickersMarketEnum,
  ForexAggregatesTimeRangeEnum,
} from "data-access";

// #region Constants
const TABS = [
  ForexAggregatesTimeRangeEnum.Day,
  ForexAggregatesTimeRangeEnum.Week,
  ForexAggregatesTimeRangeEnum.Month,
  ForexAggregatesTimeRangeEnum.ThreeMonths,
  ForexAggregatesTimeRangeEnum.SixMonths,
  ForexAggregatesTimeRangeEnum.Year,
  ForexAggregatesTimeRangeEnum.All,
];
const MARKETS_OPTIONS = [
  ListTickersMarketEnum.Fx,
  ListTickersMarketEnum.Crypto,
  ListTickersMarketEnum.Indices,
  ListTickersMarketEnum.Otc,
  ListTickersMarketEnum.Stocks,
];
// #endregion

// #region State
const timeRange = ref<ForexAggregatesTimeRangeEnum>(ForexAggregatesTimeRangeEnum.Day);
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
  return {
    forexTicker: filters.value.selectedTicker,
    timeRange: timeRange.value
  }
});
const { data: aggregates } = useGetForexAggregatesQuery(
  forexAggregatesQueryOptions,
);

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

// #endregion

// #region Computed
const tickers = computed(() => tickersData.value?.results ?? []);
const selectedTickerData = computed(() =>
  tickers.value.find((t) => t.ticker === filters.value.selectedTicker),
);
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
      <div class="flex gap-4 justify-center md:justify-start" v-if="
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
      <div class="flex flex-col justify-center items-center gap-4 md:justify-between md:items-start md:flex-row">
        <div class="flex gap-4">
          <div>
            <p class="text-xs uppercase">{{ $t("common.exchange") }}</p>
            <span class="text-xl font-bold uppercase">{{ filters.market }}</span>
          </div>
          <div>
            <p class="text-xs uppercase">{{ $t("dashboard.label.currentPrice") }}</p>
            <span class="text-xl font-bold uppercase">0.01232</span>
          </div>
        </div>
        <div>
          <Badge class="px-4 py-2 text-md font-bold" variant="success"> 0.23123 (1.41%)</Badge>
        </div>
      </div>
      <Separator class="my-4" />
      <Tabs v-model="timeRange" class="overflow-x-auto">
        <TabsList>
          <TabsTrigger :value="tab" v-for="tab in TABS" class="p-4">
            {{ $t("dashboard.filters.periods." + tab) }}
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Chart :data="chartData" />
    </DashboardCard>
    <VueQueryDevtools />
  </main>
</template>
