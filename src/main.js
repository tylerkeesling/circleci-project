import oidcConfig from '@/config';
import { OktaAuth } from '@okta/okta-auth-js';
import OktaVue from '@okta/okta-vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import App from './App.vue';
import router from './router';

const oktaAuth = new OktaAuth(oidcConfig.oidc);

Vue.use(OktaVue, {
  oktaAuth,
  onAuthRequired: () => router.push({ path: '/login' }),
  onAuthResume: () => router.push({ path: '/login' }),
});
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Loading);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
