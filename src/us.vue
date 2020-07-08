<template>
  <div id="app" class="app-wrapper">
    <el-container>
      <el-header>
        <div class="header_left">睿网智慧工地</div>
        <div class="header_right">
          <i class="el-icon-switch-button"></i>
          <el-dropdown trigger="click">
            <span style="color:#fff; cursor:pointer;" class="el-dropdown-link">{{userName}}</span>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/myProjectInformation">
                <el-dropdown-item class="clearfix">项目信息</el-dropdown-item>
              </router-link>
              <router-link to="/mySwitchItems">
                <el-dropdown-item class="clearfix">切换项目</el-dropdown-item>
              </router-link>
              <router-link to="/myPersonalInformation">
                <el-dropdown-item class="clearfix">个人信息</el-dropdown-item>
              </router-link>
              <router-link to="/myMailList">
                <el-dropdown-item class="clearfix">通讯录</el-dropdown-item>
              </router-link>
              <!-- <el-dropdown-item class="clearfix exit" @click="loginOut">退出</el-dropdown-item> -->
              <el-button id="exit" @click="loginOut">退出</el-button>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container class="cont">
        <el-aside ref="widthSize" :width="isCollapse == true ? 'auto':'10%'">
          <el-row ref="domWidth" style="height:100%">
            <el-col style="height:100%">
              <el-menu
                :default-active="$route.path"
                id="menuClass"
                style="height:100%; overflow:auto;"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                unique-opened="true"
                background-color="#2351AD"
                text-color="#ccc"
                active-text-color="#fff"
                :collapse="isCollapse"
              >
                <i
                  :class="isCollapse==true?'el-icon-s-unfold toggle':'el-icon-s-fold toggle' "
                  @click="toggleCollapse"
                ></i>
                <router-link to="/home">
                  <el-menu-item index="/home">
                    <i class="el-icon-menu CoLoR"></i>
                    <span slot="title">首页</span>
                  </el-menu-item>
                </router-link>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>人员管理</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/employeeInfo">
                      <el-menu-item index="/employeeInfo">员工信息</el-menu-item>
                    </router-link>
                    <router-link to="/approvWorker">
                      <el-menu-item index="/approvWorker">进场审批</el-menu-item>
                    </router-link>
                    <router-link to="/violationRecord">
                      <el-menu-item index="/violationRecord">违章记录</el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>考勤管理</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/attenRecord">
                      <el-menu-item index="/attenRecord">考勤记录</el-menu-item>
                    </router-link>
                    <router-link to="/abnormalRecord">
                      <el-menu-item index="/abnormalRecord">异常记录</el-menu-item>
                    </router-link>
                    <router-link to="/deviceManage">
                      <el-menu-item index="/deviceManage">设备管理</el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>环境监测</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/sceneEnv">
                      <el-menu-item index="/sceneEnv">现场环境</el-menu-item>
                    </router-link>
                    <router-link to="/administration">
                      <el-menu-item index="/administration">设备管理</el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>视频中心</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/videoMonitor">
                      <el-menu-item index="/videoMonitor">视频监控</el-menu-item>
                    </router-link>
                    <router-link to="/vehicleManage">
                      <el-menu-item index="/vehicleManage">车辆管理</el-menu-item>
                    </router-link>
                    <router-link to="/videoManage">
                      <el-menu-item index="/videoManage">设备管理</el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="6">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>安全管理</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/fixedInspection">
                      <el-menu-item index="/fixedInspection">固定巡检</el-menu-item>
                    </router-link>
                    <router-link to="/realTimeInspection">
                      <el-menu-item index="/realTimeInspection">实时检</el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="7">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>工作台</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/taskManager">
                      <el-menu-item index="/taskManager">任务管理</el-menu-item>
                    </router-link>
                    <router-link to="/messageCenter">
                      <el-menu-item index="/messageCenter">消息中心</el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <router-link to="/enterpriseInfo">
                  <el-menu-item index="/enterpriseInfo">
                    <i class="el-icon-menu CoLoR"></i>
                    <span slot="title">企业信息</span>
                  </el-menu-item>
                </router-link>
                <router-link to="/organiStruc">
                  <el-menu-item index="/organiStruc">
                    <i class="el-icon-menu CoLoR"></i>
                    <span slot="title">组织架构</span>
                  </el-menu-item>
                </router-link>
                <router-link to="/projectinfo">
                  <el-menu-item index="/projectinfo">
                    <i class="el-icon-menu CoLoR"></i>
                    <span slot="title">项目信息</span>
                  </el-menu-item>
                </router-link>
                <router-link to="/permision">
                  <el-menu-item index="/permision">
                    <i class="el-icon-menu CoLoR"></i>
                    <span slot="title">权限设置</span>
                  </el-menu-item>
                </router-link>
                <router-link to="/staffManage">
                  <el-menu-item index="/staffManage">
                    <i class="el-icon-menu CoLoR"></i>
                    <span slot="title">员工管理</span>
                  </el-menu-item>
                </router-link>
                <router-link to="/safeEdu">
                  <el-menu-item index="/safeEdu">
                    <i class="el-icon-menu CoLoR"></i>
                    <span slot="title">安全教育</span>
                  </el-menu-item>
                </router-link>
                <router-link to="/funcManage">
                  <el-menu-item index="/funcManage">
                    <i class="el-icon-menu CoLoR"></i>
                    <span slot="title">功能管理</span>
                  </el-menu-item>
                </router-link>
                <router-link to="/dictionary">
                  <el-menu-item index="/dictionary">
                    <i class="el-icon-menu CoLoR"></i>
                    <span slot="title">数据字典</span>
                  </el-menu-item>
                </router-link>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main style="height:100%">
          <transition mode="out-in" class="Router" :name="transitionName">
            <keep-alive include="home">
              <router-view class="child-view"></router-view>
            </keep-alive>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      transitionName: "slide-left",
      collapsed: false,
      activerouter: 1,
      isCollapse: true,
      userName: ""
    };
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-right";
      }
    }
  },
  methods: {
    // 退出登录
    loginOut() {
      let that = this;
      Cookies.remove("token");
      that.$router.replace("/");
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    collapse() {
      this.collapsed = !this.collapsed;
      var menuWidth = document.getElementById("menuClass");
      if (menuWidth.offsetWidth === 0) {
        menuWidth.style.width = "230px";
      }
    },
    toggleCollapse() {
      console.log(123456789);
      if (this.isCollapse == true) {
        this.isCollapse = false;
        this.$refs["widthSize"].className = "side_side";
        return;
      } else {
        this.isCollapse = true;
        this.$refs["widthSize"].className = "side_side";
        return;
      }
    }
  },
  created() {},
  mounted() {
    let storage = window.sessionStorage;
    this.userName = storage.getItem("name");
  }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
body,
html {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app,
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
.side_side {
  width: 200px !important;
}
.app-wrapper {
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.el-header,
.el-footer {
  background-color: #2457bc;
  color: #333;
  line-height: 60px;
}
.header_left {
  width: 200px;
  height: 100%;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  float: left;
}
.toggle {
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  width: 100%;
  text-align: center;
  background: #2351ad;
  line-height: 30px;
  box-sizing: border-box;
}
.CoLoR {
  color: #fff;
}
/deep/.router-link-exact-active {
  background: red !important;
}
/deep/.el-menu-item {
  box-sizing: border-box;
  i {
    // color: #fff !important;
  }
}
.el-submenu__title {
  i {
    // color: #fff;
  }
}
/deep/.is-active {
  background: red !important;
}
.el-menu-item-group {
  box-sizing: border-box;
  ul {
    box-sizing: border-box;
    li {
      text-indent: 20px;
      box-sizing: border-box;
    }
    .is-active {
      background: #446bb9 !important;
      border-left: 4px solid #b2ccff;
      box-sizing: border-box !important;
    }
  }
}
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
/deep/.el-menu-item.is-active {
  background-color: rgb(231, 235, 240) !important;
}
.header_right {
  width: 200px;
  height: 100%;
  float: right;
  margin-right: 12px;
  text-align: end;
  color: #fff;
}
.isbtn {
  width: 100%;
  height: 40px;
  line-height: 30px;
  text-align: center;
}
.el-icon-switch-button {
  margin-right: 12px;
  color: #fff;
}
/deep/.el-aside {
  /* background-color: rgb(84, 92, 100); */
  color: #b2b6bf;
  /* text-align: center; */
  height: 0 !important;
  padding-bottom: 30px;
  box-sizing: border-box;
  overflow-y: auto;
}
// /deep/.el-menu-vertical-demo:not(.el-menu--collapse) {
//     width: 200px !important;
//     min-height: 400px !important;
//   }
.el-main {
  background-color: #fff;
  color: #333;
  width: 100%;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
/deep/.el-menu-vertical-demo .el-menu {
  width: 200px !important;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
/* .slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(0, 0, -100%);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(0, 0, 100%);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(0, 0, 100%);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(0, 0, -100%);
} */
.Router {
  position: relative;
}
.Router > * {
  position: absolute;
  width: 100%;
  text-align: center;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
}

.slide-right-enter {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-enter {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translateX(-100%);
}
#exit {
  width: 100%;
  border: none;
  outline: none;
  display: flex;
  justify-content: flex-start;
}
/deep/.el-menu {
  /deep/.el-menu-item-group {
    ul {
      background: #fff;
    }
    /deep/.el-menu-item-group__title {
      padding: 0px !important;
    }
  }
}
</style>
