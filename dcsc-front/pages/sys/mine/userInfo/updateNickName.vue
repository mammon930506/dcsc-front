<template>
	<view class="wrap">
		<!-- #ifdef H5 -->
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			编辑昵称<view style="color: #7A83D2;" @tap="updateNickName">保存</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			编辑昵称<view style="color: #7A83D2;" @tap="updateNickName">保存</view>
		</view>
		<view style="height: 160rpx;"></view>
		<!-- #endif -->
		<view style="padding: 0 50rpx;">
			<view class="attrLabel flex-between" style="font-weight: 500;font-size: 28rpx;">昵称<view>{{nickNameNum}}/16
				</view>
			</view>
			<u-field class="publishField" label-width="0" v-model.trim="nickName" placeholder="请输入新的昵称"
				clearable maxlength="16" clear-size="40" :border-bottom="false"></u-field>
			<view style="font-size: 20rpx;color: #9CA3AF;font-weight: 400;margin-top: 30rpx;">请设置3--16个字母、汉字、数字、不含特殊字符，设置后不可更改，不能含有敏感词汇</view>
		</view>

	</view>
</template>

<script>
	import MineApi from "@/common/apis/mine.js"
	export default {
		data() {
			return {
				nickName: '',
				userCode:''
			}
		},
		onLoad(options) {
			console.log(options,'传入参数');
			this.nickName=options.nickName
			this.userCode=options.userCode
			
		},
		computed: {
			nickNameNum() {
				return this.nickName ? this.nickName.length : 0
			}
		},
		methods: {
			customGoBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			updateNickName(){
				if(this.$u.test.isEmpty(this.nickName)){
					return this.$u.toast('请输入昵称')
				}
				MineApi.saveNickName({
					params:{
						userCode:this.userCode,
						nickName:this.nickName
					}
				}).then(()=>{
					uni.showToast({
						title:'修改成功',
						icon:"none"
					})
					setTimeout(()=>{
						uni.navigateBack()
					},500)	
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
