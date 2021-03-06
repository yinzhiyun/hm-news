import Vue from "vue";
import App from "./App.vue";
import router from "./router";
//导入vuex
import store from "./store";
//导入通用样式
import "./styles/base.less";
//导入万恶之源rem自动布局
import "lib-flexible";
//导入字体图标库
import "./styles/iconfont.css";
//导入axios发送请求
import axios from "axios";
//导入vant组件库
import {
  Toast,
  Dialog,
  Button,
  Field,
  CellGroup,
  Cell,
  Radio,
  RadioGroup,
  Uploader,
  List,
  Tab,
  Tabs,
  PullRefresh
} from "vant";
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Field);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Uploader);
Vue.use(List);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(PullRefresh);

//配置vue cropper
import VueCropper from "vue-cropper";
Vue.use(VueCropper);

//配置axios参数
axios.defaults.baseURL = "http://localhost:3000";
Vue.prototype.$axios = axios;
// 配置响应拦截器
axios.interceptors.response.use(function(res) {
  const { statusCode, message } = res.data;
  if (statusCode === 401 && message === "用户信息验证失败") {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("column");
    localStorage.removeItem("delcolumn");
    router.push("/login");
  }
  return res;
});
//配置请求拦截器
axios.interceptors.request.use(function(req) {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers = {
      Authorization: token
    };
  }

  return req;
});

//导入全局组件库
import HmHeader from "./components/HmHeader.vue";
import HmEntrance from "./components/HmEntrance.vue";
import HmInput from "./components/HmInput.vue";
import Navbar from "./components/Navbar.vue";
import HmPost from "./components/HmPost.vue";
import HmComment from "./components/HmComment.vue";
//注册全局组件
Vue.component("hm-header", HmHeader);
Vue.component("hm-entrance", HmEntrance);
Vue.component("hm-input", HmInput);
Vue.component("hm-navbar", Navbar);
Vue.component("hm-post", HmPost);
Vue.component("hm-comment", HmComment);

//注册全局过滤器
import moment from "moment";
Vue.filter("date", function(input, format = "YYYY-MM-DD") {
  return moment(input).format(format);
});
Vue.filter("date2", function(input) {
  const him = new Date(input);
  const now = new Date().getTime();
  let time = ((now - him) / 1000 / 60 / 60) | 0;
  if (time < 1) {
    return "刚刚";
  } else if (time < 24 && time > 1) {
    return time + "小时前";
  } else {
    return moment(input).format("YYYY-MM-DD HH:mm");
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
