<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			账户明细<view></view>
		</view>
		<tabs-in-store style="margin:20rpx 0 0" :initial="current"  inactiveColor="#ffffff" :navList="navList" bgColor="#18181c" @navChange="navChange"></tabs-in-store>
		<view>
			<scroll-view  scroll-y="true"  :style="{height:scrollViewHeight}" @scrolltolower="getDataList(current)">
				<view v-show="current===0" style="padding:30rpx">		
					<view v-for="brief in allList">
						<io-detail :brief="brief"></io-detail>
					</view>
				</view>
				<view v-show="current===1" style="padding:30rpx">
					<view v-for="brief in incomeList">
						<io-detail :brief="brief"></io-detail>
					</view>
				</view>
				<view v-show="current===2" style="padding:30rpx">
					<view v-for="brief in expenseList">
						<io-detail :brief="brief"></io-detail>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import FundApi from "@/common/apis/fund.js"
	import { cent2yuan } from "@/common/common.js"
	import TabsInStore from "@/components/merchandise/TabsInStore"
	import IoDetail from "@/components/mine/IoDetail"
	import {calScrollHeight} from "@/common/common.js"
	export default{
		data(){
			return{
				current:0,
				navList:[
					{
						name:'全部',value:undefined
					},{
						name:'收入',value:'6'
					},{
						name:'支出',value:'7'
					}
				],
				workPageObj:{0:-1,1:-1,2:-1},
				typeObj:{0:undefined,1:'6',2:'7'},
				allList:[],
				incomeList:[],
				expenseList:[],
				scrollViewHeight:0,
			}
		},
		components:{
			TabsInStore,IoDetail
		},
		onLoad(){
			this.scrollViewHeight = calScrollHeight(200)
			this.getDataList(0)
			this.getDataList(1)
			this.getDataList(2)
		},
		methods:{
			navChange(index){
				this.current = index
			},
			getDataList(current){
				this.workPageObj[current]++
				FundApi.incomenexpenseList({
					params:{
						pageSize:10,
						offset:this.workPageObj[current],
						changeType:this.typeObj[current]
					}
				}).then(res=>{
					if(current===0){
						this.allList = this.allList.concat(res.data)
					}else if(current===1){
						this.incomeList = this.incomeList.concat(res.data)
					}else if(current===2){
						this.expenseList = this.expenseList.concat(res.data)
					}
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			customGoBack(){
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
</style>