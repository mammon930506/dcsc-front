<template>
	<view class="wrap">
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			<u-search v-model="queryParams.nftName" shape="square" class="realSearch" placeholder="请输入关键字搜索" bg-color="#2A2A34"
				color="#767676"  margin="0 20rpx"
				search-icon="/static/common/img/index/recommend/Search.png" placeholder-color="#767676"
				 @search="keyWordChange" :show-action="false" @clear="handleClear"></u-search>
			<view class="sold" @tap="gotoMySold"></view>
			<view class="publish" @tap="gotoPublishNormal"></view>
		</view>
		<view style="height:130rpx;"></view>
		<view style="padding:0 30rpx;position:relative;">
			<view style="position:absolute;width:100%;background-color:#2A2A34;height:200rpx;left:0;bottom:0;z-index:1"></view>
			<view class="storeBrief" style="position:relative;display:flex;justify-content:space-between;margin-bottom:40rpx;z-index:2">
				<view style="width:70%;height:100%;display:flex;flex-direction:column;justify-content: space-between;">
					<view>
						<view style="font-size:36rpx;margin-bottom:10rpx;display: flex;align-items: center;">
							<view style="width:55%;word-wrap: break-word;word-break: break-all;">{{ detail.shopName }}</view>
							<view class="userMarker">
								<view></view>
								<view>{{  shopStatusObj[detail.shopStatus] }}</view>
							</view>
						</view>
						<star-level level="3.5"></star-level>
					</view>
					<view style="font-size:24rpx;color:#999999;">{{ detail.nickName }}关注</view>
				</view>
				<view @tap="gotoArtistMain" style="width:160rpx;height:160rpx;border-radius: 20rpx;background-size: cover;background-position: center;" :style="{backgroundImage:`url(${imgBaseUrl}${detail.shopImgs}${imgSuffix})`}"></view>
			</view>
			<view style="position:relative;display: flex;align-items: flex-end;justify-content: space-between;z-index:3">
				<tabs-in-store  style="width: 80%;"  :navList="navList" @navChange="tabChange"></tabs-in-store>
				
				<u-dropdown ref="uDropdown"  @open="open" @close="close" :style="dropDownShow?'':'overflow:hidden;'">
					<u-dropdown-item  title="更多" >
						<scroll-view scroll-y="true" style="height:80vh;background: rgba(0, 0, 0, 0.5);border-radius: 30rpx;width: 140rpx;height: 160rpx; ">
							<view  @click="querystoreNftList(6)" style="font-size: 14px;text-align: center;padding: 10rpx 0rpx;color: #999999;">审核拒绝</view>
							<p style="border:1px solid #999999;margin:10rpx 0rpx;"></p>
							<view  @click="querystoreNftList(7)" style="font-size: 14px;text-align: center;padding: 10rpx 0rpx;color: #999999;">违规下架</view>
						</scroll-view>
					</u-dropdown-item>
				</u-dropdown>
			</view>
		</view>
		<view style="display: flex;justify-content: space-between">
<!--			<scroll-view @scrolltolower="queryList" scroll-y class="storeScrollLeft">-->
<!--				<view class="cateBg">-->
<!--					<view class="myStoreCate" v-for="(item,index) in cateList" :class="{active:index===activeCateIndex,activeUp:index===activeCateIndex-1,activeDown:index===activeCateIndex+1}">-->
<!--					</view>-->
<!--				</view>-->
<!--				<view class="cateText">-->
<!--					<view class="myStoreCateText" v-for="(item,index) in cateList" @tap="myStoreCateChange(index)">-->
<!--						{{ item }}-->
<!--					</view>-->
<!--				</view>-->
<!--			</scroll-view>-->
			<scroll-view @scrolltolower="queryList" scroll-y class="storeScrollRight">
			<view style="padding:30rpx">
			  <view class="card" v-for="item in merchandiseList" style="position:relative">
				<view class="iconGroup"><view v-if="item.nftType==='2'" class="blindIcon centercover"></view></view>
				<view class="flex-row-start-center">
				  <view style="display: flex;width:100%;">
					<view @tap="gotoDetail(item)" style="width:160rpx;height:160rpx;border-radius: 20rpx;background-size:cover;margin-right:20rpx;background-position: center;"
						  :style="{backgroundImage:`url(${imgBaseUrl}${item.nftImgs}${imgSuffix})`}"></view>
					<view class="flex-col-around-start" style="width:calc( 100% - 220rpx );">
					  <view class="nowrapellipsis" style="width:100%;color:#F3F4F6;font-size:24rpx;">{{ item.nftName }}</view>
					  <view style="color:#AAAAAA;font-size:24rpx;">{{ item.nickName }}</view>
					  <view style="color:#F87171;font-size:28rpx;">¥ {{ cent2yuan(item.nftUnitprice) }}</view>
					</view>
				  </view>
				</view>
				<view style="width:100%;display: flex;justify-content: flex-end;margin-top: 20rpx;">
				  <view  v-for="ope in opeObj[item.nftStatus]" class="userMarker"  style="width: 30%;padding: 0px">
					<view></view>
					<view  @tap="updateStatus(ope,item)">{{ ope.label }}</view>
				  </view>
				</view>
			  </view>
			</view>
			</scroll-view>
		</view>
		<!-- 盲盒 -->
		<u-popup v-model="blindStoreShow" mode="bottom" style ="background-color: #2A2A34;" closeable width="100%" height="90%" border-radius="60"
			safe-area-inset-bottom>
			<blind-store :blindStoreSub="blindStoreSub" @issueChange="issueChange" bgColor="#18181c;"></blind-store>
		</u-popup>
		
		<u-popup v-model="issueShow" mode="center"  closeable width="640rpx" height="668rpx" border-radius="20"
			safe-area-inset-bottom>
			<view 
				style="background: #2A2A34;width: 100%;height:100%;box-sizing: border-box;">
				<view style="padding: 10rpx; 20rpx;font-size:18px;text-align:center;color:#FFFFFF;">调整发行数</view>
				<view  style="color: #D4D4D6 ;padding: 10rpx;font-size:13px;display: flex;justify-content: space-around;">
						<view style="text-align: center;width: 160rpx;" >
							<view style="margin: 0rpx;height:50%;color: #FFFFFF;">{{issueCount}}</view>
							<view style="margin: 0rpx;height:50%;color: #9CA3AF;">发行数量</view>
						</view>
						<!--
						<u-image style="width:10%;height: 10%;" src="@/static/common/img/mine/store/line.png"></u-image>
						-->
						<view style="text-align: center;width: 160rpx;" >
							<view style="margin: 0rpx;height:50%;color: #FFFFFF;">{{nftStockCount}}</view>
							<view style="margin: 0rpx;height:50%;color: #9CA3AF;">库存数量</view>
						</view>
				</view>
				
				<view style="margin:10rpx 40rpx;padding: 10rpx; 20rpx;font-size:18px;color:#9CA3AF;">调整类型</view>
				<u-radio-group  style="margin:2% 30%;" v-model="adjustType" :active-color="'#7A83D2'">
					<u-radio :name="'1'" ><text style="color: #F1F2F5;">增加</text></u-radio>
					<u-radio :name="'2'" ><text style="color: #F1F2F5;">减少</text></u-radio>
				</u-radio-group>
				
				<view style="margin:30rpx 40rpx;font-size:18px;text-align:left;color:#9CA3AF;">调整数量</view>
				<u-field class="publishField"  v-model="issueNum"  style="background:#35353F;margin:30rpx 40rpx;"  label-width="0"
					 placeholder="0" :border-bottom="false">
				</u-field>
		
				<view class="flex-around-center" style="width: 85%;margin:30rpx 40rpx;">
					<view style="background:#35353F;width: 242rpx;height: 80rpx;line-height: 80rpx;text-align: center;border-radius: 24rpx;"
						@tap="issueShow=false">
						取消
					</view>
					<view class="button" style="width: 242rpx;height: 80rpx;line-height: 80rpx;text-align: center;border-radius: 24rpx;"
						@tap="adjustIssue">
						确定
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="popupShow" mode="center"  closeable width="640rpx" height="468rpx" border-radius="20"  
			safe-area-inset-bottom>
			<view class="flex-colum-align-around"
				style="background: #2A2A34;width: 100%;height:100%;box-sizing: border-box;padding-bottom: 25rpx;">
				<view style="padding: 10rpx; 20rpx;font-size:18px;text-align:center;">{{reasonType==='6'?'拒绝原因':'下架原因'}}</view>
				<view style="color: #D4D4D6 ;padding: 10rpx; 40rpx;font-size:13px;">{{remarks}}</view>
				<view class="flex-around-center" style="width: 85%;">
					<view class="button" style="width: 242rpx;height: 80rpx;line-height: 80rpx;text-align: center;border-radius: 24rpx;"
						@tap="popupShow=false">
						知道了
					</view>
				</view>
			</view>
		</u-popup>
		
	</view>
</template>

<script>
	import MineApi from "@/common/apis/mine.js"
	import StarLevel from "@/components/merchandise/StarLevel"
	import FloatingPanel from "@/components/merchandise/FloatingPanel"
	import TabsInStore from "@/components/merchandise/TabsInStore"
	import BlindStore from "@/components/mine/BlindStore"
	import WorkFlow from "@/components/home/WorkFlow"
	import BlurWorkSmall from "@/components/home/BlurWorkSmall"
	import {cent2yuan} from '@/common/common.js'
	export default{
		data(){
			return{
				detail:{},
				merchandiseList:[],
				blindStoreList:[],
				blindStoreSub:[],
				blindStore:[],
				nftStock:[],
				issueCount:0,
				nftStockCount:0,
				popupShow:false,
				issueShow:false,
				dropDownShow:false,
				blindStoreShow:false,
				remarks:'',
				adjustType: '1',
				issueNum:0,
				reasonType:'',
				queryParams:{
					shopCode:"",
					offset:-1,
					pageSize:10,
					nftName:'',
					nftStatus:undefined
				},
				navList:[{
						name:'全部',value:undefined
					},{
						name:'上架',value:'2'
					},{
						name:'待审核',value:'1'
					},{
						name:'草稿',value:'0'
					},{
						name:'下架',value:'3'
					}/*,{
						name:'审核拒绝',value:'6'
					},{
						name:'违规下架',value:'7'
					}*/
				],
				opeObj:{
					'0':[{label:'调整发行量',value:'8'},{label:'编辑',value:'-1'},{label:'发布',value:'1'}],
					'1':[{label:'撤销',value:'0'}],
					'2':[{label:'下架',value:'3'}],
					'3':[{label:'编辑',value:'-1'},{label:'上架',value:'2'}],
					'6':[{label:'调整发行量',value:'8'},{label:'编辑',value:'-1'},{label:'发布',value:'1'},{label:'拒绝原因',value:'6'}],
					'7':[{label:'调整发行量',value:'8'},{label:'编辑',value:'-1'},{label:'发布',value:'1'},{label:'下架原因',value:'7'}]
				},
				shopStatusObj:{
					"0":"审核中",
					"1":"正常营业",
					"2":"关闭"
				},
				cateList:[
					'分类1',
					'分类2',
					'分类3',
					'分类测试',
					'还不能用'
				],
				sqlSortList: [{
						label: '审核拒绝',
						value: '6'
					},
					{
						label: '违规下架',
						value: '7'
					}
				],
				activeCateIndex:0,
				activeStatusIndex:0,
			}
		},
		components:{
			StarLevel,TabsInStore,WorkFlow,BlurWorkSmall,FloatingPanel,BlindStore
		},
		onLoad(option){
			MineApi.storeInfo().then(res=>{
				this.detail = res
				this.queryParams.shopCode = res.shopCode
				this.queryList()
			}).catch(err=>{
				this.$u.toast(err)
			})
		},
		methods:{
			cent2yuan,
			queryList(){
				this.queryParams.offset++
				MineApi.storeNft({
					params:this.queryParams
				}).then(res=>{
					this.merchandiseList = this.merchandiseList.concat(res.data)
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			close(){
				this.dropDownShow = false
			},
			open(){
				this.dropDownShow = true
			},
			querystoreNftList(nftStatus){
				this.queryParams.offset = -1;
				this.merchandiseList = [];
				this.queryParams.nftStatus = nftStatus;
				this.queryList();
				this.$refs.uDropdown.close();
			},
			gotoDetail(item){
				uni.navigateTo({
					url:`/pages/sys/merchandise/detail?nftCode=${item.nftCode}`
				})
			},
			tabChange(index,item){
				this.activeStatusIndex = index
				this.queryParams.offset = -1
				this.merchandiseList = []
				this.queryParams.nftStatus = item.value
				this.queryList()
			},
			keyWordChange(){
				this.queryParams.offset = -1
				this.merchandiseList = []
				this.queryList()
			},
			handleClear(){
				this.queryParams.offset = -1
				this.merchandiseList = []
				this.queryList()
			},
			myStoreCateChange(navIndex){
				this.activeCateIndex = navIndex
			},
			adjustIssue(){
				if(this.issueNum<=0){
					this.$u.toast("请输入调整发行量");
					return false;
				}
				if(this.nftStock.nftType==='1'){
					this.updateNftIssueCount();
				}
				if(this.blindStoreList.nftType==='2'){
					this.updateNftBoxIssueCount();
				}
			},
			updateNftBoxIssueCount(){
				let params={
					shopCode:this.blindStoreList.shopCode,
					nftCode:this.blindStoreList.nftCode,
					subNftCode:this.blindStore.nftSubCode,
					nftStock:this.blindStore.nftStock,
					nftStatus:this.blindStoreList.nftStatus,
					issueCountType:this.adjustType,
					issueCount:this.issueNum
				}
				MineApi.updateNftBoxIssueCount({
					params:params
				}).then(res=>{
					this.$u.toast("成功调整发行量!");
					this.issueShow=false;
					this.blindStoreShow=false;
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			updateNftIssueCount(){
				let params={
						shopCode:this.nftStock.shopCode,
						nftCode:this.nftStock.nftCode,
						nftStatus:this.nftStock.nftStatus,
						issueCountType:this.adjustType,
						issueCount:this.issueNum
				}
				MineApi.updateNftIssueCount({
					params:params
				}).then(res=>{
					this.$u.toast("成功调整发行量!");
					this.issueShow=false;
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			updateStatus(ope,item){
				let status = this.detail.shopStatus
				if(status!=="1"){
					return this.$u.toast("您的店铺当前为"+this.shopStatusObj[status]+"状态，不能操作尚品")
				}
				if(ope.value==="6"){
					
					if(item.nftType==='2'){
						this.blindStoreShow=true;
						return false;
					}
					this.reasonType=ope.value;
					this.queryShopNftRemark();
					return false;
				}
				if(ope.value==="7"){
					if(item.nftType==='2'){
						this.blindStoreShow=true;
						return false;
					}
					
					this.reasonType=ope.value;
					this.queryShopNftRemark();
					return false;
				}
				if(ope.value==="8"){
					if(item.nftType==='2'){
						this.queryBlindStore(item.shopCode,item.nftCode,item.nftStatus);
						this.blindStoreShow=true;
						return false;
					}
					this.queryShopNftStock(item.shopCode,item.nftCode,item.nftStatus);
					return false;
				}
				if(ope.value==="-1"){
					uni.navigateTo({
						url: `/pages/sys/mine/store/publishNormal?shopCode=${this.detail.shopCode}&nftCode=${item.nftCode}&nftType=${item.nftType}&ope=edit`
					})
					return
				}
				MineApi.updateNftStatus({
					params:{
						userCode:this.detail.userCode,
						nftCode:item.nftCode,
						nftType:item.nftType,
						nftStatus: ope.value
					}
				}).then(res=>{
					this.$u.toast(ope.label+'成功')
					this.queryParams.offset = -1
					this.merchandiseList = []
					this.queryList()
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			queryShopNftRemark(){
				let params={
					shopCode:item.shopCode,
					nftCode:item.nftCode
				}
				MineApi.shopNftRemark({
					params:params
				}).then(res=>{
					this.remarks = res.examineRemarks;
					this.popupShow=true;
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			queryShopNftStock(shopCode,nftCode,nftStatus){
				let params={
					shopCode:shopCode,
					nftCode:nftCode,
					nftStatus:nftStatus
				}
				MineApi.shopNftStock({
					params:params
				}).then(res=>{
					this.issueCount= res.issueCount;
					this.nftStockCount = res.nftStock;
					this.nftStock =res;
				}).catch(err=>{
					this.$u.toast(err)
				})
				this.issueShow=true;
			},
			queryBlindStore(shopCode,nftCode,nftStatus){
				let params={
					shopCode:shopCode,
					nftCode:nftCode,
					nftStatus:nftStatus
				}
				MineApi.shopNftBoxStock({
					params:params
				}).then(res=>{
					this.blindStoreSub=res.sub;
					this.blindStoreList =res;
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			customGoBack(){
				uni.switchTab({
					url:"/pages/sys/mine/index"
				})
			},
			issueChange(blindStore){
				this.issueShow=true;
				this.issueCount= blindStore.issueCount;
				this.nftStockCount = blindStore.nftStock;
				this.blindStore=blindStore;
				console.info(blindStore);
			},
		    gotoArtistMain(){
				uni.navigateTo({
					url:`/pages/sys/merchandise/artistMain?userCode=${this.detail.userCode}`
				})
			},
			gotoMySold(){
				uni.navigateTo({
					url: `/pages/sys/mine/store/mySold?shopCode=${this.detail.shopCode}&userCode=${this.detail.userCode}`
				})
			},
			gotoPublishNormal(){
				let status = this.detail.shopStatus
				if(status!=="1"){
					return this.$u.toast("您的店铺当前为"+this.shopStatusObj[status]+"状态，不能发布尚品")
				}
				uni.navigateTo({
					url: `/pages/sys/mine/store/publishNormal?shopCode=${this.detail.shopCode}&ope=create`
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
	
	.u-dropdown__content{
		height: 120rpx;
	}
	
	.realSearch {
		/deep/ .u-content {
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

	.storeBrief{
		width:100%;
		height:230rpx;
		background-image:linear-gradient(to bottom right, rgb(44,44,48), rgb(24,24,28), rgb(44,44,48));
		border-radius: 24rpx;
		border: 2rpx solid #444;
		overflow:scroll;
		padding: 30rpx;
	}

	.sold, .publish{
		width:50rpx;
		height:50rpx;
		background-size: 100% 100%;
	}
	.sold{
		background-image: url("@/static/common/img/mine/store/sold.png");
		margin-right:20rpx;
	}
	.publish{
		background-image: url("@/static/common/img/mine/store/publish.png");
	}

	.storeScrollLeft{
		width:180rpx;
		height: calc( 100vh - 460rpx );
		.cateBg{
			position: absolute;
			z-index: 5;
			width:100%;
			min-height: calc( 100vh - 460rpx );
			background-image: linear-gradient(45deg, rgb(24,24,28), rgb(54,54,58), rgb(24,24,38));
			.myStoreCate{
				position:relative;
				height:70rpx;
				background-color: #18181c;
				mix-blend-mode:lighten;
				&.active{
					mix-blend-mode:darken;
				}
				&.active::before,&.active::after {
				  content: "";
				  display: block;
				  height: 30rpx;
				  width: 30rpx;
				  position: absolute;
				  right: 0;
				}
				&.active::before{
					top:-30rpx;
					background: radial-gradient(
						30rpx at  0 0,
						transparent 30rpx,
						#18181c 30rpx
					);
				}
				&.active::after{
					bottom:-30rpx;
					background: radial-gradient(
						30rpx at  0 30rpx,
						transparent 30rpx,
						#18181c 30rpx
					);
				}
			}
		}
		.cateText{
			position: relative;
			z-index: 6;
			.myStoreCateText{
				color:#D8D8D8;
				font-size: 24rpx;
				text-align: center;
				height:70rpx;
				padding-top:20rpx;
			}
		}

	}
	.storeScrollRight{
		width:calc( 100vw );
		//width:calc( 100vw - 180rpx );
		height: calc( 100vh - 460rpx );
	}


</style>
