<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			身份验证<view style="color: #7A83D2;"></view>
		</view>
		
		<view style="padding:0 40rpx">
			<view class="logo">身份证验证</view>
			<view style="margin-bottom:80rpx;margin-top:20rpx;">请输入身份证的前两位，后4位。</view>
			<u-message-input style="margin-bottom:80rpx;" mode="box" @change="recordCode" :maxlength="6" :breathe="true"></u-message-input>

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
				phone :'',
				verificationCode:'',
				idCardNo :''
			}
		},
		onLoad(val) {
		   this.phone= JSON.parse(val.phone);
		   this.verificationCode= JSON.parse(val.verificationCode);
		},
		
		watch: {},
		methods: {
			customGoBack(){
				uni.navigateBack({
					delta:1
				})
			},
			recordCode(val) {
			   this.idCardNo = val;
			},
			confirm(){
				if (this.idCardNo ==""){
					this.$u.toast("请您输入身份验证信息");
					return false;
				}

				let params = {
					phone: this.phone,
					verificationCode: this.verificationCode,
					idCardNo: this.idCardNo
				}
				MineApi.idCardNoAuth({
					params: params,
					isLoading: false,
				}).then(res=>{
					uni.navigateTo({
						url: '/pages/sys/mine/forgetPw/resetPw?phone='+this.phone+'&verificationCode='+this.verificationCode
					})
				}).catch(err=>{
					this.$u.toast(err)
				})
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
