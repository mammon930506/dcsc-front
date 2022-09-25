
import jlConfig from './jlConfig'
import jlCatche, {
	KEY_OPENID,
	KEY_TOKEN
} from './jlCatche'
import md5 from './md5'
import {
	createContent,
	resolveContent
} from './tripledes3'
import {relogin} from "@/common/common"

// uni.addInterceptor('request', {
//   invoke(args) {

//   },
//   success(args) {

//   },
//   fail(err) {

//     // console.log('interceptor-fail',err)
//   },
//   complete(res) {
//     // console.log('interceptor-complete',res)
//   }
// })


/**
 * 网络请求协议类
 * 加解密+网络请求
 */
export default class jlRequest {
	constructor() {

	}
	/**
	 *
	 * @param {*} url
	 */
	isUrlEnc(url) {
		let isUrlEnc = true;
		if (
			// url == "/api/sharing/findElementList" ||
			url == "/users/getWxOpenId" ||
			url == "/jsException"
		) {
			isUrlEnc = false
		}
		return isUrlEnc
	}
	isUrlToken() {
		let isUrlEnc = true;
		if (
			url == "/jsException"
		) {
			isUrlEnc = false
		}
		return isUrlEnc
	}
	/**
	 * 签名相关内容
	 * @param {*} params
	 */
	signWithParams(params) {

		if (params) {
			//排序
			var sortParams = {};
			var sortKeys = Object.keys(params).sort();
			for (var index = 0; index < sortKeys.length; index++) {
				const key = sortKeys[index];
				sortParams[key] = params[key];
			}
			//encode
			var encodeStr = '';
			if (sortParams) {
				for (var key in sortParams) {
					if (params.hasOwnProperty(key)) {
						var value = params[key];
						if (value === null || value === ''||value === undefined) {
							continue;
						}
						if (Array.isArray(value)) {
							value = JSON.stringify(value);
							value = value.replace(/"/g, "");
							value = value.replace(/:/g, "=");
							value = value.replace(/\ /g, "");
						} else if (typeof value == "string") {
							value = value.replace(/\ /g, "");
						}

						encodeStr +=
							key + "=" + value + "&";
					}
				}
			}
			encodeStr += 'key=' + jlConfig.m_encKey;
			console.log("签名原始数据：" + encodeStr);
			return md5.Md5.hashStr(encodeStr).toString().toUpperCase();
		}

		return ''
	}
	/**
	 *
	 * @param {*} config
	 * 例如:{
	 *        url:'www.baidu.com',
	 *        path:"/login",
	 *        params:{'key':'value'},
	 *        isLoading: true,
	 *        success:function(res){},
	 *        fail:function(error){}
	 *     }
	 */
	post(config = {}) {
		return new Promise((resolve, reject) => {
			const {
				url,
				path,
				params,
				isLoading
			} = config;
			if (!path) {
				reject('请求路径为空')
			}
			if (isLoading) {
				uni.showLoading({
					title: '正在加载...',
				})
			}
			let userParams = params || {}
			let bodyParams = {}
			//设置公用报文
			bodyParams['deviceId'] = jlConfig.deviceId
			// bodyParams['appId'] = jlConfig.appId
			const header = {
				'Content-Type': "application/json; charset=utf-8",
				"appId": jlConfig.appId
			}

			try {
				const openid = jlCatche.getStorageSync(KEY_OPENID)
				const token = jlCatche.getStorageSync(KEY_TOKEN)
				if (openid) {
					// 赋值
					header['openid'] = openid;
					bodyParams['openid'] = openid;
				}
				if (token) {
					// 赋值
					// bodyParams['Authorization'] = this.isUrlToken(path) ? token : ''
					bodyParams['Authorization'] = token
				}
			} catch (error) {
				// reject('获取缓存参数失败');
			}
			bodyParams["sign"] = this.signWithParams(userParams);
			// 加解密判断
			if (jlConfig.isEncrypt) {
				header["encodeMethod"] = "1";
				header["signMethod"] = "1";
				bodyParams["body"] = createContent(userParams);
				// bodyParams.userId = JSON.parse(jlCatche.getStorageSync("userInfo")).userCode
			}else{
				bodyParams["body"] = userParams;
				// bodyParams["body"].userCode = jlCatche.getStorageSync("userCode")
				// bodyParams.userId = JSON.parse(jlCatche.getStorageSync("userInfo")).userCode
			}
			console.log(bodyParams);
			uni.request({
				url: (url || jlConfig.apiUrl) + path,
				data: bodyParams,
				method: "POST",
				header: header,
				success: res => {
					if (isLoading) {
						// 关闭动画
						uni.hideLoading()
					}
					if (res.data) {
						var re = res.data;
						if (jlConfig.isEncrypt == true && this.isUrlEnc(config.path)&&re.body ) {
							re.body = resolveContent(re.body);
						}
						var code = re.returnCode;
						if (code == 'SUCCESS') {
							var data = re.body;
							console.log('解密后的数据',data)
							resolve(data);
						} else {
							var des = re.returnDes;
							if (code == "INVALIDTOKEN") {
								console.log(config.path);
								relogin()
								return
							}
							if ((des && des.length > 50) || !des) {
								reject('数据异常，请稍后重试');
							} else {
								reject(des);
							}
						}
					} else {
						reject('数据异常，请稍后重试');
					}
				},
				fail: err => {
					if (isLoading) {
						// 关闭动画
						uni.hideLoading()
					}
					reject('网络异常，请稍后重试');

				}
			})


		});
	}
	/**
	 * 上传图片二进制流
	 * @param {Object} config
	 * 例如:{
	 *        url:'www.baidu.com',
	 *        path:"/file/upload/stream",
	 *        filePath:'',
	 *        formData:{'key':'value'},
	 *        isLoading: true,
	 *        success:function(res){},
	 *        fail:function(error){}
	 *     }
	 */
	uploadFile(config = {}) {
		return new Promise((resolve, reject) => {
			const {
				url,
				isLoading,
				filePath
			} = config;
			if (isLoading) {
				uni.showLoading({
					title: '正在上传...',
				})
			}
			const header = {
				"appId": jlConfig.appId
			}
			try {
				const openid = jlCatche.getStorageSync(KEY_OPENID)
				const token = jlCatche.getStorageSync(KEY_TOKEN)
				if (openid) {
					// 赋值
					header['openid'] = openid;
				}
				if (token) {
					// 赋值
					header['Authorization'] = this.isUrlToken(path) ? token : ''
				}
			} catch (e) {
				//TODO handle the exception
				reject('获取缓存参数失败');
			}
			uni.uploadFile({
				url: (url || jlConfig.apiUrl) + '/file/upload/stream',
				filePath: filePath,
				name: 'file',
				header: header,
				formData: {},
				success: res => {
					// console.log(res);
					if (isLoading) {
						//关闭动画
						uni.hideLoading()
					}
					if (res.body) {
						let re = JSON.parse(res.data);
						let code = re.returnCode;
						if (code == 'SUCCESS') {
							let data = re.data;
							resolve(data);
						} else {
							var des = re.returnDes;
							if (code == "INVALIDTOKEN") {
								des = "会话过期，请重新登录!";
								jlCatche.setStorage(KEY_TOKEN, "");
							}
							if ((des && des.length > 50) || !des) {
								reject('数据异常，请稍后重试');
							} else {
								reject(des);
							}
						}
					} else {
						reject('数据异常，请稍后重试');
					}

				},
				fail: res =>  {
					if (isLoading) {
						//关闭动画
						uni.hideLoading()
					}
					console.log(res)
					reject('网络异常，请稍后重试');
				},
				complete: function(res) {


				},
			})
		});
	}
}
