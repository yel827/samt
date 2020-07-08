<template>
  <div class="home">
    <div class="home_header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item path="{/}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>固定巡检</el-breadcrumb-item>
        <el-breadcrumb-item>巡检点维护</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="home_main">
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
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column align="center" show-overflow-tooltip prop="date" label="日期" width="80"></el-table-column>
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
    background: #ccc;
    margin-top: 2vh;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>