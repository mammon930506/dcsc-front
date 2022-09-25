<template>
	<custom-popup ref="slotPopup" :mask="showMask">
		<template v-slot>
      <view :style="confirmStyle">
        <view  @touchstart="start" @touchend="end" >
          <view v-if="showHandler" style="position:relative">
            <view
                style="margin:30rpx auto 100rpx;width:60rpx;height:10rpx;background-color:#9CA3AF;border-radius:5rpx;">
            </view>
          </view>
          <view style="color:#FFFFFF;font-size: 30rpx;padding:0 40rpx;text-align: center;line-height:50rpx;;">
            <slot></slot>
          </view>
        </view>
        <view v-if="showBtns" style="display:flex;justify-content:space-around;padding:70rpx 60rpx 120rpx;" :style="btnGroupStyle">
          <view @tap="confirmCancel"
                style="background-color:#18181c;width:240rpx;height:70rpx;border-radius: 20rpx;font-size:30rpx;line-height:65rpx;text-align: center;"
                :style="cancelStyle">
            {{ cancelText }}</view>
          <view @tap="confirmOk" class="button"
                style="width:240rpx;height:70rpx;border-radius: 20rpx;font-size:30rpx;line-height:65rpx;"
                :style="okStyle">
            {{ okText }}</view>
        </view>
      </view>
		</template>
	</custom-popup>
</template>

<script>
	import CustomPopup from "@/components/merchandise/CustomPopup"
	export default {
		data() {
			return {
				startData: {
					clientX: 0,
					clientY: 0,
				},
				touch: {
					clientX: 0,
					clientY: 0,
				},
			}
		},
		props:{
			showHandler:{
				type:Boolean,
				default:true
			},
			showBtns:{
				type:Boolean,
				default:true
			},
			touchmoveClose:{
				type:Boolean,
				default:true
			},
      showMask:{
        type:Boolean,
        default: true
      },
      confirmStyle:{
        type:Object,
        default(){
          return {}
        }
      },
      btnGroupStyle:{
        type:Object,
        default(){
          return {}
        }
      },
      cancelStyle:{
        type:Object,
        default(){
          return {}
        }
      },
      okStyle:{
        type:Object,
        default(){
          return {}
        }
      },
      cancelText:{
        type:String,
        default:'取消'
      },
      okText:{
        type:String,
        default:'确定'
      }
		},
		components: {
			CustomPopup
		},
		methods: {
			showup() {
				this.$refs.slotPopup.show = true
			},
			close() {
				this.$refs.slotPopup.show = false
			},
			confirmCancel() {
				this.close()
				this.$emit('confirmCancel')
			},
			confirmOk() {
				this.close()
				this.$emit('confirmOk')
			},
			start(e) {
				if(!this.touchmoveClose)return
				this.startData.clientX = e.changedTouches[0].clientX;
				this.startData.clientY = e.changedTouches[0].clientY;
			},
			end(e) {
				if(!this.touchmoveClose)return
				this.touch = event.changedTouches[0]
				if (Math.abs(this.touch.clientY - this.startData.clientY) > 100) {
					this.close()
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/index.scss";
</style>
