<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@shadcn/ui/select'

const LANGUAGE_OPTIONS = [
    { value: 'en', label: 'English', flagCode: 'gb' },
    { value: 'fr', label: 'Français', flagCode: 'fr' },
    { value: 'mt', label: 'Malti', flagCode: 'mt' },
];

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


onMounted(() => {
  selectedLanguage.value = localStorage.getItem('locale') ?? locale.value;
});

</script>

<template>
    <Select v-model="selectedLanguage">
        <SelectTrigger class="h-8 w-[92px] gap-2 px-2">
            <img :src="`https://flagcdn.com/24x18/${currentLanguage.flagCode}.png`"
                :srcset="`https://flagcdn.com/48x36/${currentLanguage.flagCode}.png 2x, https://flagcdn.com/72x54/${currentLanguage.flagCode}.png 3x`"
                :alt="currentLanguage.label" class="h-3.5 w-5 shrink-0 rounded-[1px] object-cover" />
            <SelectValue>
                {{ currentLanguage.value.toUpperCase() }}
            </SelectValue>
        </SelectTrigger>
        <SelectContent align="end">
            <SelectItem v-for="language in LANGUAGE_OPTIONS" :key="language.value" :value="language.value">
                <span class="flex items-center gap-2">
                    <img :src="`https://flagcdn.com/24x18/${language.flagCode}.png`"
                        :srcset="`https://flagcdn.com/48x36/${language.flagCode}.png 2x, https://flagcdn.com/72x54/${language.flagCode}.png 3x`"
                        :alt="language.label" class="h-3.5 w-5 shrink-0 rounded-[1px] object-cover" />
                    <span>{{ language.value.toUpperCase() }}</span>
                </span>
            </SelectItem>
        </SelectContent>
    </Select>
</template>
