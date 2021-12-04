import {
  state
} from "./state";

export const actions = {
  // 个人信息
  setInfoData({
    state
  }, DataList) {
    state.InfoData = DataList;
  },
  // 公司信息
  setCompanData({
    state
  }, companList) {
    state.companyData = companList;
  },
  // 店铺信息
  setShopData({
    state
  }, shopList) {
    state.shopData = shopList;
  },
  // 展开状态
  setWstateStatus({
    state
  }, Wstate) {
    state.WstateStatus = Wstate;
  },
  // num值
  setNum({
    state
  }, nums) {
    state.num = nums;
  },
  // 测试定时器
  getTimerNum({
    state
  }, Val) {
    state.timerNum = Val;
  },
  // 上传头像
  setHeadList({
    state
  }, list) {
    state.headList = list;
  },
  // 000
  setHomeTitleStatus({
    state
  }, title) {
    state.homeTitleStatus = title;
  },
  // 侧边栏 子路由是否展开
  setIsChildren({
    state
  }, isChildren) {
    state.sideStatus.isChildren = isChildren;
  },
  // 侧边栏 子路由是否展开
  setArrow({
    state
  }, arrow) {
    state.sideStatus.arrow = arrow;
  },
  // 库管列表与子页面是否刷新状态值
  setFirstStatus({
    state
  }, first) {
    state.firstStatus = first;
  },
  // 视频src
  setVideoSrc({
    state
  }, src) {
    state.videoSrc = src;
  },
  // 复制对象
  copyPagingList({state},array){
    state.pagingList = array;
  },
  // 添加 pagingList
  setPagingList({
    state
  }, obj) {
    if (state.pagingList.length > 0) {
      for (let i = 0; i < state.pagingList.length; i++) {
        if (state.pagingList.findIndex((target) => target.titleB == obj.titleB === true) > -1) {
          return;
        } else {
          state.pagingList.push(obj);
        }
      }
    } else {
      state.pagingList.push(obj);
    }
  },
  // 删除 pagingList
  detPagingList({
    state
  }, obj) {
    for (let i = state.pagingList.length - 1; i >= 0; i--) {
      if (obj.titleB == state.pagingList[i].titleB) {
        // console.log("state.pagingList[i] ==>", state.pagingList[i]);
        state.pagingList.splice(i, 1);
      }
    }
  },
  //删除所有   
  detAllPagingList({state}){
    state.pagingList = [];
  },
  // 删除未选中列表
  detActivePagingList({state}){
    for (let i = state.pagingList.length - 1; i >= 0; i--) {
      if(!state.pagingList[i].isActive){
        state.pagingList.splice(i, 1);
      }
    }
  },
  // Home 获取未读消息值
  setOnlineList({state},list){
    state.onlineList = list;
  }
  
}
