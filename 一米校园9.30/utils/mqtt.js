export const MQTT_IP = '139.198.122.78:8083/mqtt' //mqtt地址端口
const MQTT_USERNAME = 'admin' //mqtt用户名
const MQTT_PASSWORD = 'public' //密码

export const MQTT_OPTIONS = {
	connectTimeout: 5000,
	clientId: '',
	username: MQTT_USERNAME,
	password: MQTT_PASSWORD,
	clean: false,
	keepAliveInterval: 10
}
