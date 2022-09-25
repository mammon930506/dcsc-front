<template>
	<view class="wrap">
		<headnavbar title="最近浏览"></headnavbar>
		<scroll-view  scroll-y="true"  :style="{height:scrollViewHeight}" @scrolltolower="browseHistory">
			<view style="padding:0 40rpx 40rpx;">
			  <view v-for="bh in bhList">
				<browsehistory :brief="bh"></browsehistory>
			  </view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import headnavbar from "@/components/headnavbar/index.vue"
	import MineApi from "@/common/apis/mine.js"
	import browsehistory from "@/components/mine/browseHistory.vue"
	import {calScrollHeight,stamp2date} from "@/common/common.js"
	export default{
		data(){
			return{
				scrollViewHeight:0,
				workPage:-1,
				bhList:[],
				lastDate:'',
			}
		},
		onLoad(option){
			this.scrollViewHeight = calScrollHeight(100)
			this.browseHistory()
		},
		components: {
			browsehistory,
			headnavbar
		},
		methods:{
			browseHistory(){
				uni.showLoading({
					title:'正在加载...',
					mask:true
				})
				this.workPage++
				MineApi.browseHistory({
					params: {
						offset:this.workPage,
						pageSize:10
					}
				}).then(res=>{
					let offset = Math.floor(this.bhList.length/10)
					if(!res.data||res.data.length<10){
						this.workPage--
					}
					res.data.forEach(item=>{
						if(item.historyType==='2'){
							item.imgList = item.imgs&&item.imgs.length?JSON.parse(item.imgs):[]
						}else if(item.historyType==='3'){
							item.imgList = [item.nftImgs]
						}
						if(item.imgList.length>4){
							item.imgList = item.imgList.splice(0,4)
						}
					})
					let len = res.data.length
					for(let i=0;i<len;i++){
						let tempDate = this.$u.timeFormat(res.data[i].historyDate, 'yyyy-mm-dd')
						if(this.lastDate!==tempDate){
							res.data[i].isNewDate = true
							res.data[i].browseDate = tempDate
							this.lastDate = tempDate
						}
					}
					this.bhList=this.bhList.splice(0,10*offset).concat(res.data)
					uni.hideLoading()
				}).catch(err=>{
					this.$u.toast(err)
					uni.hideLoading()
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
	@import "@/common/css/index.scss";
</style>
