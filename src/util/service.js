/**
 * server封装，所有请求都走这里
 * option = {
 *      url:请求地址
 *      method: 'post' // 请求方式，post\get\put\delete
 *      data: {}, // 参数
 * }
 * service(option)
            .then(data => {
                console.log('then', data);
            })
            .catch(data => {
                console.log('catch', data);
            });
 */

import axios from 'axios';
import config from 'client-url/config/index.js';
import mockIndex from 'client-url/mock/index';
import base from './base.js';
import { Message } from 'element-ui';
import { tencentStat } from 'library-url/util/tencentStat';
// import { Message } from 'element-ui';
const service = option => {
    // console.log('option', option);
    // const originUrl = option.url;
    // const method = option.method;
    const originalData = option.data || {};
    const data = {
        url: option.url,
        method: option.method,
        body: {}
    };
    //不发送undefined,null,''
    /*
    for (const key in originalData) {
        if (
            originalData[key] !== null &&
            originalData[key] !== undefined &&
            originalData[key] !== ''
        ) {
            data.body[key] = originalData[key];
        }
    }
    */
    data.body = originalData;
    // const backendServiceName = data.url && data.url.split('/')[3];
    // const urmBackendServiceName = data.url && data.url.split('/')[4];
    // const serviceName =
    //     '/uds-' +
    //     (backendServiceName === 'ss'
    //         ? urmBackendServiceName
    //         : backendServiceName);

    // const serviceId = config.uds_service_id;
    // const url =
    //     config.serverHost +
    //     serviceName +
    //     data.url +
    //     '?uds_service_id=' +
    //     serviceId;
    const url = base.serviceUrl(data.url);
    //是否返回的是二进制文件
    const isBlob = option.isBlob || false;

    let responseType = '';
    if (isBlob) {
        responseType = 'blob';
    } else {
        responseType = 'json';
    }
    let sendData = data.body;
    const req = {
        method: data.method
    };
    const qs = require('querystring');
    if (data.method.toLowerCase() === 'post') {
        //针对参数类型是对象（包含数组）
        for (const key in sendData) {
            if (typeof sendData[key] == 'object') {
                sendData[key] = JSON.stringify(sendData[key]);
            }
        }
        sendData = qs.stringify(sendData);
        req.data = sendData;
    } else if (data.method === 'get') {
        req.params = sendData;
        // console.log(sendData);
    } else {
        req.params = sendData;
        req.data = sendData;
        req.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
    }
    //console.log(url);
    const startTime = Date.now();
    return axios({ url, ...req, responseType })
        .then(
            res => {
                const endTime = Date.now();
                const localTime = new Date().toLocaleString();
                tencentStat(url, res.status, endTime - startTime, localTime);
                const response = res.data;
                if (isBlob) {
                    return response;
                }
                if (response.result_code != 'success') {
                    //session 过期刷新页面
                    if (response.result_code === 'auth_failed') {
                        location.reload();
                        return Promise.resolve({});
                    }
                    // 获取mock数据
                    if (config.isMock) {
                        return mockIndex(data.url, originalData);
                    }
                    // Message.error(response);
                    return Promise.reject(response);
                } else {
                    return response;
                }
            },
            error => {
                throw error.response;
            }
        )
        .catch(res => {
            if (res && +res.status >= 400) {
                const endTime = Date.now();
                const localTime = new Date().toLocaleString();
                tencentStat(
                    url,
                    res.status,
                    endTime - startTime,
                    localTime,
                    true
                );
                Message({
                    duration: 4500,
                    type: 'error',
                    message: `接口错误，错误码${res.status}`
                });
            }
            throw res;
        });
};
// 登陆专用
const loginService = option => {
    let sendData = option.data || {};
    const req = {
        method: option.method,
        url:
            config.serverHost +
            '/' +
            option.url +
            '?uds_service_id=' +
            config.uds_service_id
    };
    if (option.method === 'post') {
        const qs = require('querystring');
        //针对参数类型是对象（包含数组）
        for (const key in sendData) {
            if (typeof sendData[key] == 'object') {
                sendData[key] = JSON.stringify(sendData[key]);
            }
        }
        sendData = qs.stringify(sendData);
        req.data = sendData;
    } else {
        req.params = sendData;
    }
    return axios({ ...req })
        .then(res => {
            return res;
        })
        .catch(res => {
            throw res;
        });
};
export { service as default, loginService };
