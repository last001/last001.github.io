/**
 * 环境配置封装
 */

const env:String = import.meta.env.MODE || 'prod';
const EnvConfig:any = {
    development: {
        baseApi: '/api',
        mockApi: 'http://127.0.0.1:4523/m1/4411173-4056086-default'
    },
    prod:{
        baseApi:'/api',
        mockApi:'http://127.0.0.1:4523/m1/4411173-4056086-default'
    }
}

export default{
    namespace:"dscloud",
    env,
    mock:true,
    ...EnvConfig[env as keyof typeof EnvConfig],
}
