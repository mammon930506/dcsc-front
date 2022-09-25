<template>
    <view  class="wrap">
        <view style="background-color:#18181c;z-index:1000">
            <view style="position:relative;height:120rpx;padding:0 30rpx;padding-top:30rpx;">
                <u-input @tap="gotoSearch" disabled  :clearable="false" :custom-style="searchStyle" placeholder-style="color:#6B7280"
                    placeholder="请输入关键字搜索" v-model="keyword"></u-input>
                <image src="/static/common/img/index/recommend/Search.png"
                    style="width:35rpx;height:36rpx;position:absolute;right:60rpx;bottom:calc( 50% - 35rpx )"></image>
            </view>
            <tabs-in-store ref="homeTabs" :initial="current" style="padding-top:20rpx;" inactiveColor="#ffffff" :navList="navList" bgColor="#18181c" @navChange="navChange"></tabs-in-store>
        </view>

        <swiper :current="current" :style="{height:scrollViewHeight}" :duration="300" @change="swiperChange">
            <swiper-item>
                <scroll-view scroll-y="true" @scrolltolower="getContentTab0" :style="{height:scrollViewHeight}"
                :refresher-enabled="true" :refresher-triggered="refreshTriggeredTab0" refresher-background="#18181c" @refresherrefresh="pullDownRefreshTab0">
                    <view v-if="!noLogin&&!noFollowing&&postList&&postList.length>0">
                        <view style="padding:20rpx 30rpx;">
                            <view v-for="postContent in postList">
                                <post :content="postContent" :detailLevel="0"></post>
                            </view>
                        </view>
                    </view>
                    <view v-else>
                        <view class="blankIcon"></view>
                        <view class="blankReason" style="text-align: center">
                            <view v-if="noLogin">您尚未登录</view>
                            <view v-else-if="noFollowing">您还没有关注任何人</view>
                            <view v-else-if="!noFollowing&&noTimeline">您关注的用户暂时没有新动态</view>
                        </view>
                        <view style="margin:0 30rpx;margin-bottom:50rpx;">
                            <view style="color:#7A83D2;font-size:28rpx;padding:20rpx 0">为你推荐</view>
                            <view v-for="item in artistList">
                                <artist-brief :item="item" :opeList="['follow']" :briefList="['statics']"></artist-brief>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>
            <swiper-item>
                <scroll-view scroll-y="true" @scrolltolower="getContentTab11"  :style="{height:scrollViewHeight}"
                :refresher-enabled="true" :refresher-triggered="refreshTriggeredTab1" refresher-background="#18181c" @refresherrefresh="pullDownRefreshTab1">
          <template v-if="advertList.length>0">
            <carousel-normal @triggerItem="triggerBanner" style="padding:0 30rpx;" :flowList="advertList"></carousel-normal>
          </template>
          <template v-else>
            <carousel-normal style="padding:0 30rpx;" :flowList="[{}]"></carousel-normal>
          </template>
            <recom-title title='推荐尚品' type="2" :more='true'></recom-title>
          <template v-if="nftList.length>0">
            <carousel :flowList="nftList">
              <template v-slot="{item}">
                <blur-work-big :brief="item"></blur-work-big>
              </template>
            </carousel>
          </template>
          <template v-else>
            <carousel :flowList="[{},{},{}]">
              <template v-slot="{item}">
                <blur-work-big :brief="item"></blur-work-big>
              </template>
            </carousel>
          </template>
                    <recom-title title='推荐艺术家' type="3" :more='true'></recom-title>
          <template v-if="artistList.length>0">
            <carousel-batch :flowList="artistList">
              <template v-slot="{item}">
                <artist :brief="item"></artist>
              </template>
            </carousel-batch>
          </template>
          <template v-else>
            <carousel-batch :flowList="[{},{},{}]">
              <template v-slot="{item}">
                <artist :brief="item"></artist>
              </template>
            </carousel-batch>
          </template>
                    <recom-title title='人气作品' type="4" :more='false'></recom-title>
                    <work-flow ref="hitWorks" style="padding:0 30rpx;" :flowList="worksList">
                        <template v-slot='{item}'>
                            <blur-work-small :brief="item"></blur-work-small>
                        </template>
                    </work-flow>

                </scroll-view>
            </swiper-item>
        </swiper>

    </view>
</template>

<script>
    import TabsInStore from "@/components/merchandise/TabsInStore"
    import Waterfall from "@/components/home/Waterfall"
    import Carousel from "@/components/home/Carousel"
    import CarouselBatch from "@/components/home/CarouselBatch"
    import CarouselNormal from "@/components/home/CarouselNormal"
    import RecomTitle from "@/components/home/RecomTitle"
    import WorkFlow from "@/components/home/WorkFlow"
    import BlurWorkSmall from "@/components/home/BlurWorkSmall"
    import BlurWorkBig from "@/components/home/BlurWorkBig"
    import Artist from "@/components/home/Artist"
    import ArtistBrief from "@/components/home/ArtistBrief"
    import post from "@/components/sns/post"
    import HomeApi from "@/common/apis/home.js"
    import MineApi from "@/common/apis/mine.js"
    import LoginApi from "@/common/apis/login.js"
    import {snsImgs,getUrlValue,calScrollHeight} from "@/common/common.js"
    import jlCatche, {
        KEY_OPENID,
        KEY_TOKEN
    }from "@/common/utils/jlCatche.js"
    export default {
        data() {
            return {
                current:1,
                keyword: '',
                searchStyle: {
                    height: "90rpx",
                    backgroundColor: '#2A2A34',
                    borderRadius: '24rpx',
                    paddingLeft: '36rpx'
                },
                advertList: [],
                nftList: [],
                artistList: [],
                worksList: [],
                workPageTab11: -1,
                queryingTab11:false,
                postList:[],
                workPageTab0:-1,
                navList:[{
                    name:'关注',value:'1'
                },{
                    name:'推荐',value:'2'
                },{
                    name:'排行榜',value:'4'
                }],
                // ,{
                // 	name:'热门',value:'3'
                // },{
                // 	name:'专辑',value:'5'
                // },{
                // 	name:'活动',value:'6'
                // }
                refreshTriggeredTab1:false,
                refreshTriggeredTab0:false,
                scrollViewHeight:"calc( 100vh - 320rpx )",
                noLogin:false,
                noFollowing:false,
                noTimeline:false,
            }
        },

        onShow(){
            // #ifdef H5
            if(getUrlValue("token")){
                jlCatche.setStorageSync(KEY_TOKEN,'')
                jlCatche.setStorageSync("userInfo",'')
                
                jlCatche.setCacheUserInfo("phone",getUrlValue("phone"))
                jlCatche.setCacheUserInfo("userCode", getUrlValue("userCode"))
                jlCatche.setStorageSync(KEY_TOKEN, getUrlValue("token"))
                
                uni.$emit('followContentRefresh')
            }
            // #endif
        },
        onLoad(){
            
            setTimeout(()=>{
                this.scrollViewHeight = calScrollHeight(200)
            },1000)
            
            this.workPageTab11 = -1
            this.workPageTab0 = -1

            this.resetTab11()
            this.resetTab0()

            this.getContentTab10()
         
            this.getContentTab11()
            this.getMineContent().then(res=>{
                this.noFollowing =res.attention===0?true:false
                if(this.noFollowing){
                    return
                }
                this.getContentTab0()
            })
          
            uni.$on('followContentRefresh',()=>{
                this.refreshTriggeredTab0 = true
            })

        },
        components: {
            Waterfall,
            Carousel,
            CarouselBatch,
            CarouselNormal,
            TabsInStore,
            RecomTitle,
            WorkFlow,
            BlurWorkSmall,
            BlurWorkBig,
            Artist,
            ArtistBrief,
            post,
        },
        methods: {
            resetTab10(){
                this.advertList= []
                this.nftList= []
                this.artistList= []
            },
            resetTab11(){
                this.worksList= []
                if(this.$refs.hitWorks){
                    this.$refs.hitWorks.clearFlow()
                }
            },
            resetTab0(){
                this.postList= []
            },
            async getMineContent(){
                return new Promise((resolve,reject)=>{
          
                    LoginApi.ifrealname().then(res => {
                        this.noLogin = Number(res.iflogin)===0
                        if (!this.noLogin) {
                            MineApi.content().then(res=>{
                                resolve({attention:res.attention})
                            }).catch(err=>{
                                reject(err)
                            })
                        }else{
                            resolve({attention:0})
                        }
                        uni.hideLoading()
                    }).catch(err => {
                        uni.hideLoading()
                        reject(err)
                    })
                })
            },
            getContentTab0(){
             
                // if(this.noFollowing)return
                this.workPageTab0++
                HomeApi.followingTimeline({
                    params:{
                        offset:this.workPageTab0,
                        pageSize:10,
                        channelType:'1'
                    }
                }).then(res=>{
                    if(this.refreshTriggeredTab0){
                        this.resetTab0()
                    }
                    if(this.workPageTab0===0){
                      
                        this.noTimeline = !res.attention||res.attention.length===0
                    }
                    if(!res.attention||res.attention.length<10){
                        this.workPageTab0--
                    }
                    if(res.attention&&res.attention.length>0){
                        res.attention.forEach(snsImgs)
                        let lastOffset = Math.floor(this.postList.length/10)
                        this.postList = this.postList.splice(0,lastOffset*10).concat(res.attention)
                    }
                    setTimeout(()=>{
                        this.refreshTriggeredTab0 = false
                    },1000)
                }).catch(err=>{
               
                    this.workPageTab0--
            
                    this.refreshTriggeredTab0 = false
                })
            },
            getContentTab10(){
                HomeApi.content({
                    params: {
                        channelType: '2'
                    }
                }).then(res => {
                    this.resetTab10()
                    this.advertList = res.advert.adverts
                    this.nftList = res.nft.nfts
                    this.artistList = res.artist.artists
                }).catch(err=>{
                    this.$u.toast(err)
                })
            },
      
            pullDownRefreshTab1(){
                this.refreshTriggeredTab1 = true
                this.getContentTab10()
                this.workPageTab11 = -1
                this.resetTab11()
                this.getContentTab11()
            },
            getContentTab11() {
                if(this.queryingTab11)return
                this.queryingTab11 = true
                this.workPageTab11++
                HomeApi.moreContent({
                    params: {
                        bannerType: 4,
                        offset: this.workPageTab11,
                        pageSize: 10
                    }
                }).then(res => {
                    if(!res.works.workss||res.works.workss.length<10){
                        this.workPageTab11--
                    }
                    let lastOffset = Math.floor(this.worksList.length/10)
                    this.worksList = this.worksList.splice(0,lastOffset*10).concat(res.works.workss)
                    this.queryingTab11 = false
                    setTimeout(()=>{
                        this.refreshTriggeredTab1 = false
                    },1000)
                }).catch(err=>{
                    this.$u.toast(err)
                    this.queryingTab11 = false
                    this.refreshTriggeredTab1 = false
                })
            },
            pullDownRefreshTab0(){
                this.refreshTriggeredTab0 = true
                this.workPageTab0 = -1
                this.getMineContent().then(res=>{
                    this.noFollowing =res.attention===0?true:false
                    if(this.noFollowing){
                        this.refreshTriggeredTab0 = false
                        return
                    }
                    this.getContentTab0()
                })
            },
            triggerBanner(item){
                if(item.advertType==='1'){
                    uni.navigateTo({
                        url:`/pages/sys/home/richText?advertCode=${item.advertCode}`
                    })
                }else if(item.advertType==='2'){
                    uni.navigateTo({
                        url:`/pages/sys/merchandise/detail?nftCode=${item.advertContent}`
                    })
                }
            },
            navChange(index,item) {
                if(['3','5','6'].includes(item.value)){
                    this.$refs.homeTabs.current = this.$refs.homeTabs.lastCurrent
                    uni.navigateTo({
                        url: "/pages/sys/building/index"
                    })
                    return
                }else if(['4'].includes(item.value)){
                    this.$refs.homeTabs.current = this.$refs.homeTabs.lastCurrent
                    uni.navigateTo({
                        url: "/pages/sys/rank/collection"
                    })
                    return
                }
                this.current = index
            },
            swiperChange(e){
                this.current = e.detail.current
                this.$refs.homeTabs.current = e.detail.current
            },
            gotoSearch() {
                uni.navigateTo({
                    url: "/pages/sys/home/search?from=homeIndex"
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
    @import "@/common/css/mixin.scss";
    @import "@/common/css/index.scss";
	.blankReason{
		@include text(32rpx,#AAAAAA,bold)
	}
</style>
