import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";//引入elementUI的html、js
import "element-ui/lib/theme-chalk/index.css";//引入element的css
import md5 from "md5";   /* 密码单向加密 */
Vue.prototype.$md5 = md5;

Vue.use(ElementUI);//启用element插件:UI框架-用户界面构建

import "./permission";/* 路由守卫 */

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
