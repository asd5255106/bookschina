<!--
 * @description: 
 * @author: 黄升滨，成启航，Lk李铠岚
 * @Date: 2020-07-31 10:26:00
 * @LastEditTime: 2020-08-02 15:40:45
--> 

<template>
  <div class="content-item">
    <ul id="con-item">
      <li v-for="item in booksList" :key="item.Id" @click="toGoodList()">
        <a href="javascript:;">
          <div class="cover">
            <img :src="item.img" alt class="lazyImg" />
            <span>{{ item.title }}</span>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import booksApi from "@/api/booksApi";
export default {
  data() {
    return {
      // 书本列表
      booksList: {},
      currentIndex: 0
    };
  },

  components: {},

  methods: {
      async getBooks(){
          try{
              let p = await booksApi.getBookList()
              // 拼接goods1
              let num = "goods"+(this.currentIndex+1)
            //   console.log(num)
            //   console.log(p.data.arr[this.currentIndex][num])
              this.booksList = p.data.arr[this.currentIndex][num]
          }catch(err){
              console.log(err)
          }
      },

    // 跳转到列表页
    toGoodList() {
      this.$router.push("/goodslist");
    }
  },
  computed: {
    //   index(){
    //       this.currentIndex = this.$store.state.currentIndex
    //       return this.currentIndex
    //   }
  },
  watch: {
    "$store.state.currentIndex": {
      deep: true,
      handler(newValue) {
        this.currentIndex = this.$store.state.currentIndex;
        this.getBooks();
      }
    }
  },
  created() {
    this.getBooks();
  }
};
</script>

<style scoped lang="scss">
.content-item ul {
  overflow: hidden;
  padding: 0 6px;
  padding-bottom: 12px;
}
.content-item ul li {
  float: left;
  // padding: 0 6px;
  width: 33.3333%;
  text-align: center;
  margin-top: 15px;
}
.content-item ul li .cover {
  height: 110px;
}
.content-item ul li .cover img {
  height: 81px;
  max-width: 100%;
  background: #fff;
  font-size: 12px;
  text-align: center;
}
.content-item ul li span {
  display: block;
  color: #333;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 7px;
}
</style>