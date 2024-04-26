
const userInfo = {
    namespaced: true,
    state:{
        userInfo:{},
    },
    mutations: {
        setUserInfo(state:any, userInfo:any) {
            state.userInfo = userInfo;
        },
    }
}
export default userInfo;

