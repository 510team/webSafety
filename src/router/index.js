import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

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
