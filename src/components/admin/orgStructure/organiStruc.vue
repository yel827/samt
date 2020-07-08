<template>
  <div class="home">
    <div class="home_header">组织架构</div>
    <div class="search_">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formInline.user" placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.region" placeholder="部门状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchLIST">查询</el-button>
          <el-button type="primary" @click="addNew">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row class="main">
      <el-col :span="24" class="ledrt">
        <!-- <div class="title">组织架构树</div> -->
        <div class="content_">
          <el-table
            :data="deptList"
            row-key="deptId"
            default-expand-all
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            :header-cell-style="{background:'#eef1f6',color:'#001642'}"
          >
            <el-table-column prop="deptName" label="部门名称" width="260"></el-table-column>
            <el-table-column prop="orderNum" label="排序" width="200"></el-table-column>
            <el-table-column prop="status" label="备注" width="100"></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" width="200">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.createTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.parentId != 0"
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="handleUpdate(scope.row)"
                >修改</el-button>
                <el-button
                  v-if="scope.row.parentId != 0"
                  size="mini"
                  type="text"
                  icon="el-icon-plus"
                  @click="handleAdd(scope.row)"
                >新增</el-button>
                <el-button
                  v-if="scope.row.parentId != 0"
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--新建-->
          <el-dialog title="新建部门" :visible.sync="headercenterDialogVisible" width="30%" center>
            <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
              <el-form-item label="部门名称">
                <el-input v-model="sizeForm.name"></el-input>
              </el-form-item>
              <el-form-item label="部门层级">
                <el-select v-model="sizeForm.region" placeholder="部门层级">
                  <el-option
                    v-for="(item) in deptLevelst"
                    :key="item.value"
                    @click.native="deptl(item.value)"
                    :label="item.labal"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上级部门">
                <treeselect
                  v-model="form.parentId"
                  :options="deptOptionsed"
                  @click="onchang"
                  :normalizer="normalizer"
                  placeholder="选择上级部门"
                />
              </el-form-item>
              <el-form-item label="部门备注">
                <el-input type="textarea" v-model="sizeForm.files"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="exitNull">取 消</el-button>
              <el-button type="primary" @click="addSava">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 当前行新建 -->
          <el-dialog title="新建部门" :visible.sync="centerDialogVisible" width="30%" center>
            <el-form ref="form" :model="childSizeForm" label-width="80px" size="mini">
              <el-form-item label="部门名称">
                <el-input v-model="childSizeForm.deptName"></el-input>
              </el-form-item>
              <el-form-item label="部门层级">
                <el-select v-model="childSizeForm.deptLevel" placeholder="请选择部门层级">
                  <el-option
                    v-for="(item) in deptLevels"
                    :key="item.value"
                    @click.native="deptl1(item.value)"
                    :label="item.labal"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上级部门" v-if="form.parentId !==-1">
                <treeselect
                  v-model="childSizeForm.parentId"
                  :options="deptOptions"
                  :normalizer="normalizer"
                  placeholder="选择上级部门"
                />
              </el-form-item>
              <el-form-item label="部门备注">
                <el-input type="textarea" v-model="childSizeForm.remark"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="exitNll">取 消</el-button>
              <el-button type="primary" @click="childrenForm">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 修改 -->
          <el-dialog title="修改部门" :visible.sync="centerDialogVisibles" width="30%" center>
            <el-form ref="form" :model="editSize" label-width="80px" size="mini">
              <el-form-item label="部门名称">
                <el-input v-model="editSize.deptName"></el-input>
              </el-form-item>
              <el-form-item label="部门层级">
                <el-select v-model="editSize.deptLevel" placeholder="部门层级">
                  <el-option
                    v-for="(item) in deptLevels"
                    :key="item.value"
                    @click.native="deptl2(item.value)"
                    :label="item.labal"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上级部门" v-if="form.parentId !==-1">
                <treeselect
                  v-model="editSize.parentId"
                  :options="editDeptLevels"
                  :normalizer="normalizer"
                  placeholder="选择上级部门"
                />
              </el-form-item>
              <el-form-item label="部门备注">
                <el-input type="textarea" v-model="editSize.remark"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisibles = false">取 消</el-button>
              <el-button type="primary" @click="updatedept">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import listone from "./department/departmentone";
import bus from "@/assets/utils/eventBus";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import Cookie from "js-cookie";
export default {
  data() {
    return {
      val: [""],
      deptLevels: [
        {
          labal: "一级部门",
          value: 1
        },
        {
          labal: "二级部门",
          value: 2
        },
        {
          labal: "三级部门",
          value: 3
        }
      ],
      deptLevelst: [
        {
          labal: "一级部门",
          value: 1
        },
        {
          labal: "二级部门",
          value: 2
        },
        {
          labal: "三级部门",
          value: 3
        }
      ],
      deptList: [],
      deptOptions: [],
      deptOptionsed: [],
      editDeptLevels: [],
      formInline: {
        user: "",
        region: ""
      },
      headercenterDialogVisible: false,
      centerDialogVisible: false,
      centerDialogVisibles: false,
      dialogTableVisible: false,
      dialogFormVisiblebj: false,
      dialogFormVisible: false,
      //+新建
      sizeForm: {},
      childSizeForm: {},
      editSize: {},
      sizeFormwdit: {
        name: "",
        region: "",
        same: "",
        files: ""
      },
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
      ],
      index: [4, 5, 6],
      contents: [
        "内容一,安全部门第一",
        "内容一,安全部门第一",
        "内容一,安全部门第一",
        "内容一,安全部门第一",
        "内容一,安全部门第一",
        "内容二，安全部门第二",
        "内容三，安全部门第三"
      ],
      activeIndex: 0,
      list_: "",
      num: ""
    };
  },
  components: {
    Treeselect: Treeselect
    // listone: listone,
  },
  mounted() {},
  methods: {
    // 新建项目
    addProject(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 表单重置
    reset() {
      this.form = {
        deptId: undefined,
        parentId: undefined,
        deptName: undefined,
        orderNum: undefined,
        leader: undefined,
        phone: undefined,
        email: undefined,
        remark: undefined,
        status: "0"
      };
      // this.resetForm("form");
    },
    // 取消清空表单
    exitNll() {
      this.centerDialogVisible = false;
      this.childSizeForm.deptLevel = "";
      this.childSizeForm.deptName = "";
      this.childSizeForm.remark = "";
    },
    exitNull() {
      this.headercenterDialogVisible = false;
      this.sizeForm.name = "";
      this.sizeForm.region = "";
      document.getElementsByClassName('vue-treeselect__single-value').innerHTML = ''
      this.sizeForm.files = "";
    },
    //新建
    handleAdd(row) {
      console.log(row, "this.row");
      this.childSizeForm.parentId = row.deptId;
      this.centerDialogVisible = true;
      this.title = "添加部门";
      this.deptOptions = this.handleTree(this.deptList, "deptId");
    },
    //修改弹窗
    handleUpdate(row) {
      this.editSize = row;
      this.editDeptLevels = this.handleTree(this.deptList, "deptId");
      this.centerDialogVisibles = true;
    },
    // 修改
    updatedept() {
      let params = this.editSize;
      this.$api.updateDept(params).then(res => {
        this.centerDialogVisibles = false;
        this.OrganizationList();
      });
    },
    //删除
    handleDelete(row) {
      console.log(row);
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
          this.$api.deleteDept(row.deptId).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.OrganizationList();
            } else {
              this.$message({
                type: "error",
                message: "删除失败!"
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
    //部门列表
    OrganizationList() {
      let that = this;
      that.$api.deptList().then(res => {
        that.deptList = that.handleTree(res.data, "deptId");
        that.normalizer(that.deptList);
      });
    },
    // 搜索
    searchLIST() {
      let that = this;
      let params = {
        deptName: that.formInline.user
      };
      that.$api.deptList(params).then(res => {
        that.deptList = that.handleTree(res.data, "deptId");
        that.normalizer(that.deptList);
      });
    },
    // 转换部门数据结构
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.deptId,
        label: node.deptName,
        children: node.children
      };
    },
    // 新增弹窗
    addNew() {
      this.headercenterDialogVisible = true;
      this.deptOptionsed = this.handleTree(this.deptList, "deptId");
    },
    // header新增保存部门
    addSava() {
      let params = {
        deptName: this.sizeForm.name,
        deptLevel: this.sizeForm.region,
        parentId: this.form.parentId,
        remark: this.sizeForm.files
      };
      this.$api.addDeptList(params).then(res => {
        if (res.code == 200) {
          this.headercenterDialogVisible = false;
          this.OrganizationList();
          this.sizeForm.name = "";
          this.sizeForm.region = "";
          this.form.parentId = [];
          this.sizeForm.files = "";
        } else {
          this.$message({
            type: "error",
            message: res.msg
          });
        }
      });
    },
    // children新增部门
    childrenForm() {
      let params = this.childSizeForm;
      this.$api.addDeptList(params).then(res => {
        if (res.code == 200) {
          this.centerDialogVisible = false;
          this.childSizeForm.deptLevel = "";
          this.childSizeForm.deptName = "";
          this.childSizeForm.remark = "";
          this.OrganizationList();
        } else {
          this.$message({
            type: "error",
            message: res.msg
          });
        }
      });
    },
    // 部门层级
    deptl(res) {
      let params = {
        deptLevel: res
      };
      this.$api.deptsearch(params).then(res => {
        this.deptOptionsed = res.data;
      });
    },
    // 部门层级
    deptl1(res) {
      let params = {
        deptLevel: res
      };
      this.$api.deptsearch(params).then(res => {
        this.deptOptions = res.data;
      });
    },
    // 部门层级
    deptl2(res) {
      let params = {
        deptLevel: res
      };
      this.$api.deptsearch(params).then(res => {
        this.deptOptionsed = res.data;
        this.editDeptLevels = res.data;
      });
    },
    onchang(value) {},
    handleClick(row) {
      console.log(row);
    },
    handleNodeClick(data) {
      console.log(data);
      this.deptList = data.value;
    }
  },
  created() {
    this.OrganizationList();
  }
};
</script>
<style scoped lang="less">
.home {
  width: 100%;
  height: 840px;
  background: #fff;
}

.home_header {
  width: 100%;
  height: 20px;
  line-height: 10px;
  border-bottom: 1px solid #ccc;
}
ul > li {
  list-style: none;
}
.main {
  width: 100%;
  height: 90%;
  margin-top: 1%;
  display: flex;
  .ledrt {
    background: #fff;

    overflow: auto;
    margin-right: 20px;
    .title {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-indent: 20px;
      border-bottom: 1px solid #ccc;
    }
  }
  .redrt {
    background: #fff;
    flex: 1;
  }
}
.elTree {
  padding: 16px 20px 0 20px;
  font-size: 20px !important;
  box-sizing: border-box;
}
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
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #e6061f;
  color: #fff;
}
.el-tree-node__content > .el-tree-node__expand-icon {
  padding: 0 6px;
}
.demo-form-inline {
  height: 50px;
  padding-top: 10px;
  box-sizing: border-box;
}
.serach_ {
  width: 100%;
  height: 2%;
  padding-top: 10px;
  box-sizing: border-box;
  /deep/.el-form {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>