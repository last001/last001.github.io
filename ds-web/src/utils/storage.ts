/**
 * storage 封装
 */
import config from '@dscloud/config'

export default {
    setItem: function (key: any, val: any) {
        const storage = this.getStroage();
        storage[key] = val;
        window.localStorage.setItem(config.namespace, JSON.stringify(storage));
    },
    getItem: function (key:any) {
        return this.getStroage()[key];
    },
    getStroage(){
        let value = window.localStorage.getItem(config.namespace) || "{}";
        return JSON.parse(value);
    },
    clearItem(key:any){
        let storage = this.getStroage();
        delete storage[key];
        window.localStorage.setItem(config.namespace,JSON.stringify(storage));
    },
    clearAll(){
        window.localStorage.clear();
    }
}
