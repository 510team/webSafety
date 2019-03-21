import Vue from "vue";

const service = options => {
    return Vue.axios({
        method: options.method || "post",
        url: options.url,
        data: options.data,
        headers: { token: "token1234" }
    });
};

export default service;
