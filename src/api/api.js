import axios from 'axios'
axios.defaults.baseURL = 'www.xinyo.xin'
// 添加请求拦截器
import {
    Loading,
    Message
} from 'element-ui'
//超时时间
axios.defaults.timeout = 5000

var loadinginstace;
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    loadinginstace = Loading.service({
        fullscreen: true
    })
    return config;
}, function (error) {
    loadinginstace.close()
    Message.error({
        message: '加载超时'
    })
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    loadinginstace.close()
    return response.data;
}, function (error) {
    loadinginstace.close()
    Message.error({
        message: '加载失败'
    })
    return Promise.reject(error);
});
let base = 'http://api.xinyo.xin/api';

/**登录接口**/
export const Login = params => {
    return axios.get(`${base}/User/Login`, {
        params: params
    }).then(res => res);
};

/**账户管理**/
export const getuserlist = params => {
    return axios.get(`${base}/User/GetSearchList`, {
        params: params
    }).then(res => res)
};
export const addUser = params => {
    return axios.post(`${base}/User/add`,
        params
    );
};

export const editUser = params => {
    return axios.post(`${base}/User/edit`,
        params
    );
};

export const deleteUser = params => {
    return axios.delete(`${base}/User/delete`, {
        params: params
    }).then(res => res);
};

/**
 * 票相关接口
 */
export const gettrainlist = params => {
    return axios.get(`${base}/Ticket/GetSearchList`, {
        params: params
    }).then(res => res);
};
export const addTrain = params => {
    return axios.post(`${base}/Ticket/add`,
        params
    );
};

export const editTrain = params => {
    return axios.post(`${base}/Ticket/edit`,
        params
    );
};

export const deleteTrain = params => {
    return axios.delete(`${base}/Ticket/delete`, {
        params: params
    }).then(res => res);
};

/**
 * 日常消费相关接口
 */
export const getDailyConsumptionlist = params => {
    return axios.get(`${base}/Consume/GetSearchList`, {
        params: params
    }).then(res => res);
};
export const addDailyConsumption = params => {
    return axios.post(`${base}/Consume/add`, params);
};
export const editDailyConsumption = params => {
    return axios.post(`${base}/Consume/edit`, params);
};
export const deleteDailyConsumption = params => {
    return axios.delete(`${base}/Consume/delete`, {
        params: params
    }).then(res => res);
};