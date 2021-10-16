import { state } from "./state";

export const actions = {
    // 个人信息
    setInfoData({state},DataList){
        state.InfoData = DataList;
        
    },
    // 公司信息
    setCompanData({state},companList){
        state.companyData = companList;
    },
    // 展开状态
    setWstateStatus({state},Wstate){
        state.WstateStatus = Wstate;
    },
    // num值
    setNum({state},nums){
        state.num = nums;
    },
    // 测试定时器
    getTimerNum({state},Val){
        state.timerNum = Val;
    },
    // 上传头像
    setHeadList({state},list){
        state.headList = list;
    },
    // 000
    setHomeTitleStatus({state},title){
        state.homeTitleStatus = title;
    },
    // 侧边栏 子路由是否展开
    setIsChildren({state},isChildren){
        state.sideStatus.isChildren = isChildren;
    },
    // 侧边栏 子路由是否展开
    setArrow({state},arrow){
        state.sideStatus.arrow = arrow;
    },
    // 库管列表与子页面是否刷新状态值
    setFirstStatus({state},first){
        state.firstStatus = first;
    },
    // 视频src
    setVideoSrc({state},src){
        state.videoSrc = src;
    }
}