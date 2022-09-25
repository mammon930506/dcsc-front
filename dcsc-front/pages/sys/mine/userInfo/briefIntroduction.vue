<template>
	<view class="wrap">
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			编辑简介<view style="color: #7A83D2;" @tap="saveIntro">保存</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view style="height:160rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view style="height:100rpx;"></view>
		<!-- #endif -->
		<view style="padding:0 30rpx">
			<u-field class="publishField" type="textarea" label-width="0" v-model.trim="briefIntroduction" placeholder="点击填写兴趣爱好、生活方式等个人简介" maxlength="300"  :border-bottom="false" :clearable="false"></u-field>
			<view class="attrLabel flex-between" style="font-weight: 500;font-size: 28rpx;padding: 0 20rpx;margin-top: 10rpx;">
				<view @tap="briefIntroduction=''">清空</view>
				<view>{{introduceNum}}/300</view>
			</view>
		</view>

	</view>
</template>

<script>
	import MineApi from "@/common/apis/mine.js"
	export default {
		data() {
			return {
				briefIntroduction: ''
			}
		},
		onLoad() {
			this.getMineInfoData()
		},
		computed: {
			introduceNum() {
				return this.briefIntroduction.length
			}
		},
		methods: {
			saveIntro(){
				MineApi.saveIntro({
					params:{
						briefIntroduction:this.briefIntroduction
					}
				}).then(res=>{
					this.$u.toast('保存成功')
					setTimeout(()=>{
						this.customGoBack()
					},500)
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			getMineInfoData() {
				MineApi.mineInfo().then(res => {
					this.briefIntroduction = res.briefIntroduction
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			customGoBack() {
				uni.navigateBack({
					delta: 1
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
