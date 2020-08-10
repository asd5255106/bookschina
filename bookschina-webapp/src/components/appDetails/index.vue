<template>
  <div>
    <header class="header header-positive">
      <div class="headerInner">
        <div class="returnBtn">
          <a href="javascript:history.back(-1)"></a>
        </div>
        <nav class="detailNav">
          <ul>
            <li :class="{current:isture}" @click="change1()">
              <a href="javascript:scrollTo(0,0)">
                图书
                <span></span>
              </a>
            </li>
            <li :class="{current:ison}" @click="change2()">
              <a href="javascript:scrollTo(0,620)">
                评论
                <span></span>
              </a>
            </li>
            <li :class="{current:iskai}" @click="change3()">
              <a href="javascript:scrollTo(0,670)">
                详情
                <span></span>
              </a>
            </li>
          </ul>
        </nav>
        <div class="shareBtn" id="shareBtn" style="display: block;"></div>
        <div class="shortCut" id="shortCut"></div>
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
    <div class="content">
      <div class="bookProduct" id="book">
        <div class="bookCover">
          <div class="bookPic">
            <img :src="img" alt="女同志" id="imgBook" />
          </div>

          <div class="rederScore">
            <div class="rederScoreInner">
              <span>
                读者评分
                <br />
                {{ fen }}
              </span>
            </div>
          </div>
        </div>
        <div class="bookInfor">
          <h1>{{ title }}</h1>
          <p>{{ xititle }}</p>
        </div>
        <div class="bookPrice">
          <div class="salePrice" id="divPrice">
            <span class="urerLeave">1星价</span>
            <span class="price">¥{{ prie }}</span>
            <span class="discount">{{ zekou }}</span>
          </div>
          <div class="otherPrice">
            <span class="startPrice">2星价￥{{ prie }}</span>
            <span class="originalPrice">定价￥{{ oldprice }}</span>
          </div>
        </div>

        <div class="activeList"></div>
        <div class="inforLInk">
          <div class="inforLinkItem" id="lblAuthor">
            <a href="javascript:;">{{ autor }}</a>
          </div>
          <div class="inforLinkItem" id="divPublish">
            <a href="javascript:;">
              {{ press }}
              <span class="arrowIcon"></span>
            </a>
          </div>
          <div class="inforLinkItem">
            <a href="javascript:;">
              {{ pangdan }}
              <span class="arrowIcon"></span>
            </a>
          </div>

          <div class="seriesBook">
            <span>所属丛书：</span>
            <a href="javascript:;">{{ congshu }}</a>
          </div>

          <div class="inforLinkItem">
            <a href="javascript:;">{{ fennlei }}</a>
            <span class="arrowIcon"></span>
          </div>
        </div>

        <div class="service">
          <ul>
            <li>正版好图书</li>
            <li>特价书1折起</li>
          </ul>
          <ul>
            <li>满69包邮（新疆、西藏等六省除外，运费14元起）</li>
          </ul>
        </div>
      </div>
      <div class="BookComment" id="comment">
        <div class="commentTit">
          <b>暂无评论</b>
        </div>
      </div>
      <div class="bookinforDetail" id="details">
        <div class="DetailTit">图文详情</div>
        <div class="baseInfor">
          <ul>
            <li>ISBN：7531329093</li>
            <li>装帧：简裝本</li>
            <li>版次：1</li>
            <li>册数：暂无</li>
            <li>重量：暂无</li>
            <li>印刷次数：1</li>
            <li>开本：小16开</li>
            <li>页数：450</li>
            <li>出版时间：2005-05-01</li>
            <li style="width:100%;">条形码：9787531329091 ; 978-7-5313-2909-1</li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footerInner">
        <div class="btn_bar">
          <div class="iconBtn" id="customerService">
            <div class="iconBtnInner">
              <i class="icon"></i>
              <span class="txt">客服</span>
            </div>
          </div>
          <div class="iconBtn" id="collection" data-bookid="1117228">
            <div class="iconBtnInner">
              <i class="icon"></i>
              <span class="txt">收藏</span>
            </div>
          </div>
          <div class="iconBtn" id="gotoCart" onclick="window.location = '/shopcar'">
            <div class="iconBtnInner" style="border:none">
              <span class="add_num" id="popone" style="display:block;">{{ num }}</span>
              <i class="icon"></i>
              <span class="txt">购物车</span>
            </div>
          </div>
        </div>
        <div class="btn_group">
          <div class="de_row">
            <div class="btn btn_red" id="addCart" data-bookid="1117228">
              <span class="txt" @click="addCar(good_id)">加入购物车</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- "display: block; z-index: 999;" -->
    <div class="backTop" :style="{display:isblock,zIndex:isfo } ">
      <a href="javascript:scrollTo(0,0)"></a>
    </div>
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
              <a href="javascript:;">
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
    <!-- 为你推荐 -->
    <tui-jian></tui-jian>
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
</template>

<script>
//为你推荐组件
import tuiJian from "@/components/tuiJian";
//商品详情数据组件
import shopcont from "@/api/shopcont";
// 引入拿到user_id的接口
import { getUser, getToken } from "@/utils/auth";
import goodslistApi from "@/api/goodslistApi";
export default {
  data() {
    return {
      show: false,
      // hash: "",
      good_id: null,
      img: "", //数据的图片
      fen: "", //数据的评分值
      autor: "", //商品的作者
      congshu: "", //商品的文库
      fennlei: "", //商品的分类
      good_id: "", //商品的id
      oldprice: "",
      pangdan: "",
      press: "",
      prie: "",
      title: "",
      xititle: "",
      zekou: "",
      shopinf: "", //商品详情资料
      user_id: null, //用户id
      showAdd: false,
      num: 0, //该用户的订单商品总数量
      isture: true,
      ison: false,
      iskai: false,
      info: " 快速 <br />导航",
      ishas: false,
      isblock: "block",
      isfo: 999,
      tip: ""
    };
  },

  components: { tuiJian },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // 功能: 封装轻提示组件
    showTip(tip) {
      this.tip = tip;
      this.showAdd = true;
      setTimeout(() => {
        this.showAdd = false;
      }, 1000);
    },
    // 功能: 点击更多, 显示下拉菜单
    showLayer() {
      this.show = !this.show;
    },
    //获取该商品详情的数据
    async getcont() {
      // console.log(this.good_id)
      let data = await goodslistApi.checkoutid(this.good_id);
      // console.log(data.data.data[0]);
      // console.log(data.data.data[0])
      let inf = data.data.data[0];
      let arr = inf.author.split("/");
      // console.log(arr)
      this.img = inf.img;
      (this.fen = "4.8分"), (this.autor = "作者：" + arr[0]);
      this.congshu = inf.author;
      this.fennlei = "分类：小说  > 中国当代小说  ";
      this.good_id = inf.good_id;
      this.oldprice = inf.oldprice;
      this.pangdan = "本类榜单：小说";
      this.press = "出版社:" + arr[1];
      this.prie = inf.newprice;
      this.title = inf.title;
      this.xititle = inf.xititle;
      this.zekou = "(" + inf.dis + ")";

      // console.log(this.shopinf.Id);//2
    },
    //功能：获取该用户的所有订单的商品的总数
    async getShopnum() {
      if (this.user_id) {
        let data = await shopcont.getNum(this.user_id);
        // console.log(data.data.sum);
        if (!data.data.sum) {
          this.num = 0;
        } else {
          this.num = data.data.sum;
        }
      }
    },

    // 功能: 获取用户名user_id
    getUserId() {
      if (getUser()) {
        this.user_id = JSON.parse(getUser()).user_id;
      }
      // console.log(this.user_id, 888);
    },
    // 功能: 加入购物车
    async addCar(good_id) {
      // console.log(good_id);
      try {
        if (getToken()) {
          let p = await goodslistApi.addCar(good_id, this.user_id);
          // console.log(p.data);
          this.getShopnum();
          this.showTip("加入购物车成功");
        } else {
          this.showTip("请先登录");
        }
      } catch (err) {
        console.log(err);
      }
    },
    change1() {
      this.isture = true;
      this.ison = false;
      this.iskai = false;
    },
    change2() {
      this.isture = false;
      this.ison = true;
      this.iskai = false;
    },
    change3() {
      this.isture = false;
      this.ison = false;
      this.iskai = true;
    },
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
    // 功能: 当滚动条滚动到某个位置时, 切换头部的class属性
    handleScroll() {
      let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(scrollY);
      let comScrollTop = document.querySelector("#comment").offsetTop - 52;
      let detScrollTop = document.querySelector("#details").offsetTop - 60;
      // console.log(scrollY, comScrollTop, detScrollTop);
      if (scrollY < comScrollTop) {
        this.change1();
      }
      if (scrollY > comScrollTop - 10) {
        this.change2();
      }
      if (scrollY > detScrollTop) {
        this.change3();
      }
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  created() {
    // this.hash = this.$route.fullPath.slice(1, 2); //截取到路径的数字来做id来获取商品详情数据 2
    this.good_id = this.$route.params.good_id;
    this.getcont();
    this.getUserId();
    this.getShopnum();

    // 获取到good_id
    // let good_id
    // console.log(good_id)
    //  = good_id
    // console.log(this.good_id)
    // this.getScrollTop();
  }
};
</script>

<style scoped>
/*引入商品详情的样式*/
@import "~@/assets/css/details.css";
body {
  background: #f3f3f3;
  padding: 52.8px 0;
}
.content {
  margin-bottom: 100px;
}
.bookinforDetail {
  margin-bottom: 0px;
}
.content {
  margin-bottom: 0px;
}
.sidebarNav dl dt {
  width: 1.3rem;
}
</style>