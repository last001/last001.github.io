<!-- <template>
	<view class="content">

		<view class="text-area">
			<view class="btn" @click="playt">播放</view>
		</view>

	</view>
</template>

<script>
	import {
		v4
	} from 'uuid';
	import {
		MQTT_IP,
		MQTT_OPTIONS
	} from '@/utils/mqtt.js';
	var mqtt = require('mqtt/dist/mqtt.js')
	var client
	export default {
		data() {
			return {
				// topic: 'Topic_exchange', //要订阅的主
				topic: 'shopid'

			}
		},
		mounted() {
			this.connect() //连接
		},
		methods: {
			connect() {
				MQTT_OPTIONS.clientId = v4()

				var that = this
				// #ifdef H5
				client = mqtt.connect('mqtt://' + MQTT_IP, MQTT_OPTIONS)
				// #endif
				// #ifdef MP-WEIXIN||APP-PLUS
				client = mqtt.connect('wx://' + MQTT_IP, MQTT_OPTIONS)
				// #endif
				console.log(client)
				client.on('connect', function() {
					console.log('连接成功')
					client.subscribe(that.topic, function(err) {
						if (!err) {
							console.log('订阅成功')
							console.log(!err, "00000")
						}
					})

				}).on('reconnect', function(error) {
					console.log('正在重连...', that.topic)
				}).on('error', function(error) {
					console.log('连接失败...', error)
				}).on('end', function() {
					console.log('连接断开')
				}).on('message', function(topic, message) {
					console.log('接收信息：', message)
					console.log('接收推送信息：', message.toString())
					var msg = JSON.parse(message)
					console.log("111", msg.messageType);
					if (msg.messageType == '1') {
						console.log("成功1")
						that.playx()
					} else if (msg.messageType == '2') {
						console.log("成功2");
						that.playc()
					} else if (msg.messageType == '3') {
						console.log("成功3");
						that.playt()
					} else {
						console.log("失败");
					}
				})
			},

			playx() {
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = '/static/audio/new.mp3';
				innerAudioContext.play(() => {
					console.log('开始播放');
				});
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
				});
			},
			playc() {
				let innerAudioContext = uni.createInnerAudioContext()
				innerAudioContext.volume = 1
				innerAudioContext.src = '/static/audio/urge.mp3'
				innerAudioContext.play()
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
				});
			},
			playt() {
				let innerAudioContext = uni.createInnerAudioContext()
				innerAudioContext.volume = 1
				innerAudioContext.src = '/static/audio/chargback.mp3'
				innerAudioContext.play()
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
				});
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.btn {
		background-color: #05c0ab;
		text-align: center;
		border-radius: 30rpx;
		padding: 30rpx;
	}
</style> -->



<template>
	<view class="content">

		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	import {
		v4
	} from 'uuid';
	import {
		MQTT_IP,
		MQTT_OPTIONS
	} from '@/utils/mqtt.js';
	var mqtt = require('mqtt/dist/mqtt.js')
	var client
	export default {
		data() {
			return {
				title: 'hello',
				topic: 'Topic_exchange' //要订阅的主题
			}
		},
		mounted() {
			this.connect() //连接
		},
		methods: {
			connect() {
				debugger
				MQTT_OPTIONS.clientId = v4()

				var that = this
				// #ifdef H5
				client = mqtt.connect('mqtt://' + MQTT_IP, MQTT_OPTIONS)
				// #endif
				// #ifdef MP-WEIXIN||APP-PLUS
				client = mqtt.connect('wx://' + MQTT_IP, MQTT_OPTIONS)
				// #endif
				console.log(client)
				client.on('connect', function() {
					console.log('连接成功')
					client.subscribe(that.topic, function(err) {
						console.log(err)
						if (!err) {
							console.log('订阅成功')
						}
					})
				}).on('reconnect', function(error) {
					console.log('正在重连...', that.topic, error)
				}).on('error', function(error) {
					console.log('连接失败...', error)
				}).on('end', function() {
					console.log('连接断开')
				}).on('message', function(topic, message) {
					//	that.bfa();
					console.log('接收推送信息：', message.toString())
					var msg = JSON.parse(message)
					console.log("111", msg.messageType);
					if (msg.messageType == '1') {
						console.log("成功1")
						that.bfa()
					} else if (msg.messageType == '2') {
						console.log("成功2");
						that.bfb()
					} else {
						console.log("失败");
					}
				})
			},

			bfa() {
				let innerAudioContext = uni.createInnerAudioContext()
				innerAudioContext.volume = 1
				innerAudioContext.src = '/static/audio/new.mp3'
				innerAudioContext.play()
				console.log("1111111111")
				innerAudioContext.onError((res) => {
					// console.log(res.errMsg);
					//  console.log(res.errCode);
				});
			},
			bfb() {
				let innerAudioContext = uni.createInnerAudioContext()
				innerAudioContext.volume = 1
				innerAudioContext.src = '/static/audio/urge.mp3'
				innerAudioContext.play()
				console.log("1111111111")
				innerAudioContext.onError((res) => {
					// console.log(res.errMsg);
					//  console.log(res.errCode);
				});
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}



	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
