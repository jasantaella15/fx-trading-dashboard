<script setup lang="ts">
import { Badge } from "@shadcn/ui/badge";
import { TrendingUp, TrendingDown } from "@lucide/vue";
import type { ChartFilterModel } from "./chart-filters.vue";

const props = defineProps<{
    filters: ChartFilterModel
    baseCurrencyName?: string
    currencyName?: string
    baseCurrencySymbol?: string
    currencySymbol?: string
    currentPrice: string
    isPositive: boolean
    percentage: string
}>();
</script>
<template>
    <div class="flex gap-4 justify-center md:justify-start" v-if="filters?.selectedTicker && filters.market == 'fx'">
        <img :src="`https://wise.com/public-resources/assets/flags/rectangle/${baseCurrencySymbol?.toLowerCase()}.png`"
            :alt="baseCurrencyName" />
        <img :src="`https://wise.com/public-resources/assets/flags/rectangle/${currencySymbol?.toLowerCase()}.png`"
            :alt="currencyName" />
        <h2 class="text-xl font-bold">
            {{ baseCurrencySymbol }} - {{ currencySymbol }}
        </h2>
    </div>
    <div class="flex flex-col justify-center items-center gap-4 md:justify-between md:items-start md:flex-row">
        <div class="flex gap-4">
            <div>
                <p class="text-xs uppercase">{{ $t("common.exchange") }}</p>
                <span class="text-xl font-bold uppercase">{{ filters.market }}</span>
            </div>
            <div>
                <p class="text-xs uppercase">
                    {{ $t("dashboard.label.currentPrice") }}
                </p>
                <span class="text-xl font-bold uppercase">{{ currentPrice }}</span>
            </div>
        </div>
        <div>
            <Badge class="px-4 py-2 text-md font-bold [&>svg]:size-6" :variant="isPositive ? 'success' : 'destructive'">
                <TrendingUp v-if="isPositive" />
                <TrendingDown v-else />{{ currentPrice}}({{ percentage }}%)
            </Badge>
        </div>
    </div>
</template>
