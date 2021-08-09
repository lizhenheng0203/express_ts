import axios from 'axios';
import qs from 'qs';


const api = axios.create({
    baseURL: 'http://leyidc.simpysam.com/api'
});

export const getDealTimeToken = (data:any) => {
    return api({
        url: '/auth',
        method: 'post',
        headers:{"Content-Type":"application/x-www-form-urlencoded"},
        data:qs.stringify(data)
    });
}

export const getDealTime = (params:any,headers:any) => {
    return api({
        url: '/opevent/user/action/status',
        method: 'get',
        headers,
        params
    });
}
