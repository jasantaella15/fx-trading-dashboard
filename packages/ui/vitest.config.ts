import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@shadcn/components': fileURLToPath(new URL('./@shadcn/components', import.meta.url)),
      '@shadcn/composables': fileURLToPath(new URL('./@shadcn/composables', import.meta.url)),
      '@shadcn/lib': fileURLToPath(new URL('./@shadcn/lib', import.meta.url)),
      '@shadcn/styles': fileURLToPath(new URL('./@shadcn/styles', import.meta.url)),
      '@shadcn/ui': fileURLToPath(new URL('./@shadcn/ui', import.meta.url)),
      '@shadcn/utils': fileURLToPath(new URL('./@shadcn/utils.ts', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
