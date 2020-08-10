<!--
 * @description: 
 * @author: 黄升滨，成启航，Lk李铠岚
 * @Date: 2020-07-24 20:14:50
 * @LastEditTime: 2020-07-31 16:54:16
--> 

<template>
  <div class="navbar">
    <el-menu
      :router="true"
      :default-active=$route.path
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item :index="item.path" v-for="item in menuList" :key="item.path">
        <i :class="item.icon"></i>
        <!-- <router-link tag="span" :to="item.path">{{ item.title }}</router-link> -->
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
        menuList:[
        //菜单列表
        {
          path: "/home/users",
          icon: "el-icon-user-solid",
          title: "用户管理"
        },
        {
          path: "/home/goods",
          icon: "el-icon-bank-card",
          title: "商品管理"
        },
        {
          path: "/home/orders",
          icon: "el-icon-shopping-cart-2",
          title: "订单管理"
        },
        ]
    }
  },

  components: {},

  methods: {}
}
//       default-active="/home/users"
</script>

<style scoped>
</style>
