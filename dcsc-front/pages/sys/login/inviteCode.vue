<template>
	<view class="wrap">
		<view style="margin:0 30rpx">
			<view class="logo">邀请码</view>
			<u-field class="customField" :disabled="editDisabled" v-model.trim="inviteCode" placeholder="请输入您的邀请码" style="width: 100%;" input-align="left"
				:border-bottom="false" label-width="0">
				<u-image @tap="handleScan" slot="right" :src="scanIcon" width="50rpx" height="50rpx" shape="square"></u-image>
			</u-field>
			<view class="button" @click="nextStep()"><text>确认登录</text></view>
			<view v-if="!editDisabled" style="text-align: center;" @click="gotoIndex">跳过邀请码，直接登录</view>
		</view>
	</view>
</template>
<script>
	import LoginApi from "@/common/apis/login.js"
	import jlCatche from "@/common/utils/jlCatche.js"
    // #ifdef H5
    var wx = require('jweixin-module')
    // #endif 
	export default {
		data() {
			return {
				inviteCode: '',
				scanIcon: '/static/common/img/scan@3x.png',
        editDisabled: false
			};
		},
		onLoad() {
      let temp = jlCatche.getStorageSync('inviteCode')
      if(temp){
        this.editDisabled = true
        this.inviteCode = temp
        jlCatche.setStorageSync('inviteCode','')
      }
		},
		methods: {
			nextStep(){
				if(!this.inviteCode){
					return this.$u.toast('请输入邀请码')
				}
				LoginApi.bindRecommender({
					params:{recommenderCode:this.inviteCode},
					isLoading: false,
				}).then(res=>{
					this.gotoIndex()
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			gotoIndex() {
				uni.switchTab({
					url: "/pages/sys/home/index",
					success: (res) => {
						// let page = getCurrentPages().pop(); //跳转页面成功之后
						// if (!page) return;
						// page.loadData(); //如果页面存在，则重新刷新页面
					}
				});
			},
			handleScan(){
				LoginApi.wxConfig().then(()=>{
					console.log('获取了wx授权：scanQRCode')
					wx.scanQRCode({
					  needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					  scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					  success: res=>{
						this.inviteCode = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
					  },
					})
				}).catch(()=>{
					this.$u.toast("授权失败，请稍后再试")
				})
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

	.logo {
		font-size: 64rpx;
		color: #fff;
		margin:150rpx 0 80rpx;
	}

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

	.button {
		margin-bottom:50rpx;
		color: #ffffff;
		font-size: 32rpx;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		background-size: 100% 100%;
		background-image: url("@/static/common/img/login/Button@3x.png");
	}

</style>
