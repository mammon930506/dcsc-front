<template>
	<view class="wrap">
		<view style="padding:0 30rpx">
			<view class="logo">验证码</view>
			<view style="margin-bottom:80rpx;margin-top:20rpx;">已发送至手机号 {{phone}}</view>
			<u-message-input style="margin-bottom:80rpx;" mode="box" @change="recordCode" :maxlength="6"
				:breathe="true"></u-message-input>
			<u-verification-code unique-key="page-a" :keep-running="true" :seconds="seconds" ref="uCode"
				@change="codeChange" :startText="startText" :changeText="changeText" :endText="endText">
			</u-verification-code>
			<view style="text-align: center;margin-bottom:80rpx;" @tap="getCode">{{ tip }}</view>
			<view class="button" @tap="confirmLogin">{{ frombind?'确认绑定':'确认登录' }}</view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>
<script>
	import LoginApi from "@/common/apis/login.js"
	import jlCatche, {
		KEY_OPENID,
		KEY_TOKEN
	} from "@/common/utils/jlCatche.js"
	import CustomPopup from "@/components/merchandise/CustomPopup"
	export default {
		data() {
			return {
				phone: '',
				tip: '发送验证码',
				verificationCode: '',
				seconds: 60,
				refCode: null,
				startText: '发送验证码',
				changeText: '重新发送（x秒后）',
				endText: '重新发送验证码',
				codeDisabled: false,
				timer: '',
				inputCode: '',
				frombind: false,
				openId: ''
			};
		},
		components: {
			CustomPopup,
		},
		onLoad(option) {
			this.phone = option.phone
			this.openId = option.openId
			this.frombind = option.frombind
		},
		onReady() {
			this.getCode()
		},
		created() {
			this.timer = setInterval(this.getTime, 1000)
		},
		watch: {},
		methods: {
			getTime() {
				this.loadTime--
				if (this.loadTime === 0) {
					clearInterval(this.timer)
					this.codeDisabled = true
				}
			},
			codeChange(text) {
				this.tip = text;
			},
			getCode() {
				if (!this.$u.test.mobile(this.phone)) {
					uni.navigateTo({
						url: "/pages/sys/login/index"
					})
					return
				}
				if (this.$refs.uCode.canGetCode) {
					uni.hideLoading();
					this.$refs.uCode.start();
					LoginApi.getVerificationCode({
						params: {
							phone: this.phone,
							verificationType: this.frombind ? '2' : '1'
						},
						isLoading: false,
					}).then(res => {
						// this.$refs.uToast.show({
						// 	title:'验证码已发送:'+ res.verificationCode,
						// 	duration: 10000
						// })
					}).catch(err => {
						this.$u.toast(err)
					})
				} else {
					this.$u.toast('请稍后重新获取');
				}
			},
			confirmLogin() {
				if (this.inputCode.length < 6) {
					this.$u.toast("验证码不合法")
					return
				}
				let params = {
					phone: this.phone,
					verificationCode: this.inputCode,
				}
				if (this.frombind) {
					LoginApi.bindPhone({
						params: {
							...params,
							openid: this.openId
						},
						isLoading: false
					}).then(res => {
						this.gotoNext(res)
					}).catch(err => {
						this.$u.toast(err)
					})
				} else {
					LoginApi.phonelogin({
						params,
						isLoading: false,
					}).then(res => {
						this.gotoNext(res)
					}).catch(err => {
						this.$u.toast(err)
					})
				}
			},
			gotoNext(res) {
				jlCatche.setStorageSync(KEY_TOKEN, '')
				jlCatche.setStorageSync("userInfo", '')

				jlCatche.setCacheUserInfo('phone', this.phone)
				jlCatche.setCacheUserInfo('userCode', res.userCode)
				jlCatche.setStorageSync(KEY_TOKEN, res.token)
				
				uni.$emit('followContentRefresh')

				if (Number(res.isNewUser) === 1) {
					uni.navigateTo({
						url: "/pages/sys/login/inviteCode"
					})
				} else {
					uni.switchTab({
						url: "/pages/sys/home/index",
						success: (res) => {
							// let page = getCurrentPages().pop(); //跳转页面成功之后
							// if (!page) return;
							// page.loadData(); //如果页面存在，则重新刷新页面
						}
					});
				}
			},
			recordCode(val) {
				this.inputCode = val
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

	page {
		background-color: #18181c;
	}

	.logo {
		font-size: 64rpx;
		color: #fff;
		padding-top: 150rpx;
	}

	.button {
		color: #ffffff;
		font-size: 32rpx;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		background-size: 100% 100%;
		background-image: url("@/static/common/img/login/Button@3x.png");
	}
</style>
