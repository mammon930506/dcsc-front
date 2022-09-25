<template>
	<view  :style="{backgroundColor:bgColor}">
		<view  style="padding: 40rpx 50rpx 120rpx;height: 100rpx;text-align: center;font-size: 18px;">
			盲盒库存
		</view>
		<scroll-view>
			<view v-for="blindStore in blindStoreSub ">
				<view   style="margin: 0rpx 30rpx; height: 300rpx; display:flex;flex-direction: row;">
					<view style="width:35%;">
						<view style="margin:20rpx 0rpx;width: 250rpx;height:260rpx;border-radius: 47rpx;background-size:100% 100%;margin-right:20rpx;" :style="{backgroundImage:`url(${imgBaseUrl}${blindStore.nftImgs}${imgSuffix})`}" ></view>
					</view>
					<view style="margin-top:30rpx;margin-bottom: 30rpx;margin-left: 30rpx; width: 65%;display:flex;flex-direction: column;" >
						<view style="height: 35%;color: #FFFFFF;font-size: 32rpx;">{{blindStore.nftName}}</view>
						<view style="height: 25%;color: #9CA3AF;font-size: 20rpx;">商品编码:{{blindStore.nftSubCode}}</view>
						<view style="height: 40%;display:flex;flex-direction: row; background-color: #35353F; border-radius: 20rpx;">
							<view style="width: 30%;display: flex;flex-direction: column;margin-left:10rpx;margin-top: 10rpx;">
								<view style="color:#F3F4F6;text-align: center;">{{blindStore.issueCount}}</view>
								<view style="color:#9CA3AF;text-align: center;">发行量</view>
							</view>
							<view style="width: 30%;display: flex;flex-direction: column;margin-left:10rpx;margin-top: 10rpx;">
								<view style="color:#F3F4F6;text-align: center;">{{blindStore.nftStock}}</view>
								<view style="color:#9CA3AF;text-align: center;">库存量</view>
							</view>
							<view style="margin-left:12rpx;" >
								<view  class="button" style="width: 150rpx;height: 95rpx;line-height: 95rpx;font-size: 24rpx;border-radius: 16rpx;" @tap="issueChange(blindStore)">
									<span style="text-align: center;">调整发行量</span>
								</view>
							</view>
						</view>
					</view>
					
				</view>
				<p style="border: 1rpx solid #59595D;"></p>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:{
			initial:{
				type:Number,
				default(){
					return 0
				}
			},
			blindStoreSub:{
				type:Array,
				default(){
					return []
				}
			},
			bgColor:{
				type:String,
				default:"#2A2A34"
			},
			inactiveColor:{
				type:String,
				default:"#AAAAAA"
			}
		},
		methods:{
			customGoBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			issueChange(blindStore){
				this.$emit('issueChange',blindStore);
			}
		}
	}
</script>



<style lang="scss" scoped>
		@import "@/common/css/index.scss";
</style>