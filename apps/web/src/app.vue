<script setup lang="ts">
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import { computed, ref } from "vue";
import {
  Chart,
  ChartDetails,
  DashboardCard,
  Tabs,
  TabsList,
  TabsTrigger,
  ChartFilters,
  Separator,
  LimitReachedDialog,
  type ChartFilterModel,
} from "ui";
import {
  useListTickersQuery,
  useGetForexAggregatesQuery,
  ListTickersMarketEnum,
  ForexAggregatesTimeRangeEnum,
  store
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
const { data: aggregates, isFetching: isAggregatesFetching } = useGetForexAggregatesQuery(
  forexAggregatesQueryOptions,
);

const chartData = computed(() => {
  if (!isAggregatesFetching && (!filters.value.selectedTicker || !aggregates.value?.results)) {
    return [];
  }

  return aggregates.value?.results?.filter(
      (result) => typeof result.t === "number" && typeof result.c === "number",
    )
    .map((result) => ({
      date: new Date(result.t!),
      price: result.c!,
    }));
});

const details = computed(() => {
  if ((!isAggregatesFetching && !filters.value.selectedTicker) || !aggregates.value?.results?.length) return {
    difference: "--",
    isPositive: true,
    percentage: "--",
    currentPrice: "--"
  }
  const values = (aggregates.value?.results);
  const currentPrice = values[values.length - 1].c;
  const firstPrice = values[0].c;

  const difference = Math.abs(firstPrice - currentPrice);
  const isPositive = currentPrice >= firstPrice;
  const percentage = !difference ? 0 : isPositive ? (currentPrice / firstPrice) : (firstPrice / currentPrice);

  return {
    difference,
    isPositive,
    percentage: percentage.toFixed(2),
    currentPrice: currentPrice.toFixed(2)
  }

})

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
  <LimitReachedDialog :open="store.rateLimitReached" />
  <main class="min-h-screen p-2 md:p-4 flex justify-center items-center flex-col">
    <DashboardCard>
      <ChartFilters :markets="MARKETS_OPTIONS" :tickerOptions="tickerOptions" v-model="filters" />
      <ChartDetails
        :filters="filters"
        :currentPrice="details.currentPrice"
        :isPositive="details.isPositive"
        :percentage="details.percentage"
        :currencySymbol="selectedTickerData?.currency_symbol"
        :baseCurrencySymbol="selectedTickerData?.base_currency_symbol"  />
      <Separator />
      <Tabs v-model="timeRange" class="overflow-x-auto">
        <TabsList>
          <TabsTrigger :value="tab" :data-testid="`time-range-tab-${tab}`" v-for="tab in TABS" class="p-4">
            {{ $t("dashboard.filters.periods." + tab) }}
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Chart :data="chartData" />
    </DashboardCard>
    <VueQueryDevtools />
  </main>
</template>
