<template>
  <div>
    <!-- 商品详情页 -->
    <!-- 调用组件 -->
    <app-details></app-details>
    <!-- <router-view name="shopdetails" /> -->
  </div>
</template>

<script>
//引入组件
import appDetails from "@/components/appDetails";
export default {
  data() {
    return {};
  },
  // props: ['goood_id'],
  //注册组件
  components: { appDetails },

  methods: {},

  // created () {
  //   let good_id = this.$route.query.good_id;
  //   console.log(good_id)

  // }
};
</script>

<style scoped>
</style>