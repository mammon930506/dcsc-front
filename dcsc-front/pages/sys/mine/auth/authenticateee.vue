<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			实名认证<view></view>
		</view>
		<scroll-view scroll-y="true" :style="{height:scrollViewHeight}">
			<view style="padding:0 40rpx">
				<view class="attrLabel">姓名</view>
				<u-field :disabled="disabled" class="publishField" label-width="0" v-model.trim="form.idcardName"
					placeholder="姓名" :border-bottom="false"></u-field>
				<view class="attrLabel">身份证</view>
				<u-field :disabled="disabled" @blur="validateId" class="publishField" label-width="0"
					v-model.trim="form.idcardNo" placeholder="身份证" :border-bottom="false"></u-field>
				<view v-if="!ifrealname" class="attrLabel">银行卡号</view>
				<u-field v-if="!ifrealname" @blur="validateBankCode" class="publishField" label-width="0"
					v-model.trim="form.bankCode" placeholder="银行卡号" :border-bottom="false"></u-field>
				<view class="attrLabel">手机号</view>
				<u-field disabled class="publishField" label-width="0" v-model.trim="form.phone" placeholder="手机号"
					:border-bottom="false"></u-field>
				<view v-if="!disabled">
					<view class="attrLabel">验证码</view>
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<u-field class="publishField" style="width:65%" label-width="0" v-model.trim="form.smsCode"
							placeholder="验证码" :border-bottom="false"></u-field>
						<view style="width:35%;text-align: center;" @tap="getCode">{{ tip }}</view>
					</view>
					<view style="color:#AAAAAA;font-size:24rpx;">
						<br />
						认证须知<br /><br />
						1、身份认证成功之后不可更改，绑定的银行卡只能为当前人认证人的卡，请阅读并理解后再操作；<br /> <br />
						2、请确保您的手机号、姓名、身份证号皆为您本人真实信息，如有弄虚作假行为，一经发现，立即封号；<br /> <br />
						3、应国家法律法规要求，平台无法为未满18周岁以及大于65周岁的中国公民提供服务。<br /><br />
					</view>
					<u-verification-code unique-key="page-b" :keep-running="true" :seconds="60" ref="authCode"
						@change="codeChange">
					</u-verification-code>
					<u-toast ref="authToast" />
				</view>
			</view>
		</scroll-view>
		<view v-if="!disabled"
			style="position:fixed;bottom:0;width:100%;padding:30rpx;background-color:#18181c ;border-top:2rpx solid #59595D">
			<view class="button" @tap="handleAuthen">保存</view>
		</view>
	</view>
</template>

<script>
	import MineApi from "@/common/apis/mine.js"
	import {
		luhnCheck
	} from "@/common/common.js"
	import jlCatche from "@/common/utils/jlCatche.js"
	import {
		calScrollHeight,
		relogin
	} from "@/common/common.js"
	import LoginApi from "@/common/apis/login";
	export default {
		data() {
			return {
				form: {
					idcardName: '',
					idcardNo: '',
					phone: '',
					smsCode: ''
				},
				disabled: true,
				ifrealname: true,
				tip: '',
				scrollViewHeight: 0,
			}
		},
		onLoad() {
			this.scrollViewHeight = calScrollHeight(280)
			this.checkIfRealName()
		},
		methods: {
			luhnCheck,
			checkIfRealName() {
				LoginApi.ifrealname().then(res => {
					this.iflogin = Number(res.iflogin) === 1
					this.ifrealname = Number(res.ifrealname) === 1
					if (!this.iflogin) {
						relogin()
						return
					}
					if (this.ifrealname) {
						this.disabled = true
						MineApi.personInfo().then(res => {
							this.form = res
						}).catch(err => {
							this.$u.toast(err)
						})
					} else {
						this.form.phone = jlCatche.getCacheUserInfo('phone')
						this.disabled = false
					}
				}).catch(err => {
					this.$u.toast(err)
				})
			},
			codeChange(text) {
				this.tip = text
			},
			validateId() {
				if (!this.$u.test.idCard(this.form.idcardNo)) {
					this.$u.toast('请正确输入身份证')
					return false
				}
				return true
			},
			validateBankCode() {
				if (this.$u.test.isEmpty(this.form.bankCode) || !luhnCheck(this.form.bankCode)) {
					this.$u.toast('请正确输入银行卡号')
					return false
				}
				return true
			},
			async getCode() {
				if (!this.$u.test.mobile(this.form.phone)) {
					return this.$u.toast('请正确输入手机号')
				}
				if (this.$refs.authCode.canGetCode) {
					this.$refs.authCode.start();
					MineApi.smsPerson({
						params: {
							phone: this.form.phone
						}
					}).then(res => {
						// this.$refs.authToast.show({
						// 	title:'验证码已发送:'+ res.data,
						// 	duration: 10000
						// })
					}).catch(err => {
						this.$u.toast(err)
					})
				} else {
					this.$u.toast('请稍后重新获取');
				}
			},
			customGoBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			handleAuthen() {
				if (this.$u.test.isEmpty(this.form.idcardName)) {
					return this.$u.toast('请输入姓名')
				}
				let flag = this.validateId() && this.validateBankCode()
				if (!flag) return
				if (!this.$u.test.mobile(this.form.phone)) {
					return this.$u.toast('请输入手机号')
				}
				if (!this.$u.test.code(Number(this.form.smsCode), 6)) {
					return this.$u.toast('请输入验证码')
				}
				uni.showLoading({
					title: '正在认证...',
					mask: true
				})
				MineApi.authPerson({
					params: this.form
				}).then(res => {
					uni.hideLoading()
					this.$u.toast('认证成功')
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 500)
				}).catch(err => {
					uni.hideLoading()
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
