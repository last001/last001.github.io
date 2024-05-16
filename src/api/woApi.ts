import request from '@/utils/request';
import { type CountTotal, UserId} from './woInterface.ts';
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
    /**
     * @function getLineMonthsList 获取Line数据统计
     */
    getLineMonthsList(data:UserId){
        return request({
            url: "getLineMonthsList", 
            method: "get",
            data
        })
    },
    /**
     * @function getRangkingData 获取排行榜数据
     */
    getRangkingData(data:UserId){
        return request({
            url: "getRangkingData", 
            method: "get",
            data
        })
    }
}