import {createApp} from 'vue'
import {createPinia} from "pinia";
import {Calendar, DatePicker} from 'v-calendar';

import 'v-calendar/style.css';
import './assets/input.css'
import './assets/styles.css'

import App from './App.vue'
import router from "./router";
import InitAPIClient from "@/server/InitAPI.ts";

const app = createApp(App);
const pinia = createPinia()
const api = new InitAPIClient()

api.init().then(async (): Promise<void> => {
  app.component('VCalendar', Calendar)
  app.component('VDatePicker', DatePicker)
  app.use(pinia)
  app.use(router)

  api.retrieve()

  app.mount('#app')
})

