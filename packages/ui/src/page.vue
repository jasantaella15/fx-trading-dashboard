<script setup lang="ts">
import ChartExample from "./chart-example.vue";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@shadcn/ui/card'

const props = defineProps<{
  appName: string;
}>();

</script>

<template>
  <main class="h-screen p-8 flex justify-center items-center flex-col">
    <Card class="w-full md:max-w-8/12">
      <CardHeader >
        <CardTitle class="text-center">{{ $t('dashboard.title') }}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartExample />
      </CardContent>
    </Card>
  </main>
</template>
