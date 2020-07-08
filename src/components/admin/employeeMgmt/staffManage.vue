<template>
  <div class="home">
    <div class="home_one">
      <div class="home_header">员工管理</div>
      <el-tabs v-model="activeName" class="activeName" @tab-click="handleClickdis">
        <el-tab-pane label="员工信息" name="first">
          <div class="search_">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item>
                <el-input v-model="formInline.name" placeholder="姓名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="formInline.mobile" placeholder="手机号码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="formInline.status" placeholder="在职状态">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-button type="primary" @click="dialogVisible = true">新增员工</el-button>
              <el-button type="primary" @click="searchStaff">查询</el-button>
              <el-button type="primary">批量导入</el-button>
              <el-button type="primary" @click="exportList">批量导出</el-button>
              <!-- 新增员工 -->
              <el-dialog
                title="新增员工"
                class="dialog_"
                :visible.sync="dialogVisible"
                width="40%"
                :before-close="handleClose"
              >
                <el-form
                  :inline="true"
                  :rules="rules"
                  ref="ruleForm"
                  :model="ruleForm"
                  class="demo-form-inline"
                >
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="工号" prop="jobNo">
                    <el-input v-model="ruleForm.jobNo"></el-input>
                  </el-form-item>
                  <el-form-item label="性别" prop="sex">
                    <el-select v-model="ruleForm.sex" placeholder="请选择活动区域">
                      <el-option label="1" value="shanghai"></el-option>
                      <el-option label="2" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="部门" prop="department">
                    <el-select v-model="ruleForm.department" placeholder="请选择活动区域">
                      <el-option label="0" value="shanghai"></el-option>
                      <el-option label="1" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="民族" prop="nation">
                    <el-select v-model="ruleForm.nation" placeholder="请选择活动区域">
                      <el-option label="0" value="shanghai"></el-option>
                      <el-option label="1" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="权限" prop="jurisdiction">
                    <el-select v-model="ruleForm.jurisdiction" placeholder="请选择活动区域">
                      <el-option label="0" value="shanghai"></el-option>
                      <el-option label="1" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="生日" prop="birthday">
                    <el-select v-model="ruleForm.birthday" placeholder="请选择活动区域">
                      <el-option label="0" value="shanghai"></el-option>
                      <el-option label="1" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="手机" prop="mobile">
                    <el-input v-model="ruleForm.mobile"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="mailbox">
                    <el-input v-model="ruleForm.mailbox"></el-input>
                  </el-form-item>
                  <el-form-item label="座机" prop="landline">
                    <el-input
                      placeholder="请输入内容"
                      v-model="ruleForm.landline"
                      class="input-with-select"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="备注" class="inpTextarea" prop="remarks">
                    <el-input
                      type="textarea"
                      placeholder="请输入内容"
                      v-model="ruleForm.remarks"
                      class="input-with-select"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="在职状态:" style="padding-left:20px;">
                    <span>离职</span>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addStaff('ruleForm')">确 定</el-button>
                </span>
              </el-dialog>
            </el-form>
          </div>
          <div class="table_">
            <el-table :data="staffList" text-align="center" border style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#001642'}">
              <el-table-column
                align="center"
                show-overflow-tooltip
                fixed
                prop="id"
                label="序号"
                width="50"
              ></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="name" label="姓名"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="sex" label="性别"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="mobile" label="手机号"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="address" label="班组"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="zip" label="工种"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="createTime" label="进场日期"></el-table-column>
              <el-table-column align="center" fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                  <el-button @click="searchStaffDetails(scope.row)" type="text" size="small">查看</el-button>
                  <el-button type="text" @click="editStafflist(scope.row)" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 编辑 -->
            <el-dialog
              title="新增员工"
              class="dialog_"
              :visible.sync="editDialogVisible"
              width="40%"
              :before-close="handleClose"
            >
              <el-form
                :inline="true"
                :rules="rules"
                ref="ruleForm"
                :model="ruleForm"
                class="demo-form-inline"
              >
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="工号" prop="jobNo">
                  <el-input v-model="ruleForm.jobNo"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                  <el-select v-model="ruleForm.sex" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="部门" prop="department">
                  <el-select v-model="ruleForm.department" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="民族" prop="nation">
                  <el-select v-model="ruleForm.nation" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="权限" prop="jurisdiction">
                  <el-select v-model="ruleForm.jurisdiction" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="生日" prop="birthday">
                  <el-select v-model="ruleForm.birthday" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                  <el-input v-model="ruleForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="mailbox">
                  <el-input v-model="ruleForm.mailbox"></el-input>
                </el-form-item>
                <el-form-item label="座机" prop="landline">
                  <el-input
                    placeholder="请输入内容"
                    v-model="ruleForm.landline"
                    class="input-with-select"
                  ></el-input>
                </el-form-item>
                <el-form-item label="备注" class="inpTextarea" prop="remarks">
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="ruleForm.remarks"
                    class="input-with-select"
                  ></el-input>
                </el-form-item>
                <el-form-item label="在职状态:" style="padding-left:20px;">
                  <span>离职</span>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editStaff('ruleForm')">确 定</el-button>
              </span>
            </el-dialog>
            <!-- 查看-->
            <el-dialog
              title="查看员工"
              class="dialog_"
              :visible.sync="readOnlyDialogVisible"
              width="40%"
              :before-close="handleClose"
            >
              <el-form :inline="true" ref="formline" :model="formline" class="demo-form-inline">
                <el-form-item label="姓名">
                  <el-input readonly v-model="formline.name"></el-input>
                </el-form-item>
                <el-form-item label="工号" prop="jobNo">
                  <el-input readonly v-model="formline.jobNo"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                  <el-input readonly v-model="formline.sex"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="department">
                  <el-input readonly v-model="formline.department"></el-input>
                </el-form-item>
                <el-form-item label="民族" prop="nation">
                  <el-input readonly v-model="formline.nation"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="jurisdiction">
                  <el-input readonly v-model="formline.jurisdiction"></el-input>
                </el-form-item>
                <el-form-item label="生日" prop="birthday">
                  <el-input readonly v-model="formline.birthday"></el-input>
                </el-form-item>
                <el-form-item label="手机">
                  <el-input readonly v-model="formline.mobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="mailbox">
                  <el-input readonly v-model="formline.mailbox"></el-input>
                </el-form-item>
                <el-form-item label="座机" prop="landline">
                  <el-input
                    readonly
                    placeholder="请输入内容"
                    v-model="formline.landline"
                    class="input-with-select"
                  ></el-input>
                </el-form-item>
                <el-form-item label="备注" class="inpTextarea" prop="remarks">
                  <el-input
                    readonly
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="formline.remarks"
                    class="input-with-select"
                  ></el-input>
                </el-form-item>
                <el-form-item label="在职状态:" style="padding-left:20px;">
                  <span>离职</span>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="readOnlyDialogVisible = false">关 闭</el-button>
              </span>
            </el-dialog>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage3"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="部门分配" name="second">
          <div class="main_section">
            <el-row>
              <el-col class="mainLeft">
                <div class="title_tree">组织架构树</div>
                <el-tree
                  class="filter-tree"
                  :data="data"
                  node-key="id"
                  highlight-current
                  :props="defaultProps"
                  default-expand-all
                  :filter-node-method="filterNode"
                  ref="tree"
                ></el-tree>
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
                <el-dialog title="批量维护" :visible.sync="dialogVisible" width="34%">
                  <el-form
                    :inline="true"
                    style="margin-top:14px;"
                    :model="formInline"
                    class="demo-form-inline"
                  >
                    <el-form-item label="姓名">
                      <el-input v-model="formInline.user" placeholder="姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="部门">
                      <el-select v-model="formInline.region" placeholder="部门">
                        <el-option label="部门一" value="shanghai"></el-option>
                        <el-option label="部门二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary">查询</el-button>
                    </el-form-item>
                  </el-form>
                  <!--  -->
                  <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
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
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="权限分配" name="third">
          <div class="main_sectiontab">
            <el-row>
              <el-col class="mainLeft">
                <span class="title_main">权限类别</span>
                <div class="padding_margin">
                  管理级
                  <el-button type="info" @click="dialogVisibleju = true">预览</el-button>
                </div>
                <div class="padding_margin">
                  操作级
                  <el-button type="info">预览</el-button>
                </div>
                <div class="padding_margin">
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
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
// import department_ from './staff_list/department'
// import jurisdiction_ from './staff_list/department'
import Cookie from "js-cookie";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import juridic from "./staff_list/profile/maintain";
export default {
  data() {
    return {
      activeName:"first",
      total: "",
      pageSize: 4,
      pageNum: 1,
      tableDatalist: [],
      dialogVisible: false,
      dialogTableVisible: false,
      editDialogVisible: false,
      readOnlyDialogVisible: false,
      isdistable: false,
      formInline: {
        name: "",
        mobile: "",
        status: ""
      },
      rowId: "",
      // 添加员工
      ruleForm: {
        name: "",
        jobNo: "",
        sex: "",
        department: "",
        nation: "",
        jurisdiction: "",
        birthday: "",
        mobile: "",
        mailbox: "",
        landline: "",
        remarks: "",
        status: ""
      },
      // 查看
      formline: {
        name: "",
        jobNo: "",
        sex: "",
        department: "",
        nation: "",
        jurisdiction: "",
        birthday: "",
        mobile: "",
        mailbox: "",
        landline: "",
        remarks: "",
        status: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号码", trigger: "blur" }]
      },
      // 员工列表
      staffList: [],
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
      ],
      formInline: {
        user: "",
        region: ""
      },
      dialogVisible: false,
      filterText: "",
      dataa: [
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
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange() {},
    handleCurrentChange(currentPage3) {
      this.pageNum = currentPage3;
      let params = {
        pageNum: this.currentPage3,
        pageSize: this.pageSize
      };
      this.getStaffList(params);
    },
    // 批量导出
    exportList() {
      this.$api.exportEmployees().then(res => {
        console.log(res);
      });
    },
    // 员工列表
    getStaffList(params) {
      let that = this;
      params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      that.$api.getStaffList(params).then(res => {
        that.staffList = res.data;
        this.total = res.total;
      });
    },
    // 添加员工
    addStaff(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.ruleForm;
          this.$api.addStaff(params).then(res => {
            this.getStaffList();
            this.dialogVisible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 编辑员工
    editStafflist(row) {
      let that = this;
      console.log(row.id);
      that.rowId = row.id;
      that.ruleForm.name = row.name;
      that.ruleForm.mobile = row.mobile;
      that.editDialogVisible = true;
    },
    // 编辑员工
    editStaff(formName) {
      let that = this;
      that.editDialogVisible = true;
      that.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            id: that.rowId,
            name: that.ruleForm.name,
            jobNo: that.ruleForm.jobNo,
            sex: that.ruleForm.sex,
            department: that.ruleForm.department,
            nation: that.ruleForm.nation,
            jurisdiction: that.ruleForm.jurisdiction,
            birthday: that.ruleForm.birthday,
            mobile: that.ruleForm.mobile,
            mailbox: that.ruleForm.mailbox,
            landline: that.ruleForm.landline,
            remarks: that.ruleForm.remarks,
            status: that.ruleForm.status
          };
          let obj = JSON.parse(JSON.stringify(params));
          that.$api.editStaff(obj).then(res => {
            that.getStaffList();
          });
          that.editDialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 查询员工列表
    searchStaff() {
      let that = this;
      let params = {
        name: that.formInline.name,
        mobile: that.formInline.mobile,
        status: that.formInline.status,
        pageNum: that.pageNum,
        pageSize: that.pageSize
      };
      console.log(params);
      that.$api.searchStaff(params).then(res => {
        that.staffList = res.data;
      });
    },
    // 查询员工列表详情接口
    searchStaffDetails(row) {
      this.readOnlyDialogVisible = true;
      let params = row.id;
      this.$api.searchStaffDetails(params).then(res => {
        // this.formline.name = res.name,
        // this.formline.mobile = res.mobile
        this.formline = res;
        console.log(res);
      });
    },
    // 批量导出员工
    //查看
    handleClick(row) {
      console.log(row);
      this.dialogTableVisible = true;
      this.tableDatalist.push(row);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    department_s() {
      this.isdistable = true;
      this.$router.push("/department_Admin");
    },
    department_q() {
      this.isdistable = true;
      this.$router.push("/jurisdiction_Admin");
    },
    //获取tree列表
    getList() {
      let that = this;
      let ar = Cookie.get("token");
      console.log(ar);
      let la = that.API1url.API.api.getlist;
      that.$axios
        .get(la, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization: `Bearer ${ar}`
            token: `${ar}`
          }
        })
        .then(res => {
          // console.log(res.data, "res.data");
          this.dataa = res.data;
        });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    hanglclicks() {
      let arr = this.$refs["tree"].getCheckedKeys();
      console.log(arr);
    },
    //删除
    open() {
      this.$confirm(
        "员工被移除部门后，与该部门关联关系终止，且该员工恢复无部门状态，是否确认移除？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
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
  },
  created() {
    this.getStaffList();
    this.getList();
  }
};
</script>
<style scoped lang="less">
.activeName{
  margin-top:10px;
}
.home {
  width: 100%;
  height: 840px;
  background: #fff;
  display: flex;
  flex-direction: column;
  .home_one {
    width: 100%;
    height: 840px;
    background: #fff;
    display: flex;
    flex-direction: column;
  }
}
.home_header {
  width: 100%;
  height: 20px;
  padding-bottom:6px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
}
.search_ {
  width: 100%;
  height: 2%;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
  // border:1px solid #ccc;
  .success_ {
    float: right;
    margin-right: 20px;
  }
}
.table_ {
  width:100%;
  height:70vh;
  margin-top: 20px;
  box-sizing: border-box;
}

.header_button {
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  /deep/.el-button {
    margin-left: 18px;
  }
}
.dialog_ {
  /deep/.el-form {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    /deep/.el-form-item {
      width: 40%;
      display: flex;
      justify-content: flex-end;
      /deep/.el-form-item__content {
        width: 215px;
      }
    }
    .inpTextarea {
      width: 81%;
      display: flex;
      justify-content: flex-end;
      /deep/.el-form-item__content {
        width: 88%;
        /deep/.el-textarea {
          width: 100%;
        }
      }
    }
  }
}
.main_sectiontab {
  width: 100%;
  height: 82vh;
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
      padding: 20px;
      box-sizing: border-box;
      .title_tree {
        width: 100%;
        height: 30px;
        line-height: 10px;
        text-indent: 10px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 10px;
      }
      .padding_margin{
        padding: 20px;
        box-sizing: border-box;
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
.main_section {
    width: 100%;
    height: 82vh;
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
</style>