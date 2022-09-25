<template>
	<view class="wrap">
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			关于我们<view></view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view style="height:160rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view style="height:100rpx;"></view>
		<!-- #endif -->
		<view style="padding:0 30rpx">
			<view>
				<view style="background-color:#35353F;border-radius:88rpx;width:176rpx;height:176rpx;margin:60rpx auto;overflow:hidden;">
						<u-image width="100%" height="100%" src="@/static/common/img/login/aboutus.png"></u-image>
				</view>
			</view>
			<view class="card" v-for="item in aboutUsList" style="color:#F3F4F6">
				<view style="display: flex;justify-content: space-between;">
					<view>{{ item.title }}</view>
					<view v-if="item.type==='0'"><u-icon name="arrow-right" @tap="showProtocol(item.agreement)"></u-icon></view>
					<view v-else-if="item.type==='1'">{{ item.value }}</view>
				</view>
			</view>
			
			<u-modal class="protocolModal" v-model="protocolShow" :titleStyle="titleStyle" :show-title="true" :title="protocolTitle">
				<scroll-view scroll-y="true" style="height:500rpx;">
					<view style="padding:0 30rpx 30rpx;">
						{{ protocolContent }}
					</view>
				</scroll-view>
			</u-modal>
		</view>
	</view>
</template>

<script>
	import LoginApi from "@/common/apis/login.js"
	import MineApi from "@/common/apis/mine.js"
	export default{
		data(){
			return{
				protocolShow: false,
				agreeProtocol: false,
				protocolObj:{
					title:{userAgreement:'用户协议',privacyAgreement:'隐私政策'},
					content:{}
				},
				protocolTitle:'',
				protocolContent: '',
				titleStyle:{marginBottom:'30rpx'},
				aboutUsList:[
					{type:'0',title:'用户协议',agreement:'userAgreement'},
					{type:'0',title:'人脸识别采集协议',agreement:'lifeFaceAgreement'},
					{type:'0',title:'隐私政策',agreement:'privacyAgreement'},
					{type:'1',title:'版权所有',value:'重庆辰宇世嘉数字科技有限公司'},
					{type:'1',title:'技术',value:'重庆辰宇世嘉数字科技有限公司'},
					{type:'1',title:'区块链',value:'海峡链'},
				]
			}
		},
		onLoad(){
			MineApi.aboutUS().then(res=>{
				
			});
			
			LoginApi.agreement().then(res => {
				this.protocolObj.content = res
			}).catch(err => {
				this.$u.toast(err)
			})
		},
		methods:{
			showProtocol(key) {
				this.protocolTitle = this.protocolObj.title[key]
				this.protocolContent = this.protocolObj.content[key]
				this.protocolShow = true
			},
			customGoBack(){
				uni.switchTab({
					url:"/pages/sys/mine/index"
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #18181c;
	}
	.protocolModal {
		/deep/ .u-model {
			background-color: #2A2A34 !important;
		}
	}
	
</style>
<style lang="scss" scoped>
	@import "@/common/css/index.scss";
	
</style>