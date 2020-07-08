<template>
  <div class="home">
    <div class="home_header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>视频中心</el-breadcrumb-item>
        <el-breadcrumb-item>视频监控</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="home_main">
      <div class="videoMain">
        <div class="video-center">
          <div class="container">
            <div class="player">
              <video-player
                class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
              ></video-player>
            </div>
          </div>
        </div>
      </div>
      <div class="listMain">
        <div class="listMainTop">
          <p class="listMainToptitle">监控列表</p>
          <div class="liets" v-for="(item,index) in listData" :key="index">
            <i class="el-icon-discount"></i>
            {{item.name}}
            <span class="listsF"></span>
          </div>
          <div class="block">
            <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
          </div>
        </div>
        <div class="listMainBut">
          <el-form>
            <el-form-item label="布局">
              <el-select v-model="videoa">
                <el-option
                  v-for="item in video1"
                  :key="item.value"
                  :label="item.labal"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="清晰度">
              <el-select v-model="videob">
                <el-option
                  v-for="item in video2"
                  :key="item.value"
                  :label="item.labal"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="轮播间隔">
              <el-select v-model="videoc">
                <el-option
                  v-for="item in video3"
                  :key="item.value"
                  :label="item.labal"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import videotap from './staff_list/demo/cn/demo'
// import '@components/staff/staff_list/demo/codebase/webVideoCtrl.js'
// import '@components/staff/staff_list/demo/jquery-1.7.1.min.js'
// import '@components/staff/staff_list/demo/cn/demo.js'
// import vide from './staff_list/demo/cn/demo.html'
import videos from "./staff_list/videos/videos";
import "./staff_list/demo/demo.css";

export default {
  data() {
    return {
      videoa: 1,
      videob: 1,
      videoc: 1,
      video1: [
        { value: 1, labal: "2X2" },
        { value: 2, labal: "3X3" },
        { value: 3, labal: "4X4" }
      ],
      video2: [
        { value: 1, labal: "超清" },
        { value: 2, labal: "标清" },
      ],
      video3: [
        { value: 1, labal: "无" },
        { value: 2, labal: "30" },
        { value: 3, labal: "60" },
        { value: 4, labal: "90" },
        { value: 5, labal: "120" }
      ],
      playerOptions: {
        //playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "application/x-mpegURL",
            src: "http://21810.liveplay.myqcloud.com/live/21810_ea70a9e139.m3u8" //你的m3u8地址（必填）
          }
        ],
        poster: "poster.jpg", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试" //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        //  controlBar: {
        //   timeDivider: true,
        //   durationDisplay: true,
        //   remainingTimeDisplay: false,
        //   fullscreenToggle: true //全屏按钮
        //  }
      },
      url2: "",
      listData: [
        { name: "东大门监控" },
        { name: "西大门监控" },
        { name: "北大门监控" },
        { name: "南大门监控" },
        { name: "上大门监控" },
        { name: "下大门监控" }
      ],
      value: 1,
      g_iWndIndex: 0, //当前选中的窗口
      g_bPTZAuto: false,
      pumpRoomName: "",
      cameraArray: [],
      webVideo: {},
      iWidth: 800,
      iHeight: 600,
      iProtocol: 1,
      szIP: "10.0.3.187",
      szPort: "80",
      szUsername: "admin",
      szPassword: "1111",
      iStreamType: 1,
      bZeroChannel: false,
      maskData: {
        maskShow: false,
        title: "提示",
        content: "失败",
        cancel: false
      }
    };
  },
  components: {
    // videoPlayer
  },
  methods: {},
  mounted() {
    this.url2 =
      "http://file:///C:/Users/Administrator/Desktop/case/case/intelligent-web/src/components/user/videoCenter/videoMonitor/staff_list/demo/cn/demo.html";
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
  .home_one {
    width: 100%;
    height: 840px;
    background: #fff;
    display: flex;
    flex-direction: column;
  }
}
.home_header {
  width: 100%;
  height: 40px;
  line-height: 10px;
  padding-bottom: 14px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
}
.home_main {
  width: 100%;
  height: 89vh;
  background: #fff;
  padding-top: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  .videoMain {
    width: 84%;
    height: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .video-center {
      width: 84%;
      height: 100%;
    }
  }
  .listMain {
    width: 16%;
    height: 99%;
    background: #ebeef5;
    .listMainTop {
      width: 100%;
      height: 66%;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      position: relative;
      .listMainToptitle {
        width: 100%;
        height: 60px;
        line-height: 60px;
        text-indent: 14px;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;
      }
      .liets {
        width: 100%;
        height: 40px;
        padding: 20px 20px 0px 30px;
        box-sizing: border-box;
        .el-icon-discount {
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          font-size: 20px;
          color: #409eff;
        }
        .listsF {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 10px;
          background: red;
          margin-left: 10px;
        }
      }
      .block {
        position: absolute;
        bottom: 0;
        width: 100%;
        background: none;
        width: 90%;
        box-sizing: border-box;
        /deep/.el-pagination {
          background: #ebeef5;
          /deep/.btn-prev {
            background: #ebeef5;
            padding-right: 0px;
            box-sizing: border-box;
          }
          /deep/.btn-next {
            background: #ebeef5;
            padding-left: 0px;
            box-sizing: border-box;
          }
          /deep/.el-pager .number {
            background: #ebeef5;
          }
        }
      }
    }
    .listMainBut {
      width: 100%;
      height: 34%;
      padding: 0px 20px 20px 20px;
      box-sizing: border-box;
      display: flex;
      .el-form {
        flex: 1;
        display: flex;
        flex-direction: column;
        .el-form-item {
          flex: 1;
          margin: 0;
          padding: 0;
          background: none;
          .el-input {
            background: none;
          }
        }
      }
    }
  }
}
</style>