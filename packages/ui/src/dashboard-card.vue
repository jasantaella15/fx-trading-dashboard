<script setup lang="ts">
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@shadcn/ui/card'
import { Globe, ChartArea } from '@lucide/vue';
import LanguageSwitch from './molecules/language-switch.vue'
import ThemeSwitch from './molecules/theme-switch.vue';


</script>

<template>
  <Card class=" my-4 w-full md:max-w-8/12">
    <CardHeader class="flex flex-col-reverse items-center lg:grid">
      <div class="flex items-center justify-center gap-2">
        <Globe />
        <CardTitle class="text-xl font-bold text-center">{{ $t('dashboard.title') }}</CardTitle>
        <ChartArea />
      </div>
      <CardAction class="flex items-center gap-2 lg:absolute">
        <LanguageSwitch />
        <ThemeSwitch />
      </CardAction>
    </CardHeader>
    <CardContent class="flex flex-col gap-4">
      <slot />
    </CardContent>
  </Card>
</template>
