import Vue from "vue";
import { getCookie } from '../util/cookie'
import router from "@/router";

const service = options => {
    const token = window.localStorage.getItem('token')
    return Vue.axios({
        method: options.method || "post",
        url: options.url,
        data: options.data || '',
        headers: { token: token }
    }).then(data => {
        if (data.data.code === "401") {
            router.replace("/login");
        }
        return data;
    }).catch(data => {
        return Promise.reject(data)
    })
};

export default service;
