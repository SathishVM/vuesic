import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidatePlugin from './plugins/validation';
import './assets/tailwind.css';
import './assets/main.css';

createApp(App)
  .use(store)
  .use(router)
  .use(VeeValidatePlugin)
  .mount('#app');
