<script setup lang="ts">
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import { computed, ref, watch } from "vue";
import {
  Chart,
  Combobox,
  DashboardCard,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsList,
  TabsTrigger,
} from "ui";
import {
  useListTickersQuery,
  useGetForexAggregatesQuery,
  GetForexAggregatesTimespanEnum,
  ListTickersMarketEnum,
} from "data-access";

const selectedTicker = ref("");
const timeRange = ref("1d");
const market = ref(ListTickersMarketEnum.Fx);

watch(
  () => market.value,
  () => {
    selectedTicker.value = "";
  },
);

const TABS = ["1d", "1w", "1m", "3m", "6m", "1y", "all"];
const MARKETS_OPTIONS = [
  ListTickersMarketEnum.Fx,
  ListTickersMarketEnum.Crypto,
  ListTickersMarketEnum.Indices,
  ListTickersMarketEnum.Otc,
  ListTickersMarketEnum.Stocks,
];

const listTicketQueryOptions = computed(() => ({
  market: market.value,
}));
const { data: tickersData } = useListTickersQuery(listTicketQueryOptions);

const forexAggregatesQueryOptions = computed(() => {
  const today = new Date();
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(today.getFullYear() - 2);

  return {
    forexTicker: selectedTicker.value,
    multiplier: 1,
    timespan: GetForexAggregatesTimespanEnum.Day,
    to: today.toISOString().split("T")[0],
    from: twoYearsAgo.toISOString().split("T")[0],
  };
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

const tickers = computed(() => tickersData.value?.results ?? []);
const selectedTickerData = computed(() =>
  tickers.value.find((t) => t.ticker === selectedTicker.value),
);
const tickerOptions = computed(() =>
  tickers.value.map((ticker) => ({
    value: ticker.ticker,
    label: `${ticker.ticker} - ${ticker.base_currency_name} - ${ticker.currency_name}`,
  })),
);
</script>
<template>
  <main class="h-screen p-8 flex justify-center items-center flex-col">
    <DashboardCard>
      <Select v-model="market">
        <SelectTrigger class="w-full">
          <SelectValue
            :placeholder="$t('dashboard.filters.exchange.placeholder')"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{{ $t("common.exchange") }}</SelectLabel>
            <SelectItem :value="option" v-for="option in MARKETS_OPTIONS">
              {{ option.toLocaleUpperCase() }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Combobox
        v-model="selectedTicker"
        :options="tickerOptions"
        :placeholder="$t('dashboard.filters.primarySymbol.placeholder')"
        :search-placeholder="
          $t('dashboard.filters.primarySymbol.searchPlaceholder')
        "
        class="w-full"
      />
      <div
        class="flex gap-4"
        v-if="selectedTicker && market == ListTickersMarketEnum.Fx"
      >
        <img
          :src="`https://wise.com/public-resources/assets/flags/rectangle/${selectedTickerData?.base_currency_symbol?.toLowerCase()}.png`"
          :alt="selectedTickerData?.base_currency_name"
        />
        <img
          :src="`https://wise.com/public-resources/assets/flags/rectangle/${selectedTickerData?.currency_symbol?.toLowerCase()}.png`"
          :alt="selectedTickerData?.currency_name"
        />
        <h2 class="text-xl font-bold">
          {{ selectedTickerData?.base_currency_symbol }} -
          {{ selectedTickerData?.currency_symbol }}
        </h2>
      </div>
      <Tabs v-model="timeRange">
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
