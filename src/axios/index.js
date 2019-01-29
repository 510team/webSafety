import axios from "axios";
import { Message } from "element-ui";
import router from "@/router";

axios.defaults.baseURL = "/api";
axios.defaults.timeout = 5000;

// http请求拦截器
axios.interceptors.request.use(
    config => {
        // token
        if (localStorage.getItem("token")) {
            config.headers.Authorization = localStorage.getItem("token");
        }
        // 防止缓存
        if (
            config.method === "post" &&
            config.headers["Content-Type"] !== "multipart/form-data"
        ) {
            config.data = {
                ...config.data,
                _t: Date.parse(new Date()) / 1000
            };
        } else if (config.method === "get") {
            config.params = {
                _t: Date.parse(new Date()) / 1000,
                ...config.params
            };
        }
        return config;
    },
    error => {
        Message.error("请求服务器超时");
        return error;
    }
);

// http响应拦截器
axios.interceptors.response.use(
    data => {
        if (!data || typeof data.data !== "object") {
            Message.error("服务器响应格式错误");
        } else {
            if (data.data.status != "success") {
                Message.error(data.data.message || "接口错误");
            }
        }
        return data;
    },
    error => {
        let errmsg = "服务器响应错误";
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    errmsg = "请登录后操作";
                    router.replace("/login");
                    break;
            }
        }
        Message.error(errmsg);
        return Promise.reject(error.response.data);
    }
);
export default axios;
