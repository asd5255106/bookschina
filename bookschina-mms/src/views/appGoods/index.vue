<!--
 * @description: 
 * @author: 黄升滨，成启航，Lk李铠岚
 * @Date: 2020-07-31 16:51:38
 * @LastEditTime: 2020-07-31 17:20:54
--> 

<template>
  <div class="main">
    <!-- 面包屑：导航 -->
    <app-link :name="title"></app-link>

    <!-- 搜索表单 -->
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchForm.title" placeholder="书名"></el-input>
      </el-form-item>
      <!-- 最低价框 -->
      <el-select v-model="searchForm.min" placeholder="最低价" style="width:100px">
        <el-option v-for="item in min" :key="item.value" :value="item.value"></el-option>
      </el-select>
      ——
      <!-- 最高价框 -->
      <el-select v-model="searchForm.max" placeholder="最高价" style="width:100px">
        <el-option v-for="item in max" :key="item.value" :value="item.value"></el-option>
      </el-select>

      <el-form-item>
        <el-button type="primary" @click="fetchall" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="reset" icon="el-icon-refresh-left">重置</el-button>
        <el-button type="primary" @click="addGoods" icon="el-icon-document">新增</el-button>
      </el-form-item>
    </el-form>

    <!-- 用户列表页 -->
    <el-table :data="goodsList" stripe style="width: 100%" height="452px">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column label="图片" width="100">
        <template slot-scope="scope">
          <!-- scope指整个数据对象。scope.row指当前行数据 -->
          <img :src="scope.row.img" alt style="width:50px;height:50px;" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="书名" width="250"></el-table-column>
      <el-table-column prop="author" label="作者/出版社" width="350"></el-table-column>
      <el-table-column prop="newprice" label="价格" width="100"></el-table-column>
      <el-table-column prop="dis" label="折扣" width="200"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="editGoods(scope.row)"></el-button>
          <!-- <el-button type="danger" icon="el-icon-delete" @click="delUser(scope.row)">删除</el-button> -->
          <el-button type="danger" icon="el-icon-delete" circle @click="delGoods(scope.row)"></el-button>
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

    <!-- 新增用户 :rules="rules"-->
    <el-dialog :title="isAdd?'添加商品':'编辑商品'" :visible.sync="dialogFormVisible" width="600px">
      <el-form
        :model="ruleForm"
        label-position="right"
        label-width="100px"
        class="demo-ruleForm"
        ref="ruleForm"
      >
        <el-form-item label="书名" prop="title">
          <el-input
            v-model="ruleForm.title"
            autocomplete="off"
            placeholder="请输入书名"
            style="width:300px"
            :disabled="isAdd?false:true"
          ></el-input>
        </el-form-item>
        <el-form-item label="作者/出版社" prop="author">
          <el-input
            v-model="ruleForm.author"
            autocomplete="off"
            placeholder="请输入作者/出版社"
            style="width:300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="newprice">
          <el-input
            v-model.trim="ruleForm.newprice"
            autocomplete="off"
            style="width:300px"
            placeholder="价格"
          ></el-input>
        </el-form-item>
        <el-form-item prop="dis" label="折扣">
          <el-input
            v-model="ruleForm.dis"
            autocomplete="off"
            style="width:300px"
            placeholder="请输入折扣"
          ></el-input>
        </el-form-item>
        <el-form-item prop="img" label="上传图片">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="/dev-api/manager/addgood"
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
import goodsApi from "@/api/goodsApi";
export default {
  data() {
    return {
      title: "商品管理",
      min: [
        {
          value: "0"
          // label: "0"
        },
        {
          value: "10"
          // label: "100"
        },
        {
          value: "20"
          // label: "200"
        },
        {
          value: "40"
          // label: "400"
        },
        {
          value: "90"
          // label: "500"
        }
      ],
      max: [
        {
          value: "10"
          // label: "50"
        },
        {
          value: "25"
          // label: "150"
        },
        {
          value: "35"
          // label: "250"
        },
        {
          value: "55"
          // label: "350"
        },
        {
          value: "150"
          // label: "550"
        }
      ],
      minValue: "",
      maxValue: "",
      searchForm: {
        // newprice:{}
      }, // 查询条件
      goodsList: [], // 商品列表

      page: 1, // 当前页
      pagesize: 5, // 一页多少条
      pages: 0, // 总页数
      total: 0, // 总条数

      dialogFormVisible: false,
      ruleForm: {},
      rules: {
        title: [{ required: true, message: "书名不能为空", trigger: "blur" }],
        newprice: [{ required: true, message: "价格不能为空", trigger: "blur" }]
      },
      isAdd: true,

      fileList: []
    };
  },

  components: { appLink },

  methods: {
    async fetchall() {
      try {
        // console.log(this.searchForm)
        if(this.searchForm.max && this.searchForm.min){
          let p = await goodsApi.goodList(
            this.page,
            this.pagesize,
            this.searchForm
          )
          // console.log(p)
          if(p.data.flag){
            this.goodsList = p.data.data
            this.total = p.data.total;
            this.pages = p.data.pages;
          }else{
            this.$message({
            message: "暂无该数据，请重新输入",
            type: "warnning"
          }); 
          }
        }else{

          let p = await goodsApi.getList(
          this.page,
          this.pagesize,
          this.searchForm
        );
        if (p.data.flag) {
          // console.log(123);
          this.goodsList = p.data.data;
          // goodsList.dis.splice(1,-1)
          // this.goodsList[0].dis.slice(1,-1)
          this.total = p.data.total;
          this.pages = p.data.pages;
          // console.log(this.page);
          // console.log(this.pages);
        // console.log("else",this.total);
        } else {
          this.$message({
            message: "暂无该数据，请重新输入",
            type: "warnning"
          }); 
        }
        }
        
        
      } catch (err) {
        console.log(err);
      }
    },
    reset() {
      this.searchForm = {};
      this.fetchall();
    },
    // 打开新增弹出层
    addGoods() {
      this.isAdd = true;
      this.dialogFormVisible = true;
      // this.$refs.ruleForm.resetFields()
      this.fileList = [];
      this.ruleForm = {};
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate();
      });
    },
    // 打开编辑弹出层
    editGoods(row) {
      // console.log(row);
      this.isAdd = false; //编辑弹窗设置为false
      this.dialogFormVisible = true; //点击打开弹窗
      this.ruleForm = row;
      this.fileList = [];
      console.log(this.ruleForm);
      let obj = {
        name: this.ruleForm.img,
        url: this.ruleForm.img
      };
      this.fileList.push(obj);
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate();
        // this.$refs.ruleForm.resetFields();
      });
    },
    // 修改商品信息
    edit() {
      this.$refs.upload.submit();

      let form = new FormData();
      form.append("title", this.ruleForm.title);
      form.append("author", this.ruleForm.author || "");
      form.append("newprice", this.ruleForm.newprice || "");
      form.append("oldprice", this.ruleForm.oldprice || "");
      form.append("dis", this.ruleForm.dis || "");
      form.append("good_id", this.ruleForm.good_id);

      this.fileList.forEach(file => {
        // console.log(file);
        form.append("files", file.raw); //此处一定是append file.raw 上传文件只需维护fileList file.raw.name要加上
        form.append("fileNames", file.name);
      });

      goodsApi.editGood(form).then(res => {
        console.log(res);
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
    delGoods(row) {
      this.$confirm("此操作将永久删除该用户吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          goodsApi.delGood(row.good_id).then(res => {
            if (res.data.flag) {
              // this.page = this.page > this.pages ? this.pages : this.page;
              //修改成功
              this.$message({
                message: "删除成功",
                type: "success"
              });

              if((this.total -1)%this.pagesize ==0){
                this.page = this.page-1
              }

              this.fetchall();
              // console.log(this.goodsList.length)
              // if (this.goodsList.length == 1) {
              //   this.page = this.pages;
              // }
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
    //  第几页
    handleCurrentChange(val) {
      this.page = val;
      this.fetchall();
    },

    // 添加新商品
    add() {
      this.$refs.ruleForm.validate(async res => {
        if (res) {
          //手动提交图片的关键
          this.$refs.upload.submit();

          let form = new FormData();
          form.append("title", this.ruleForm.title);
          form.append("author", this.ruleForm.author || "");
          form.append("newprice", this.ruleForm.newprice || "");
          form.append("oldprice", this.ruleForm.oldprice || "");
          form.append("dis", this.ruleForm.dis);

          // console.log(this.fileList)
          this.fileList.forEach(file => {
            // console.log(file);
            form.append("files", file.raw); //此处一定是append file.raw 上传文件只需维护fileList file.raw.name要加上
            form.append("fileNames", file.name);
          });

          try {
            let p = await goodsApi.addGood(form);
            // console.log(form)
            if (p.data.flag) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.dialogFormVisible = false;

              if(this.total%this.pagesize ==0){
                // this.pages = this.pages + 1
                this.page = this.page + 1
                this.total = this.total + 1
              }
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
    //功能：文件上传(上传图片)
    httpRequest(file) {
      // console.log(file, 111);
    },
    onChange(file, fileList) {
      this.fileList = fileList;
    },
    //功能：删除已上传图片
    async handleRemove(file, fileList) {
      // 删除文件
      console.log(file);
      let url = file.url;
      console.log(this.ruleForm, url);
      try{
        let res =  await goodsApi.delPic(this.ruleForm.good_id)
        console.log(res, 999);
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
      }catch(err){
        console.log(err)
      }
      

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
    this.fetchall();
  }
};
</script>

<style scoped>
.el-form {
  margin-top: 20px;
}
.el-form .el-select:nth-child(3) {
  margin-right: 20px;
}
/* 分页 */
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