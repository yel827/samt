<template>
  <div class="crumbs">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item replace :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限分配</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-main class="main_section">
      <el-row>
        <el-col class="mainLeft">
          <span class="title_main">权限类别</span>
          <div>
            管理级
            <el-button type="info" @click="dialogVisibleju = true">预览</el-button>
          </div>
          <div>
            操作级
            <el-button type="info">预览</el-button>
          </div>
          <div>
            查看级
            <el-button type="info">预览</el-button>
          </div>
        </el-col>
        <el-col class="mainRight">
          <div class="btn">
            <el-button type="primary" @click="dialogVisible = true">批量维护</el-button>
          </div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column show-overflow-tooltip fixed prop="date" label="日期" width="80"></el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="姓名"></el-table-column>
            <el-table-column show-overflow-tooltip prop="province" label="省份"></el-table-column>
            <el-table-column show-overflow-tooltip prop="city" label="市区"></el-table-column>
            <el-table-column show-overflow-tooltip prop="address" label="地址"></el-table-column>
            <el-table-column show-overflow-tooltip prop="zip" label="邮编"></el-table-column>
            <el-table-column show-overflow-tooltip fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" @click="open" size="small">移除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 批量维护 -->
          <el-dialog
            title="批量维护"
            :visible.sync="dialogVisible"
            width="36%"
            :before-close="handleClose"
          >
            <el-form
              :inline="true"
              style="margin-top:14px;"
              :model="formInline"
              class="demo-form-inline"
            >
              <el-form-item label="姓名">
                <el-input v-model="formInline.user" placeholder="姓名"></el-input>
              </el-form-item>
              <el-form-item label="权限状态">
                <el-select v-model="formInline.region" placeholder="部门">
                  <el-option label="部门一" value="shanghai"></el-option>
                  <el-option label="部门二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
            <!--  -->
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column label="日期" width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="120"></el-table-column>
              <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
              <el-button type="primary">添加勾选</el-button>
            </span>
          </el-dialog>
          <!-- 预览 -->
          <el-dialog
            title="预览"
            class="dialog_"
            border-bottom="1px solid #ccc"
            :visible.sync="dialogVisibleju"
            width="40%"
            max-height="40%"
            :before-close="handleClose"
          >
            <juridic />
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisibleju = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisibleju = false">确 定</el-button>
            </span>
          </el-dialog>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>
<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import Cookie from "js-cookie";
import juridic from "./profile/maintain";
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      dialogVisibleju: false,
      dialogVisible: false,
      filterText: "",
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
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
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 用户表格数据
      userList: null,
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: undefined,

      // 部门名称
      deptName: undefined,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [],
      // 性别状态字典
      sexOptions: [],
      // 岗位选项
      postOptions: [],
      // 角色选项
      roleOptions: [],
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label"
      },

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        status: undefined,
        deptId: undefined
      },
      // 表单校验
      rules: {
        userName: [
          { required: true, message: "用户名称不能为空", trigger: "blur" }
        ],
        nickName: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" }
        ],
        deptId: [
          { required: true, message: "归属部门不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "用户密码不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phonenumber: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    juridic,
  },
  watch: {
    // 根据名称筛选部门树
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //编辑
    EditClick(row) {
      this.dialogVisibles = true;
    },
    //删除
    open() {
      this.$confirm("员工被移除权限后，与该权限关联关系终止，且该员工恢复无权限状态，是否确认移除？", "提示", {
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
    }
  },
  created() {}
};
</script>
<style lang="less" scoped>
.crumbs {
  width: 100%;
  height: 100%;
  .main_section {
    width: 100%;
    height: 94%;
    background: #c0c4cc;
    padding: 20px;
    margin-top: 20px;
    box-sizing: border-box;
    /deep/.el-row {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      .mainLeft {
        width: 20%;
        height: 100%;
        background: #fff;
        padding: 20px 20px 20px 20px;
        box-sizing: border-box;
        .title_main {
          display: block;
          width: 100%;
          border-bottom: 1px solid #ccc;
          padding-bottom: 10px;
          box-sizing: border-box;
          margin-bottom: 20px;
        }
        div {
          width: 100%;
          height: 50px;
          box-sizing: border-box;
          line-height: 50px;
          text-indent: 3em;
          margin-top: 25px;
          .el-button {
            height: 30px;
            line-height: 0px;
            margin-left: 30px;
          }
        }
      }
    }
    .mainRight {
      width: 78%;
      height: 100%;
      background: #fff;
      margin-left: 20px;
      padding: 20px;
      box-sizing: border-box;
      .btn {
        width: 100%;
        height: 30px;
        border-bottom: 1px solid #ccc;
        position: relative;
        /deep/.el-button {
          width: 100px;
          height: 20px;
          line-height: 0;
          position: absolute;
          right: 10px;
        }
      }
    }
  }
}
</style>