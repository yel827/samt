<template>
  <div id="ed">
    <div class="project_header">项目信息</div>
    <div class="project_main">
      <el-form :label-position="labelPosition" :model="formLabelAlign">
        <div>
          <el-form-item label="项目名称">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="项目ID">
            <el-input v-model="formLabelAlign.region"></el-input>
          </el-form-item>
          <el-form-item label="项目地址">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="项目负责人">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="项目状态">
            <el-input v-model="formLabelAlign.region"></el-input>
          </el-form-item>
          <el-form-item label="建设规模">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="投资总额（万元）">
            <el-input v-model="formLabelAlign.region"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-button type="info">查看</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: true,
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      }
    };
  }
};
</script>
<style lang="less" scoped>
.project_header {
  width: 100%;
  height: 20px;
  line-height: 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 22px;
}
.project_main {
  width: 100%;
  height: 80vh;
  background: #fff;
  padding: 100px 200px 0px 200px;
  box-sizing: border-box;
}
/deep/.el-form-item {
  display: flex;
  justify-content: flex-end;
  /deep/.el-form-item__content {
    width: 80%;
  }
}
</style>
