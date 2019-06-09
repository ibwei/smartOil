// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
Vue.config.productionTip = false;
import axios from "axios"
import iView from "iview";
import 'iview/dist/styles/iview.css';
Vue.use(iView);


import $ from "jquery";
//加载iview UI框架




Vue.prototype.axios = axios;




//路由跳转时的顶部路有条
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    iView.LoadingBar.start();
    next();
});

router.afterEach(route => {
    iView.LoadingBar.finish();
});
/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    components: { App },
    template: "<App/>"
});