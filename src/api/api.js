import axios from 'axios'
axios.defaults.baseURL = 'www.baidu.com'
    // 添加请求拦截器
axios.interceptors.request.use(function(config) {
    return config;
}, function(error) {
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    return response.data;
}, function(error) {
    return Promise.reject(error);
});

let base = 'http://api.xinyo.xin/api';

/**登录接口**/
export const Login = params => {
    return axios.get(`${base}/Common/Login`, {
        params: params
    }).then(res => res);
};
/**
 * 火车票相关接口
 */
export const gettrainlist = params => {
    return axios.get(`${base}/TrainInformation/SearchList`, {
        params: params
    }).then(res => res);
};
export const addTrain = params => {
    return axios.post(`${base}/TrainInformation/add`,
        params
    );
};

export const editTrain = params => {
    return axios.post(`${base}/TrainInformation/edit`,
        params
    );
};

export const deleteTrain = params => {
    return axios.delete(`${base}/TrainInformation/delete`, {
        params: params
    }).then(res => res);
};

/**
 * 日常消费相关接口
 */
export const getDailyConsumptionlist = params => {
    return axios.get(`${base}/CapitalFlow/SearchList`, {
        params: params
    }).then(res => res);
};
export const addDailyConsumption = params => {
    return axios.post(`${base}/CapitalFlow/add`, params);
};
export const editDailyConsumption = params => {
    return axios.post(`${base}/CapitalFlow/edit`, params);
};
export const deleteDailyConsumption = params => {
    return axios.delete(`${base}/CapitalFlow/delete`, {
        params: params
    }).then(res => res);
};