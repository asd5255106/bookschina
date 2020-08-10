<template>
  <div class="login">
    <!--头部区域-->
    <com-header :comtitle="titles"></com-header>
    <!-- 登录内容区域 -->
    <div class="content">
      <div class="loginForm">
        <div class="inputItem userNameWrap">
          <span class="label"></span>
          <div class="inputWrap">
            <input
              type="text"
              class="inputblock userName"
              id="userName"
              name="userName"
              autocomplete="off"
              placeholder="用户名/邮箱/已验证手机"
              v-model="name"
              @input="showCloseTxtName"
            />
            <span
              @click="clearName"
              class="clearInput"
              v-show="clearInputName"
              style="display: none;right: 2.5rem;"
            ></span>
          </div>
        </div>
        <div class="inputItem userPasWrap">
          <span class="label"></span>
          <div class="inputWrap">
            <input
              :type="pwdInput"
              class="inputblock userPas"
              id="userPas"
              name="userPas"
              autocomplete="off"
              placeholder="请输入密码"
              v-model="pwd"
              @input="showCloseTxtPwd"
            />
            <span
              @click="clearPwd"
              class="clearInput"
              v-show="clearInputPwd"
              style="display: none;"
            ></span>
            <span @click="changShowPas" :class="{IsShowPas: true, show: showPas}" id="IsShowPas"></span>
          </div>
        </div>
        <div class="inputItem imgcodeWrap ImgCode">
          <!-- 图形验证码 -->
          <div class="inputWrap">
            <input
              type="text"
              class="inputblock"
              id="imgcode"
              autocomplete="off"
              placeholder="请输入图形验证码"
              v-model="code"
              @input="showCloseTxtCode"
            />
            <span
              @click="clearCode"
              class="clearInput"
              v-show="clearInputCode"
              style="display: none;"
            ></span>
          </div>
          <div class="imgWrap" id="modifycodeImg">
            <canvas width="200" height="100" id="captcha" style="width:100%;height:100%"></canvas>
          </div>
        </div>
        <!-- 七天免登陆 -->
        <van-checkbox v-model="checked" icon-size="0.5rem">保留7天免登陆</van-checkbox>
        <!-- 登录按钮 -->
        <div class="nextStep" @click="login">
          <span>登录</span>
        </div>

        <div class="loginLink">
          <a href="javascript:;" class="forgotPasLink">忘记密码</a>
          <a class="registLink" href="/reg">新用户注册</a>
        </div>
      </div>

      <div class="thirdLogin">
        <div class="thirdTitle">
          <em>第三方账号登录</em>
        </div>
        <ul class="li3">
          <li class="qq">
            <a href="javascript:;">
              <img src="@/assets/images/login/newqq.png" />
              <b>QQ登录</b>
            </a>
          </li>
          <li class="sina">
            <a href="javascript:;">
              <img src="@/assets/images/login/newweibo.png" />
              <b>微博登录</b>
            </a>
          </li>
          <li class="sina">
            <a href="javascript:;">
              <img src="@/assets/images/login/baiduloginicon.png" />
              <b>百度登录</b>
            </a>
          </li>
        </ul>
      </div>
      <div class="explainLink">
        <a href="javascript:;">如何绑定微信和中图网账户?</a>
      </div>
    </div>
    <!-- 错误提示 -->
    <div class="errorTip" v-show="showError" style="display: block;">
      <div>
        <p>
          <span class="text">{{ errorTip }}</span>
        </p>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="popLayerbg"></div>
  </div>
</template>

<script>
// 引入头部组件
import comHeader from "@/components/comHeader";
// 引入图形验证码插件
import CaptchaMini from "captcha-mini";
// 引入接口
import userApi from "@/api/userApi";
// 引入cookie接口
import { setToken, setUser } from "@/utils/auth";

export default {
  data() {
    return {
      titles: "登录",
      clearInputName: false,
      clearInputPwd: false,
      clearInputCode: false,
      showError: false,
      name: "",
      pwd: "",
      code: "",
      rightCode: "",
      errorTip: "",
      checked: false,
      showPas: false,
      pwdInput: "password"
    };
  },

  components: {comHeader},

  mounted() {
    // 验证码配置
    // window.onload = () => {
    let captcha = new CaptchaMini({
      lineWidth: 1, //线条宽度
      lineNum: 0, //线条数量
      dotR: 1.5, //点的半径
      dotNum: 50, //点的数量
      preGroundColor: [10, 80], //前景色区间
      backGroundColor: [255, 255], //背景色区间
      fontSize: 60, //字体大小
      fontFamily: ["Georgia", "微软雅黑", "Helvetica", "Arial"], //字体类型
      fontStyle: "fill", //字体绘制方法，有fill和stroke
      content: "0123456789qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM", //验证码内容
      length: 4 //验证码长度
    });
    captcha.draw(document.querySelector("#captcha"), r => {
      // console.log(r);
      this.rightCode = r;
      // console.log(this.rightCode);
    });
    // };
  },

  methods: {
    // 功能: 封装显示错误提示
    showErrortip(msg) {
      this.errorTip = msg;
      this.showError = true;
      // 三秒后关闭
      let timer = setTimeout(() => {
        this.showError = false;
      }, 3000);
    },

    // 功能: 登录
    login() {
      // console.log(this.code.toLowerCase());
      // console.log(this.rightCode.toLowerCase());
      if (this.code.toLowerCase() == this.rightCode.toLowerCase()) {
        // 验证码正确
        // console.log("验证码正确");
        this.showError = false;
        if (this.name != "") {
          // 用户名不为空
          if (this.pwd != "") {
            // 密码不为空
            // 验证通过, 发送请求
            // console.log("验证通过, 发送请求")
            let pwd = this.$md5(this.pwd);
            let p = userApi.login(this.name, pwd);
            p.then(res => {
              // console.log(res.data);
              if (res.data.flag) {
                // 登录成功, 自动跳转
                let userinf = {
                  username: this.name,
                  user_id: res.data.data[0].user_id
                };
                if (this.checked) {
                  // 如果选了7天免登陆
                  setToken(res.data.token, 7);
                  setUser(JSON.stringify(userinf), 7);
                } else {
                  setToken(res.data.token);
                  setUser(JSON.stringify(userinf));
                }
                this.$router.push("/usercenter");
              } else {
                // 登录失败
                this.showErrortip("账号或密码错误, 请重新登录");
              }
            }).catch(err => {
              console.log(err);
            });
          } else {
            // 密码为空
            this.showErrortip("请输入密码");
          }
        } else {
          // 用户名为空
          this.showErrortip("请输入用户名");
        }
      } else {
        // 验证码错误
        // console.log("验证码错误");
        this.showErrortip("图片验证码输入错误！");
      }
    },
    // 功能: 输入时, 显示close图标
    showCloseTxtName() {
      if (this.name == "") {
        this.clearInputName = false;
      } else {
        this.clearInputName = true;
      }
    },
    showCloseTxtPwd() {
      if (this.pwd == "") {
        this.clearInputPwd = false;
      } else {
        this.clearInputPwd = true;
      }
    },
    showCloseTxtCode() {
      if (this.code == "") {
        this.clearInputCode = false;
      } else {
        this.clearInputCode = true;
      }
    },
    // 功能: 点击关闭图标时, 清空input
    clearName() {
      this.name = "";
      this.clearInputName = false;
    },
    clearPwd() {
      this.pwd = "";
      this.clearInputPwd = false;
    },
    clearCode() {
      this.code = "";
      this.clearInputCode = false;
    },
    // 功能: 点击显示密码/隐藏密码
    changShowPas() {
      this.showPas = !this.showPas;
      if (this.pwdInput == "password") {
        this.pwdInput = "text";
      } else {
        this.pwdInput = "password";
      }
    }
  },

  created() {}
};
</script>

<style scoped>
@import "~@/assets/css/common.css";
@import "~@/assets/css/login.css";
body {
  padding: 0;
}
</style>