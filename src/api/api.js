import axios from 'axios'


let base = 'http://api.xinyo.xin/api';

export const gettrainlist = params => {
    return axios.get(`${base}/TrainInformation/SearchList`, params).then(res => res);
}