import jlRequest from '@/common/utils/jlRequest'
import jlCatche from "@/common/utils/jlCatche.js"
// #ifdef H5
var wx = require('jweixin-module')
// #endif
/**
 * 登录相关接口
 */
export default class LoginApi {
    /**
     * 发送短信验证码
     */
    static getVerificationCode(config = {}){
        config.path = '/api/client/login/v1/getVerificationCode'
        return new jlRequest().post(config)
    }
	
	/**
	 * 手机号+验证码 登录
	 */
	static phonelogin(config = {}){
	    config.path = '/api/client/login/v1/phonelogin'
	    return new jlRequest().post(config)
	}

	/**
	 * 获取微信授权地址
	 */
	static wxAuthorize(config = {}){
	    config.path = '/api/client/login/v1/wxAuthorize'
	    return new jlRequest().post(config)
	}
	/**
	 * apk微信登录
	 */
	static wxLoginAndroid(config = {}){
	    config.path = '/api/client/wxlogin/v1/apkWxOpenidLogin'
	    return new jlRequest().post(config)
	}
	/**
	 * 该手机号是否已绑定微信
	 */
	static ifBindWeixin(config = {}){
	    config.path = '/api/client/login/v1/ifBindWeixin'
	    return new jlRequest().post(config)
	}

	/**
	 * 微信登陆后绑定手机号
	 */
	static bindPhone(config = {}){
	    config.path = '/api/client/login/v1/bindPhone'
	    return new jlRequest().post(config)
	}

	/**
	 * 发送邀请码
	 */
	static bindRecommender(config = {}){
	    config.path = '/api/client/login/v1/bindRecommender'
	    return new jlRequest().post(config)
	}

	/**
	 * 协议信息
	 */
	static agreement(config = {}){
	    config.path = '/api/client/login/v1/agreement'
	    return new jlRequest().post(config)
	}

	/**
	 * jssdk授权
	 */
	static wxConfig(config = {}){
		return new Promise((resolve,reject)=>{
			config.path = '/api/client/login/v1/wxjsdkSignature'
			// let jssdkauthed = jlCatche.getStorageSync("jssdkauthed")
			// if(!jssdkauthed){
				new jlRequest().post(config).then(res=>{
					wx.ready(ress=> {
						resolve()
					});
					wx.error((err)=>{
						reject()
					});
					let data = {
						...res,
						// debug: true,
						jsApiList: ['scanQRCode','updateAppMessageShareData','updateTimelineShareData']
					}
					console.log('config的入参')
					console.log(data)
					wx.config(data);
				})
			// }else{
			// 	resolve()
			// }
		})
	}

	/**
	 *  是否实名认证
	 */
	static ifrealname(config = {}){
		config.path = '/api/client/login/v1/ifrealname'
		return new jlRequest().post(config)
	}



	/**
	 *  设置购买信息公开
	 */
	static updateUserIsOpen(config = {}){
		config.path = '/api/client/nft/v1/updateUserIsOpen'
		return new jlRequest().post(config)
	}
	
	
	/**
	 *  实名认证-个人活体认证
	 */
	static lifeChek(config = {}){
		config.path = '/api/client/mine/auth/v1/lifeChek'
		return new jlRequest().post(config)
	}
	
	/**
	 *  实名认证-个人活体身份实名认证
	 */
	static faceIdcardCompare(config = {}){
		config.path = '/api/client/mine/auth/v1/faceIdcardCompare'
		return new jlRequest().post(config)
	}

	/**
	 *  密码登录
	 */
	static passwordLogin(config = {}){
		config.path = '/api/client/login/v1/passwordLogin'
		return new jlRequest().post(config)
	}
	
	
	/**
	 *  反馈意见
	 */
	static feedback(config = {}){
		config.path = '/api/client/sns/v1/feedback'
		return new jlRequest().post(config)
	}

}



