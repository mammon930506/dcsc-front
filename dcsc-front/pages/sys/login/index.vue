<template>
	<view class="wrap">
		<view style="margin:0 30rpx">
			<view class="logo">手机号登录/注册</view>
			<view style="display:flex;flex-direction:column;justify-content:space-between;height:460rpx;">
				<u-field class="customField" :class="{hasValue:phone&&phone.length>0}" v-model="phone" label="+86"
					placeholder="请输入手机号" style="width: 100%;" :border-bottom="false">
				</u-field>
				<view style="display:flex;justify-content: space-between;align-items: flex-start;">
					<u-checkbox class="customCheck" v-model="agreeProtocol" shape="circle"></u-checkbox>
					<view style="color:#F3F4F6;width:95%">我已阅读并同意
						<span class="protocol" @tap="showProtocol('userAgreement')">《用户协议》</span>
						<span class="protocol" @tap="showProtocol('privacyAgreement')">《隐私政策》</span>未注册手机号将自动创建揽悦账号。
					</view>
				</view>
				<view class="button" :class="{disable:!(phone&&phone.length>0)}" @click="nextStep"><text>发送验证码</text>
				</view>
				<view style="text-align: center;font-size: 30rpx;" @click="gotoAccountLogin">账号密码登录</view>
				<!-- <view @tap="gotoHome" style="text-align: center;font-size: 30rpx;">游客模式</view> -->
			</view>
		</view>
		<view class="login-bottom-box">
			<u-divider half-width="30%"> 选择其它登录方式 </u-divider>
			<view class="oauth2">
				<view class="share" v-for="item in shareList">
					<view class="dot" :class="{dotted:!(phone&&phone.length>0)}" @tap="oauthLogin(item)">
						<image class="shareImg" :src="item.imgSrc"></image>
					</view>
				</view>
			</view>
		</view>
		<u-modal class="protocolModal" v-model="protocolShow" :titleStyle="titleStyle" :show-title="true"
			:title="protocolTitle">
			<scroll-view scroll-y="true" style="height:500rpx;">
				<view style="padding:0 30rpx 30rpx;">
					{{ protocolContent }}
				</view>
			</scroll-view>
		</u-modal>
	</view>
</template>
<script>
	import LoginApi from "@/common/apis/login.js"
	import jlCatche from "@/common/utils/jlCatche.js"
	import {
		getUrlValue
	} from '@/common/common.js'
	// #ifdef H5 
	var wx = require('jweixin-module')
	// #endif 
	export default {
		data() {
			return {
				phone: '',
				validCode: '',
				protocolShow: false,
				agreeProtocol: false,
				protocolObj: {
					title: {
						userAgreement: '用户协议',
						privacyAgreement: '隐私政策',
						childrenAgreement: '儿童/青少年个人信息保护规则'
					},
					content: {}
				},
				protocolTitle: '',
				protocolContent: '',
				titleStyle: {
					marginBottom: '30rpx'
				},
				shareList: [{
					oauth: 'weixin',
					imgSrc: '/static/common/img/login/share/weixin@3x.png'
				}, {
					imgSrc: '/static/common/img/login/share/QQ@3x.png'
				}, {
					imgSrc: '/static/common/img/login/share/weibo@3x.png'
				}, {
					imgSrc: '/static/common/img/login/share/apple@3x.png'
				}]
			};
		},
		onLoad() {
			jlCatche.setStorageSync('inviteCode', getUrlValue('inviteCode'))
			LoginApi.agreement().then(res => {
				this.protocolObj.content = res
			}).catch(err => {
				this.$u.toast(err)
			})
		},
		methods: {
			showProtocol(key) {
				this.protocolTitle = this.protocolObj.title[key]
				this.protocolContent = this.protocolObj.content[key]
				this.protocolShow = true
			},
			nextStep() {
				if (!this.$u.test.mobile(this.phone)) {
					this.$u.toast("手机号输入不合法")
					return
				}
				if (!this.agreeProtocol) {
					this.$u.toast("请阅读并勾选协议")
					return
				}
				uni.navigateTo({
					url: `/pages/sys/login/code?phone=${this.phone}`
				})
			},
			gotoHome() {
				uni.switchTab({
					url: "/pages/sys/home/index"
				})
			},
			gotoAccountLogin() {
				uni.navigateTo({
					url: "/pages/sys/login/accountLogin"
				})
			},
			wxLogin() {
				return new Promise((resFn, rejFn) => {
					uni.login({
						"provider": "weixin",
						"onlyAuthorize": true, // 微信登录仅请求授权认证
						success: function(event) {
							const {
								code
							} = event
							//客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
							resFn({
								msg: '登录成功',
								code:code
							})
						},
						fail: function(err) {
							rejFn({
								msg: '登录失败',
								err:err
							})
							// 登录授权失败  
							// err.code是错误码
						}
					})
				})
			},
			async oauthLogin(item) {
				if (!this.agreeProtocol) {
					this.$u.toast("请阅读并勾选协议")
					return
				}
				switch (item.oauth) {
					case 'weixin': {
						// #ifdef H5
						LoginApi.wxAuthorize({
							params: {},
							isLoading: false,
						}).then(res => {
							window.location.href = res.url
						})
						// #endif
						// #ifdef APP-PLUS
						try {
							const data = await this.wxLogin()
							console.log(data.code);
							const result=await LoginApi.wxLoginAndroid({
								params: {code:data.code}
							})
							console.log(result);
						} catch (error) {
							console.log(error);
						}

						// #endif
						break
					}
				}



				// let redirect_uri = "https://dev.dcepstc.com"
				// let appid = "wx8572527a74abf766";
				// let wx_url =
				// 	`https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri=${redirect_uri}&appid=${appid}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
				// window.location.href = wx_url;

			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #18181c;
	}
</style>
<style lang="scss" scoped>
	@import "@/common/css/index.scss";

	.wrap {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.logo {
		font-size: 64rpx;
		color: #fff;
		margin: 150rpx 0 50rpx;
	}


	.u-field.customField {
		background-color: #2a2a34;
		border-radius: 25rpx;

		&.hasValue {
			border: 2rpx solid #F3F4F6;
		}

		/deep/ .u-label-text {
			color: #f3f4f6;
		}

		/deep/ .uni-input-placeholder {
			color: #6b7280;
		}

		/deep/ .uni-input-input {
			color: #f3f4f6;
		}
	}

	.button {
		color: #ffffff;
		font-size: 32rpx;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		background-size: 100% 100%;
		background-image: url("@/static/common/img/login/Button@3x.png");

		&.disable {
			color: rgba(255, 255, 255, 0.3);
			// border: 2rpx dotted rgba(255, 255, 255, 0.3);
			background-image: url("@/static/common/img/login/Buttondisable@3x.png");
		}
	}

	.oauth2 {
		padding: 20rpx 40rpx;
		display: flex;
		justify-content: space-around;

		.share {
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			width: 112rpx;
			height: 112rpx;
			background-color: #2A2A34;
			border-radius: 28rpx;
			border: 2rpx solid #6B7280;

			.dot {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 80rpx;
				height: 80rpx;

				&.dotted {
					// border: 2rpx dotted #6B7280;
				}

				.shareImg {
					width: 80rpx;
					height: 80rpx;
				}
			}
		}
	}

	.login-bottom-box {
		position: fixed;
		width: 100%;
		bottom: 100rpx;
	}
</style>
