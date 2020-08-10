<!--
 * @description: 
 * @author: 黄升滨，成启航，Lk李铠岚
 * @Date: 2020-07-24 20:14:50
 * @LastEditTime: 2020-07-31 16:55:06
--> 

<template>
  <div>
    <app-head></app-head>
    
    <app-nav></app-nav>

    <!-- 路由出口欧 -->
    <router-view></router-view>
  </div>
</template>

<script>
  // 引入
  import appHead from "@/components/appHeader";
  import appNav from "@/components/appNav";
  // import appMain from "@/components/appMain";
export default {
  data () {
    return {
    }
  },

  components: {appHead,appNav},

  methods: {}
}
</script>

<style scoped>
/* 头部区域 */
.header {
  position: absolute;
  line-height: 50px;
  padding: 0px;
  top: 0px;
  left: 0px;
  right: 0px;
  background-color: #2d3a4b;
}
/* 左侧导航栏 */
.navbar {
  position: absolute;
  width: 230px;
  top: 50px;
  left: 0px;
  bottom: 0px;
  overflow-y: auto;
  background-color: #545c64;
}
/* 右侧主区域 */
.main {
  position: absolute;
  top: 50px;
  left: 230px;
  right: 0px;
  bottom: 0px;
  padding: 10px;
  overflow-y: auto;
  /* background-color: red; */
}
</style>