<template>
  <div class="home">
    <div class="home_header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>环境监测</el-breadcrumb-item>
        <el-breadcrumb-item>现场环境</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="home_main">
      <el-tabs v-model="activeName" lazy="true">
        <el-tab-pane label="扬尘监测" name="first">
          <div class="main_main" v-if="'first' === activeName">
            <div class="home_main_header">
              <div class="home_main_header_left">
                <div class="home_title">实时监测</div>
                <div class="home_echarts">
                  <yiBiao />
                </div>
              </div>
              <div class="home_main_header_right">
                <div class="home_title">
                  预警信息
                  <div class="but">
                    <el-button type="primary" @click="dialogVisible = true" size="small">预警设置</el-button>
                    <el-button type="primary" @click="dialogVisibleLists = true" size="small">
                      更多
                      <i class="el-icon-d-arrow-right"></i>
                    </el-button>
                    <!-- 预警设置 -->
                    <el-dialog
                      title="预警设置"
                      :visible.sync="dialogVisible"
                      width="30%"
                      class="sheZhi"
                      :before-close="handleClose"
                    >
                      <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="PM2.5超标阈值">
                          <el-input v-model="formInline.user" placeholder="75"></el-input>ug/m³
                        </el-form-item>
                        <el-form-item label="PM10超标阈值">
                          <el-input v-model="formInline.user" placeholder="150"></el-input>ug/m³
                        </el-form-item>
                      </el-form>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                      </span>
                    </el-dialog>
                    <!-- 更多 -->
                    <el-dialog
                      title="更多"
                      :visible.sync="dialogVisibleLists"
                      width="60%"
                      class="sheZhi"
                      :before-close="handleClose"
                    >
                      <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="日期">
                          <!-- <div class="block"> -->
                          <el-date-picker
                            v-model="value1"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                          ></el-date-picker>
                          <!-- </div> -->
                        </el-form-item>
                        <el-form-item label="预警状态">
                          <el-select v-model="formInline.region" placeholder="活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item>
                          <el-button type="primary" @click="onSubmit">查询</el-button>
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
                        <el-button @click="dialogVisibleLists = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisibleLists = false">确 定</el-button>
                      </span>
                    </el-dialog>
                  </div>
                </div>
                <div class="home_title_main_footer">
                  <p>
                    2020-05-01 10:30
                    PM2.5=87，请立即启动降尘设备；
                  </p>
                  <p>
                    2020-05-01 10:30
                    PM2.5=87，请立即启动降尘设备；
                  </p>
                  <p>
                    2020-05-01 10:30
                    PM2.5=87，请立即启动降尘设备；
                  </p>
                  <p>
                    2020-05-01 10:30
                    PM2.5=87，请立即启动降尘设备；
                  </p>
                  <p>
                    2020-05-01 10:30
                    PM2.5=87，请立即启动降尘设备；
                  </p>
                </div>
              </div>
            </div>
            <div class="home_main_body">
              <div class="home_title">
                日扬尘统计
                <div class="but">
                  <el-input
                    v-model="formInline.user"
                    style="width:180px; margin-right:12px; display:inline-block;"
                    size="small"
                    placeholder="日期"
                  ></el-input>
                  <el-button type="primary" size="small">查找</el-button>
                </div>
              </div>
              <div class="yang_cheng">
                <yangCen />
              </div>
            </div>
            <div class="home_main_footer">
              <div class="home_title">
                月扬尘统计
                <div class="but">
                  <el-input
                    v-model="formInline.user"
                    style="width:180px; margin-right:12px; display:inline-block;"
                    size="small"
                    placeholder="日期"
                  ></el-input>
                  <el-button type="primary" size="small">查找</el-button>
                </div>
              </div>
              <div class="yang_cheng">
                <yangCenYue />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="噪音监测" name="second">
          <div class="main_main" v-if="'second' === activeName">
            <div class="home_main_header">
              <div class="home_main_header_left">
                <div class="home_title">实时监测</div>
                <div class="home_echarts">
                  <yiBiao />
                </div>
              </div>
              <div class="home_main_header_right">
                <div class="home_title">
                  预警信息
                  <div class="but">
                    <el-button type="primary" @click="seconddialogVisible = true" size="small">预警设置</el-button>
                    <el-button type="primary" @click="seconddialogVisibleLists = true" size="small">
                      更多
                      <i class="el-icon-d-arrow-right"></i>
                    </el-button>
                    <!-- 预警设置 -->
                    <el-dialog
                      title="预警设置"
                      :visible.sync="seconddialogVisible"
                      width="30%"
                      class="sheZhi"
                      :before-close="handleClose"
                    >
                      <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="PM2.5超标阈值">
                          <el-input v-model="formInline.user" placeholder="75"></el-input>ug/m³
                        </el-form-item>
                        <el-form-item label="PM10超标阈值">
                          <el-input v-model="formInline.user" placeholder="150"></el-input>ug/m³
                        </el-form-item>
                      </el-form>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="seconddialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="seconddialogVisible = false">确 定</el-button>
                      </span>
                    </el-dialog>
                    <!-- 更多 -->
                    <el-dialog
                      title="更多"
                      :visible.sync="seconddialogVisibleLists"
                      width="60%"
                      class="sheZhi"
                      :before-close="handleClose"
                    >
                      <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="日期">
                          <!-- <div class="block"> -->
                          <el-date-picker
                            v-model="value1"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                          ></el-date-picker>
                          <!-- </div> -->
                        </el-form-item>
                        <el-form-item label="预警状态">
                          <el-select v-model="formInline.region" placeholder="活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item>
                          <el-button type="primary" @click="onSubmit">查询</el-button>
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
                        <el-button @click="seconddialogVisibleLists = false">取 消</el-button>
                        <el-button type="primary" @click="seconddialogVisibleLists = false">确 定</el-button>
                      </span>
                    </el-dialog>
                  </div>
                </div>
                <div class="home_title_main_footer">
                  <p>
                    2020-05-01 10:30
                    PM2.5=87，请立即启动降尘设备；
                  </p>
                  <p>
                    2020-05-01 10:30
                    PM2.5=87，请立即启动降尘设备；
                  </p>
                  <p>
                    2020-05-01 10:30
                    PM2.5=87，请立即启动降尘设备；
                  </p>
                  <p>
                    2020-05-01 10:30
                    PM2.5=87，请立即启动降尘设备；
                  </p>
                  <p>
                    2020-05-01 10:30
                    PM2.5=87，请立即启动降尘设备；
                  </p>
                </div>
              </div>
            </div>
            <div class="home_main_body">
              <div class="home_title">
                日噪音统计
                <div class="but">
                  <el-input
                    v-model="formInline.user"
                    style="width:180px; margin-right:12px; display:inline-block;"
                    size="small"
                    placeholder="日期"
                  ></el-input>
                  <el-button type="primary" size="small">查找</el-button>
                </div>
              </div>
              <div class="yang_cheng">
                <yangCen />
              </div>
            </div>
            <div class="home_main_footer">
              <div class="home_title">
                月噪音统计
                <div class="but">
                  <el-input
                    v-model="formInline.user"
                    style="width:180px; margin-right:12px; display:inline-block;"
                    size="small"
                    placeholder="日期"
                  ></el-input>
                  <el-button type="primary" size="small">查找</el-button>
                </div>
              </div>
              <div class="yang_cheng">
                <yangCenYue />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="温度监测" name="third">
          <div class="main_main" v-if="'third' === activeName">
            <div class="home_main_header">
              <div class="home_main_header_left">
                <div class="home_title">实时监测</div>
                <div class="home_echarts">
                  <yiBiao />
                </div>
              </div>
              <div class="home_main_header_right">
                <div class="home_title">
                  预警信息
                  <div class="but">
                    <el-button type="primary" @click="thirddialogVisible = true" size="small">预警设置</el-button>
                    <el-button type="primary" @click="thirddialogVisibleLists = true" size="small">
                      更多
                      <i class="el-icon-d-arrow-right"></i>
                    </el-button>
                     <!-- 预警设置 -->
                    <el-dialog
                      title="预警设置"
                      :visible.sync="thirddialogVisible"
                      width="30%"
                      class="sheZhi"
                      :before-close="handleClose"
                    >
                      <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="PM2.5超标阈值">
                          <el-input v-model="formInline.user" placeholder="75"></el-input>ug/m³
                        </el-form-item>
                        <el-form-item label="PM10超标阈值">
                          <el-input v-model="formInline.user" placeholder="150"></el-input>ug/m³
                        </el-form-item>
                      </el-form>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="thirddialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="thirddialogVisible = false">确 定</el-button>
                      </span>
                    </el-dialog>
                    <!-- 更多 -->
                    <el-dialog
                      title="更多"
                      :visible.sync="thirddialogVisibleLists"
                      width="60%"
                      class="sheZhi"
                      :before-close="handleClose"
                    >
                      <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="日期">
                          <!-- <div class="block"> -->
                          <el-date-picker
                            v-model="value1"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                          ></el-date-picker>
                          <!-- </div> -->
                        </el-form-item>
                        <el-form-item label="预警状态">
                          <el-select v-model="formInline.region" placeholder="活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item>
                          <el-button type="primary" @click="onSubmit">查询</el-button>
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
                        <el-button @click="thirddialogVisibleLists = false">取 消</el-button>
                        <el-button type="primary" @click="thirddialogVisibleLists = false">确 定</el-button>
                      </span>
                    </el-dialog>
                  </div>
                </div>
                <div class="home_title_main_footer">
                  <p>
                    2020-05-01 10:30
                    PM2.5=87，请立即启动降尘设备；
                  </p>
                  <p>
                    2020-05-01 10:30
                    PM2.5=87，请立即启动降尘设备；
                  </p>
                  <p>
                    2020-05-01 10:30
                    PM2.5=87，请立即启动降尘设备；
                  </p>
                  <p>
                    2020-05-01 10:30
                    PM2.5=87，请立即启动降尘设备；
                  </p>
                  <p>
                    2020-05-01 10:30
                    PM2.5=87，请立即启动降尘设备；
                  </p>
                </div>
              </div>
            </div>
            <div class="home_main_body">
              <div class="home_title">
                日温度统计
                <div class="but">
                  <el-input
                    v-model="formInline.user"
                    style="width:180px; margin-right:12px; display:inline-block;"
                    size="small"
                    placeholder="日期"
                  ></el-input>
                  <el-button type="primary" size="small">查找</el-button>
                </div>
              </div>
              <div class="yang_cheng">
                <yangCen />
              </div>
            </div>
            <div class="home_main_footer">
              <div class="home_title">
                月温度统计
                <div class="but">
                  <el-input
                    v-model="formInline.user"
                    style="width:180px; margin-right:12px; display:inline-block;"
                    size="small"
                    placeholder="日期"
                  ></el-input>
                  <el-button type="primary" size="small">查找</el-button>
                </div>
              </div>
              <div class="yang_cheng">
                <yangCenYue />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="风速监测" name="fourth">
          <div class="main_main" v-if="'fourth' === activeName">
            <div class="home_main_header">
              <div class="home_main_header_left">
                <div class="home_title">实时监测</div>
                <div class="home_echarts">
                  <yiBiao />
                </div>
              </div>
              <div class="home_main_header_right">
                <div class="home_title">
                  预警信息
                  <div class="but">
                    <el-button type="primary" @click="fourthdialogVisible = true" size="small">预警设置</el-button>
                    <el-button type="primary" @click="fourthdialogVisibleLists = true" size="small">
                      更多
                      <i class="el-icon-d-arrow-right"></i>
                    </el-button>
                     <!-- 预警设置 -->
                    <el-dialog
                      title="预警设置"
                      :visible.sync="fourthdialogVisible"
                      width="30%"
                      class="sheZhi"
                      :before-close="handleClose"
                    >
                      <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="PM2.5超标阈值">
                          <el-input v-model="formInline.user" placeholder="75"></el-input>ug/m³
                        </el-form-item>
                        <el-form-item label="PM10超标阈值">
                          <el-input v-model="formInline.user" placeholder="150"></el-input>ug/m³
                        </el-form-item>
                      </el-form>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="fourthdialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="fourthdialogVisible = false">确 定</el-button>
                      </span>
                    </el-dialog>
                    <!-- 更多 -->
                    <el-dialog
                      title="更多"
                      :visible.sync="fourthdialogVisibleLists"
                      width="60%"
                      class="sheZhi"
                      :before-close="handleClose"
                    >
                      <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="日期">
                          <!-- <div class="block"> -->
                          <el-date-picker
                            v-model="value1"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                          ></el-date-picker>
                          <!-- </div> -->
                        </el-form-item>
                        <el-form-item label="预警状态">
                          <el-select v-model="formInline.region" placeholder="活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item>
                          <el-button type="primary" @click="onSubmit">查询</el-button>
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
                        <el-button @click="fourthdialogVisibleLists = false">取 消</el-button>
                        <el-button type="primary" @click="fourthdialogVisibleLists = false">确 定</el-button>
                      </span>
                    </el-dialog>
                  </div>
                </div>
                <div class="home_title_main_footer">
                  <p>
                    2020-05-01 10:30
                    PM2.5=87，请立即启动降尘设备；
                  </p>
                  <p>
                    2020-05-01 10:30
                    PM2.5=87，请立即启动降尘设备；
                  </p>
                  <p>
                    2020-05-01 10:30
                    PM2.5=87，请立即启动降尘设备；
                  </p>
                  <p>
                    2020-05-01 10:30
                    PM2.5=87，请立即启动降尘设备；
                  </p>
                  <p>
                    2020-05-01 10:30
                    PM2.5=87，请立即启动降尘设备；
                  </p>
                </div>
              </div>
            </div>
            <div class="home_main_body">
              <div class="home_title">
                日风速统计
                <div class="but">
                  <el-input
                    v-model="formInline.user"
                    style="width:180px; margin-right:12px; display:inline-block;"
                    size="small"
                    placeholder="日期"
                  ></el-input>
                  <el-button type="primary" size="small">查找</el-button>
                </div>
              </div>
              <div class="yang_cheng">
                <yangCen />
              </div>
            </div>
            <div class="home_main_footer">
              <div class="home_title">
                月风速统计
                <div class="but">
                  <el-input
                    v-model="formInline.user"
                    style="width:180px; margin-right:12px; display:inline-block;"
                    size="small"
                    placeholder="日期"
                  ></el-input>
                  <el-button type="primary" size="small">查找</el-button>
                </div>
              </div>
              <div class="yang_cheng">
                <yangCenYue />
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import yiBiao from "./jurisdic/edjurisdic";
import yangCen from "./jurisdic/yangCen";
import yangCenYue from "./jurisdic/yangCenYue";
export default {
  components: {
    yiBiao,
    yangCen,
    yangCenYue
  },
  data() {
    return {
      // 预警设置
      dialogVisible: false,
      seconddialogVisible:false,
      thirddialogVisible:false,
      fourthdialogVisible:false,
      // 更多
      dialogVisibleLists: false,
      seconddialogVisibleLists:false,
      thirddialogVisibleLists:false,
      fourthdialogVisibleLists:false,
      value1: "",
      activeName: "first",
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
  methods: {},
  watch: {},
  mounted() {}
};
</script>
<style scoped lang="less">
/deep/.el-form{
  display: inline-block;
  width:100%;
}
.sheZhi {
  /deep/.el-form-item {
  }
  /deep/.el-form-item__content {
    width: 250px;
    /deep/.el-input {
      width: 170px;
      margin-right: 20px;
    }
  }
}
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
    height: 60px;
    padding-top: 10px;
    box-sizing: border-box;
    /deep/.el-form {
      width: 100%;
      height: 60px;
      padding-top: 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
    }
  }
  .home_main_section {
    width: 100%;
    height: 72vh;
    background: #ccc;
    margin-top: 2vh;
    padding: 20px;
    box-sizing: border-box;
  }
}
.home_title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-indent: 1em;
  border-bottom: 1px solid #ccc;
  .but {
    float: right;
    clear: both;
    margin-right: 10px;
  }
}
.main_main {
  width: 100%;
  height: 81vh;
  padding: 20px;
  box-sizing: border-box;
  background: #ccc;
  .home_main_header {
    width: 100%;
    height: 25vh;
    background: #ccc;
    display: flex;
    .home_main_header_left {
      width: 40%;
      height: 100%;
      background: #fff;
      .home_echarts {
        width: 100%;
        height: 80%;
        display: flex;
        flex-direction: row;
        #chart_main {
          width: 50%;
          height: 100%;
          padding-top: 10px;
          box-sizing: border-box;
        }
        #chart_main2 {
          width: 50%;
          height: 100%;
          padding-top: 10px;
          box-sizing: border-box;
        }
      }
    }
    .home_main_header_right {
      width: 59%;
      height: 100%;
      background: #fff;
      margin-left: 12px;
      .home_title_main_footer {
        width: 100%;
        height: 20vh;
        padding: 20px;
        box-sizing: border-box;
        p {
          line-height: 26px;
        }
      }
    }
  }
  .home_main_body {
    width: 100%;
    height: 25vh;
    background: #fff;
    margin-top: 10px;
  }
  .home_main_footer {
    width: 100%;
    height: 25vh;
    background: #fff;
    margin-top: 10px;
  }
}
.yang_cheng {
  width: 100%;
  height: 80%;
  #yangCen {
    width: 100%;
    height: 100%;
    padding-top: 4px;
    box-sizing: border-box;
  }
  #yangCenYue {
    width: 100%;
    height: 100%;
    padding-top: 4px;
    box-sizing: border-box;
  }
}
</style>