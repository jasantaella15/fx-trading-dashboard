<script setup lang="ts">
import { ChartNetwork } from "@lucide/vue";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@shadcn/ui/empty";
</script>

<template>
    <Empty>
        <EmptyHeader>
            <EmptyMedia variant="icon">
                <ChartNetwork />
            </EmptyMedia>
            <EmptyTitle>{{ $t("chart.empty.title") }}</EmptyTitle>
            <EmptyDescription>
                {{ $t("chart.empty.description") }}
            </EmptyDescription>
        </EmptyHeader>
    </Empty>
</template>
