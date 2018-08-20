

let base = 'http://api.xinyo.xin/api';

/**登录接口**/
export const Login = params => {
    return this.$axios.get(`${base}/Common/Login`, {
        params: params
    }).then(res => res);
};
/**
 * 火车票相关接口
 */
export const gettrainlist = params => {
    return this.$axios.get(`${base}/TrainInformation/SearchList`, {
        params: params
    }).then(res => res);
};
export const addTrain = params => {
    return this.$axios.post(`${base}/TrainInformation/add`,
        params
    );
};

export const editTrain = params => {
    return this.$axios.post(`${base}/TrainInformation/edit`,
        params
    );
};

export const deleteTrain = params => {
    return this.$axios.delete(`${base}/TrainInformation/delete`, {
        params: params
    }).then(res => res);
};

/**
 * 日常消费相关接口
 */
export const getDailyConsumptionlist = params => {
    return this.$axios.get(`${base}/CapitalFlow/SearchList`, {
        params: params
    }).then(res => res);
};
export const addDailyConsumption = params => {
    return this.$axios.post(`${base}/CapitalFlow/add`, params);
};
export const editDailyConsumption = params => {
    return this.$axios.post(`${base}/CapitalFlow/edit`, params);
};
export const deleteDailyConsumption = params => {
    return this.$axios.delete(`${base}/CapitalFlow/delete`, {
        params: params
    }).then(res => res);
};