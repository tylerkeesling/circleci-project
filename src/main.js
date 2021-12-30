import { OktaAuth } from "@okta/okta-auth-js";
import OktaVue from "@okta/okta-vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

const oktaAuth = new OktaAuth({
  issuer: `https://${process.env.VUE_APP_OKTA_DOMAIN}/oauth2/default`,
  clientId: process.env.VUE_APP_OKTA_CLIENT_ID,
  redirectUri: window.location.origin + "/login/callback",
});

Vue.use(OktaVue, {
  oktaAuth,
  // onAuthRequired: () => {
  //   router.push({ path: "/login" });
  // },
});
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
