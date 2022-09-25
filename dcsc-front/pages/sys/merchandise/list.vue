<template>
	<view class="wrap">
		<view class="pageHeader" style="height:120rpx;padding:0 30rpx;padding-top:30rpx;">
			<u-search v-model="keyword" shape="square" class="realSearch" placeholder="请输入关键字搜索" bg-color="#2A2A34"
				color="#767676" action-text="" margin="0 0 10rpx 0" :disabled="searchDisabled" 
				@focus="gotoSearch" @clear="clearSearch" :show-action="false"
				search-icon="/static/common/img/index/recommend/Search.png" placeholder-color="#767676"
				></u-search>
				<!-- :action-style="{width:'40rpx',height:'40rpx',backgroundImage:'url(/static/common/img/merchandise/category.png)',backgroundSize:'100% 100%'}" -->
		</view>
		<view style="height:80rpx;" >
			<cate-panel ref="catePanel" @changeActive="changeClassify"></cate-panel>
		</view>
		<view>
			<scroll-view :refresher-enabled="true" :refresher-triggered="refreshTriggered" refresher-background="#18181c" @refresherrefresh="pullDownRefresh" 
			 @touchstart="touchstart" @touchend="touchend" @scrolltolower="loadMore" scroll-y="true" :style="{height:scrollViewHeight}">
				<view style="margin:0 10rpx">
					<work-flow ref="merchandiseFlow" :flowList="merchandiseList">
						<template v-slot="{item}">
							<merchandise :brief="item"></merchandise>
						</template>
					</work-flow>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import MerchandiseApi from "@/common/apis/merchandise.js"
	import Merchandise from "@/components/merchandise/Merchandise"
	import CatePanel from "@/components/merchandise/CatePanel"
	import WorkFlow from "@/components/home/WorkFlow"
	import {calScrollHeight} from "@/common/common.js"
	export default{
		data(){
			return {
				merchandiseList:[],
				workPage:-1,
				scrollViewHeight:0,
				refreshTriggered:false,
				keyword:'',
				classifyCode:undefined,
				startData: {
					clientX: 0,
					clientY: 0,
				},
				touch: {
					clientX: 0,
					clientY: 0,
				},
				searchDisabled:true
			}
		},
		components:{
			Merchandise,WorkFlow,CatePanel
		},
		onShow(){
			setTimeout(()=>{
				this.searchDisabled = false
			},1000)
		},
		onLoad(option){
			setTimeout(()=>{
				this.scrollViewHeight = calScrollHeight(200)
			},1000)		
			this.defaultSearch()
			uni.$on("merchandiseListSearch",res=>{
				this.workPage = -1
				this.keyword = res.keyword
				this.merchandiseList=[]
				this.$nextTick(()=>{
					this.$refs.merchandiseFlow.clearFlow()
				})
				this.doSearch()
			})
		},
		methods:{
			pullDownRefresh(){
				this.refreshTriggered = true
				this.workPage = -1
				this.merchandiseList=[]
				this.$nextTick(()=>{
					this.$refs.merchandiseFlow.clearFlow()
				})
				this.doSearch()
			},
			touchstart(e) {
				this.startData.clientX = e.changedTouches[0].clientX;
				this.startData.clientY = e.changedTouches[0].clientY;
			},
			touchend(e) {
				this.touch = e.changedTouches[0]
				if (Math.abs(this.touch.clientY - this.startData.clientY) > 100) {
					this.$refs.catePanel.toggleExtend(false)
				}
			},
			doSearch(){
				if(this.keyword){
					this.keywordSearch()
				}else if(!this.keyword&&this.classifyCode){
					this.classifySearch()
				}else if(!this.keyword&&!this.classifyCode){
					this.defaultSearch()
				}
			},
			changeClassify(classifyCode){
				this.classifyCode = classifyCode
				uni.$emit("merchandiseListSearch", {
					keyword:this.keyword
				})
			},
			gotoSearch() {
				this.searchDisabled = true
				uni.navigateTo({
					url: `/pages/sys/home/search?from=merchandiseList&keyword=${this.keyword}`
				})
			},
			clearSearch(){
				uni.$emit("merchandiseListSearch", {
					keyword:''
				})
			},
			loadMore(){
				this.doSearch()
			},
			defaultSearch(){
				this.workPage++
				if(this.workPage===0){
					MerchandiseApi.content({}).then(res=>{
						this.refreshTriggered = false
						this.merchandiseList = res.nfts
					})
				}else{
					MerchandiseApi.moreContent({
						params: {
							offset: this.workPage,
							pageSize: 10
						}
					}).then(res => {
						this.refreshTriggered = false
						this.merchandiseList = this.merchandiseList.concat(res.nfts)
					}).catch(err=>{
						this.refreshTriggered = false
						this.$u.toast(err)
					})
				}
			},
			classifySearch(){
				this.workPage++
				MerchandiseApi.listByClassify({
					params:{
						classifyCode:this.classifyCode,
						offset:this.workPage,
						pageSize:10,
					}
				}).then(res=>{
					this.refreshTriggered = false
					this.merchandiseList = this.merchandiseList.concat(res.nfts)
				}).catch(err=>{
					this.refreshTriggered = false
					this.$u.toast(err)
				})
			},
			keywordSearch(){
				this.workPage++
				MerchandiseApi.search({
					params:{
						nftName:this.keyword,
						classifyCode:this.classifyCode,
						offset:this.workPage,
						pageSize:10,
					},
				}).then(res=>{
					this.refreshTriggered = false
					this.merchandiseList = this.merchandiseList.concat(res.nfts)
				}).catch(err=>{
					this.refreshTriggered = false
					this.$u.toast(err)
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
	@import "@/common/css/index.scss";
	.realSearch {
		/deep/ .u-content {
			padding-top: 40rpx;
			padding-bottom: 46rpx;
			border-radius: 24rpx !important;
		}
	
		/deep/ .u-action {
			font-size: 28rpx;
			color: #aaaaaa;
		}
	
		/deep/ .u-icon-wrap {
			margin: 0 10rpx;
		}
	}
	

</style>