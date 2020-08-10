<template>
  <div class="tuijian">
    <!-- 为你推荐 -->
    <div class="recommendWrap">
      <div class="recomandTit">
        <img src="@/assets/usercenter/13.jpg" />
      </div>
      <div class="recomandCon">
        <ul>
          <li v-for="(item, index) in tuijian" :key="index">
            <a href="javascript:;">
              <div class="cover">
                <img :src="item.img" :alt="item.title" class="lazyImg" />
              </div>
              <div class="name">{{ item.title }}</div>
              <div class="priceWrap">
                <span>&yen;{{ item.price }}</span>
                <del>&yen;{{ item.oldprice }}</del>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import centerApi from "@/api/centerApi";
export default {
  data() {
    return {
      tuijian: [] //推荐商品
    };
  },

  components: {},

  methods: {
    //功能：进入页面就发送请求，获取推荐商品的数据
    async fetchall() {
      try {
        let p = await centerApi.getTuiJian();
        // console.log(p.data.data);
        this.tuijian = p.data.data;
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    this.fetchall();
  }
};
</script>

<style scoped>
.recomandCon ul li {
  width: 49.47%;
}
.tuijian {
  margin-bottom: 60px;
}
</style>