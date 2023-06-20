/* DEFAULT */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

/* PLUGINS */
import ScreenWidth from "./plugins/ScreenWidth";

/* CSS */
import "@/assets/css/global.css";
import "@/assets/css/variables.css";

Vue.config.productionTip = false;
Vue.use(ScreenWidth);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
