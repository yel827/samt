<template>
  <div class="chatr">
    <div id="chart_main"></div>
    <div id="chart_main2"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    getEcharts() {
      let that = this;
      let myChart = that.$echart.init(document.getElementById("chart_main"));
      let myChart1 = that.$echart.init(document.getElementById("chart_main2"));
      // let myChartone = that.$echart.init(document.getElementById("chart_main_one"));
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
      // myChartone.setOption(option)
      setInterval(function() {
        option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        myChart.setOption(option, true);
        myChart1.setOption(option, true);
        // myChartone.setOption(option,true)
      }, 2000);
    },
  },
  mounted() {
    this.getEcharts();
  }
};
</script>
<style lang="less" scoped>
.chatr{
  width:100%;
  height:100%;
  display: flex;
  flex-direction: row;
}
#chart_main {
  flex:0.5;
  padding-top: 10px;
  box-sizing: border-box;
}
#chart_main2 {
  flex:0.5;
  padding-top: 10px;
  box-sizing: border-box;
}
</style>