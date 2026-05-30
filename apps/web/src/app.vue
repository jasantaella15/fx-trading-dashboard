<script setup lang="ts">
import { Button, Page } from "ui";
import { name } from "../package.json";
</script>

<template>
  <Page :app-name="name" />
  <div class="flex w-full p-8 justify-center items-center bg-amber-600">
      <Button>Shared shadcn button</Button>
  </div>
</template>
