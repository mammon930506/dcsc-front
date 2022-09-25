<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			<view style="margin-left:40rpx">艺术家排行榜</view>
			<view @tap="gotoBrokerRankNft">藏品</view>
		</view>
		<view class="flex-row-between-center" style="padding:0 30rpx">
			<view style="width:400rpx;">
				<tabs-in-store @navChange="periodChange" :navList="periodList" :bgColor="'#17171B'"></tabs-in-store>
			</view>
			<view style="width:200rpx;">
				<floating-panel @cateChange="sortChange" :toggleSelected="false" :iconShow="true"
				:customIconUpName="'arrow-up-fill'" :customIconDownName="'arrow-down-fill'"
				:customIconStyle="{color:'#9CA3AF'}" :list="['粉丝数','销量','销售额']"
				:activeItem="{color:'#7A83D2',fontWeight:'bold'}">
					<span style="color:#9CA3AF;margin-right:20rpx;">排序方式</span>
				</floating-panel>
			</view>
		</view>
		<view>
			<scroll-view scroll-y :style="{height:scrollViewHeight}" @scrolltolower="loadData">
				<view style="padding:30rpx;">
					<view v-for="obj in rankList">
						<rank-artist-brief :brief="obj"></rank-artist-brief>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import BrokerApi from "@/common/apis/broker.js"
	import { calScrollHeight } from "@/common/common.js"
	import TabsInStore from "@/components/merchandise/TabsInStore"
	import FloatingPanel from "@/components/merchandise/FloatingPanel"
	import RankArtistBrief from "@/components/mine/broker/rankArtistBrief.vue"
	export default{
		data(){
			return{
				scrollViewHeight:0,
				workPage:-1,
				periodList:[
					{name:'周榜',value:'1'},
					{name:'月榜',value:'2'},
					{name:'年榜',value:'3'},
				],
				sortList:['1','2','3'],
				rankList:[
					// {
					// 	userCode:'123',
					// 	nickName:'可爱的萨摩耶爱好者',
					// 	header:'/thumbUrl/f676cd51728840a28013bfa260d4faac.jpg',
					// 	fans:12,
					// 	orderCount:'400',
					// 	orderAmount:'5000',
					// 	isLike:'1',
					// 	rankIndex:1
					// },
				],
				queryParams:{
					pageSize:10,
					rankType:'1',
					orderType:'1'
				}
			}
		},
		components:{TabsInStore,FloatingPanel,RankArtistBrief},
		onLoad(){
			this.scrollViewHeight = calScrollHeight(160)
			this.loadData()
		},
		methods:{
			loadData(){
				uni.showLoading({
					title:'正在查询...',
					mask:true
				})
				this.workPage++
				BrokerApi.rankArtist({
					params:{
						offset:this.workPage,
						...this.queryParams,
					}
				}).then(res=>{
					if(!res.data||res.data.length<10){
						this.workPage--
					}
					let offset = Math.floor(this.rankList.length/10)
					res.data.forEach((item,index)=>{
						item.isAttention = item.isLike
						item.rankIndex = offset*10+index+1
					})
					this.rankList = this.rankList.splice(0,offset*10).concat(res.data)
					uni.hideLoading()
				}).catch(err=>{
					this.$u.toast(err)
					uni.hideLoading()
				})
			},
			periodChange(index,item){
				this.workPage = -1
				this.rankList = []
				this.queryParams.rankType = item.value
				this.loadData()
			},
			sortChange(index){
				this.workPage = -1
				this.rankList = []
				this.queryParams.orderType = this.sortList[index]
				this.loadData()
			},
			gotoBrokerRankNft(){
				uni.navigateTo({
					url:'/pages/sys/mine/broker/rankNft'
				})
			},
			customGoBack(){
				uni.navigateTo({
					url:'/pages/sys/mine/myInvitedUser'
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
	@import url('@/common/css/index.scss');
</style>