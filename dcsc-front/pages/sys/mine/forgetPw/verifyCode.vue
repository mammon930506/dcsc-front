<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			忘记密码<view style="color: #7A83D2;"></view>
		</view>
		
		<view style="padding:0 20rpx">
			<view class="logo">手机验证</view>
			<view style="margin-bottom:80rpx;margin-top:20rpx;">验证码已发送绑定手机号 {{phone}}</view>
			<u-message-input style="margin-bottom:80rpx;" mode="box" @change="recordCode" :maxlength="6" :breathe="true"></u-message-input>
			<u-verification-code unique-key="page-a" :keep-running="true" :seconds="seconds" ref="uCode" @change="codeChange"
				:startText="startText" :changeText="changeText" :endText="endText">
			</u-verification-code>
				<view style="text-align: center;margin-bottom:80rpx;" @tap="getCode">{{ tip }}</view>
			<view class="button" @tap="confirm">下一步</view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>
<script>
	import MineApi from "@/common/apis/mine.js"
	export default {
		data() {
			return {
				phone: '',
				verifyType:'',
				verificationCode: '',
				seconds: 60,
				refCode: null,
				tip:'发送验证码',
				startText: '发送验证码',
				changeText: '重新发送（x秒后）',
				endText: '重新发送验证码',
				codeDisabled: false,
				timer: '',
				frombind: false,
				openId: ''
			};
		},
		onLoad(option) {
			this.phone = option.phone
			this.verifyType = option.verifyType
		},
		onReady() {
			this.getCode();
		},
		created() {
			this.timer = setInterval(this.getTime, 1000);
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
			customGoBack(){
				uni.navigateBack({
					delta:1
				})
			},
			codeChange(text) {
				this.tip = text;
			},
			recordCode(val) {
				this.verificationCode = val
			},
			//验证验证码
			confirm() {
				if (this.verificationCode ==""){
					this.$u.toast("请您输入验证码");
					return false;
				}
				if (this.verificationCode.length < 6){
					this.$u.toast("验证码不合法");
					return false;
				}
			
				
				let params = {
					phone: this.phone,
					verificationCode: this.verificationCode,
				}
				MineApi.verificationCodeAuth({
					params: params,
					isLoading: false,
				}).then(res=>{
					uni.navigateTo({
						url: '/pages/sys/mine/forgetPw/verifyIdentity?phone='+this.phone+'&verificationCode='+this.verificationCode
					});
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			//重发验证码
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					uni.hideLoading();
					this.$refs.uCode.start();
					MineApi.getVerificationCode({
						params: {
							phone: this.phone,
							verificationType: '3' 
						},
						isLoading: false,
					}).then(res=>{
						// this.$refs.uToast.show({
						// 	title:'验证码已发送:'+ res.verificationCode,
						// 	duration: 10000
						// })
					}).catch(err=>{
						this.$u.toast(err)
					})
				} else {
					this.$u.toast('请稍后重新获取');
				}
			}
		}
	};
</script>
<style lang="scss" scoped>
	@import "@/common/css/index.scss";
</style>
<style lang="scss">
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
