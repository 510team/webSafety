import Vue from "vue";

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
    }
};
