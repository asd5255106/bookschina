import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 移动端适配
import 'amfe-flexible';

// 桌面端使用
import '@vant/touch-emulator';

// 密码单向加密
import md5 from "md5";
Vue.prototype.$md5 = md5;

// 路由守卫
import "./permission";

// 导入所有组件
// import Vant from 'vant';
// import 'vant/lib/index.css';
// Vue.use(Vant);

// 按需引入
import vant from './components/vant'
Vue.use(vant);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
