<template>
  <div class="home">
    <div class="home_header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>考勤管理</el-breadcrumb-item>
        <el-breadcrumb-item>异常记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="home_main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="疲劳作业" name="first">
          <div class="serach_">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item >
                <el-input v-model="formInline.user" placeholder="姓名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="formInline.user" placeholder="手机号码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-select v-model="formInline.region" placeholder="异常状态">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查找</el-button>
                <el-button type="success" @click="dialogVisible= true">设置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="home_main_section">
            <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#000'}">
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
                  <el-button @click="dialogVisibleds = true" type="text" size="small">查看</el-button>
                  <el-button type="text" @click="dialogVisibled = true" size="small">解除异常</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 设置 -->
            <el-dialog
              title="设置"
              :visible.sync="dialogVisible"
              width="30%"
              class="sheZhi"
              :before-close="handleClose"
            >
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="单日累计最长工作时间：">
                  <el-input v-model="formInline.user" placeholder="8"></el-input>小时
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
            <!-- 解除异常 -->
            <el-dialog
              title="解除异常"
              :visible.sync="dialogVisibled"
              width="30%"
              class="sheZhi"
              :before-close="handleClose"
            >
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="date" label="日期" width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
              </el-table>
              <el-form ref="form" class="formLET" :model="formInline" label-width="80px">
                <el-form-item label="活动形式">
                  <el-input type="textarea" v-model="formInline.desc"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibled = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisibled = false">确 定</el-button>
              </span>
            </el-dialog>
            <!-- 查看 -->
            <el-dialog
              title="查看"
              :visible.sync="dialogVisibleds"
              width="30%"
              class="sheZhi"
              :before-close="handleClose"
            >
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="date" label="日期" width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
              </el-table>
              <el-form ref="form" class="formLET" :model="formInline" label-width="80px">
                <el-form-item label="活动形式">
                  <el-input type="textarea" v-model="formInline.desc"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisibleds = false">关 闭</el-button>
              </span>
            </el-dialog>
          </div>
        </el-tab-pane>
        <el-tab-pane label="异常进出" name="second">
          <div class="serach_">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item>
                <el-input v-model="formInline.user" placeholder="姓名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="formInline.user" placeholder="手机号码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-select v-model="formInline.region" placeholder="异常状态">
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
            <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#000'}">
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
                  <el-button @click="lkdialogdisplay = true" type="text" size="small">查看</el-button>
                  <el-button type="text" @click="dialogdisplay = true" size="small">解除异常</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 解除异常 -->
            <el-dialog
              title="解除异常"
              :visible.sync="dialogdisplay"
              width="30%"
              class="sheZhi"
              :before-close="handleClose"
            >
              <el-table :data="tab" border style="width: 100%">
                <el-table-column prop="date" label="序号" width="60"></el-table-column>
                <el-table-column prop="name" label="方向" width="100"></el-table-column>
                <el-table-column prop="address" label="时间">
                  <template slot-scope="scope">
                    <el-time-select
                      placeholder="起始时间"
                      v-model="startTime"
                      :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '18:30'
                      }"
                    ></el-time-select>
                  </template>
                </el-table-column>
              </el-table>
              <el-form ref="form" class="formLET" :model="formInline" label-width="80px">
                <el-form-item label="解除理由">
                  <el-input type="textarea" v-model="formInline.desc"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogdisplay = false">取 消</el-button>
                <el-button type="primary" @click="dialogdisplay = false">确 定</el-button>
              </span>
            </el-dialog>
            <!-- 查看 -->
            <el-dialog
              title="查看"
              :visible.sync="lkdialogdisplay"
              width="30%"
              class="sheZhi"
              :before-close="handleClose"
            >
              <el-table :data="tab" border style="width: 100%">
                <el-table-column prop="date" label="序号" width="60"></el-table-column>
                <el-table-column prop="name" label="方向" width="100"></el-table-column>
                <el-table-column prop="address" label="时间">
                  <template slot-scope="scope">
                    <el-time-select
                      placeholder="起始时间"
                      readonly
                      v-model="startTime"
                      :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '18:30'
                      }"
                    ></el-time-select>
                  </template>
                </el-table-column>
              </el-table>
              <el-form ref="form" class="formLET" :model="formInline" label-width="80px">
                <el-form-item label="解除理由">
                  <el-input type="textarea" v-model="formInline.desc"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="lkdialogdisplay = false">取 消</el-button>
                <el-button type="primary" @click="lkdialogdisplay = false">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </el-tab-pane>
        <el-tab-pane label="自动退场" name="third">
          <div class="serach_">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item>
                <el-input v-model="formInline.user" placeholder="姓名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="formInline.user" placeholder="手机号码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="退场开始日期"
                  end-placeholder="退场结束日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-select v-model="formInline.region" placeholder="异常状态">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查找</el-button>
                <el-button type="success" @click="dialogVisibleynpeted = true">设置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="home_main_section">
            <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#000'}">
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
                  <el-button @click="readonlyvisibile = true" type="text" size="small">查看</el-button>
                  <el-button type="text" @click="dialogVisiblDisplay = true" size="small">解除异常</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 设置 -->
            <el-dialog
              title="设置"
              :visible.sync="dialogVisibleynpeted"
              width="30%"
              class="sheZhi"
              :before-close="handleClose"
            >
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="连续未出勤天数上限：">
                  <el-input v-model="formInline.user" placeholder="8"></el-input>天
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleynpeted = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisibleynpeted = false">确 定</el-button>
              </span>
            </el-dialog>
            <!-- 解除异常 -->
            <el-dialog
              title="解除异常"
              :visible.sync="dialogVisiblDisplay"
              width="30%"
              class="removeClicks"
              :before-close="handleClose"
            >
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="连续未出勤日期：">
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
                <el-form-item label="解除理由：">
                  <el-input type="textarea" v-model="formInline.desc"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisiblDisplay = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisiblDisplay = false">确 定</el-button>
              </span>
            </el-dialog>
            <!-- 查看 -->
            <el-dialog
              title="查看"
              :visible.sync="readonlyvisibile"
              width="30%"
              class="removeClicks"
              :before-close="handleClose"
            >
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="连续未出勤日期：">
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
                <el-form-item label="解除理由：">
                  <el-input type="textarea" v-model="formInline.desc"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="readonlyvisibile = false">关 闭</el-button>
              </span>
            </el-dialog>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 时间
      startTime: "",
      endTime: "",
      value1:'',
      // 设置
      dialogVisible: false,
      dialogVisibleynpeted: false,
      // 解除异常
      dialogVisibled: false,
      dialogdisplay: false,
      dialogVisiblDisplay: false,
      // 查看
      dialogVisibleds: false,
      lkdialogdisplay: false,
      readonlyvisibile:false,
      // 选项卡切换
      activeName: "first",
      // 表单参数
      formInline: {
        user: "",
        region: "",
        desc: ""
      },
      // 表格列表数据
      tableData: [
        {
          date: "1",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区",
          zip: 200333
        },
        {
          date: "2",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区",
          zip: 200333
        },
        {
          date: "3",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区",
          zip: 200333
        },
        {
          date: "4",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区",
          zip: 200333
        }
      ],
      tableDataoutIn: [
        {
          date: "1",
          name: "入闸",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区",
          zip: 200333
        },
        {
          date: "2",
          name: "出闸",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区",
          zip: 200333
        },
        {
          date: "3",
          name: "入闸",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区",
          zip: 200333
        },
        {
          date: "4",
          name: "入闸",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区",
          zip: 200333
        }
      ],
      tab: []
    };
  },
  methods: {
    // 判断入闸出闸的状态
    outIn() {
      var list = {
        date: "4",
        name: "出闸",
        province: "上海",
        city: "普陀区",
        address: "上海市普陀区",
        zip: 200333
      };
      for (var i = 0; i < this.tableDataoutIn.length; i++) {
        this.tab.push(this.tableDataoutIn[i]);
        if (this.tableDataoutIn[i].name == this.tableDataoutIn[i + 1].name) {
          this.tab.splice(i + 1, 0, list);
        }
      }
      console.log(this.tab);
      // this.tableDataoutIn.forEach((item,index) => {
      //     if (item.name == item.name) {
      //     this.tableDataoutIn.splice(index, 0, list);
      //   }
      // });
    }
  },
  created() {
    this.outIn();
  }
};
</script>
<style scoped lang="less">
.removeClicks{
  /deep/.el-form-item{
    width:100%;
    /deep/.el-form-item__label{
      width:30%;
      
    }
    /deep/.el-form-item__content{
        width:65%;
      }
  }
}
.sheZhi {
  /deep/.el-form-item__content {
    display: inline-block;
    width: 210px;
    /deep/.el-input {
      width: 170px;
      margin-right: 10px;
    }
  }
}
.formLET {
  margin-top: 20px;
  /deep/.el-form-item__content {
    width: 80%;
    margin-left: 0px;
    display: flex;
    /deep/.el-textarea {
      width: 100%;
      /deep/.el-textarea__inner {
        width: 100%;
      }
    }
  }
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
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
  .home_main_section {
    width: 100%;
    height: 70vh;
    margin-top: 2vh;
    box-sizing: border-box;
  }
}
</style>