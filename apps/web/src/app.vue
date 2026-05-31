<script setup lang="ts">
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import { computed, ref } from "vue";
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
import { useListExchangesQuery, useListTickersQuery, useGetForexAggregatesQuery, GetForexAggregatesTimespanEnum } from "data-access";

const chartData = [
  { date: new Date("2024-04-01"), price: 222 },
  { date: new Date("2024-04-02"), price: 97 },
  { date: new Date("2024-04-03"), price: 167 },
  { date: new Date("2024-04-04"), price: 242 },
  { date: new Date("2024-04-05"), price: 373 },
  { date: new Date("2024-04-06"), price: 301 },
  { date: new Date("2024-04-07"), price: 245 },
  { date: new Date("2024-04-08"), price: 409 },
  { date: new Date("2024-04-09"), price: 59 },
  { date: new Date("2024-04-10"), price: 261 },
  { date: new Date("2024-04-11"), price: 327 },
  { date: new Date("2024-04-12"), price: 292 },
  { date: new Date("2024-04-13"), price: 342 },
  { date: new Date("2024-04-14"), price: 137 },
  { date: new Date("2024-04-15"), price: 120 },
  { date: new Date("2024-04-16"), price: 138 },
  { date: new Date("2024-04-17"), price: 446 },
  { date: new Date("2024-04-18"), price: 364 },
  { date: new Date("2024-04-19"), price: 243 },
  { date: new Date("2024-04-20"), price: 89 },
  { date: new Date("2024-04-21"), price: 137 },
  { date: new Date("2024-04-22"), price: 224 },
  { date: new Date("2024-04-23"), price: 138 },
  { date: new Date("2024-04-24"), price: 387 },
  { date: new Date("2024-04-25"), price: 215 },
  { date: new Date("2024-04-26"), price: 75 },
  { date: new Date("2024-04-27"), price: 383 },
  { date: new Date("2024-04-28"), price: 122 },
  { date: new Date("2024-04-29"), price: 315 },
  { date: new Date("2024-04-30"), price: 454 },
  { date: new Date("2024-05-01"), price: 165 },
  { date: new Date("2024-05-02"), price: 293 },
  { date: new Date("2024-05-03"), price: 247 },
  { date: new Date("2024-05-04"), price: 385 },
  { date: new Date("2024-05-05"), price: 481 },
  { date: new Date("2024-05-06"), price: 498 },
  { date: new Date("2024-05-07"), price: 388 },
  { date: new Date("2024-05-08"), price: 149 },
  { date: new Date("2024-05-09"), price: 227 },
  { date: new Date("2024-05-10"), price: 293 },
  { date: new Date("2024-05-11"), price: 335 },
  { date: new Date("2024-05-12"), price: 197 },
  { date: new Date("2024-05-13"), price: 197 },
  { date: new Date("2024-05-14"), price: 448 },
  { date: new Date("2024-05-15"), price: 473 },
  { date: new Date("2024-05-16"), price: 338 },
  { date: new Date("2024-05-17"), price: 499 },
  { date: new Date("2024-05-18"), price: 315 },
  { date: new Date("2024-05-19"), price: 235 },
  { date: new Date("2024-05-20"), price: 177 },
  { date: new Date("2024-05-21"), price: 82 },
  { date: new Date("2024-05-22"), price: 81 },
  { date: new Date("2024-05-23"), price: 252 },
  { date: new Date("2024-05-24"), price: 294 },
  { date: new Date("2024-05-25"), price: 201 },
  { date: new Date("2024-05-26"), price: 213 },
  { date: new Date("2024-05-27"), price: 420 },
  { date: new Date("2024-05-28"), price: 233 },
  { date: new Date("2024-05-29"), price: 78 },
  { date: new Date("2024-05-30"), price: 340 },
  { date: new Date("2024-05-31"), price: 178 },
  { date: new Date("2024-06-01"), price: 178 },
  { date: new Date("2024-06-02"), price: 470 },
  { date: new Date("2024-06-03"), price: 103 },
  { date: new Date("2024-06-04"), price: 439 },
  { date: new Date("2024-06-05"), price: 88 },
  { date: new Date("2024-06-06"), price: 294 },
  { date: new Date("2024-06-07"), price: 323 },
  { date: new Date("2024-06-08"), price: 385 },
  { date: new Date("2024-06-09"), price: 438 },
  { date: new Date("2024-06-10"), price: 155 },
  { date: new Date("2024-06-11"), price: 92 },
  { date: new Date("2024-06-12"), price: 492 },
  { date: new Date("2024-06-13"), price: 81 },
  { date: new Date("2024-06-14"), price: 426 },
  { date: new Date("2024-06-15"), price: 307 },
  { date: new Date("2024-06-16"), price: 371 },
  { date: new Date("2024-06-17"), price: 475 },
  { date: new Date("2024-06-18"), price: 107 },
  { date: new Date("2024-06-19"), price: 341 },
  { date: new Date("2024-06-20"), price: 408 },
  { date: new Date("2024-06-21"), price: 169 },
  { date: new Date("2024-06-22"), price: 317 },
  { date: new Date("2024-06-23"), price: 480 },
  { date: new Date("2024-06-24"), price: 132 },
  { date: new Date("2024-06-25"), price: 141 },
  { date: new Date("2024-06-26"), price: 434 },
  { date: new Date("2024-06-27"), price: 448 },
  { date: new Date("2024-06-28"), price: 149 },
  { date: new Date("2024-06-29"), price: 103 },
  { date: new Date("2024-06-30"), price: 446 },
];

const selectedTicker = ref("");
const timeRange = ref("1d");

const TABS = ["1d", "1w", "1m", "3m", "6m", "1y", "all"]

const filterRange = computed(() => {
  return chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 365 * 10;
   if (timeRange.value === "1d") {
      daysToSubtract = 1;
    }
    else if (timeRange.value === "1w") {
      daysToSubtract = 7;
    }
    else if (timeRange.value === "1m") {
      daysToSubtract = 30
    }
    else if (timeRange.value === "3m") {
      daysToSubtract = 90
    }
    else if (timeRange.value === "6m") {
      daysToSubtract = 180
    }
    else if (timeRange.value === "1y") {
      daysToSubtract = 365
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });
});

const { data: tickersData } = useListTickersQuery();
const { data: exchanges } = useListExchangesQuery();

const forexAggregatesQueryOptions = computed(() => ({
  forexTicker: selectedTicker.value,
  multiplier: 1,
  timespan: GetForexAggregatesTimespanEnum.Day,
  from: "2025-01-01",
  to: "2026-01-01"
}))
const { data : aggregates } = useGetForexAggregatesQuery(forexAggregatesQueryOptions);

const tickers = computed(() => tickersData.value?.results ?? []);
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
      <Select>
        <SelectTrigger class="w-[180px]">
          <SelectValue
            :placeholder="$t('dashboard.filters.exchange.placeholder')"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{{ $t("common.exchange") }}</SelectLabel>
            <SelectItem
              :value="exchange.id"
              v-for="exchange in exchanges?.results"
            >
              {{ exchange.name }}
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
      <h1>{{ selectedTicker }}</h1>
      <Tabs v-model="timeRange">
        <TabsList>
           <TabsTrigger :value="tab" v-for="tab in TABS" class="p-4">
            {{ $t("dashboard.filters.periods." + tab) }}
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Chart :data="filterRange" />
    </DashboardCard>
    <VueQueryDevtools />
  </main>
</template>
