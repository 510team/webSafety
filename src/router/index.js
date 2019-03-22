import Vue from "vue";
import Router from "vue-router";
import { getCookie } from '../util/cookie'

Vue.use(Router);

<<<<<<< HEAD
const router = new Router({
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
=======
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
>>>>>>> ca05175fd6613b3de05dca418937431ed2166af4
});

router.beforeEach((to, from, next) => {
    const cookie = document.cookie;
    const username = getCookie("username");
    const path = to.path;
    if (path == "/login") {
        next();
        return;
    }
    if (!username) {
        next({ path: "/login" });
    } else {
        next();
    }
});

export default router;
