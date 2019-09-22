import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import vuetify from "./plugins/vuetify";
Vue.use(mavonEditor);
import axios from "axios";

axios.defaults.timeout = 10000; // 请求超时
axios.defaults.baseURL = "http://39.105.168.171:3389"; //"http://39.105.168.171:3389"; // "http://resume.free.idcfengye.com"; //"http://127.0.0.1:9600" //'http://resume.utools.club';
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
