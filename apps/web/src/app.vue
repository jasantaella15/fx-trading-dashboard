<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { Button, Page } from "ui";
import { useListTickersQuery } from "data-access";
import { name } from "../package.json";


const { data } = useListTickersQuery();

</script>

<template>
  <Page :app-name="name" />
  <div class="flex w-full p-8 justify-center items-center bg-amber-600">
      <Button>Shared shadcn button</Button>
      {{  data?.results?.toString() }}
  </div>
  <VueQueryDevtools />
</template>