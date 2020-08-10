<template>
  <div>
    <!-- 头部区域 -->
    <com-header :comtitle="titles"></com-header>
    <div class="content">
      <!--用户信息-->
      <div class="myHead">
        <div class="userInfor">
          <div class="headPortrait">
            <a href="/personalcenter">
              <img :src="imgHead" />
            </a>
          </div>
          <div class="userName">
            {{ name }}
            <a href="/personalcenter"></a>
          </div>
          <div class="userLeave">
            <a href="javascript:;" class="startLeave">
              <i class="star1">1</i>一星会员
            </a>
            <a href="javascript:;" class="integralNum">
              书虫值：
              <span>0</span>
            </a>
          </div>
          <div class="userLeave nomargin">
            再积攒
            <em>200</em>书虫值就可升级为二星会员啦！
          </div>
        </div>
        <div class="signIn">
          <a href="javascript:;"></a>
        </div>
        <div class="setUp">
          <a href="/personalcenter"></a>
        </div>
      </div>
      <!--订单栏-->
      <div class="orderBar">
        <div class="orderTit">
          <a href="/shopcar">
            <b>我的订单</b>
            <span>查看所有订单</span>
          </a>
        </div>
        <div class="orderCon">
          <ul>
            <li>
              <a href="javascript:;">
                <i>
                  <img src="@/assets/usercenter/1.png" />
                </i>
                <b>待付款</b>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <i>
                  <img src="@/assets/usercenter/2.png" />
                </i>

                <b>待收货</b>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <i>
                  <img src="@/assets/usercenter/3.png" />
                </i>
                <b>待评价</b>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <i>
                  <img src="@/assets/usercenter/4.png" />
                </i>
                <b>退换货</b>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 用户资产 -->
      <div class="assetsBar">
        <ul>
          <li>
            <a href="javascript:;">
              <span>0张</span>
              <b>优惠劵</b>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <span>¥0</span>
              <b>余额</b>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <span>0</span>
              <b>书币</b>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <span>0张</span>
              <b>书馨卡</b>
            </a>
          </li>
        </ul>
      </div>
      <!--用户操作方式-->
      <div class="shortcut">
        <ul>
          <li>
            <a href="javascript:;">
              <i>
                <img src="@/assets/usercenter/5.png" />
              </i>
              <b>签到抽红包</b>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <i>
                <img src="@/assets/usercenter/6.png" />
              </i>
              <b>我的收藏</b>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <i>
                <img src="@/assets/usercenter/7.png" />
              </i>
              <b>收货地址</b>
            </a>
          </li>
          <li style="border-right:none">
            <a href="javascript:;">
              <i>
                <img src="@/assets/usercenter/8.png" />
              </i>
              <b>邀请返利</b>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <i>
                <img src="@/assets/usercenter/9.png" />
              </i>
              <b>书币换劵</b>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <i>
                <img src="@/assets/usercenter/10.png" />
              </i>
              <b>我的评论</b>
            </a>
          </li>

          <li>
            <a href="/personalcenter">
              <i>
                <img src="@/assets/usercenter/11.png" />
              </i>
              <b>修改密码</b>
            </a>
          </li>

          <li style="border-bottom:none;border-right:none;">
            <a href="javascript:;">
              <i>
                <img src="@/assets/usercenter/12.png" />
              </i>
              <b>帮助中心</b>
            </a>
          </li>
        </ul>
      </div>
      <!--为你推荐-->
      <tui-jian></tui-jian>
      <!--退出登录-->
      <div class="signOut">
        <a href="javascript:;" @click="lognout()">退出登录</a>
      </div>
    </div>
  </div>
</template>

<script>
// 引入头部组件
import centerApi from "@/api/centerApi";
import comHeader from "@/components/comHeader";
import tuiJian from "@/components/tuiJian";
// 引入拿到user_id的接口
import { getUser } from "@/utils/auth";

export default {
  data() {
    return {
      titles: "我的中图",
      imgHead: require("@/assets/images/portrait.png"),
      username: "",
      user_id: null,
      name: ""
    };
  },

  components: { comHeader, tuiJian },

  methods: {
    back() {
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },
    //功能：点击退出登录
    lognout() {
      this.$dialog.confirm({
        title: "确认退出吗?",
        message: ""
      })
        .then(() => {
          // on confirm
          centerApi.logOut();
          this.$router.push("/");
        })
        .catch(() => {
          // on cancel
        });
    },
    // 功能: 获取用户名user_id
    getUserId() {
      this.user_id = JSON.parse(getUser()).user_id;
      // console.log(this.user_id);
    },
    // 功能: 获取用户信息
    async getUserInf() {
      let p = await centerApi.getUserInf(this.user_id);
      // console.log(p.data.data[0]);
      if (p.data.data[0].pic == null || p.data.data[0].pic == "") {
        this.imgHead = require("@/assets/images/portrait.png");
      } else {
        this.imgHead = p.data.data[0].pic;
      }
      if (p.data.data[0].name == null || p.data.data[0].name == "") {
        this.name = "昵称";
      } else {
        this.name = p.data.data[0].name;
      }
    }
  },
  created() {
    this.getUserId();
    this.getUserInf();
  }
};
</script>

<style scoped>
/* 引入主体样式 */
@import "~@/assets/css/usercenter.css";
body {
  padding: 52.8px 0 52.8px;
  background: #f3f3f3;
}
.shortcut ul li {
  width: 24.7%;
}

.signOut {
  margin-bottom: 60px;
  margin-top: -60px;
}
</style>