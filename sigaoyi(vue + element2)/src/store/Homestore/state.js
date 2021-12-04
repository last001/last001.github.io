export const state = {
    // 个人信息
    InfoData:{},
    // 公司信息
    companyData:{},
    // 店铺信息
    shopData:[],
    // 展开状态
    WstateStatus:true,
    // sildeNavberNum
    num:"",
    // 测试定时器
    timerNum:"",
    // 头像imgSrc
    headList:{
        src:"",
        isActive:true,
    },
    // home-title
    homeTitleStatus:true,
    // 侧边栏 子路由 是否展开
    sideStatus:{
        isChildren:true,
        arrow:true,
    },
    isChildren:true,
    // 库存列表 刷新状态值
    firstStatus:true,
    // 视频 src
    videoSrc:"",
    // sideNavbar ==> titleNavbar
    pagingList:[],
    // online
    onlineList:{
        isUnread:false,
        count:'',
        list:[]
    },
}