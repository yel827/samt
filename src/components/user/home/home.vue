<template>
  <div class="home">
    <div class="home_header">中国电信5G项目</div>
    <div class="home_time">
      <span class="home_today">安全运行天数8天</span>
      <span class="home_time_time">2020-05-07 10:33</span>
    </div>
    <div class="home_detailed">
      <p style="text-indent:10px;">
        项目总人数:
        <span style="color:blue;">1286</span>人
      </p>
      <p>
        今日出勤:
        <span style="color:blue;">1286</span>人
      </p>
      <p>
        今日进场:
        <span style="color:blue;">1286</span>人
      </p>
      <p>
        今日退场:
        <span style="color:blue;">1286</span>人
      </p>
    </div>
    <div class="home_title">环境监测</div>
    <div class="home_echarts">
      <div id="chart_main"></div>
      <div id="chart_main2"></div>
      <div id="chart_main3"></div>
      <div id="chart_main4"></div>
      <div id="chart_main5"></div>
    </div>
    <div class="home_title">天气预报</div>
    <div class="home_weather">
      <div class="home_weather_list" v-for="(item,index) in listweater" :key="index">
        <p>{{item.week}}</p>
        <p><span class="iconfont icon-xiaoyu"></span></p>
        <p>{{item.weat}}</p>
        <p>{{item.dusi}}</p>
      </div>
    </div>
    <div class="early">
      <div class="early_warning">
        <div class="home_title">预警信息</div>
        <div class="waring_main">
          <p>【环境预警】2020-05-01 10:30   PM2.5=87，中度超标。</p>
          <p>【环境预警】2020-05-01 10:30   温度=34，中度超标。</p>
        </div>
      </div>
      <div class="fault_information">
        <div class="home_title">故障信息</div>
        <div class="information_main">
          <p>
            <span>【故障上报】张三   2020-03-05  10:30</span>
            <span>【故障描述】C座东侧3层户外安全网松动</span>
          </p>
          <p>
            <span>【故障上报】张三   2020-03-05  10:30</span>
            <span>【故障描述】C座东侧3层户外安全网松动</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listweater:[
        {
          week:'05-07(星期四)',
          weat:'小雨',
          dusi:'21°C-29°C'
        },
        {
          week:'05-07(星期四)',
          weat:'小雨',
          dusi:'21°C-29°C'
        },
        {
          week:'05-07(星期四)',
          weat:'小雨',
          dusi:'21°C-29°C'
        },
        {
          week:'05-07(星期四)',
          weat:'小雨',
          dusi:'21°C-29°C'
        },
        {
          week:'05-07(星期四)',
          weat:'小雨',
          dusi:'21°C-29°C'
        },
        {
          week:'05-07(星期四)',
          weat:'小雨',
          dusi:'21°C-29°C'
        },
        {
          week:'05-07(星期四)',
          weat:'小雨',
          dusi:'21°C-29°C'
        }
      ]
    };
  },
  methods: {
    getEcharts() {
      let that = this;
      let myChart = that.$echart.init(document.getElementById("chart_main"));
      let myChart1 = that.$echart.init(document.getElementById("chart_main2"));
      let myChart2 = that.$echart.init(document.getElementById("chart_main3"));
      let myChart3 = that.$echart.init(document.getElementById("chart_main4"));
      let myChart4 = that.$echart.init(document.getElementById("chart_main5"));
      let option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            radius: "100%",
            detail: {
              textStyle: {
                fontSize: 14
              },
              formatter: "{value}%"
            },
            data: [
              {
                value: 50,
                name: "完成率"
              }
            ],
            // grid: {
            //   top: "2px",
            //   left: "2px",
            //   right: "2px",
            //   bottom: "20px"
            // },
            axisLine: {
              show: true,
              lineStyle: {
                width: 10,
                height: 10,
                color: [
                  [
                    1,
                    new this.$echart.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0.1,
                        color: "#FFC600"
                      },
                      {
                        offset: 0.6,
                        color: "#30D27C"
                      },
                      {
                        offset: 1,
                        color: "#0B95FF"
                      }
                    ])
                  ]
                ]
              }
            }
          }
        ]
      };
      myChart.setOption(option);
      myChart1.setOption(option);
      myChart2.setOption(option);
      myChart3.setOption(option);
      myChart4.setOption(option);
      setInterval(function() {
        option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        myChart.setOption(option, true);
        myChart1.setOption(option, true);
        myChart2.setOption(option, true);
        myChart3.setOption(option, true);
        myChart4.setOption(option, true);
      }, 2000);
    }
  },
  mounted() {
    this.getEcharts();
  }
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 89vh;
  background: #fff;
  .home_header {
    width: 100%;
    height: 50px;
    background: #ccc;
    line-height: 50px;
    font-size: 20px;
    text-align: center;
    font-weight: bold;
  }
  .home_time {
    width: 100%;
    height: 30px;
    margin-top: 10px;
    .home_today {
      display: inline-block;
      width: auto;
      height: 100%;
      line-height: 30px;
      color: blue;
      font-weight: bolder;
      text-indent: 12px;
    }
    .home_time_time {
      float: right;
      clear: both;
      line-height: 30px;
    }
  }
  .home_detailed {
    width: 100%;
    height: 30px;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    line-height: 30px;
  }
  .home_title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #ccc;
    text-indent: 12px;
  }
  .home_echarts {
    width: 100%;
    height: 220px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    #chart_main {
      width: 20%;
      height: 220px;
      padding-top: 10px;
      box-sizing: border-box;
    }
    #chart_main2 {
      width: 20%;
      height: 220px;
      padding-top: 10px;
      box-sizing: border-box;
    }
    #chart_main3 {
      width: 20%;
      height: 220px;
      padding-top: 10px;
      box-sizing: border-box;
    }
    #chart_main4 {
      width: 20%;
      height: 220px;
      padding-top: 10px;
      box-sizing: border-box;
    }
    #chart_main5 {
      width: 20%;
      height: 220px;
      padding-top: 10px;
      box-sizing: border-box;
    }
  }
  .home_weather{
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: row;
    .home_weather_list{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p{
        margin-top:6px;
      }
      .icon-xiaoyu{
        font-size:30px;
      }
    }
  }
  .early{
    width:100%;
    height:220px;
    display: flex;
    flex-direction: row;
    .early_warning{
      width:49%;
      height:100%;
      border:1px solid #ccc;
      .waring_main{
        width:100%;
        height:180px;
        p{
          text-indent: 4em;
          line-height: 35px;
        }
      }
    }
    .fault_information{
      width:51%;
      height:100%;
      margin-left:10px;
      border:1px solid #ccc;
      .information_main{
        width:100%;
        height:180px;
        p{
          text-indent: 4em;
          line-height: 35px;
        }
      }
    }
  }
}
</style>