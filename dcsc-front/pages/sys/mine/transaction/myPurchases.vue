<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			我的尚品<view></view>
		</view>
		<view>
			<scroll-view  scroll-y="true"  :style="{height:scrollViewHeight}" @scrolltolower="loadData">
					<view style="padding:30rpx" v-show="list&&list.length>0">
						<work-flow :flowList="list">
							<template v-slot="{item}">
								<merchandise :brief="item" :inMine="true"></merchandise>
							</template>
						</work-flow>
					</view>

				<view v-show="list.length==0 || !list">
					<view class="blankIcon"></view>
					<view style="color:#AAAAAA;font-size:32rpx;text-align: center;font-weight: bold;">
						<view>你还没有尚品</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import WorkFlow from "@/components/home/WorkFlow"
	import Merchandise from "@/components/merchandise/Merchandise"	
	import {calScrollHeight} from "@/common/common.js"
	import MineApi from "@/common/apis/mine.js"
	export default{
		data(){
			return{
				workPage:-1,
				scrollViewHeight:0,
				list:[]
			}
		},
		components:{
			WorkFlow,Merchandise
		},
		onLoad(){
			this.scrollViewHeight = calScrollHeight(100)
			this.loadData()
		},
		methods:{
			loadData(){
				this.workPage++
				MineApi.myPurchases({
					params:{
						offset:this.workPage,
						pageSize:10,
					}
				}).then(res=>{
					if(!res.data||res.data.length<10){
						this.workPage--
					}
					let lastOffset = Math.floor(this.list.length/10)
					this.list = this.list.splice(0,lastOffset*10).concat(res.data)
				})
			},
			customGoBack(){
				uni.switchTab({
					url: '/pages/sys/mine/index'
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