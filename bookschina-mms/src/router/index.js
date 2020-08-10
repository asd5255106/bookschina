import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import login from "@/views/login";
import reg from "@/views/reg";
import home from "@/views/home";
import appUsers from "@/views/appUsers";
import appGoods from "@/views/appGoods";
import appOrders from "@/views/appOrders";
// import helloWord from "@/components/HelloWord.vue";

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  // {
  //   path:"/hello",
  //   name:"hello",
  //   component:helloWord
  // },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: { /* 元消息 */
      permission: false  /* 不需要拦截 */
    }
  },
  {
    path: "/reg",
    name: "reg",
    component: reg,
    meta: { /* 元消息 */
      permission: false  /* 不需要拦截 */
    }
  },
  {
    path: "/home",
    name: "home",
    redirect: "/home/users",
    component: home,
    children: [
      // {
      //   path:"/",
      //   redirect: "users"
      // },
      {
        path: "goods",
        name: "goods",
        component: appGoods,
        meta: {
          title: '商品管理'
        }
      },
      {
        path: "users",
        name: "users",
        component: appUsers,
        meta: {
          title: '用户管理'
        }
      },
      {
        path: "orders",
        name: "orders",
        component: appOrders,
        meta: {
          title: '订单管理'
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode:"history",
  routes
});

export default router;
