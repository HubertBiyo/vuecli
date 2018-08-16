import axios from 'axios'


let base = 'http://api.xinyo.xin/api/Travel';

export const GetAllTravel = params => { return axios.post(`${base}/GetAllTravel`, params).then(res => res); }