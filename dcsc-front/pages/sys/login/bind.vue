<template>
	<view class="wrap">
		<view style="padding:0 30rpx">			
			<view class="oauth2">
				<view class="logoBind">
				</view>
				<view class="bindIcon"></view>
				<view class="share">
					<view class="dot dotted">
						<image class="shareImg" src="/static/common/img/login/share/weixin@3x.png"></image>
					</view>
				</view>
			</view>
			<view style="font-size:32rpx;color:#F3F4F6;text-align: center;margin-bottom:20rpx">请绑定揽悦账号</view>
			<view style="font-size:28rpx;color:#F3F4F6;text-align: center;margin-bottom:100rpx">绑定后即可通过微信一键登录</view>
			<view class="list">
				<view class="list-call">
					<u-field class="customField" v-model="phone" label="+86" placeholder="请输入绑定的手机号" style="width: 100%;"
						:border-bottom="false">
					</u-field>
				</view>
			</view>
			<view class="button" @click="nextStep"><text>绑定账号</text></view>
		</view>
	</view>
</template>
<script>
	/**
	 * Copyright (c) 2013-Now http://aidex.vip All rights reserved.
	 */
	import MineApi from "@/common/apis/mine.js"
	import LoginApi from "@/common/apis/login.js"
	import base64 from '@/common/base64.js';
	import jlCatche, {
		KEY_OPENID,
		KEY_TOKEN
	} from '@/common/utils/jlCatche'
	export default {
		data() {
			return {
				phone: '',
				avatar: "/static/common/img/60x60.png",
				openId:''
			};
		},
		onLoad(option) {
			if(option.isNewUser=="0"){
				uni.navigateTo({
					url: `/pages/sys/home/index`
				})
			}
			this.openId = option.openid
		},
		onUnload(event){
			console.log(event)
			return true
		},
		onBackPress(event){
			console.log(event)
			return true
		},
		methods: {
			nextStep() {
				if(!this.$u.test.mobile(this.phone)){
					this.$u.toast("手机号输入不合法")
					return 
				}
				LoginApi.ifBindWeixin({
					params:{
						phone:this.phone
					}
				}).then(res=>{
					if(Number(res.isBindWx)===1){
						this.$u.toast('该手机号已绑定微信号，请重新输入')
					}else{
						uni.navigateTo({
							url: `/pages/sys/login/code?phone=${this.phone}&openId=${this.openId}&frombind=true`
						})
					}
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
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
	
	.u-field.customField{
		margin-bottom:50rpx;
		background-color:#2a2a34;
		border-radius: 25rpx;
		&.hasValue{
			border:2rpx solid #F3F4F6;
		}
		/deep/ .u-label-text{
			color:#f3f4f6;
		}
		/deep/ .uni-input-placeholder{
			color:#6b7280;
		}
		/deep/ .uni-input-input{
			color:#f3f4f6;
		}
	}
	
	.logoBind{
		background-size:cover;
		background-image: url('@/static/common/img/login/logo.png');
		width:120rpx;
		height:120rpx;
		border-radius:60px;
	}
	
	.oauth2 {
		width:400rpx;
		position: relative;
		margin: 150rpx auto 80rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.share{
			display: flex;
			align-items: center;
			justify-content: center;
			position:relative;
			width:120rpx;
			height:120rpx;
			background-color: #2A2A34;
			border-radius:60px;
			.dot{
				display: flex;
				align-items: center;
				justify-content: center;
				width:80rpx;
				height:80rpx;
				&.dotted{
					// border:2rpx dotted #6B7280;
				}
				.shareImg{
					width: 80rpx;
					height:80rpx;
				}
			}
		}
	}
	
	.bindIcon{
		background-image: url("@/static/common/img/login/link.png");
		width:48rpx;
		height:48rpx;
		background-size: 100% 100%;
	}
</style>
