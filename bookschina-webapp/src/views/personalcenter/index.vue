<template>
  <div class="personalcenter">
    <!-- 头部区域 -->
    <com-header :comtitle="titles"></com-header>
    <!-- 主区域 -->
    <div class="xiu">
      <div class="content">
        <div class="personalInfor">
          <div class="portraitWrap">
            <div class="portrait">
              <img :src="this.fileList[0].url" />
              <!-- <van-uploader multiple v-model="fileList" :after-read="afterRead" :max-count="1" /> -->
            </div>
            <div class="text">
              <!-- 点击更换头像 -->
              <van-uploader multiple :after-read="afterRead" :max-count="1">
                <van-button>点击更换头像</van-button>
              </van-uploader>
            </div>
            <!-- <input type="file" ref="file" id="file" @change="getImg" /> -->
          </div>
          <ul>
            <li @click="changeMsg(index)" v-for="(item, index) in msgList" :key="index">
              <a href="javascript:;">
                <b>{{ item.title }}</b>
                <span>{{ item.msg }}</span>
              </a>
              <!-- 放在里面对话框会重复弹出 -->
            </li>
          </ul>
        </div>

        <van-dialog
          v-for="(item, index) in msgList"
          :key="index"
          v-model="item.showDialog"
          title="修改个人信息"
          show-cancel-button
          :beforeClose="((action, done)=>{chargeBtn(action, done, index)})"
          closeOnPopstate
        >
          <van-field
            v-model="item.msg"
            rows="1"
            autosize
            :label="item.title"
            type="textarea"
            :placeholder="'请输入要修改的' + item.title"
          />
        </van-dialog>
      </div>
    </div>
    <!-- 退出登录 -->
    <div class="xiu1">
      <div class="exitBtn">
        <a href="javascript:;" @click.stop="logout">退出登录</a>
      </div>
    </div>
    <!-- 轻提示 -->
    <div id="layui-m-layer10" class="layui-m-layer layui-m-layer0" index="10" v-show="showUpdata">
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
// 引入头部组件
import comHeader from "@/components/comHeader";
// 引入拿到user_id的接口
import { getUser, logOut } from "@/utils/auth";
// 引入接口
import personalcenterApi from "@/api/personalcenterApi";

export default {
  data() {
    return {
      fileList: [{ url: require("@/assets/images/portrait.png") }],
      showUpdata: false,
      user_id: null,
      titles: "修改中心",
      img: "", //头像
      tip: "",
      msgList: [
        {
          title: "登录名",
          name: "username",
          msg: "",
          showDialog: false
        },
        {
          title: "昵称",
          name: "name",
          msg: "",
          showDialog: false
        },
        {
          title: "性别",
          name: "sex",
          msg: "",
          showDialog: false
        },
        {
          title: "手机号码",
          name: "Telephone",
          msg: "",
          showDialog: false
        },
        {
          title: "收货地址",
          name: "address",
          msg: "",
          showDialog: false
        },
        {
          title: "生日日期",
          name: "birthday",
          msg: "",
          showDialog: false
        },
        {
          title: "修改密码",
          name: "password",
          msg: "******",
          showDialog: false
        }
      ]
    };
  },

  components: { comHeader },

  methods: {
    // 功能: 封装弹出轻提示
    showTip(tip) {
      this.tip = tip;
      this.showUpdata = true;
      setTimeout(() => {
        this.showUpdata = false;
      }, 1000);
    },
    // 功能: 退出登录
    logout() {
      this.$dialog.confirm({
        title: "确认退出吗?",
        message: ""
      })
        .then(() => {
          // on confirm
          logOut();
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
      let p = await personalcenterApi.getUserInf(this.user_id);
      // console.log(p.data.data[0]);
      // 把信息插入到对应的msgList中
      this.msgList[0].msg = p.data.data[0].username;
      this.msgList[1].msg = p.data.data[0].name;
      this.msgList[2].msg = p.data.data[0].sex;
      this.msgList[3].msg = p.data.data[0].Telephone;
      this.msgList[4].msg = p.data.data[0].address;
      this.msgList[5].msg = p.data.data[0].birthday;
      // this.msgList[6].msg = p.data.data[0].password;
      // console.log(p.data.data[0].pic);
      if (p.data.data[0].pic == null || p.data.data[0].pic == "") {
        this.fileList[0].url = require("@/assets/images/portrait.png");
      } else {
        this.fileList[0].url = p.data.data[0].pic;
      }
    },
    // 功能: 点击弹出对话框
    changeMsg(index) {
      if (index != 0) {
        this.msgList[index].showDialog = true;
      } else {
        this.showTip("登录名请联系客服进行修改");
      }
    },
    chargeBtn(action, done, index) {
      // 拿到index值
      // console.log(index);
      // 拿到要传给后端的opt
      // console.log(this.msgList[index].name);
      let opt = this.msgList[index].name;
      let text = this.msgList[index].msg;
      // 如果是修改密码, 要经过md5加密
      if (opt == "password") {
        text = this.$md5(this.msgList[index].msg);
        // console.log(text);
      }
      let user_id = this.user_id;
      // console.log(this.user_id, opt, text);
      let form = new FormData();
      form.append("opt", opt);
      form.append("text", text);
      form.append("user_id", user_id);
      // console.log(form);
      //确认or取消
      if (action === "cancel") {
        //取消按钮
        this.getUserInf();
        done();
      } else if (action === "confirm") {
        //确定按钮
        //向后端传值并关闭dialog弹出框
        personalcenterApi.updateUserInf(form);
        this.showTip(this.msgList[index].title + "修改成功");
      }
      done();
    },
    // 功能: 上传头像
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file);
      // file.file是文件的本体
      // console.log(file.file);
      // file.content是文件的二进制
      // console.log(file.content);
      // 把图片路径放到this.fileList[0].url上
      this.fileList[0].url = file.content;
      // 修改的信息存到数据库
      let user_id = this.user_id;
      let form = new FormData();
      form.append("user_id", user_id);
      form.append("files", file.file);
      personalcenterApi.updateUserInf(form);
      this.showTip("头像修改成功");
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
@import "~@/assets/css/person.css";
</style>