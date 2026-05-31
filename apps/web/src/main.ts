import { createApp } from "vue";
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { experimental_createQueryPersister } from "@tanstack/query-persist-client-core";
import "./styles.css";
import App from "./app.vue";

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
            persister: persister.persisterFn
        }
    }
})
app.use(VueQueryPlugin, { queryClient: appQueryClient })
app.mount("#app");