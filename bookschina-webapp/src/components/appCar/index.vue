<template>
  <div>
    <!--头部区域-->
    <com-header :comtitle="titles"></com-header>

    <!-- 购物车导航 -->
    <div class="carNav">
      <ul>
        <li class="cur shopCar">
          <a href="javascript:void(0);">购物车</a>
        </li>
        <li class="tstCar">
          <a href="javascript:;">淘书团购物车</a>
        </li>
      </ul>
    </div>

    <div id="loding" style="display: none;">
      <img src="http://o.bookschina.com/images/loding_01.gif" alt />
    </div>
    <!-- 有商品时的页面 -->
    <div id="shopCart" v-show="show">
      <!-- 商品列表 -->
      <div class="active">
        <ul class="activeList">
          <li v-for="(item,index) in cartList" :key="item.cart_id">
            <!-- 复选框·切换样式 : selected -->
            <!-- <div :class="{'listCheckBox':true,'selected':item.ischecked}" data-sid="561615" bid="3340713">选中</div> -->
            <input type="checkbox" class="listCheckBox" v-model="item.ischecked" />

            <div class="book" data-id="books561615">
              <div class="bookInner">
                <div class="bookCover">
                  <a href="javascript:;">
                    <img :src="item.img" :alt="item.title" class />
                  </a>
                  <div class="limitText2">库存不足</div>
                </div>
                <div class="bookText">
                  <a href="javascript:;" class="name">{{ item.title }}</a>
                  <div class="priceWrap">
                    <span class="salesPrice">¥{{ item.newprice }}</span>
                    <span class="price">¥{{ item.oldprice }}</span>
                  </div>
                  <div class="oparateArea">
                    <div class="countEdit">
                      <span
                        class="decrement"
                        data-sid="561615"
                        data-bid="3340713"
                        @click="cut(index)"
                      >-</span>
                      <input
                        autocomplete="off"
                        :value="item.num"
                        max="1"
                        min="1"
                        type="text"
                        data-sid="561615"
                        data-bid="3340713"
                        class="num"
                      />
                      <span
                        class="increment"
                        data-sid="561615"
                        data-bid="3340713"
                        @click="add(index)"
                      >+</span>
                    </div>
                    <div class="otherEdit">
                      <i class="addFav J_collect" data-sid="561615" data-bid="3340713">收藏</i>
                      <i class="delete J_delate" sid="3340713" @click="deleteOrder(index)">删除</i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- 结算 -->
      <div class="footer">
        <div class="myf">
          <p>已免运费</p>
        </div>
        <div class="checkgroup">
          <!-- 复选框选中 ： selectAll -->
          <input type="checkbox" class="allSelect J_selectALL" v-model="allcheck" />
          <div class="totalWrap">
            <div class="settlement cur" id="J_submitBtn" @click="payMoney()">
              去结算
              <span id="J_SumCount">({{ total }})</span>
            </div>

            <!-- <van-overlay :show="show" >
              <div class="wrapper" @click.stop>
                <div class="block" />
              </div>
            </van-overlay>-->

            <div class="carResult">
              <div class="totalMoney">
                总计：
                <i id="J_SumZongJia">¥{{ allPrice.toFixed(2) }}</i>
              </div>
              <div class="totalDiscount">
                已优惠：
                <i id="J_SumYouhui">¥{{ cheapPrice.toFixed(2) }}</i>
              </div>
            </div>
          </div>
          <div class="editWrap">
            <div class="clearnoStock" id="J_deleteStock">
              <a href="/ShopCar/ClearBuyCar">快速清理</a>
            </div>
            <div class="deleteSelcted">移入收藏夹</div>
            <div class="colectSelcted" id="J_deleteALL">删除</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 空购物车时 -->
    <div class="noProductWrap" v-show="noCartShow">
      <div class="noProductIcon">
        <img src="@/assets/images/shopcar/noproduct.png" />
        <span>您的购物车暂无商品</span>
        <a href="/goodslist">随便逛逛</a>
      </div>
    </div>

    <div id="recommend">
      <tui-jian></tui-jian>
    </div>
  </div>
</template>

<script>
// 引入头部组件
import comHeader from "@/components/comHeader";
// 引入cookie接口
import { getUser } from "@/utils/auth";
// 订单接口
import cartsApi from "@/api/cartsApi";
// 推荐
import tuiJian from "@/components/tuiJian";

export default {
  data() {
    return {
      titles: "购物车",
      user_id: JSON.parse(getUser()).user_id,

      cartList: [],
      show: false,
      // currentIndex:[]  // 索引
      hasAllChecked: false,

      noCartShow: true, // 没商品的展示
      total: 0, // 总数量
      allPrice: 0, // 总价
      oldNum: 0, // 旧总价格
      cheapPrice: 0 // 优惠
    };
  },

  components: { comHeader, tuiJian },

  methods: {
    async fetchall() {
      try {
        let p = await cartsApi.getcarts(this.user_id);
        // console.log(p.data);
        if (p.data.flag) {
          p.data.data.forEach(item => (item.ischecked = false));
          // console.log(p);
          this.cartList = p.data.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // ——减数量
    cut(index) {
      // console.log(this.cartList);
      this.cartList[index].num--;
      if (this.cartList[index].num >= 1) {
        cartsApi.changeNum(this.user_id, this.cartList[index].good_id, -1);
      }
      // this.fetchall()
    },
    // ——减数量
    add(index) {
      // console.log(this.cartList)
      this.cartList[index].num++;
      cartsApi.changeNum(this.user_id, this.cartList[index].good_id, 1);
      // this.fetchall()
    },

    // 打开删除弹框并删除
    deleteOrder(index) {
      // console.log(this.user_id);
      // console.log(this.cartList[index].good_id);
      this.$dialog.confirm({
        message: "确定要删除吗？"
      })
        .then(async () => {
          // on confirm
          // console.log(this.user_id);
          // console.log(this.cartList[index].good_id);
          let p = await cartsApi.deleteO(
            this.user_id,
            this.cartList[index].good_id
          );
          this.$notify({ type: "success", message: "删除成功" });
          // this.fetchall();
          this.cartList.splice(index, 1); // 删除一行数据
          // console.log(this.cartList);
          this.fetchall();
          // console.log(p);
        })
        .catch(() => {
          // on cancel
        });
    },

    // 结算
    payMoney() {
      this.$dialog.alert({
        message: "国家禁止售卖"
      }).then(() => {
        // on close
      });
    }
  },

  // 计算属性
  computed: {
    // 全选，反选
    allcheck: {
      get() {
        // 控制一级
        let arr = [];
        this.cartList.forEach(item => {
          let res = item.ischecked == true;
          arr.push(res);
        });

        this.hasAllChecked = arr.every(item => item == true);
        return this.hasAllChecked;
      },
      set(val) {
        // this.$notify({ type: 'success', message: '全选成功' });
        this.cartList.forEach(item => {
          item.ischecked = val;
        });
      }
    }
  },

  // 监听
  watch: {
    // + -数量
    cartList: {
      deep: true,
      handler(newval) {
        // 减数量的最小值
        newval.forEach(item => {
          if (item.num < 1) {
            item.num = 1;
            this.$dialog.alert({
              message: "不买休想走"
            }).then(() => {
              // on close
            });
          }
        });

        // 统计总数量和价格
        //统计选中的商品
        let filterarr = newval.filter(item => item.ischecked == true);

        //计算总数量和总价
        this.total = 0; //每次监听器有新值就先清空旧值
        this.allPrice = 0;
        this.oldNum = 0;
        this.cheapPrice = 0;
        filterarr.forEach(item => {
          this.total += item.num * 1;
          this.oldNum += item.num * item.oldprice;
          this.allPrice += item.num * item.newprice;
        });
        this.cheapPrice = this.oldNum - this.allPrice;
        // this.allPrice.tofix(2)
        // console.log(this.allPrice.toFixed(2))

        // console.log(newval);
        // 控制没商品时页面的样式
        if (newval.length == 0) {
          this.noCartShow = true;
          this.show = false;
        } else {
          this.noCartShow = false;
          this.show = true;
        }
      }
    }
  },
  created() {
    // console.log(this.user_id)
    this.fetchall();
  }
};
</script>

<style scoped>
@import "~@/assets/css/appcar.css";
.footer {
  height: 80px;
}
/* .wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
} */
</style>