<template>
	<view class="wrap">
		<!-- #ifdef APP-PLUS -->
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			支付<view></view>
		</view>
		<view style="height: 170rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			支付<view></view>
		</view>
		<!-- #endif -->
		<view style="padding:0 30rpx;position: relative;">
			<view style="font-size:32rpx;text-align: center;margin-top:100rpx;">支付金额</view>
			<view style="font-size:80rpx;text-align: center;margin:50rpx 0;">￥{{ cent2yuan(order.orderAmount) }}</view>
			<view style="margin:0 30rpx 40rpx;">
				<view class="authRow">
					<view class="authTitle">尚品总额</view>
					<view class="authContent nowrapellipsis">￥{{ cent2yuan(order.orderAmount) }}</view>
				</view>
				<view class="authRow">
					<view class="authTitle">余额</view>
					<view class="authContent nowrapellipsis" style="color:#7A83D2">已用余额支付￥0</view>
				</view>
			</view>
			<view class="card" style="border-bottom-right-radius:0rpx;border-bottom-left-radius:0rpx;border-bottom:2rpx solid #59595D;margin-bottom:0">
				<view style="color:#666666;font-size:24rpx;">请选择支付方式</view>
			</view>
			<view class="card"
				style="position:relative;border-top-right-radius:0rpx;border-top-left-radius:0rpx;font-size:24rpx;display: flex;justify-content: space-between;">
				<u-radio-group active-color="#7A83D2" style="position:relative;width:100%;color:#F3F4F6;font-size:28rpx" v-model="paymentType">
					<view style="width:100%;display: flex;justify-content: space-between;margin-bottom:20rpx;"><view>储蓄卡支付</view><view><u-radio name="1" :wrap="true"></u-radio></view></view>
					<!--
					<view style="width:100%;display: flex;justify-content: space-between;margin-bottom:20rpx;"><view>信用卡支付</view><view><u-radio name="2" :wrap="true"></u-radio></view></view>
					-->
					<view style="width:100%;display: flex;justify-content: space-between;margin-bottom:20rpx;"><view>余额支付</view><view>可用余额:{{cent2yuan(accountBalance)}}  -￥{{ cent2yuan(order.orderAmount)}}</view><view><u-radio name="3" :wrap="true"></u-radio></view></view>
				</u-radio-group>
			</view>
			<view class="button" @tap="handlePay">立即支付</view>
		</view>
		
		<u-popup v-model="popupShow" mode="bottom" 
			border-radius="14" 
			height="50%" 
			:closeable="true"
			:mask-close-able="true"
			:custom-style="{'backgroundColor': 'rgba(0,0,0,.6)', 'color': '#000'}"
			>
		
			<view style="height: 50%;font-size:24rpx;" >
				<u-input  style="margin: 80rpx 30rpx;padding:10rpx 30rpx;height: 80rpx;border-radius:40rpx;width: 90%;input-align:center;"  
					type="password"   
					v-model="password"   
					placeholder="输入登录密码" 
					:class="{changeStyle:changeSelectStyle == 1}"  @mousedown="changeStyle(1)"
					></u-input>	
				<view class="button"  style="width: 90%;margin: 20% 5%;" @tap="payConfirm">确认</view>
			</view>
			
		</u-popup>
			
		<u-modal v-model="modalShow" 
			class="setPasswordModal"
			confirmText="设置登录密码" 
			showConfirmButton
			cancelText="取消" 
			showCancelButton
			:content="content"
			:show-cancel-button="true"
			@confirm="confirm"
		>

		</u-modal>
		<u-mask :show="maskShow">
			<view style="width:100%;height:100%;text-align: center;line-height:100vh;">
				<u-loading size="18rpx" style="margin-right:20rpx;position:relative;top:-3rpx;" mode="flower"></u-loading>
				正在跳转支付...
			</view>
		</u-mask>
	<!-- 	<form id="pay_form" name="pay_form" method = "POST" :action="payActionUrl">
			<input type="hidden" :name="payName"/>
		</form> -->
	</view>
</template>

<script>
	import {cent2yuan,payJump} from '@/common/common.js'
	import MerchandiseApi from "@/common/apis/merchandise.js"
	import MineApi from "@/common/apis/mine.js"
	import jlConfig from '@/common/utils/jlConfig'
	import CustomPopup from "@/components/merchandise/CustomPopup"
	export default{
		data(){
			return {
				order:{},
				paymentType:'1',
				maskShow:false,
				popupShow:false,
				changeSelectStyle:'1',
				payActionUrl:'',
				password:'',
				payName:'',
				accountBalance:0.00,
				modalShow: false,
				content:'请你设置登录密码'
			}
		},
		components: {
			CustomPopup
		},
		onLoad(option){
			MerchandiseApi.payInfo({
				params:{
					orderCode:option.orderCode
				}
			}).then(res=>{
				this.order =res
			}).catch(err=>{
				this.$u.toast(err)
			});
			
			MerchandiseApi.accountBalance({}).then(res=>{
				this.accountBalance=res.accountBalance;
			}).catch(err=>{
				this.$u.toast(err)
			})
		},
		methods:{
			cent2yuan,
			payJump,
			changeStyle(index) {
			    this.changeSelectStyle = index;
			},
			handlePay(){
				this.maskShow = true
				if (this.paymentType === '1') { //银行卡付款
					// window.location.href =`https://dev.dcepstc.com/dcsc-interface/api/client/order/v1/pay?orderCode=${this.order.orderCode}`
					MerchandiseApi.payOrder({
						params:{
							orderCode:this.order.orderCode,
							paymentType:this.paymentType,
							password:''
						}
					}).then(res=>{
						//#ifdef H5
						res.actionUrl = decodeURIComponent(res.actionUrl)
						res.payment = decodeURIComponent(res.payment)
						this.payJump(res.actionUrl,res.payment)
						//#endif
						//#ifdef APP-PLUS 
						let url = `${this.hostUrl}/static/common/pay.html`
						uni.navigateTo({
							url:`/pages/common/payWebview?url=${url}&actionUrl=${res.actionUrl}&payment=${res.payment}`
						})
						//#endif
					}).catch(err=>{
						this.maskShow = false
						this.$u.toast(err)
					})
				}
				
				
				if (this.paymentType === '3') { //余额付款
					this.maskShow = false;
					MineApi.havePwd({}).then(res => {
						if(res.havePwd==='0'){
							this.modalShow = true;
						}else{
							if ( cent2yuan(this.accountBalance)-cent2yuan(this.order.orderAmount) <0){
								this.$u.toast("余额不足")
								return false;
							}else{
								this.popupShow = true;
							}
						}
					}).catch(err => {
						this.$u.toast(err)
					})
				}
			},
			payConfirm(){//余额付款需要密码
				if (this.password === '') {
					this.$u.toast("请输入登录密码")
					return false;
				}else{
					if (this.password.length <8  || this.password.length>20) {
						this.$u.toast("请输入8-20个字符");
						return false;
					}
				}
				
				MerchandiseApi.payOrder({
					params:{
						orderCode:this.order.orderCode,
						paymentType:this.paymentType,
						password:this.password
					}
				}).then(res=>{
					console.info(res);
					uni.navigateTo({
						url:`/pages/sys/order/payStatus?orderStatus=${res.payStatus}&orderCode=${res.orderCode}`
					})
					/*
					//#ifdef H5
					res.actionUrl = decodeURIComponent(res.actionUrl)
					res.payment = decodeURIComponent(res.payment)
					this.payJump(res.actionUrl,res.payment)
					//#endif
					//#ifdef APP-PLUS 
					let url = `${jlConfig.hostUrl}/static/common/pay.html`
					uni.navigateTo({
						url:`/pages/common/payWebview?url=${encodeURIComponent(url)}&actionUrl=${encodeURIComponent(res.actionUrl)}&payment=${encodeURIComponent(res.payment)}`
					})
					//#endif
					*/
				}).catch(err=>{
					this.maskShow = false
					this.$u.toast(err)
				})
			},
			confirm(){
				uni.navigateTo({
				  url:'pages/sys/mine/updatePw/verifySnsCode?havePwd=0'
				})
			},
			customGoBack(){
				uni.navigateTo({
				  url:'/pages/sys/order/list'
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
	.setPasswordModal {
		/deep/ .u-model {
			background-color: #2A2A34 !important;
		}
	}
	.authRow {
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		margin-top: 30rpx;
		.authTitle {
			width: 30%;
			color: #9CA3AF;
		}
		.authContent {
			max-width: 70%;
			color: #F3F4F6;
		}
	}
	
	.slot-content {
		font-size: 28rpx;
		color: $u-content-color;
		padding:10% 30%;
	}
	
	.changeStyle{
		border:1px solid #fff;
	}
</style>
