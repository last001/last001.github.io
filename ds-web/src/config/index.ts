/**
 * 环境配置封装
 */
const env:String = import.meta.env.MODE || 'prod';
const EnvConfig:any = {
    dev: {
        baseApi: '/api',
        mockApi: 'https://www.fastmock.site/mock/551f048ce4cb51068a78fae441cfb11b/api'
    },
    test: {
        baseApi: '/api',
        mockApi: 'https://www.fastmock.site/mock/551f048ce4cb51068a78fae441cfb11b/api'
    },
    prod:{
        baseApi:'/api',
        mockApi:'https://www.fastmock.site/mock/551f048ce4cb51068a78fae441cfb11b/api'
    }
}

export default{
    namespace:"dscloud",
    env,
    mock:false,
    ...EnvConfig[env as keyof typeof EnvConfig],
}
