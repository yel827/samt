<template>
  <div>
    <div class="dep_header">
      <el-button class="btn" type="success" @click="dialogFormVisible = true">新建部门</el-button>
      <!-- 新建部门 -->
      <el-dialog title="新建部门" width="30%" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="部门名称:" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门层级:" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上级部门:" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="textarea_" label="部门备注:">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column align="center" fixed prop="date" label="日期"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名"></el-table-column>
      <el-table-column align="center" prop="province" label="省份"></el-table-column>
      <el-table-column align="center" prop="city" label="市区"></el-table-column>
      <el-table-column align="center" prop="address" label="地址"></el-table-column>
      <el-table-column align="center" prop="zip" label="邮编"></el-table-column>
      <el-table-column align="center" fixed="right" label="操作">
        <template align="center" slot-scope>
          <el-button type="text" size="small" @click="dialogFormVisiblebj = true">编辑</el-button>
          <el-button type="text" @click="open">删除</el-button>
          <!-- 编辑 -->
          <el-dialog
            title="新建部门"
            :append-to-body="true"
            width="30%"
            :visible.sync="dialogFormVisiblebj"
          >
            <el-form :model="edform">
              <el-form-item label="部门名称:" :label-width="edformLabelWidth">
                <el-input v-model="edform.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="部门层级:" :label-width="edformLabelWidth">
                <el-select v-model="edform.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上级部门:" :label-width="edformLabelWidth">
                <el-select v-model="edform.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="textarea_" label="部门备注:">
                <el-input type="textarea" v-model="edform.desc"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisiblebj = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisiblebj = false">确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import framework from "@/components/framework/framework";
import bus from "../../../assets/utils/eventBus";
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },

  data() {
    return {
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      dialogTableVisible: false,
      dialogFormVisiblebj: false,
      dialogFormVisible: false,
      //新建
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      //编辑
      edform: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      edformLabelWidth: "120px",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
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
    framework
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      // bus.$on("handleNode",function(data){
      //   console.log(data,"")
      // })
      // console.log(this.$route.params,"接搜一天是数据")
    },
    open() {
      this.$confirm(
        " 删除部门会导致所属下级部门全部被删除，原部门内员工全部处于无部门状态，是否确认删除？",
        "重要提示：",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
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
    }
  }
};
</script>
<style lang="less" scoped>
.dep_header {
  width: 100%;
  height: 70px;
  line-height: 70px;
  .btn {
    float: right;
    margin-right: 25px;
    margin-top: 13px;
  }
}
/deep/.el-form-item__content {
  /deep/.el-select {
    width: 100%;
  }
}

/deep/.el-textarea {
  width: 66%;
  /deep/.el-textarea__inner {
    width: 100%;
  }
}
.textarea_ {
  /deep/.el-form-item__label {
    width: 120px;
  }
}
</style>