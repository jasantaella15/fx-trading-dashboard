<script setup lang="ts">
import type { ChartConfig } from "@shadcn/ui/chart";

import { VisArea, VisAxis, VisLine, VisXYContainer } from "@unovis/vue";
import {
  ChartContainer,
  ChartCrosshair,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from "@shadcn/ui/chart";

import ChartEmpty from "./chart-empty.vue";

type Data = { date: Date; price: number };

const props = defineProps<{
  data?: Array<Data>;
}>();

const chartConfig = {
  price: {
    label: "Price",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const svgDefs = `
  <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
    <stop
      offset="5%"
      stop-color="var(--color-price)"
      stop-opacity="0.8"
    />
    <stop
      offset="95%"
      stop-color="var(--color-price)"
      stop-opacity="0.1"
    />
  </linearGradient>
`;

const priceFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 6,
});

</script>

<template>
  <div
    class="relative px-2"
    role="img"
    data-testid="price-chart"
    :data-state="data && data.length >= 2 ? 'ready' : 'empty'"
  >
    <ChartEmpty v-if="data && data.length < 2" :is-enough="data.length > 1" />
    <ChartContainer v-else :config="chartConfig" class="aspect-auto h-[250px] w-full" :cursor="false">
      <VisXYContainer :data="props.data" :svg-defs="svgDefs">
        <VisArea :x="(d: Data) => d.date" :y="[(d: Data) => d.price]" :color="(d: Data, i: number) => 'url(#fillPrice)'"
          :opacity="0.6" />
        <VisLine :x="(d: Data) => d.date" :y="[(d: Data) => d.price]"
          :color="(d: Data, i: number) => chartConfig.price.color" :line-width="1" />
        <VisAxis type="x" :x="(d: Data) => d.date" :tick-line="false" :domain-line="false" :grid-line="false"
          :num-ticks="6" :tick-format="(d: number, index: number) => {
              const date = new Date(d);
              return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              });
            }
            " />
        <VisAxis type="y" :num-ticks="3" :tick-line="false" :domain-line="false" />
        <ChartTooltip />
        <ChartCrosshair :template="componentToString(chartConfig, ChartTooltipContent, {
          labelFormatter: (d) => {
            return new Date(d).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: '2-digit'
            });
          },
          valueFormatter: (value) => {
            return typeof value === 'number'
              ? priceFormatter.format(value)
              : String(value);
          },
        })
          " :color="(d: Data, i: number) => chartConfig.price.color" />
      </VisXYContainer>
    </ChartContainer>
    
  </div>
</template>
