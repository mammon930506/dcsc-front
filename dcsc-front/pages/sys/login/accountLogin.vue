<template>
	<view class="wrap">
		<!-- #ifdef H5 -->
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			<!--
			<view style="color: #fff;font-size: 20rpx;" @click="helpMsg">
				<u-icon name="question-circle"></u-icon>帮助
			</view>
			-->
		</view>
		<view style="height:50rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
				<view style="height:150rpx;"></view>
		<!-- #endif -->
		<view style="margin: 0rpx 30rpx;">
			<view class="contact">
				<view style="color:#ffffff;font-size:52rpx;padding:10rpx 40rpx;">账号密码登录</view>
			</view>

			<view style="display:flex;flex-direction:column;justify-content:space-between;height:460rpx;">
				<view class="account" :class="{changeStyle:changeSelectStyle == 0}" @mousedown="changeStyle(0)">
					<u-icon name="account-fill" style="float: left;width: 30rpx;height: 90%;"></u-icon>
					<u-input style="margin:10rpx 50rpx;width: 90%;input-align:center;" type="type" v-model="userAccount"
						placeholder="请输入登录账号"></u-input>
				</view>
				<view class="account" :class="{changeStyle:changeSelectStyle == 1}" @mousedown="changeStyle(1)">
					<u-icon name="lock-fill" style="float: left;width: 30rpx;height: 90%;"></u-icon>
					<u-input style="margin:10rpx 50rpx;width: 90%;input-align:center;" type="password"
						v-model="userPasswd" placeholder="请输入登录密码"></u-input>
				</view>
				<view style="display:flex;justify-content: space-between;align-items: flex-start;">
					<u-checkbox class="customCheck" v-model="agreeProtocol" shape="circle"></u-checkbox>
					<view style="color:#F3F4F6;width:95%">我已阅读并同意
					<span class="protocol"  @tap="showProtocol('userAgreement')">《用户协议》</span>
					<span class="protocol"  @tap="showProtocol('privacyAgreement')">《隐私政策》</span>。
					</view>
				</view>
			</view>
		</view>

		<view style="padding: 30rpx 50rpx;">
			<view class="button" @click="login"><text>确认登录</text></view>
		</view>

		<view class="contact">
			<view style="float: left;margin: 20rpx 50rpx;" @click="smsCodeLogin">短信验证码登录</view>
			<view style="float: right;margin: 20rpx 50rpx;" @click="forgetPw">忘记密码？</view>
		</view>
		<!-- #ifdef H5 -->
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
		<!-- #endif -->
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
	import jlCatche, {
		KEY_OPENID,
		KEY_TOKEN
	} from "@/common/utils/jlCatche.js"
	export default {
		data() {
			return {
				phone: '',
				userAccount: '',
				userPasswd: '',
				verifyType: '1',
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
				changeSelectStyle: '0',
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
			}
		},
		onLoad() {
			LoginApi.agreement().then(res => {
				this.protocolObj.content = res
			}).catch(err => {
				this.$u.toast(err)
			});
		},
		methods: {
			customGoBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			showProtocol(key) {
				this.protocolTitle = this.protocolObj.title[key]
				this.protocolContent = this.protocolObj.content[key]
				this.protocolShow = true
			},
			changeStyle(index) {
				this.changeSelectStyle = index;
			},
			helpMsg() {
				this.$u.toast("帮助");
			},
			forgetPw() {
				uni.navigateTo({
					url: '/pages/sys/mine/forgetPw/forgetPw'
				});
			},
			smsCodeLogin() {
				uni.navigateTo({
					url: '/pages/sys/login/index'
				});
			},
			oauthLogin(item) {
				if (!this.agreeProtocol) {
					this.$u.toast("请阅读并勾选协议")
					return
				}
				switch (item.oauth) {
					case 'weixin': {
						LoginApi.wxAuthorize({
							params: {},
							isLoading: false,
						}).then(res => {
							window.location.href = res.url
						})
						break
					}
				}
			},
			login() {
				if (!this.agreeProtocol) {
					this.$u.toast("请阅读并勾选协议");
					return false;
				}
				if (this.userAccount == "") {
					this.$u.toast("请输入登录账号");
					return false;
				}
				if (this.userPasswd == "") {
					this.$u.toast("请输入登录密码");
					return false;
				}

				let params = {
					phone: this.userAccount,
					password: this.userPasswd
				}
				LoginApi.passwordLogin({
					params: params,
					isLoading: false
				}).then(res => {
					jlCatche.setStorageSync(KEY_TOKEN, '')
					jlCatche.setStorageSync("userInfo", '')

					jlCatche.setCacheUserInfo('phone', this.userAccount);
					jlCatche.setCacheUserInfo('userCode', res.userCode);
					jlCatche.setStorageSync(KEY_TOKEN, res.token);

					this.$emit('followContentRefresh')

					if (Number(res.isNewUser) === 1) {
						uni.navigateTo({
							url: "/pages/sys/login/inviteCode"
						})
					} else {
						this.$u.toast("登录成功");
						uni.switchTab({
							url: "/pages/sys/home/index"
						});
					}
				}).catch(err => {
					this.$u.toast(err)
				});
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

	.publishRadio {
		.u-radio:nth-child(1) {
			margin-left: 10rpx;
		}

		.u-radio {
			margin-right: 50rpx;
		}

		/deep/ .u-radio__label {
			color: #F1F2F5 !important;
		}
	}

	.protocol {
		color:#7A83D2;
	}

	.protocolModal {
		/deep/ .u-model {
			background-color: #2A2A34 !important;
		}
	}

	.account {
		width: 100%;
		height: 100rpx;
		background-color: #2A2A34;
		border-radius: 15px;
		margin: 30rpx 0rpx;
		padding: 0rpx 30rpx;
		font-size: 34rpx;
		color: #9CA3AF;
	}

	.changeStyle {
		border: 1px solid #fff;
	}

	.customCheck {
		margin-top: 4rpx;
		margin-right: 2rpx;

		/deep/ .u-checkbox__icon-wrap--checked {
			border: 2rpx solid rgba(255, 255, 255, 0.5);
			background-color: transparent !important;
			background-size: 100% 100%;
			background-image: url("@/static/common/img/login/checkbox.png");

			/deep/ .uicon-checkbox-mark {
				opacity: 0;
			}
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
