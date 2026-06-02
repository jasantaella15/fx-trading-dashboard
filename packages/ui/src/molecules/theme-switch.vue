<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Button } from '@shadcn/ui/button'
import { Moon, Sun } from '@lucide/vue';

const isDarkMode = ref(false);

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
});
</script>

<template>
    <Button variant="outline" size="icon-sm" :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggleTheme">
        <Sun v-if="isDarkMode" class="size-4" />
        <Moon v-else class="size-4" />
    </Button>
</template>
