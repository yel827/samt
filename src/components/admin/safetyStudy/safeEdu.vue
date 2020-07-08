<template>
  <div id="ed">
    <div class="home_header">安全教育</div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="进场考试" name="first">
        <div class="search_">
          <el-button class="success_k" type="primary">考试设置</el-button>
          <el-button class="success_" type="success">新建考题</el-button>
        </div>
        <div class="section_main">
          <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#001642'}">
            <el-table-column fixed prop="date" label="日期"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="province" label="省份"></el-table-column>
            <el-table-column prop="city" label="市区"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column prop="zip" label="邮编"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="安全学习" name="second">
        <div class="search_two">
          <el-form ref="form" :model="form" label-width="60px">
            <el-form-item>
              <el-select v-model="form.region" placeholder="工种">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button class="success_" type="success">新建考题</el-button>
              <el-button class="success_k" type="primary">考试设置</el-button>
              <el-button class="success_c" type="primary">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="section_main">
          <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#001642'}">
            <el-table-column fixed prop="date" label="日期"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="province" label="省份"></el-table-column>
            <el-table-column prop="city" label="市区"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column prop="zip" label="邮编"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      form: {
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
<style lang="less" scoped>
.home_header {
  width: 100%;
  height: 20px;
  line-height: 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 22px;
}
.search_ {
  width: 100%;
  height: 50px;
  padding: 20px 20px 20px 20px;
  box-sizing: border-box;
  // border:1px solid #ccc;
  position: relative;
  .success_ {
    width: 100px !important;
    height: 30px;
    font-size: 14px;
    line-height: 10px;
    display: inline-block;
    position: absolute;
    background: #ffa200;
    border:none;
    right: 10px;
    bottom: 10px;
    padding: 0;
    box-sizing: border-box;
  }
  .success_k {
    width: 100px !important;
    height: 30px;
    font-size: 14px;
    line-height: 10px;
    display: inline-block;
    position: absolute;
    right: 130px;
    bottom: 10px;
    padding: 0;
    box-sizing: border-box;
  }
  .success_c {
    width: 100px !important;
    height: 30px;
    font-size: 14px;
    line-height: 10px;
    display: inline-block;
    position: absolute;
    right: 250px;
    bottom: 10px;
    padding: 0;
    box-sizing: border-box;
  }
}
.search_two {
  width: 100%;
  height: 60px;
  padding: 10px;
  box-sizing: border-box;
  .success_{
    background: #ffa200;
    border:none;
  }
  /deep/.el-form {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    /deep/.el-form-item {
      width: 50%;
      /deep/.el-form-item__content {
        width: 100%;
        margin-left: 0px !important;
        /deep/.el-button {
          width:100px;
          height:30px;
          margin-top:10px;
          line-height: 7px;
          float: right;
          margin-right: 20px;
        }
      }
    }
  }
}
.section_main {
  width: 100%;
  height: 100vh;
}

.section_main {
  width: 100%;
  height: calc(72vh);
  box-sizing: border-box;
}
</style>
