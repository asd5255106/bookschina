<!--
 * @description: 
 * @author: 黄升滨，成启航，Lk李铠岚
 * @Date: 2020-07-31 10:26:00
 * @LastEditTime: 2020-07-31 16:56:53
--> 

<template>
  <div class="books-right">
    <div class="books-right-con">
      <!-- 轮播图 -->
      <div class="top-slider-wrapper">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item>
              <img src="@/assets/images/books/1.jpg" alt="">
          </van-swipe-item>
          <van-swipe-item>
              <img src="@/assets/images/books/2.jpg" alt="">
          </van-swipe-item>
          <van-swipe-item>
              <img src="@/assets/images/books/3.jpg" alt="">
          </van-swipe-item>
          <van-swipe-item>
              <img src="@/assets/images/books/4.jpg" alt="">
          </van-swipe-item>
        </van-swipe>
      </div>

      <!-- 热销榜 -->
      <div class="hot-link">
          <ul>
              <li>
                  <a href="javascript:;">
                      <img src="@/assets/images/books/lei_cxb.png" alt="">
                  </a>
              </li>
              <li>
                  <a href="javascript:;">
                      <img src="@/assets/images/books/lei_xsj.png" alt="">
                  </a>
              </li>
          </ul>
      </div>

      <!-- 分类内容 -->
      <books-con></books-con>
    </div>
  </div>
</template>

<script>
import booksCon from "@/components/booksCon"
export default {
  data() {
    return {
      // index:0
    };
  },

  components: {booksCon},

  methods: {
    
  },
};
</script>

<style scoped>
.books-right {
  flex: 1;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}
.books-right li {
    font-size: 36px;
}
/* 轮播 */
.top-slider-wrapper {
  padding: 12px 12px 0;
}
.my-swipe{
    height: 100px;

}
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 130px;
    text-align: center;
    background-color: #39a9ed;
  }
.my-swipe .van-swipe-item img{
    width: 100%;
    height: 100%;
}

/* 热销榜 */
.hot-link {
    margin-top: 6px;
}
.hot-link ul {
    padding: 0 6px;
}
.hot-link ul li {
    width: 45%;
    padding: 0 6px;
    float: left;
}
.hot-link ul li img {
    width: 100%;
}
</style>