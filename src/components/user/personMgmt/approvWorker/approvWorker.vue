<template>
  <div id="ed">
    <div class="home_header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>人员管理</el-breadcrumb-item>
        <el-breadcrumb-item>进场审批</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="home_main">
      <div class="serach_">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="formInline.user" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="formInline.user" placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查找</el-button>
            <el-button type="success" @click="lookList = true">审批记录</el-button>
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
          <el-table-column align="center" show-overflow-tooltip fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="dialogVisible = true" type="text" size="small">查看</el-button>
              <el-button type="text" @click="openClickout" size="small">审批通过</el-button>
              <el-button type="text" @click="openClickin" size="small">驳回申请</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 查看 -->
        <el-dialog title="查看" :visible.sync="dialogVisible" width="42%" class="dialogAdd">
          <div class="dialogTitle">基础信息</div>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-row>
              <el-col class="firstCol">
                <div class="firstColLeft">
                  <el-form-item label="姓名" class>
                    <el-input v-model="formInline.user" width="120" placeholder="审批人"></el-input>
                  </el-form-item>
                  <el-form-item label="民族" class>
                    <el-select v-model="formInline.region" placeholder="活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="性别" class>
                    <el-select v-model="formInline.region" placeholder="活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="籍贯" class>
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                  </el-form-item>
                </div>
                <div class="firstColRight">
                  <el-upload
                    class="avatar-uploader"
                    action="#"
                    :show-file-list="false"
                    border
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </el-col>
              <el-col class="secondCol">
                <div class="secondColLeft">
                  <el-form-item label="出生日期">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="手机号码">
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                  </el-form-item>
                  <el-form-item label="紧急联系人">
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                  </el-form-item>
                </div>
                <div class="secondColRight">
                  <el-form-item label="婚姻状况">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="身份证号" class>
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                  </el-form-item>

                  <el-form-item label="联系方式" class>
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col class="thirdCol">
                <el-form-item label="联系方式" class>
                  <div class="thirdColBor">
                    <el-image src="../../assets/timg.jpg" />
                    <el-image src="../../assets/timg.jpg" />
                  </div>
                </el-form-item>
              </el-col>
              <div class="dialogTitle">施工信息</div>
              <el-col class="secondCol">
                <div class="secondColLeft">
                  <el-form-item label="进场日期">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="班组">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="工种证件号">
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                  </el-form-item>
                  <el-form-item label="领证时间">
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                  </el-form-item>
                </div>
                <div class="secondColRight">
                  <el-form-item label="工种" style="margin-top:60px;">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="发证机关" class>
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                  </el-form-item>

                  <el-form-item label="证件有效期" class>
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col class="thirdColbotton">
                <el-form-item label="联系方式" class>
                  <div class="thirdColBor">
                    <el-image src="../../assets/timg.jpg" />
                    <el-image src="../../assets/timg.jpg" />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="dialogVisible = false" class="btn">关闭</el-button>
            <el-button @click="openClickin">驳回申请</el-button>
            <el-button type="primary" @click="openClickout">审批通过</el-button>
          </span>
        </el-dialog>
        <!-- 审批记录 -->
        <el-dialog title="提示" :visible.sync="lookList" width="50%" :before-close="handleClose">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="姓名">
              <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="审批结果">
              <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查找</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage3"
              :page-size="100"
              layout="prev, pager, next, jumper"
              :total="1000"
            ></el-pagination>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="lookList = false">取 消</el-button>
            <el-button type="primary" @click="lookList = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 审批记录
      lookList: false,
      // 查看
      dialogVisible: false,
      value1: "",
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
    // 申请通过
    openClickout() {
      const h = this.$createElement;
      this.$msgbox({
        title: "审批通过",
        message: h("p", null, [
          h(
            "span",
            null,
            "审批通过后的员工即进入在职员工列表，允许进入施工工地，是否确认通过？ "
          )
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: "info",
          message: "action: " + action
        });
      });
    },
    // 驳回申请
    openClickin() {
      this.$prompt(
        "驳回申请代表本次进场申请不符合要求，无法进入施工工地，是否确认驳回？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPlaceholder: "请输入驳回原因"
        }
      )
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的驳回原因是: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
.home_header {
  width: 100%;
  height: 20px;
  line-height: 10px;
  border-bottom: 1px solid #ccc;
}
.home_main {
  padding-top: 10px;
  box-sizing: border-box;
  .serach_ {
    width: 100%;
    height: 2%;
    padding-top: 10px;
    box-sizing: border-box;
    /deep/.el-form {
      width: 80%;
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
.dialogAdd {
  /deep/.el-dialog__body {
    width: 100%;
    height: 500px;
    box-sizing: border-box;
    overflow: auto;
    /deep/.el-form {
      width: 100%;
      height: 100%;
      /deep/.el-row {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .firstCol {
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: row;
          .firstColLeft {
            width: 48%;
            height: auto;
            display: flex;
            flex-direction: column;
            /deep/.el-form-item {
              width: auto;
              display: flex;
              justify-content: flex-end;
              padding-top: 20px;
              margin-bottom: 0px;
              box-sizing: border-box;
              /deep/.el-form-item__content {
                width: 267px;
                /deep/.el-input {
                  width: 217px;
                }
              }
            }
          }
          .firstColRight {
            width: 50%;
            height: 244px;
            display: flex;
            justify-content: center;
            padding-top: 20px;
            box-sizing: border-box;
          }
        }
        .secondCol {
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: row;
          .secondColLeft {
            width: 48%;
            height: 100%;
            /deep/.el-form-item {
              width: 100%;
              display: flex;
              justify-content: flex-end;
              padding-top: 20px;
              margin-bottom: 0px;
              box-sizing: border-box;
              /deep/.el-form-item__content {
                width: 267px;
                /deep/.el-input {
                  width: 217px;
                }
              }
            }
          }
          .secondColRight {
            width: 48%;
            height: auto;
            /deep/.el-form-item {
              width: 100%;
              display: flex;
              justify-content: flex-end;
              padding-top: 20px;
              margin-bottom: 0px;
              box-sizing: border-box;
              /deep/.el-form-item__content {
                width: 267px;
                /deep/.el-input {
                  width: 217px;
                }
              }
            }
          }
        }
        .thirdCol {
          width: 100%;
          height: auto;
          margin-top: 20px;
          /deep/.el-form-item {
            width: 89%;
            display: flex;
            justify-content: flex-end;
            /deep/.el-form-item__content {
              width: 86.5%;
              border: 1px solid #ccc;
              .thirdColBor {
                display: flex;
                align-items: center;
                padding: 10px;
                box-sizing: border-box;
                /deep/.el-image {
                  width: 60px;
                  height: 60px;
                  margin-left: 10px;
                }
              }
            }
          }
        }
      }
    }
  }
}
// 上传图片
/deep/.avatar-uploader {
  width: 178px;
  height: 200px;
  border: 1px solid #ccc;
  display: inline-block;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
.dialogTitle {
  width: 100%;
  height: 34px;
  background: #ccc;
  line-height: 34px;
  text-indent: 10px;
  margin-bottom: 10px;
}
</style>
