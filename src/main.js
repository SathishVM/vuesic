import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidatePlugin from './plugins/validation';
import { auth } from './firebase/firebase';
import './assets/tailwind.css';
import './assets/main.css';
import './registerServiceWorker';
import 'nprogress/nprogress.css';
import ProgressBar from './plugins/progressBar';

ProgressBar(router);

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(store);
    app.use(router);
    app.use(VeeValidatePlugin);

    app.mount('#app');
  }
});
