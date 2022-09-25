<template>
	<view class="card">
		<view style="display: flex;justify-content: space-between;align-items: center;">
			<view style="display: flex">
				<view style="width:94rpx;height:94rpx;border-radius: 47rpx;background-size:100% 100%;margin-right:20rpx;" :style="{backgroundImage:`url(${imgBaseUrl}${brief.header}${imgSuffix})`}"></view>
				<view style="display: flex;flex-direction: column;justify-content: space-around;">
					<view style="color:#F3F4F6;font-size:30rpx;">{{ brief.nickName }}</view>
					<view style="color:#9CA3AF">
						 {{ $u.timeFormat(brief.createdDate||brief.updateDate, 'yyyy-mm-dd hh:MM:ss') }}
					</view>
				</view>
			</view>
			<view v-if="isInvitedOrder">¥ {{ cent2yuan(brief.orderAmount) }}</view>
			<view v-else style="color:#7A83D2;font-size:28rpx;">已入驻</view>
		</view>
	</view>
</template>

<script>
	import {cent2yuan} from '@/common/common.js'
	export default{
		props: {
			brief:{
				type: Object,
				default(){
					return {}
				}
			},
			isInvitedOrder:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			cent2yuan
		}
	}
</script>

<style>

</style>
