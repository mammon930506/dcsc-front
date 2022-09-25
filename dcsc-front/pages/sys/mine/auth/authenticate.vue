<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			实名认证<view></view>
		</view>
		<view style="background-color:#2A2A34;height:72rpx;line-height:72rpx;text-align: left;font-size:24rpx;">
			<u-icon style="margin:0 10rpx 0 40rpx;color:#7A83D2;font-size:40rpx;transform: rotate(180deg);vertical-align: middle;position:relative;top:-5rpx" name="info-circle-fill"></u-icon>
			信息仅用于实名认证
		</view>
		<view style="padding:0 40rpx">
			<template v-if="!disabled">
				<view style="font-size:64rpx;margin:100rpx 0 20rpx 0;">人脸识别认证</view>
				<view style="font-size:24rpx;color:#F3F4F6;margin-bottom:20rpx">请如实填写身份信息，否则无法通过人脸识别认证</view>
			</template>
			<view class="attrLabel">姓名</view>
			<u-field :disabled="disabled" class="publishField" label-width="0" v-model.trim="form.idcardName"  placeholder="请输入姓名" :border-bottom="false"></u-field>
			<view class="attrLabel">身份证</view>
			<u-field :disabled="disabled" @blur="validateId" class="publishField" label-width="0" v-model.trim="form.idcardNo"  placeholder="请输入身份证号码" :border-bottom="false"></u-field>
			<view v-if="!disabled" style="padding:50rpx 0;background-color:#18181c;">
				<view class="button" @tap="handleNextStep">下一步</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {relogin} from "@/common/common.js"
	import LoginApi from "@/common/apis/login";
	import MineApi from "@/common/apis/mine.js"
	import jlCatche from "@/common/utils/jlCatche.js"
	export default{
		data(){
			return{
				form:{
					idcardName:'',
					idcardNo:'',
				},
				disabled:false,
				iflogin:true,
				ifrealname: true,
			}
		},
		onLoad(){
			this.checkIfRealName()
		},
		methods:{
			checkIfRealName(){
			  LoginApi.ifrealname().then(res=>{
			    this.iflogin = Number(res.iflogin)===1
			    this.ifrealname = Number(res.ifrealname)===1
			    if(!this.iflogin){
			      relogin()
			      return
			    }
			    if(this.ifrealname){
			      this.disabled = true
			      MineApi.personInfo().then(res=>{
			        this.form = res
			      }).catch(err=>{
			        this.$u.toast(err)
			      })
			    }else{
			      this.disabled = false
			    }
			  }).catch(err=>{
			    this.$u.toast(err)
			  })
			},
			validateId(){
				if(!this.$u.test.idCard(this.form.idcardNo)){
					this.$u.toast('请正确输入身份证')
					return false
				}
				return true
			},
			handleNextStep(){
				if(this.$u.test.isEmpty(this.form.idcardName)){
					return this.$u.toast('请输入姓名')
				}
				let flag = this.validateId()
				if(!flag)return
				uni.showLoading({
					title:'即将开始认证...',
					mask:true
				})
				jlCatche.setStorageSync('idcardName',this.form.idcardName)
				jlCatche.setStorageSync('idcardNo',this.form.idcardNo)
				LoginApi.lifeChek({
					params:{
						idcardName:this.form.idcardName,
						idcardNo:this.form.idcardNo,
					}
				}).then(res=>{
					uni.hideLoading()
					// #ifdef H5
					window.location.href = res.url
					// #endif
					// #ifdef APP-PLUS
					uni.navigateTo({
						url:`/pages/common/authWebview?url=${encodeURIComponent(res.url)}`
					})
					// #endif
				}).catch(err=>{
					uni.hideLoading()
					this.$u.toast(err)
				})
			},
			customGoBack(){
				uni.switchTab({
					url:'/pages/sys/mine/index'
				})
			},
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