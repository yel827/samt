<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="项目概况" name="first">
      <el-form :label-position="labelPosition" label-width="60px" :model="formLabelAlign">
        <el-form-item label="项目名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="项目ID">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="项目地址" class="input_imp">
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
          <el-input class="select_input" v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="项目负责人" class="input_imps">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="项目状态" class="input_imps2">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="建设规模" class="input_imps2">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="投资总额（万元）" class="input_imps">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="项目二维码" class="input_imps">
          <el-button type="info">查看</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="工程信息" name="second">
      <el-form :label-position="labelPosition" label-width="60px" :model="formLabelAlign">
        <div class="XinXi">工程属性</div>
        <el-form-item label="工程用途" class="HuoDong">
          <el-select v-model="form.region" placeholder="居住建筑">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="建筑结构类型">
          <el-input v-model="formLabelAlign.name" placeholder="框架/钢结构"></el-input>
        </el-form-item>
        <el-form-item label="单体数量(个)" class="list_my">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="建筑面积(m2)" class="list_my mys">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="地上面积(m2)" class="list_my">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="地下面积(m2)" class="list_my mys">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="建筑高度(m)" class="list_my">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="地上层数" class="list_my mys">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="地下深度(m)" class="list_my">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="基坑深度(m)" class="list_my mys">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <div class="XinXi">关联单位</div>
        <el-form-item label="建设单位" class="list_my">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="设计单位" class="list_my mys">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="监理单位" class="list_my">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="施工单位" label-width="100px" class="list_my mys">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="安全监督单位" class="list_my">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="质量监督单位" class="list_my mys">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <div class="XinXi">施工信息</div>
        <el-form-item label="投资类型" class="HuoDong">
          <el-select v-model="form.region" placeholder="请选择投资类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="中标编号" class="list_my">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="合同造价" class="list_my mys">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="施工许可证">
          <div class="certificates">
            <div
              style="width:100%; height:30px; line-height:30px; border-bottom:1px solid #E4E7ED; text-indent:16px;"
            >施工许可证编号</div>
            <div id="softimg" style="width:100%; height:70px;">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
        </el-form-item>
        <!--  -->
        <el-form-item label="开工时间" class="list_my">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="完工时间" class="list_my mys">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="项目经理" class="list_my">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" class="list_my mys">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="发薪银行">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="开户银行">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="发薪账号" class="list_my">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="发薪日期" class="list_my mys">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="质量目标" class="list_my">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="安全目标" class="list_my mys">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="合同备案号">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="项目介绍" name="third">
      <el-form :label-position="labelPosition" label-width="60px" :model="formLabelAlign">
        <el-form-item label="360°全景地址(url)">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <myEditor />
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import ChineseDistricts from "../js/distpicker.data";
import myEditorComponent from "./quil/quil";

export default {
  data() {
    return {
      imageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
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
      activeName: "first",
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      },
      ChineseDistricts: ChineseDistricts,
      province: [],
      shi1: [],
      qu1: [],
      city: [],
      block: [],
      pname: "", //省的名字
      cname: "", //市的名字
      bname: "" //区的名字
    };
  },
  components: {
    myEditor: myEditorComponent
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 加载china地点数据，三级
    getCityData() {
      let that = this;
      console.log(that.ChineseDistricts, "15695");
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
      console.log(that.pname);
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
      console.log(that.cname);
    },
    // 选区
    choseBlock(e) {
      this.bname = e;
      console.log(this.bname);
    }
  },
  created() {
    this.getCityData();
  }
};
</script>
<style lang="less" scoped>
// /deep/.el-dialog{
//   width:62% !important;
// }
.el-tabs {
  padding-top: 10px !important;
}
/deep/.el-form-item {
  width: 100%;
  /deep/.el-form-item__label {
    width: 140px !important;
  }
  /deep/.el-form-item__content {
    margin-left: 10px !important;
    width: 70%;
  }
}

.input_imp {
  /deep/.el-input {
    width: 100px;
  }
  .select_input {
    width: 59%;
  }
}
.input_imps {
  width: 40%;
  /deep/.el-form-item__content {
    margin-left: 10px !important;
    width: 60%;
    /deep/.el-input {
      width: 100%;
    }
  }
}
.input_imps2 {
  width: 40%;
  /deep/.el-form-item__content {
    margin-left: 10px !important;
    width: 56%;
    /deep/.el-input {
      width: 100%;
    }
  }
}
.XinXi {
  width: 100%;
  height: 30px;
  background: #ebeef5;
  line-height: 30px;
  text-indent: 20px;
  margin-bottom: 20px;
}
.HuoDong {
  /deep/.el-select {
    width: 100%;
    /deep/.el-input__inner {
      width: 100%;
    }
  }
}
.list_my {
  width: 45%;
  /deep/.el-form-item__content {
    width: 60%;
  }
}
.mys {
  /deep/.el-form-item__label {
    width: 100px !important;
  }
}
/deep/.el-form {
  height: 480px !important;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  padding-right: 10px;
}
.certificates {
  width: 100%;
  height: 100px;
  border: 1px solid #e4e7ed;
}
/deep/.el-upload {
  width: 50px !important;
  height: 50px !important;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  margin-top: 10px;
}
/deep/.el-upload-list__item-thumbnail {
  width: 50px !important;
  height: 50px !important;
}
.divone {
  height: 70px;
  /deep/.el-upload-list {
    height: 70px;
    float: left;
    margin-left: 10px;
    /deep/.el-upload-list__item {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    display:flex;
    justify-content: center;
    align-items: center;
  }
  .avatar {
    width: 50px;
    height: 50px;
    display: block;
  }
</style>