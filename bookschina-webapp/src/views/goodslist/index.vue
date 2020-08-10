<template>
  <div class="pageWrap">
    <!-- 头部区域 -->
    <com-header v-show="showComheader"></com-header>

    <!-- 主区域 -->
    <div id="pageWrap">
      <input type="hidden" id="hidCate" value="54110000" />
      <div class="crumb">
        <div class="crumbTit">
          <a href="javascript:;">小说</a>
          <span>&gt;</span>
          <a href="javascript:;">中国当代小说</a>
        </div>
      </div>
      <div class="nav sortNav" id="retr" style="touch-action: pan-y pinch-zoom;">
        <div class="scroller navFixed" id="navFixed">
          <ul class="sort_tab" id="ulSort">
            <li
              v-for="(item, index) in navList"
              :key="index"
              :class="{current: item.current}"
              @click="changeNav(index), getFilterList(item.name, item.curUp, item.curDown)"
            >
              <a href="javascript:;">
                {{ item.title }}
                <span :class="{arrow_up: item.down, cur: item.curUp}"></span>
                <span :class="{arrow_down: true, cur: item.curDown}"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="kindNavWrap">
        <div class="kindNavFixed">
          <div class="kindNavRelative">
            <div class="kindNav">
              <ul>
                <li>
                  <span>售价范围</span>
                </li>
                <li>
                  <span>折扣区间</span>
                </li>
                <li class="tejia">
                  <span>特价</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="content" id="content">
        <div class="booklist">
          <ul id="J_listInner">
            <li
              v-for="(item, index) in goodsList"
              :key="index"
              :data-id="item.good_id"
              @click="selectItem(item.good_id)"
            >
              <!-- <a href="/shopdetails"> -->

              <a href="javascript:;">
                <div class="bookWrap">
                  <div class="cover">
                    <img :alt="item.title" v-lazy="item.img" class />
                  </div>
                  <div class="infor">
                    <div class="bookName">
                      <b>{{ item.title }}</b>
                    </div>
                    <p class="authorPublisher">{{ item.author }}</p>
                    <div class="startWrap">
                      <span class="full"></span>
                      <span class="full"></span>
                      <span class="full"></span>
                      <span class="full"></span>
                      <span class="half"></span>
                      <b>{{ item.comment }}</b>
                    </div>
                    <div class="activeList">
                      <span>量贩一口价|低至5.9元</span>
                    </div>
                    <div class="priceWrap">
                      <span class="sellPrice">¥{{ item.newprice }}</span>
                      <span class="discount">({{ item.dis }})</span>
                      <span class="price">¥{{ item.oldprice }}</span>
                    </div>
                  </div>
                </div>
              </a>
              <div class="operate">
                <span class="addCar" @click.stop="addCar(item.good_id)"></span>
                <span class="collect"></span>
              </div>
            </li>
          </ul>
        </div>
        <div class="loading" id="loading" data-page="2">没有更多了……</div>
      </div>

      <div class="pagination">
        <b>
          <i>
            <span class="molecule">1</span>
            <span>/</span>
            <span>69</span>
          </i>
        </b>
      </div>

      <div class="maskLayer"></div>

      <!-- 回到顶部 -->
      <div class="backTop" :style="{display:isblock,zIndex:isfo } ">
        <a href="javascript:scrollTo(0,0)"></a>
      </div>
      <!-- 快速导航 -->
      <div :class="{sidebarNav:true,open:ishas}" style="right: -1px;" @click="change4()">
        <dl>
          <dt>
            <span v-html="info">
              <!-- 快速
              <br />导航-->
            </span>
          </dt>
          <dd>
            <ul>
              <li>
                <a href="/">
                  <span class="sideIcon">
                    <img src="@/assets/images/kuaijie/1.png" alt="首页" />
                  </span>
                  <b>首页</b>
                </a>
              </li>
              <li>
                <a href="/">
                  <span class="sideIcon">
                    <img src="@/assets/images/kuaijie/2.png" alt="淘书团" />
                  </span>
                  <b>淘书团</b>
                </a>
              </li>
              <li>
                <a href="/">
                  <span class="sideIcon">
                    <img src="@/assets/images/kuaijie/3.png" alt="分类搜索" />
                  </span>
                  <b>分类搜索</b>
                </a>
              </li>
              <li>
                <a href="/shopcar">
                  <span class="sideIcon">
                    <img src="@/assets/images/kuaijie/4.png" alt="购物车" />
                  </span>
                  <b>购物车</b>
                </a>
              </li>
              <li>
                <a href="/usercenter">
                  <span class="sideIcon">
                    <img src="@/assets/images/kuaijie/5.png" alt="我的账户" />
                  </span>
                  <b>我的账户</b>
                </a>
              </li>
            </ul>
          </dd>
        </dl>
      </div>
      <div class="layerMask" v-show="ishas"></div>
      <!-- 加入购物车成功 -->
      <div id="layui-m-layer10" class="layui-m-layer layui-m-layer0" index="10" v-show="showAdd">
        <div class="layui-m-layermain">
          <div class="layui-m-layersection">
            <div class="layui-m-layerchild layui-m-layer-msg">
              <div class="layui-m-layercont">{{ tip }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import comHeader from "@/components/comHeader";
import goodslistApi from "@/api/goodslistApi";
// 引入拿到user_id的接口
import { getUser, getToken } from "@/utils/auth";

export default {
  data() {
    return {
      navList: [
        {
          title: "默认",
          name: "moren",
          down: false,
          current: true,
          curDown: true
        },
        {
          title: "售价",
          name: "newprice",
          down: true, // 只有下箭头
          current: false, // 当前字体颜色
          curUp: false, // 当前上箭头
          curDown: false // 当前下箭头
        },
        {
          title: "折扣",
          name: "dis",
          down: true,
          current: false,
          curUp: false,
          curDown: false
        },
        {
          title: "定价",
          name: "oldprice",
          down: true,
          current: false,
          curUp: false,
          curDown: false
        },
        {
          title: "评论",
          name: "comment",
          down: true,
          current: false,
          curUp: false,
          curDown: false
        }
      ],
      cur: false,
      goodsList: [], // 商品列表全部数据
      showComheader: true,
      page: 1,
      pagesize: 10,
      user_id: null,
      showAdd: false,
      info: " 快速 <br />导航",
      ishas: false,
      isblock: "block",
      isfo: 999,
      tip: ""
    };
  },

  components: { comHeader },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  methods: {
    //功能：快捷功能
    change4() {
      // if (!this.ishas) {
      //   this.ishas = true;
      //   this.info = "收起";
      // }
      if (this.ishas) {
        this.ishas = false;
        this.info = "快速 <br />导航";
        this.isfo = 999;
      } else {
        this.ishas = true;
        this.info = "收起";
        this.isfo = 992;
      }
    },
    // 功能: 封装轻提示组件
    showTip(tip) {
      this.tip = tip;
      this.showAdd = true;
      setTimeout(() => {
        this.showAdd = false;
      }, 1000);
    },
    // 滚动条滚动事件
    handleScroll() {
      let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
      // 功能: 当滚动条滚动到筛选以下时, 隐藏头部
      if (document.querySelector("#content")) {
        // console.log(scrollY);
        let boxScrollTop = document.querySelector("#content").offsetTop;
        // console.log(boxScrollTop);
        if (scrollY >= boxScrollTop) {
          this.showComheader = false;
        } else {
          this.showComheader = true;
        }
      }
      // 功能: 当滚动条滚动到底部时, 加载新商品数据
      if (document.querySelector("#loading")) {
        // console.log(scrollY);
        let boxScrollTop = document.querySelector("#loading").offsetTop;
        // console.log(boxScrollTop - 620);
        if (scrollY >= boxScrollTop - 620) {
          // console.log("滚动条到底了");
          // 三秒后执行
          setTimeout(() => {
            this.pagesize = this.pagesize + 10;
            // 判断navList中每个对象的current, 如果为true则为当前标签
            let onNav = this.navList.filter(item => {
              return item.current == true;
            });
            // console.log(onNav[0]);
            if (onNav[0].title == "默认") {
              this.getGoodsList(this.page, this.pagesize);
            } else {
              this.getFilterListLazy(
                onNav[0].name,
                onNav[0].curUp,
                onNav[0].curDown
              );
            }
          }, 1000);
        }
      }
    },
    // 功能: 点击筛选默认/售价/折扣/定价/评论, 下方商品列表显示对应的商品数据
    changeNav(index) {
      // console.log(index);
      let filterNavList = this.navList.filter((item, idx) => {
        return index != idx;
      });
      // console.log(filterNavList);
      // 去掉先前所有当前样式
      filterNavList.forEach((item, index) => {
        item.current = false;
        if (item.curUp) item.curUp = false;
        item.curDown = false;
      });
      // 给当前按钮添加当前样式
      this.navList[index].current = true;
      // 默认按钮
      if (index == 0) {
        this.navList[index].curDown = true;
      } else {
        // 除了默认按钮
        if (this.navList[index].curUp) {
          // 如果上箭头是激活的
          this.navList[index].curUp = false;
          this.navList[index].curDown = true;
        } else {
          // 如果上箭头是没激活的
          this.navList[index].curUp = true;
          this.navList[index].curDown = false;
        }
      }
    },
    // 功能: 获取商品列表全部数据
    async getGoodsList(page, pagesize) {
      try {
        let p = await goodslistApi.getGoodsList(this.page, this.pagesize);
        // console.log(p.data.data);
        this.goodsList = p.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    // 功能: 筛选排序功能
    async getFilterList(opt, curUp, curDown) {
      // console.log(opt);
      // 归零
      this.page = 1;
      this.pagesize = 10;
      if (opt != "moren") {
        // console.log(this.page);
        // console.log(this.pagesize);
        // console.log(opt);
        // console.log(curUp);
        // console.log(curDown);
        let sort = "";
        if (curUp) {
          // 如果上箭头为true, 从低到高排序, DESC
          sort = "DESC";
        }
        if (curDown) {
          // 如果上箭头为true, 从高到底排序, ASC
          sort = "ASC";
        }
        try {
          let p = await goodslistApi.getFilterList(
            this.page,
            this.pagesize,
            opt,
            sort
          );
          // console.log(p.data.data);
          this.goodsList = p.data.data;
        } catch (err) {
          // console.log(err);
        }
      } else {
        this.getGoodsList(this.page, this.pagesize);
      }
    },
    // 功能: 筛选排序懒加载
    async getFilterListLazy(opt, curUp, curDown) {
      // console.log(opt);
      if (opt != "默认") {
        // console.log(this.page);
        // console.log(this.pagesize);
        // console.log(opt);
        // console.log(curUp);
        // console.log(curDown);
        let sort = "";
        if (curUp) {
          // 如果上箭头为true, 从低到高排序, DESC
          sort = "DESC";
        }
        if (curDown) {
          // 如果上箭头为true, 从高到底排序, ASC
          sort = "ASC";
        }
        try {
          let p = await goodslistApi.getFilterList(
            this.page,
            this.pagesize,
            opt,
            sort
          );
          // console.log(p.data.data);
          this.goodsList = p.data.data;
        } catch (err) {
          // console.log(err);
        }
      }
    },
    // 功能: 获取用户名user_id
    getUserId() {
      if(getUser()){
        this.user_id = JSON.parse(getUser()).user_id;
      }
      // console.log(this.user_id);
    },
    // 功能: 加入购物车
    async addCar(good_id) {
      // console.log(good_id);
      try {
        // 先判断有没有token
        // console.log(getToken());
        if (getToken()) {
          let p = await goodslistApi.addCar(good_id, this.user_id);
          // console.log(p.data);
          this.showTip("加入购物车成功");
        } else {
          this.showTip("请先登录");
        }
      } catch (err) {
        console.log(err);
      }
    },
    //     // 功能: 点击商品跳转到对应的详情页
    //     goDetails(good_id){
    //       // 拿到good_id
    //       // console.log(good_id);
    //       let detailsUrl = "/" + good_id
    //       console.log(detailsUrl);
    //       this.$router.push(detailsUrl);
    //     }
    // 动态路由跳转详情
    selectItem(good_id) {
      //  console.log(good_id);
      //var item = item.moveId;
      this.$router.push({
        path: `/shopdetails/${good_id}`,
        params: { good_id }
      });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  },

  created() {
    this.getGoodsList(this.page, this.pagesize);
    this.getUserId();
  },

  computed: {
    onlyDown: function() {}
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style scoped>
@import "~@/assets/css/goodslist.css";
.sidebarNav dl dt {
  width: 1.3rem;
}
</style>