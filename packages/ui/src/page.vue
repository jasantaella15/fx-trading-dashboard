<script setup lang="ts">
import { Button } from "@shadcn/ui/button";
import { Alert, AlertDescription } from '@shadcn/ui/alert';
import ChartExample from "./chart-example.vue";

const props = defineProps<{
  appName: string;
}>();

</script>

<template>
  <main class="main">
    <div class="description">
      <p>
        examples/vue-nuxt&nbsp;
        <code class="code">{{ props.appName }}</code>
      </p>
      <Button>Button from ui package ( internal import) </Button>
      <Alert variant="destructive">
        <AlertDescription>
          Alert from ui package (internal import )
        </AlertDescription>
      </Alert>
    </div>
  </main>
  <ChartExample />
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 6rem;
  min-height: 100vh;
}
</style>