import Vue from "vue";

// 登录接口
export default {
    login(data) {
        return new Promise(resolve => {
            Vue.axios.post("/login", data).then(res => {
                resolve(res.data);
            });
        });
    }
};
