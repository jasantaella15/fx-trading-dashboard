import { createApp } from "vue";
import { queryClient } from "data-access"
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createI18n } from "vue-i18n";

import "./styles.css";
import App from "./app.vue";
import en from './i18n/en.json'
import mt from './i18n/mt.json'
import fr from './i18n/fr.json'



const app = createApp(App);

app.use(VueQueryPlugin, { queryClient })


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
