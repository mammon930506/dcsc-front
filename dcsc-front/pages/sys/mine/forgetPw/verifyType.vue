<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			身份验证<view style="color: #7A83D2;"></view>
		</view>
		
		<view style="height:100rpx;"></view>
		<view class="contact">
			<view style="color:#ffffff;font-size:52rpx;padding-left:60rpx;padding-top:10rpx;">请选择</view>
			<view style="color:#F3F4F6;font-size:28rpx;padding-left:60rpx;padding-top:10rpx;">任意一种验证方式，验证通过即可设置新密码</view>
		</view>
		
		<view class="contact">
			<u-radio-group class="publishRadio" v-model="verifyType" :active-color="'#7A83D2'">
				<!--
				<view class="verifyType" :class="{changeStyle:changeSelectStyle == 0}" ><u-icon name="account-fill"></u-icon><span style="padding-left:10rpx;  padding-right:30rpx;">邮箱验证&银行卡验证   </span><u-radio style="padding-left:120rpx;"  @change="changeStyle(0)" :name="'0'" ></u-radio></view>
				-->
				<view class="verifyType" :class="{changeStyle:changeSelectStyle == 1}"><u-icon name="account-fill"></u-icon><span style="padding-left:10rpx;  padding-right:30rpx;">手机号验证&身份信息验证</span><u-radio style="padding-left:60rpx;"   @change="changeStyle(1)" :name="'1'"></u-radio></view>
				<!--
				<view class="verifyType" :class="{changeStyle:changeSelectStyle == 2}"><u-icon name="account-fill"></u-icon><span style="padding-left:10rpx;  padding-right:30rpx;">手机号验证&历史购买订单</span><u-radio style="padding-left:60rpx;"   @change="changeStyle(2)" :name="'2'"></u-radio></view>
				-->
			</u-radio-group>
		</view>
		
		<view style="padding: 30rpx 40rpx;">
			<view class="button"   @click="confirm"><text>确认</text></view>
		</view>
	</view>
</template>
<script>

	export default {
		data() {
			return {
				phone: '',
				verifyType:'1',
				changeSelectStyle:'1'
			}
		},
		onLoad(val) {
		   this.phone= JSON.parse(val.phone);
		},
		methods: {
			customGoBack(){
				uni.navigateBack({
					delta:1
				})
			},
			changeStyle(index) {
			      this.changeSelectStyle = index;
			},
			confirm() {
				if(this.verifyType=='0'){
					this.$u.toast("敬请期待");
				}else if(this.verifyType=='1'){
					uni.navigateTo({
						url: "/pages/sys/mine/forgetPw/verifyCode?phone="+this.phone+"&verifyType="+this.verifyType,
					})
				}else if(this.verifyType=='2'){
					this.$u.toast("敬请期待");
				}
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
	
	.publishRadio{
		.u-radio:nth-child(1){
			margin-left:10rpx;
		}
		.u-radio{
			margin-right:50rpx;
		}
		/deep/ .u-radio__label{
			color:#F1F2F5 !important;
		}
	}
	
	.verifyType{
		width: 90%;
		height: 100rpx;
		background-color: #2A2A34;
		border-radius: 15px;
		margin-left: 40rpx;
		margin-right: 40rpx;
		margin-top: 40rpx;
		margin-bottom: 40rpx;
		padding-left:30rpx;
		padding-right: 30rpx;
		padding-top: 25rpx;
		padding-bottom: 25rpx;
		font-size:30rpx;
		color:#9CA3AF;
	}
	.changeStyle{
		border:1px solid #fff;
	}
</style>