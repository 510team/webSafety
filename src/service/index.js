import Vue from "vue";
import service from "./base";

// 登录接口
export default {
    login(data) {
        return Vue.axios.post("/login", data).then(res => {
            return res.data;
        });
    },
    getList() {
        return Vue.axios.get("/list").then(res => {
            return res.data;
        });
    },
    posted(data) {
        return service({
            url: "/list/posted",
            data: data
        }).then(res => {
            return res.data;
        });
    },
    delete(data) {
        return service({
            url: "/list/deleted",
            data: data
        }).then(res => {
            return res.data;
        });
    }
};
