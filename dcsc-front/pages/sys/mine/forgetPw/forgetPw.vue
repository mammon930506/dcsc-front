<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			忘记密码<view style="color: #7A83D2;"></view>
		</view>
		
		<view style="margin: 80rpx 50rpx;height: 100rpx;background-color: #2A2A34;border-radius: 30rpx;">
			<u-icon name="account-fill" style="padding: 30rpx 20rpx;float: left;"></u-icon>
			<u-field  style="margin: 0rpx 40rpx;" label-width="0" v-model.trim="phone" placeholder="请输入手机号"
				clearable maxlength="16" clear-size="40" :border-bottom="false"></u-field>
		</view>
		
		
		<view style="padding: 10rpx 50rpx;">
			<view class="button"   @click="getCode()"><text>下一步</text></view>
		</view>
	</view>
</template>

<script>
	import MineApi from "@/common/apis/mine.js"
	export default {
		data() {
			return {
				phone:''
			}
		},
		methods: {
			/*
			customGoBack() {
				uni.switchTab({
					url: '/pages/sys/mine/index'
				})
			},*/
			customGoBack(){
				uni.navigateBack({
					delta:1
				})
			},
			getCode(){
				if(this.phone=="" ){
					this.$u.toast("请您输入手机号");
					return false;
				}else{
					var reg = /^1[34578]\d{9}$/;
					if (!reg.test(this.phone)) {
						this.$u.toast("请填写正确的手机号");
						return false;
					}
					uni.navigateTo({
						url: "/pages/sys/mine/forgetPw/verifyType?phone="+this.phone,
					});
					
					/*
					uni.showLoading({title: '正在获取验证码',mask: true})
			
					MineApi.getVerificationCode({
						phoneNo: this.phoneNo,
						validCodeType:'3'
					}).then(res => {
						if (res.code == '200') {
							setTimeout(() => {
								uni.navigateTo({
									//url: "/pages/sys/mine/forgetPw/resetPw?phoneNo="+this.phoneNo,
									url: "/pages/sys/mine/forgetPw/verifyCode?phoneNo="+this.phoneNo,
								});
							}, 500);
						}else{
							this.$u.toast(res.msg);
						}
					}).catch(err=>{
						this.$u.toast(err)
					})*/
				}
			}
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #18181c;
	}
</style>
<style lang="scss" scoped>
	@import "@/common/css/index.scss";
</style>
