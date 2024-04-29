import request from '@/utils/request';
import { type CountTotal, LineMonths} from './woInterface.ts';
export default {
    /**
     * @function getHomeCountTotal 获取首页数据统计
     */
    getHomeCountTotal(data: CountTotal) {
        return request({
            url: "getHomeCountTotal", 
            method: "get",
            data
        })
    },
    getLineMonthsList(data:LineMonths){
        return request({
            url: "getLineMonthsList", 
            method: "get",
            data
        })
    }
}