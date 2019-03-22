import axios from "axios";
import { Message } from "element-ui";
const token = window.localStorage.getItem("token");

const service = option => {
    const originalData = option.data || {};
    const data = {
        url: option.url,
        method: option.method,
        body: {},
        headers: { token: token }
    };
    data.body = originalData;
    const url = data.url;

    let sendData = data.body;
    const req = {
        method: data.method
    };
    const qs = require("querystring");
    if (data.method.toLowerCase() === "post") {
        //针对参数类型是对象（包含数组）
        for (const key in sendData) {
            if (typeof sendData[key] == "object") {
                sendData[key] = JSON.stringify(sendData[key]);
            }
        }
        sendData = qs.stringify(sendData);
        req.data = sendData;
    } else if (data.method === "get") {
        req.params = sendData;
        // console.log(sendData);
    } else {
        req.params = sendData;
        req.data = sendData;
        req.headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        };
    }
    //console.log(url);
    const startTime = Date.now();
    return axios({ url, ...req })
        .then(
            res => {
                const response = res.data;

                if (response.status != "success") {
                    //session 过期刷新页面
                    if (response.result_code === "auth_failed") {
                        location.reload();
                        return Promise.resolve({});
                    }
                    // Message.error(response);
                    console.log("response reject", response);
                    return Promise.reject(response);
                } else {
                    console.log("response", response);
                    return response;
                }
            },
            error => {
                throw error.response;
            }
        )
        .catch(res => {
            if (res && +res.status >= 400) {
                Message({
                    duration: 4500,
                    type: "error",
                    message: `接口错误，错误码${res.status}`
                });
            }
            throw res;
        });
};

export { service as default };
