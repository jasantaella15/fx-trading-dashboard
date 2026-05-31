<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@shadcn/ui/card'
</script>

<template>
    <Card class="w-full md:max-w-8/12">
      <CardHeader >
        <CardTitle class="text-center">{{ $t('dashboard.title') }}</CardTitle>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
      <slot />
      </CardContent>
    </Card>
</template>
