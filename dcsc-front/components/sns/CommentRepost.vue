<template>
	<view>
		<view style="display: flex;font-size:24rpx;margin-top:40rpx;">
			<view @tap='gotoArtistMain' style="width:50rpx;height:50rpx;border-radius:25rpx;background-size:100% 100%;margin-right:10rpx;"
			:style="{backgroundImage:`url(${imgBaseUrl}${content.header}${imgSuffix})`}"></view>
			<view>
				<view style="color:white;" >{{ content.nickName }}</view>
				<view style="color:#767676;">{{ content.createdDate&&$u.timeFormat(content.createdDate, 'yyyy-mm-dd hh:MM:ss') }}</view>
			</view>
		</view>
		<view style="color:#D8D8D8;margin-left:60rpx;word-wrap: break-word;word-break: break-all;" @tap="commentTapped">
			<a v-if="content.replyUserCode" style="margin-right:20rpx;">回复：<a style="color:#7A83D2;">{{ content.replyName }}</a></a><a>{{ content.replyContent }}</a>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			content:{
				type:Object,
				default(){
					return{}
				}
			}
		},
		methods:{
			commentTapped(){
				this.$emit('commentTapped')
			},
			gotoArtistMain(){
				uni.navigateTo({
					url:`/pages/sys/merchandise/artistMain?userCode=${this.content.userCode}`
				})
			}
		}
	}
</script>

<style>
</style>
