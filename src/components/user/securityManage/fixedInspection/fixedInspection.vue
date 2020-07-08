<template>
  <div class="home">
    <router-view v-if="isdistable" />
    <div v-else class="home_one">
      <div class="home_header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>安全管理</el-breadcrumb-item>
          <el-breadcrumb-item>固定巡检</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClickssss">
        <el-tab-pane label="巡检记录" name="first">
          <div class="search_">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item>
                <div class="block">
                  <el-date-picker
                    v-model="value1"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </div>
              </el-form-item>
              <el-form-item>
                <el-select v-model="formInline.region" placeholder="巡更结果">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="formInline.region" placeholder="整改进度">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-button type="primary" @click="dialogVisible = true">查找</el-button>
              <!-- 新增员工 -->
              <el-dialog
                title="新增员工"
                class="dialog_"
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="handleClose"
              >
                <!-- <assembly /> -->
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
          </div>
        </el-tab-pane>
        <el-tab-pane label="巡更点维护" name="second">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <div class="serach_">
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item>
                  <el-input v-model="formInline.user" placeholder="巡更点"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="formInline.region" placeholder="巡更点状态">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">查找</el-button>
                  <el-button type="success" @click="onSubmit">新增</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="home_main_section">
              <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#001642'}">
                <el-table-column
                  align="center"
                  show-overflow-tooltip
                  prop="date"
                  label="日期"
                  width="80"
                ></el-table-column>
                <el-table-column align="center" show-overflow-tooltip prop="name" label="姓名"></el-table-column>
                <el-table-column align="center" show-overflow-tooltip prop="province" label="省份"></el-table-column>
                <el-table-column align="center" show-overflow-tooltip prop="city" label="市区"></el-table-column>
                <el-table-column align="center" show-overflow-tooltip prop="address" label="地址"></el-table-column>
                <el-table-column align="center" show-overflow-tooltip prop="zip" label="邮编"></el-table-column>
                <el-table-column align="center" show-overflow-tooltip fixed="right" label="操作">
                  <template slot-scope="scope">
                    <el-button @click="onlydialogVisible = true" type="text" size="small">禁用</el-button>
                    <el-button @click="onlydialogVisible = true" type="text" size="small">编辑</el-button>
                    <el-button @click="onlydialogVisible = true" type="text" size="small">二维码</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="巡更计划维护" name="third">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <div class="serach_">
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item>
                  <el-select v-model="formInline.region" placeholder="巡更计划状态">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">查找</el-button>
                  <el-button type="success" @click="onSubmit">新增</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="home_main_section">
              <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#001642'}">
                <el-table-column
                  align="center"
                  show-overflow-tooltip
                  prop="date"
                  label="日期"
                  width="80"
                ></el-table-column>
                <el-table-column align="center" show-overflow-tooltip prop="name" label="姓名"></el-table-column>
                <el-table-column align="center" show-overflow-tooltip prop="province" label="省份"></el-table-column>
                <el-table-column align="center" show-overflow-tooltip prop="city" label="市区"></el-table-column>
                <el-table-column align="center" show-overflow-tooltip prop="address" label="地址"></el-table-column>
                <el-table-column align="center" show-overflow-tooltip prop="zip" label="邮编"></el-table-column>
                <el-table-column align="center" show-overflow-tooltip fixed="right" label="操作">
                  <template slot-scope="scope">
                    <el-button @click="onlydialogVisible = true" type="text" size="small">禁用</el-button>
                    <el-button @click="onlydialogVisible = true" type="text" size="small">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>

      <!--  -->
    </div>
  </div>
</template>

<script>
// import department_ from './staff_list/department'
// import jurisdiction_ from './staff_list/department'
import Cookie from "js-cookie";
export default {
  data() {
    return {
      activeName: "first",
      tableDatalist: [],
      dialogVisible: false,
      dialogTableVisible: false,
      isdistable: false,
      formInline: {
        user: "",
        region: ""
      },
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
  // components:{
  //   department_,
  //   jurisdiction_
  // },
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
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    patrolPlan() {
      this.isdistable = true;
      this.$router.push("/patrolPlan");
    },
    patrolPoint() {
      this.isdistable = true;
      this.$router.push("/patrolPoint");
    },
    // 员工列表
    getList() {
      let ar = Cookie.get("token");
      let url = this.API1url.API.api.getDatalists;
      let headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        // Authorization: `Bearer ${ar}`
        token: `${ar}`
      };
      this.$axios.get(url, headers).then(res => {
        console.log(res);
      });
    }
  },
  created() {
    this.getList();
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
  width:100%;
  height:69vh;
  margin-top: 20px;
}
/deep/.el-dialog {
  /deep/.el-dialog__body {
    padding: 0 20px !important;
  }
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
</style>