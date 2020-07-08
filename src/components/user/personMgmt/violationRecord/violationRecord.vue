<template>
  <div id="ed">
    <div class="home_header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>人员管理</el-breadcrumb-item>
        <el-breadcrumb-item>违章记录</el-breadcrumb-item>
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
            <el-select v-model="formInline.region" placeholder="班组">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="formInline.region" placeholder="工种">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查找</el-button>
            <el-button type="success" @click="dialogVisibled = true">新增违章</el-button>
            <el-button type="success" @click="dialogVisible = true">违章设置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="home_main_section">
        <el-table :data="violationList" border style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#001642'}">
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="cumulant"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="name" label="姓名"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="province" label="性别"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="city" label="手机号"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="address" label="班组"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="zip" label="工种"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="createTime" label="违章日期"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="behavior" label="违章行为"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="zip" label="累计违章"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="violationDetails(scope.row)" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 违章设置 -->
        <el-dialog
          title="违章设置"
          :visible.sync="dialogVisible"
          width="21%"
          :before-close="handleClose"
        >
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="累计违章上限">
              <el-input v-model="viola"></el-input>
            </el-form-item>
          </el-form>
          <span style="color:#409EFF;">*施工人员违章次数达到累计违章上限，做自动退场处理。</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="upperlimitNum">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 新增违章 -->
        <el-dialog title="新增违章" :visible.sync="dialogVisibled" width="42%" class="dialogAdd">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-row>
              <el-col class="secondCol">
                <div class="secondColLeft">
                  <el-form-item label="姓名">
                    <el-select v-model="formInline.user" placeholder="请选择活动区域">
                      <el-option v-for="(item,index) in nameId" :key="index">{{item}}</el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="班组">
                    <el-input v-model="formInline.region" placeholder="审批人"></el-input>
                  </el-form-item>
                </div>
                <div class="secondColRight">
                  <el-form-item label="手机号码" class>
                    <el-input v-model="formInline.mobile" placeholder="审批人"></el-input>
                  </el-form-item>

                  <el-form-item label="工种" class>
                    <el-input v-model="formInline.person" placeholder="审批人"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col class="thirdCol">
                <el-form-item label="违章日期" class>
                  <div class="block">
                    <el-date-picker
                      v-model="formInline.date"
                      type="datetimerange"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :default-time="['12:00:00']"
                    ></el-date-picker>
                  </div>
                </el-form-item>
                <el-form-item label="违章行为">
                  <el-select v-model="formInline.behavior" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="附件" class>
                  <div class="thirdColBor">
                    <el-image src="../../assets/timg.jpg" />
                    <el-image src="../../assets/timg.jpg" />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="dialogVisibled = false" class="btn">关闭</el-button>
            <el-button type="primary" @click="addViolation">保存</el-button>
          </span>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog title="详情" :visible.sync="dialogVisibledlist" width="42%" class="dialogAdd">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-row>
              <el-col class="secondCol">
                <div class="secondColLeft">
                  <el-form-item label="手机号码">
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                  </el-form-item>
                  <el-form-item label="紧急联系人">
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                  </el-form-item>
                </div>
                <div class="secondColRight">
                  <el-form-item label="身份证号" class>
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                  </el-form-item>

                  <el-form-item label="联系方式" class>
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col class="thirdCol">
                <el-form-item label="违章日期" class>
                  <el-input v-model="value1" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="违章行为">
                  <el-input v-model="formInline.region" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" class>
                  <div class="thirdColBor">
                    <el-image src="../../assets/timg.jpg" />
                    <el-image src="../../assets/timg.jpg" />
                  </div>
                </el-form-item>
                <el-collapse accordion>
                  <el-collapse-item title="历史违章信息">
                    <el-form-item label="违章日期" class>
                      <div class="block">
                        <el-date-picker
                          v-model="value1"
                          type="datetimerange"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :default-time="['12:00:00']"
                        ></el-date-picker>
                      </div>
                    </el-form-item>
                    <el-form-item label="违章行为">
                      <el-select v-model="formInline.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="联系方式" class>
                      <div class="thirdColBor">
                        <el-image src="../../assets/timg.jpg" />
                        <el-image src="../../assets/timg.jpg" />
                      </div>
                    </el-form-item>
                  </el-collapse-item>
                  <el-collapse-item title="失效违章信息">
                    <el-form-item label="违章日期" class>
                      <div class="block">
                        <el-date-picker
                          v-model="value1"
                          type="datetimerange"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :default-time="['12:00:00']"
                        ></el-date-picker>
                      </div>
                    </el-form-item>
                    <el-form-item label="违章行为">
                      <el-select v-model="formInline.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="联系方式" class>
                      <div class="thirdColBor">
                        <el-image src="../../assets/timg.jpg" />
                        <el-image src="../../assets/timg.jpg" />
                      </div>
                    </el-form-item>
                  </el-collapse-item>
                </el-collapse>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="dialogVisibledlist = false" class="btn">关闭</el-button>
          </span>
        </el-dialog>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {
      // 总数
      total: "",
      pageSize: 4,
      pageNum: 1,
      // 违章上限
      viola: "",
      // 状态
      dialogVisibledlist: false,
      dialogVisibled: false,
      dialogVisible: false,
      value1: "",
      violationList: "",
      // nameid
      nameId: [],
      // 添加
      formInline: {
        user: "",
        region: "",
        mobile: "",
        person: "",
        phone: "",
        date: "",
        behavior: "",
        enclosure: ""
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
    // 切换分页
    handleCurrentChange(currentPage3) {
      this.pageNum = currentPage3;
    },
    // 新增违章
    addViolation() {
      this.dialogVisibled = false;
      let params = {};
      this.$api.addViolation(params).then(res => {
        this.getViolationList();
      });
    },
    // 违章列表
    getViolationList() {
      this.$api.violation().then(res => {
        this.violationList = res.rows;
        this.total = res.total;
        res.rows.forEach(element => {
          this.nameId.push(element.id);
        });
        // this.nameId.push(res.rows.id);
        console.log(res.rows)
      });
    },
    // 设置违章上限
    upperlimitNum() {
      let params = {
        limit: this.viola
      };
      this.$api.editViolation(params).then(res => {
        console.log(res);
        this.dialogVisible = false;
      });
    },
    // 查询违章详情
    violationDetails(row) {
      this.dialogVisibledlist = true;
      let id = row.id;
      this.$api.violationDetails(id).then(res => {
        console.log(res);
        this.formInline.region = res.behavior;
      });
    },
    // 查询施工人员列表获取name
    construction(){
      this.$api.construction(params).then(res=>{
        console.log(res,"施工列表")
      })
    }
  },
  created() {
    this.getViolationList();
    this.construction()
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
/deep/.el-collapse {
  width: 80%;
  margin-left: 5%;
  border: none;
  /deep/.el-collapse-item__header {
    width: 30%;
    background: #67c23a;
    color: #fff;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 10px;
    border-radius: 6px;
    margin-bottom: 20px;
  }
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
      width: 70%;
      height: 100%;
      padding-top: 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      /deep/.el-form-item {
        margin-right: 40px;
      }
    }
  }
  .home_main_section {
    width: 100%;
    height: 69vh;
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
              /deep/.el-date-editor {
                width: 100%;
                border: none;
              }
              /deep/.el-select {
                width: 100%;
                /deep/.el-input__inner {
                  border: none;
                }
              }
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
