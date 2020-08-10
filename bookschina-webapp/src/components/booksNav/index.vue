<!--
 * @description: 
 * @author: 黄升滨，成启航，Lk李铠岚
 * @Date: 2020-07-31 10:26:00
 * @LastEditTime: 2020-07-31 16:56:47
--> 

<template>
  <div>
    <!-- 左侧导航栏 -->

    <div class="nav">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item
          v-for="(item,index) in booksType"
          :key="index"
          :title="item.title"
          @click="onchange(index)"
        />
        <!-- @click="active(index)" :class="{'active':currentIndex == index}" -->
      </van-sidebar>
    </div>
  </div>
</template>

<script>
// import { Notify } from "vant";

export default {
  data() {
    return {
      activeKey: 0,
      // 书本分类
      booksType: [
        {
          title: "小说"
        },
        {
          title: "文学"
        },
        {
          title: "少儿"
        },
        {
          title: "历史"
        },
        {
          title: "哲学/宗教"
        },
        {
          title: "传记"
        },
        {
          title: "社会科学"
        },
        {
          title: "文化"
        },
        {
          title: "政治军事"
        },
        {
          title: "中小学教辅"
        },
        {
          title: "成功/励志"
        },
        {
          title: "外语"
        },
        {
          title: "古籍"
        },
        {
          title: "管理"
        },
        {
          title: "医学"
        },
        {
          title: "经济"
        },
        {
          title: "艺术"
        },
        {
          title: "青春文学"
        },
        {
          title: "动漫/幽默"
        },
        {
          title: "美食"
        },
        {
          title: "教材"
        },
        {
          title: "旅游"
        },
        {
          title: "收藏/鉴赏"
        },
        {
          title: "家居/休闲游戏"
        },
        {
          title: "保健/心理健康"
        },
        {
          title: "自然科学"
        },
        {
          title: "科普读物"
        },
        {
          title: "家庭教育"
        },
        {
          title: "体育/运动"
        },
        {
          title: "法律"
        },
        {
          title: "计算机/网络"
        },
        {
          title: "工业技术"
        },
        {
          title: "农业/林业"
        },
        {
          title: "建筑"
        },
        {
          title: "个人理财"
        },
        {
          title: "工具书"
        },
        {
          title: "考试"
        },
        {
          title: "地图/地理"
        },
        {
          title: "两性关系"
        },
        {
          title: "孕产妇/育儿"
        },
        {
          title: "美丽装扮"
        },
        {
          title: "文创"
        },
        {
          title: "进口原版书"
        },
        {
          title: "教育音像"
        },
        {
          title: "音像和软件"
        }
      ],
      // 控制样式索引
      // currentIndex:this.$store.state.currentIndex
    };
  },
  methods: {
    // 获取index
    onchange(index) {
      // this.currentIndex = index
      // console.log(index)
      // console.log(this.currentIndex)
      // this.$emit("getIndex",this.currentIndex)
      this.$store.dispatch("changeIndex",index)
    }  
  },
  computed: {
    index(){
      return this.$store.state.currentIndex
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.nav {
  flex: 0 0 90px;
  width: 90px;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  // -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  background: #f3f3f3;
}
.van-sidebar-item {
  padding: 10.2px 0;
  line-height: 19.2px;
  border-left: 1.8px solid #f3f3f3;
  padding-left: 12px;
  color: #333333;
  font-family: "Microsoft YaHei";
  font-size: 13.2px;
}
.van-sidebar-item--select::before {
  color: #e60000;
  border-left: 1.8px solid #e60000;
  background: #fff;
  height: 1rem;
}
</style>