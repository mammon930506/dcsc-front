<template>
	<view class="wrap">
		<headnavbar title="意见反馈"></headnavbar>
		<view>
			<scroll-view scroll-y :style="{height:scrollViewHeight}">
				<view style="padding:0 40rpx 20rpx">
					<view class="attrLabel">反馈内容</view>
					<u-field class="publishField" label-width="0" v-model.trim="form.content" placeholder="请输入您要反馈的内容"
						:border-bottom="false" type="textarea" :field-style="{height:'340rpx'}" :auto-height="false">
					</u-field>
					<view class="attrLabel">上传图片</view>
					<view class="card">
						<u-upload width="180" height="180" class="publishUpload" :file-list="imgList" :auto-upload="true" :preview-full-image="true"
							:multiple="true" @on-choose-complete="imgUploadStart" @on-uploaded="imgUploaded" :max-count="5"
							@on-remove="imgRemove" :action="`${apiUrl}/api/client/file/v1/upload`"
							max-size="10*1024*1024" upload-text="大小限制10M"></u-upload>
					</view>
				</view>
			</scroll-view>
		</view>
		<view style="position: fixed;bottom:0;width:100%">
			<view style="padding: 20rpx 40rpx;background-color:#18181c;border-top:2rpx solid rgba(255,255,255,0.3);">
				<view class="button" @tap="submitSug">提交</view>
			</view>
		</view>
	</view>
</template>

<script>
	import headnavbar from "@/components/headnavbar/index.vue"
	import { calScrollHeight } from '@/common/common.js'
	import jlCatche from "@/common/utils/jlCatche.js"
	import LoginApi from '@/common/apis/login.js'
	export default{
		data(){
			return{
				form:{
					content:'',
					userCode:'',
					sys:'',
					imgs:undefined
				},
				imgList: [],
				imgUploading:false,
				scrollViewHeight:0
			}
		},
		components:{
			headnavbar
		},
		onLoad(){
			this.scrollViewHeight = calScrollHeight(260)
		},
		methods:{
			imgUploadStart(){
				this.imgUploading = true
			},
			imgUploaded(lists, name){
				this.form.imgs = JSON.stringify(lists.map(item=>item.response))
				this.imgUploading = false
			},
			imgRemove(index, list, name){
				if(list&&list.length){
					this.form.imgs =  JSON.stringify(list.map(item=>item.response)) 
				}else{
					this.form.imgs = undefined
				}
			},
			submitSug(){
				if(this.$u.test.isEmpty(this.form.content)){
					return this.$u.toast('请输入意见反馈内容')
				}
				if (this.imgUploading) {
					return this.$u.toast('图片正在上传中，请稍等再提交')
				}
				this.form.userCode = jlCatche.getCacheUserInfo('userCode')
				uni.showLoading({
					title:"正在提交...",
					mask:true
				})
				uni.getSystemInfo({
					success:res=>{
						this.form.sys = res.osName.indexOf('ios')!==-1?'2':'1'
						LoginApi.feedback({
							params:this.form
						}).then(res=>{
							this.$u.toast('提交成功')
							uni.hideLoading()
							setTimeout(()=>{
								uni.switchTab({
									url:'/pages/sys/mine/index'
								})
							},1000)
						}).catch(err=>{
							this.$u.toast(err)
						})
					}
				})
			},
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #18181c;
	}
</style>
<style lang="scss" scoped>
	@import url('@/common/css/index.scss');
	.publishUpload /deep/ .u-list-item.u-add-wrap {
		background-color: #35353F !important;
	}
</style>