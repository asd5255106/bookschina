<!--
 * @description: 
 * @author: 黄升滨，成启航，Lk李铠岚
 * @Date: 2020-07-31 10:26:00
 * @LastEditTime: 2020-07-31 19:41:10
--> 

<template>
  <div class="main">
    <!-- 面包屑：导航 -->
    <app-link :name="title"></app-link>

    <!-- 搜索表单 -->
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchForm.name" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.sex" placeholder="性别">
          <el-option label="女" value="女"></el-option>
          <el-option label="男" value="男"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchall" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="reset" icon="el-icon-refresh-left">重置</el-button>
        <el-button type="primary" @click="addUser" icon="el-icon-document">新增</el-button>
      </el-form-item>
    </el-form>

    <!-- 用户列表页 -->
    <el-table :data="userList" stripe style="width: 100%" height="452px">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column label="头像" width="80">
        <template slot-scope="scope">
          <!-- scope指整个数据对象。scope.row指当前行数据 -->
          <img :src="scope.row.pic" alt style="width:50px;height:50px;" />
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="120"></el-table-column>
      <el-table-column prop="name" label="昵称" width="120"></el-table-column>
      <el-table-column prop="sex" label="性别" width="90"></el-table-column>
      <el-table-column prop="Telephone" label="手机号码" width="180"></el-table-column>
      <el-table-column prop="address" label="地址" width="270"></el-table-column>
      <el-table-column prop="birthday" label="出生日期" width="180"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="editUser(scope.row)"></el-button>
          <!-- <el-button type="danger" icon="el-icon-delete" @click="delUser(scope.row)">删除</el-button> -->
          <el-button type="danger" icon="el-icon-delete" circle @click="delUser(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <!-- v-show="pages > 1" -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5,10,15,20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 新增用户 -->
    <el-dialog :title="isAdd?'添加用户':'编辑用户'" :visible.sync="dialogFormVisible" width="600px">
      <el-form
        :rules="rules"
        :model="ruleForm"
        label-position="right"
        label-width="100px"
        class="demo-ruleForm"
        ref="ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="ruleForm.username"
            autocomplete="off"
            placeholder="请输入用户名"
            style="width:300px"
            :disabled="isAdd?false:true"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="请输入密码"
            style="width:300px"
            :disabled="isAdd?true:false"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input
            v-model="ruleForm.name"
            autocomplete="off"
            placeholder="请输入昵称"
            style="width:300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="性别">
            <el-option label="女" value="女"></el-option>
            <el-option label="男" value="男"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码" prop="Telephone">
          <el-input
            v-model.trim="ruleForm.Telephone"
            autocomplete="off"
            style="width:300px"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker
            v-model="ruleForm.birthday"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="address" label="地址">
          <el-input
            v-model="ruleForm.address"
            autocomplete="off"
            style="width:300px"
            placeholder="请输入地址"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pic" label="上传头像">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="/dev-api/manager/add"
            :file-list="fileList"
            :http-request="httpRequest"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-change="onChange"
            :before-remove="beforeRemove"
            :on-exceed="handleExceed"
            multiple
            :limit="1"
            name="photos"
            :auto-upload="false"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="isAdd ? add() : edit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import appLink from "@/components/link";
import usersApi from "@/api/usersApi";
export default {
  data() {
    /**
     * @value    该表单的value值
     * @callback   回调函数
     */

    var validateName = (rule, value, callback) => {
      let reg = /1[3-9]\d{9}/;
      if (reg.test(value) && value.length == 11) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号码"));
      }
    };

    var validateUserName = (rule, value, callback) => {
      usersApi
        .checkName(value)
        .then(res => {
          // console.log(res);
          if (res.data.flag) {
            //可以注册
            callback();
          } else {
            //已存在，不可以注册
            callback(new Error("用户名已存在"));
          }
        })
        .catch(err => {
          callback(new Error("服务器繁忙，稍后再试"));
        });
    };
    return {
      title: "用户管理",
      searchForm: {}, //查询条件
      userList: [],

      page: 1, // 当前页
      pagesize: 5, // 一页多少条
      pages: 0, // 总页数
      total: 0, // 总条数

      dialogFormVisible: false, // 弹出层
      ruleForm: {
        password: 123456 //密码
      },
      isAdd: true,
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { validator: validateUserName, trigger: "blur" } //验证用户名是否存在
        ],
        // name: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
        Telephone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" }, // 手机号码不能为空
          { validator: validateName, trigger: "blur" } //验证手机格式
        ]
      },
      fileList: [
        //存储图片的地方：已上传图片
      ]
    };
  },

  components: { appLink },

  methods: {
    // 进入页面就发送请求，获取用户列表渲染
    async fetchall() {
      try {
        // console.log(this.page)
        let p = await usersApi.getList(
          this.page,
          this.pagesize,
          this.searchForm
        );
        if (p.data.flag) {
          this.userList = p.data.data;
          this.total = p.data.total;
          this.pages = p.data.pages;
          // this.page = p.data.page * 1
          // console.log(this.total);
          // console.log(this.pages);
        } else {
          this.$message({
            message: "暂无该数据，请重新输入",
            type: "warnning"
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 重置
    reset() {
      this.searchForm = {};
      this.fetchall();
    },
    // 打开新增弹出层
    addUser() {
      this.isAdd = true;
      this.dialogFormVisible = true;
      this.ruleForm = { password: 123456 };
      this.fileList = [];
      // this.$refs.ruleForm.resetFields()
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate();
      });
    },
    // 打开编辑弹出层
    editUser(row) {
      // console.log(row);
      this.isAdd = false; //编辑弹窗设置为false
      this.fileList = [];
      this.dialogFormVisible = true; //点击打开弹窗
      this.ruleForm = row;
      console.log(this.ruleForm);
      let obj = {
        name: this.ruleForm.pic,
        url: this.ruleForm.pic
      };
      this.fileList.push(obj);
      // console.log(this.ruleForm)
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate();
        // this.$refs.ruleForm.resetFields();
      });
    },
    //功能：点击确定按钮，修改用户信息
    edit() {
      // Number(this.$md5(this.ruleForm.password)
      this.$refs.upload.submit();
      console.log(typeof this.$md5(this.ruleForm.password));
      console.log(typeof this.ruleForm.password);
      let form = new FormData();
      form.append("username", this.ruleForm.username);
      form.append("password", this.$md5(this.ruleForm.password));
      form.append("name", this.ruleForm.name || "");
      form.append("sex", this.ruleForm.sex || "");
      form.append("Telephone", this.ruleForm.Telephone || "");
      form.append("birthday", this.ruleForm.birthday || "");
      form.append("address", this.ruleForm.address || "");
      form.append("user_id", this.ruleForm.user_id);

      this.fileList.forEach(file => {
        form.append("files", file.raw); //此处一定是append file.raw 上传文件只需维护fileList file.raw.name要加上
        form.append("fileNames", file.name);
      });

      //把数据以form-data的形式发送给后端
      usersApi.editUser(form).then(res => {
        if (res.data.flag) {
          // 修改成功
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.dialogFormVisible = false; /* 关闭弹出层 */
          this.fetchall();
        } else {
          this.$message({
            message: "修改失败",
            type: "error"
          });
        }
      });
    },
    // 删除一条
    delUser(row) {
      this.$confirm("此操作将永久删除该用户吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确认后删除
          usersApi.delUser(row.user_id).then(res => {
            if (res.data.flag) {
              //修改成功
              this.$message({
                message: "删除成功",
                type: "success"
              });

              if ((this.total - 1) % this.pagesize == 0) {
                this.page = this.page - 1;
              }

              this.fetchall();
            } else {
              //修改失败
              this.$message({
                message: "删除失败",
                type: "error"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 每页多少条
    handleSizeChange(val) {
      this.pagesize = val;
      this.page = 1;
      this.fetchall();
    },
    // 第几页
    handleCurrentChange(val) {
      this.page = val;
      this.fetchall();
    },
    // 添加新用户
    add() {
      // console.log(typeof this.ruleForm.password );
      
      // console.log(typeof this.$md5(this.ruleForm.password));
      this.$refs.ruleForm.validate(async res => {
        if (res) {
          //手动提交图片的关键
          this.$refs.upload.submit();
          //正则校验通过：运行上传数据添加新用户
          let form = new FormData();
          form.append("username", this.ruleForm.username);
          form.append("password", this.$md5(`${this.ruleForm.password}`));
          form.append("name", this.ruleForm.name || "");
          form.append("sex", this.ruleForm.sex || "");
          form.append("Telephone", this.ruleForm.Telephone || "");
          form.append("birthday", this.ruleForm.birthday || "");
          form.append("address", this.ruleForm.address || "");

          this.fileList.forEach(file => {
            console.log(file);
            form.append("files", file.raw); //此处一定是append file.raw 上传文件只需维护fileList file.raw.name要加上
            form.append("fileNames", file.name);
          });

          // console.log(form);
          try {
            let p = await usersApi.addUser(form);
            // console.log(p);
            if (p.data.flag) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.dialogFormVisible = false; /* 关闭弹窗 */

              // console.log(this.total, this.pagesize);
              if (this.total % this.pagesize == 0) {
                // this.pages = this.pages + 1
                this.page = this.page + 1;
                this.total = this.total + 1;
              }
              // console.log(this.page);
              this.fetchall();
            } else {
              this.$message({
                message: "添加失败",
                type: "error"
              });
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          this.$message({
            message: "注意书写条件",
            type: "error"
          });
        }
      });
    },

    //功能：文件上传(上传头像)
    httpRequest(file) {
      console.log(file, 111);
    },
    onChange(file, fileList) {
      // console.log(fileList)
      this.fileList = fileList;
    },
    //功能：删除已上传图片
    handleRemove(file, fileList) {
      // 删除文件
      // console.log(this.ruleForm)
      console.log(file);
      let url = file.url;
      // console.log(this.ruleForm,url)
      usersApi.delPic(this.ruleForm.user_id, url).then(res => {
        console.log(res.data, 999);
        if (res.data.flag) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "删除失败",
            type: "error"
          });
        }
      });
    },
    handlePreview(file) {
      console.log(file, "handlePreview");
    },
    //功能：选择图片超过规定提示
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    //功能：删除图片前提示
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  },

  created() {
    this.fetchall(); // 进入页面就发起请求
  }
};
</script>

<style scoped>
.el-form {
  margin-top: 20px;
}
.el-pagination {
  text-align: center;
  margin-top: 30px;
}
.el-pagination .el-pager li {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #ccc;
  margin-right: 5px;
}
.el-pagination .el-pager .active {
  background: #58bc58;
  color: #fff;
  cursor: pointer;
}
</style>