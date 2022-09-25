<template>
	<view class="card">
		<view style="display: flex;justify-content: space-between;">
			<view style="display: flex">
				<view @tap="gotoArtistMain(item)" style="width:120rpx;height:120rpx;border-radius: 60rpx;background-size:cover;margin-right:20rpx;" :style="{backgroundImage:`url(${imgBaseUrl}${item.headerImg||item.header}${imgSuffix})`}"></view>
				<view style="display: flex;flex-direction: column;justify-content: space-around;width:480rpx">
					<view style="display: flex;justify-content: space-between;">
						<view style="color:#F3F4F6;font-size:28rpx;">{{ item.nickName }}</view>
						<view v-if="opeList.includes('follow')">
							<follow :detail="item"></follow>
						</view>
						<view v-if="opeList.includes('gotoStore')" style="display: flex;justify-content: flex-end;">
							<view @tap="gotoStore(item)" class="button" style="width:160rpx;height:48rpx;border-radius:20rpx;font-size:24rpx;line-height:48rpx;font-weight: bold;;">进入店铺</view>
						</view>
					</view>
					<view>
						<view v-if="briefList.includes('statics')" style="display: flex;justify-content: flex-start;">
							<view class="briefText" style="margin-right:40rpx;">粉丝：{{ item.fans }}</view>
							<view class="briefText">上架尚品：{{ item.nfts }}件</view>
						</view>
						<view v-if="briefList.includes('intro')" class="briefText nowrapellipsis">
							{{ item.briefIntroduction }}
						</view>
						<view v-if="briefList.includes('contribution')  && item.payCount!=undefined" class="briefText">
							贡献{{ item.payCount }}单
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import SnsApi from "@/common/apis/sns.js"
	import Follow from "@/components/mine/Follow.vue"
	export default{
		props:{
			item:{
				type:Object,
				default(){
					return{}
				}
			},
			opeList:{
				type:Array,
				default(){
					return []
				}
			},
			briefList:{
				type:Array,
				default(){
					return []
				}
			}
		},
		components:{
			Follow
		},
		methods:{
			gotoArtistMain(item){
				uni.navigateTo({
					url:`/pages/sys/merchandise/artistMain?userCode=${item.userCode}`
				})
			},
			gotoStore(item){
				uni.navigateTo({
					url:`/pages/sys/merchandise/store?userCode=${item.userCode}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/index.scss";
	.briefText{
		color:#9CA3AF;
		font-size:20rpx;
	}
</style>
