<template>
  <!-- 底部导航栏 -->
  <van-tabbar v-model="active" active-color="#e60000" inactive-color="#333333">
    <van-tabbar-item v-for="item in icon.navList" :key="item.id" :to="item.path" replace>
      <span>{{ item.title }}</span>
      <template #icon="props">
        <img :src="props.active ? item.active : item.inactive" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      // 刷新后默认的高亮
      active: 0,
      icon: {
        navList: [
          {
            id: 1,
            title: "首页",
            path: "/home",
            active: require("@/assets/images/home.png"),
            inactive: require("@/assets/images/blackhome.png")
          },
          {
            id: 2,
            title: "分类",
            path: "/books",
            active: require("@/assets/images/kind1.png"),
            inactive: require("@/assets/images/kind.png")
          },
          {
            id: 3,
            title: "客服",
            path: "/home",
            active: require("@/assets/images/service.png"),
            inactive: require("@/assets/images/service.png")
          },
          {
            id: 4,
            title: "购物车",
            path: "/shopcar",
            active: require("@/assets/images/cart.png"),
            inactive: require("@/assets/images/cart.png")
          },
          {
            id: 5,
            title: "我",
            path: "/usercenter",
            active: require("@/assets/images/redcapationl.png"),
            inactive: require("@/assets/images/redcapationl1.png")
          }
        ]
      }
    };
  },

  components: {},

  methods: {},

  computed: {
    // 第一种方法: 计算属性
    // active: function() {
    //   if (this.$route.path == "/home") {
    //     return 0;
    //   } else if (this.$route.path == "/books") {
    //     return 1;
    //   }
    // }
  },

  created() {},

  watch: {
    // 第二种方法: 监听属性
    $route: {
      immediate: true, //立刻监听
      handler() {
        // console.log(this.$route.path);
        if (this.$route.path == "/home") {
          this.active = 0;
        } else if (this.$route.path == "/books") {
          this.active = 1;
        }else if(this.$route.path == "/usercenter") {
          this.active = 4;
        }
      }
    }
  }
};
</script>

<style scoped>
/* 引入底部样式 */
@import "~@/assets/css/footer.css";
</style>