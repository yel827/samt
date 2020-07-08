<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="header_left">{{$t('login.systemName')}}</div>
        <div class="header_right">
          <i class="el-icon-switch-button"></i>
          <el-dropdown trigger="click">
            <span style="color:#fff; cursor:pointer;" class="el-dropdown-link">{{userName}}</span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item class="clearfix exit" @click="loginOut">退出</el-dropdown-item> -->
              <el-button id="exit" @click="loginOut">退出</el-button>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <div class="home_center">
        <el-input
          placeholder="请输入查找的内容"
          size="small"
          prefix-icon="el-icon-search"
          v-model="input"
          clearable
        ></el-input>
        <el-button type="primary" @click="seacrhProjectList" class="bbtn" size="small">查找</el-button>
      </div>
      <el-main>
        <el-row>
          <el-col class="col_main" v-for="(item,index) in projectlist" :key="index">
            <div class="header_title">{{item.menuName}}</div>
            <div class="header_main">
              <div class="header_main_left">
                <div>
                  <p>
                    <span>项目ID：</span>
                    <span>{{item.id}}</span>
                  </p>
                  <p>
                    <span>负责人：</span>
                    <span>{{item.operator}}</span>
                  </p>
                  <p>
                    <span>起始日期：</span>
                    <span>{{item.createTime}}</span>
                  </p>
                  <p>
                    <span>结束日期：</span>
                    <span>{{item.updateTime}}</span>
                  </p>
                </div>
              </div>
              <div class="header_main_right">
                <i class="el-icon-video-play" @click="submit(item)"></i>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      userName: "",
      input: "",
      projectlist: ""
    };
  },
  methods: {
    // 退出登录
    loginOut() {
      let that = this;
      Cookies.remove("token");
      that.$router.replace("/");
    },
    seacrhProjectList() {
      let params = {
        projectName: this.input
      };
      this.$api.seacrhProjectList(params).then(res => {
        this.projectlist = res.data;
      });
    },
    submit(row) {
      this.$router.push("/us");
      this.$store.commit("projectId", row.id);
    },
    projectModular() {
      this.$api.projectModular().then(res => {
        this.projectlist = res.data;
        console.log(this.projectlist, "this.projectlist");
      });
    }
  },
  created() {
    // this.submit_();
    this.projectModular();
  },
  mounted() {
    let storage = window.sessionStorage;
    this.userName = storage.getItem("name");
  }
};
</script>
<style lang="less" scoped>
#app,
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #2357bb;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  line-height: 200px;
}

.el-main {
  background-color: #fff;
  color: #fff;
  height: 85vh;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.header_left {
  width: auto;
  height: 100%;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  float: left;
}
.header_right {
  width: 200px;
  height: 100%;
  float: right;
  margin-right: 12px;
  text-align: end;
  color: #fff;
}
.home_center {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #ccc;
  padding-top: 20px;
  padding-left: 20px;
  box-sizing: border-box;
}
/deep/.el-input {
  width: 240px;
}
/deep/.el-row {
  width: 100%;
  height: 100%;
  /deep/.el-col {
    width: 20%;
    height: 30%;
    margin-right: 2%;
    border: 1px solid #ccc;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .header_title {
      width: 100%;
      height: 40px;
      background: #67c23a;
      text-indent: 20px;
      line-height: 40px;
      color: #fff;
      font-size: 16px;
    }
    .header_main {
      flex: 1;
      display: flex;
      flex-direction: row;
      .header_main_left {
        width: 70%;
        height: 100%;
        padding-top: 20px;
        box-sizing: border-box;
        p {
          line-height: 28px;
          padding-left: 20px;
          box-sizing: border-box;
          color: #000;
          font-size: 14px;
          :first-child {
            display: inline-block;
            width: 80px;
            text-align: right;
          }
        }
      }
      .header_main_right {
        width: 30%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .el-icon-video-play {
          font-size: 40px;
          color: #67c23a;
        }
      }
    }
  }
}
.bbtn {
  background: #2357bb;
  border: none;
}
#exit {
  width: 100%;
  border: none;
  outline: none;
  display: flex;
  justify-content: flex-start;
}
.col_main {
  margin-top: 20px;
}
</style>