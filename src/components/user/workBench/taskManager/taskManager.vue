<template>
  <div class="home">
    <div class="home_header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>工作台</el-breadcrumb-item>
        <el-breadcrumb-item>任务管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="home_main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我发起的" name="first">
          <div class="serach_">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item>
                <el-select v-model="formInline.region" placeholder="任务类型">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <div class="block">
                  <el-date-picker
                    v-model="value1"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="指派开始日期"
                    end-placeholder="指派结束日期"
                  ></el-date-picker>
                </div>
              </el-form-item>
              <el-form-item>
                <el-select v-model="formInline.region" placeholder="整改进度">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查找</el-button>
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
                  <el-button @click="dialogVisible = true" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 查找 -->
            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="50%"
              :before-close="handleClose"
            >
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="姓名">
                  <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="班组">
                  <el-select v-model="formInline.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="工种">
                  <el-select v-model="formInline.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div class="days">
                <div>出勤天数：12天</div>
                <div class="seareh">
                  <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="活动区域">
                      <el-select v-model="formInline.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
              <div style="width:100%;">
                <Calendar :choseDay="clickDay" :markDateMore="arrlist" :changeMonth="changeDate"></Calendar>
              </div>
              <template>
                <el-table border :data="tableData" class="tableLists">
                  <el-table-column prop="date" label="日期" width="180"></el-table-column>
                  <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                  <el-table-column prop="address" label="地址"></el-table-column>
                </el-table>
              </template>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </el-tab-pane>
        <el-tab-pane label="抄送我的" name="second">
          <div class="serach_">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item>
                <el-select v-model="formInline.region" placeholder="任务类型">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <div class="block">
                  <el-date-picker
                    v-model="value1"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="指派开始日期"
                    end-placeholder="指派结束日期"
                  ></el-date-picker>
                </div>
              </el-form-item>
              <el-form-item>
                <el-select v-model="formInline.region" placeholder="整改进度">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查找</el-button>
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
                  <el-button @click="dialogVisible = true" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Calendar from "vue-calendar-component";
export default {
  data() {
    return {
      arrlist: [
        { date: "2020/6/1", className: "mark1" },
        { date: "2020/6/13", className: "mark2" }
      ],
      dialogVisible: false,
      dialogVisibleds: false,
      dialogDisplay: false,
      activeName: "first",
      formInline: {
        user: "",
        region: ""
      },
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
    Calendar
  },
  methods: {
    clickDay(data) {
      console.log(data); //选中某天
    },
    changeDate(data) {
      console.log(data); //左右点击切换月份
    },
    clickToday(data) {
      console.log(data); //跳到了本月
    },
    // 驳回申请
    openClickin() {
      this.$prompt("延时原因：", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: "请输入驳回原因"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的驳回原因是: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    // 撤销
    openRemove() {
      this.$confirm(
        "撤销后，对应人员失去次日通行资格，是否确认撤销？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }
      )
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的撤销是: " + value
          });
          this.$refs["remo"].className = "colos";
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消撤销"
          });
        });
    }
  }
};
</script>
<style scoped lang="less">
.sheZhi {
  /deep/.el-form-item__content {
    display: inline-block;
    width: 200px;
    /deep/.el-input {
      width: 170px;
      margin-right: 10px;
    }
  }
}
.colos {
  color: #ccc;
}
.tableLists {
  width: 80%;
  margin-left: 10%;
  margin-top: 10px;
}
/deep/.wh_container {
  width: 911px;
  height: auto;
  margin: 0;
  /deep/.wh_content_all {
    width: 911px;
    background: #fff;
    /deep/.wh_top_changge {
      color: #000 !important;
      display: none;
      li {
        color: #000;
        .wh_jiantou1 {
          border-top: 2px solid #000;
          border-left: 2px solid #000;
        }
        .wh_jiantou2 {
          border-top: 2px solid #000;
          border-right: 2px solid #000;
        }
      }
    }
    .wh_content {
      .wh_content_item {
        .wh_top_tag {
          color: #000;
        }
        .wh_item_date {
          color: #000;
        }
      }
    }
  }
}

.mark1 {
  background: orange;
}
.mark2 {
  background: green;
}
.days {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .seareh {
    line-height: 50px;
    /deep/.el-form {
      height: 50px;
    }
  }
}
.calendar-day {
  text-align: center;
  color: #202535;
  line-height: 30px;
  font-size: 12px;
}
.is-selected {
  color: #f8a535;
  font-size: 10px;
  margin-top: 5px;
}
#calendar
  .el-button-group
  > .el-button:not(:first-child):not(:last-child):after {
  content: "当月";
}
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
.home_main {
  padding-top: 10px;
  box-sizing: border-box;
  .serach_ {
    width: 100%;
    height: 2%;
    padding-top: 10px;
    box-sizing: border-box;
    /deep/.el-form {
      width: 80%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
  .home_main_section {
    width: 100%;
    height: 69vh;
    margin-top: 2vh;
    box-sizing: border-box;
  }
}
.serach_wen {
  width: 100%;
  height: 120px;
  padding-top: 10px;
  box-sizing: border-box;
  /deep/.el-form {
    width: 70%;
    height: 120px;
    padding-top: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /deep/.el-form-item {
      margin-right: 40px;
    }
  }
}
.home_main_sections {
  width: 100%;
  height: 66vh;
  margin-top: 2vh;
  box-sizing: border-box;
}
</style>