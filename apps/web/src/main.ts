import { createApp } from "vue";
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { experimental_createQueryPersister } from "@tanstack/query-persist-client-core";
import { createI18n } from "vue-i18n";

import "./styles.css";
import App from "./app.vue";
import en from './i18n/en.json'
import mt from './i18n/mt.json'
import fr from './i18n/fr.json'



const app = createApp(App);

const persister = experimental_createQueryPersister({
  storage: window.localStorage,
  maxAge: 1000 * 60 * 60 * 24,
  prefix: 'FX-TRADING'
})

const appQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            gcTime: 1000 * 60 * 5,
            staleTime: 1000 * 60 * 5,
            persister: persister.persisterFn,
            retry: false
        }
    }
})
app.use(VueQueryPlugin, { queryClient: appQueryClient })


const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    mt,
    fr
  }
})

app.use(i18n)
app.mount("#app");
