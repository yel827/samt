<template>
  <div id="ed">
    <div class="home_header">数据字典</div>
    <el-row>
      <el-col>
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#001642'}">
          <el-table-column align="center" prop="date" label="序号" width="60"></el-table-column>
          <el-table-column align="center" prop="name" label="字典项名称" width="160"></el-table-column>
          <el-table-column align="center" prop="address" label="详情"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="handleClick(scope.row)" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 班组编辑 -->
        <el-dialog title="编辑" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
          <div class="dilog_one">字典项名称：{{title}}</div>
          <div class="dilog_main">
            <el-form
              :model="dynamicValidateForm"
              ref="dynamicValidateForm"
              label-width="100px"
              class="demo-dynamic"
            >
              <span class="dilog_we">详情:</span>
              <el-form-item
                v-for="(domain, index) in dynamicValidateForm.domains"
                :key="domain.key"
                :prop="'domains.' + index + '.value'"
                :rules="{required: true, message: `${title}不能为空`, trigger: 'blur'}"
              >
                <div class="if_dilog" v-if="title === '工种'">
                  <el-form-item>
                    <el-select v-model="domain.region" placeholder="活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  <el-form-item>
                    <el-input v-model="domain.user" placeholder="审批人"></el-input>
                  </el-form-item>
                  </el-form-item>
                </div>
                <el-input v-else v-model="domain.value"></el-input>
                <el-button @click.prevent="removeDomain(domain)" v-if="index > 0">删除</el-button>
              </el-form-item>
              <el-form-item></el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDomain">新增{{title}}</el-button>
            <el-button type="primary" @click="submitForm('dynamicValidateForm')">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        domains: [
          {
            value: "",
            region:'',
            user:''
          }
        ],
        email: ""
      },
      title: "",
      dialogVisible: false,
      tableData: [
        {
          date: "1",
          name: "班组",
          address: "木工组，水电组，原料组"
        },
        {
          date: "2",
          name: "工种",
          address: "水泥工，木工，电工"
        },
        {
          date: "3",
          name: "违章行为",
          address: "进出异常，疲劳作业，违规操作"
        }
      ]
    };
  },
  methods: {
    // 列表数据
    gettableData(){
      let that = this
      let url = that.API1url.API.api.getlist;
    },
    handleClick(row) {
      console.log(row);
      this.dialogVisible = true;
      this.title = row.name;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        key: Date.now()
      });
    }
  },
  created(){
    this.gettableData()
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
.el-row {
  width: 100%;
  height: 84vh;
  box-sizing: border-box;
}
/deep/.el-dialog__body {
  padding-top: 2px;
}
.if_dilog{
  display: flex;
  /deep/.el-form-item__content{
    width:90% !important;
    display: flex;
    /deep/.el-select{
      width:180px;
    }
    /deep/.el-form-item{
      width:320px;
      margin-left:10px;
      /deep/.el-form-item__content{
        width:100%;
      }
    }
  }
}
.dilog_one {
  width: 100%;
  padding: 10px 0 10px 10px;
  box-sizing: border-box;
  background: #f2f6fc;
  margin-bottom: 10px;
}
/deep/.el-form {
  position: relative;
  /deep/.el-form-item {
    /deep/.el-form-item__content {
      width: 60%;
      /deep/.el-button {
        position: absolute;
        right: -24%;
        top: 0;
        display: inline-block;
      }
    }
  }
  .dilog_we {
    display: inline-block;
    width: 80px;
    height: 40px;
    text-align: right;
    position: absolute;
    top: 10px;
  }
}
</style>
