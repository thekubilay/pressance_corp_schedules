import {createApp} from 'vue'
import {createPinia} from "pinia";
import {setupCalendar, Calendar, DatePicker} from 'v-calendar';

import 'v-calendar/style.css';
import './assets/input.css'
import './assets/styles.css'

import App from './App.vue'
import router from "./router";

const app = createApp(App);
const pinia = createPinia()
// app.use(setupCalendar, {})
app.use(pinia)
app.use(router)
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)
app.mount('#app')
