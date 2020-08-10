<!--
 * @description: 
 * @author: 黄升滨，成启航，Lk李铠岚
 * @Date: 2020-07-31 10:27:15
 * @LastEditTime: 2020-07-31 16:55:14
--> 

<template>
  <!-- 登陆页组件 -->
  <div class="main">
    <div class="login-form">
      <h2 class="login-title">中国图书网管理系统-登陆</h2>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="keep">
          <el-checkbox v-model="ruleForm.checked" @click.native="keep($event)">保留7天免登陆</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="float:right;">登陆</el-button>
          <!-- <el-button @click="gotoReg" style="float:right;margin-right:5px">注册</el-button> -->
        </el-form-item>

        <el-link href="/#/reg">没有账号，前往注册</el-link>
      </el-form>
    </div>
  </div>
</template>

<script>
import userApi from "@/api/usersApi"; /* 引入接口 */
import { setToken, setUser } from "@/utils/auth";

export default {
  data() {
    return {
      ruleForm: {
        name: "",
        password: "",
        checked: false
      },
      rules: {
        //正则
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
          //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },

  components: {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 验证通过，发送请求
          try {
            let pwd = this.$md5(this.ruleForm.password);
            let p = await userApi.login(this.ruleForm.name, pwd);

            // console.log(p);

            if (p.data.flag) {
              this.$message({
                message: "登录成功",
                type: "success"
              });

              let userinf = {
                username: this.ruleForm.name,
                user_id: p.data.user_id
              };
              if (this.ruleForm.checked) {
                setToken(p.data.token, 7);
                setUser(JSON.stringify(userinf), 7);
              } else {
                setToken(p.data.token);
                setUser(JSON.stringify(userinf));
              }

              // 跳转到首页
              this.$router.push("/home")
            } else {
              this.$message({
                message: "用户名或密码错误",
                type: "error"
              });
            }
            // alert("submit!");
          } catch (err) {}
        } else {
          this.$message({
            message: "服务器问题",
            type: "error"
          });
          return false;
        }
      });
    },
    gotoReg() {
      this.$router.push("/reg");
    },

    // 解决复选框
    keep(ev) {
      if (ev.target.tagName == "INPUT") return;
      if (!this.ruleForm.checked) {
        this.$message({
          message: "请不要在公共场合使用该功能",
          type: "error"
        });
      }
    }
  },

  watch: {},

  created(){
    if(this.$route.query){
      this.ruleForm.name = this.$route.query.name
    }
  }
};
</script>

<style scoped>
.login-form {
  width: 350px;
  /* 上下间隙150px, 左右自动 */
  margin: 160px auto;
  /*透明背景色*/
  background-color: rgb(255, 255, 255, 0.8);
  padding: 30px;
  padding-right: 60px;
  /* 圆角 */
  border-radius: 20px;
}
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/img/timg.jpg") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
/* 标题 */
.login-title {
  text-align: center;
  color: #303133;
  margin-bottom: 20px;
}
</style>