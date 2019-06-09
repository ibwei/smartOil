import Vue from "vue";
import Router from "vue-router";
import home from "../pages/home";
const gis = () =>
    import ("../pages/gis");
const breakdown = () =>
    import ("../pages/breakdown");
const setting = () =>
    import ("../pages/setting");
const notfound = () =>
    import ("../pages/notfound");

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [{
            path: "/",
            component: home,
            meta: { title: '智慧油田抽油机云监控平台' }
        },
        {
            path: "/home",
            component: home,
            meta: { title: '智慧油田抽油机云监控平台' }
        },
        {
            path: "/gis",
            component: gis,
            meta: { title: 'gis地理信息' }
        },
        {
            path: "/breakdown",
            component: breakdown,
            meta: { title: '示功图与故障分析' }
        },
        {
            path: "/setting",
            component: setting,
            meta: { title: '用户管理' }
        },
        {
            path: "*",
            component: notfound,
            meta: { title: '页面走丢了...' }
        }
    ]
});