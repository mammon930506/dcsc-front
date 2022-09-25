<template>
	<view style="position:relative;font-size:24rpx;">
		<view style="position:relative;z-index:10">
			<span @tap="togglePanel">
				<span :class="{hotTitle:panelShow?true:false}" style="color:#9CA3AF;line-height:70rpx;margin-left:30rpx">
					<span class="innerHotTitle" style="font-size:24rpx;background-color:#17171B;" >
						<span v-if="toggleSelected">
							{{ currentItem.label }}<u-icon name="arrow-down-fill" style="margin-left:20rpx;vertical-align: middle;" size="15"></u-icon>
						</span>
						<span v-else>
							<slot name="customTitle"></slot>
						</span>
					</span>
				</span>
			</span>
			<view v-if="panelShow" style="position:fixed;left:0;width:100%;background-color:#17171B;padding:0 30rpx 30rpx;">
				<view v-for="(item,index) in optionList" @tap="handleActive(item,index)">
					<view v-if="customItem">
						<slot name="customItem" :item="item"></slot>
					</view>
					<view v-else :style="{color:item.isActive?'#7A83D2':'#F3F4F6'}" class="flex-row-between-center" style="line-height:70rpx;">
						<view>{{ item.label }}</view><u-icon v-if="item.isActive" name="checkbox-mark"></u-icon>
					</view>
				</view> 
			</view>
		</view>
		<u-mask :custom-style="{position:'fixed',width:'100vw',height:'100vh',top:'200rpx'}" :duration="0" :z-index="1" :show="panelShow" :mask-click-able="false" ></u-mask>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				currentIndex:0,
				currentItem:{},
				panelShow:false,
			}
		},
		props:{
			toggleSelected:{
				type:Boolean,
				default:true
			},
			defaultIndex:{
				type:Number,
				default(){
					return 0
				}
			},
			optionList:{
				type:Array,
				default(){
					return []
				}
			},
			toggleCancel:{
				type:Boolean,
				default:false
			},
			customItem:{
				type:Boolean,
				default:false
			},
		},
		mounted(){
			this.currentIndex = this.defaultIndex
			this.currentItem = this.optionList[this.currentIndex]
			this.handleActive(this.currentItem,this.currentIndex)
		},
		methods:{
			togglePanel(){
				this.panelShow=!this.panelShow
				if(this.panelShow){
					this.$emit('showPanel')
				}
			},
			handleActive(item,index){
				this.optionList.forEach(item=>{
					this.$set(item,'isActive',false)
				})
				if(this.toggleCancel&&Object.keys(this.currentItem).length&&this.currentItem.value===item.value){
					this.$set(item,'isActive',false)
					this.currentItem = {}
				}else{
					this.$set(item,'isActive',true)
					this.currentItem = item
				}
				this.$emit('doQuery',this.currentItem)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/index.scss";
</style>