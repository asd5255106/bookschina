<!--
 * @description: 
 * @author: 黄升滨，成启航，Lk李铠岚
 * @Date: 2020-07-28 19:42:59
 * @LastEditTime: 2020-08-06 08:20:15
--> 

<template>
  <div class="header">
    <!-- 头部左侧Logo和标题 -->
    <a href="#/">
      <img class="logo" src="@/assets/img/title.jpg" width="35px" />
      <span class="company">
        <b>中国图书网管理系统</b>
      </span>
    </a>

    <!-- 下拉菜单 -->
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{userinf.username}}，欢迎您  个人中心
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="edit">修改密码</el-dropdown-item>
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <!-- 对话框：修改密码 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="450px">
      <el-form
        :rules="rules"
        :model="ruleForm"
        label-position="right"
        label-width="80px"
        class="demo-ruleForm"
        ref="ruleForm"
      >
        <el-form-item label="旧密码" prop="oldpwd">
          <el-input
            v-model="ruleForm.oldpwd"
            autocomplete="off"
            placeholder="请输入你的旧密码"
            style="width:300px"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpwd">
          <el-input
            v-model="ruleForm.newpwd"
            autocomplete="off"
            style="width:300px"
            placeholder="请输入你要设置的新密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpwd">
          <el-input
            v-model="ruleForm.checkpwd"
            autocomplete="off"
            style="width:300px"
            placeholder="请再次输入你要设置的新密码"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editpwd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//  @click="editpwd"
import { logOut, getUser } from "@/utils/auth";
import userApi from "@/api/usersApi";
export default {
  data() {
    // 验证旧密码是否正确
    var validatePwd = (rule, value, callback) => {
      /**
       * @value  该表单的value值:密码
       * @callback   回调函数
       */

      let pwd = this.$md5(value);
      userApi
        .login(this.userinf.username, pwd)
        .then(res => {
          if (res.data.flag) {
            // 旧密码是正确的
            callback();
          } else {
            // 旧密码不正确
            callback(new Error("旧密码错误"));
          }
        })
        .catch(err => {
          callback(new Error("服务器繁忙，稍后再试"));
        });
    };

    // 验证新密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkpwd !== "") {
          this.$refs.ruleForm.validateField("checkpwd");
        }
        callback();
      }
    };

    // 再次确认密码
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newpwd) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };

    return {
      dialogFormVisible: false, //对话框的显示状态：false：不显示
      ruleForm: {
        oldpwd: "", //旧密码
        newpwd: "", //新密码
        checkpwd: "" //确认密码
      },
      userinf: {},
      rules: {
        //正则
        oldpwd: [
          { required: true, message: "旧密码不能为空", trigger: "blur" }, //用户名不能为空
          { validator: validatePwd, trigger: "blur" }
        ],
        newpwd: [{ validator: validatePass, trigger: "blur" }],
        checkpwd: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },

  components: {},

  methods: {
    handleCommand(command) {
      if (command == "edit") {
        // 修改密码弹出层
        this.dialogFormVisible = true;
      } else if (command == "logout") {
        // 退出
        logOut(); /* 删除cookie数据 */
        this.$message({
          message: "退出成功",
          type: "success",
          duration: 2000
        });

        this.$router.push("/login");
      }
    },

    // 点击确定按钮，确定修改密码
    editpwd() {
      this.$refs.ruleForm.validate(async res => {
        if (res) {
          try {
            let pwd = this.$md5(this.ruleForm.checkpwd);
            let p = await userApi.editPwd(
              this.userinf.username,
              pwd,
              this.userinf.user_id
            );

            if (p.data.flag) {
              this.dialogFormVisible = false;
              this.$message({
                message: "修改成功",
                type: "success"
              });
              // 跳到登录页
              this.$router.push("/login");

              logOut();
            } else {
              // 修改失败
              this.$message({
                message: "修改失败",
                type: "error"
              });
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          return;
        }
      });
    }
  },

  // 获取用户信息
  created() {
    let userinf = getUser();
    if (userinf) {
      this.userinf = JSON.parse(userinf);
    }
  }
};
</script>

<style scoped>
.logo {
  vertical-align: middle;
  /* 上 右 下 左 */
  padding: 0 10px 0 40px;
}
.company {
  position: absolute;
  color: white;
}

.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown {
  float: right;
  padding-right: 20px;
}
</style>
