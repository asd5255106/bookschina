<template>
  <div class="main">
    <!-- 主要内容 -->
    <div class="menu">
      <!-- 侧边导航 -->
      <books-nav></books-nav>
      <!-- 右边内容 -->
      <books-right></books-right>
    </div>
  </div>
</template>

<script>
import booksNav from "@/components/booksNav";
import booksRight from "@/components/booksRight";
// import Bus from "@/assets/Bus.js"
export default {
  data() {
    return {
      // index:0
    };
  },

  components: { booksNav,booksRight },

  methods: {

  }
};
</script>

<style scoped lang="scss">
.menu {
  position: absolute;
  left: 0;
  right: 0;
  top: 53px;
  bottom: 52.8px;
  display: flex;
  box-sizing: border-box;
  background: #fff;
}
</style>