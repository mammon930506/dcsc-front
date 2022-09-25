<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			{{ procedure==='form'?(ope==="create"?"发布尚品":"编辑尚品"):'选择尚品' }}
			<view></view>
		</view>
		<view v-show="procedure==='form'">
			<!--  -->
			<scroll-view scroll-y :style="{height:scrollViewHeight}">
				<view style="padding:0 40rpx;padding-bottom:40rpx;">
					<view class="attrLabel">尚品类型</view>
					<view style="width:360rpx;">
						<u-subsection :current="isBlind?1:0" @change="isBlindChange" :list="nftTypeList"
							buttonColor="#7A83D2" bgColor="#35353F" active-color="white" inactive-color="#9CA3AF">
						</u-subsection>
						</u-subsection>
					</view>
					<view class="attrLabel">尚品名称</view>
					<u-field class="publishField" label-width="0" v-model.trim="form.nftName" placeholder="尚品名称"
						:border-bottom="false"></u-field>
					<view class="attrLabel">尚品分类</view>
					<u-field @tap="classifyShow=true" right-icon="arrow-right" :disabled="true" class="publishField"
						label-width="0" v-model.trim="form.classifyName" placeholder="请选择" :border-bottom="false">
					</u-field>
					<view style="display:flex;justify-content:space-between">
						<view style="width:320rpx;">
							<view class="attrLabel">售卖价格</view>
							<u-field class="publishField" label-width="0" v-model.trim="form.nftUnitpriceYuan"
								placeholder="0" :border-bottom="false">
								<view slot="icon">¥</view>
							</u-field>
						</view>
						<view style="width:320rpx;">
							<view class="attrLabel">发行数量</view>
							<u-field class="publishField" :disabled="isBlind?true:false" label-width="0"
								v-model.trim="form.issueCount" placeholder="0" :border-bottom="false">
								<view slot="right">件</view>
							</u-field>
						</view>
					</view>
					<view class="attrLabel">售卖时间</view>
					<u-radio-group class="publishRadio" v-model="isTiming" :active-color="'#7A83D2'">
						<u-radio :name="'0'">立刻售卖</u-radio>
						<u-radio :disabled="true" :name="'1'">定时售卖</u-radio>
					</u-radio-group>
					<view class="attrLabel" @click="isTradeMsg">是否定向交易<u-icon name="info-circle"></u-icon>
					</view>
					<u-modal class="likenstarModal" v-model="likenstarShow"
						:titleStyle="{paddingBottom:'40rpx',fontSize:'40rpx'}" :show-title="true"
						:show-confirm-button="false">
						<view style="margin: 0 30rpx;font-size: 28rpx;"><span
								style="font-weight:bold;">定向交易：</span>公开发行的尚品,页面可以展示,任何用户都可以购买收藏。</view>
						<view style="margin: 0 30rpx;font-size: 28rpx;"><span
								style="font-weight:bold;">非定向交易：</span>非公开发行的尚品,页面不显示,给指定用户购买收藏。</view>
						<view class="button"
							style="width:240rpx;height:80rpx;line-height:80rpx;border-radius: 20rpx;margin:50rpx auto"
							@tap="likenstarShow = false">我知道了</view>
					</u-modal>
					<u-radio-group class="publishRadio" v-model="form.nftPrivate" :active-color="'#7A83D2'">
						<u-radio :name="'0'">非定向</u-radio>
						<u-radio :name="'1'">定向</u-radio>
					</u-radio-group>
					<view class="attrLabel">尚品图片</view>
					<u-upload class="publishUpload" :file-list="imgList" :auto-upload="true" :preview-full-image="true"
						:multiple="false" @on-choose-complete="imgUploadStart" @on-success="imgChosen" :max-count="1"
						@on-remove="imgRemove" :action="`${apiUrl}/api/client/file/v1/upload`"
						max-size="10*1024*1024" upload-text="大小限制10M"></u-upload>
					<view v-if="isBlind" class="attrLabel">盲盒尚品</view>
					<view v-if="isBlind" class="card">
						<view @tap="gotoAddBlind" class="flex-row-between-center">
							<view>
								<view v-if="selectedBlindList.length" style="font-size:24rpx;color:#6A6A71">已添加尚品</view>
								<view v-else></view>
							</view>
							<view class="flex-row-end-center">
								<view class="blind-add"></view>
								<view>去添加</view>
							</view>
						</view>
						<view>
							<uni-swipe-action>
								<uni-swipe-action-item v-for="(chosen,chosenIndex) in selectedBlindList"
									:right-options="blindOptions" @click="blindDel(chosen,chosenIndex)"
									:show="chosen.delOpen" style="margin:20rpx 0">
									<blind-brief :chosen="chosen" :chosenIndex="chosenIndex"
										@showChosenDel="showChosenDel" @handleBlindIssueCount="handleBlindIssueCount">
									</blind-brief>
								</uni-swipe-action-item>
							</uni-swipe-action>
						</view>
					</view>
					<view class="attrLabel">作品介绍</view>
					<u-field class="publishField" label-width="0" v-model.trim="form.description" placeholder="作品介绍"
						:border-bottom="false" type="textarea"></u-field>
					<view class="attrLabel">购买须知</view>
					<u-field class="publishField" label-width="0" v-model.trim="form.instructions" placeholder="购买须知"
						:border-bottom="false" type="textarea"></u-field>
				</view>
			</scroll-view>
		</view>
		<!-- <view style="height:230rpx;"></view> -->
		<view v-show="procedure==='form'"
			style="background-color:#2A2A34;height:200rpx;border-top:2rpx solid #59595D;padding:30rpx;position:fixed;width:100%;bottom:0;left:0">
			<view style="display:flex;justify-content: space-around">
				<view @tap="publishNormal('0')"
					style="width:130rpx;display: flex;flex-direction: column;align-items: center;padding-top:20rpx;">
					<view class="sketchIcon"></view>
					<view style="color:#7A83D2;font-size: 24rpx;line-height:50rpx;">保存草稿</view>
				</view>
				<view @tap="publishNormal('1')" class="button" style="width:448rpx;height:128rpx;border-radius:40rpx;">
					发布尚品</view>
			</view>
		</view>
		<view v-if="procedure==='addBlind'">
			<view class="horizonSelectGroup flex-row-start-center">
				<horizon-select ref="classifyCode" @showPanel="showPanel('classifyCode')" @doQuery="changeClassifyCode"
					:optionList="classifyTypeListWithAll"></horizon-select>
				<horizon-select ref="sqlSort" @showPanel="showPanel('sqlSort')" @doQuery="changeSqlSort"
					:optionList="sqlSortList"></horizon-select>
			</view>
			<view>
				<scroll-view scroll-y :style="{height:scrollViewHeightAddBlind}" @scrolltolower="queryChooseList">
					<view style="padding:0 40rpx;">
						<view v-for="blind in chooseList" style="padding-bottom:10rpx;">
							<view class="flex-row-between-center"
								style="position:relative;padding:30rpx;border:1rpx solid #2A2A34;border-radius: 28rpx;">
								<view :style="{backgroundImage:`url(${imgBaseUrl}${blind.nftImgs}${imgSuffix})`}"
									class="centercover" style="width:192rpx;height:192rpx;border-radius:16rpx;"></view>
								<view class="flex-col-around-start"
									style="width:calc( 100% - 210rpx );height:192rpx;word-wrap: break-word;word-break: break-all;">
									<view style="color:#F1F2F5;font-size: 24rpx;">{{ blind.nftName }}</view>
									<view style="color:#9CA3AF;font-size: 20rpx;">{{ blind.classifyName }}</view>
									<view style="color:#9CA3AF;font-size: 20rpx;">尚品编码：{{ blind.nftCode }}</view>
									<view style="color:#F1F2F5;font-size: 24rpx;">¥ {{ cent2yuan(blind.nftUnitprice) }}
									</view>
								</view>
								<view class="addBlindBtn" @tap="addToSelected(blind)"
									:style="{opacity:blind.isAdded?0.3:1}"></view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="confirmAddWrap">
				<view class="flex-row-between-center" style="margin-bottom:32rpx;color:#F3F4F6">
					<view>所选尚品：{{ selectedBlindList.length }} 件</view>
					<view v-if="selectedBlindList.length" @tap="toggleShowAllSelected" style="color:#7A83D2">
						查看所选全部尚品
						<u-icon style="margin-left:10rpx" :name="showAllSelected?'arrow-down':'arrow-up'"></u-icon>
					</view>
					<view v-else></view>
				</view>
				<view class="selectedWrap flex-row-start-center" :style="{height:selectedBlindHeight}"
					style="overflow:hidden;flex-wrap: wrap;">
					<view v-for="(selected,selectedIndex) in selectedBlindList"
						:style="{backgroundImage:`url(${imgBaseUrl}${selected.nftImgs}${imgSuffix})`}"
						class="centercover"
						style="position:relative;width:154rpx;height:154rpx;border-radius:20rpx;margin:15rpx 8rpx;">
						<view @tap="delSelectedBlind(selected,selectedIndex)" class="delSelectedBlind"></view>
					</view>
				</view>
				<view @tap="gotoPublishForm" class="button" style="margin-top:10rpx;">确定</view>
			</view>
		</view>
		<u-select class="publishPicker" v-model="classifyShow" mode="single-column" :list="classifyTypeList"
			@confirm="classifyConfirm"></u-select>
	</view>
</template>

<script>
	import MineApi from "@/common/apis/mine.js"
	import MerchandiseApi from "@/common/apis/merchandise.js"
	import StoreApi from "@/common/apis/store.js"
	import jlConfig from '@/common/utils/jlConfig'
	import HorizonSelect from '@/components/mine/HorizonSelect'
	import BlindBrief from '@/components/mine/BlindBrief'
	import {
		cent2yuan,
		calScrollHeight
	} from '@/common/common.js'
	export default {
		data() {
			return {
				procedure: 'form',
				ope: 'create',
				likenstarShow: false,
				isBlind: 0,
				imgList: [],
				imgUploading: false,
				form: {
					nftPrivate: '0',
					instructions: '1、依据我国法律要求，特定条件下的数字尚品的二次交易不支持任何形式的变相炒作,我们坚决反对数字尚品炒作、场外交易、欺诈,或以任何其他非法、侵权方式使用的违法违规行为，请大家注意甄别上述涉嫌网络欺诈的行为及其相关风险。 \r\n2、数字尚品为虚拟数字尚品,购买前请完成实名认证,未满18周岁人群禁止购买。\r\n3、本尚品一经出售不支持七天无理由退换货。',
					shopCode: ''
				},
				nftTypeList: [{
					name: '普通尚品',
					value: '1'
				}, {
					name: '盲盒',
					value: '2'
				}],
				isTiming: '0',
				classifyShow: false,
				classifyTypeList: [],
				refList: ['classifyCode', 'sqlSort'],
				classifyTypeListWithAll: [],
				sqlSortList: [{
						label: '综合排序',
						value: undefined
					},
					{
						label: '新品优先',
						value: 'updateDate,desc'
					},
					{
						label: '价格从高到低',
						value: 'nftUnitprice,desc'
					},
					{
						label: '价格从低到高',
						value: 'nftUnitprice,asc'
					},
				],
				queryParams: {
					offset: -1,
					pageSize: 10,
					shopCode: '',
					nftStatus: '2'
				},
				chooseList: [],
				chooseLock: false,
				scrollViewHeight: 0,
				scrollViewHeightAddBlind: 0,
				selectedBlindList: [],
				showAllSelected: false,
				selectedBlindHeight: '0rpx',
				blindOptions: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			}
		},
		onLoad(option) {
			this.isBlind = option.nftType === '2' ? 1 : 0
			this.scrollViewHeightAddBlind = calScrollHeight(460)
			this.scrollViewHeight = calScrollHeight(310)
			this.form.shopCode = option.shopCode
			this.queryParams.shopCode = this.form.shopCode
			this.form.nftCode = option.nftCode
			this.ope = option.ope
			this.queryClassifyOptions()
			if (this.ope === 'edit') {
				this.queryContent()
			}
			this.queryChooseList()
		},
		components: {
			HorizonSelect,
			BlindBrief
		},
		methods: {
			cent2yuan,
			handleBlindIssueCount(item) {
				let issueList = this.selectedBlindList.map(item => {
					return item.issueCount
				})
				let sum = issueList.reduce((prev, cur) => {
					return prev + cur;
				})
				this.form.issueCount = sum
			},
			showChosenDel(item, index) {
				this.$set(item, 'delOpen', 'right')
			},
			blindDel(item, index) {
				this.selectedBlindList.splice(index, 1)
				this.handleBlindIssueCount()
			},
			updateLayout() {
				if (this.showAllSelected) {
					this.selectedBlindHeight = 'auto'
				} else {
					this.selectedBlindHeight = this.selectedBlindList.length === 0 ? '0rpx' : '180rpx'
				}
				let confirmAddWrap = document.querySelector('.confirmAddWrap')
				let pageHeader = document.querySelector('.pageHeader')
				let horizonSelectGroup = document.querySelector('.horizonSelectGroup')
				this.$nextTick(() => {
					this.scrollViewHeightAddBlind = calScrollHeight(confirmAddWrap.clientHeight + pageHeader
						.clientHeight + horizonSelectGroup.clientHeight, true)
				})
			},
			toggleShowAllSelected() {
				this.showAllSelected = !this.showAllSelected
				this.updateLayout()
			},
			delSelectedBlind(item, index) {
				this.selectedBlindList.splice(index, 1)
				this.chooseList.forEach(obj => {
					if (item.nftCode === obj.nftCode) {
						this.$set(obj, 'isAdded', false)
					}
				})
				this.updateLayout()
				this.handleBlindIssueCount()
			},
			addToSelected(item) {
				if (!item.isAdded) {
					this.$set(item, 'isAdded', true)
					this.$set(item, 'issueCount', 1)
					this.selectedBlindList.unshift(item)
					this.updateLayout()
					this.handleBlindIssueCount()
				}
			},
			changeClassifyCode(currentItem) {
				this.queryParams.classifyCode = currentItem.value
				this.queryParams.offset = -1
				this.queryChooseList()
			},
			changeSqlSort(currentItem) {
				this.queryParams.sqlSort = currentItem.value
				this.queryParams.offset = -1
				this.queryChooseList()
			},
			showPanel(key) {
				this.refList.forEach(key => {
					this.$refs[key].panelShow = false
				})
				this.$refs[key].panelShow = true
			},
			isBlindChange(index) {
				this.isBlind = index
			},
			gotoAddBlind() {
				this.procedure = 'addBlind'
				this.$nextTick(() => {
					this.updateLayout()
				})
			},
			gotoPublishForm() {
				this.procedure = 'form'
			},
			classifyConfirm(item, index) {
				this.form.classifyCode = item[0].value
				this.form.classifyName = item[0].label
			},
			queryChooseList() {
				if (this.chooseLock) return
				uni.showLoading({
					title: '正在查询...',
					mask: true
				})
				this.chooseLock = true
				this.queryParams.offset = this.queryParams.offset + 1
				StoreApi.chooseNft({
					params: this.queryParams
				}).then(res => {
					if (!res.data || res.data.length < 10) {
						this.queryParams.offset = this.queryParams.offset < 0 ? -1 : this.queryParams.offset - 1
					}
					let lastOffset = Math.floor(this.chooseList.length / 10)
					this.chooseList = this.chooseList.splice(0, lastOffset * 10).concat(res.data)
					let codeList = this.selectedBlindList.map(item => {
						return item.nftSubCode
					})
					this.chooseList.forEach(item => {
						item.nftSubCode = item.nftCode
						if (codeList.includes(item.nftSubCode)) {
							this.$set(item, 'isAdded', true)
						}
					})
					uni.hideLoading()
					this.chooseLock = false
				}).catch(err => {
					uni.hideLoading()
					this.chooseLock = false
					this.$u.toast(err)
				})
			},
			isTradeMsg() {
				this.likenstarShow = true;
			},
			queryClassifyOptions() {
				MerchandiseApi.classifyType().then(res => {
					res.data.forEach(item => {
						item.label = item.classifyName
						item.value = item.classifyCode
					})
					this.classifyTypeList = res.data.concat()
					res.data.unshift({
						label: '全部分类',
						value: undefined
					})
					this.classifyTypeListWithAll = res.data
				}).catch(err => {
					this.$u.toast(err)
				})
			},
			queryBlindContent() {
				MerchandiseApi.blindBoxInfo({
					params: {
						nftCode: this.form.nftCode
					}
				}).then(res => {
					this.form = {
						...this.form,
						...res
					}
					this.form.nftUnitpriceYuan = Number(this.form.price) / 100 + ''
					this.form.nftImgs = this.form.nftImg
					this.imgList = [{
						url: this.imgBaseUrl + this.form.nftImg + this.imgSuffix
					}]
				}).catch(err => {
					this.$u.toast(err)
				})
			},
			queryContent() {
				MerchandiseApi.info({
					params: {
						nftCode: this.form.nftCode
					}
				}).then(res => {
					this.form = {
						...this.form,
						...res
					}
					this.selectedBlindList = this.form.sub || []
					this.form.nftUnitpriceYuan = Number(this.form.price) / 100 + ''
					this.form.nftImgs = this.form.nftImg
					this.imgList = [{
						url: this.imgBaseUrl + this.form.nftImg + this.imgSuffix
					}]
				}).catch(err => {
					this.$u.toast(err)
				})
			},
			imgUploadStart() {
				this.imgUploading = true
			},
			imgChosen(data, index) {
				this.form.nftImgs = data
				this.imgUploading = false
			},
			imgRemove(index, list, name) {
				this.form.nftImgs = undefined
			},
			publishNormal(nftStatus) {
				if (this.$u.test.isEmpty(this.form.nftName)) {
					return this.$u.toast('请输入尚品名称')
				}
				if (this.form.nftName.length > 30) {
					return this.$u.toast('尚品名称不可大于30字')
				}
				if (this.$u.test.isEmpty(this.form.classifyCode)) {
					return this.$u.toast('请选择尚品分类')
				}
				if ((this.form.nftUnitpriceYuan.indexOf('0') === 0 && this.form.nftUnitpriceYuan[1] !== '.') || this.$u
					.test.isEmpty(this.form.nftUnitpriceYuan) || !this.$u.test.amount(this.form.nftUnitpriceYuan)) {
					return this.$u.toast('请正确输入售卖价格（最多保留两位小数）')
				}
				if (Number(this.form.nftUnitpriceYuan) > 999999.99) {
					return this.$u.toast('售卖价格不可超过999999.99元')
				}
				if (this.$u.test.isEmpty(this.form.issueCount) || !this.$u.test.digits(this.form.issueCount)) {
					return this.$u.toast('请正确输入发行数量')
				}
				if (Number(this.form.issueCount) >= 1000000) {
					return this.$u.toast('发行数量不可大于999999件')
				}
				if (this.imgUploading) {
					return this.$u.toast('图片正在上传中，请稍等再发布')
				}
				if (this.$u.test.isEmpty(this.form.nftImgs)) {
					return this.$u.toast('请上传尚品图片')
				}
				if (this.isBlind) {
					if (!this.selectedBlindList || this.selectedBlindList.length === 0) {
						return this.$u.toast('请添加盲盒尚品')
					}
				}
				if (this.$u.test.isEmpty(this.form.description)) {
					return this.$u.toast('请输入作品介绍')
				}
				if (this.form.description.length > 10000) {
					return this.$u.toast('作品介绍不可大于10000字')
				}
				if (this.$u.test.isEmpty(this.form.instructions)) {
					return this.$u.toast('请输入购买须知')
				}
				this.form.nftUnitprice = Number(this.form.nftUnitpriceYuan) * 100
				// delete this.form.nftUnitpriceYuan
				if (this.isBlind) {
					let sub = this.selectedBlindList.map(item => {
						return {
							nftSubCode: item.nftSubCode,
							issueCount: item.issueCount
						}
					})
					uni.showLoading({
						title: '正在发布中...',
						mask: true
					})
					StoreApi.publishBindBox({
						params: {
							...this.form,
							nftStatus,
							sub,
						}
					}).then(res => {
						uni.hideLoading()
						this.$u.toast('发布成功')
						setTimeout(() => {
							uni.navigateTo({
								url: "/pages/sys/mine/store/myStore"
							})
						})
					}).catch(err => {
						uni.hideLoading()
						this.$u.toast(err)
					})
				} else {
					uni.showLoading({
						title: '正在发布中...',
						mask: true
					})
					MineApi.publishNormal({
						params: {
							...this.form,
							nftStatus
						}
					}).then(res => {
						uni.hideLoading()
						this.$u.toast('发布成功')
						setTimeout(() => {
							uni.navigateTo({
								url: "/pages/sys/mine/store/myStore"
							})
						})
					}).catch(err => {
						uni.hideLoading()
						this.$u.toast(err)
					})
				}

			},
			customGoBack() {
				if (this.procedure === 'addBlind') {
					this.procedure = 'form'
					return
				}
				uni.navigateBack({
					delta: 1
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

	.u-subsection {
		border-radius: 30rpx !important;

		/deep/ .u-item-bg {
			border-radius: 30rpx !important;
		}
	}

	.publishRadio {
		.u-radio:nth-child(1) {
			margin-left: 10rpx;
		}

		.u-radio {
			margin-right: 50rpx;
		}

		/deep/ .u-radio__label {
			color: #F1F2F5 !important;
		}
	}


	.sketchIcon {
		width: 48rpx;
		height: 48rpx;
		background-size: 100%;
		background-image: url("@/static/common/img/mine/publish/sketch.png");
	}

	.publishPicker {
		/deep/ .u-select__body {
			background-color: #2A2A34 !important;
		}

		/deep/ .uni-picker-view-mask {
			background: none !important;
		}

		/deep/ .u-select__header {
			.u-select__header__confirm,
			.u-select__header__cancel {
				color: #9CA3AF !important;
			}

			background-color: #2A2A34 !important;
		}
	}

	.blind-add {
		width: 40rpx;
		height: 40rpx;
		margin-right: 10rpx;
		background-image: url("@/static/common/img/mine/store/blind-add.png");
		background-size: 100% 100%;
	}

	.addBlindBtn {
		position: absolute;
		right: 26rpx;
		bottom: 34rpx;
		width: 53rpx;
		height: 53rpx;
		background-size: 100% 100%;
		background-image: url("@/static/common/img/mine/store/publish.png");
	}

	.delSelectedBlind {
		width: 35rpx;
		height: 35rpx;
		background-image: url("@/static/common/img/index/recommend/follow.png");
		background-size: 100% 100%;
		transform: rotate(45deg);
		position: absolute;
		top: 10rpx;
		right: 10rpx;
	}

	.confirmAddWrap {
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		border-top-left-radius: 56rpx;
		border-top-right-radius: 56rpx;
		background-color: #2A2A34;
		// height:250rpx;
		padding: 34rpx;
	}


	.likenstarModal {
		/deep/ .u-model {
			background-color: #2A2A34 !important;
		}

		color:#9BA3B3;
		font-size: 34rpx;
		position:relative;

		.num {
			color: white;
			margin-left: 30rpx;
		}
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
</style>
