<template>
  <div class="home">
    <div class="home_header">项目信息</div>
    <div class="search_">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formInline.projectName" placeholder="项目名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="formInline.projectStatus" placeholder="项目状态">
            <el-option
              v-for="item in prostatus"
              :key="item.value"
              :label="item.labal"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchProject">查询</el-button>
        </el-form-item>
        <el-button type="success" @click="dialogVisible = true">新建项目</el-button>
        <!-- 新建项目 -->
        <el-dialog title="新建项目" class="dialog_" :visible.sync="dialogVisible" width="60%">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="项目概况" name="first">
              <el-form
                :label-position="labelPosition"
                label-width="60px"
                :rules="rules"
                ref="formLabelAlign"
                :model="formLabelAlign"
              >
                <el-form-item label="项目名称" prop="projectName">
                  <el-input v-model="formLabelAlign.projectName"></el-input>
                </el-form-item>
                <el-form-item label="项目ID">
                  <el-input v-model="formLabelAlign.projectId"></el-input>
                </el-form-item>
                <el-form-item label="项目地址" class="input_imp" prop="projectDetailAddress">
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
                  <el-input class="select_input" v-model="formLabelAlign.projectDetailAddress"></el-input>
                </el-form-item>
                <el-form-item label="项目负责人" prop="projectLeader" class="input_imps">
                  <el-input v-model="formLabelAlign.projectLeader"></el-input>
                </el-form-item>
                <el-form-item label="项目状态" class="input_imps2">
                  <el-select v-model="formLabelAlign.projectStatus" placeholder="请选择">
                    <el-option
                      v-for="item in projectStatus1"
                      :key="item.value"
                      :label="item.labal"
                      :value="item.labal"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="建设规模" class="input_imps2">
                  <el-select v-model="formLabelAlign.buildScale" placeholder="请选择">
                    <el-option
                      v-for="item in projectStatus2"
                      :key="item.value"
                      :label="item.labal"
                      :value="item.labal"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="投资总额（万元）" class="input_imps">
                  <el-input v-model="formLabelAlign.investTotal"></el-input>
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
                  <el-select v-model="formLabelAlign.projectUsed" placeholder="居住建筑">
                    <el-option
                      v-for="item in purpose"
                      :key="item.value"
                      :label="item.labal"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="建筑结构类型">
                  <el-input v-model="formLabelAlign.buildStructureType" placeholder="框架/钢结构"></el-input>
                </el-form-item>
                <el-form-item label="单体数量(个)" class="list_my">
                  <el-input v-model="formLabelAlign.singleNum"></el-input>
                </el-form-item>
                <el-form-item label="建筑面积(m2)" class="list_my mys">
                  <el-input v-model="formLabelAlign.buildArea"></el-input>
                </el-form-item>
                <el-form-item label="地上面积(m2)" class="list_my">
                  <el-input v-model="formLabelAlign.groundArea"></el-input>
                </el-form-item>
                <el-form-item label="地下面积(m2)" class="list_my mys">
                  <el-input v-model="formLabelAlign.undergroundArea"></el-input>
                </el-form-item>
                <el-form-item label="建筑高度(m)" class="list_my">
                  <el-input v-model="formLabelAlign.buildHeight"></el-input>
                </el-form-item>
                <el-form-item label="地上层数" class="list_my mys">
                  <el-input v-model="formLabelAlign.groundFloor"></el-input>
                </el-form-item>
                <el-form-item label="地下深度(m)" class="list_my">
                  <el-input v-model="formLabelAlign.undergroundDepth"></el-input>
                </el-form-item>
                <el-form-item label="基坑深度(m)" class="list_my mys">
                  <el-input v-model="formLabelAlign.pitDepth"></el-input>
                </el-form-item>
                <div class="XinXi">关联单位</div>
                <el-form-item label="建设单位" class="list_my">
                  <el-input v-model="formLabelAlign.constructionUnit"></el-input>
                </el-form-item>
                <el-form-item label="设计单位" class="list_my mys">
                  <el-input v-model="formLabelAlign.designerUnit"></el-input>
                </el-form-item>
                <el-form-item label="监理单位" class="list_my">
                  <el-input v-model="formLabelAlign.supervisionUnit"></el-input>
                </el-form-item>
                <el-form-item label="施工单位" label-width="100px" class="list_my mys">
                  <el-input v-model="formLabelAlign.buildUnit"></el-input>
                </el-form-item>
                <el-form-item label="安全监督单位" class="list_my">
                  <el-input v-model="formLabelAlign.safeUnit"></el-input>
                </el-form-item>
                <el-form-item label="质量监督单位" class="list_my mys">
                  <el-input v-model="formLabelAlign.qualityUnit"></el-input>
                </el-form-item>
                <div class="XinXi">施工信息</div>
                <el-form-item label="投资类型" class="HuoDong">
                  <el-select v-model="formLabelAlign.investmentType" placeholder="请选择投资类型">
                    <el-option
                      v-for="item in investment"
                      :key="item.value"
                      :label="item.labal"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="中标编号" class="list_my">
                  <el-input v-model="formLabelAlign.bidno"></el-input>
                </el-form-item>
                <el-form-item label="合同造价" class="list_my mys">
                  <el-input v-model="formLabelAlign.contractCost"></el-input>
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
                  <div class="block">
                    <el-date-picker
                      v-model="formLabelAlign.commencementTime"
                      type="date"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </div>
                </el-form-item>
                <el-form-item label="完工时间" class="list_my mys">
                  <div class="block">
                    <el-date-picker
                      v-model="formLabelAlign.completionTime"
                      type="date"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </div>
                </el-form-item>
                <el-form-item label="项目经理" class="list_my">
                  <el-input v-model="formLabelAlign.projectManager"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" class="list_my mys">
                  <el-input v-model="formLabelAlign.mobile"></el-input>
                </el-form-item>
                <el-form-item label="发薪银行">
                  <el-input v-model="formLabelAlign.payBank"></el-input>
                </el-form-item>
                <el-form-item label="开户银行">
                  <el-input v-model="formLabelAlign.depositBank"></el-input>
                </el-form-item>
                <el-form-item label="发薪账号" class="list_my">
                  <el-input v-model="formLabelAlign.payAccountNo"></el-input>
                </el-form-item>
                <el-form-item label="发薪日期" class="list_my mys">
                  <div class="block">
                    <el-date-picker v-model="formLabelAlign.payTime" type="date" placeholder="选择日期"></el-date-picker>
                  </div>
                </el-form-item>
                <el-form-item label="质量目标" class="list_my">
                  <el-input v-model="formLabelAlign.qualityObjectives"></el-input>
                </el-form-item>
                <el-form-item label="安全目标" class="list_my mys">
                  <el-input v-model="formLabelAlign.safetyObjectives"></el-input>
                </el-form-item>
                <el-form-item label="合同备案号">
                  <el-input v-model="formLabelAlign.contractRecordNo"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input v-model="formLabelAlign.remark"></el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="参建单位" name="third">
              <el-form
                :model="dynamicValidateForm"
                label-width="100px"
                class="demo-dynamic dynamicForm"
              >
                <span class="dyTitle">参建单位：</span>
                <el-form-item
                  v-for="(domain, index) in dynamicValidateForm.domains"
                  :key="index"
                  :prop="'domains.' + index + '.value'"
                >
                  <el-select class="inputDom" v-model="domain.unitDictCode">
                    <el-option
                      v-for="item in partUnit"
                      :key="item.dictSort"
                      :label="item.dictLabel"
                      :value="item.dictSort"
                    />
                  </el-select>

                  <el-button @click.prevent="removeDomain(domain)" v-if="index>0">删除</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button class="btn" @click="addDomain">新增域名</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="项目介绍" name="fourth">
              <el-form :label-position="labelPosition" label-width="60px" :model="formLabelAlign">
                <el-form-item label="360°全景地址(url)">
                  <el-input v-model="formLabelAlign.panoramicAddressUrl"></el-input>
                </el-form-item>
                <myEditor />
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addProject('formLabelAlign')">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 查看 -->
        <el-dialog title="查看项目" class="dialog_" :visible.sync="dialogVisibles" width="60%">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="项目概况" name="first">
              <el-form
                :label-position="labelPosition"
                label-width="60px"
                :model="onlyFormLabelAlign"
              >
                <el-form-item label="项目名称" prop="projectName">
                  <el-input readonly v-model="onlyFormLabelAlign.projectName"></el-input>
                </el-form-item>
                <el-form-item label="项目ID">
                  <el-input readonly v-model="onlyFormLabelAlign.id"></el-input>
                </el-form-item>
                <el-form-item label="项目地址" class="input_imp" prop="projectAddress">
                  <el-input
                    readonly
                    class="select_input"
                    v-model="onlyFormLabelAlign.projectMergerName"
                  ></el-input>
                </el-form-item>
                <el-form-item label="项目负责人" prop="projectPerson" class="input_imps">
                  <el-input readonly v-model="onlyFormLabelAlign.projectLeader"></el-input>
                </el-form-item>
                <el-form-item label="项目状态" class="input_imps2">
                  <el-input readonly v-model="onlyFormLabelAlign.projectStatus"></el-input>
                </el-form-item>
                <el-form-item label="建设规模" class="input_imps2">
                  <el-input readonly v-model="onlyFormLabelAlign.buildScale"></el-input>
                </el-form-item>
                <el-form-item label="投资总额（万元）" class="input_imps">
                  <el-input readonly v-model="onlyFormLabelAlign.investTotal"></el-input>
                </el-form-item>
                <el-form-item label="项目二维码" class="input_imps">
                  <el-button type="info">查看</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="工程信息" name="second">
              <el-form
                :label-position="labelPosition"
                label-width="60px"
                :model="onlyFormLabelAlign"
              >
                <div class="XinXi">工程属性</div>
                <el-form-item label="工程用途" class="HuoDong">
                  <el-input readonly v-model="onlyFormLabelAlign.projectUsed"></el-input>
                </el-form-item>
                <el-form-item label="建筑结构类型">
                  <el-input
                    readonly
                    v-model="onlyFormLabelAlign.buildStructureType"
                    placeholder="框架/钢结构"
                  ></el-input>
                </el-form-item>
                <el-form-item label="单体数量(个)" class="list_my">
                  <el-input readonly v-model="onlyFormLabelAlign.singleNum"></el-input>
                </el-form-item>
                <el-form-item label="建筑面积(m2)" class="list_my mys">
                  <el-input readonly v-model="onlyFormLabelAlign.buildArea"></el-input>
                </el-form-item>
                <el-form-item label="地上面积(m2)" class="list_my">
                  <el-input readonly v-model="onlyFormLabelAlign.groundArea"></el-input>
                </el-form-item>
                <el-form-item label="地下面积(m2)" class="list_my mys">
                  <el-input readonly v-model="onlyFormLabelAlign.undergroundArea"></el-input>
                </el-form-item>
                <el-form-item label="建筑高度(m)" class="list_my">
                  <el-input readonly v-model="onlyFormLabelAlign.buildHeight"></el-input>
                </el-form-item>
                <el-form-item label="地上层数" class="list_my mys">
                  <el-input readonly v-model="onlyFormLabelAlign.groundFloor"></el-input>
                </el-form-item>
                <el-form-item label="地下深度(m)" class="list_my">
                  <el-input readonly v-model="onlyFormLabelAlign.undergroundDepth"></el-input>
                </el-form-item>
                <el-form-item label="基坑深度(m)" class="list_my mys">
                  <el-input readonly v-model="onlyFormLabelAlign.pitDepth"></el-input>
                </el-form-item>
                <div class="XinXi">关联单位</div>
                <el-form-item label="建设单位" class="list_my">
                  <el-input readonly v-model="onlyFormLabelAlign.constructionUnit"></el-input>
                </el-form-item>
                <el-form-item label="设计单位" class="list_my mys">
                  <el-input readonly v-model="onlyFormLabelAlign.designerUnit"></el-input>
                </el-form-item>
                <el-form-item label="监理单位" class="list_my">
                  <el-input readonly v-model="onlyFormLabelAlign.supervisionUnit"></el-input>
                </el-form-item>
                <el-form-item label="施工单位" label-width="100px" class="list_my mys">
                  <el-input readonly v-model="onlyFormLabelAlign.buildUnit"></el-input>
                </el-form-item>
                <el-form-item label="安全监督单位" class="list_my">
                  <el-input readonly v-model="onlyFormLabelAlign.safeUnit"></el-input>
                </el-form-item>
                <el-form-item label="质量监督单位" class="list_my mys">
                  <el-input readonly v-model="onlyFormLabelAlign.qualityUnit"></el-input>
                </el-form-item>
                <div class="XinXi">施工信息</div>
                <el-form-item label="投资类型" class="HuoDong">
                  <el-input readonly v-model="onlyFormLabelAlign.investmentType"></el-input>
                </el-form-item>
                <el-form-item label="中标编号" class="list_my">
                  <el-input readonly v-model="onlyFormLabelAlign.bidno"></el-input>
                </el-form-item>
                <el-form-item label="合同造价" class="list_my mys">
                  <el-input readonly v-model="onlyFormLabelAlign.contractCost"></el-input>
                </el-form-item>
                <!--  -->
                <el-form-item label="施工许可证">
                  <div class="certificates">
                    <div
                      style="width:100%; height:30px; line-height:30px; border-bottom:1px solid #E4E7ED; text-indent:16px;"
                    >施工许可证编号</div>
                    <div id="softimg" style="width:100%; height:70px;">
                      <el-upload
                        readonly
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
                  <el-input readonly v-model="onlyFormLabelAlign.commencementTime"></el-input>
                </el-form-item>
                <el-form-item label="完工时间" class="list_my mys">
                  <el-input readonly v-model="onlyFormLabelAlign.completionTime"></el-input>
                </el-form-item>
                <el-form-item label="项目经理" class="list_my">
                  <el-input readonly v-model="onlyFormLabelAlign.projectManager"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" class="list_my mys">
                  <el-input readonly v-model="onlyFormLabelAlign.mobile"></el-input>
                </el-form-item>
                <el-form-item label="发薪银行">
                  <el-input readonly v-model="onlyFormLabelAlign.payBank"></el-input>
                </el-form-item>
                <el-form-item label="开户银行">
                  <el-input readonly v-model="onlyFormLabelAlign.depositBank"></el-input>
                </el-form-item>
                <el-form-item label="发薪账号" class="list_my">
                  <el-input readonly v-model="onlyFormLabelAlign.payAccountNo"></el-input>
                </el-form-item>
                <el-form-item label="发薪日期" class="list_my mys">
                  <el-input readonly v-model="onlyFormLabelAlign.payTime"></el-input>
                </el-form-item>
                <el-form-item label="质量目标" class="list_my">
                  <el-input readonly v-model="onlyFormLabelAlign.qualityObjectives"></el-input>
                </el-form-item>
                <el-form-item label="安全目标" class="list_my mys">
                  <el-input readonly v-model="onlyFormLabelAlign.safetyObjectives"></el-input>
                </el-form-item>
                <el-form-item label="合同备案号">
                  <el-input readonly v-model="onlyFormLabelAlign.contractRecordNo"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input readonly v-model="onlyFormLabelAlign.remark"></el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="参建单位" name="third">
              <el-form
                :model="onlydynamicValidateForm"
                label-width="100px"
                class="demo-dynamic dynamicForm"
              >
                <span class="dyTitle">参建单位：</span>
                <el-form-item
                  v-for="(domain, index) in onlydynamicValidateForm.domains"
                  :key="index"
                  :prop="'domains.' + index + '.value'"
                >
                  <el-select class="inputDom" v-model="domain.unitDictCode">
                    <el-option
                      v-for="item in partUnit"
                      :key="item.dictSort"
                      :label="item.dictLabel"
                      :value="item.dictSort"
                    />
                  </el-select>

                  <el-button @click.prevent="removeDomain(domain)" v-if="index>0">删除</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button class="btn" @click="addDomain">新增域名</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="项目介绍" name="fourth">
              <el-form
                :label-position="labelPosition"
                label-width="60px"
                :model="onlyFormLabelAlign"
              >
                <el-form-item label="360°全景地址(url)">
                  <el-input readonly v-model="onlyFormLabelAlign.panoramicAddressUrl"></el-input>
                </el-form-item>
                <myEditor />
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisibles = false">关 闭</el-button>
          </span>
        </el-dialog>
        <!-- 编辑 -->
        <el-dialog title="编辑项目" class="dialog_" :visible.sync="dialogFormVisible" width="60%">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="项目概况" name="first">
              <el-form
                :label-position="labelPosition"
                label-width="60px"
                :rules="rules"
                ref="formLabelAlign"
                :model="editFormLabelAlign"
              >
                <el-form-item label="项目名称" prop="projectName">
                  <el-input v-model="editFormLabelAlign.projectName"></el-input>
                </el-form-item>
                <el-form-item label="项目ID">
                  <el-input v-model="editFormLabelAlign.projectId"></el-input>
                </el-form-item>
                <el-form-item label="项目地址" class="input_imp" prop="projectDetailAddress">
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
                  <el-input class="select_input" v-model="editFormLabelAlign.projectDetailAddress"></el-input>
                </el-form-item>
                <el-form-item label="项目负责人" prop="projectLeader" class="input_imps">
                  <el-input v-model="editFormLabelAlign.projectLeader"></el-input>
                </el-form-item>
                <el-form-item label="项目状态" class="input_imps2">
                  <el-select v-model="editFormLabelAlign.projectStatus" placeholder="请选择">
                    <el-option
                      v-for="item in projectStatus1"
                      :key="item.value"
                      :label="item.labal"
                      :value="item.labal"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="建设规模" class="input_imps2">
                  <el-select v-model="editFormLabelAlign.buildScale" placeholder="请选择">
                    <el-option
                      v-for="item in projectStatus2"
                      :key="item.value"
                      :label="item.labal"
                      :value="item.labal"
                    >
                    </el-option>  
                  </el-select>
                </el-form-item>
                <el-form-item label="投资总额（万元）" class="input_imps">
                  <el-input v-model="editFormLabelAlign.investTotal"></el-input>
                </el-form-item>
                <el-form-item label="项目二维码" class="input_imps">
                  <el-button type="info">查看</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="工程信息" name="second">
              <el-form
                :label-position="labelPosition"
                label-width="60px"
                :model="editFormLabelAlign"
              >
                <div class="XinXi">工程属性</div>
                <el-form-item label="工程用途" class="HuoDong">
                  <el-select v-model="editFormLabelAlign.projectUsed" placeholder="居住建筑">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="建筑结构类型">
                  <el-input v-model="editFormLabelAlign.buildStructureType" placeholder="框架/钢结构"></el-input>
                </el-form-item>
                <el-form-item label="单体数量(个)" class="list_my">
                  <el-input v-model="editFormLabelAlign.singleNum"></el-input>
                </el-form-item>
                <el-form-item label="建筑面积(m2)" class="list_my mys">
                  <el-input v-model="editFormLabelAlign.buildArea"></el-input>
                </el-form-item>
                <el-form-item label="地上面积(m2)" class="list_my">
                  <el-input v-model="editFormLabelAlign.groundArea"></el-input>
                </el-form-item>
                <el-form-item label="地下面积(m2)" class="list_my mys">
                  <el-input v-model="editFormLabelAlign.undergroundArea"></el-input>
                </el-form-item>
                <el-form-item label="建筑高度(m)" class="list_my">
                  <el-input v-model="editFormLabelAlign.buildHeight"></el-input>
                </el-form-item>
                <el-form-item label="地上层数" class="list_my mys">
                  <el-input v-model="editFormLabelAlign.groundFloor"></el-input>
                </el-form-item>
                <el-form-item label="地下深度(m)" class="list_my">
                  <el-input v-model="editFormLabelAlign.undergroundDepth"></el-input>
                </el-form-item>
                <el-form-item label="基坑深度(m)" class="list_my mys">
                  <el-input v-model="editFormLabelAlign.pitDepth"></el-input>
                </el-form-item>
                <div class="XinXi">关联单位</div>
                <el-form-item label="建设单位" class="list_my">
                  <el-input v-model="editFormLabelAlign.constructionUnit"></el-input>
                </el-form-item>
                <el-form-item label="设计单位" class="list_my mys">
                  <el-input v-model="editFormLabelAlign.designerUnit"></el-input>
                </el-form-item>
                <el-form-item label="监理单位" class="list_my">
                  <el-input v-model="editFormLabelAlign.supervisionUnit"></el-input>
                </el-form-item>
                <el-form-item label="施工单位" label-width="100px" class="list_my mys">
                  <el-input v-model="editFormLabelAlign.buildUnit"></el-input>
                </el-form-item>
                <el-form-item label="安全监督单位" class="list_my">
                  <el-input v-model="editFormLabelAlign.safeUnit"></el-input>
                </el-form-item>
                <el-form-item label="质量监督单位" class="list_my mys">
                  <el-input v-model="editFormLabelAlign.qualityUnit"></el-input>
                </el-form-item>
                <div class="XinXi">施工信息</div>
                <el-form-item label="投资类型" class="HuoDong">
                  <el-select v-model="editFormLabelAlign.investmentType" placeholder="请选择投资类型">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="中标编号" class="list_my">
                  <el-input v-model="editFormLabelAlign.bidno"></el-input>
                </el-form-item>
                <el-form-item label="合同造价" class="list_my mys">
                  <el-input v-model="editFormLabelAlign.contractCost"></el-input>
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
                  <el-input v-model="editFormLabelAlign.contractCost"></el-input>
                </el-form-item>
                <el-form-item label="完工时间" class="list_my mys">
                  <el-input v-model="editFormLabelAlign.completionTime"></el-input>
                </el-form-item>
                <el-form-item label="项目经理" class="list_my">
                  <el-input v-model="editFormLabelAlign.projectManager"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" class="list_my mys">
                  <el-input v-model="editFormLabelAlign.mobile"></el-input>
                </el-form-item>
                <el-form-item label="发薪银行">
                  <el-input v-model="editFormLabelAlign.payBank"></el-input>
                </el-form-item>
                <el-form-item label="开户银行">
                  <el-input v-model="editFormLabelAlign.depositBank"></el-input>
                </el-form-item>
                <el-form-item label="发薪账号" class="list_my">
                  <el-input v-model="editFormLabelAlign.payAccountNo"></el-input>
                </el-form-item>
                <el-form-item label="发薪日期" class="list_my mys">
                  <el-input v-model="editFormLabelAlign.payTime"></el-input>
                </el-form-item>
                <el-form-item label="质量目标" class="list_my">
                  <el-input v-model="editFormLabelAlign.qualityObjectives"></el-input>
                </el-form-item>
                <el-form-item label="安全目标" class="list_my mys">
                  <el-input v-model="editFormLabelAlign.safetyObjectives"></el-input>
                </el-form-item>
                <el-form-item label="合同备案号">
                  <el-input v-model="editFormLabelAlign.contractRecordNo"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input v-model="editFormLabelAlign.remark"></el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="参建单位" name="third">
              <el-form
                :model="editdynamicValidateForm"
                label-width="100px"
                class="demo-dynamic dynamicForm"
              >
                <span class="dyTitle">参建单位：</span>
                <el-form-item
                  v-for="(domain, index) in editdynamicValidateForm.domains"
                  :key="index"
                  :prop="'domains.' + index + '.value'"
                >
                  <el-select class="inputDom" v-model="domain.unitDictCode">
                    <el-option
                      v-for="item in partUnit"
                      :key="item.dictSort"
                      :label="item.dictLabel"
                      :value="item.dictSort"
                    />
                  </el-select>
                  <el-button @click.prevent="removeDomain(domain)" v-if="index>0">删除</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button class="btn" @click="addDomain">新增单位</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="项目介绍" name="fourth">
              <el-form
                :label-position="labelPosition"
                label-width="60px"
                :model="editFormLabelAlign"
              >
                <el-form-item label="360°全景地址(url)">
                  <el-input v-model="editFormLabelAlign.panoramicAddressUrl"></el-input>
                </el-form-item>
                <myEditor />
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editProject('formLabelAlign')">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 二维码 -->
        <el-dialog title="二维码" :visible.sync="centerDialogVisible" width="30%" center>
          <div class="demo-image__preview">
            <el-image style="width: 100%; height: 100%" :src="url" :preview-src-list="srcList"></el-image>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-form>
    </div>
    <div class="table_">
      <el-table
        :data="projectModularList"
        text-align="center"
        style="width: 100%"
        :header-cell-style="{background:'#eef1f6',color:'#000'}"
      >
        <el-table-column align="center" show-overflow-tooltip fixed prop="id" label="序号" width="50"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="projectName" label="项目名称"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="projectId" label="项目ID"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="projectLeader" label="项目负责人"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="projectMergerName" label="项目地址"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="projectStatus" label="项目状态"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="createTime" label="起始时间"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="endTime" label="结束时间"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="readOnly(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="updataPro(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="centerDialogVisible = true" type="text" size="small">二维码</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import assembly from "./assembly/assembly";
import ChineseDistricts from "./js/distpicker.data";
import myEditorComponent from "./assembly/quil/quil";
import Qs from "qs";
export default {
  data() {
    return {
      dynamicValidateForm: {
        domains: [
          {
            unitDictCode: "",
            projectId:this.$store.state.projectId
          }
        ],
        email: ""
      },
      onlydynamicValidateForm: {
        domains: [
          {
            unitDictCode: "",
            projectId:this.$store.state.projectId
          }
        ],
        email: ""
      },
      editdynamicValidateForm: {
        domains: [
          {
            unitDictCode: "",
            projectId:this.$store.state.projectId
          }
        ],
        email: ""
      },
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      ],
      mergerAddress: "",
      provinceame: "",
      cityName: "",
      areaName: "",
      numberName: "",
      total: "",
      pageNum: 1,
      pageSize: 5,
      dialogVisibles: false,
      dialogVisible: false,
      centerDialogVisible: false,
      projectModularList: false,
      formInline: {
        user: "",
        region: "",
        projectName: "",
        projectStatus: ""
      },
      tableData: [
        {
          date: "1",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2",
          name:
            "王小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          date: "3",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          date: "4",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ],
      emitname: "",
      dialogFormVisible: false,
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
      formLabelWidth: "120px",
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
      formLabelAlign: {},
      onlyFormLabelAlign: {},
      editFormLabelAlign: {},
      rules: {
        projectName: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        projectDetailAddress: [
          { required: true, message: "请选择地址", trigger: "blur" }
        ],
        pname: [{ required: true, message: "请选择省", trigger: "blur" }],
        bname: [{ required: true, message: "请选择区", trigger: "blur" }],
        cname: [{ required: true, message: "请选择市", trigger: "blur" }],
        projectLeader: [
          { required: true, message: "请填写项目负责人", trigger: "blur" }
        ]
      },
      ChineseDistricts: ChineseDistricts,
      province: [],
      shi1: [],
      qu1: [],
      city: [],
      block: [],
      pname: "", //省的名字
      cname: "", //市的名字
      bname: "", //区的名字
      and: "formLabelAlign",
      mergerAddress: "",
      idProject: "",
      prostatus:[
        {
          value:1,
          labal:'在建'
        },
        {
          value:2,
          labal:'完工'
        },
        {
          value:3,
          labal:'筹备'
        },
        {
          value:4,
          labal:'立项'
        },
        {
          value:5,
          labal:'停工'
        }
      ],
      projectStatus1:[
        {
          value:1,
          labal:'在建'
        },
        {
          value:2,
          labal:'完工'
        },
        {
          value:3,
          labal:'筹备'
        },
        {
          value:4,
          labal:'立项'
        },
        {
          value:5,
          labal:'停工'
        }
      ],
      projectStatus2:[
        {
          value:1,
          labal:'小型'
        },
        {
          value:2,
          labal:'中型'
        },
        {
          value:3,
          labal:'大型'
        }
      ],
      purpose:[
        {
          value:1,
          labal:'居住建筑'
        },
        {
          value:2,
          labal:'居住建筑配置工程'
        },
        {
          value:3,
          labal:'公共建筑'
        },
        {
          value:4,
          labal:'办公建筑'
        },
        {
          value:4,
          labal:'商业建筑'
        },
        {
          value:5,
          labal:'旅游建筑'
        },
        {
          value:6,
          labal:'科教文卫建筑'
        }
      ],
      investment:[
        {
          value:1,
          labal:'政府投资'
        },
        {
          value:2,
          labal:'国有企业投资'
        },
        {
          value:3,
          labal:'非国有企业投资'
        },
        {
          value:4,
          labal:'其他'
        }
      ],
      partUnit:[]
    };
  },
  components: {
    assembly: assembly,
    myEditor: myEditorComponent
  },
  created() {
    this.findAllPartUnit()
    this.clickName();
    this.projectInfoList();
    this.getCityData();
    
  },
  mounted(){
    
  },
  methods: {
    getListStatus(){
      // this.projectModularList.forEach(item=>{
      //     console.log(item)
      //     if(item.projectStatus == '1'){
      //       item.projectStatus='在建'
      //     }else if(item.projectStatus == '2'){
      //       item.projectStatus = '完工'
      //     }else if(item.projectStatus == '3'){
      //       item.projectStatus = '筹备'
      //     }else if(item.projectStatus == '4'){
      //       item.projectStatus = '立项'
      //     }else if(item.projectStatus == '5'){
      //       item.projectStatus = '停工'
      //     }
      //   })
    },
    editProject(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.editFormLabelAlign;
          params.id = this.idProject;
          this.$api.updataProject(params).then(res => {
            console.log(res.data);
            this.dialogFormVisible = false;
            this.projectInfoList();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    },
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
    handleCurrentChange(currentPage3) {
      this.pageNum = currentPage3;
      console.log(currentPage3);
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.projectInfoList(params);
    },
    // 获取参建单位列表
    findAllPartUnit(){
      this.$api.findAllPartUnit().then(res=>{
        this.partUnit = res.data.data
      })
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
    },
    clickName(nameLet) {
      this.emitname = nameLet;
      console.log(this.emitname);
    },
    // 查询项目信息
    searchProject() {
      let params = {
        projectName: this.formInline.projectName,
        projectStatus: this.formInline.projectStatus
      };
      this.$api.searchProject(params).then(res => {
        this.projectModularList = res.data;
        this.getListStatus()
      });
    },
    // 项目信息列表
    projectInfoList(params) {
      // console.log(params)
      params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.$api.projectInfoList(JSON.parse(JSON.stringify(params))).then(res => {
        this.projectModularList = res.data;
        this.total = res.total;
        this.getListStatus()
        
      });
    },
    // 新建项目
    addProject(emitName) {
      this.$refs[emitName].validate(valid => {
        if (valid) {
          this.mergerAddress = `${this.pname}${this.cname}${this.bname}${this.formLabelAlign.projectDetailAddress}`;
          this.formLabelAlign.projectMergerName = this.mergerAddress;
          let params = this.formLabelAlign;
          let data = this.dynamicValidateForm.domains
          this.$api.addProjectInfo(params).then(res => {
            console.log(res);
            if (res.code == 200) {
              this.dialogVisible = false;
              this.$refs['formLabelAlign'].resetFields();
              this.projectInfoList();
            }
          });
          this.$api.addParticipation(...data).then(res=>{
            console.log(res)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    updataPro(row) {
      this.idProject = row.id;
      this.editFormLabelAlign = row;
      this.dialogFormVisible = true;
    },
    // 修改项目细腻
    updataProject() {},
    // 查看项目信息
    readOnly(row) {
      this.dialogVisibles = true;
      console.log(row, "row");
      this.onlyFormLabelAlign = row;
      // this.onlyFormLabelAlign.buildScale = String(row.buildScale)

    },
    onSubmit() {
      console.log("submit!");
    },
    handleClick(row) {
      console.log(row);
    }
  }
};
</script>
<style scoped lang="less">
.home {
  width: 100%;
  height: 840px;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.home_header {
  width: 100%;
  height: 20px;
  line-height: 10px;
  border-bottom: 1px solid #ccc;
}
.search_ {
  width: 100%;
  height: 60px;
  padding: 20px 20px 20px 20px;
  box-sizing: border-box;
  // border:1px solid #ccc;
  .success_ {
    float: right;
    margin-right: 20px;
  }
}
.dynamicForm {
  width: 100%;
  position: relative;
  .dyTitle {
    position: absolute;
    display: inline-block;
    width: 80px;
    height: 40px;
    left: 6%;
    line-height: 40px;
    text-align: center;
  }
  /deep/.el-form-item__content {
    margin-right: 18% !important;
    /deep/.inputDom {
      width: 70%;
      margin-left: 18% !important;
    }
  }
  .btn {
    margin-left: 18%;
  }
}
.table_ {
  flex: 1;
  margin-top: 20px;
}
/deep/.el-dialog {
  /deep/.el-dialog__body {
    padding: 0 20px !important;
  }
}
.dialog_ {
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
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .avatar {
    width: 50px;
    height: 50px;
    display: block;
  }
}
</style>