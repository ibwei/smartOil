<template>
  <div class="app">
    <div class="breakdown">
      <div class="g-graph">
        <div id="gis-graph"></div>
      </div>
      <div class="g-menulist">
        <Form :label-width="100">
          <FormItem label="油田ID">
            <Input v-model="formItem.oilId" placeholder="请输入油田ID"></Input>
          </FormItem>
          <FormItem label="日期选择">
            <Row>
              <Col span="11">
                <DatePicker
                  type="date"
                  placeholder="选择日期"
                  v-model="formItem.date"
                  @on-change="getSearchDate"
                ></DatePicker>
              </Col>
              <Button type="primary" style="margin-left:8px;" @click="searchOil">确定</Button>
            </Row>
          </FormItem>
          <FormItem label="轮次">
            <Button type="primary" @click="fetchPreData">上一轮</Button>
            <Button style="margin-left: 8px" @click="fetchNextData">下一轮</Button>
            <Button type="primary" style="margin-left: 8px" @click="cancelLoop">暂停</Button>
            <Button type="success" style="margin-left: 8px" @click="play" :disabled="isPlay">继续播放</Button>
          </FormItem>
          <FormItem label="监控">
            <Button type="error">报警</Button>
            <Button style="margin-left: 8px" type="default" @click="toHistory">历史记录</Button>
          </FormItem>
        </Form>
      </div>
      <i-dialog :isShow="dialogShow" :width="dialogWidth" @on-close="closeDialog">
        <table class="t-table">
          <h3>示功图历史记录</h3>
          <thead class="t-tr">
            <th>数据1</th>
            <th>数据1</th>
            <th>数据1</th>
            <th>数据1</th>
            <th>数据1</th>
            <th>数据1</th>
            <th style="width:120px">操作</th>
          </thead>
          <tr class="t-tr" v-for="(item,index) of tableData" :key="index">
            <td>{{item.first}}</td>
            <td>{{item.secound}}</td>
            <td>{{item.third}}</td>
            <td>{{item.fourth}}</td>
            <td>{{item.fifth}}</td>
            <td>{{item.sixth}}</td>
            <td style="width:120px;">
              <Button type="info" @click="toDetail(index)">查看</Button>
              <Button type="error" @click="toDelete(index)">删除</Button>
            </td>
          </tr>
        </table>
      </i-dialog>
    </div>
  </div>
</template>

<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/radar");

import iDialog from "../../components/dialog";
var data1 = [
  [0, 0],
  [0.25, 25],
  [0.75, 50],
  [1, 75],
  [2, 75],
  [2.5, 75],
  [3, 75],
  [3.5, 75],
  [4, 75],
  [3.5, 50],
  [3, 25],
  [2.5, 0],
  [2, 0],
  [1, 0],
  [0, 0]
];
export default {
  components: {
    iDialog
  },
  data() {
    return {
      isPlay: true,
      //定义循环执行的标志
      interval: null,
      //渲染图标的数据
      graphDataList: [],
      currentIndex: 0,

      formItem: {
        date: new Date(),
        oilId: ""
      },
      dialogWidth: "100%",
      dialogShow: false,
      //表单数据
      tableData: [
        {
          first: "数据1",
          secound: "数据2",
          third: "数据3",
          fourth: "数据4",
          fifth: "数据5",
          sixth: "数据6"
        },
        {
          first: "数据1",
          secound: "数据2",
          third: "数据3",
          fourth: "数据4",
          fifth: "数据5",
          sixth: "数据6"
        },
        {
          first: "数据1",
          secound: "数据2",
          third: "数据3",
          fourth: "数据4",
          fifth: "数据5",
          sixth: "数据6"
        },
        {
          first: "数据1",
          secound: "数据2",
          third: "数据3",
          fourth: "数据4",
          fifth: "数据5",
          sixth: "数据6"
        },
        {
          first: "数据1",
          secound: "数据2",
          third: "数据3",
          fourth: "数据4",
          fifth: "数据5",
          sixth: "数据6"
        },
        {
          first: "数据1",
          secound: "数据2",
          third: "数据3",
          fourth: "数据4",
          fifth: "数据5",
          sixth: "数据6"
        },
        {
          first: "数据1",
          secound: "数据2",
          third: "数据3",
          fourth: "数据4",
          fifth: "数据5",
          sixth: "数据6"
        },
        {
          first: "数据1",
          secound: "数据2",
          third: "数据3",
          fourth: "数据4",
          fifth: "数据5",
          sixth: "数据6"
        },
        {
          first: "数据1",
          secound: "数据2",
          third: "数据3",
          fourth: "数据4",
          fifth: "数据5",
          sixth: "数据6"
        },
        {
          first: "数据1",
          secound: "数据2",
          third: "数据3",
          fourth: "数据4",
          fifth: "数据5",
          sixth: "数据6"
        }
      ],
      //-----------------------

      name: "zhangzhe",
      website: "http://www.thenewstep.com",
      x: 0,
      y: 0,
      mouthdata: 0,
      daydata: 0,
      hourdata: 0,
      codedata: 0,
      error: false,
      success: false,
      blogs: [],
      title: 0,

      seven_chart: null,
      month_chart: null,
      seven_option: {
        animation: false,
        title: {
          x: "left",
          align: "center"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: "示工图"
        },
        grid: {
          left: "3%",
          right: "5%",
          bottom: "3%",
          top: "3%",

          containLabel: true
        },
        toolbox: {
          feature: {
            restore: {} //刷新
          }
        },
        xAxis: {
          name: "m",
          type: "value",
          boundaryGap: false,
          //data: ["0", "1", "2", "3", "4", "5", "6"],
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff",
              type: "solid"
            }
          },
          axisLabel: {
            formatter: "{value} "
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#aaa", "#ddd"],
              type: "dashed"
            }
          }
        },
        yAxis: {
          name: "PA",
          nameLocation: "end",
          type: "value",
          axisLabel: {
            formatter: "{value} "
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
        series: [
          {
            name: "示工图",
            type: "line",
            data: data1,
            lineStyle: {
              //折现的颜色
              color: "green",
              type: "solid"
            },
            itemStyle: {
              //设置折线折点的颜色
              normal: {
                color: "green"
              }
            },
            markLine: {
              lineStyle: {
                color: "green",
                type: "solid"
              },

              data: [
                [
                  { coord: data1[0], symbol: "none" },
                  { coord: data1[3], symbol: "none" }
                ]
              ]
            }
          }
        ]
      }
    };
  },
  created() {},
  mounted() {
    console.log("hello");
    this.seven_chart = echarts.init(document.getElementById("gis-graph"));
    this.get_echarts();
    this.axios
      .get("../../../static/post.json")
      .then(res => {
        this.graphDataList = res.data;
        this.$Message.info("获取数据成功!");

        this.setLoop();
      })
      .catch(err => {
        this.$Message.error({
          content: "获取数据失败!原因:" + err,
          duration: 10
        });
      });
  },
  destroyed() {
    this.cancelLoop();
  },

  methods: {
    fetchPreData() {
      let temp;
      this.$Message.destroy();
      if (this.interval != null) {
        this.cancelLoop();
      }
      this.currentIndex =
        this.currentIndex === 0
          ? this.graphDataList.length - 1
          : this.currentIndex - 1;

      temp = this.graphDataList[this.currentIndex];
      this.seven_option.series[0].data = this.graphDataList[this.currentIndex];
      if (
        temp[0][0] === temp[temp.length - 1][0] &&
        temp[0][1] === temp[temp.length - 1][1]
      ) {
        this.seven_option.series[0].lineStyle.color = "#23e25e";
        this.get_echarts();
      } else {
        this.seven_option.series[0].lineStyle.color = "#f55d34";
        this.get_echarts();
        this.cancelLoop();
        this.$Message.error({
          content: "改组数据出现偏差，请仔细核对。点击播放按钮以继续...",
          duration: 10
        });
      }
    },
    fetchNextData() {
      let temp;
      this.$Message.destroy();
      if (this.interval != null) {
        this.cancelLoop();
      }
      this.currentIndex =
        this.currentIndex === this.graphDataList.length
          ? 0
          : this.currentIndex + 1;
      this.seven_option.series[0].data = this.graphDataList[this.currentIndex];
      temp = this.graphDataList[this.currentIndex];
      if (
        temp[0][0] === temp[temp.length - 1][0] &&
        temp[0][1] === temp[temp.length - 1][1]
      ) {
        this.seven_option.series[0].lineStyle.color = "#23e25e";
        this.get_echarts();
      } else {
        this.seven_option.series[0].lineStyle.color = "#f55d34";
        this.get_echarts();
        this.cancelLoop();
        this.$Message.error({
          content: "改组数据出现偏差，请仔细核对。点击播放按钮以继续...",
          duration: 10
        });
      }

      this.currentIndex++;
    },
    setLoop() {
      this.$Message.destroy();
      this.interval = setInterval(() => {
        this.drawGraph();
      }, 500);
    },
    cancelLoop() {
      this.isPlay = false;
      clearInterval(this.interval);
    },
    drawGraph() {
      let temp;
      if (this.currentIndex === this.graphDataList.length) {
        this.currentIndex = 0;
      }
      this.seven_option.series[0].data = this.graphDataList[this.currentIndex];
      temp = this.graphDataList[this.currentIndex];
      if (
        temp[0][0] === temp[temp.length - 1][0] &&
        temp[0][1] === temp[temp.length - 1][1]
      ) {
        this.seven_option.series[0].lineStyle.color = "#23e25e";
        this.get_echarts();
      } else {
        this.seven_option.series[0].lineStyle.color = "#f55d34";
        this.get_echarts();
        this.cancelLoop();
        this.$Message.error({
          content: "改组数据出现偏差，请仔细核对。点击播放按钮以继续...",
          duration: 10
        });
      }
      this.currentIndex++;
    },
    //查看该历史详情
    toDetail(index) {
      console.log("查看历史");
    },
    //关闭对话框
    closeDialog() {
      this.dialogShow = false;
    },
    //删除该历史
    toDelete() {
      console.log("删除历史");
    },

    //打开历史记录面板
    toHistory() {
      this.dialogShow = true;
    },
    //根据日期和油田id查询
    searchOil() {
      //发起http请求,请求参数为oilId和date
      console.log(this.formItem);
    },
    //获取选择的时间
    getSearchDate(date) {
      this.formItem.date = date;
    },
    get_echarts() {
      //this.seven_chart.clear();
      // 把配置和数据放这里
      this.seven_chart.setOption(this.seven_option);
    },
    play() {
      this.isPlay = !this.isPlay;
      this.setLoop();
    },

    greet: function() {
      alert("123");
      return "good " + this.name;
    },
    updata: function(event) {
      //    console.log(event);
      this.x = event.offsetX;
      this.y = event.offsetY;
    },
    stop: function(event) {
      event.stopPropagationn();
    },
    mouth: function() {
      this.mouthdata = this.$refs.mouth.value;
      //	console.log(this.$refs.mouth.value);
    },
    day: function() {},
    chooda: function() {
      this.mouthdata = this.$refs.mouth.value;
      this.daydata = this.$refs.day.value;
      this.hourdata = this.$refs.hour.value;
      this.codedata = this.$refs.code.value;
      alert(
        this.mouthdata +
          " " +
          this.daydata +
          " " +
          this.hourdata +
          " " +
          this.codedata
      );
    }
  }
};
</script>

<style scoped>
.app {
  display: flex;
  background: url("../../assets/images/settingbg.png") top center repeat-y;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.breakdown {
  display: flex;
  max-width: 900px;
  min-height: auto;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.g-title {
  font-size: 26px;
}
.g-graph {
  margin-top: 30px;
  padding: 30px;
}
#gis-graph {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 400px;
}
.g-menulist {
  border: 1px solid #fff;
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 80px;
  padding-top: 20px;
}
.t-table {
  box-sizing: border-box;
  width: 95%;
  font-size: 16px;
  border: 1px solid white;
  margin: 30px;
  padding: 20px;
}

.t-tr {
  text-align: left;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;

  text-align: left;
  margin-left: 30px;
  width: 100%;
  margin-top: 10px;
}
.t-tr td,
.t-tr th {
  width: 60px;
  margin-left: 30px;
}
@media screen and (max-width: 720px) {
  .t-table {
    width: 100%;
    font-size: 12px;
    border: 1px solid white;
    margin-right: 0px;
    padding: 0px;
    margin: 0;
  }

  .t-tr {
    text-align: left;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;

    text-align: left;
    margin-left: 10px;
    width: 100%;
    margin-top: 5px;
  }
  .t-tr td,
  .t-tr th {
    width: 30px;
  }
}

@media screen and (max-width: 320px) {
  .t-table {
    width: 100%;
    font-size: 10px;
    border: 1px solid white;
    margin-top: 5px;
    margin-right: 0px;
    padding: 0px;
  }
}
</style>