import axios from "axios";
import config from "@/config";

let showError:any = true;//提示错误信息
const service = axios.create({
    // baseURL: env.MODE === 'development' ? '/api' : "https://yeedev.1miedu.com/",
    baseURL: config.mock ? config.mockApi : config.baseApi,
    timeout: 8000
})


// request 拦截器
service.interceptors.request.use(
    (req:any) => {
        // 在这里可以设置请求头、请求参数等return req
        if(req.hasOwnProperty("showError")){
            showError = req.showError;
        }else{
            showError = true;
        }
        const headers = req.headers;
        if(!headers.Authorization){ // token 赋值 
            headers.Authorization = "bearer " + "3a69fe22-5221-4f34-9205-151bdf3f901b";
        }
        return req;
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    (response:any) => {
        // 在这里处理返回数据
        const { data } = response;
        if(data.code !== "000000"){
            return Promise.reject(new Error(data.description || "请求错误"));
        }else{
            return data.data;
        }
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

let request:any = (options:any) =>{
    options.method = options.method || "get";
    return service(options);
}

["post","get","put","delete"].forEach((item:any) =>{
    request[item] = (url:string,data:string,options:any) =>{
        return request({
            url,
            data,
            method:item,
            ...options
        }) 
    }
})

export default request;