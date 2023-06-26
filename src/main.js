/* DEFAULT */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

/* GLOBAL */
import variables from "./global/variables.js";
import { priceInReal } from "./global/filters";

/* PLUGINS */
import resize from "./plugins/resize.js";
import fetch from "./plugins/fetch.js";

/* CSS */
import "@/assets/css/global.css";
import "@/assets/css/variables.css";
import "@/assets/css/skeleton.css";
import "@/assets/css/transitions.css";

Vue.config.productionTip = false;
Vue.use(variables);
Vue.use(resize);
Vue.use(fetch);

Vue.filter("priceInReal", priceInReal);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
