<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			<view style="margin-left:40rpx">藏品排行榜</view>
			<view @tap="gotoBrokerRankArtist">艺术家</view>
		</view>
		<view class="flex-row-between-center" style="padding:0 30rpx">
			<view style="width:400rpx;">
				<tabs-in-store @navChange="periodChange" :navList="periodList" :bgColor="'#17171B'"></tabs-in-store>
			</view>
			<view class="flex-row-between-center" style="width:240rpx;font-size:24rpx;color:#9CA3AF;">
				<horizon-select :customItem="true" :toggleSelected="false" :toggleCancel="true" @doQuery="userCodeChange"
					:optionList="artistOptionList">
					<span slot="customTitle">筛选</span>
					<view slot="customItem" slot-scope="{item}">
						<rank-artist-brief :detailLevel="1" :brief="item" :nickNameStyle="{color:item.isActive?'#7A83D2':'white'}"></rank-artist-brief>
					</view>
				</horizon-select>
				<view>|</view>
				<floating-panel @cateChange="sortChange" :toggleSelected="false" :iconShow="true"
				:customIconUpName="'arrow-up-fill'" :customIconDownName="'arrow-down-fill'"
				:customIconStyle="{color:'#9CA3AF'}" :list="['收藏量','销量','销售额']"
				:activeItem="{color:'#7A83D2',fontWeight:'bold'}">
					<span style="font-size:24rpx;color:#9CA3AF;margin-right:20rpx;">排序方式</span>
				</floating-panel>
			</view>
		</view>
		<view>
			<scroll-view scroll-y :style="{height:scrollViewHeight}" @scrolltolower="loadData">
				<view style="padding:30rpx;">
					<view v-for="obj in rankList">
						<rank-nft-brief :brief="obj"></rank-nft-brief>
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
	import RankNftBrief from "@/components/mine/broker/rankNftBrief.vue"
	import RankArtistBrief from "@/components/mine/broker/rankArtistBrief.vue"
	import HorizonSelect from '@/components/mine/HorizonSelect'
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
					// 	nickName:'中国航天文创',
					// 	header:'/thumbUrl/f676cd51728840a28013bfa260d4faac.jpg',
					// 	nftName:'太空秀场 | 电子嫦娥电子嫦娥电子嫦娥电子dafsdfasadfasdfasdf解耦i商家地方',
					// 	nftImgs:'/thumbUrl/d49636b490104409aaf3c11fc40976dd.jpg',
					// 	nftCode: 20,
					// 	storeup:'30',
					// 	orderCount:'400',
					// 	orderAmount:'5000',
					// 	isStoreup:'1',
					// 	rankIndex:1
					// },
					// {
					// 	nickName:'中国航天文创',
					// 	header:'/thumbUrl/f676cd51728840a28013bfa260d4faac.jpg',
					// 	nftName:'太空秀场 | 电子嫦娥电子嫦娥电子嫦娥电子dafsdfasadfasdfasdf解耦i商家地方',
					// 	nftImgs:'/thumbUrl/d49636b490104409aaf3c11fc40976dd.jpg',
					// 	nftCode: 20,
					// 	storeup:'30',
					// 	orderCount:'400',
					// 	orderAmount:'5000',
					// 	isStoreup:'1',
					// 	rankIndex:4
					// }
				],
				queryParams:{
					pageSize:10,
					rankType:'1',
					orderType:'1',
					userCode:undefined
				},
				artistOptionList:[
					// {
					// 	userCode:'121',
					// 	nickName:'可爱的萨摩耶爱好者',
					// 	header:'/thumbUrl/f676cd51728840a28013bfa260d4faac.jpg',
					// 	fans:12,
					// 	orderCount:'400',
					// 	orderAmount:'5000',
					// 	isLike:'1',
					// 	rankIndex:1,
					// 	value:'121',
					// },
					// {
					// 	userCode:'123',
					// 	nickName:'造一个小小的数据',
					// 	header:'/thumbUrl/f676cd51728840a28013bfa260d4faac.jpg',
					// 	fans:12,
					// 	orderCount:'400',
					// 	orderAmount:'5000',
					// 	isLike:'1',
					// 	rankIndex:1,
					// 	value:'123',
					// },
				]
			}
		},
		components:{TabsInStore,FloatingPanel,RankNftBrief,RankArtistBrief,HorizonSelect,},
		onLoad(){
			this.scrollViewHeight = calScrollHeight(160)
			this.loadArtistOptionList()
			this.loadData()
		},
		methods:{
			loadArtistOptionList(){
				BrokerApi.rankArtist({
					params:{
						offset:0,
						pageSize:10,
						rankType:'1',
						orderType:'1'
					}
				}).then(res=>{
					res.data.forEach(item=>{
						item.value = item.userCode
					})
					this.artistOptionList = res.data
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			loadData(){
				uni.showLoading({
					title:'正在查询...',
					mask:true
				})
				this.workPage++
				BrokerApi.rankNft({
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
						item.rankIndex = offset*10+index+1
					})
					this.rankList = this.rankList.splice(0,offset*10).concat(res.data)
					uni.hideLoading()
				}).catch(err=>{
					this.$u.toast(err)
					uni.hideLoading()
				})
			},
			userCodeChange(item){
				this.workPage = -1
				this.rankList = []
				this.queryParams.userCode = item.value
				this.loadData()
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
			gotoBrokerRankArtist(){
				uni.navigateTo({
					url:'/pages/sys/mine/broker/rankArtist'
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