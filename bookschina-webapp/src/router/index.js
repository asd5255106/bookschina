import Vue from "vue";
import VueRouter from "vue-router";

// 主页组件
import Home from '@/views/home'
// 登录组件
import Login from '@/views/login'
// 注册组件
import Reg from '@/views/reg'
// 分类组件
import Books from '@/views/books'
// 购物车组件
import Shopcar from '@/views/shopcar'

// 个人中心组件
import usercenter from '@/views/usercenter'
//商品详情组件
import shopdetails from '@/views/shopdetails'
// 列表页组件
import goodslist from '@/views/goodslist'

// import goodList from '@/views/goodList'
//个人中心的修改个人信息的组件
import personalcenter from '@/views/personalcenter'
// //第1个商品详情页组件
// import good1 from '@/views/1.good'
// //第二个商品详情页组件
// import good2 from '@/views/2.good'
// //第3个商品详情页组件
// import good3 from '@/views/3.good'
// //第4个商品详情页组件
// import good4 from '@/views/4.good'
// //第5个商品详情页组件
// import good5 from '@/views/5.good'
// //第6个商品详情页组件
// import good6 from '@/views/6.good'
// //第7个商品详情页组件
// import good7 from '@/views/7.good'
// //第8个商品详情页组件
// import good8 from '@/views/8.good'
// //第9个商品详情页组件
// import good9 from '@/views/9.good'
// //第10个商品详情页组件
// import good10 from '@/views/10.good'


// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
    // component: Home,
    // meta: { /* 元消息 */
    //   permission: false  /* 不需要拦截 */
    // }
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: { /* 元消息 */
      permission: false  /* 不需要拦截 */
    }
  }, {
    path: "/login",
    name: "login",
    component: Login,
    meta: { /* 元消息 */
      permission: false  /* 不需要拦截 */
    }
  },
  {
    path: "/reg",
    name: "reg",
    component: Reg,
    meta: { /* 元消息 */
      permission: false  /* 不需要拦截 */
    }
  },
  {
    path: "/books",
    name: "books",
    component: Books,
    meta: { /* 元消息 */
      permission: false  /* 不需要拦截 */
    }
  },
  {
    path: "/shopcar",
    name: "shopcar",
    component: Shopcar
  },
  {
    path: "/usercenter",
    name: "usercenter",
    component: usercenter,
    meta: { /* 元消息 */
      permission: true  /* 需要拦截 */
    }

  },
  {
    path: '/personalcenter',
    name: 'personalcenter',
    component: personalcenter,
    meta: { /* 元消息 */
      permission: true  /* 需要拦截 */
    }
  },
  {
    path: "/shopdetails/:good_id",
    name: "shopdetails",
    component: shopdetails,
    meta: { /* 元消息 */
      permission: false  /* 不需要拦截 */
    }
  },
  {
    path: "/goodslist",
    name: "goodslist",
    component: goodslist,
    meta: { /* 元消息 */
      permission: false  /* 不需要拦截 */
    }
  }
];

const router = new VueRouter({
  mode: 'history',  //去掉url中的#
  routes
});

export default router;
