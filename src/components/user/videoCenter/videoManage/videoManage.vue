<template>
  <div class="home">
    <div class="home_header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>视频中心</el-breadcrumb-item>
        <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="home_main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="摄像头管理" name="first">
          <div class="serach_">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item>
                <el-input v-model="formInline.user" placeholder="设备名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="formInline.region" placeholder="设备状态">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查找</el-button>
                <el-button type="success" @click="dialogVisible= true">新增设备</el-button>
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
                  <el-button @click="dialogVisibleds = true" type="text" size="small">停用</el-button>
                  <el-button type="text" @click="dialogVisibled = true" size="small">编辑</el-button>
                  <el-button type="text" size="small">置顶</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 新增设备 -->
            <el-dialog
              title="设置"
              :visible.sync="dialogVisible"
              width="30%"
              class="sheZhi"
              :before-close="handleClose"
            >
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="设备名称">
                  <el-input v-model="formInline.user" placeholder="8"></el-input>
                </el-form-item>
                <el-form-item label="品牌">
                  <el-input v-model="formInline.user" placeholder="8"></el-input>
                </el-form-item>
                <el-form-item label="设备序列号">
                  <el-input v-model="formInline.user" placeholder="8"></el-input>
                </el-form-item>
                <el-form-item label="启用管理">
                  <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
            <!-- 编辑 -->
            <el-dialog
              title="编辑"
              :visible.sync="dialogVisibled"
              width="30%"
              class="sheZhi"
              :before-close="handleClose"
            >
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="设备名称">
                  <el-input v-model="formInline.user" placeholder="8"></el-input>
                </el-form-item>
                <el-form-item label="品牌">
                  <el-input v-model="formInline.user" placeholder="8"></el-input>
                </el-form-item>
                <el-form-item label="设备序列号">
                  <el-input v-model="formInline.user" placeholder="8"></el-input>
                </el-form-item>
                <el-form-item label="启用管理">
                  <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibled = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisibled = false">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </el-tab-pane>
        <el-tab-pane label="车辆道闸管理" name="second">
          <div class="serach_">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item>
                <el-input v-model="formInline.user" placeholder="设备名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="formInline.region" placeholder="设备状态">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查找</el-button>
                <el-button type="primary" @click="addDialogVisible = true">新增设备</el-button>
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
                  <el-button @click="lkdialogdisplay = true" type="text" size="small">查看</el-button>
                  <el-button type="text" @click="dialogdisplay = true" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
             <!-- 新增设备 -->
            <el-dialog
              title="设置"
              :visible.sync="addDialogVisible"
              width="30%"
              class="sheZhi"
              :before-close="handleClose"
            >
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="设备名称">
                  <el-input v-model="formInline.user" placeholder="8"></el-input>
                </el-form-item>
                <el-form-item label="品牌">
                  <el-input v-model="formInline.user" placeholder="8"></el-input>
                </el-form-item>
                <el-form-item label="设备序列号">
                  <el-input v-model="formInline.user" placeholder="8"></el-input>
                </el-form-item>
                <el-form-item label="闸口属性">
                  <el-select v-model="formInline.region" placeholder="活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
            <!-- 编辑 -->
            <el-dialog
              title="编辑"
              :visible.sync="dialogdisplay"
              width="30%"
              class="sheZhi"
              :before-close="handleClose"
            >
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="设备名称">
                  <el-input v-model="formInline.user" placeholder="8"></el-input>
                </el-form-item>
                <el-form-item label="品牌">
                  <el-input v-model="formInline.user" placeholder="8"></el-input>
                </el-form-item>
                <el-form-item label="设备序列号">
                  <el-input v-model="formInline.user" placeholder="8"></el-input>
                </el-form-item>
                <el-form-item label="闸口属性">
                  <el-select v-model="formInline.region" placeholder="活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
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
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="设备名称">
                  <el-input v-model="formInline.user" placeholder="8"></el-input>
                </el-form-item>
                <el-form-item label="品牌">
                  <el-input v-model="formInline.user" placeholder="8"></el-input>
                </el-form-item>
                <el-form-item label="设备序列号">
                  <el-input v-model="formInline.user" placeholder="8"></el-input>
                </el-form-item>
                <el-form-item label="闸口属性">
                  <el-select v-model="formInline.region" placeholder="活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="lkdialogdisplay = false">取 消</el-button>
                <el-button type="primary" @click="lkdialogdisplay = false">确 定</el-button>
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
      // 启用管理开关
      value: true,
      // 时间
      startTime: "",
      endTime: "",
      value1: "",
      // 新增设备
      dialogVisible: false,
      dialogVisibleynpeted: false,
      addDialogVisible:false,
      // 解除异常
      dialogVisibled: false,
      dialogdisplay: false,
      dialogVisiblDisplay: false,
      // 查看
      dialogVisibleds: false,
      lkdialogdisplay: false,
      readonlyvisibile: false,
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
.removeClicks {
  /deep/.el-form-item {
    width: 100%;
    /deep/.el-form-item__label {
      width: 30%;
    }
    /deep/.el-form-item__content {
      width: 65%;
    }
  }
}
.sheZhi {
  /deep/.el-form-item {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    /deep/.el-form-item__content {
      display: inline-block;
      width: 80%;
      /deep/.el-select{
        width: 100%;
        margin-right: 10px;
      }
      /deep/.el-input {
        width: 100%;
        margin-right: 10px;
      }
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