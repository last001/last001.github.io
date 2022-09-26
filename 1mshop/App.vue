<script>
	import config from '@/common/config.js';
	import globalData from '@/common/globalData.js';
	export default {
		data(){
			return{
				
			}
		},
		// 分享
		onShareAppMessage(res){
			console.log("res ==>",res);
			return{
				title:"本地生活服务",
				path:"/pages/index/index",
				imageUrl:"/static/mipmap-mdpi1/storeImage.png"
			}
		},
		onLoad() { 
		},
		onShow() {
			// console.log(config)
			// 胶囊 位置信息
			// #ifdef MP-WEIXIN
			this.getSystemInfo();
			// #endif
			// 更新
			this.bindupgrade();
		},
		methods:{
			// 获取小程序更新机制兼容
			bindupgrade() {
			  if (uni.canIUse('getUpdateManager')) {
			    const updateManager = uni.getUpdateManager()
			    updateManager.onCheckForUpdate(function (res) {
			      // 请求完新版本信息的回调
			      if (res.hasUpdate) {
			        updateManager.onUpdateReady(function () {
			          uni.showModal({
			            title: '更新提示',
			            content: '新版本已经准备好，是否重启应用？',
			            success: function (res) {
			              if (res.confirm) {
			                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
			                updateManager.applyUpdate()
			              }
			            }
			          })
			        })
			        updateManager.onUpdateFailed(function () {
			          // 新的版本下载失败
			        })
			      }
			    })
			  }
			},
			// 胶囊 位置信息
			getSystemInfo(){
				uni.getSystemInfo({
					success: (result) => {
						// #ifdef MP-WEIXIN
						let statusBarHeight = result.statusBarHeight + 'px';
						let contentTop = result.statusBarHeight + 44 + 'px';
						// 获取右侧胶囊的信息 单位px
						let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
						//bottom: 胶囊底部距离屏幕顶部的距离
						//left:   胶囊左侧距离屏幕左侧的距离
						//right:  胶囊右侧距离屏幕左侧的距离
						//top:    胶囊顶部距离屏幕顶部的距离
						//width:  胶囊宽度
						//height: 胶囊高度
						// console.log('计算胶囊右侧距离屏幕右边距离', result.screenWidth - menuButtonInfo.right)
						let menuWidth = menuButtonInfo.width + 'px'
						let menuHeight = menuButtonInfo.height + 'px'
						let menuBorderRadius = menuButtonInfo.height / 2 + 'px'
						let menuRight = result.screenWidth - menuButtonInfo.right + 'px'
						let menuTop = menuButtonInfo.top + 'px';
						let menuInfo = {
							statusBarHeight: statusBarHeight, //状态栏高度----用来给自定义导航条页面的顶部导航条设计padding-top使用：目的留出系统的状态栏区域
							menuWidth: menuWidth, //右侧的胶囊宽度--用来给自定义导航条页面的左侧胶囊设置使用
							menuHeight: menuHeight, //右侧的胶囊高度--用来给自定义导航条页面的左侧胶囊设置使用
							menuBorderRadius: menuBorderRadius, //一半的圆角--用来给自定义导航条页面的左侧胶囊设置使用
							menuRight: menuRight, //右侧的胶囊距离右侧屏幕距离--用来给自定义导航条页面的左侧胶囊设置使用
							menuTop: menuTop, //右侧的胶囊顶部距离屏幕顶部的距离--用来给自定义导航条页面的左侧胶囊设置使用
							contentTop: contentTop, //内容区距离页面最上方的高度--用来给自定义导航条页面的内容区定位距离使用
						}
						uni.setStorageSync('menuInfo', menuInfo)
						
						// console.log(uni.getStorageSync('menuInfo'))
						// #endif
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			getinfo(){
				console.log("4564646")
			},
		}
	}
</script>

<style lang="scss">
	.fr{
		float: right;
	}
	/*引入uview基础样式 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	/*每个页面公共css */
</style>
