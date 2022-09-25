<template>
	<u-swiper-with-slot :list="flowList" height="320" :autoplay="true" :circular="true" bg-color="#18181c"
	border-radius="56">
		<template v-slot="{item}">
			<view @tap="triggerItem(item)" style="width:100%;height:100%;background-size:cover;background-position: center;"
            :style="{backgroundImage:item.imgLoaded?`url(${imgBaseUrl}${item.advertImg}${imgSuffix})`:'none',backgroundColor:imgLoaded?'none':'#2A2A34'}"></view>
			<!-- <image :src="'./'+item.advertImg" ></image> -->
		</template>
	</u-swiper-with-slot>
</template>

<script>
  import imgLoading from '@/common/mixins/imgLoading'
	export default{
		props:{
			flowList:{
				type:Array,
				default(){
					return []
				}
			}
		},
    watch:{
      flowList:{
        immediate:true,
        deep:true,
        handler(){
          this.flowList.forEach(item=>{
            this.checkImageLoad(item.advertImg).then(()=>{
              this.$set(item,'imgLoaded',true)
            })
          })
          // this.checkImageLoad(this.brief.nftImg)
        }
      }
    },
    mixins:[imgLoading],
		methods:{
			triggerItem(item){
				this.$emit('triggerItem',item)
			}
		}
	}
</script>

<style>
</style>
