<template>
	<view class="wrap">
		<headnavbar title="我的" :haveBack="false">
			<template slot="left">
				<floating-panel style="width:120rpx;" :toggleSelected="false" :list="['退出']" :defaultIndex="0"
					@cateChange="cateChange">
					<view class="setting">
						<view></view>
					</view>
				</floating-panel>
			</template>
			<template slot="right">
				<view @tap="gotoIM" class="notice">
					<view>
						<view></view>{{ unread }}
					</view>
				</view>
			</template>
		</headnavbar>
		<view>
			<scroll-view scroll-y :style="{height:scrollViewHeight}">
				<view style="padding:30rpx;padding-top:30rpx">
					<view class="flex-row-between-center" style="position:relative;width:100%;">
						<view style="position:relative;width:176rpx;height:176rpx;">
							<view class="centercover"
								style="width:100%;height:100%;box-sizing: border-box;border:4rpx solid #9CA3AF;"
								:style="{backgroundImage:`url(${imgBaseUrl}${brief.header}${imgSuffix})`}"></view>
							<!-- <view class="cameraEntry"></view> -->
							<!-- @tap="changeAvatar" -->
						</view>
						<view
							style="width:calc( 100% - 200rpx );display: flex;flex-direction: column;justify-content: space-around;">
							<view v-if="!iflogin" style="font-size: 40rpx;">
								<span @tap="gotoLogin">注册/登录</span>
							</view>
							<view v-else>
								<view style="font-size: 40rpx;word-wrap: break-word;word-break: break-all;">
									{{ brief.nickName }}
									<span class="brokerLabel">{{ brokerLevelOptions[brokerInfo.level] }}</span>
								</view>
								<view style="width:calc( 100vw - 300rpx );font-size:24rpx;color:#9CA3AF;">
									<view class="nowrapellipsis">ID：{{ brief.userCode }}</view>
									<view class="nowrapellipsis">区块链地址：{{ brief.hashAddress }}</view>
								</view>
							</view>
						</view>
					</view>
					<view v-if="brokerInfo.level==='1'" @tap="gotoBrokerUpdate" class="centercover brokerUpdate"></view>
					<view style="display:flex;justify-content: space-around;margin-top:20rpx">
						<view v-for="(item,index) in dataOptions" @tap="gotoItem(item)"
							style="display:flex;flex-direction: column;align-items: center;">
							<view style="font-size:36rpx;color:white;font-weight:bold">
								{{ brief[item.key]?brief[item.key]:0 }}</view>
							<view style="font-size:24rpx;color:#9CA3AF">{{ item.label }}</view>
						</view>
					</view>
					<view class="button" style="margin:40rpx 0" @click="changeUserInfo">编辑资料</view>
					<view class="card">
						<view style="font-size:32rpx;color:white">我的交易</view>
						<view class="flex-row-around-center" style="margin-top:20rpx">
							<view v-for="(item,index) in transOptions" @tap="gotoItem(item)"
								style="display:flex;flex-direction: column;align-items: center;">
								<view :class="[item.cls]" style="width:106rpx;height:106rpx;background-size:100% 100%;">
								</view>
								<view style="font-size:24rpx;color:#F3F4F6;margin-top:14rpx;">{{ item.label }}</view>
							</view>
						</view>
					</view>
					<view class="card">
						<view v-for="(entry,index) in entryOptions" @tap="gotoItem(entry)">
							<view style="display: flex;justify-content: space-between;margin-bottom:40rpx;"
								:style="{marginBottom:entryOptions.length-1===index?'10rpx':'40rpx'}">
								<view style="display: flex;align-items: center;font-size:28rpx;color:#F3F4F6">
									<view :class="[entry.cls]"
										style="width:48rpx;height:48rpx;background-size:100% 100%;margin-right:30rpx;">
									</view>
									<view>{{ entry.label }}</view>
								</view>
								<u-icon name="arrow-right"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<u-popup v-model="modalShow" mode="center" width="640rpx" height="468rpx" border-radius="20"
			safe-area-inset-bottom>
			<view class="flex-colum-align-around"
				style="background: #2A2A34;width: 100%;height:100%;box-sizing: border-box;padding-bottom: 25rpx;">
				<view>暂未实名认证,不能申请开店,请先完成实名认证</view>
				<view class="flex-around-center" style="width: 85%;">
					<view
						style="width: 242rpx;height: 80rpx;text-align: center;line-height: 80rpx;border-radius: 24rpx;background: #35353F;"
						@tap="modalShow=false">
						取消
					</view>
					<view class="button"
						style="width: 242rpx;height: 80rpx;line-height: 80rpx;text-align: center;border-radius: 24rpx;"
						@tap="confirm">
						实名认证
					</view>
				</view>
			</view>
		</u-popup>

		<u-modal class="guestModal" @confirm="gotoLogin" v-model="guestModalShow" :show-title="true" title="游客提示"
			:show-cancel-button="true" confirm-color="#fff">
			<view style="text-align: center;padding:40rpx">登陆后可使用全部功能，是否注册/登录？</view>
		</u-modal>
		<u-modal class="likenstarModal" v-model="likenstarShow"
			:titleStyle="{paddingBottom:'40rpx',fontSize:'40rpx'}" :show-title="true" title="获赞与收藏"
			:show-confirm-button="false">
			<view class="flex-row-start-center">
				<view class="noteIcon"></view>当前发布笔记数<view class="num">{{ likenstar.notes }}</view>
			</view>
			<view class="flex-row-start-center">
				<view class="likeIcon"></view>当前获得点赞数<view class="num">{{ likenstar.stars }}</view>
			</view>
			<view class="flex-row-start-center">
				<view class="starIcon"></view>当前获得收藏数<view class="num">{{ likenstar.storeups }}</view>
			</view>
			<view class="button"
				style="width:240rpx;height:80rpx;line-height:80rpx;border-radius: 20rpx;margin:50rpx auto"
				@tap="likenstarShow = false">我知道了</view>
		</u-modal>
	</view>
</template>

<script>
	import headnavbar from "@/components/headnavbar/index.vue"
	import BrokerApi from "@/common/apis/broker.js"
	import MineApi from "@/common/apis/mine.js"
	import storeApi from "@/common/apis/store.js"
	import jlCatche, {
		KEY_OPENID,
		KEY_TOKEN
	} from "@/common/utils/jlCatche.js"
	import FloatingPanel from "@/components/merchandise/FloatingPanel"
	import jlConfig from '@/common/utils/jlConfig'
	import LoginApi from "@/common/apis/login";
	import {
		relogin, calScrollHeight
	} from "@/common/common";
	import IMApi from "@/common/apis/im.js"
	import {
		MyIM
	} from "@/common/im/im.js"
	export default {
		data() {
			return {
				iflogin: false,
				haveAuth: false,
				guestModalShow: false,
				likenstarShow: false,
				havePwd: '',
				idcardNo: '',
				idcardName: '',
				modalShow: false,
				content: '暂未实名认证,不能申请开店,请先完成实名认证',
				brief: {},
				likenstar: {},
				dataOptions: [{
						label: '关注',
						key: 'attention',
						url: '/mine/relationship?mine=1&relation=followings'
					},
					{
						label: '粉丝',
						key: "fans",
						url: '/mine/relationship?mine=1&relation=followers'
					},
					{
						label: '获赞与收藏',
						key: "storeup",
						url: 'storeup'
					},
					{
						label: '帖子',
						key: "note",
						url: ''
					},
					{
						label: '历史浏览',
						key: "browsehistory",
						url: '/mine/browseHistory'
					},
				],
				transOptions: [{
						label: "我买到的",
						cls: "transicon0",
						url: '/order/list'
					},
					// {label:"转赠订单",cls:"transicon1"},
					// {label:"我可转赠的",cls:"transicon2"},
					{
						label: "我的团队",
						cls: "transicon4",
						url: '/mine/team/index'
					},
					{
						label: "邀请有礼",
						cls: "transicon3",
						url: '/mine/doInvite'
					}
				],
				entryOptions:[],
				defaultEntryOptions: [{
						label: '资金管理',
						cls: 'm0',
						url: '/mine/fund/index'
					},
					{
						label: '我的收藏',
						cls: 'm1',
						url: '/mine/transaction/myStars'
					},
					{
						label: '我的尚品',
						cls: 'm2',
						url: '/mine/transaction/myPurchases'
					},
					{
						label: '我的小店',
						cls: 'm3',
						url: '/mine/store/myStore'
					},
					{
						label: '实名认证',
						cls: 'm4',
						url: '/mine/auth/authenticate'
					},
					{
						label:'意见反馈',
						cls: 'm5',
						url: '/mine/suggestion',
					},
					{
						label: '联系客服',
						cls: 'm6',
						url: '/mine/consumerCare'
					},
					{
						label: '关于我们',
						cls: 'm7',
						url: '/mine/aboutUs'
					},
				],
				brokerInfo: {},
				brokerLevelOptions: {
					'1': '初级经济人',
					'2': '高级经济人'
				},
				unread: 0
			}
		},
		components: {
			FloatingPanel,headnavbar
		},
		onLoad(){
			this.scrollViewHeight = calScrollHeight(100)
		},
		onShow() {
			this.havePwd = '';     
			this.entryOptions = this.defaultEntryOptions.concat()
			this.brokerInfo = {}
			LoginApi.ifrealname().then(res => {
				this.iflogin = Number(res.iflogin) === 1
				this.ifrealname = Number(res.ifrealname) === 1
				if (!this.iflogin){
					this.brief = {}
					return
				}
				
				MineApi.content({}).then(res => {
					this.brief = res
				}).catch(err => {
					this.brief = {}
					this.$u.toast(err)
				})
			
				MineApi.havePwd({}).then(res => {
					console.log('在这里执行了havePwd');
					this.havePwd = res.havePwd;
					this.entryOptions = this.defaultEntryOptions.concat([{
						label: this.havePwd === '0' ? '设置密码' : '修改密码',
						cls: 'm8',
						url: '/mine/updatePw/verifySnsCode?havePwd=' + this.havePwd
					}])
				}).catch(err => {
					this.$u.toast(err)
				})
				
				MineApi.have({}).then(res => {
					console.log('在这里执行了have');
					this.haveAuth = res.haveAuth;
					if (this.haveAuth === '1') {
						this.idcardNo = res.idcardNo;
						this.idcardName = res.idcardName;
					} else {
						this.idcardNo = '';
						this.idcardName = '';
					}
				}).catch(err => {
					this.$u.toast(err)
				})
				
				BrokerApi.brokerInfo().then(res => {
					this.brokerInfo = res
				}).catch(err => {
					this.$u.toast(err)
				})
				
				IMApi.getUnreadMsgNum().then(res => {
					this.unread = res.unread
				}).catch(err => {
					this.$u.toast(err)
				})
			}).catch(err => {
				this.$u.toast(err)
			})

		},
		methods: {
			changeAvatar() {
				uni.chooseImage({
					count: 1,
					success: tempFilePaths => {
						uni.uploadFile({
							url: `${jlConfig.apiUrl}/api/client/file/v1/upload`,
							file: tempFilePaths.tempFiles[0],
							success: res => {
								// debugger
							}
						})
					}
				})
			},
			cateChange(index) {
				// if(index===0){
				// 	uni.navigateTo({
				// 		url:"/pages/sys/mine/setting/index"
				// 	})
				// }else if(index===1){
					jlCatche.setStorage(KEY_TOKEN, "");
					jlCatche.setStorage("userInfo", "");
					MyIM.logout()
					uni.$emit('followContentRefresh')
					uni.navigateTo({
						url: "/pages/sys/login/index"
					})
				// }
			},
			changeUserInfo() {
				if (!this.iflogin) {
					this.guestModalShow = true
					return
				}
				uni.navigateTo({
					url: '/pages/sys/mine/userInfo/myBaseOptions'
				})
			},
			gotoLogin() {
				uni.navigateTo({
					url: "/pages/sys/login/index"
				})
			},
			showLikenStar() {
				MineApi.mylikenstar().then(res => {
					this.likenstar = res
					this.likenstarShow = true
				}).catch(err => {
					this.$u.toast(err);
				})
			},
			queryIsAuditing() {
				return new Promise((resolve, reject) => {
					storeApi.myStoreAuditing().then(res => {
						resolve(res.approve)
					}).catch(err => {
						resolve('0')
					})
				})
			},
			gotoItem(item) {
				if (!this.iflogin) {
					this.guestModalShow = true
					return
				}
				if (item.url.indexOf('myStore') !== -1) {
					if (this.haveAuth === '0') {
						this.modalShow = true;
						return;
					}

					this.queryIsAuditing().then(res => {
						if (res === '2') {
							uni.navigateTo({
								url: "/pages/sys" + item.url
							})
						} else {
							uni.navigateTo({
								url: `/pages/sys/mine/store/apply?applyStatus=${res}&idcardNo=${this.idcardNo}&idcardName=${this.idcardName}`
							})
						}
					})
					return
				} else if (item.url.indexOf('fund') !== -1) {
					if (!this.ifrealname) {
						return this.$u.toast('请先进行实名认证')
					}
				} else if (item.key === "storeup") {
					this.showLikenStar()
					return
				} else if (item.key === 'note') {
					uni.navigateTo({
						url: `/pages/sys/merchandise/artistMain?userCode=${this.brief.userCode}`
					})
					return
				} 
				uni.navigateTo({
					url: "/pages/sys" + item.url
				})
			},
			confirm() {
				uni.navigateTo({
					url: '/pages/sys/mine/auth/authenticate'
				})
			},
			gotoIM() {
				if (!this.iflogin) {
					this.guestModalShow = true
					return
				}
				let query = ''
				if (Number(this.brief.haveShop) === 1) {
					query = `?haveShop=1&shopCode=${this.brief.shopCode}`
				}
				let userCode = jlCatche.getCacheUserInfo('userCode')
				MyIM.getInstance(userCode).checkLogin().then(() => {
					uni.navigateTo({
						url: `/pages/im/TUI-Conversation/conversation` + query
					})
				})
			},
			gotoBrokerUpdate() {
				if (!this.iflogin) {
					this.guestModalShow = true
					return
				}
				uni.navigateTo({
					url: '/pages/sys/mine/broker/update'
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
	@import url('@/common/css/index.scss');

	.guestModal {
		/deep/ .u-model {
			background-color: #2A2A34 !important;
		}
	}

	.setting {
		// background-color:#2A2A34;
		border-radius: 20rpx;

		view {
			width: 36rpx;
			height: 32rpx;
			margin: 20rpx;
			background-size: 100% 100%;
			background-image: url('@/static/common/img/mine/index/setting.png');
			// border:2rpx dotted rgba(255,255,255,0.3);
		}
	}

	.notice {
		background-color: #2A2A34;
		border-radius: 20rpx;

		&>view {
			margin: 12rpx 20rpx;
			display: flex;
			align-items: center;
		}

		&>view>view {
			width: 44rpx;
			height: 44rpx;
			background-size: 100% 100%;
			background-image: url('@/static/common/img/mine/index/notice.png');
			// border:2rpx dotted rgba(255,255,255,0.3);
			margin-right: 10rpx;
		}
	}

	.cameraEntry {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 60rpx;
		height: 60rpx;
		background-image: url("@/static/common/img/mine/index/came.png");
		background-size: 100% 100%;
	}

	.transicon0 {
		background-image: url('@/static/common/img/mine/index/t0.png')
	}

	.transicon1 {
		background-image: url('@/static/common/img/mine/index/t1.png')
	}

	.transicon2 {
		background-image: url('@/static/common/img/mine/index/t2.png')
	}

	.transicon3 {
		background-image: url('@/static/common/img/mine/index/t3.png')
	}

	.transicon4 {
		background-image: url('@/static/common/img/mine/index/t4.png')
	}

	.m0 {
		background-image: url('@/static/common/img/mine/index/m0.png')
	}

	.m1 {
		background-image: url('@/static/common/img/mine/index/m1.png')
	}

	.m2 {
		background-image: url('@/static/common/img/mine/index/m2.png')
	}

	.m3 {
		background-image: url('@/static/common/img/mine/index/m3.png')
	}

	.m4 {
		background-image: url('@/static/common/img/mine/index/m4.png')
	}

	.m5 {
		background-image: url('@/static/common/img/mine/index/m5.png')
	}

	.m6 {
		background-image: url('@/static/common/img/mine/index/m6.png')
	}

	.m7 {
		background-image: url('@/static/common/img/mine/index/m7.png')
	}

	.m8 {
		background-image: url('@/static/common/img/mine/index/m8.png')
	}


	.noteIcon,
	.starIcon,
	.likeIcon {
		width: 76rpx;
		height: 76rpx;
		background-size: 100% 100%;
		margin: 20rpx 30rpx 20rpx 80rpx;
	}

	.noteIcon {
		background-image: url('@/static/common/img/mine/data/mynote.png');
	}

	.starIcon {
		background-image: url('@/static/common/img/mine/data/mystar.png');
	}

	.likeIcon {
		background-image: url('@/static/common/img/mine/data/mylike.png');
	}

	.brokerUpdate {
		margin-top: 30rpx;
		height: 120rpx;
		border-radius: 0rpx;
		background-image: url("@/static/common/img/mine/broker/brokerUpdate.png");
	}
</style>
