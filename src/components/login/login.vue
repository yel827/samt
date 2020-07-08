<template>
  <div>
    <div class="header_">
      <div class="title">{{$t('login.systemName')}}</div>
      <div class="langer">
        <!-- <el-select v-model="checkedside" class="select-el" placeholder="请选择活动区域">
          <el-option
            v-for="(item,index) in listselects"
            :key="index"
            :label="item.name"
            :value="item.value"
            @click="change"
          ></el-option>
        </el-select> -->
        <el-button @click="change" class="langButton">{{$t('publick.languageSwitch')}}</el-button>
      </div>
    </div>
    <div class="home">
      <div class="login">
        <div class="logo">
          <img src="../../assets/logos.jpg" alt />
        </div>
        <div class="input_np">
          <el-form ref="form" :inline="true" :model="form">
            <div class="nameM">{{$t('login.title')}}</div>
            <div class="username">
              <el-input
                :placeholder="$t('login.username')"
                prefix-icon="el-icon-user"
                v-model="form.username"
              ></el-input>
            </div>
            <div class="username">
              <el-input
                :placeholder="$t('login.password')"
                prefix-icon="el-icon-lock"
                v-model="form.password"
                show-password
              ></el-input>
            </div>
            <el-checkbox
              v-model="checked"
              style="color:#a0a0a0;margin:10px 0 20px 0"
            >{{$t('login.rememberMe')}}</el-checkbox>
            <el-button
              class="pass"
              @click="forgetDialogVisibled = true"
              type="text"
            >{{$t('login.forgetMe')}}</el-button>
            <div>
              <el-button
                class="bbtn"
                v-if="!isdisbale"
                type="primary"
                @click="submit_"
              >{{$t('login.title')}}</el-button>
              <el-button class="bbtn" v-else type="primary" :loading="true">{{$t('login.landing')}}</el-button>
            </div>
            <!-- <el-button class="pass" @click="dialogVisibled = true" type="text">企业注册</el-button> -->
            <el-button
              class="passT"
              @click="dialogVisibled = true"
              type="text"
            >{{$t('login.enterpriseRegistration')}}</el-button>
          </el-form>
          <!-- 忘记密码 -->
          <el-dialog center title="忘记密码" :visible.sync="forgetDialogVisibled" width="30%">
            <el-form
              :model="forgetPassword"
              :rules="rules"
              ref="forgetPassword"
              class="retrieveLogin"
              label-width="140px"
            >
              <el-form-item label="手机号" class="mobile" prop="mobile">
                <el-input v-model="forgetPassword.mobile" clearable></el-input>
                <el-button
                  @click="forverification"
                  ref="verification"
                  :disabled="forcodeDisabled"
                  type="primary"
                >{{forcodeMeg}}</el-button>
              </el-form-item>
              <el-form-item label="验证码" prop="verification">
                <el-input v-model="forgetPassword.verification" clearable></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="forgetPassword.password" clearable show-password></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirm">
                <el-input v-model="forgetPassword.confirm" clearable show-password></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer footerLogin">
              <el-button type="primary" @click="forget('forgetPassword')">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <!-- 企业信息 -->
        <el-dialog center title="企业信息" :visible.sync="dialogVisible" width="50%">
          <el-form
            :model="formLabelAlign"
            :rules="rules"
            ref="ruleFormd"
            class="retrieveLoginss"
            label-width="140px"
          >
            <el-form-item label="企业名称" prop="name">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="统一社会信用代码" prop="projectID">
              <el-input v-model="formLabelAlign.projectID"></el-input>
            </el-form-item>
            <el-form-item label="企业地址" class="input_imp" prop="typeAddress">
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
              <el-input class="select_input" v-model="formLabelAlign.typeAddress"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="projectPerson">
              <el-input v-model="formLabelAlign.projectPerson"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="mobileq">
              <el-input v-model="formLabelAlign.mobileq"></el-input>
            </el-form-item>
            <el-form-item label="座机" prop="setMobile">
              <el-input v-model="formLabelAlign.setMobile"></el-input>
            </el-form-item>
            <el-form-item label="营业执照" ref="dialogImageUrlst">
              <el-upload
                action="#"
                :http-request="uploadHttp"
                list-type="picture-card"
                :on-success="onsUCCESS"
                :on-preview="handlePictureCardPreview"
                :limit="limitImgNumber"
                :on-change="handleChange"
                :class="uploadDisabled == true ? hideAdd : ''"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog
                :append-to-body="true"
                modal-append-to-body="false"
                :visible.sync="dialogVisibles"
              >
                <img v-if="formLabelAlign.dialogImageUrl" width="100%" :src="formLabelAlign.dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer footerLogin">
            <el-button type="primary" @click="retrieve('ruleFormd')">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 企业注册 -->
        <el-dialog center title="企业注册" :visible.sync="dialogVisibled" width="30%">
          <el-form
            :model="formLabelAlign"
            :rules="regrules"
            ref="ruleForm"
            class="retrieveLogin"
            label-width="140px"
          >
            <el-form-item label="手机号" class="mobile" prop="mobile">
              <el-input v-model="formLabelAlign.mobile" clearable></el-input>
              <el-button
                @click="verification"
                ref="verification"
                :disabled="codeDisabled"
                type="primary"
              >{{codeMeg}}</el-button>
            </el-form-item>
            <el-form-item label="验证码" prop="region">
              <el-input v-model="formLabelAlign.region" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="typepwd">
              <el-input v-model="formLabelAlign.typepwd" clearable show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="typePassword">
              <el-input v-model="formLabelAlign.typePassword" clearable show-password></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer footerLogin">
            <el-button type="primary" @click="register('ruleForm')">下 一 步</el-button>
          </span>
        </el-dialog>
        <!-- 注册成功后提示页面 -->
        <el-dialog center title class="messageSuccess" :visible.sync="successTitle" width="30%">
          <i center class="el-icon-success" style="font-size:88px; color:#52c41a;"></i>
          <p center>恭喜您，注册资料提交成功！</p>
          <p center>我们会尽快与您联系，请保持电话畅通！</p>
          <span slot="footer" class="dialog-footer footerLogin">
            <el-button type="primary" @click="successTitle = false">关 闭</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <div class="footer_">
      <p>版权所有©上海睿网电子有限公司沪ICP备19030034号-1</p>
      <p>技术支持：021-XXXXXX</p>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import cookies from '../../utils/cookie'
import { login } from "../../api/api";
import ChineseDistricts from "../admin/projectinfo/js/distpicker.data";
let Base64 = require("js-base64").Base64;
import CryptoJS from "crypto-js";
export default {
  data() {
    // 确认密码验证
    var validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.forgetPassword.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 确认密码验证
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formLabelAlign.typepwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
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
    // 手机号验证注册
    var forvalidatePhone = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入手机号"));
      } else {
        if (value !== "") {
          var reg = /^1[13456789]\d{9}$/;
          if (!reg.test(value)) {
            callback(new Error("手机号输入错误"));
          } else {
            //手机号码输入正确时才可点击获取验证码按钮
            this.forcodeDisabled = false;
          }
        }
        callback();
      }
    };
    return {
      Uname: "",
      Passed: "",
      checkedside: "",
      fileList: [],
      listselects: [
        { name: "中文", value: 1 },
        { name: "English", value: 2 }
      ],
      // 注册相关状态
      timer: null,
      fortimer:null,
      errorTxt: "",
      countdown: 6,
      forcountdown:6,
      codeMeg: "去验证",
      forcodeMeg: "去验证",
      codeDisabled: true,
      forcodeDisabled: true,
      successTitle: false,
      regrules: {
        mobile: [
          { required: true, validator: validatePhone, trigger: "change" }
        ],
        region: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        typepwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^[A-Za-z0-9]{6,15}$/,
            message: "密码为数字,字母, 6 - 15位，"
          }
        ],
        typePassword: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      },
      // 控制是否显示图片上传+号
      uploadDisabled: false,
      // 允许上传图片的数量
      limitImgNumber: 3,
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
      dialogVisible: false,
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
      province: [],
      shi1: [],
      qu1: [],
      city: [], //城市
      block: [],
      inFifteenMinutes: new Date(new Date().getTime() + 12 * 60 * 60 * 1000),
      // 输入框v-model绑定值
      formLabelAlign: {
        name: "",
        region: "",
        typepwd: "",
        typeAddress: "",
        typePassword: "",
        phone: "",
        mobile: "",
        mobileq: "",
        setMobile: "",
        projectName: "",
        projectID: "",
        projectAddress: "",
        projectPerson: "",
        projectState: "",
        projectScale: "",
        projectMoney: "",
        dialogImageUrl:''
      },
      rules: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^[A-Za-z0-9]{6,15}$/,
            message: "密码为数字,字母, 6 - 15位，"
          }
        ],
        mobile: [
          { required: true, validator: forvalidatePhone, trigger: "change" }
        ],
        mobileq: [
          { required: true, validator: validatePhone, trigger: "change" }
        ],
        verification: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        confirm: [
          { required: true, validator: validatePass3, trigger: "blur" }
        ],
        projectID: [
          { required: true, message: "请输入统一社会信用代码", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        projectPerson: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        dialogImageUrlst: [
          { required: true, message: "请上传应用图标", trigger: "blur" }
        ],
        typeAddress:[
          { required: true, message: "请完善地址", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    "forgetPassword.mobile": function(curVal, oldVal) {
      if (!curVal) {
        this.forgetPassword.mobile = "";
        return false;
      }
      // 实时把非数字的输入过滤掉
      this.forgetPassword.mobile = curVal.match(/\d/gi)
        ? curVal.match(/\d/gi).join("")
        : "";
    }
  },
  methods: {
    // 语言切换
    change() {
      var lang = this.$i18n.locale;
      if (lang === "en") {
        this.$i18n.locale = "zh";
      } else {
        this.$i18n.locale = "en";
      }
    },
    // 注册验证倒计时
    verification() {
      let that = this;
      // that.$refs['verification']
      if (that.formLabelAlign.mobile !== "" && that.formLabelAlign.mobile.length == 11) {
        that.codeDisabled = true;
        let params = {
          mobile: that.formLabelAlign.mobile
        };
        that.$api.verification(params).then(res => {
          if (res.code == 200) {
            that.$message({
              type: "success",
              message: res.msg
            });
            that.timer = setInterval(() => {
              if (that.countdown > 0 && that.countdown <= 6) {
                that.countdown = that.countdown - 1;
                console.log(that.countdown);
                if (that.countdown > 0) {
                  that.codeDisabled = true;
                  // console.log("894561238945612389568564123");
                  that.codeMeg = "" + that.countdown + "S";
                } else {
                  clearInterval(that.timer);
                  that.codeMeg = "重新验证";
                  that.countdown = 6;
                  that.timer = null;
                  that.codeDisabled = false;
                }
              }
            }, 1000);
          } else {
            that.$message({
              type: "error",
              message: res.msg
            });
            that.codeDisabled = false;
          }
        });
      } else {
        that.codeDisabled = true;
        that.$message({
          type: "error",
          message: "请完善手机号"
        });
      }
      let params = {
        mobile: that.formLabelAlign.mobile
      };
      that.$api.verification(params).then(res => {
        console.log(res, "验证码");
      });
    },
    // 忘记密码验证倒计时
    forverification() {
      let that = this;
      // that.$refs['verification']
      if (that.forgetPassword.mobile !== "" && that.forgetPassword.mobile.length == 11) {
        that.forcodeDisabled = true;
        let params = {
          mobile: that.forgetPassword.mobile
        };
        that.$api.verification(params).then(res => {
          if (res.code == 200) {
            that.$message({
              type: "success",
              message: res.msg
            });
            that.fortimer = setInterval(() => {
              if (that.forcountdown > 0 && that.forcountdown <= 6) {
                that.forcountdown = that.forcountdown - 1;
                console.log(that.forcountdown);
                if (that.forcountdown > 0) {
                  that.forcodeDisabled = true;
                  // console.log("894561238945612389568564123");
                  that.forcodeMeg = "" + that.forcountdown + "S";
                } else {
                  clearInterval(that.fortimer);
                  that.forcodeMeg = "重新验证";
                  that.forcountdown = 6;
                  that.fortimer = null;
                  that.forcodeDisabled = false;
                }
              }
            }, 1000);
          } else {
            that.$message({
              type: "error",
              message: res.msg
            });
            that.forcodeDisabled = false;
          }
        });
      } else {
        that.forcodeDisabled = true;
        that.$message({
          type: "error",
          message: "请完善手机号"
        });
      }
      let params = {
        mobile: that.formLabelAlign.mobile
      };
      that.$api.verification(params).then(res => {
        console.log(res, "验证码");
      });
    },
    // 忘记密码
    forget(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            captcha: this.forgetPassword.verification,
            pwd: this.forgetPassword.password,
            userName: this.forgetPassword.mobile
          };
          this.$api.forgetPassword(params).then(res => {
            if (res.code == 200) {
              this.$message({
                message: res.msg,
                type: "success"
              });
              this.forgetDialogVisibled = false;
              this.forgetPassword.password = "";
              this.forgetPassword.verification = "";
            } else {
              this.$message({
                message: res.msg,
                type: "error"
              });
              this.forgetDialogVisibled = true;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 注册账号
    register(formName) {
      // this.dialogVisible = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            pwd: this.formLabelAlign.typepwd,
            mobile: this.formLabelAlign.mobile,
            captcha: this.formLabelAlign.region
          };
          // if (params.password === this.formLabelAlign.typePassword) {
          this.$api.register(params).then(res => {
            if (res.code == 200) {
              this.dialogVisibled = false;
              this.dialogVisible = true;
            } else {
              this.$message({
                message: res.msg,
                type: "error"
              });
              this.dialogVisibled = true;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 文件上传变化
    handleFileChange(file, fileList) {
      //是否展示图片+号
      this.uploadDisabled = fileList.length >= this.limitImgNumber;
    },
    // 上传图片校验
    onsUCCESS(res, file) {
      if (file) {
        this.$refs.dialogImageUrlst.clearValidate();
      }
    },
    // 登录用户
    submit_() {
      let that = this;
      let accountInfo = "";
      this.isdisbale = true;
      console.log(this.inFifteenMinutes, "dsdsdsd");
      let params = {
        userName: this.form.username,
        password: this.form.password
      };
      let userId = {
        userId: this.userId
      };
      let newaccount = Base64.encode(params.userName);
      let newPassord = Base64.encode(params.password);
      let cookieName = Cookies.get("USERNAME");
      let cookiePwd = Cookies.get("PASSWORD");
      console.log(cookieName, "cookieName");
      if (this.checked == true) {
        if (params.userName != "" || params.password != "") {
          this.$api.login(params).then(res => {
            this.isdisbale = false;
            if (res.code == 200) {
              // // Encrypt 加密
              // var cipherText = CryptoJS.AES.encrypt(
              //   this.form.username,
              //   this.form.username
              // ).toString();
              // var cipherPwd = CryptoJS.AES.encrypt(
              //   this.form.password,
              //   this.form.password
              // ).toString();
              // console.log(cipherText, cipherPwd, "111111");
              // // Decrypt 解密
              // var bytes = CryptoJS.AES.decrypt(cipherText, this.form.username);
              // var originalText = bytes.toString(CryptoJS.enc.Utf8);
              // var byted = CryptoJS.AES.decrypt(cipherPwd, this.form.password);
              // var originalPwd = byted.toString(CryptoJS.enc.Utf8);
              // console.log(originalText, originalPwd, "12121212"); // 'my message'
              // this.Uname = originalText;
              // this.Passed = originalPwd;
              // this.userId = res.userId;
              Cookies.set("token", res.data.token, {
                expires: this.inFifteenMinutes
              });
              Cookies.set('userName',this.form.username)
              Cookies.set('password',this.form.password)
              // this.setCookie(cipherText,cipherPwd, 30);
              let storage = window.sessionStorage;
              storage.setItem("name", this.form.username);
              window.localStorage.setItem("checked", this.checked);
              this.$store.commit("userId", res.data.user.userId);
              this.$message.success("登录成功");
              this.$router.push("/projectList");
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          this.$message.error("账号或密码不可为空");
          this.isdisbale = false;
        }
      } else {
        console.log(this.checked, "falsefalse");
        if (params.userName != "" || params.password != "") {
          this.$api.login(params).then(res => {
            this.isdisbale = false;
            if (res.code == 200) {
              this.userId = res.userId;
              Cookies.set("token", res.data.token, {
                expires: this.inFifteenMinutes
              });
              // this.clearCookie();
              let storage = window.sessionStorage;
              storage.setItem("name", this.form.username);
              this.$store.commit("userId", res.data.user.userId);
              window.localStorage.setItem("checked", this.checked);
              this.$message.success("登录成功");
              this.$router.push("/projectList");
              // this.cookie.clearCookie("accountInfo");
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          this.$message.error("账号或密码不可为空");
          this.isdisbale = false;
        }
      }
      setInterval(function() {
        this.isdisbale = false;
      }, 3000);
    },
    // 添加企业信息
    retrieve(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addressName = `${this.pname}${this.cname}${this.bname}${this.formLabelAlign.typeAddress}`;
          let params = {
            enterpriseName: this.formLabelAlign.name,
            provinceCode: this.formLabelAlign.projectID,
            contactName: this.formLabelAlign.projectPerson,
            mobile: this.formLabelAlign.mobile,
            phone: this.formLabelAlign.setMobile,
            enterpriseLogo: this.formLabelAlign.dialogImageUrl,
            mergerName: this.addressName
          };
          this.$api.addCompanyInfo(params).then(res => {
            console.log(res);
            this.dialogVisible = false;
            this.successTitle = true;
            this.formLabelAlign.typeAddress = "";
            this.addressName = "";
            this.formLabelAlign.mobile = "";
            this.formLabelAlign.dialogImageUrl = "";
            this.formLabelAlign.setMobile = "";
            this.formLabelAlign.name = "";
            this.formLabelAlign.projectID = "";
            this.formLabelAlign.projectPerson = "";
            // this.$refs.formName.resetFields();
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
        this.formLabelAlign.dialogImageUrl = res.data;
      });
    },
    // 删除图片
    handleRemove(file, fileList) {
      let that = this;
      if (fileList.length === 0) {
        that.fileList = [];
      } else {
        let dl = that.fileList.indexOf(file);
        that.fileList.splice(dl, 1);
      }
      that.uploadDisabled = fileList.length >= that.limitImgNumber;
    },
    // 查看图片
    handlePictureCardPreview(file) {
      this.formLabelAlign.dialogImageUrl = file.url;
      this.dialogVisibles = true;
    },
    // on-change添加文件、上传成功上传失败时都会被调用
    handleChange(file, fileList) {
      let that = this;
      that.uploadDisabled = fileList.length >= that.limitImgNumber;
      console.log(that.uploadDisabled, "that.uploadDisabled");
      if (fileList) {
        that.$refs.dialogImageUrlst.clearValidate();
      }
    },
    // 下载图片
    handleDownload(file) {
      console.log(file);
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
  },
  created() {
    // this.submit_();
    this.getCityData();
    this.onsUCCESS();
    if (window.localStorage.getItem("checked") == "true") {
      this.checked = true;
      this.form.username = Cookies.get('userName')
      this.form.password = Cookies.get('password')
    }
  }
};
</script>
<style lang="less" scoped>
html,
body {
  margin: 0px !important;
  padding: 0px !important;
  width: 900vw;
  height: 900vh;
  overflow: hidden;
}
.home {
  width: 100%;
  height: 84vh;
  background-image: url("../../assets/bg.jpg");
  background-size: 100% 100%;
  overflow: hidden;
}
.header_ {
  width: 100%;
  height: 8vh;
  background: #2457bc;
  line-height: 8vh;
  display: flex;
  justify-content: space-between;
  .langer {
    width: auto;
    height: 100%;
    padding-right: 20px;
    box-sizing: border-box;
    /deep/.el-select {
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.title {
  text-indent: 20px;
  font-size: 26px;
  color: #fff;
}
.messageSuccess {
  /deep/.el-dialog__body {
    text-align: center;
    line-height: 50px;
    font-size: 16px;
  }
}
.bbtn {
  background: #2457bc !important;
}
.login {
  width: 40%;
  height: 44%;
  position: absolute;
  border: none;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  flex-direction: row;
  .logo {
    width: 30%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .input_np {
    flex: 1;
    padding: 90px 140px 60px 140px;
    background: #fff;
    box-sizing: border-box;
    display: flex;
    /deep/.el-form {
      flex: 1;
    }

    .pass {
      margin-top: 0;
      width: 100px;
      text-align: end;
      color: red;
      height: 20px;
      font-size: 14px;
      float: right;
      clear: both;
    }
    .passT {
      margin-top: 0;
      text-align: end;
      height: 20px;
      color: #5e7cec;
      font-size: 14px;
      float: right;
      clear: both;
    }
    .nameM {
      width: 100%;
      height: 20px;
      font-size: 20px;
      text-align: center;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(102, 102, 102, 1);
    }
    .username {
      width: 100%;
      height: 40px;
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      /deep/.el-input {
        flex: 1;
        border: none !important;
        outline: none !important;
      }
      .logo1 {
        width: 50px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        /deep/.el-icon-user {
          font-size: 24px;
        }
        /deep/.el-icon-lock {
          font-size: 24px;
        }
      }
    }
  }
}
/deep/.el-form-item__content {
  width: 80%;
}
/deep/.el-button {
  width: 100%;
  // margin-top: 20px;
}
.footer_ {
  width: 100%;
  height: 8vh;
  padding-top: 20px;
  box-sizing: border-box;
  text-align: center;
  position: fixed;
  bottom: 0;
}
.retrieveLogin {
  /deep/.el-form-item {
    width: 100%;
    box-sizing: border-box;
    /deep/.el-form-item__content {
      width: 60%;
    }
    /deep/.el-select {
      width: 32.3%;
    }
  }
}
.retrieveLoginss {
  height: 500px;
  overflow-y: auto;
  /deep/.el-form-item {
    width: 100%;
    box-sizing: border-box;
    /deep/.el-form-item__content {
      width: 60%;
    }
    /deep/.el-select {
      width: 32.3%;
    }
  }
}
.footerLogin {
  /deep/.el-button {
    width: 80% !important;
    margin-top: 0;
    margin-bottom: 30px;
  }
}
.hideAdd {
  .el-upload--picture-card {
    display: none !important;
  }
}
.mobile {
  display: flex;
  flex-direction: row;
  /deep/.el-form-item__content {
    width: 60%;
    margin-left: 0 !important;
    display: flex;
    /deep/.el-input {
      width: 70%;
      margin-right: 10px;
    }
    /deep/.el-button {
      width: 28%;
      margin-top: 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
}
.select-el {
  width: 100px;
  border: none;
  background: none;
  /deep/.el-input__inner {
    background: none;
    color: #fff;
    border: none;
    text-align: right;
  }
}
.langButton{
  width:100px;
  color:#fff;
  border:none;
  background: none;
}
</style>