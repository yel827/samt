<template>
  <div class="home">
    <div class="home_header">权限管理</div>
    <div class="search_">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-button class="success_" type="success" @click="dialogVisible = true">新建权限</el-button>
        <!-- 新建权限 -->
        <el-dialog
          title="新建权限"
          class="dialog_"
          border-bottom="1px solid #ccc"
          :visible.sync="dialogVisible"
          width="40%"
          max-height="40%"
          :before-close="handleClose"
        >
          <juridic />
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-form>
    </div>
    <div class="table_">
      <el-table :data="tableData" text-align="center" border style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#001642'}">
        <el-table-column
          align="center"
          show-overflow-tooltip
          fixed
          prop="date"
          label="序号"
          width="50"
        ></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="name" label="姓名"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="province" label="省份"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="city" label="市区"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="address" label="地址"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="zip" label="邮编"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="EditClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" @click="open" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 查看 -->
      <el-dialog title="查看权限" :visible.sync="dialogTableVisible">
        <el-table :data="tableDatalist">
          <el-table-column show-overflow-tooltip property="date" label="日期" width="150"></el-table-column>
          <el-table-column show-overflow-tooltip property="name" label="姓名" width="200"></el-table-column>
          <el-table-column show-overflow-tooltip property="address" label="地址"></el-table-column>
        </el-table>
      </el-dialog>
      <!--编辑 -->
      <el-dialog
          title="编辑权限"
          class="dialog_"
          border-bottom="1px solid #ccc"
          :visible.sync="dialogVisibles"
          width="40%"
          max-height="40%"
          :before-close="handleClose"
        >
          <edjuridic />
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibles = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibles = false">确 定</el-button>
          </span>
        </el-dialog>
    </div>
  </div>
</template>

<script>
import juridic from "./jurisdic/jurisdic"
import edjuridic from './jurisdic/edjurisdic'
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisibles:false,
      formInline: {
        user: "",
        region: ""
      },
      dialogTableVisible: false,
      tableDatalist: [],
      tableData: [
        {
          date: "1",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2",
          name:
            "王小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          date: "3",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          date: "4",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ]
    };
  },
  components: {
    juridic: juridic,
    edjuridic:edjuridic
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    //查看
    handleClick(row) {
      console.log(row);
      this.dialogTableVisible = true;
      this.tableDatalist.push(row);
    },
    //编辑
    EditClick(row){
      this.dialogVisibles = true
    },
    //删除
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>
<style scoped lang="less">
.home {
  width: 100%;
  height: 840px;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.home_header {
  width: 100%;
  height: 20px;
  line-height: 10px;
  border-bottom: 1px solid #ccc;
}
.search_ {
  width: 100%;
  height: 60px;
  padding: 20px 20px 20px 20px;
  box-sizing: border-box;
  // border:1px solid #ccc;
  .success_ {
    float: right;
    margin-right: 20px;
  }
}
.table_ {
  flex: 1;
  margin-top: 20px;
}
/deep/.el-dialog {
  /deep/.el-dialog__body {
    padding: 0 20px !important;
  }
}
</style>