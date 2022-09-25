<template>
	<view @tap="followArtist">
		<view v-if="Number(detail.isAttention)===1||Number(detail.ifAttention)===1" class="userMarker">
			<view></view>
			<view>已关注</view>
		</view>
		<view v-else class="button follow">+关注</view>
	</view>
</template>

<script>
	import SnsApi from "@/common/apis/sns.js"
	export default{
		props:{
			detail:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		methods:{
			followArtist(){ 
				SnsApi.followUser({
					params:{
						userCode:this.detail.userCode
					}
				}).then(res=>{
					this.$set(this.detail,'isAttention',res.isAttention)
					this.$set(this.detail,'ifAttention',res.isAttention)
					this.$u.toast(Number(res.isAttention)===1?"关注成功":"取关成功")
					uni.$emit('followContentRefresh')
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/index.scss";
	.follow{
		width:120rpx;
		height:60rpx;
		border-radius:20rpx;
		font-size:24rpx;
		line-height:60rpx;
		font-weight: bold;
		margin-left:30rpx;
	}
</style>