/**
 * Mutations业务层数据提交
 */
import storage from '@dscloud/utils/storage'

export default {
    saveUserInfo(state:any,userInfo:object){
        state.userInfo = userInfo;
        storage.setItem("userInfo",userInfo);
    },
    saveAuthorInfo(state:any,authorInfo:object){
        state.authorInfo = authorInfo;
        storage.setItem("authorInfo",authorInfo);
    }
}
