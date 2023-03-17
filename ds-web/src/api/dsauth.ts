/**
 * oauth api
 */
import request from '@dscloud/utils/request'
// @ts-ignore
import qs from "qs";
const contextPath = "/dsauth";
export default {
    getPublicKey(){
        return request({
            url: contextPath+'/auth/publickey',
            method:"post"
        });
    },
    genVerifyImage(params:object){
        return request({
            url: contextPath+'/captcha/gen',
            data: qs.stringify(params),
            method:"post"
        });
    },
    checkVerifyImage(requestId:String,data:object){
        return request({
            url: contextPath + '/captcha/check',
            method: "post",
            params: {
                requestId: requestId
            },
            data: data
        });
    },
    loginPwd(params:any) {
        params["grant_type"] = "password";
        params["scope"] = "basic";
        return request({
            url: contextPath+'/oauth/token',
            method:"post",
            data: qs.stringify(params),
            headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            auth: {
                username: 'dscloud-web',
                password: 'Dscloud@2022'
            },
            withCredentials:true
        });
    },
}
