<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onLoad() {
			
		},
		onShow: function() {
			let _this = this;
			// #ifdef APP-PLUS
			var info = plus.push.getClientInfo();
			console.log(JSON.stringify(info));
			/* 5+  push 消息推送 ps:使用:H5+的方式监听，实现推送*/
			plus.push.addEventListener("click", function(msg) {
				console.log("click:" + JSON.stringify(msg));
				console.log(msg.payload);
				console.log(JSON.stringify(msg));
				//这里可以写跳转业务代码
			}, false);
			// 监听在线消息事件    
			plus.push.addEventListener("receive", function(msg) {
				// plus.ui.alert(2);  
				//这里可以写跳转业务代码
				console.log("recevice:" + JSON.stringify(msg));
				plus.push.createMessage(msg.content, JSON.stringify(msg.payload), { title: msg.title });
				_this.yybf();
			}, true);  
			//#endif  
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			yybf(){
				console.log(12321);
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = '/static/audio/urge.mp3';
				innerAudioContext.onPlay(() => {
				  console.log('开始播放');
				});
				innerAudioContext.onError((res) => {
				  console.log(res.errMsg);
				  console.log(res.errCode);
				});
			}
		}
	}
</script>

<style>
	/* 引入封装好的css样式 */
	@import url("./ym.css");

	/* @import 'vant/lib/index.css'; */
	/*每个页面公共css */
	.global {
		background-color: #e6e6e6;
		height: 100vh;
	}
</style>
