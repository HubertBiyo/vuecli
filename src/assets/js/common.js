import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'www.baidu.com'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

Vue.prototype.$axios = axios

export default({})