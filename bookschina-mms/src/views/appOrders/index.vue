<!--
 * @description: 
 * @author: 黄升滨，成启航，Lk李铠岚
 * @Date: 2020-07-31 10:27:15
 * @LastEditTime: 2020-07-31 16:45:24
--> 

<template>
  <div class="main">
    <!-- 面包屑：导航 -->
    <app-link :name="title"></app-link>

    <!-- 搜索表单 -->
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <!-- 查询条件 -->
      <el-form-item>
        <el-input v-model="searchForm.title" placeholder="书名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchForm.user_id" placeholder="用户ID"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="fetchall" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="reset" icon="el-icon-refresh-left">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 用户列表页 -->
    <el-table :data="goodsList" stripe style="width: 100%" height="452px">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="user_id" label="用户ID" width="100"></el-table-column>
      <el-table-column label="图片" width="100">
        <template slot-scope="scope">
          <!-- scope指整个数据对象。scope.row指当前行数据 -->
          <img :src="scope.row.img" alt style="width:50px;height:50px;" />
        </template>
      </el-table-column>
      <el-table-column prop="good_id" label="商品ID" width="100"></el-table-column>
      <el-table-column prop="title" label="书名" width="300"></el-table-column>
      <el-table-column prop="newprice" label="价格" width="100"></el-table-column>
      <el-table-column prop="oldprice" label="原价" width="100"></el-table-column>
      <el-table-column prop="num" label="数量" width="100"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="editGoods(scope.row)"></el-button>
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
    <el-dialog title="修改商品数量" :visible.sync="dialogFormVisible" width="600px">
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
            style="width:300px"
             :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品ID" prop="good_id">
          <el-input
            v-model="ruleForm.good_id"
            autocomplete="off"
            style="width:300px"
             :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="newprice">
          <el-input
            v-model.trim="ruleForm.newprice"
            autocomplete="off"
            style="width:300px"
             :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="原价" prop="oldprice">
          <el-input
            v-model.trim="ruleForm.oldprice"
            autocomplete="off"
            style="width:300px"
             :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item prop="num" label="数量">
          <el-input
            v-model="ruleForm.num"
            autocomplete="off"
            style="width:300px"
            placeholder="请输入数量"
          ></el-input>
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
export default {
  data() {
    return {
      title: "订单管理"
    };
  },

  components: { appLink },

  methods: {}
};
</script>

<script>
import appLink from "@/components/link";
import orderApi from "@/api/orderApi";
export default {
  data() {
    return {
      title: "订单管理",
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
        // console.log(this.searchForm);
        let p = await orderApi.getList(
          this.page,
          this.pagesize,
          this.searchForm
        );
        // console.log(p.data);
        if (p.data.flag) {
          // console.log(p.data.data);
          this.goodsList = p.data.data;
          this.total = p.data.total;
          this.pages = p.data.pages;
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
    // 打开编辑弹出层
    editGoods(row) {
      // console.log(row);
      this.isAdd = false; //编辑弹窗设置为false
      this.dialogFormVisible = true; //点击打开弹窗
      this.ruleForm = row;
      this.fileList = [];
      // console.log(this.ruleForm);
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate();
      });
    },
    // 修改商品数量
    edit() {
      let form = new FormData();
      // form.append("title", this.ruleForm.title);
      form.append("user_id", this.ruleForm.user_id);
      form.append("good_id", this.ruleForm.good_id);
      // form.append("newprice", this.ruleForm.newprice);
      // form.append("oldprice", this.ruleForm.oldprice);
      form.append("num", this.ruleForm.num);
      
      orderApi.editOrder(form).then(res => {
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