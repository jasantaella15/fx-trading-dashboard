<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import type { ComboboxOption } from ".";
import { Check, ChevronsUpDown, Search } from "@lucide/vue";
import { computed, ref } from "vue";
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
  ComboboxVirtualizer,
} from "reka-ui";
import { cn } from "@shadcn/utils";
import { Button } from "@shadcn/ui/button";

const props = withDefaults(
  defineProps<{
    options: ComboboxOption[];
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    disabled?: boolean;
    class?: HTMLAttributes["class"];
  }>(),
  {
    placeholder: "Select an option",
    searchPlaceholder: "Search...",
    emptyText: "No results found.",
  },
);

const model = defineModel<string>();
const searchTerm = ref("");

const selectedOption = computed(() =>
  props.options.find(option => option.value === model.value),
);

const filteredOptions = computed(() => {
  const query = searchTerm.value.trim().toLowerCase();

  if (!query) {
    return props.options;
  }

  return props.options.filter((option) => {
    return (
      option.label.toLowerCase().includes(query)
      || option.value.toLowerCase().includes(query)
    );
  });
});

function displayValue(value: string) {
  return props.options.find(option => option.value === value)?.label ?? "";
}
</script>

<template>
  <ComboboxRoot
    v-model="model"
    :disabled="disabled"
    :ignore-filter="true"
    :reset-search-term-on-select="true"
  >
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button
          variant="outline"
          role="combobox"
          :disabled="disabled"
          :class="cn('w-[220px] justify-between font-normal', !selectedOption && 'text-muted-foreground', props.class)"
        >
          <span class="truncate">
            {{ selectedOption?.label ?? placeholder }}
          </span>
          <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxPortal>
      <ComboboxContent
        position="popper"
        align="start"
        class="bg-popover text-popover-foreground z-50 mt-1 w-[var(--reka-combobox-trigger-width)] min-w-[220px] overflow-hidden rounded-md border shadow-md"
      >
        <div class="flex items-center border-b px-3">
          <Search class="mr-2 size-4 shrink-0 opacity-50" />
          <ComboboxInput
            v-model="searchTerm"
            :display-value="displayValue"
            :placeholder="searchPlaceholder"
            class="placeholder:text-muted-foreground h-10 w-full bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <ComboboxEmpty class="py-6 text-center text-sm">
          {{ emptyText }}
        </ComboboxEmpty>

        <ComboboxViewport class="max-h-72 overflow-y-auto p-1">
          <ComboboxVirtualizer
            v-slot="{ option }"
            :options="filteredOptions"
            :estimate-size="36"
            :text-content="option => option.label"
          >
            <ComboboxItem
              :value="option.value"
              class="w-full data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex h-9 cursor-default select-none items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              <span class="truncate">{{ option.label }}</span>
              <ComboboxItemIndicator class="absolute right-2 flex size-3.5 items-center justify-center">
                <Check class="size-4" />
              </ComboboxItemIndicator>
            </ComboboxItem>
          </ComboboxVirtualizer>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>
