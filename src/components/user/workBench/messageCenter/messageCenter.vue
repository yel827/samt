<template>
  <div class="home">
    <div class="home_header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>工作台</el-breadcrumb-item>
        <el-breadcrumb-item>消息中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="home_main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="serach_">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="formInline.region" placeholder="消息类型">
                <el-option label="消息类型" value="shanghai"></el-option>
                <el-option label="消息类型" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <!-- <div style="margin: 15px 0;"></div> -->
              <el-button type="primary" @click="onSubmit">查找</el-button>
              <el-button type="primary" @click="onSubmit">标记为已读</el-button>
              
            </el-form-item>
          </el-form>
        </div>
        <div class="home_main_section">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            :header-cell-style="{background:'#eef1f6',color:'#001642'}"
          >
            <el-table-column type="selection" label="" width="55"></el-table-column>
            <el-table-column prop="name" label="消息类型" width="120"></el-table-column>
            <el-table-column prop="address" label="消息" show-overflow-tooltip></el-table-column>
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
  },
  methods: {
    // 全选状态
    handleCheckAllChange(val) {
      this.checkedCities = val ? cities : [];
      this.isIndeterminate = false;
    },
    // 选择的状态
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
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
.messageList {
  width: 100%;
  height: 40px;
  line-height: 40px;

  /deep/.el-checkbox {
    width: 100%;
    height: auto;
    border-bottom: 1px solid #ccc;
  }
}
</style>