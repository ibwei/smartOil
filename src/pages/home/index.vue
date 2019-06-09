<template>
  <div class="main-container">
    <div ref="mymap" id="home-map"></div>
    <div class="machine-table">
      <div class="home-title">
        <img src="../../assets/images/oilcount.png" width="42" height="42" alt>
        <span>各油田机器数据统计</span>
      </div>
      <div class="home-content1">
        <div class="home-content">
          <div class="home-table-column">
            <div class="h-id">油田名称</div>
            <div class="h-name">机器数量</div>
            <div class="h-status">运行状态</div>
            <div class="h-description">说明</div>
            <div>悬点载荷/kN</div>
            <div>光杆冲程/m</div>
            <div>减速箱/kN.m</div>
            <div>冲次/min-1</div>
          </div>
          <div class="home-table-column" v-for="(item,index) of lal.oil" :key="index">
            <div class="h-id">{{item.name}}</div>
            <div class="h-name">{{item.num}}</div>
            <div class="h-status" v-if="item.id!=4">
              <Icon type="md-checkmark" size="28" color="#39f130"/>
              <Icon type="md-checkmark" size="28" color="#39f130"/>
              <Icon type="md-checkmark" size="28" color="#39f130"/>
              <Icon type="md-checkmark" size="28" color="#39f130"/>
              <Icon type="md-checkmark" size="28" color="#39f130"/>
              <Icon type="md-checkmark" size="28" color="#39f130"/>
            </div>
            <div class="h-status" v-else>
              <Icon type="md-checkmark" size="28" color="#39f130"/>
              <Icon type="md-checkmark" size="28" color="#39f130"/>
              <Icon type="md-close" size="28" color="#ed4a1e"/>
              <Icon type="md-close" size="28" color="#ed4a1e"/>
              <Icon type="md-close" size="28" color="#ed4a1e"/>
              <Icon type="md-close" size="28" color="#ed4a1e"/>
            </div>
            <div class="h-description">{{item.description}}</div>
            <div>{{item.param1}}</div>
            <div>{{item.param2}}</div>
            <div>{{item.param3}}</div>
            <div>{{item.param4}}</div>
          </div>
        </div>
        <div id="num-graph">graph</div>
      </div>
    </div>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/chart/bar");

import iDialog from "../../components/dialog";
export default {
  props: {},
  components: {},
  data() {
    return {
      myChart: null,
      //厂量统计图
      option: {
        title: {
          text: "各大油田产油量/吨",
          textStyle: {
            color: "#fff"
          },
          left: "center"
        },
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "长青油田",
              "胜利油田",
              "江汉油田",
              "塔里油田",
              "麻衣油田",
              "大港油田"
            ],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              color: "#fff",
              rotate: 30
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
          }
        ],
        yAxis: [
          {
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
            }
          }
        ],
        series: [
          {
            name: "产油量",
            type: "bar",
            barWidth: "40%",
            data: [201, 52, 200, 134, 320, 130],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#83bff6" },
                  { offset: 0.5, color: "#188df0" },
                  { offset: 1, color: "#188df0" }
                ])
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" }
                ])
              }
            }
          }
        ]
      },
      //地图相关
      contextMenu: null,
      contextMenuPositon: null,
      centerMaker: null,
      dialogShow: false,
      map: null,
      //地图上的油田标注
      maker: [],
      //选中的油田标注
      targetOil: null,
      //选中的消息窗体
      infoWindow: null,
      lal: {
        //地图中心坐标
        center: {
          x: 108.95004284667968,
          y: 34.210538407470524
        },
        //油田坐标及信心
        oil: [
          {
            x: 108.78524792480468,
            y: 34.19589284974892,
            id: 1,
            name: "长青油田",
            description: "状态:工作正常",
            image: require("../../assets/images/oil1.png"),
            num: 7,
            param1: 50,
            param2: 1.3,
            param3: 16,
            param4: 16
          },
          {
            x: 108.7591553955078,
            y: 34.317344117641554,
            id: 2,
            name: "江汉油田",
            description: "状态:工作正常",
            image: require("../../assets/images/oil2.png"),
            num: 6,
            param1: 49,
            param2: 1.2,
            param3: 16,
            param4: 19
          },
          {
            x: 108.85665905761718,
            y: 34.408034175668504,
            id: 3,
            name: "塔里油田",
            description: "状态:工作正常",
            image: require("../../assets/images/oil3.png"),
            num: 6,
            param1: 52,
            param2: 1.9,
            param3: 11,
            param4: 16
          },
          {
            x: 109.04068005371093,
            y: 34.38197083778134,
            id: 4,
            name: "胜利油田",
            description: "状态:工作异常,检测到硬件故障",
            image: require("../../assets/images/oil4.png"),
            num: 9,
            param1: 39,
            param2: 2.0,
            param3: 16,
            param4: 13
          },
          {
            x: 109.22332775878905,
            y: 34.30032880776794,
            id: 5,
            name: "麻衣油田",
            description: "状态:工作正常",
            image: require("../../assets/images/oil5.png"),
            num: 6,
            param1: 55,
            param2: 1.3,
            param3: 17,
            param4: 16
          },
          {
            x: 109.02145397949218,
            y: 34.28557941702164,
            id: 6,
            name: "大港油田",
            description: "状态:工作正常",
            image: require("../../assets/images/oil6.png"),
            num: 7,
            param1: 46,
            param2: 1.1,
            param3: 19,
            param4: 13
          }
        ]
      }
    };
  },
  mounted() {
    this.initMap();
    this.initContainer();
    this.initAllMaker();
    this.initGraph();
    // this.openOilInfo(4);
  },
  computed: {},
  methods: {
    initGraph() {
      this.myChart = echarts.init(document.getElementById("num-graph"));
      this.myChart.setOption(this.option);
    },
    initMap() {
      this.map = new AMap.Map("home-map", {
        zoom: 11, //级别
        center: [this.lal.center.x, this.lal.center.y], //中心点坐标
        viewMode: "3D", //使用3D视图
        mapStyle: "amap://styles/df95df063dea9d024331dd5091367335" //自定义风格
      });

      AMap.plugin([
        "AMap.ControlBar",
        "AMap.Scale",
        "AMap.OverView",
        "AMap.MapType",
        "AMap.Geolocation",
        "AMap.ToolBar"
      ]);

      //构建右键菜单

      //创建右键菜单
      this.contextMenu = new AMap.ContextMenu();

      //右键放大
      this.contextMenu.addItem(
        "放大一级",
        e => {
          this.map.zoomIn();
        },
        0
      );

      //右键缩小
      this.contextMenu.addItem(
        "缩小一级",
        e => {
          this.map.zoomOut();
        },
        1
      );
      this.contextMenu.addItem(
        "一键还原",
        e => {
          this.map.setZoom(11);
          this.map.setCenter([this.lal.center.x, this.lal.center.y]);
        },
        1
      );

      //右键显示全国范围
      this.contextMenu.addItem(
        "缩放至全国范围",
        e => {
          this.map.setZoomAndCenter(4, [108.946609, 34.262324]);
        },
        2
      );

      //右键添加Marker标记
      this.contextMenu.addItem(
        "添加标记",
        e => {
          let marker = new AMap.Marker({
            map: this.map,
            position: this.contextMenuPositon //基点位置
          });
        },
        3
      );
      //地图绑定鼠标右击事件——弹出右键菜单
      this.map.on("rightclick", e => {
        this.contextMenu.open(this.map, e.lnglat);
        this.contextMenuPositon = e.lnglat;
      });
    },
    //自定义菜单类

    //调整地图大小
    initContainer() {
      let el = document.getElementById("home-map");
      el.style.width = this.getViewPortWidth() - 6 + "px";
      el.style.height = this.getViewPortHeight() - 90 + "px";
    },
    // 获取浏览器窗口的可视区域的宽度
    getViewPortWidth() {
      return document.documentElement.clientWidth || document.body.clientWidth;
    },
    // 获取浏览器窗口的可视区域的高度
    getViewPortHeight() {
      return (
        document.documentElement.clientHeight || document.body.clientHeight
      );
    },
    //添加标注
    initAllMaker() {
      let myIcon = new AMap.Icon({
        image: require("../../assets/images/monitoroil.png"),
        size: new AMap.Size(128, 128),
        imageSize: new AMap.Size(36, 36)
      });
      let myIcon1 = new AMap.Icon({
        image: require("../../assets/images/monitorerror.png"),
        size: new AMap.Size(128, 128),
        imageSize: new AMap.Size(42, 42)
      });

      this.maker = new Array(6);
      let i = 0;
      for (const oilInfo of this.lal.oil) {
        let selfIcon = i != 3 ? myIcon : myIcon1;
        this.maker[i++] = new AMap.Marker({
          position: [oilInfo.x, oilInfo.y], //位置
          icon: selfIcon,
          title: i + "号油田"
        });
      }
      //绑定click事件
      this.map.add(this.maker);
      for (let i = 0; i < this.maker.length; i++) {
        this.maker[i].on("click", this.onMarkerClick);
      }
    },
    onMarkerClick(e) {
      //console.log(e.target.F.title);
      let oilTitle = e.target.F.title;
      let id = parseInt(oilTitle.slice(0, 1));

      for (const oilInfo of this.lal.oil) {
        if (oilInfo.id === id) {
          this.targetOil = oilInfo;
          break;
        }
      }
      //实例化该窗体
      let myContent;
      if (id != 4) {
        myContent =
          '<div class="info"><img id="closePic" width="36px" height="36px" class="info-close" src="./static/close.png" alt="close"><div class="info-title">' +
          this.targetOil.name +
          '</div><div class="info-content"><img src="' +
          this.targetOil.image +
          '" alt="油田图片"><div class="real-content">' +
          this.targetOil.description +
          "</div></div>";
      } else {
        myContent =
          '<div class="info"><img id="closePic" width="36px" height="36px" class="info-close" src="./static/close.png" alt="close"><div class="info-title">' +
          this.targetOil.name +
          '</div><div class="info-content"><img src="' +
          this.targetOil.image +
          '" alt="油田图片"><div class="real-content1">' +
          this.targetOil.description +
          "</div></div>";
      }
      this.infoWindow = new AMap.InfoWindow({
        //创建信息窗体
        isCustom: true, //使用自定义窗体
        content: myContent,
        offset: new AMap.Pixel(16, -45)
      });
      this.infoWindow.open(this.map, e.target.getPosition()); //打开信息窗体
      //e.target就是被点击的Marker
      this.$refs.mymap.onclick = this.closeOilInfo;
    },
    //打开某个特定的油田信息
    openOilInfo(index = -1) {
      if (index === -1) {
        index = this.searchOilInfo;
      }
      //console.log(e.target.F.title);
      for (const oilInfo of this.lal.oil) {
        if (oilInfo.id === index) {
          this.targetOil = oilInfo;
          break;
        }
      }
      //实例化该窗体
      let myContent;
      if (index != 4) {
        myContent =
          '<div class="info"><img id="closePic" width="36px" height="36px" class="info-close" src="./static/close.png" alt="close"><div class="info-title">' +
          this.targetOil.name +
          '</div><div class="info-content"><img src="' +
          this.targetOil.image +
          '" alt="油田图片"><div class="real-content">' +
          this.targetOil.description +
          "</div></div>";
      } else {
        myContent =
          '<div class="info"><img id="closePic" width="36px" height="36px" class="info-close" src="./static/close.png" alt="close"><div class="info-title">' +
          this.targetOil.name +
          '</div><div class="info-content"><img src="' +
          this.targetOil.image +
          '" alt="油田图片"><div class="real-content1">' +
          this.targetOil.description +
          "</div></div>";
      }
      this.infoWindow = new AMap.InfoWindow({
        //创建信息窗体
        isCustom: true, //使用自定义窗体
        content: myContent,
        offset: new AMap.Pixel(16, -45)
      });
      //打开窗体/关闭对话框
      this.searchDialogShow = false;
      this.infoWindow.open(this.map, this.maker[index - 1].getPosition()); //打开信息窗体
      //e.target就是被点击的Marker
      this.$refs.mymap.onclick = this.closeOilInfo;
    },
    //关闭油田信息窗体
    closeOilInfo(e) {
      if (e.target.className === "info-close") {
        this.infoWindow.close();
      }
    }
  },
  created() {}
};
</script>
<style lang="less">
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);
}
#home-map {
  width: 200px;
  height: 200px;
  position: absolute;
  top: -10px;
  left: 0;
  z-index: 0;
  background: #fff;
}
.container {
  flex: 1 0 auto;
}
footer {
  height: 100px;
  position: relative;
  z-index: 20;
}
.info {
  box-sizing: border-box;
  background: #fff;
  color: #000;
  padding: 20px;
  z-index: 9998;
  max-width: 400px;
}

.info .info-title {
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
}

.info .info-content {
  display: flex;
  width: 300px;
  text-align: left;
  flex-direction: row;
}

.info .info-content img {
  flex: 1;
  width: 60px;
  height: 60px;
}

.info .info-content .real-content {
  width: 200px;
  margin-left: 10px;
  font-size: 16px;
  align-self: center;
  color: green;
}
.info .info-content .real-content1 {
  width: 200px;
  margin-left: 10px;
  font-size: 16px;
  align-self: center;
  color: red;
}

.info .info-close {
  display: block;
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 10px;
  cursor: pointer;
}
.machine-table {
  position: fixed;
  left: 0;
  bottom: 0px;
  height: auto;
  width: calc(100% - 740px);
  margin-left: 290px;
  z-index: 300;
  background: rgba(11, 27, 62, 0.8);
  padding: 0px 20px;
}
.home-content {
  flex: 1;
  background: url("../../assets/images/kejibg.png") top center no-repeat;
  background-size: 100% 100%;
}

.home-title {
  display: flex;
  flex-grow: column no-wrap;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #fff;
  padding: 10px 20px;
}

.home-title span {
  margin-left: 10px;
}

.home-table-column {
  display: flex;
  flex-grow: row no-wrap;
  justify-content: flex-start;
  align-items: flex-star;
  width: 100%;
  color: #fff;
  font-size: 14px;
}
// .home-table-column:nth-child(even) {
//   background: rgba(255, 255, 255, 0.3);
//   color: #3285e6;
// }
.home-table-column:hover {
  background: rgba(255, 255, 255, 0.3);
  color: #3285e6;
  cursor: pointer;
}
.home-table-column div {
  width: 60px;
  margin: 10px 0px;
}
.h-status {
  flex: 1;
  display: flex;
  flex-flow: row no-wrap;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}
.h-description {
  align-self: flex-start;
  flex: 1;
}
.ivu-spin-main {
  width: 20px !important;
  margin: 0;
  padding: 0;
  height: 0px;
}
.home-content1 {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
}
#num-graph {
  width: 400px;
  height: 400px;
  margin-left: 40px;
}
@media screen and (max-width: 1200px) {
  .home-content1 {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
  }
  .machine-table {
    display: none;
    position: fixed;
    left: 0;
    top: 480px;
    height: auto;
    width: calc(100% - 740px);
    margin-left: 290px;
    z-index: 300;
    background: rgba(11, 27, 62, 0.8);
    padding: 0px 20px;
  }
}
</style>