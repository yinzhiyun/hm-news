import Vue from "vue";
import App from "./App.vue";
import router from "./router";
//导入通用样式
import "./styles/base.less";
//导入万恶之源rem自动布局
import "lib-flexible";
//导入字体图标库
import "./styles/iconfont.css";
//导入axios发送请求
import axios from "axios";
//导入vant组件库
import { Toast } from "vant";

Vue.use(Toast);

axios.defaults.baseURL = "http://localhost:3000";
Vue.prototype.$axios = axios;

//导入全局组件库
import HmHeader from "./components/HmHeader.vue";
import HmEntrance from "./components/HmEntrance.vue";
import HmInput from "./components/HmInput.vue";
//注册全局组件
Vue.component("hm-header", HmHeader);
Vue.component("hm-entrance", HmEntrance);
Vue.component("hm-input", HmInput);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
