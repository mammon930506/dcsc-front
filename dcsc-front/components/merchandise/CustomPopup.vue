<template>
	<u-popup class="customPopup" mode="bottom" v-model="show" :mask-close-able="false" :mask="mask">
		<slot @closePop="test"></slot>
	</u-popup>
</template>

<script>
	export default{
		data(){
			return {
				show:false
			}
		},
    props:{
      mask:{
        type: Boolean,
        default(){
          return true
        }
      }
    },
		methods:{
		}
	}
</script>

<style lang="scss" scoped>
	.customPopup{
		/deep/ .u-drawer-bottom{
			background-color: #2A2A34;
			opacity: 0.9;
			// background-image: linear-gradient(to bottom right, rgba(255,255,255,0.4) 0%, rgba(24,24,28,1) 50%, rgba(255,255,255,0.4) 100%);
			border-top-left-radius: 56rpx;
			border-top-right-radius: 56rpx;
			/deep/ .uni-scroll-view{
				/deep/ .uni-scroll-view-content{
					position:relative;
				}
			}

		}

	}
</style>
