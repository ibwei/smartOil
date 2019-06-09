<template>
  <!--左下角导航条-->
  <div class="mynav">
    <ul class="navbar">
      <li class="first-area">
        <span class="base">基础模块</span>
        <img src="../assets/images/baseline.png" alt class="first-pic">
        <span class="dis" v-on:click="toShowTips">拓展功能</span>
        <img src="../assets/images/baseline.png" v-on:click="toShowTips" alt class="second-pic">
      </li>
      <li
        v-for="(item,index) in menuList"
        :key="index"
        :name="index"
        class="list-area"
        v-on:click="navToTarget(index)"
        :class="{active:activeList[index]}"
      >
        <Icon :type="item.iconType" class="list-icon"></Icon>
        <span class="list-path">{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon, Message } from "iview";
export default {
  props: {},
  components: {
    Icon,
    Message
  },
  data() {
    return {
      menuList: [
        {
          path: "home",
          name: "主页",
          iconType: "md-home"
        },
        {
          path: "gis",
          name: "gis地理信息",
          iconType: "ios-navigate"
        },
        {
          path: "breakdown",
          name: "示功图与故障分析",
          iconType: "md-analytics"
        },
        {
          path: "setting",
          name: "用户管理",
          iconType: "md-settings"
        },
        {
          path: "login",
          name: "拓展模块",
          iconType: "ios-bug"
        }
      ],
      activeList: [true, false, false, false, false, false]
    };
  },
  computed: {},
  methods: {
    navToTarget(index = 0) {
      console.log("触发我了");
      //更改当前活动的菜单栏,添加active样式
      this.activeList.splice(0, 6, false, false, false, false, false, false);
      this.activeList.splice(index, 0, true);
      //进入相应路由,触发登陆
      if (index == 4) {
        //console.log(index);
        this.$emit("on-login");
        return false;
      }
      //iview提示
      if (index == 5) {
        this.$Message.info("敬请期待");
        return false;
      }
      //更改不是首页的背景图
      if (index >= 0 && index < 4) {
        this.$emit("on-changebk", index);
      }
      //跳转路由
      if (index < 4) {
        this.$router.push(this.menuList[index].path);
      }
    },
    toShowTips() {
      this.$Message.info("仍在开发当中");
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="less" scoped>
.mynav {
  width: 100%;
  color: #fff;
  font-size: 18px;
  text-align: justify;
}

.list-area {
  display: block;
  height: 60px;
  line-height: 40px;
  padding: 10px 5px 10px 20px;
  background: rgba(26, 98, 136, 0.4) url(../assets/images/right_arrow.png)
    no-repeat right center;
}

.list-area + .list-area {
  border-top: 1px solid lightslategray;
}

.list-area:hover {
  background: #dd7407 url(../assets/images/right_arrow.png) no-repeat right
    center;
  cursor: pointer;
}

.list-icon {
  font-size: 26px;
  margin-right: 20px;
}

.list-path {
  color: #fff;
}

.active {
  background: #dd7407;
}

.dis {
  margin-left: 25px;
  background: rgba(41, 58, 79, 0.3);
}

.base {
  margin-left: 0;
  background: rgba(182, 114, 13, 0.6);
}

.first-area {
  box-sizing: border-box;
  position: relative;
  padding: 0;
  height: 80px;
  cursor: pointer;
  background: rgba(3, 5, 7, 0.3);

  span {
    display: inline-block;
    height: 80px;
    padding: 5px 15px;
    font-size: 16px;
  }

  .first-pic {
    position: absolute;
    top: 30px;
    left: 20px;
  }

  .second-pic {
    position: absolute;
    top: 30px;
    left: 140px;
  }
}

//手机样子,当可是宽度小于720px时
@media screen and (max-width: 720px) {
  .mynav {
    font-size: 16px;
    position: relative;
    left: -2px;
    width: 100%;
    background: rgba(3, 5, 7, 0.3);
  }

  .list-icon {
    font-size: 16px;
  }
  .first-area {
    display: none;
    height: 60px;
    cursor: pointer;

    span {
      display: inline-block;
      height: 60px;
      padding: 5px 5px;
      font-size: 16px;
    }

    .first-pic {
      top: 15px;
      left: 20px;
    }
    .second-pic {
      top: 15px;
      left: 140px;
    }
  }
  .list-area {
    display: block;
    height: 60px;
    padding: 5px 5px 5px 20px;
    background: none;
  }
  .list-path {
    display: none;
  }

  .list-area:hover {
    background: #dd7407;
    cursor: pointer;
  }

  .navbar {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}
</style>
