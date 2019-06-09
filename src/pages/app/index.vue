<template>
  <div class="app-container" ref="app" :class="{home:!isHome && !isPhone}">
    <div class="content">
      <!-- router-view的展示处 -->
      <router-view></router-view>
    </div>
    <div class="nav">
      <!-- 顶部时间 -->
      <div class="time">{{currentTime}}</div>
    </div>
    <!-- 登陆注册表单 -->
    <my-dialog :isShow="regformShow" @on-close="closeRegform">
      <reg-form @on-close="regSuccess"></reg-form>
    </my-dialog>
    <div class="graph-area" v-show="isHome">
      <v-graph></v-graph>
    </div>
    <div class="navList" v-show="!isGis && !isSetting">
      <my-nav @on-login="openLogForm" @on-changebk="changeBackground" ref="myNavList"></my-nav>
    </div>
  </div>
</template>

<script>
import myNav from "../../components/myNav";
import timeUtils from "../../utils/timeFormat";
import logForm from "../../components/login";
import regForm from "../../components/register";
import myDialog from "../../components/dialog";
import vGraph from "../../components/graph";
export default {
  name: "app",
  components: {
    myNav,
    logForm,
    myDialog,
    regForm,
    vGraph
  },
  data() {
    return {
      isGis: false,
      logformShow: false,
      regformShow: false,
      currentTime: "",
      isHome: true,
      isPhone: false,
      isSetting: false,
      person: {
        name: "白唯",
        sex: "male"
      }
    };
  },
  watch: {
    $route(to, from) {
      this.isGis = to.path === "/gis" ? true : false;
      if (from.path === "/gis") {
        this.isHome = true;
        this.$refs.myNavList.navToTarget(0);
      }
      this.isSetting = to.path === "/setting" ? true : false;
      if (from.path === "/setting") {
        this.isHome = true;
        this.$refs.myNavList.navToTarget(0);
      }
    }
  },

  mounted() {
    //顶部时间
    console.log("mounted again");
    let time = new timeUtils();
    setInterval(() => {
      this.currentTime = time.getDateTime();
    }, 1000);

    let w = document.documentElement.clientWidth || document.body.clientWidth;
    //手机页面不更换
    if (w < 721) {
      this.isPhone = true;
    } else {
      this.isPhone = false;
    }
    if (
      window.location.pathname == "/home" ||
      window.location.pathname == "/"
    ) {
      this.isHome = true;
    } else {
      this.isHome = false;
    }
    this.changeBackground(0);
  },
  methods: {
    //打开登陆表单
    openLogForm() {
      this.logformShow = true;
    },
    //关闭登陆表单
    closeLogform() {
      this.logformShow = false;
    },
    //去往注册页面
    toReg() {
      this.closeLogform();
      this.openRegform();
    },
    //打开注册表单
    openRegform() {
      this.regformShow = true;
    },
    //成功登陆的处理

    //关闭注册表单
    closeRegform() {
      this.regformShow = false;
    },
    //成功注册的处理npm
    regSuccess() {
      this.closeRegform();
      let v1 = setTimeout(this.tips(), 500);
      let v2 = setTimeout(this.openLogform(), 700);
    },
    //更换背景图片
    changeBackground(index) {
      console.log(index);

      if (index == 0) {
        this.isHome = true;
      } else {
        this.isHome = false;
      }
      let w = document.documentElement.clientWidth || document.body.clientWidth;
      //手机页面不更换
      if (w < 721) {
        this.isPhone = true;
        return false;
      } else {
        this.isPhone = false;
      }
    }
  }
};
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  background: #0b162d !important;
}

.app-container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: url(../../assets/images/background.png) no-repeat top center;
  color: #2c3e50;
  justify-content: center;
  min-height: 100vh;
}

.home {
  background: url(../../assets/images/background2.png) no-repeat top center !important;
}

.time {
  font-size: 16px;
  color: rgba(15, 166, 255, 0.3);
  position: absolute;
  right: 15px;
  top: 15px;
}

.nav {
  flex: 1;
  align-self: flex-start;
  display: flex;
}

.navList {
  /* display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start; */
  position: fixed;
  left: 0;
  bottom: 0;
  width: 280px;
}

.content {
  position: relative;
  top: 100px;
  width: 100%;
}

footer {
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
  font-size: 16px;
}

.graph-area {
  position: absolute;
  width: 500px;
  height: auto;
  bottom: 20px;
  right: 0;
  box-sizing: border-box;
}

/*手机样式*/
@media screen and (max-width: 720px) {
  .graph-area {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: auto;
    top: 40px;
    left: 0;
    box-sizing: border-box;
  }

  .app-container {
    background: url(../../assets/images/phonebg.png) repeat-y top center;
  }

  .navList {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 60px;
  }

  footer {
    font-size: 16px;
  }

  .time {
    width: 120px;
    color: #fff;
    text-align: right;
    font-size: 12px;
  }

  .content {
    position: flex;
    flex-direction: column;
    top: 400px;
    padding-left: 0px;
  }
}
</style>
