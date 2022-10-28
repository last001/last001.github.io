/* 数据格式的转换工具类 */
export default{
	/* 字符串转arraybuffer */
	string2buffer: function(str) {
		// 首先将字符串转为16进制
		let val = str
		// 将16进制转化为ArrayBuffer
		return new Uint8Array(val.match(/[\da-f]{2}/gi).map(function(h) {
			return parseInt(h, 16)
		})).buffer
	},
	ab2hex(buffer) {
		const hexArr = Array.prototype.map.call(
			new Uint8Array(buffer),
				function(bit) {
				return ('00' + bit.toString(16)).slice(-2)
			}
		)
		return hexArr.join('')
	},
	/* arraybuffer 转字符串 */
	bufferString: function(str) {
		// ArrayBuffer转16进度字符串示例
		function ab2hex(buffer) {
			const hexArr = Array.prototype.map.call(
				new Uint8Array(buffer),
					function(bit) {
					return ('00' + bit.toString(16)).slice(-2)
				}
			)
			return hexArr.join('')
		}
		//16进制
		let systemStr = ab2hex(str)
		// console.log(hexCharCodeToStr(systemStr),99)
		function hexCharCodeToStr(hexCharCodeStr) {
			var trimedStr = hexCharCodeStr.trim();
			var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ?trimedStr.substr(2):trimedStr;
			var len = rawStr.length;
			if (len % 2 !== 0) {
				alert("Illegal Format ASCII Code!");
				return "";
			}
			var curCharCode;
			var resultStr = [];
			for (var i = 0; i < len; i = i + 2) {
				curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
				let str5 = String.fromCharCode(curCharCode)
				if (str5.startsWith('\n') == false) {
					resultStr.push(String.fromCharCode(curCharCode));
				}
			}
			return resultStr.join("");
		
		}
		// console.log(hexCharCodeToStr(systemStr),888)
		return hexCharCodeToStr(systemStr)
	
	},
	
}