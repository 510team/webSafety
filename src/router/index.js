import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: () => import("@/views/login.vue")
    },
    {
      path: "/login",
      name: "登录",
      component: () => import("@/views/login.vue")
    },
    {
      path: "/posted",
      name: "发帖",
      component: () => import("@/views/posted.vue")
    },
    {
      path: "/list",
      component: () => import("@/views/list.vue")
    }
  ]
});
