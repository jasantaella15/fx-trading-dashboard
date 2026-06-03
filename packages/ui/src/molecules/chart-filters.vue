<script setup lang="ts">
import { computed } from "vue";
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectValue } from '@shadcn/ui/select'
import { Combobox, type ComboboxOption } from '@shadcn/ui/combobox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shadcn/ui/form'
import type { ChartFilterModel } from './chart-filters.types'

defineProps<{
    markets: Array<string>;
    tickerOptions: Array<ComboboxOption>,
}>();

const model = defineModel<ChartFilterModel>({
    default: () => ({
        market: "",
        selectedTicker: "",
    }),
});

const market = computed({
    get: () => model.value.market ?? "",
    set: (market) => {
        model.value = {
            market,
            selectedTicker: market === model.value.market ? model.value.selectedTicker ?? "" : "",
        };
    },
});

const selectedTicker = computed({
    get: () => model.value.selectedTicker ?? "",
    set: (selectedTicker) => {
        model.value = {
            ...model.value,
            selectedTicker,
        };
    },
});
</script>
<template>
    <Form class="w-full flex flex-col gap-4">
        <FormField name="market" >
            <FormItem class="w-full">
                <FormLabel class="capitalize">{{ $t("common.exchange") }} </FormLabel>
                <FormControl>
                    <Select v-model="market" name="exchange">
                        <SelectTrigger class="w-full" data-testid="exchange-select">
                            <SelectValue :placeholder="$t('dashboard.filters.exchange.placeholder')" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem :value="option" :data-testid="`exchange-option-${option}`" v-for="option in markets">
                                    {{ option.toLocaleUpperCase() }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </FormControl>
            </FormItem>
        </FormField>
        <FormField name="ticker">
            <FormItem class="w-full min-w-0">
                <FormLabel class="capitalize">{{ $t("common.primarySymbol") }} </FormLabel>
                <FormControl>
                    <Combobox v-model="selectedTicker" :options="tickerOptions"
                        test-id="primary-symbol-combobox"
                        :placeholder="$t('dashboard.filters.primarySymbol.placeholder')"
                        :search-placeholder="$t('dashboard.filters.primarySymbol.searchPlaceholder')"
                        class="w-full" />
                </FormControl>
            </FormItem>
        </FormField>
    </Form>
</template>
