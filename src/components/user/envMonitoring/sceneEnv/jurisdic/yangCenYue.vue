<template>
  <div class="chatr">
    <div id="yangCenYue"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    getYangCenYue() {
      let that = this;
      let myChart_s2 = that.$echart.init(document.getElementById("yangCenYue"));
      var year = [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
      ];
      var stu = [
        96.3,
        96.4,
        97.5,
        95.6,
        35.1,
        45.8,
        66.6,
        70.1,
        80.1,
        52.4,
        75.8,
        94.7
      ];
      var group = [
        97.3,
        99.2,
        99.3,
        100.0,
        99.6,
        90.6,
        80.0,
        91.5,
        69.8,
        67.5,
        90.4,
        84.9
      ];
      let option2 = {
        backgroundColor: "#fff",
        title: {
          text: "扬尘",
          textStyle: {
            fontWeight: "normal",
            fontSize: 16,
            color: "#333"
          },
          left: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#999"
            }
          }
        },
        legend: {
          icon: "rect",
          itemWidth: 30,
          itemHeight: 2,
          itemGap: 13,
          orient: "inside",
          data: ["扬尘PM2.5", "扬尘PM10"],
          right: "4%",
          textStyle: {
            fontSize: 12,
            color: "#666"
          },
          selectedMode: false
        },
        grid: {
          left: "4%",
          right: "14%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: "#333333"
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#e4e4e4"
              }
            },
            axisTick: {
              show: false
            },
            data: year
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#333333"
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14
              }
            },
            splitLine: {
              show:false,
              lineStyle: {
                color: "#e4e4e4"
              }
            }
          }
        ],
        series: [
          {
            name: "扬尘PM2.5",
            type: "line",
            showSymbol: false,
            smooth: false,
            lineStyle: {
              normal: {
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new that.$echart.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(255, 142, 9, 0.3)"
                    },
                    {
                      offset: 0.8,
                      color: "rgba(255, 142, 9, 0)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: "#ff8d07"
              }
            },
            markLine: {
              //数据标准线
              data: [
                {
                  name: "", //数值名称
                  yAxis: 80 //数值大小
                }
              ],
              label: {
                normal: {
                  show: true, //是否显示数值
                  formatter: "PM2.5"
                }
              },
              lineStyle: {
                normal: {
                  color: "#ff8d07", //标准线颜色
                  width: 1 //标准线宽度
                },
                emphasis: {
                  width: 1
                }
              }
            },
            data: stu
          },
          {
            name: "扬尘PM10",
            type: "line",
            showSymbol: false,
            smooth: false,
            lineStyle: {
              normal: {
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new that.$echart.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(19, 162, 252, 0.3)"
                    },
                    {
                      offset: 0.8,
                      color: "rgba(19, 162, 252, 0)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: "#029bfc"
              }
            },
            markLine: {
              //数据标准线
              data: [
                {
                  name: "", //数值名称
                  yAxis: 60 //数值大小
                }
              ],
              label: {
                normal: {
                  show: true, //是否显示数值
                  formatter: "PM10"
                }
              },
              lineStyle: {
                normal: {
                  color: "#009cec", //标准线颜色
                  width: 1 //标准线宽度
                },
                emphasis: {
                  width: 1
                }
              }
            },
            data: group
          }
        ]
      };
      myChart_s2.setOption(option2);
    }
  },
  mounted() {
    this.getYangCenYue();
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
#yangCenYue {
    width: 100%;
    height: 100%;
    padding-top:4px;
    box-sizing: border-box;
  }
</style>