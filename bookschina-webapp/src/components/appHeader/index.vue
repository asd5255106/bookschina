<template>
  <header :class="{header: true}" v-show="show">
    <div class="headerInner">
      <div class="searchBar" id="fixedtop">
        <div class="searchInner">
          <h1>
            <img src="@/assets/logo.png" alt="中国图书网" />
          </h1>
          <div class="searchWrap">
            <span>小说月报 叛逆者</span>
          </div>
          <div class="searchBtn">搜索</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      show: true
    };
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  methods: {
    // 功能: 当滚动条滚动到畅销榜以下时, 隐藏头部
    handleScroll() {
      // console.log(this.$route.path);
      if (document.querySelector("#sellHotBook")) {
        let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(scrollY);
        let boxScrollTop = document.querySelector("#sellHotBook").offsetTop;
        // console.log(boxScrollTop);
        if (scrollY > boxScrollTop) {
          this.show = false;
        }
        if (scrollY < boxScrollTop) {
          this.show = true;
        }
      }
      if(this.$route.path == "/books"){
        this.show = true;
      }
    }
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style scoped>
/* 引入头部样式 */
@import "~@/assets/css/header.css";
</style>