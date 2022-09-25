<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			{{this.havePwd==='0'?'设置密码':'修改密码'}}<view style="color: #7A83D2;"></view>
		</view>
		
		<view style="padding:0 20rpx">
			<view class="logo" style="font-size: 54rpx;padding-top:100rpx;">手机验证</view>
			<view style="margin-bottom:80rpx;margin-top:30rpx;">将校验码发生到您的手机 {{mobileFilter(phone)}}</view>
			
			<!--
			<view>
				<u-input   type="text"  style="float: left;margin :0rpx  30rpx;width: 320rpx;padding: 10rpx 60rpx;height: 100rpx;background-color: #2A2A34;border-radius: 10rpx;input-align:center;"  v-model="verificationCode"   placeholder="请输入验证码" ></u-input>	
				<u-button  class="button"  style="height: 100rpx;width: 200rpx;"  @click="getCode">{{btntxt}}</u-button>	
			</view>
			-->
			
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<u-field class="publishField" style="width:65%" label-width="0" v-model.trim="verificationCode"  placeholder="验证码" :border-bottom="false"></u-field>
				<view style="width:35%;text-align: center;" @tap="getCode">{{ tip }}</view>
				<u-verification-code unique-key="page-b" :keep-running="true" :seconds="60" ref="authCode" @change="codeChange">
				</u-verification-code>
			</view>
			
			
			<!--
			
			
			<u-message-input style="margin-bottom:80rpx;" mode="box" @change="recordCode" :maxlength="6" :breathe="true"></u-message-input>
			<u-verification-code unique-key="page-a" :keep-running="true" :seconds="seconds" ref="uCode" @change="codeChange"
				:startText="startText" :changeText="changeText" :endText="endText">
			</u-verification-code>
			<view style="text-align: center;margin-bottom:80rpx;" @tap="getCode">{{ tip }}</view>
				-->
			<view class="button"  style="margin-top: 40rpx;" @tap="confirm">下一步</view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>
<script>
	import MineApi from "@/common/apis/mine.js"
	import jlCatche, {
		KEY_OPENID,
		KEY_TOKEN
	}from "@/common/utils/jlCatche.js"
	export default {
		data() {
			return {
				phone: '',
				verificationCode: '',
				tip:'',
				havePwd:''
			};
		},
		onLoad(option) {
			this.phone = jlCatche.getCacheUserInfo('phone') ;
			this.havePwd=JSON.parse(option.havePwd);
		},
		watch: {},
		
		methods: {
			customGoBack(){
				uni.navigateBack({
					delta:1
				})
			},
			mobileFilter(val){
				let reg = /^(.{3}).*(.{4})$/
			    return val.replace(reg,'$1****$2')
			},
			codeChange(text){
				this.tip = text
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
						url: '/pages/sys/mine/updatePw/resetPw?phone='+this.phone+'&verificationCode='+this.verificationCode+'&havePwd='+this.havePwd
					});
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			//重发验证码
			async getCode() {
				if(this.phone=="" ){
					this.$u.toast("请您输入手机号");
					return false;
				}else{
					var reg = /^1[34578]\d{9}$/;
					if (!reg.test(this.phone)) {
						this.$u.toast("请填写正确的手机号");
						return false;
					}
					if (this.$refs.authCode.canGetCode) {
						this.$refs.authCode.start();
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
							//this.$u.toast(err)
							this.$u.toast(err+',请稍后重新获取');
						})
					} else {
						this.$u.toast('请稍后重新获取');
					}
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
