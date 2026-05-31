<script setup lang="ts">
import type { ChartConfig } from "@shadcn/ui/chart"

// import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { VisArea, VisAxis, VisLine, VisXYContainer } from "@unovis/vue"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcn/ui/card"
import {

  ChartContainer,
  ChartCrosshair,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from "@shadcn/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcn/ui/select"
import { computed, ref } from "vue"

const chartData = [
  { date: new Date("2024-04-01"), price: 222},
  { date: new Date("2024-04-02"), price: 97},
  { date: new Date("2024-04-03"), price: 167},
  { date: new Date("2024-04-04"), price: 242},
  { date: new Date("2024-04-05"), price: 373},
  { date: new Date("2024-04-06"), price: 301},
  { date: new Date("2024-04-07"), price: 245},
  { date: new Date("2024-04-08"), price: 409},
  { date: new Date("2024-04-09"), price: 59},
  { date: new Date("2024-04-10"), price: 261},
  { date: new Date("2024-04-11"), price: 327},
  { date: new Date("2024-04-12"), price: 292},
  { date: new Date("2024-04-13"), price: 342},
  { date: new Date("2024-04-14"), price: 137},
  { date: new Date("2024-04-15"), price: 120},
  { date: new Date("2024-04-16"), price: 138},
  { date: new Date("2024-04-17"), price: 446},
  { date: new Date("2024-04-18"), price: 364},
  { date: new Date("2024-04-19"), price: 243},
  { date: new Date("2024-04-20"), price: 89},
  { date: new Date("2024-04-21"), price: 137},
  { date: new Date("2024-04-22"), price: 224},
  { date: new Date("2024-04-23"), price: 138},
  { date: new Date("2024-04-24"), price: 387},
  { date: new Date("2024-04-25"), price: 215},
  { date: new Date("2024-04-26"), price: 75},
  { date: new Date("2024-04-27"), price: 383},
  { date: new Date("2024-04-28"), price: 122},
  { date: new Date("2024-04-29"), price: 315},
  { date: new Date("2024-04-30"), price: 454},
  { date: new Date("2024-05-01"), price: 165},
  { date: new Date("2024-05-02"), price: 293},
  { date: new Date("2024-05-03"), price: 247},
  { date: new Date("2024-05-04"), price: 385},
  { date: new Date("2024-05-05"), price: 481},
  { date: new Date("2024-05-06"), price: 498},
  { date: new Date("2024-05-07"), price: 388},
  { date: new Date("2024-05-08"), price: 149},
  { date: new Date("2024-05-09"), price: 227},
  { date: new Date("2024-05-10"), price: 293},
  { date: new Date("2024-05-11"), price: 335},
  { date: new Date("2024-05-12"), price: 197},
  { date: new Date("2024-05-13"), price: 197},
  { date: new Date("2024-05-14"), price: 448},
  { date: new Date("2024-05-15"), price: 473},
  { date: new Date("2024-05-16"), price: 338},
  { date: new Date("2024-05-17"), price: 499},
  { date: new Date("2024-05-18"), price: 315},
  { date: new Date("2024-05-19"), price: 235},
  { date: new Date("2024-05-20"), price: 177},
  { date: new Date("2024-05-21"), price: 82},
  { date: new Date("2024-05-22"), price: 81},
  { date: new Date("2024-05-23"), price: 252},
  { date: new Date("2024-05-24"), price: 294},
  { date: new Date("2024-05-25"), price: 201},
  { date: new Date("2024-05-26"), price: 213},
  { date: new Date("2024-05-27"), price: 420},
  { date: new Date("2024-05-28"), price: 233},
  { date: new Date("2024-05-29"), price: 78},
  { date: new Date("2024-05-30"), price: 340},
  { date: new Date("2024-05-31"), price: 178},
  { date: new Date("2024-06-01"), price: 178},
  { date: new Date("2024-06-02"), price: 470},
  { date: new Date("2024-06-03"), price: 103},
  { date: new Date("2024-06-04"), price: 439},
  { date: new Date("2024-06-05"), price: 88},
  { date: new Date("2024-06-06"), price: 294},
  { date: new Date("2024-06-07"), price: 323},
  { date: new Date("2024-06-08"), price: 385},
  { date: new Date("2024-06-09"), price: 438},
  { date: new Date("2024-06-10"), price: 155},
  { date: new Date("2024-06-11"), price: 92},
  { date: new Date("2024-06-12"), price: 492},
  { date: new Date("2024-06-13"), price: 81},
  { date: new Date("2024-06-14"), price: 426},
  { date: new Date("2024-06-15"), price: 307},
  { date: new Date("2024-06-16"), price: 371},
  { date: new Date("2024-06-17"), price: 475},
  { date: new Date("2024-06-18"), price: 107},
  { date: new Date("2024-06-19"), price: 341},
  { date: new Date("2024-06-20"), price: 408},
  { date: new Date("2024-06-21"), price: 169},
  { date: new Date("2024-06-22"), price: 317},
  { date: new Date("2024-06-23"), price: 480},
  { date: new Date("2024-06-24"), price: 132},
  { date: new Date("2024-06-25"), price: 141},
  { date: new Date("2024-06-26"), price: 434},
  { date: new Date("2024-06-27"), price: 448},
  { date: new Date("2024-06-28"), price: 149},
  { date: new Date("2024-06-29"), price: 103},
  { date: new Date("2024-06-30"), price: 446},
]
type Data = typeof chartData[number]

const chartConfig = {
  price: {
    label: "Price",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

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
`

const timeRange = ref("90d")
const filterRange = computed(() => {
  return chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange.value === "30d") {
      daysToSubtract = 30
    }
    else if (timeRange.value === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })
})
</script>

<template>
  <Card class="pt-0">
    <CardHeader class="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
      <div class="grid flex-1 gap-1">
        <CardTitle>Area Chart - Interactive</CardTitle>
        <CardDescription>
          Showing total visitors for the last 3 months
        </CardDescription>
      </div>
      <Select v-model="timeRange">
        <SelectTrigger
          class="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
          aria-label="Select a value"
        >
          <SelectValue placeholder="Last 3 months" />
        </SelectTrigger>
        <SelectContent class="rounded-xl">
          <SelectItem value="90d" class="rounded-lg">
            Last 3 months
          </SelectItem>
          <SelectItem value="30d" class="rounded-lg">
            Last 30 days
          </SelectItem>
          <SelectItem value="7d" class="rounded-lg">
            Last 7 days
          </SelectItem>
        </SelectContent>
      </Select>
    </CardHeader>
    <CardContent class="px-2 pt-4 sm:px-6 sm:pt-6 pb-4">
      <ChartContainer :config="chartConfig" class="aspect-auto h-[250px] w-full" :cursor="false">
        <VisXYContainer
          :data="filterRange"
          :svg-defs="svgDefs"
        >
          <VisArea
            :x="(d: Data) => d.date"
            :y="[(d: Data) => d.price]"
            :color="(d: Data, i: number) => 'url(#fillPrice)'"
            :opacity="0.6"
          />
          <VisLine
            :x="(d: Data) => d.date"
            :y="[(d: Data) => d.price]"
            :color="(d: Data, i: number) => chartConfig.price.color"
            :line-width="1"
          />
          <VisAxis
            type="x"
            :x="(d: Data) => d.date"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
            :num-ticks="6"
            :tick-format="(d: number, index: number) => {
              const date = new Date(d)
              return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })
            }"
          />
          <VisAxis
            type="y"
            :num-ticks="3"
            :tick-line="false"
            :domain-line="false"
          />
          <ChartTooltip />
          <ChartCrosshair
            :template="componentToString(chartConfig, ChartTooltipContent, {
              labelFormatter: (d) => {
                return new Date(d).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              },
            })"
            :color="(d: Data, i: number) => chartConfig.price.color"
          />
        </VisXYContainer>

        <ChartLegendContent />
      </ChartContainer>
    </CardContent>
  </Card>
</template>
