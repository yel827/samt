<template>
  <div id="ed">
    <div class="home_header">个人信息</div>
    <div class="main">
      <div class="personInfo">
        <div class="personInfoLeft">
          <div class="personInfoLeft_top"></div>
          <div class="personInfoLeft_bottom"></div>
        </div>
        <div class="personInfoRight"></div>
        <el-button type="primary" @click="dialogVisible = true">更改密码</el-button>
      </div>
      <el-dialog title="更改密码" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="原密码" prop="newPwd">
            <el-input v-model="ruleForm.newPwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="oldPwd">
            <el-input v-model="ruleForm.oldPwd"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="userName">
            <el-input v-model="ruleForm.userName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: true,
      dialogVisible: false,
      ruleForm:{
        newPwd:'',
        oldPwd:'',
        userName:''
      },
      rules:{
        newPwd:[{ required: true, message: '请输入原密码', trigger: 'blur' }],
        oldPwd:[{ required: true, message: '请输入新密码', trigger: 'blur' }],
        userName:[{ required: true, message: '请确认新密码', trigger: 'blur' }],
      }
    };
  },
  methods:{
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = this.ruleForm
            this.$api.uploadPassword(params).then(res=>{
                this.dialogVisible = false
            })
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
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
.main {
  width: 100%;
  height: 84vh;
  position: relative;
  .personInfo {
    width: 50%;
    height: 90%;
    border: 1px solid #ccc;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    .personInfoLeft {
      width: 100%;
      height: 50%;
      background: cyan;
      display: flex;
    }
    .personInfoRight {
      width: 100%;
      height: 50%;
    }
  }
}
</style>
