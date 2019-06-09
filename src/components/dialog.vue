<template>
  <!--包含表单的模态框 -->
  <div class="dialog-wrap" :class="{all:!isShow}">
    <div class="dialog-cover" v-if="isShow" @click="closeMyself"></div>
    <transition name="drop">
      <div class="dialog-content" v-if="isShow">
        <p class="dialog-close" @click="closeMyself">
          <icon type="md-close"></icon>
        </p>
        <slot>正在加载.....</slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { Icon } from "iview";
export default {
  components: {
    Icon
  },
  name: "myDialog",
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    //关闭自身
    closeMyself() {
      this.$emit("on-close");
    }
  }
};
</script>

<style>
.all {
  display: none;
}

.drop-enter-active {
  transition: all 0.5s ease;
}

.drop-leave-active {
  transition: all 0.3s ease;
}

.drop-enter {
  transform: translateY(-300px);
}

.drop-leave-active {
  transform: translateY(-300px);
}

.dialog-wrap {
  padding: 0;
  margin: 60px auto 0 auto;
  position: fixed;
  left: 0;
  top: 40px;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.dialog-cover {
  background: #000;
  opacity: 0.5;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
}

.dialog-content {
  font-size: 16px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-align: center;
  width: 90%;
  max-width: 560px;
  position: relative;
  max-height: auto;
  overflow: auto;
  background: #fff;
  z-index: 10;
  border: 2px solid #464068;
  padding: 4% 0;
  line-height: 1.6;
  margin: 0 auto;
  background: rgba(255, 255, 255, 1);
  background-size: 100% 100%;
}

.dialog-close {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 30px;
  height: 30px;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  background: #d3d3d3;
  font-weight: 400;
}

.dialog-close:hover {
  color: #4fc08d;
}
</style>
