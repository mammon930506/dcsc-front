<template>
	<view class="wrap">
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			个人信息<view></view>
		</view>
		<view style="height:100rpx;"></view>
		<view>
			<scroll-view scroll-y :style="{height:scrollViewHeight}">
				<view style="padding:40rpx;">
					<view style="position:relative;width:176rpx;height:176rpx;margin: 68rpx auto 0;"
						@click="profileShow=true">
						<view class="centercover"
							style="width:100%;height:100%;box-sizing: border-box;border:4rpx solid #9CA3AF;border-radius:88rpx;"
							:style="{backgroundImage:`url(${imgBaseUrl}${form.header ? form.header : ''}${imgSuffix})`}">
						</view>
						<view class="cameraEntry"></view>
					</view>
					<view style="font-size: 30rpx;text-align: center;font-weight: 500;margin-top: 32rpx;">
						点击更换头像</view>
					<view style="width: 682rpx;height: 0;border-bottom: 1px solid #59595D;margin-top: 48rpx;">
					</view>
					<view class="attrLabel">昵称</view>
					<view class="card" style="color:#F3F4F6"
						@tap="linkTo('./updateNickName?nickName='+form.nickName +'&userCode='+ form.userCode)">
						<view class="flex-between">
							<view style="width: 96%;"><text v-if="form.nickName">{{form.nickName}}</text><text
									style="color:grey" v-else>请输入昵称</text></view>
							<view style="width: 4%;">
								<u-icon name="arrow-right"></u-icon>
							</view>
						</view>
					</view>
					<view class="attrLabel">标签</view>
					<view class="card" style="color:#F3F4F6" @tap="linkTo('./updateTags')">
						<view class="flex-between">
							<scroll-view scroll-x="true"
								style="white-space: nowrap;width: 96%;padding-right: 20rpx;box-sizing: border-box;"
								v-if="userMarkerList&&userMarkerList.length>0">
								<view class="tags" v-for="(item,index) in userMarkerList" :key="index">{{item}}</view>
							</scroll-view>
							<view v-else style="color: grey;">暂无标签</view>
							<view style="width: 4%;">
								<u-icon name="arrow-right"></u-icon>
							</view>
						</view>
					</view>
					<view class="attrLabel">账户UID</view>
					<u-field disabled class="publishField" label-width="0" v-model.trim="form.userCode"
						placeholder="账户UID" :border-bottom="false"></u-field>
					<view class="attrLabel">区块链地址</view>
					<u-field disabled class="publishField" label-width="0" v-model.trim="form.chainWallet"
						placeholder="区块链地址" :border-bottom="false"></u-field>
					<view class="attrLabel">二维码</view>
					<view class="card" style="color:#F3F4F6" @tap="linkTo('./myQRCode?userCode='+form.userCode)">
						<view class="flex-between">
							<view style="width: 96%;">查看二维码</view>
							<view style="width: 4%;">
								<u-icon name="arrow-right"></u-icon>
							</view>
						</view>
					</view>
					<view class="attrLabel">简介</view>
					<view @tap="linkTo('./briefIntroduction')">
						<u-field type="textarea" class="publishField" label-width="0"
							v-model.trim="form.briefIntroduction" :border-bottom="false" placeholder="填写兴趣爱好、生活方式等个人简介"
							right-icon="arrow-right">

						</u-field>
					</view>
					<!-- 	<view class="card" @tap="linkTo('./briefIntroduction')">
						<view class="flex-between">
							<view style="">

							</view>
							<view></view>
							<view style="color: #6B7280;width: 96%;"></view>
							<view style="width: 4%;">
								<u-icon name="arrow-right"></u-icon>
							</view>
						</view>
					</view> -->
					<view class="attrLabel">性别</view>
					<view class="card" style="color:#F3F4F6;" @tap="sexShow=true">
						<view class="flex-between">
							<view v-if="form.gender!==undefined">{{ sexOptions[form.gender] }}</view>
							<view v-else style="color: #6B7280;width: 96%;">选择性别</view>
							<view style="width: 4%;">
								<u-icon name="arrow-right"></u-icon>
							</view>
						</view>
					</view>

					<view class="attrLabel">生日</view>
					<view class="card" style="color:#F3F4F6;" @tap="birthdayShow=true">
						<view class="flex-between">
							<view v-if="form.birthday!==undefined"> {{ birthdayDate }}</view>
							<view v-else style="color: #6B7280;width: 96%;">选择日期</view>
							<view>
								<u-icon name="arrow-right" @tap="linkTo()"></u-icon>
							</view>
						</view>
					</view>
					<!-- 			<view class="attrLabel">地区</view>
					<view class="card" style="color:#F3F4F6;">
						<view class="flex-between">
							<view style="color: #6B7280;width: 96%;">选择地区</view>
							<view style="width: 4%;">
								<u-icon name="arrow-right" @tap="linkTo()"></u-icon>
							</view>
						</view>
					</view>
					<view class="attrLabel">职业</view>
					<view class="card" style="color:#F3F4F6;">
						<view class="flex-between">
							<view style="color: #6B7280;width: 96%;">选择职业</view>
							<view style="width: 4%;">
								<u-icon name="arrow-right" @tap="linkTo()"></u-icon>
							</view>
						</view>
					</view>
					<view class="attrLabel">学校</view>
					<view class="card" style="color:#F3F4F6;">
						<view class="flex-between">
							<view style="color: #6B7280;width: 96%;">选择学校</view>
							<view style="width: 4%;">
								<u-icon name="arrow-right" @tap="linkTo()"></u-icon>
							</view>
						</view>
					</view> -->
				</view>
			</scroll-view>
		</view>

		<u-action-sheet class="action-sheet-proup" :list="profile" v-model="profileShow" :tips="profileTips"
			@click="profileChange" border-radius="20"></u-action-sheet>
		<u-action-sheet class="action-sheet-proup" @click="sexChange" :list="sex" v-model="sexShow" :tips="sexTips"
			border-radius="20" safe-area-inset-bottom></u-action-sheet>
		<u-picker class="time" cancel-color="#C4C4C4" confirm-color="#7A83D2" mode="time" v-model="birthdayShow"
			safe-area-inset-bottom :params="birthdayOptions" title="选择日期" @confirm="birthdayChange"
			:default-time="birthdayDate"></u-picker>
	</view>
</template>

<script>
	import jlConfig from "@/common/utils/jlConfig.js"
	import MineApi from "@/common/apis/mine.js"
	import jlCatche, {
		KEY_OPENID,
		KEY_TOKEN
	} from "@/common/utils/jlCatche.js"
	import {
		calScrollHeight
	} from '@/common/common.js'
	export default {
		data() {
			return {
				form: {},
				scrollViewHeight: 0,
				sexOptions: {
					0: '男',
					1: '女'
				},
				//性别title
				sexTips: {
					text: '请选择性别',
					color: '#6B7280',
					fontSize: '28rpx'
				},
				//头像title
				profileTips: {
					text: '请选择上传方式',
					color: '#6B7280',
					fontSize: '28rpx'
				},
				//性别选项
				sex: [{
					text: '男',
					value: 0,
					color: '#F3F4F6',
					fontSize: '34rpx',
				}, {
					text: '女',
					value: 1,
					color: '#F3F4F6',
					fontSize: '34rpx',
				}],
				// 头像选项
				profile: [{
					text: '拍照',
					color: '#F3F4F6',
					fontSize: '34rpx',
				}, {
					text: '我的相册',
					color: '#F3F4F6',
					fontSize: '34rpx',
				}],
				birthdayOptions: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				sexShow: false, //性别弹窗
				profileShow: false, //头像弹窗
				birthdayShow: false, //生日弹窗
				disabled: false,
				tip: '',
				userMarkerList: [],
				birthdayDate: ''
			}
		},
		onShow() {
			this.scrollViewHeight = calScrollHeight(110)
			this.getMineInfoData()
			// this.getMarker()
		},
		methods: {
			linkTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			getMineInfoData() {
				MineApi.mineInfo().then(res => {
					console.log(res, '个人信息');
					this.birthdayDate = res.birthday ? this.$u.timeFormat(res.birthday, 'yyyy-mm-dd') : ''
					this.form = res
					this.userMarkerList = JSON.parse(res.userMarker)
					console.log('res.birthday', res.birthday);
					console.log('this.birthdayDate', this.birthdayDate);
				}).catch(err => {
					this.$u.toast(err)
				})
			},
			sexChange(index) {
				MineApi.saveGender({
					params: {
						gender: index
					}
				}).then(res => {
					this.$set(this.form, 'gender', index)
					this.$u.toast('保存成功')
				}).catch(err => {
					this.$u.toast(err)
				})
			},
			birthdayChange(item) {
				let temp = item.year + '-' + item.month + '-' + item.day
				MineApi.saveBirthday({
					params: {
						birthday: temp + ' 00:00:00'
					}
				}).then(res => {
					this.birthdayDate = temp
					this.$set(this.form, 'birthday', new Date(temp + ' 00:00:00').getTime())
					console.log('保存成功 this.birthdayDate ', this.birthdayDate)
					this.$u.toast('保存成功')
				}).catch(err => {
					this.$u.toast(err)
				})
			},
			customGoBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			profileChange(index) {
				const that = this;
				const sourceType = index === 0 ? 'camera' : 'album';
				console.log(sourceType, 'profileChange');
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: [sourceType], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
						that.uploadImg(res.tempFiles[0]).then(url => {
							console.log(url.data, '图片地址');
							that.$set(that.form, 'header', url.data)
							MineApi.saveHeader({
								params: {
									userCode: that.form.userCode,
									header: that.form.header
								}
							}).then(() => {
								uni.showToast({
									title: '修改成功',
									icon: "none"
								})
							}).catch(() => {

							})
						})
					}
				});
			},
			uploadImg(path) {
				return new Promise(function(resolve, reject) {
					uni.uploadFile({
						url: `${jlConfig.apiUrl}/api/client/file/v1/upload`,
						file: path,
						name: 'file',
						success: uploadFileRes => {
							resolve(uploadFileRes)
						},
						fail: err => {
							reject(err)
						}
					})
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

	.action-sheet-proup {
		/deep/ .uni-scroll-view {
			background-color: #2A2A34;

			.u-gab {
				background-color: #17171B;
			}

			.u-border-bottom:after {
				border-color: #59595D;
			}
		}
	}

	.time {
		/deep/ .u-drawer-bottom {
			background-color: #2A2A34;

			.u-datetime-picker {
				border-radius: 20rpx 20rpx 0 0;

				.u-picker-header {
					background: #2A2A34;

					.u-picker__title {
						color: #FFFFFF;
						font-weight: 500;
					}
				}

				.u-picker-body {
					background: #2A2A34;

					.uni-picker-view-mask {
						background: linear-gradient(180deg, hsla(240, 11%, 18%, .95), hsla(240, 11%, 18%, .6)), linear-gradient(0deg, hsla(240, 11%, 18%, .95), hsla(240, 11%, 18%, .6));
						;
						background-position: top, bottom;
						background-repeat: no-repeat;
					}

					.u-column-item {
						color: #F3F4F6;
						font-size: 34rpx;
					}

					.change_year {
						border-left: 40rpx solid #2A2A34;
						padding-left: 40rpx;

						.uni-picker-view-indicator {
							border-radius: 10rpx 0 0 10rpx;
						}
					}

					.change_day {
						border-right: 40rpx solid #2A2A34;
						padding-right: 40rpx;

						.uni-picker-view-indicator {
							border-radius: 0 10rpx 10rpx 0;
						}
					}

					.uni-picker-view-indicator {
						background: rgba(116, 116, 128, 0.1600);

					}

					.uni-picker-view-indicator:after {
						opacity: 0;
					}

					.uni-picker-view-indicator:before {
						opacity: 0;
					}
				}
			}

		}
	}

	.button {
		color: #ffffff;
		font-size: 32rpx;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		background-size: 100% 100%;
		background-image: url("@/static/common/img/login/Button@3x.png");
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

	.tags {
		font-size: 20rpx;
		color: #fff;
		background: #7A83D2;
		margin-right: 10rpx;
		padding: 10rpx 20rpx;
		border-radius: 88rpx;
		display: inline-block;

		&:last-child {
			margin-right: 0;
		}
	}
</style>
