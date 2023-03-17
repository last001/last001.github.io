import config from '@dscloud/config'
import router from '@dscloud/router'
import store from '@dscloud/store'
import utils from '@dscloud/utils'
import * as coms from "@dscloud/components";

import "./assets/styles/core.css"
import "./assets/styles/theme-default/index.scss"

//自动化导入组件
let components = []
for (let name in coms){
    components.push(coms[name]);
}
const install = (app:any)=> {
    components.map(item => {
        app.component(item.name,item)
    })
}

//导出
export default {install}
export * from "./api"
export {
    config,
    router,
    store,
    utils
}


