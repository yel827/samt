<template>
  <div class="home">
    <div class="home_header">企业信息</div>
    <div class="home_main">
      <div class="home_main_left">
        <div class="left_information" v-for="(item,index) in enterprise" :key="index">
          <p><span>企业名称:</span><span>{{item.enterpriseName}}</span></p>
          <p><span>统一社会通用代码:</span><span>{{item.creditCode}}</span></p>
          <p><span>企业地址:</span><span>{{item.mergerName}}</span></p>
          <p><span>联系人:</span><span>{{item.contactName}}</span></p>
          <p><span>联系方式:</span><span>{{item.mobile}}</span></p>
          <p><span>座机:</span><span>{{item.phone}}</span></p>
          <p><span>营业执照:</span>
            <span><el-button type="info" @click="centerDialogVisible = true">查看</el-button></span>
          </p>
        </div>
        <!-- 查看弹窗 -->
        <el-dialog title="查看" :visible.sync="centerDialogVisible" width="60%" center>
          <div class="demo-image__preview">
            <el-image style="width: 100%; height: 100%" :src="url" :preview-src-list="srcList"></el-image>
          </div>
        </el-dialog>
      </div>
      <div class="home_main_right">
        <el-image :src="url" class="ting"></el-image>
      </div>
    </div>
    <div class="home_footer">
      <el-button class="el-bitton_" type="primary" @click="updatecompany">变更</el-button>
    </div>
    <!-- 企业信息 -->
        <el-dialog center title="企业信息" :modal-append-to-body='false' :visible.sync="dialogVisible" width="50%">
          <el-form
            :model="formLabelAlign"
            :rules="rules"
            ref="ruleFormd"
            class="retrieveLogin"
            label-width="140px"
          >
            <el-form-item label="企业名称" prop="enterpriseName">
              <el-input v-model="formLabelAlign.enterpriseName"></el-input>
            </el-form-item>
            <el-form-item label="统一社会信用代码" prop="creditCode">
              <el-input v-model="formLabelAlign.creditCode"></el-input>
            </el-form-item>
            <el-form-item label="企业地址" class="input_imp" prop="projectAddress">
              <el-select v-model="pname" @change="choseProvince" placeholder="省级地区">
                <el-option
                  v-for="(item,$index) in province"
                  :key="$index"
                  :label="item.value"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-select v-model="cname" @change="choseCity" placeholder="市级地区">
                <el-option
                  v-for="(item,$index) in city"
                  :key="$index"
                  :label="item.value"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-select v-model="bname" @change="choseBlock" placeholder="区级地区">
                <el-option
                  v-for="(item,$index) in block"
                  :key="$index"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input class="select_input" v-model="formLabelAlign.projectAddress"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="contactName">
              <el-input v-model="formLabelAlign.contactName"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="mobile">
              <el-input v-model="formLabelAlign.mobile"></el-input>
            </el-form-item>
            <el-form-item label="座机" prop="phone">
              <el-input v-model="formLabelAlign.phone"></el-input>
            </el-form-item>
            <el-form-item label="营业执照" prop="dialogImageUrl">
              <el-upload
                action="#"
                :http-request="uploadHttp"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                limit="3"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :modal-append-to-body="false" :append-to-body="true" :visible.sync="dialogVisibles">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer footerLogin">
            <el-button type="primary" @click="retrieve('ruleFormd')">确 定</el-button>
          </span>
        </el-dialog>
  </div>
</template>

<script>
import ChineseDistricts from "../../admin/projectinfo/js/distpicker.data";
export default {
  data() {
    // 手机号验证注册
    var validatePhone = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入手机号"));
      } else {
        if (value !== "") {
          var reg = /^1[13456789]\d{9}$/;
          if (!reg.test(value)) {
            callback(new Error("手机号输入错误"));
          } else {
            //手机号码输入正确时才可点击获取验证码按钮
            this.codeDisabled = false;
          }
        }
        callback();
      }
    };
    return {
      enterprise: [{}],
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      },
      centerDialogVisible: false,
      centerDialogVisibles: false,
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      ],
      // 注册相关状态
      timer: null,
      errorTxt: "",
      countdown: 6,
      codeMeg: "去验证",
      codeDisabled: false,
      successTitle: false,
      // 弹窗显示显示状态
      dialogVisibled: false,
      dialogVisibles: false,
      dialogImageUrl: "",
      dialogVisible: false,
      forgetDialogVisibled: false,
      disabled: false,
      ChineseDistricts: ChineseDistricts,
      pname: "", //省的名字
      cname: "", //市的名字
      bname: "", //区的名字
      tkn: "",
      checked: false,
      isdisbale: false,
      userId: null,
      addressName: "",
      // 账号密码
      form: {
        username: "",
        password: ""
      },
      forgetPassword: {
        mobile: "",
        verification: "",
        password: "",
        confirm: ""
      },
      ruleForm: {
        name: ""
      },
      isStatus:true,
      companyId:'',
      province: [],
      shi1: [],
      qu1: [],
      city: [], //城市
      block: [],
      inFifteenMinutes: new Date(new Date().getTime() + 12 * 60 * 60 * 1000),
      // 输入框v-model绑定值
      formLabelAlign: {
        enterpriseName: "",
        creditCode: "",
        mergerName: "",
        contactName: "",
        mobile: "",
        phone: "",
        provinceCode:'',
        cityCode:'',
        areaCode:''
      },
      rules: {
        mobile: [
          { required: true, validator: validatePhone, trigger: "change" }
        ],
        verification: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        creditCode: [
          { required: true, message: "请输入统一社会信用代码", trigger: "blur" }
        ],
        enterpriseName: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        contactName: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        dialogImageUrl: [
          { required: false, message: "请添加内容", trigger: "blur" }
        ],
        projectAddress:[
          {required:true,message:'请完善地址',trigger: "blur"}
        ]
      }
    };
  },
  methods: {
    // 展示当前用户的企业信息
    idCompanyInfo() {
      let that = this;
      let userid = window.sessionStorage.getItem("userId");
      that.$api.idCompanyInfo(userid).then(res => {
        that.enterprise[0] = res.data
        that.url = res.data.enterpriseLogo
        that.srcList = res.data.enterpriseLogo
        that.companyId = res.data.id
      });
    },
    // 变更信息回显
    updatecompany(){
      this.dialogVisible = true
      this.enterprise.forEach(item=>{
        this.formLabelAlign = item
      })
      console.log(this.dialogImageUrl)
    },
    // 加载china地点数据，三级
    getCityData() {
      let that = this;
      // console.log(that.ChineseDistricts, "15695");
      if (!that.ChineseDistricts) {
        return;
      }
      {
        that.ChineseDistricts.forEach((item, index) => {
          //省级数据
          that.province.push({
            id: item.code,
            value: item.name,
            children: item.cityList
          });
        });
      }
    },
    // 选省
    choseProvince(e) {
      let that = this;
      that.city = [];
      that.block = [];
      that.cname = "";
      that.bname = "";
      for (var index2 in that.province) {
        if (e === that.province[index2].id) {
          that.shi1 = that.province[index2].children;
          that.pname = that.province[index2].value;
          that.shi1.forEach(function(citem, cindex) {
            that.city.push({
              id: citem.code,
              value: citem.name,
              children: citem.areaList
            });
          });
        }
      }
      // console.log(that.pname);
    },
    // 选市
    choseCity(e) {
      let that = this;
      that.block = [];
      for (var index3 in that.city) {
        if (e === that.city[index3].id) {
          that.qu1 = that.city[index3].children;
          that.cname = that.city[index3].value;
          that.E = that.qu1[0].id;
          that.qu1.forEach(function(bitem, bindex) {
            that.block.push({
              id: bitem.code,
              value: bitem.name,
              children: []
            });
          });
        }
      }
      // console.log(that.cname);
    },
    // 选区
    choseBlock(e) {
      this.bname = e;
      // console.log(this.bname);
    },
    // 修改企业信息
    retrieve(formName) {

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addressName = `${this.pname}${this.cname}${this.bname}${this.formLabelAlign.projectAddress}`;
          let params = {
            id:this.companyId,
            enterpriseName: this.formLabelAlign.enterpriseName,
            creditCode:this.formLabelAlign.creditCode,
            provinceCode: this.formLabelAlign.provinceCode,
            contactName: this.formLabelAlign.contactName,
            mobile: this.formLabelAlign.mobile,
            phone: this.formLabelAlign.phone,
            enterpriseLogo: this.dialogImageUrl,
            mergerName: this.addressName,
            userId:window.sessionStorage.getItem('userId')
          };
          this.$api.updateCompany(params).then(res => {
            if(res.code == 200){
              this.dialogVisible = false;
              this.idCompanyInfo()
              this.$message({
                type:'success',
                message:'变更成功'
              })
            }
            
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 上传图片
    uploadHttp(file) {
      var params = new FormData();
      params.append("file", file.file);
      this.$api.upload(params).then(res => {
        console.log(res);
        this.dialogImageUrl = res.data.fileUrl;
              console.log(res.data)
      });

    },
    // 删除图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisibles = true;
    },
    // 下载图片
    handleDownload(file) {
      console.log(file);
    },
  },
  created() {
    this.idCompanyInfo();
    this.getCityData()
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
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
}
.home_main_left {
  width: 50%;
  height: 80vh;
  background: #fff;
}
.home_main_right {
  width: 50%;
  height: 80vh;
  background: #fff;
}
.home_footer {
  width: 100%;
  height: 5vh;
  border-top: 1px solid #ccc;
  padding-top: 20px;
  /* display: flex;
  justify-content: flex-end; */
}
.el-bitton_ {
  float: right;
  margin-right: 20px;
}
.left_information {
  width: 60%;
  height: 50px;
  line-height: 50px;
  /* border:1px solid #ccc; */
  margin-left: 4%;
  margin-top: 4%;
  p{
    width: 100%;
  height: 50px;
  line-height: 50px;
  /* border:1px solid #ccc; */
  margin-left: 4%;
  margin-top: 4%;
  display: flex;
  flex-direction: row;
  }
}

.left_information span:nth-child(1) {
  width: 36%;
  text-align: right;
}
.left_information span:nth-child(2) {
  width:auto;
  text-align: left;
  text-indent: 1em;
}
.ting {
  margin-top: 10%;
  width: 60%;
  height: 40%;
}
.see {
  width: 100%;
  height: 100%;
}
</style>