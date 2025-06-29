import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'leaflet/dist/leaflet.css';
import { createPinia } from 'pinia'
import './style.css';

const pinia = createPinia()

createApp(App).use(pinia).use(router).mount('#app');