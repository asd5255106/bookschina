<!--
 * @description: 
 * @author: 黄升滨，成启航，Lk李铠岚
 * @Date: 2020-07-28 19:42:59
 * @LastEditTime: 2020-07-31 16:54:23
--> 

<template>
  <!-- 面包屑 -->
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item class="line">{{ $route.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: ["name"],
  data() {
    return {};
  },

  components: {},

  methods: {}
};
</script>

<style scoped>
.el-breadcrumb {
  height: 10px;
  padding: 20px;
  border-radius: 4px;
  /* 投影 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.line {
  border-left: 3px solid #31c17b;
  padding-left: 10px;
}
</style>