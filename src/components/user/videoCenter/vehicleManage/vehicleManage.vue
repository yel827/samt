<template>
  <div class="home">
    <div class="home_header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>视频中心</el-breadcrumb-item>
        <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="home_main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="serach_">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="姓名:">
              <el-input v-model="formInline.user" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="block">
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="过闸开始日期"
                  end-placeholder="过闸结束日期"
                ></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查找</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="home_main_section">
          <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#001642'}">
            <el-table-column align="center" show-overflow-tooltip prop="date" label="日期" width="80"></el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="name" label="姓名"></el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="province" label="省份"></el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="city" label="市区"></el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="address" label="地址"></el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="zip" label="邮编"></el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="zip" label="邮编"></el-table-column>
          </el-table>
        </div>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 新增设备
      dialogVisible: false,
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
      // 编辑
      editdialogVisible: false,
      // 查看
      onlydialogVisible: false,
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
.home_main {
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
    height: 76vh;
    margin-top: 2vh;
    box-sizing: border-box;
  }
}
</style>