<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@shadcn/ui/card'
import { Button } from '@shadcn/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn/ui/select'
import { Globe, ChartArea, Moon, Sun } from '@lucide/vue';

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English', flagCode: 'gb' },
  { value: 'fr', label: 'Français', flagCode: 'fr' },
  { value: 'mt', label: 'Malti', flagCode: 'mt' },
];

const isDarkMode = ref(false);
const { locale } = useI18n({ useScope: 'global' });

const currentLanguage = computed(() =>
  LANGUAGE_OPTIONS.find((language) => language.value === locale.value) ?? LANGUAGE_OPTIONS[0],
);

const selectedLanguage = computed({
  get: () => locale.value,
  set: (value) => {
    const language = LANGUAGE_OPTIONS.find((option) => option.value === value) ?? LANGUAGE_OPTIONS[0];

    locale.value = language.value;
    localStorage.setItem('locale', language.value);
  },
});

function setTheme(isDark: boolean) {
  isDarkMode.value = isDark;
  document.documentElement.classList.toggle('dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function toggleTheme() {
  setTheme(!isDarkMode.value);
}

onMounted(() => {
  setTheme(localStorage.getItem('theme') === 'dark');
  selectedLanguage.value = localStorage.getItem('locale') ?? locale.value;
});
</script>

<template>
    <Card class=" my-4 w-full md:max-w-8/12">
      <CardHeader class="flex flex-col-reverse items-center lg:grid">
        <div class="flex items-center justify-center gap-2">
          <Globe/>
          <CardTitle class="text-xl font-bold text-center">{{ $t('dashboard.title') }}</CardTitle>
          <ChartArea/>
        </div>
        <CardAction class="flex items-center gap-2 lg:absolute">
          <Select v-model="selectedLanguage">
            <SelectTrigger class="h-8 w-[92px] gap-2 px-2">
              <img
                :src="`https://flagcdn.com/24x18/${currentLanguage.flagCode}.png`"
                :srcset="`https://flagcdn.com/48x36/${currentLanguage.flagCode}.png 2x, https://flagcdn.com/72x54/${currentLanguage.flagCode}.png 3x`"
                :alt="currentLanguage.label"
                class="h-3.5 w-5 shrink-0 rounded-[1px] object-cover"
              />
              <SelectValue>
                {{ currentLanguage.value.toUpperCase() }}
              </SelectValue>
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem
                v-for="language in LANGUAGE_OPTIONS"
                :key="language.value"
                :value="language.value"
              >
                <span class="flex items-center gap-2">
                  <img
                    :src="`https://flagcdn.com/24x18/${language.flagCode}.png`"
                    :srcset="`https://flagcdn.com/48x36/${language.flagCode}.png 2x, https://flagcdn.com/72x54/${language.flagCode}.png 3x`"
                    :alt="language.label"
                    class="h-3.5 w-5 shrink-0 rounded-[1px] object-cover"
                  />
                  <span>{{ language.value.toUpperCase() }}</span>
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon-sm"
            :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleTheme"
          >
            <Sun v-if="isDarkMode" class="size-4" />
            <Moon v-else class="size-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
      <slot />
      </CardContent>
    </Card>
</template>
