/**
 * Copyright (c) 2013-Now http://aidex.vip All rights reserved.
 */
import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;

App.mpType = 'app';

// 引入全局 uView 框架
import uView from 'uview-ui';
Vue.use(uView);


// 全局存储 vuex 的封装
import store from '@/store';

// 引入 uView 提供的对 vuex 的简写法文件
let vuexStore = require('@/store/$u.mixin.js');
Vue.mixin(vuexStore);

// 引入 uView 对小程序分享的 mixin 封装
let mpShare = require('uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare);

import Mixin from '@/polyfill/mixins';
Vue.mixin(Mixin);

// Vue i18n 国际化
import VueI18n from '@/common/vue-i18n.min.js';
Vue.use(VueI18n);

// i18n 部分的配置，引入语言包，注意路径
import lang_zh_CN from '@/common/locales/zh_CN.js';
import lang_en from '@/common/locales/en.js';

const i18n = new VueI18n({
	// 默认语言
	locale: 'zh_CN',
	// 引入语言文件
	messages: {
		'zh_CN': lang_zh_CN,
		'en': lang_en,
	}
});

// 由于微信小程序的运行机制问题，需声明如下一行，H5和APP非必填
Vue.prototype._i18n = i18n;

import {router,RouterMount} from './router/router.js'  
Vue.use(router)

const app = new Vue({
	i18n,
	store,
	...App
});

import { replaceAll } from '@/common/common.js'
Vue.prototype.replaceAll = replaceAll

// http 拦截器，将此部分放在 new Vue() 和 app.$mount() 之间，才能 App.vue 中正常使用
import httpInterceptor from '@/common/http.interceptor.js';
Vue.use(httpInterceptor, app);

// http 接口 API 抽离，免于写 url 或者一些固定的参数
import httpApi from '@/common/http.api.js';
Vue.use(httpApi, app);

import _ from 'lodash' 
 
Vue.prototype.$_ = _ ;

import jlConfig from '@/common/utils/jlConfig'
Vue.prototype.imgBaseUrl = jlConfig.imgUrl
Vue.prototype.imgSuffix = jlConfig.imgSuffix
Vue.prototype.apiUrl = jlConfig.apiUrl
// #ifdef APP-PLUS
Vue.prototype.imPrefix = jlConfig.imPrefix 
Vue.prototype.hostUrl = jlConfig.hostUrl 
// #endif
// #ifdef H5
if(window.location.href.indexOf("h5.lanyueverse.com")!==-1){
	Vue.prototype.imPrefix = 'Dcsc'
	Vue.prototype.hostUrl = "https://h5.lanyueverse.com"
}else{
	Vue.prototype.imPrefix = 'Dcsc_test'
	Vue.prototype.hostUrl = "https://dev.dcepstc.com/h5"
}
// #endif

// #ifdef H5
	RouterMount(app,router,'#app')
// #endif
 
// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif




 
 
