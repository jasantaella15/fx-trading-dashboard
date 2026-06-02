<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@shadcn/ui/dialog'
import { Spinner } from '@shadcn/ui/spinner'

const props = defineProps<{
  open?: boolean;
}>();


</script>

<template>
  <Dialog :open="props.open">
      <DialogContent :show-close-button="false" class="sm:max-w-[425px]">
        <DialogHeader class="items-center justify-center">
            <Spinner class="size-12" />
            <DialogTitle>{{ $t("dialog.limit.title") }}</DialogTitle>
          <DialogDescription>{{ $t("dialog.limit.description") }}</DialogDescription>
        </DialogHeader>
      </DialogContent>
  </Dialog>
</template>
