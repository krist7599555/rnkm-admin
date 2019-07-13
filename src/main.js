import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

import Buefy from 'buefy';
import 'buefy/src/scss/buefy-build.scss';
// import 'buefy/src/scss/buefy.scss';
import '@fortawesome/fontawesome-free/scss/solid.scss';
import '@fortawesome/fontawesome-free/scss/brands.scss';
import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
import './main.scss';
Vue.use(Buefy, {
  defaultIconPack: 'fas'
});

import VueScrollTo from 'vue-scrollto';
Vue.use(VueScrollTo);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
