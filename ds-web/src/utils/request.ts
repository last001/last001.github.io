/**
 * request 封装
 */
import axios from 'axios'
import config from '@dscloud/config'
import {ElMessage} from 'element-plus'
import router from '@dscloud/router'
import storage from './storage'

const TOKEN_INVALID = "Token认证失败，请重新登录";
const NETWORK_ERROR = "网络请求异常，请稍候重试";

const service  = axios.create({
    baseURL:config.baseApi,
    timeout:8000
});

//请求拦截
service.interceptors.request.use((req)=>{
    const headers:any = req.headers;
    if(headers.Authorization==null) {
        const { access_token } = storage.getItem("authorInfo")||{};
        headers.Authorization = "bearer "+ access_token;
    }
    return req;
})

//响应拦截
service.interceptors.response.use((res)=>{
    const {code,data,message,description} = res.data;
    if(code === "000000"){
        return data;
    }else if(code === "200208"){
        ElMessage.error(TOKEN_INVALID);
        storage.clearItem("authorInfo");
        setTimeout(()=>{
            router.push('/login');
        },1500);
        return Promise.reject(TOKEN_INVALID);
    }else{
        //ElMessage.error(NETWORK_ERROR);
        ElMessage.error((code+":"+description) || NETWORK_ERROR);
        return Promise.reject(res.data);
    }
})

/**
 * 核心请求函数
 * @param options
 * @returns {AxiosPromise}
 */
let request:any = (options:any)=> {
    options.method = options.method || 'get';
    if (options.method.toLocaleLowerCase() === "get") {
        options.params = options.data;
    }
    if (typeof (options.mock) != "undefined") {
        config.mock = options.mock;
    }
    if (config.env === 'prod') {
        service.defaults.baseURL = config.baseApi;
    } else {
        service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
    }
    return service(options)
}

['get','post','put','delete','patch'].forEach((item:string)=>{
    request[item] = (url:any,data:any,options:any) =>{
        return request({
            url,
            data,
            method:item,
            ...options
        });
    }
});

export default  request;
