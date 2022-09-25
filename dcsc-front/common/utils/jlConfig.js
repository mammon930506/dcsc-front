/**
 * 环境相关配置
 */
class jlConfig {
	static hostUrl = ''
	static apiUrl = ''
	static imgUrl = ''
	static imgSuffix = ''
	static imPrefix = ''
	static optionGuide = ''
	static merNo = '181300001005'
	static appId = '13181300001005'
	static deviceId = 'hfminiprogramid'
	static m_encKey = '804aaa6d8adb469c8e1a97bafed44ce9'
	static isEncrypt = true
	/**
	 * 开发环境
	 */
	static setDevEnv() {
		jlConfig.hostUrl = "https://dev.dcepstc.com/h5"
		// #ifdef H5
		jlConfig.apiUrl = "/dcsc-interface"
		// jlConfig.apiUrl = "https://h5.lanyueverse.com/dcsc-interface"
		// jlConfig.apiUrl = "https://dev.dcepstc.com/dcsc-interface"
		// jlConfig.apiUrl = "http://192.168.2.102:32188/dcsc-interface"
		// #endif 
		// #ifdef APP-PLUS
		jlConfig.apiUrl = "https://dev.dcepstc.com/dcsc-interface"
		// jlConfig.apiUrl = "http://192.168.2.102:32188/dcsc-interface"
		// #endif
		// jlConfig.apiUrl = "http://192.168.2.102:32188/dcsc-interface"
		// jlConfig.apiUrl = "http://192.168.2.101:32188/dcsc-interface";
		// jlConfig.apiUrl = "http://192.168.2.103:32188/dcsc-interface";
		// jlConfig.apiUrl = "https://dev.dcepstc.com/dcsc-interface";
		jlConfig.imgUrl = "https://lanyueverse.oss-cn-hangzhou.aliyuncs.com";
		jlConfig.imgSuffix = "?x-oss-process=image/quality,q_60/format,jpg"
		jlConfig.imPrefix = 'Dcsc_test'
		jlConfig.optionGuide = "https://yfzx.whty.com.cn/hfyh/#/option-guide";
		jlConfig.merNo = '666';
		jlConfig.appId = '888';
		jlConfig.deviceId = jlConfig.deviceId;
		jlConfig.m_encKey = "804aaa6d8adb469c8e1a97bafed44ce9";
		jlConfig.isEncrypt = true
	}
	/**
	 * 测试环境
	 */
	static setTestEnv() {
		jlConfig.hostUrl = "https://dev.dcepstc.com/h5"
		// #ifdef H5
		jlConfig.apiUrl = "/dcsc-interface"
		// #endif 
		// #ifdef APP-PLUS
		jlConfig.apiUrl = "https://dev.dcepstc.com/dcsc-interface"
		// #endif
		jlConfig.imgUrl = "https://lanyueverse.oss-cn-hangzhou.aliyuncs.com";
		jlConfig.imgSuffix = "?x-oss-process=image/quality,q_60/format,jpg"
		jlConfig.imPrefix = 'Dcsc_test'
		jlConfig.optionGuide = "https://yfzx.whty.com.cn/hfyh/#/option-guide";
		jlConfig.merNo = '666';
		jlConfig.appId = '888';
		jlConfig.deviceId = jlConfig.deviceId;
		jlConfig.m_encKey = "804aaa6d8adb469c8e1a97bafed44ce9";
		jlConfig.isEncrypt = true
	}

	/**
	 * beta环境
	 */
	static setBetaEnv() {
		jlConfig.hostUrl = "https://yfzx.whty.com.cn/beta-c2b/"
		jlConfig.apiUrl = "https://yfzx.whty.com.cn/beta-c2b/hf-marketing-interface"
		jlConfig.imgUrl = "https://jjcp.oss-cn-hangzhou.aliyuncs.com";
		jlConfig.imgSuffix = "?x-oss-process=image/quality,q_60/format,jpg"
		jlConfig.imPrefix = 'Dcsc_test'
		jlConfig.optionGuide = "https://yfzx.whty.com.cn/beta-hfyh/#/option-guide";
		jlConfig.merNo = jlConfig.merNo;
		jlConfig.appId = jlConfig.appId;
		jlConfig.deviceId = jlConfig.deviceId;
		jlConfig.m_encKey = "804aaa6d8adb469c8e1a97bafed44ce9";
		jlConfig.isEncrypt = true
	}
	/**
	 * 生成环境
	 */
	static setProdEnv() {
		// jlConfig.hostUrl = "https://dev.dcepstc.com/h5"
		jlConfig.hostUrl = "https://h5.lanyueverse.com"
		// #ifdef H5
		jlConfig.apiUrl = "/dcsc-interface"
		// #endif
		// #ifdef APP-PLUS
		jlConfig.apiUrl = "https://h5.lanyueverse.com/dcsc-interface"
		// #endif
		jlConfig.imgUrl = "https://lanyueverse.oss-cn-hangzhou.aliyuncs.com";
		jlConfig.imgSuffix = "?x-oss-process=image/quality,q_60/format,jpg"
		jlConfig.imPrefix = 'Dcsc'
		// jlConfig.imPrefix = 'Dcsc_test'
		jlConfig.optionGuide = "https://wxp.tyjulink.com/xtjk/bank/hfyh/#/option-guide";
		jlConfig.merNo = jlConfig.merNo;
		jlConfig.appId = jlConfig.appId;
		jlConfig.deviceId = jlConfig.deviceId;
		jlConfig.m_encKey = "804aaa6d8adb469c8e1a97bafed44ce9";
		jlConfig.isEncrypt = true
	}

}

if (process.env.VUE_APP_ENV == 'dev') {
	jlConfig.setDevEnv();
} else if (process.env.VUE_APP_ENV == 'test') {
	jlConfig.setTestEnv();
} else if (process.env.VUE_APP_ENV == 'beta') {
	jlConfig.setBetaEnv();
} else if (process.env.VUE_APP_ENV == 'prod') {
	jlConfig.setProdEnv();
} else {
	if (process.env.NODE_ENV == 'production') {
		jlConfig.setProdEnv();
	} else {
		jlConfig.setDevEnv();
	}
}


export default jlConfig
