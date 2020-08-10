<template>
  <div class="main">
    <!-- 轮播图 -->
    <div class="swiper-container">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#e60000">
        <van-swipe-item>
          <img src="@/assets/images/home/swiper/swiper1.jpg" alt />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/images/home/swiper/swiper2.jpg" alt />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/images/home/swiper/swiper3.jpg" alt />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/images/home/swiper/swiper4.jpg" alt />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/images/home/swiper/swiper5.jpg" alt />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/images/home/swiper/swiper6.jpg" alt />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/images/home/swiper/swiper7.jpg" alt />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 快捷工具栏 -->
    <nav>
      <ul class="index-nav">
        <li>
          <a href="javascript:;">
            <img src="@/assets/images/home/nav/changxiaobang.png" alt="畅销榜" />
            <b>畅销榜</b>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <img src="@/assets/images/home/nav/taoshutuan.png" alt="淘书团" />
            <b>淘书团</b>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <img src="@/assets/images/home/nav/freepost.png" alt="9.9包邮" />
            <b>9.9包邮</b>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <img src="@/assets/images/home/nav/new.png" alt="新上架" />
            <b>新上架</b>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <img src="@/assets/images/home/nav/publisher.png" alt="出版社" />
            <b>出版社</b>
          </a>
        </li>
      </ul>
    </nav>

    <!-- 中图公告栏 -->
    <div class="reviewNews">
      <dl class="txtMarquee-top">
        <dt>
          <img src="@/assets/images/home/main/noticetitle.png" alt="中图公告" />
        </dt>
        <dd class="bd">
          <div class="notice_active">
            <van-notice-bar :scrollable="false" color="#333" background="#fff">
              <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
                <van-swipe-item>夏日冰点价|2折起，每满88减40</van-swipe-item>
                <van-swipe-item>每日签到抽红包！</van-swipe-item>
                <van-swipe-item>新用户注册即送5元!</van-swipe-item>
              </van-swipe>
            </van-notice-bar>
          </div>
        </dd>
      </dl>
    </div>

    <!--广告栏banner1-->
    <div class="floorBanner">
      <div class="swiper-container swiper-container2">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="@/assets/images/home/main/banner.jpg" alt="商务印书馆&#215;浙江人美社 3本7折" />
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

    <!--新到图书折上折-->
    <div class="newBookWrap">
      <div class="newBookTitle">
        <h2>今日值得买</h2>
        <a href="javascript:;">
          更多
          <span></span>
        </a>
      </div>
      <div class="newBookList">
        <ul>
          <li v-for="(item, index) in today" :key="index">
            <a href="javascript:;">
              <div class="bookWrap">
                <div class="cover">
                  <img :src="item.img" :alt="item.title" class="lazyImg" />
                </div>
                <p class="name">{{ item.title }}</p>
                <div class="priceWrap">
                  <span class="price">&yen;{{ item.price }}</span>
                  <span class="original">&yen;{{ item.oldprice }}</span>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!--广告栏banner2-->
    <div class="swiper-container swiper-container3">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <a href="javascript:;">
            <img src="@/assets/images/home/main/banner2.jpg" alt="夏日冰点价|2折起，每满88减40" />
          </a>
        </div>
      </div>
    </div>

    <!--淘书团-->
    <div class="tstWrap">
      <div class="tstTit">
        <h2>
          <img src="@/assets/images/home/main/taoshutuantitle.png" alt="淘书团" />
        </h2>
        <a href="javascript:;">
          更多
          <span></span>
        </a>
      </div>
      <div class="tstList">
        <ul>
          <li v-for="(item, index) in taoshu" :key="index">
            <a href="javascript:;">
              <div class="bookWrap">
                <div class="cover">
                  <img
                    :src="item.img"
                    alt="引进版！《二战纪实书系》4册，以其丰富的历史照片和详细分析，为读者真实再现了残酷的二战场景。1941年德军入侵苏联的巴巴罗萨行动、德国伞兵、布莱德雷的第1军团与巴顿的第3军团在诺曼底的突围……每本书约有300幅清晰的照片和地图，许多照片是从未发表过的，还有大量双方投入兵力、武器装备及损失的对比数字，加之对每次战役进程的详细描述，使这套书看起来就像一部描述二战的“纪录片”。定价164元，现团购价48"
                    class="lazyImg"
                  />
                  <span>{{ item.youhuo }}</span>
                </div>
                <p class="name">
                  {{ item.title }}
                  <span>{{ item.span }}</span>
                </p>
                <div class="priceWrap">
                  <div class="Tprice">
                    {{ item.tuangou }}:
                    <span>&yen;{{ item.price }}</span>
                  </div>
                  <div class="discountWrap">
                    <span class="original">原价&yen;{{ item.oldprice }}.0</span>
                    <span class="discount">{{ item.zekou }}</span>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!--读者热评-->
    <div class="hottockWrap">
      <div class="hottockTit">
        <h2>
          <img src="@/assets/images/home/main/userhottocktitlle.png" alt="读者热评" />
        </h2>
      </div>
      <div class="hottockList">
        <div class="hottockMain">
          <a href="javascript:;">
            <div class="bookWrap">
              <div class="cover">
                <img src="@/assets/images/home/main/s7398715.jpg" alt="失落的优雅" class="lazyImg" />
              </div>
              <p class="name">失落的优雅</p>
              <div class="startWrap">
                <van-rate
                  :count="5"
                  color="#ff541d"
                  void-color="#ff541d"
                  allow-half
                  readonly
                  v-model="value"
                />
                <b>11条评论</b>
              </div>
              <div class="priceWrap">
                <span class="price">&yen;29.0</span>
                <span class="original">&yen;58.0</span>
              </div>
              <div class="review">
                <span>[好评]</span>二十世纪八十年代，摄影家阮义忠在台湾各处行脚，拍下了无数百姓日常生活的动人瞬间。虽然从小在台湾乡村长大，然而少时并不能理解父辈的艰辛，一心想逃离乡村。长成后回顾，反而是这些贴近土地的人事与乡情支撑着他迈出每一步。本书所记录的台湾乡野风景与人情，如今已成为渺不可寻的古风，在它们背后，我们发现久已失落的朴素和优雅。
              </div>
            </div>
          </a>
        </div>
        <ul>
          <li v-for="(item, index) in reader" :key="index">
            <a href="javascript:;">
              <div class="bookWrap">
                <div class="cover">
                  <img :src="item.img" :alt="item.title" class="lazyImg" />
                </div>
                <p class="name">{{ item.title }}</p>
                <div class="startWrap">
                  <van-rate
                    :count="5"
                    color="#ff541d"
                    void-color="#ff541d"
                    allow-half
                    readonly
                    v-model="star[index].value"
                  />
                  <b>{{ item.comment }}</b>
                </div>
                <div class="priceWrap">
                  <span class="price">&yen;{{ item.price }}</span>
                  <span class="original">&yen;{{ item.oldprice }}.0</span>
                </div>
                <div class="review">
                  <span>[好评]</span>
                  {{ item.content }}
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="fiveStarLink">
        <a href="/goodslist">查看五星书&gt;&gt;</a>
      </div>
    </div>

    <!--推荐书单-->
    <div class="recommendWrap">
      <div class="recommendTit">
        <h2>
          <img src="@/assets/images/home/main/recomandtitle.png" alt="推荐书单" />
        </h2>
      </div>
      <div class="recommenList">
        <div class="recommenLeft">
          <a href="javascript:;">
            <img src="@/assets/images/home/main/305417.jpg" />
          </a>
        </div>
        <div class="recommenright">
          <a href="javascript:;">
            <img src="@/assets/images/home/main/305197.jpg" />
          </a>
          <a href="javascript:;">
            <img src="@/assets/images/home/main/wc305212.jpg" />
          </a>
        </div>
      </div>
    </div>

    <!--新书速递-->
    <div class="BookCourierWrap">
      <div class="BookCourierTit">
        <h2>
          <img src="@/assets/images/home/main/newtitle.png" alt="新书速递" />
        </h2>
      </div>
      <div class="courierList">
        <ul>
          <li v-for="(item, index) in newbook" :key="index">
            <a href="javascript:;">
              <div class="bookWrap">
                <div class="cover">
                  <img :src="item.img" :alt="item.title" class="lazyImg" />
                </div>
                <p class="name">{{ item.title }}</p>
                <div class="priceWrap">
                  <span class="price">&yen;{{ item.price }}</span>
                  <span class="original">&yen;{{ item.oldprice }}.0</span>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!--畅销榜-->
    <div class="sellHotWrap">
      <div class="sellHotTit">
        <img src="@/assets/images/home/main/changxiaobangtitle.png" />
      </div>
      <div class="sellHotNavWrap" id="sellHotNavWrap">
        <div class="sellHotNavFixed">
          <div class="sellHotNav wrapper" id="retr">
            <div class="dropnav scroller">
              <van-tabs @click="onClick" line-width="0" swipeable>
                <van-tab
                  :name="item.name"
                  v-for="(item, index) in sellHotNav"
                  :key="index"
                  :title="item.title"
                ></van-tab>
              </van-tabs>
            </div>
          </div>
        </div>
      </div>
      <div class="sellHotBook" id="sellHotBook">
        <div class="sellHotList">
          <ul>
            <li v-for="(item, index) in filterArr" :key="index">
              <a href="javascript:;">
                <div class="bookWrap">
                  <div class="cover">
                    <img :src="item.img" :alt="item.title" class="lazyImg" />
                  </div>
                  <p class="name">{{ item.title }}</p>
                  <div class="priceWrap">
                    <span class="price">&yen;{{ item.newprice }}</span>
                    <span class="original">&yen;{{ item.oldprice }}</span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
          <div class="more">
            <a href="javascript:;">进入畅销榜 >></a>
          </div>
        </div>
      </div>
    </div>

    <!-- 签到 -->
    <div class="sign_btn">
      <a href="javascript:;">
        <img src="@/assets/images/home/main/signhome.png" />
      </a>
    </div>
    <!-- style="display: block;" -->
    <!-- 回到顶部 -->
    <div class="fixed_box" :style="{display:ishas}">
      <a href="javascript:scrollTo(0,0)">
        <img src="@/assets/images/home/main/backtop.png" alt="返回顶部" />
      </a>
    </div>

    <!-- 网页底部 (公共) -->
    <div class="pagefoot">
      <div class="actions-wrap">
        <a href="javascript:;">登录</a>
        <a href="javascript:;">注册</a>
      </div>

      <nav class="b-nav">
        <a class="red" href="javascript:;">触屏版</a>
        <a href="javascript:;">电脑版</a>
        <a href="javascript:;">帮助</a>
      </nav>
      <div class="copyRight">Copyright 中国图书网&copy;2018 m.BooksChina.com</div>
    </div>
  </div>
</template>

<script>
import homeApi from "@/api/homeApi";

export default {
  data() {
    return {
      sellHotNav: [
        {
          title: "总榜",
          name: "zong"
        },
        {
          title: "文学",
          name: "wenxue"
        },
        {
          title: "社科",
          name: "she"
        },
        {
          title: "少儿",
          name: "shao"
        },
        {
          title: "艺术",
          name: "yishu"
        },
        {
          title: "生活",
          name: "sheng"
        },
        {
          title: "文教",
          name: "wenjiao"
        }
      ],
      today: [], // 今日推荐
      taoshu: [], // 淘书团
      reader: [], // 读者
      newbook: [], // 新书
      value: 5, // 大图评分
      star: [], // 评分数组
      filterArr: [], // 过滤的数据
      ishas: "none"
    };
  },

  components: {},
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // 功能: 进入页面就发送请求, 获取home的数据
    async fetchall() {
      try {
        let p = await homeApi.getHomeList();
        // console.log(p.data);
        this.newbook = p.data.arr[0].newbook;
        this.reader = p.data.arr[1].reader.slice(1);
        this.today = p.data.arr[2].today;
        this.taoshu = p.data.arr[3].taoshu;
        this.reader.forEach(item => {
          let obj = {};
          obj.value = item.redu * 1;
          this.star.push(obj);
        });
      } catch (err) {
        console.log(err);
      }
    },

    // 功能: 点击总榜显示总榜的数据, 点击文学显示文学的数据
    async onClick(name, title) {
      // console.log(name);
      try {
        let p = await homeApi.getSellhotList();
        // console.log(p.data.arr[0], Object.keys(p.data.arr[0])[0]);
        // 过滤出name符合的数据
        this.filterArr = p.data.arr.filter(item => {
          return Object.keys(item) == name;
        })[0][name];
        // console.log(this.filterArr);
      } catch (err) {
        console.log(err);
      }
    },

    // 功能: 当滚动条滚动到某个位置时, 切换头部的class属性
    handleScroll() {
      let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(scrollY);
      if (scrollY >= 392) {
        this.ishas = "block";
      } else {
        this.ishas = "none";
      }
    },
    destroyed() {
      window.removeEventListener("scroll", this.handleScroll);
    }
  },

  created() {
    this.fetchall();
    this.onClick("zong");
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
};
</script>

<style scoped lang="scss">
/* 引入主体样式 */
@import "~@/assets/css/main.css";
/* 中图公告栏样式 */
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
.main {
  margin-top: 52px;
}
</style>