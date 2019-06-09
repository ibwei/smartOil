<template>
  <div class="graph-container">
    <div class="list-one">
      <div id="graphOne"></div>
    </div>
    <div class="list-two">
      <div id="graphTwo"></div>
    </div>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
import timeUtils from "../utils/timeFormat";
export default {
  props: {},
  components: {},
  data() {
    return {
      currentTime: null,
      myChart1: null,
      myChart2: null,
      graphOneOption: {
        title: {
          text: "温度时间变化表",
          textStyle: {
            color: "#fff",
            fontSize: 20,
            fontWeight: "normal"
          }
        },
        tooltip: {
          trigger: "axis",
          trigger: "yxis"
        },
        legend: {
          data: ["温度", "时间"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
          show: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          nameTextStyle: { color: "white" },
          boundaryGap: false,
          data: ["16:10", "16:11", "16:12", "16:13", "16:14", "16:15", "16:16"],
          nameTextStyle: { color: "white", fontSize: 16 },
          axisLabel: {
            color: "#fff"
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#aaa", "#ddd"],
              type: "dashed"
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff",
              type: "solid"
            }
          },
          name: "时间"
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: "#fff"
          },

          boundaryGap: true,
          nameTextStyle: { color: "white", fontSize: 16 },
          name: "温度",
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#aaa", "#ddd"],
              type: "dashed"
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff",
              type: "solid"
            }
          }
        },
        series: [
          {
            name: "温度",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: true,
            lineStyle: {
              color: "red"
            }
          }
        ]
      },
      graphOneOption1: {
        title: {
          text: "湿度时间变化表",
          textStyle: {
            color: "#fff",
            fontSize: 20,
            fontWeight: "normal"
          }
        },
        tooltip: {
          trigger: "axis",
          trigger: "yxis"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["16:10", "16:11", "16:12", "16:13", "16:14", "16:15", "16:16"],
          axisLabel: {
            color: "#fff"
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#aaa", "#ddd"],
              type: "dashed"
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff",
              type: "solid"
            }
          }
        },
        yAxis: {
          name: "湿度",
          type: "value",
          axisLabel: {
            color: "#fff"
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#aaa", "#ddd"],
              type: "dashed"
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff",
              type: "solid"
            }
          },
          nameTextStyle: { color: "white", fontSize: 16 }
        },
        series: [
          {
            name: "温度",
            type: "line",
            stack: "°",
            data: [30, 122, 21, 214, 90, 130, 220],
            smooth: true,
            lineStyle: {
              color: "lightblue"
            }
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    //初始化表,使用echarts
    initGraph() {
      this.myChart1 = echarts.init(document.getElementById("graphOne"));
      this.myChart1.setOption(this.graphOneOption);
      this.myChart2 = echarts.init(document.getElementById("graphTwo"));
      this.myChart2.setOption(this.graphOneOption1);
    }
  },
  created() {},
  mounted() {
    this.initGraph();
    let time = new timeUtils();
    let timer1 = setInterval(() => {
      this.currentTime = time.getHourTime();
    }, 1000);
  },
  watch: {
    //每秒刷新一次图标,只能模拟变化,每次温差变化不大于20
    currentTime() {
      this.graphOneOption.xAxis.data.shift();
      this.graphOneOption.xAxis.data.push(this.currentTime);
      this.graphOneOption.series[0].data.shift();
      let degree =
        this.graphOneOption.series[0].data[
          this.graphOneOption.series[0].data.length - 1
        ] +
        Math.floor(Math.random() * 40) -
        20;
      if (degree > 300) {
        degree = 300;
      } else if (degree < 0) {
        degree = 0;
      }
      this.graphOneOption.series[0].data.push(degree);

      this.graphOneOption1.xAxis.data.shift();
      this.graphOneOption1.xAxis.data.push(this.currentTime);
      this.graphOneOption1.series[0].data.shift();
      let degree1 =
        this.graphOneOption1.series[0].data[
          this.graphOneOption1.series[0].data.length - 1
        ] +
        Math.floor(Math.random() * 40) -
        20;
      if (degree1 > 250) {
        degree1 = 250;
      } else if (degree1 < 0) {
        degree1 = 0;
      }
      this.graphOneOption1.series[0].data.push(degree1);

      this.initGraph();
    }
  }
};
</script>
<style scoped lang="">
.graph-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.list-one {
  background: #0c1730;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 3px 3px 16px rgba(0, 0, 0, 0.6);
}

.list-two {
  margin-top: 20px;
  background: #0c1730;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 3px 3px 16px rgba(0, 0, 0, 0.9);
}
#graphOne,
#graphTwo {
  width: 350px;
  height: 350px;
}

@media screen and (max-width: 720px) {
  #graphOne,
  #graphTwo {
    width: 300px;
    height: 300px;
  }

  .graph-container {
    box-sizing: border-box;
    margin-top: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .list-one {
    box-sizing: border-box;
    background: rgba(37, 77, 122, 0.1);
    border-radius: 4px;
    padding: 20px;
    box-shadow: 3px 3px 16px rgba(0, 0, 0, 0.6);
  }

  .list-two {
    box-sizing: border-box;
    margin-top: 20px;
    background: rgba(37, 77, 122, 0.1);
    border-radius: 4px;
    padding: 20px;
    box-shadow: 3px 3px 16px rgba(0, 0, 0, 0.6);
  }
}
</style>