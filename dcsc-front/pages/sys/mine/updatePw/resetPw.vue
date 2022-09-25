<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			{{this.havePwd==='0'?'设置密码':'修改密码'}}<view style="color: #7A83D2;"></view>
		</view>
		<view style="margin: 50rpx 50rpx 10rpx;">新密码</view>
		<view style="margin: 10rpx 50rpx;height: 100rpx;background-color: #2A2A34;border-radius: 30rpx;" :class="{changeStyle:changeSelectStyle == 0}"  @mousedown="changeStyle(0)">
			<u-icon name="lock-fill"  style="float: left;padding: 20rpx;100rpx;width: 40rpx;height: 90%;"></u-icon> 
			<u-input  style="padding:10rpx 30rpx;height: 100%;width: 90%;input-align:center;"  type="password"   v-model="password"   placeholder="请输入8-20个字符" ></u-input>	
		</view>
		<view style="margin: 50rpx 50rpx 10rpx;">确认密码</view>
		<view style="margin: 10rpx 50rpx;height: 100rpx;background-color: #2A2A34;border-radius: 30rpx;" :class="{changeStyle:changeSelectStyle == 1}"  @mousedown="changeStyle(1)">
			<u-icon name="lock-fill"  style="float: left;padding: 20rpx;100rpx;width: 40rpx;height: 90%;"></u-icon> 
			<u-input  style="padding:10rpx 30rpx;height: 100%;width: 90%;input-align:center;"  type="password"   v-model="surePassword"   placeholder="再次输入确认密码" ></u-input>	
		</view>
		
		<view style="padding: 50rpx 50rpx;">
			<view class="button"   @click="getCode()"><text>确认修改</text></view>
		</view>
	</view>
</template>

<script>
	import MineApi from "@/common/apis/mine.js"
	export default {
		data() {
			return {
				password:'',
				surePassword:'',
				phone:'',
				verificationCode:'',
				changeSelectStyle:'0',
				havePwd:''
			}
		},
		onLoad(val) {
		   this.phone= JSON.parse(val.phone);
		   this.havePwd= JSON.parse(val.havePwd);
		   this.verificationCode= JSON.parse(val.verificationCode);
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
			getCode(){
				if(this.password==""){
					this.$u.toast("请你输入新密码");
					return false;
				}else{
					if (this.password.length <8  || this.password.length>20) {
						this.$u.toast("请输入8-20个字符");
						return false;
					}
				}
				
				if(this.surePassword==""){
					this.$u.toast("请你再次输入确认密码");
					return false;
				}else{
					if(this.surePassword!=this.password){
						this.$u.toast("输入2次密码不一致,请再确认密码!");
						return false;
					}
				}
			
			    let  params ={
					phone: this.phone,
					verificationCode:this.verificationCode,
					password:this.password,
					surePassword:this.surePassword,
				}
					
				MineApi.setPassword({
					params: params,
					isLoading: false,
				}).then(res => {
					this.$u.toast("修改密码成功");
					uni.switchTab({
						url:  "/pages/sys/mine/index"
					});
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
	
	.changeStyle{
		border:1px solid #fff;
	}
</style>
