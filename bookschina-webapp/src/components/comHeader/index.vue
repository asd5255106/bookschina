<template>
  <!--头部区域-->
  <header class="common-header">
    <div :class="{headerInner:true, inner: padtop}">
      <!-- 返回按钮 -->
      <div class="returnBtn">
        <a href="javascript:history.back(-1)"></a>
      </div>
      <!-- 中间标题 -->
      <div class="head_lable" v-if="showComtitle">
        <span>{{ comtitle }}</span>
      </div>
      <!-- 搜索 -->
      <div class="searchWrap" v-if="showSearchWrap">
        <span>
          <input type="text" value="小说月报 叛逆者" id="txtSearchKeyword" />
        </span>
      </div>
      <!-- 分享按钮 -->
      <div class="shareBtn" id="shareBtn"></div>
      <!-- 编辑按钮 -->
      <div class="editBtn" id="editBtn" v-if="showEditBtn">编辑</div>
      <!-- 点击时, 显示下拉菜单 -->
      <div class="shortCut" id="shortCut" @click.stop="showLayer"></div>
      <div class="shortCutLayer" v-show="show">
        <div class="shortCutInner">
          <ul>
            <li class="homeLink">
              <a href="/">首页</a>
            </li>
            <li class="tstLink">
              <a href="/">淘书团</a>
            </li>
            <li class="kindLink">
              <a href="/books">分类搜索</a>
            </li>
            <li class="carLink">
              <a href="/shopcar">购物车</a>
            </li>
            <li class="accountLink">
              <a href="/usercenter">我的账户</a>
            </li>
          </ul>
          <span class="uptriangle"></span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      showEditBtn: false,
      showComtitle: true,
      showSearchWrap: false,
      padtop: false,
      goback: ""
    };
  },

  props: ["comtitle"],

  components: {},

  created() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  },

  mounted() {
    document.addEventListener("click", this.hideLayer);
  },

  methods: {
    // 功能: 点击更多, 显示下拉菜单
    showLayer() {
      this.show = !this.show;
    },
    // 功能: 点击其他地方, 隐藏下拉菜单
    hideLayer() {
      this.show = false;
    }
  },

  destroyed() {
    document.removeEventListener("click", this.showLayer);
  },

  watch: {
    $route: {
      immediate: true, //立刻监听
      handler() {
        // console.log(this.$route.path);
        // 是否显示编辑按钮
        if (
          this.$route.path == "/shopcar" ||
          this.$route.path == "/personalcenter"
        ) {
          this.showEditBtn = false;
        } else {
          this.showEditBtn = false;
        }
        // 是否显示共同标题/搜索框/内边距
        if (this.$route.path == "/goodslist") {
          this.showComtitle = false;
          this.showSearchWrap = true;
          this.padtop = true;
        } else {
          this.showComtitle = true;
          this.showSearchWrap = false;
          this.padtop = false;
        }
        // goback按钮
        // if(this.$route.path == "/usercenter"){
        //   // 中图返回登录
        //     this.goback = "/login"
        // }else if(this.$route.path == "/personalcenter"){
        //   // 修改中心返回中图
        //   this.goback = "/usercenter"
        // }else if(this.$route.path == "/goodslist"){
        //   // 商品列表返回分类
        //   this.goback = "/books"
        // }else if(this.$route.path == "/shopdetails"){
        //   // 商品详情返回商品列表
        //   this.goback = "/goodslist"
        // }else if(this.$route.path == "/shopcar"){
        //   // 购物车返回首页
        //   this.goback = "/"
        // }else if(this.$route.path == "/login"){
        //   // 登录返回首页
        //   this.goback = "/"
        // }else if(this.$route.path == "/login"){
        //   // 登录返回首页
        //   this.goback = "/usercenter"
        // }else if(this.$route.path == "/reg"){
        //   // 注册返回登录
        //   this.goback = "/login"
        // }
      }
    }
  }
};
</script>

<style scoped>
</style>