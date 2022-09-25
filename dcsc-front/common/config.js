/**
 * Copyright (c) 2013-Now http://aidex.vip All rights reserved.
 */
const config = {
	
	// 产品名称
	productName: 'Aidex Mobile',
	
	// 公司名称
	companyName: 'Aidex',
	
	// 产品版本号
	productVersion: 'V4.3.0',
	
	// 版本检查标识
	appCode: 'android',
	
	// 内部版本号码
	appVersion: 1,
	
	// 管理基础路径
	adminPath: ''
	
}

// 设置后台接口服务的基础地址
if(process.env.NODE_ENV === 'development'){
    // 开发环境
  // config.baseUrl = "http://192.168.2.102:32188/dcsc-interface";   //熊超
	// config.logUrl = 'http://172.24.103.194:8300'
	// config.regUrl = 'http://172.24.103.164:8500'
}else{
    // 生产环境
	config.baseUrl = '';
	config.logUrl = ''
	config.regUrl = ''
}
export default config;