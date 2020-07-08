<template>
  <div class="home">
    <div class="home_header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>人员管理</el-breadcrumb-item>
        <el-breadcrumb-item>员工信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="home_main">
      <el-tabs v-model="activeName">
        <el-tab-pane label="在职列表" name="first">
          <div class="serach_" v-if="'first' === activeName">
            <el-form :inline="true" :model="searchFormInline" class="demo-form-inline">
              <el-form-item>
                <el-input v-model="searchFormInline.name" placeholder="姓名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="searchFormInline.mobile" placeholder="手机号码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="searchFormInline.status" placeholder="班组">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="searchFormInline.workType" placeholder="工种">
                  <el-option v-for="(ire,i) in list" :key="i" :label="ire.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchConstructionPerson">查找</el-button>
                <!-- <el-button type="success" @click="dialogVisible = true">新增进场</el-button> -->
              </el-form-item>
            </el-form>
          </div>
          <div class="home_main_section">
            <el-table :data="StaffList" border style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#001642'}">
              <el-table-column align="center" show-overflow-tooltip prop="id" label="序号" width="80"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="name" label="姓名"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="sex" label="性别"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="mobile" label="手机号码"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="address" label="班组"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="zip" label="工种"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="createTime" label="进场日期"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="onlyDialog(scope.row)" size="small">查看</el-button>
                  <el-button type="text" @click="editDialog(scope.row)" size="small">编辑</el-button>
                  <el-button type="text" size="small">二维码</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 新增进场 -->
            <el-dialog title="新增进场" :visible.sync="dialogVisible" width="42%" class="dialogAdd">
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

                      <el-form-item label="身份证照片" class>
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
                    <el-form-item label="证件照片" class>
                      <div class="thirdColBor">
                        <el-image src="../../assets/timg.jpg" />
                        <el-image src="../../assets/timg.jpg" />
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="success" @click="openRemove" class="btn">退 场</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
            <!-- 编辑进场 -->
            <el-dialog title="编辑" :visible.sync="dialogVisibles" width="42%" class="dialogAdd">
              <div class="dialogTitle">基础信息</div>
              <el-form
                :inline="true"
                :rules="rules"
                ref="formInline"
                :model="formInline"
                class="demo-form-inline"
              >
                <el-row>
                  <el-col class="firstCol">
                    <div class="firstColLeft">
                      <el-form-item label="姓名" prop="name">
                        <el-input v-model="formInline.name" width="120" clearable placeholder="姓名"></el-input>
                      </el-form-item>
                      <el-form-item label="民族" class>
                        <el-input
                          v-model="formInline.region"
                          width="120"
                          clearable
                          placeholder="民族"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="性别" prop="age">
                        <el-select v-model="formInline.age" clearable placeholder="性别">
                          <el-option label="性别一" value="shanghai"></el-option>
                          <el-option label="性别二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="籍贯" class>
                        <el-input v-model="formInline.address" placeholder="籍贯" clearable></el-input>
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
                      <el-form-item label="出生日期" prop="date1">
                        <el-select v-model="formInline.date1" clearable placeholder="出生日期">
                          <el-option label="出生日期一" value="shanghai"></el-option>
                          <el-option label="出生日期二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="formInline.phone" clearable placeholder="手机号码"></el-input>
                      </el-form-item>
                      <el-form-item label="紧急联系人" prop="pagphone">
                        <el-input v-model="formInline.pagphone" clearable placeholder="紧急联系人"></el-input>
                      </el-form-item>
                    </div>
                    <div class="secondColRight">
                      <el-form-item label="婚姻状况" prop="marriage">
                        <el-select v-model="formInline.marriage" clearable placeholder="婚姻状况">
                          <el-option label="婚姻状况一" value="shanghai"></el-option>
                          <el-option label="婚姻状况二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>

                      <el-form-item label="身份证号" prop="IDnumber">
                        <el-input v-model="formInline.IDnumber" clearable placeholder="身份证号"></el-input>
                      </el-form-item>

                      <el-form-item label="联系方式" prop="contact">
                        <el-input v-model="formInline.contact" clearable placeholder="联系方式"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col class="thirdCol">
                    <el-form-item label="证件照片">
                      <div class="thirdColBor">
                        <el-image :src="formInline.img1" />
                        <el-image :src="formInline.img2" />
                      </div>
                    </el-form-item>
                  </el-col>
                  <div class="dialogTitle">施工信息</div>
                  <el-col class="secondCol">
                    <div class="secondColLeft">
                      <el-form-item label="进场日期" prop="Mobilization">
                        <el-select v-model="formInline.Mobilization" clearable placeholder="进场日期">
                          <el-option label="进场日期一" value="shanghai"></el-option>
                          <el-option label="进场日期二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="班组" prop="team">
                        <el-select v-model="formInline.team" clearable placeholder="班组">
                          <el-option label="班组一" value="shanghai"></el-option>
                          <el-option label="班组二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="工种证件号" prop="certificates">
                        <el-input v-model="formInline.certificates" clearable placeholder="工种证件号"></el-input>
                      </el-form-item>
                      <el-form-item label="领证时间" prop="Claimforevidence">
                        <el-input
                          v-model="formInline.Claimforevidence"
                          clearable
                          placeholder="领证时间"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="secondColRight">
                      <el-form-item label="工种" prop="Typeofwork" style="margin-top:60px;">
                        <el-select v-model="formInline.Typeofwork" clearable placeholder="工种">
                          <el-option label="工种一" value="shanghai"></el-option>
                          <el-option label="工种二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="发证机关" prop="Issued">
                        <el-input v-model="formInline.Issued" clearable placeholder="发证机关"></el-input>
                      </el-form-item>

                      <el-form-item label="证件有效期" prop="termofvalidity">
                        <el-input v-model="formInline.termofvalidity" clearable placeholder="证件有效期"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col class="thirdColbotton">
                    <el-form-item label="联系方式" class>
                      <div class="thirdColBor">
                        <el-image :src="formInline.img1" />
                        <el-image :src="formInline.img2" />
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="success" @click="openRemove" class="btn">退 场</el-button>
                <el-button @click="dialogVisibles = false">取 消</el-button>
                <el-button type="primary" @click="editSubmit('formInline')">确 定</el-button>
              </span>
            </el-dialog>
            <!-- 查看进场 -->
            <el-dialog title="查看" :visible.sync="dialogVisibled" width="42%" class="dialogAdd">
              <div class="dialogTitle">基础信息</div>
              <el-form
                :inline="true"
                :rules="rules"
                ref="formInline"
                :model="formInline"
                class="demo-form-inline"
              >
                <el-row>
                  <el-col class="firstCol">
                    <div class="firstColLeft">
                      <el-form-item label="姓名" prop="name">
                        <el-input v-model="formInline.name" width="120" clearable placeholder="姓名"></el-input>
                      </el-form-item>
                      <el-form-item label="民族" class>
                        <el-select v-model="formInline.region" clearable placeholder="民族">
                          <el-option label="民族一" value="shanghai"></el-option>
                          <el-option label="民族二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="性别" prop="age">
                        <el-select v-model="formInline.age" clearable placeholder="性别">
                          <el-option label="性别一" value="shanghai"></el-option>
                          <el-option label="性别二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="籍贯" class>
                        <el-input v-model="formInline.address" placeholder="籍贯" clearable></el-input>
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
                      <el-form-item label="出生日期" prop="date1">
                        <el-select v-model="formInline.date1" clearable placeholder="出生日期">
                          <el-option label="出生日期一" value="shanghai"></el-option>
                          <el-option label="出生日期二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="formInline.phone" clearable placeholder="手机号码"></el-input>
                      </el-form-item>
                      <el-form-item label="紧急联系人" prop="pagphone">
                        <el-input v-model="formInline.pagphone" clearable placeholder="紧急联系人"></el-input>
                      </el-form-item>
                    </div>
                    <div class="secondColRight">
                      <el-form-item label="婚姻状况" prop="marriage">
                        <el-select v-model="formInline.marriage" clearable placeholder="婚姻状况">
                          <el-option label="婚姻状况一" value="shanghai"></el-option>
                          <el-option label="婚姻状况二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>

                      <el-form-item label="身份证号" prop="IDnumber">
                        <el-input v-model="formInline.IDnumber" clearable placeholder="身份证号"></el-input>
                      </el-form-item>

                      <el-form-item label="联系方式" prop="contact">
                        <el-input v-model="formInline.contact" clearable placeholder="联系方式"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col class="thirdCol">
                    <el-form-item label="证件照片">
                      <div class="thirdColBor">
                        <el-image :src="formInline.img1" />
                        <el-image :src="formInline.img2" />
                      </div>
                    </el-form-item>
                  </el-col>
                  <div class="dialogTitle">施工信息</div>
                  <el-col class="secondCol">
                    <div class="secondColLeft">
                      <el-form-item label="进场日期" prop="Mobilization">
                        <el-select v-model="formInline.Mobilization" clearable placeholder="进场日期">
                          <el-option label="进场日期一" value="shanghai"></el-option>
                          <el-option label="进场日期二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="班组" prop="team">
                        <el-select v-model="formInline.team" clearable placeholder="班组">
                          <el-option label="班组一" value="shanghai"></el-option>
                          <el-option label="班组二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="工种证件号" prop="certificates">
                        <el-input v-model="formInline.certificates" clearable placeholder="工种证件号"></el-input>
                      </el-form-item>
                      <el-form-item label="领证时间" prop="Claimforevidence">
                        <el-input
                          v-model="formInline.Claimforevidence"
                          clearable
                          placeholder="领证时间"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="secondColRight">
                      <el-form-item label="工种" prop="Typeofwork" style="margin-top:60px;">
                        <el-select v-model="formInline.Typeofwork" clearable placeholder="工种">
                          <el-option label="工种一" value="shanghai"></el-option>
                          <el-option label="工种二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="发证机关" prop="Issued">
                        <el-input v-model="formInline.Issued" clearable placeholder="发证机关"></el-input>
                      </el-form-item>

                      <el-form-item label="证件有效期" prop="termofvalidity">
                        <el-input v-model="formInline.termofvalidity" clearable placeholder="证件有效期"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col class="thirdColbotton">
                    <el-form-item label="联系方式" class>
                      <div class="thirdColBor">
                        <el-image :src="formInline.img1" />
                        <el-image :src="formInline.img2" />
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisibled = false">关 闭</el-button>
              </span>
            </el-dialog>
          </div>
        </el-tab-pane>
        <el-tab-pane label="退场列表" name="second">
          <div class="serach_" v-if="'second' === activeName">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item>
                <el-input v-model="formInline.user" placeholder="姓名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="formInline.user" placeholder="手机号码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">查找</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="home_main_section">
            <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#001642'}">
              <el-table-column
                align="center"
                show-overflow-tooltip
                prop="date"
                label="日期"
                width="80"
              ></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="name" label="姓名"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="province" label="省份"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="city" label="市区"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="address" label="地址"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="zip" label="邮编"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small">查看</el-button>
                  <el-button type="text" @click="dialogVisiblesSecond = true" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 编辑进场 -->
            <el-dialog
              title="编辑"
              :visible.sync="dialogVisiblesSecond"
              width="42%"
              class="dialogAdd"
            >
              <div class="dialogTitle">基础信息</div>
              <el-form
                :inline="true"
                :rules="rules"
                ref="formInlineSecond"
                :model="formInlineSecond"
                class="demo-form-inline"
              >
                <el-row>
                  <el-col class="firstCol">
                    <div class="firstColLeft">
                      <el-form-item label="姓名" prop="name">
                        <el-input v-model="formInlineSecond.name" width="120" placeholder="审批人"></el-input>
                      </el-form-item>
                      <el-form-item label="民族" class>
                        <el-select v-model="formInlineSecond.region" placeholder="活动区域">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="性别" prop="age">
                        <el-select v-model="formInlineSecond.age" placeholder="活动区域">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="籍贯" class>
                        <el-input v-model="formInlineSecond.user" placeholder="审批人"></el-input>
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
                      <el-form-item label="出生日期" prop="date1">
                        <el-select v-model="formInlineSecond.date1" placeholder="活动区域">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="formInlineSecond.phone" placeholder="审批人"></el-input>
                      </el-form-item>
                      <el-form-item label="紧急联系人" prop="pagphone">
                        <el-input v-model="formInlineSecond.pagphone" placeholder="审批人"></el-input>
                      </el-form-item>
                    </div>
                    <div class="secondColRight">
                      <el-form-item label="婚姻状况">
                        <el-select v-model="formInlineSecond.region" placeholder="活动区域">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>

                      <el-form-item label="身份证号" prop="IDnumber">
                        <el-input v-model="formInlineSecond.IDnumber" placeholder="审批人"></el-input>
                      </el-form-item>

                      <el-form-item label="联系方式" prop="contact">
                        <el-input v-model="formInlineSecond.contact" placeholder="审批人"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <div class="dialogTitle">施工信息</div>
                  <el-col class="secondCol">
                    <div class="secondColLeft">
                      <el-form-item label="进场日期" prop="Mobilization">
                        <el-select v-model="formInlineSecond.Mobilization" placeholder="活动区域">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="secondColRight">
                      <el-form-item label="退场日期" prop="exitDate">
                        <el-select v-model="formInlineSecond.exitDate" placeholder="活动区域">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
              <el-dialog
                width="40%"
                height="auto"
                title="再进场"
                :visible.sync="innerVisible"
                append-to-body
              >
                <el-form
                  :inline="true"
                  :rules="rules"
                  ref="reEntry"
                  :model="reEntry"
                  class="demo-form-inline"
                >
                  <el-row class="inDialog">
                    <el-col ref="col2">
                      <div class="indialogAll">
                        <div class="indialogleft">
                          <el-form-item label="进场日期" prop="Mobilization">
                            <el-select v-model="reEntry.Mobilization" placeholder="进场日期">
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="班组" prop="team">
                            <el-select v-model="reEntry.team" placeholder="班组">
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="工种证件号" prop="CertificateNo">
                            <el-input v-model="reEntry.CertificateNo" placeholder="工种证件号"></el-input>
                          </el-form-item>
                          <el-form-item label="领证时间" prop="Claimforevidence">
                            <el-input v-model="reEntry.Claimforevidence" placeholder="领证时间"></el-input>
                          </el-form-item>
                        </div>
                        <div class="indialogrights">
                          <el-form-item label="工种" prop="Typeofwork">
                            <el-select v-model="reEntry.Typeofwork" placeholder="工种">
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="发证机关" prop="Issued">
                            <el-input v-model="reEntry.Issued" placeholder="发证机关"></el-input>
                          </el-form-item>
                          <el-form-item label="有效期" prop="termofvalidity">
                            <el-input v-model="reEntry.termofvalidity" placeholder="有效期"></el-input>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="indialogSame">
                        <el-form-item label="证件照片" class>
                          <div class="thirdColBor">
                            <el-image src="../../assets/timg.jpg" />
                            <el-image src="../../assets/timg.jpg" />
                          </div>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="innerVisible = false">取 消</el-button>
                  <el-button type="primary" @click="innerClick('reEntry')">确 定</el-button>
                </span>
              </el-dialog>
              <span slot="footer" class="dialog-footer">
                <el-button type="success" @click="innerVisible = true" class="btn">再进场</el-button>
                <el-button @click="dialogVisiblesSecond = false">取 消</el-button>
                <el-button type="primary" @click="secondClick('formInlineSecond')">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </el-tab-pane>
        <el-tab-pane label="访客列表" name="third">
          <div class="serach_" v-if="'third' === activeName">
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
                <el-button type="primary">查找</el-button>
                <el-button type="success" @click="dialogVisiblea = true">新增访客</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="home_main_section">
            <el-table :data="visitorList" border style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#001642'}">
              <el-table-column
                align="center"
                show-overflow-tooltip
                prop="date"
                label="日期"
                width="80"
              ></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="name" label="姓名"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="province" label="省份"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="city" label="市区"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="address" label="地址"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="zip" label="邮编"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small">查看</el-button>
                  <el-button type="text" @click="clickVisibility = true" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 新增访客 -->
            <el-dialog title="新增进场" :visible.sync="dialogVisiblea" width="42%" class="dialogAdd">
              <el-form
                :inline="true"
                :rules="rules"
                ref="addVisitor"
                :model="addVisitor"
                class="demo-form-inline"
              >
                <el-row>
                  <el-col class="firstCol">
                    <div class="firstColLeft">
                      <el-form-item label="姓名" prop="name">
                        <el-input v-model="addVisitor.name" width="120" placeholder="审批人"></el-input>
                      </el-form-item>
                      <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="addVisitor.phone" width="120" placeholder="审批人"></el-input>
                      </el-form-item>
                      <el-form-item label="性别" prop="age">
                        <el-select v-model="addVisitor.age" placeholder="活动区域">
                          <el-option label="男" value="0"></el-option>
                          <el-option label="女" value="1"></el-option>
                          <el-option label="未知" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="到访时间" prop="interviewTime">
                        <div class="block">
                          <el-date-picker
                            v-model="addVisitor.interviewTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :picker-options="pickerOptionsStart"
                            default-time="00:00:00"
                          ></el-date-picker>
                        </div>
                      </el-form-item>
                      <el-form-item label="结束时间" prop="exitDate">
                        <div class="block">
                          <el-date-picker
                            v-model="addVisitor.exitDate"
                            type="datetime"
                            placeholder="选择日期时间"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :picker-options="pickerOptionsEnd"
                            default-time="23:59:59"
                          ></el-date-picker>
                        </div>
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
                  <el-col class="thirdCol">
                    <el-form-item
                      label="访问对象"
                      prop="accessObject"
                      style="border:1px solid #fff;"
                      width="100%"
                    >
                      <el-input v-model="addVisitor.accessObject" placeholder="审批人"></el-input>
                    </el-form-item>
                    <el-form-item label="访问事由" prop="visitReason">
                      <el-input type="textarea" v-model="addVisitor.visitReason" placeholder="审批人"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisiblea = false">取 消</el-button>
                <el-button type="primary" @click="addVisitorClick('addVisitor')">确 定</el-button>
              </span>
            </el-dialog>
            <!-- 编辑访客 -->
            <el-dialog title="新增进场" :visible.sync="clickVisibility" width="42%" class="dialogAdd">
              <el-form
                :inline="true"
                :rules="rules"
                :model="editVisitor"
                ref="editVisitor"
                class="demo-form-inline"
              >
                <el-row>
                  <el-col class="firstCol">
                    <div class="firstColLeft">
                      <el-form-item label="姓名" prop="name">
                        <el-input v-model="editVisitor.name" width="120" placeholder="审批人"></el-input>
                      </el-form-item>
                      <el-form-item label="手机号码" prop="phone">
                        <el-select v-model="editVisitor.phone" placeholder="活动区域">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="性别" prop="age">
                        <el-select v-model="editVisitor.age" placeholder="活动区域">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="到访时间" prop="interviewTime">
                        <el-input v-model="editVisitor.interviewTime" placeholder="审批人"></el-input>
                      </el-form-item>
                      <el-form-item label="结束时间" prop="exitDate">
                        <el-select v-model="editVisitor.exitDate" placeholder="活动区域">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
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
                  <el-col class="thirdCol">
                    <el-form-item
                      label="访问对象"
                      prop="accessObject"
                      style="border:1px solid #fff;"
                      width="100%"
                    >
                      <el-input v-model="editVisitor.accessObject" placeholder="审批人"></el-input>
                    </el-form-item>
                    <el-form-item label="访问事由" prop="visitReason">
                      <el-input type="textarea" v-model="editVisitor.visitReason" placeholder="审批人"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="clickVisibility = false">取 消</el-button>
                <el-button type="primary" @click="editVisitorClick('editVisitor')">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </el-tab-pane>
        <el-tab-pane label="黑名单" name="fourth">
          <div class="serach_" v-if="'fourth' === activeName">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item>
                <el-input v-model="formInline.user" placeholder="姓名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="formInline.user" placeholder="手机号码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">查找</el-button>
                <el-button type="success" @click="dialogdisplay = true">新增黑名单</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="home_main_section">
            <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#001642'}">
              <el-table-column
                align="center"
                show-overflow-tooltip
                prop="date"
                label="日期"
                width="80"
              ></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="name" label="姓名"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="province" label="省份"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="city" label="市区"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="address" label="地址"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="zip" label="邮编"></el-table-column>
              <el-table-column align="center" show-overflow-tooltip fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small">查看</el-button>
                  <el-button type="text" @click="Editdialogdisplay = true" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 新增黑名单 -->
            <el-dialog title="新增黑名单" :visible.sync="dialogdisplay" width="42%" class="dialogAdd">
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-row>
                  <el-col class="firstCol">
                    <div class="firstColLeft">
                      <el-form-item label="姓名" class>
                        <el-input v-model="formInline.user" width="120" placeholder="审批人"></el-input>
                      </el-form-item>
                      <el-form-item label="手机号码" class>
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
                      <el-form-item label="身份证号" class>
                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                      </el-form-item>
                      <el-form-item label="添加日期">
                        <el-select v-model="formInline.region" placeholder="活动区域">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
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
                  <el-col class="thirdCol">
                    <el-form-item label="备注" class>
                      <el-input type="textarea" v-model="formInline.user" placeholder="审批人"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogdisplay = false">取 消</el-button>
                <el-button type="primary" @click="dialogdisplay = false">确 定</el-button>
              </span>
            </el-dialog>
            <!-- 编辑黑名单 -->
            <el-dialog
              title="编辑黑名单"
              :visible.sync="Editdialogdisplay"
              width="42%"
              class="dialogAdd"
            >
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-row>
                  <el-col class="firstCol">
                    <div class="firstColLeft">
                      <el-form-item label="姓名" class>
                        <el-input v-model="formInline.user" width="120" placeholder="审批人"></el-input>
                      </el-form-item>
                      <el-form-item label="手机号码" class>
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
                      <el-form-item label="身份证号" class>
                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                      </el-form-item>
                      <el-form-item label="添加日期">
                        <el-select v-model="formInline.region" placeholder="活动区域">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
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
                  <el-col class="thirdCol">
                    <el-form-item label="备注" class>
                      <el-input type="textarea" v-model="formInline.user" placeholder="审批人"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="success" class="btn">解除黑名单</el-button>
                <el-button @click="Editdialogdisplay = false">取 消</el-button>
                <el-button type="primary" @click="Editdialogdisplay = false">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      distable: false,
      disbable: false,
      builderId: "",
      exitList: [],
      visitorList: [],
      dialogVisibled: false,
      imageUrl: "",
      activeName: "first",
      form: {
        region: "",
        name: "",
        labels: ""
      },
      searchFormInline: {
        name: "",
        mobile: "",
        status: "",
        workType: ""
      },
      list: [
        { name: "龚总一", type: "特殊" },
        { name: "龚总二", type: "普通" },
        { name: "龚总三", type: "普通" },
        { name: "龚总四", type: "特殊" },
        { name: "龚总五", type: "普通" }
      ],
      // 新增内容
      addFormInline: {
        user: "",
        region: "",
        name: "",
        address: "",
        type: "",
        same: "",
        age: "",
        phone: "",
        pagphone: "",
        case: "",
        marriage: "",
        IDnumber: "",
        IDimg: "",
        contact: "",
        Mobilization: "",
        team: "",
        Typeofwork: "",
        certificates: "",
        Issued: "",
        termofvalidity: "",
        Claimforevidence: ""
      },
      // 编辑内容字段
      formInline: {
        user: "",
        region: "",
        name: "",
        address: "",
        type: "",
        same: "",
        age: "",
        phone: "",
        pagphone: "",
        case: "",
        marriage: "",
        IDnumber: "",
        IDimg: "",
        contact: "",
        Mobilization: "",
        team: "",
        Typeofwork: "",
        certificates: "",
        Issued: "",
        termofvalidity: "",
        Claimforevidence: "",
        img1: "",
        img2: ""
      },
      // 编辑内容字段
      formInlineSecond: {
        user: "",
        region: "",
        name: "",
        address: "",
        type: "",
        same: "",
        age: "",
        phone: "",
        pagphone: "",
        case: "",
        marriage: "",
        IDnumber: "",
        IDimg: "",
        contact: "",
        Mobilization: "",
        team: "",
        Typeofwork: "",
        certificates: "",
        Issued: "",
        termofvalidity: "",
        Claimforevidence: "",
        exitDate: ""
      },
      // reEntry 再进场
      reEntry: {
        Mobilization: "",
        team: "",
        Typeofwork: "",
        CertificateNo: "",
        Issued: "",
        Claimforevidence: "",
        termofvalidity: ""
      },
      // 在职员工列表
      StaffList: [],
      // 新增访客
      addVisitor: {
        name: "",
        phone: "",
        age: "",
        interviewTime: "",
        exitDate: "",
        accessObject: "",
        visitReason: ""
      },
      // 编辑访客
      editVisitor: {
        name: "",
        phone: "",
        age: "",
        interviewTime: "",
        exitDate: "",
        accessObject: "",
        visitReason: ""
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
      ],
      dialogVisible: false,
      dialogVisibles: false,
      dialogVisiblesSecond: false,
      innerVisible: false,
      // 新增访客
      dialogVisiblea: false,
      // 编辑访客
      clickVisibility: false,
      // 新增黑名单
      dialogdisplay: false,
      // 编辑黑名单
      Editdialogdisplay: false,
      // 内容条件提示信息
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        age: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change"
          }
        ],
        date1: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        interviewTime: [
          {
            required: true,
            message: "请选择到访时间",
            trigger: blur
          }
        ],
        Mobilization: [
          {
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        exitDate: [
          {
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        team: [
          {
            required: true,
            message: "请选择班组",
            trigger: "change"
          }
        ],
        Typeofwork: [
          {
            required: true,
            message: "请选择工种",
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        certificates: [
          { required: true, message: "请输入证件号", trigger: "blur" }
        ],
        accessObject: [
          { required: true, message: "请输入访问对象", trigger: "blur" }
        ],
        visitReason: [
          { required: true, message: "请输入访问事由", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        pagphone: [
          { required: true, message: "请填写紧急联系人", trigger: "blur" }
        ],
        marriage: [
          {
            required: true,
            message: "请至少选择一个婚姻状况",
            trigger: "change"
          }
        ],
        IDnumber: [
          { required: true, message: "请输入联系方式", trigger: "blur" }
        ],
        contact: [
          { required: true, message: "请填写联系方式", trigger: "blur" }
        ],
        Issued: [
          { required: true, message: "请填写发证机关", trigger: "blur" }
        ],
        termofvalidity: [
          { required: true, message: "请填写有效期限", trigger: "blur" }
        ],
        Claimforevidence: [
          { required: true, message: "请填写领证时间", trigger: "blur" }
        ],
        CertificateNo: [
          { required: true, message: "请输入证件号码", trigger: "blur" }
        ]
        // IDimg:[
        //   { required: true, }
        // ]
      }
    };
  },
  methods: {
    // 员工列表
    getStaffList() {
      let params = {
        projectId: this.$store.state.projectId
      };
      console.log(params);
      this.$api.constructionPerson(params).then(res => {
        console.log(res.data);
        res.data.forEach(response => {
          if (res.baseInfo.sex == "1") {
            response.baseInfo.sex = "男";
            this.StaffList.push(response.baseInfo);
          } else {
            response.baseInfo.sex = "女";
            this.StaffList.push(response.baseInfo);
          }
        });
      });
    },
    // 查询员工列表
    searchConstructionPerson() {
      let params = this.searchFormInline;
      this.$api.searchConstructionPerson(params).then(res => {
        res.data.forEach(res => {
          // console.log(res.baseInfo)
          if (res.baseInfo.sex == "1") {
            res.baseInfo.sex = "男";
            this.StaffList = res.baseInfo;
          } else {
            res.baseInfo.sex = "女";
            this.StaffList = res.baseInfo;
          }
        });
      });
    },
    // first查看回显
    onlyDialog(row) {
      this.dialogVisibled = true;
      this.formInline = {
        region: row.nation,
        name: row.name,
        address: row.place,
        type: row.mobile,
        same: "",
        age: row.sex,
        phone: row.mobile,
        pagphone: row.contact,
        case: "",
        marriage: row.marriage,
        IDnumber: row.identity,
        IDimg: "",
        contact: row.contactPhone,
        Mobilization: row.createdTime,
        team: "",
        Typeofwork: "",
        certificates: "",
        Issued: "",
        termofvalidity: "",
        Claimforevidence: "",
        img1: row.card01Url,
        img2: row.card02Url
      };
      // this.imageUrl = row.headUrl
    },
    // first编辑回显
    editDialog(row) {
      this.dialogVisibles = true;
      this.builderId = row.id;
      this.formInline = {
        region: row.nation,
        name: row.name,
        address: row.place,
        type: row.mobile,
        same: "",
        id: row.id,
        projectId: this.$store.state.projectId,
        age: row.sex,
        phone: row.mobile,
        pagphone: row.contact,
        case: "",
        marriage: row.marriage,
        IDnumber: row.identity,
        IDimg: "",
        contact: row.contactPhone,
        Mobilization: row.createdTime,
        team: "",
        Typeofwork: "",
        certificates: "",
        Issued: "",
        termofvalidity: "",
        Claimforevidence: "",
        img1: row.card01Url,
        img2: row.card02Url
      };
      // this.imageUrl = row.headUrl
    },
    // first编辑
    editSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.formInline;
          console.log(params, "bianji -paer");
          this.$api.editConstructionPerson(params).then(res => {
            if (res.code == 0) {
              this.$message.success("修改成功");
              this.dialogVisibles = false;
            } else {
              this.$message.error("修改失败");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // second编辑
    secondClick(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogVisiblesSecond = false;
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 再进场
    innerClick(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.innerVisible = false;
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增访客
    addVisitorClick(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            name: this.addVisitor.name,
            mobile: this.addVisitor.phone,
            sex: this.addVisitor.age,
            visitStartTime: this.addVisitor.interviewTime,
            visitEndTime: this.addVisitor.exitDate,
            reason: this.addVisitor.visitReason,
            interviewee: this.addVisitor.accessObject,
            projectId:this.$store.state.projectId
          };
          this.$api.addVisitor(params).then(res => {
            console.log(res);
          });
          this.dialogVisiblea = false;
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    editVisitorClick(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.clickVisibility = false;
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 图片地址
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 上传图片
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
    //退场
    openRemove() {
      let params = {
        builderId: this.builderId,
        projectId: this.$store.state.projectId,
        status: false
      };
      this.$confirm(
        " 退场操作会导致员工施工信息失效，同时冻结进入施工工地权限，是否确认退场？",
        "重要提示：",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$api.exitConstructionPerson(params).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //显示隐藏
    getDisplay() {
      console.log(this.form.region);
      if (this.form.region == "区域一" || this.form.region == "") {
        this.distable = true;
      } else if (this.form.region == "区域二") {
        this.disbable = true;
      }
    },
    // 访客列表
    getvisitorList() {
      let params = {
        projectId: this.$store.state.projectId
      };
      this.$api.visitorList(params).then(res => {
        this.visitorList = res.data;
      });
    }
  },
  created() {
    this.getDisplay();
    this.getStaffList();
    this.getvisitorList();
  }
};
</script>
<style scoped lang="less">
// 上传图片
/deep/.avatar-uploader {
  width: 178px;
  height: 200px;
  border: 1px solid #ccc;
  display: inline-block;
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
/deep/.el-dialog__footer {
  .btn {
    float: left;
    clear: both;
  }
}
.thirdColbotton {
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
.avatar-uploader .el-upload {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 200px;
  display: block;
}
//
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
      padding-top: 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
  .home_main_section {
    width: 100%;
    height: 69vh;
    background: #fff;
    margin-top: 2vh;
    box-sizing: border-box;
  }
}
/deep/.el-dialog__body {
  padding-top: 10px !important;
}
.dialogTitle {
  width: 100%;
  height: 34px;
  background: #ccc;
  line-height: 34px;
  text-indent: 10px;
  margin-bottom: 10px;
}
.culim {
  display: block;
  text-indent: 10px;
}
.inDialog {
  width: 100%;
  height: auto;
  /deep/.el-col {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    .indialogAll {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: row;
      .inDialogLeft {
        width: 50%;
        padding: 20px;
        box-sizing: border-box;
      }
      .inDialogRight {
        width: 50%;
        padding: 80px 0 0 20px;
        box-sizing: border-box;
      }
      .indialogleft {
        width: 50%;
        padding: 20px 20px 0px 20px;
        box-sizing: border-box;
        /deep/.el-form-item {
          display: flex;
          justify-content: flex-end;

          /deep/.el-input {
            width: 217px;
          }
        }
      }
      .indialogrights {
        width: 49%;
        height: auto;
        padding: 20px 40px 0 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        /deep/.el-form-item {
          display: flex;
          justify-content: flex-end;
          /deep/.el-form-item__label {
            width: 100px;
          }
          /deep/.el-input {
            width: 217px;
          }
        }
      }
    }
    .indialogSame {
      width: 100%;
      height: 100px;
      padding-left: 12px;
      /deep/.el-form-item {
        width: 90%;
        height: 100px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        /deep/.el-form-item__label {
          width: 120px;
        }
        /deep/.el-form-item__content {
          width: 100%;
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
</style>