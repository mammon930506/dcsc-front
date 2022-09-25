<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			<view style="margin-left:60rpx;">{{ procedureTitleOptions[procedure] }}</view>
			<view>
				<view v-if="procedure==='form'"  @tap="gotoWithdrawList" style="color:#E7E7E8;font-size:34rpx;">提现明细</view>
			</view>
		</view>
		<view v-show="procedure==='form'" style="padding:0 40rpx">
			<view class="attrLabel">持卡人</view>
			<u-field :disabled="true" class="publishField" label-width="0" v-model.trim="form.name"  :border-bottom="false"></u-field>
			<view class="attrLabel">银行卡号</view>
			<u-field @blur="validateBankCode" class="publishField" label-width="0" v-model.trim="fundForm.cashoutBankCode"  placeholder="请输入银行卡号" :border-bottom="false"></u-field>
			<view class="attrLabel">开户行</view>
			<u-field @tap="procedure='selectBank'" :disabled="true" class="publishField" label-width="0" v-model.trim="fundForm.cashoutBankName"  placeholder="请选择开户行" :border-bottom="false" right-icon="arrow-right"></u-field>	
			<view class="attrLabel">提现金额</view>
			<view class="card">
				<u-field class="bigField" input-align="left" v-model.trim="fundForm.cashoutAmountYuan" @blur="validateCashout">
					<view slot="icon">
						<view style="font-size:68rpx;">¥</view>
					</view>
					<view slot="right">
						<view @tap="setAmount">全部</view>
					</view>
				</u-field>
				<view style="font-size:24rpx;color:#B3B3B3;margin-top:20rpx;">可提现金额为<span style="color:white;margin:0 5rpx"> {{ cent2yuan(form.amount) }}</span>元</view>
			</view>
			<view class="button" @tap="withdrawSmsCode">提现</view>
		</view>
		<view v-show="procedure==='selectBank'" style="padding:0 40rpx">
			<view v-for="bank in bankList" @tap="confirmBank(bank)" class="flex-row-start-center" style="height:112rpx;border-bottom:2rpx solid #59595D">
				<view :class="bank.class"></view>{{ bank.name }}
			</view>
		</view>
		<view v-if="procedure==='sms'" style="padding:0 30rpx;">
			<view style="margin:100rpx 0 80rpx 60rpx">已发送至您的实名认证手机号</view>
			<u-message-input style="margin-bottom:80rpx;" mode="box" @change="recordCode" :maxlength="6" :breathe="true"></u-message-input>
			<u-verification-code unique-key="page-c" :keep-running="true" seconds="60" ref="uCode" @change="codeChange">
			</u-verification-code>
			<view style="text-align: center;margin-bottom:80rpx;" @tap="withdrawSmsCode">{{ tip }}</view>
			<view class="flex-row-around-center" style="margin:0 100rpx;">
				<view @tap="procedure='form'" class="bibtn plainbutton">返回</view>
				<view @tap="verifyCode" class="bibtn button">确定</view>
			</view>
		</view>
		<u-modal class="feeModal" v-model="feeShow" :show-title="false"  :show-confirm-button="false">
			<view class="feePadding">
				<view class="flex-row-between-center">
					<u-icon @tap="feeShow = false" name="close" style="color:white"></u-icon>
					<view class="feeTitle">余额提现</view>
					<view></view>
				</view>
				<view style="font-size:80rpx;color:white;text-align: center;">¥ {{ cent2yuan(feeForm.cashoutAmount) }}</view>
				<view style="font-size:28rpx;line-height:50rpx;color:#B2B2B5">
					<view style="border:2rpx solid #59595D;margin:30rpx 0"></view>
					<view class="flex-row-between-center">
						<view>服务费</view><view class="num">¥ {{ cent2yuan(feeForm.serviceAmount) }}</view>
					</view>
					<view class="flex-row-between-center">
						<view>费率</view><view class="num">{{ (Number(feeForm.serviceCharge)*100).toFixed(2) }}%</view>
					</view>
				</view>
				<view class="button feeBtn" @tap="doWithdrawApply">确定</view>		
			</view>
		</u-modal>
		<u-modal class="feeModal" v-model="warnShow" :show-title="false"  :show-confirm-button="false">
			<view class="feePadding">
				<view class="feeTitle">注意</view>
				<view class="feeMain">{{ errorMsg }}</view>
				<view class="button feeBtn" @tap="warnShow = false">确定</view>		
			</view>
		</u-modal>
		<u-modal class="feeModal" v-model="successShow" :show-title="false"  :show-confirm-button="false">
			<view class="feePadding">
				<view class="feeTitle">提交成功</view>
				<view class="feeMain">预计将在两到三个工作日到账</view>
				<view class="button feeBtn" @tap="finishWithDraw">确定</view>		
			</view>
		</u-modal>
		<u-mask :show="maskShow">
			<view style="width:100%;height:100%;text-align: center;line-height:100vh;">
				<u-loading size="18rpx" style="margin-right:20rpx;position:relative;top:-3rpx;" mode="flower"></u-loading>
				{{ loadingMsg }}
			</view>
		</u-mask>
	</view>
</template>

<script>
	import FundApi from "@/common/apis/fund.js"
	import { luhnCheck } from "@/common/common.js"
	import { cent2yuan } from "@/common/common.js"
	export default{
		data(){
			return{
				procedure:'form',
				procedureTitleOptions:{'form':'提现','selectBank':'选择银行','sms':'验证码'},
				inputCode:'',
				tip:'',
				form:{},
				fundForm:{},
				bankList:[
					{name:'中国工商银行',class:'bank-com'},
					{name:'中国农业银行',class:'bank-agri'},
					{name:'中国银行',class:'bank-cn'},
					{name:'中信银行',class:'bank-cn'},
				],
				feeShow:false,
				warnShow:false,
				successShow:false,
				feeForm:{},
				maskShow:false,
				loadingMsg:"",
				errorMsg:"",
			}
		},
		onLoad(){
			FundApi.accountInfo().then(res=>{
				this.form = res
			}).catch(err=>{
				this.$u.toast(err)
			})
		},
		methods:{
			cent2yuan,
			withdrawSmsCode(){
				let flag = this.validateBankCode()&&this.validateBankOut()&&this.validateCashout()
				if(!flag)return
				this.procedure="sms"
				this.$nextTick(()=>{
					if (this.$refs.uCode.canGetCode) {
						uni.hideLoading();
						this.$refs.uCode.start();
						FundApi.smsPhone().then(res=>{
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
				})
			},
			verifyCode(){
				if (this.inputCode.length < 6){
					this.$u.toast("验证码不合法")
					return
				}
				FundApi.smsVerify({
					params:{
						smsCode:this.inputCode
					}
				}).then(res=>{
					this.procedure = 'form'
					this.calcFee()
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			calcFee(){
				this.maskShow = true
				this.loadingMsg = "正在计算服务费..."
				FundApi.withdrawFee({
					params:{
						cashoutAmount:Number(this.fundForm.cashoutAmountYuan)*100
					}
				}).then(res=>{
					this.maskShow = false
					this.feeForm = res
					this.feeShow = true
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			doWithdrawApply(){
				this.maskShow = true
				this.loadingMsg = "正在申请提现..."
				this.feeShow = false
				FundApi.withdrawApply({
					params:{
						cashoutAmount:this.feeForm.cashoutAmount,
						cashoutBankName:this.fundForm.cashoutBankName,
						cashoutBankCode:this.fundForm.cashoutBankCode,
						cashoutServiceCharge:this.feeForm.serviceAmount
					},
				}).then(res=>{
					this.maskShow = false
					this.successShow = true
				}).catch(err=>{
					this.maskShow = false
					this.errorMsg = err
					this.warnShow = true
				})
			},
			recordCode(val) {
				this.inputCode = val
			},
			codeChange(text) {
				this.tip = text;
			},
			validateBankCode(){
				if(!this.fundForm.cashoutBankCode||!luhnCheck(this.fundForm.cashoutBankCode)){
					this.$u.toast('请正确输入银行卡号')
					return false
				}
				return true
			},
			validateBankOut(){
				if(this.$u.test.isEmpty(this.fundForm.cashoutBankName)){
					this.$u.toast('请正确选择开户行')
					return false
				}
				return true
			},
			validateCashout(){
				if(!this.$u.test.amount(this.fundForm.cashoutAmountYuan)){
					this.$u.toast('请正确输入提现金额（最多保留两位小数）')
					return false
				}
				if(Number(this.fundForm.cashoutAmountYuan)*100>this.form.amount){
					this.$u.toast('提现金额不可超过余额')
					return false
				}
				return true
			},
			confirmBank(bank){
				this.fundForm.cashoutBankName = bank.name
				this.procedure='form'
			},
			setAmount(){
				this.$set(this.fundForm,'cashoutAmountYuan',Number(this.form.amount)/100) 
			},
			finishWithDraw(){
				uni.navigateTo({
					url:"/pages/sys/mine/fund/index"
				})
			},
			gotoWithdrawList(){
				uni.navigateTo({
					url:'/pages/sys/mine/fund/withdrawList'
				})
			},
			customGoBack(){
				if(this.procedure==='selectBank'||this.procedure==='sms'){
					this.procedure='form'
					return
				}
				uni.navigateBack({
					delta:1
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
	@import '@/common/css/index.scss';

	
	.bigField{
		/deep/ .u-field__input-wrap{
			font-size:68rpx;
		}
	}
	
	.feeModal {
		/deep/ .u-model {
			background-color: #2A2A34 !important;
		}
		.feeTitle{
			text-align:center;
			padding:50rpx;
			font-size:34rpx;
			color:#E9E9EA;
		}
		.feeMain{
			text-align:center;
			color:#B2B2B5;
			font-size:34rpx;
		}
		.feeBtn{
			 width:368rpx;
			 height:80rpx;
			 line-height:80rpx;
			 border-radius: 20rpx;
			 margin:50rpx auto
		}
		.feePadding{
			 padding:0 50rpx;
		}

		.num{
			color:white;
			margin-left:30rpx;
		}
	}
	
</style>