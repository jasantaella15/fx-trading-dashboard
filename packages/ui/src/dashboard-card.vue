<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@shadcn/ui/card'
import { Globe, ChartArea } from '@lucide/vue';
</script>

<template>
    <Card class="w-full md:max-w-8/12">
      <CardHeader class="flex justify-center items-center">
        <Globe/>
        <CardTitle class="text-xl font-bold">{{ $t('dashboard.title') }}</CardTitle>
        <ChartArea/>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
      <slot />
      </CardContent>
    </Card>
</template>
