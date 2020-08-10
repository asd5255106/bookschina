<template>
  <div id="app">
    <!-- 头部区域 -->
    <app-header v-if="isShowHeader"></app-header>

    <!-- 主体区域 -->
    <!-- 路由出口 -->
    <router-view />

    <!-- 底部区域 -->
    <app-footer v-if="isShowFooter"></app-footer>
  </div>
</template>

<script>
import appHeader from "@/components/appHeader";
import appFooter from "@/components/appFooter";

export default {
  data() {
    return {
      isShowHeader: true,
      isShowFooter: true
    };
  },

  components: { appHeader, appFooter },

  methods: {},

  watch: {
    $route: {
      immediate: true, //立刻监听
      handler() {
        // console.log(this.$route.path);
        if (this.$route.path == "/home") {
          this.isShowHeader = true;
          this.isShowFooter = true;
        } else if (this.$route.path == "/books") {
          this.isShowHeader = true;
          this.isShowFooter = true;
        } else if (this.$route.path == "/usercenter") {
          this.isShowFooter = true;
          this.isShowHeader = false;
        } else {
          this.isShowHeader = false;
          this.isShowFooter = false;
        }
      }
    }
  }
};
</script>

<style lang="scss">
// 引入重置样式
@import "~@/assets/css/reset.css";
</style>
