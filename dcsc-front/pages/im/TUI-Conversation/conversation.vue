<template>
	<view class="container-conversation">
		<view class="scroll-box">
			<view class="uni-list margintop-bar">
				<view v-for="item in conversationList" :key="item.conversationID" @tap="handleRoute(item.conversationID)">
					<TUI-conversation-item :data-type="item.type" :conversation="item"></TUI-conversation-item>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import TUIConversationItem from '@/components/im/tui-conversation/conversation-item/index';
import TUIMessageList from '@/components/im/tui-chat/message-list/index';
import IMApi from "@/common/apis/im.js"
export default {
	data() {
		return {
			conversationList: [], 
		};
	},

	components: {
		TUIConversationItem,
		TUIMessageList
	},
	props: {},
	onLoad(option) {
		if(option.haveShop){
			uni.$TUIKit.getConversationProfile(`GROUP${this.imPrefix}${option.shopCode}`).then(res => {})
			// this.pinMyGroup(option.shopCode)
			// this.handleRoute(`GROUP${this.imPrefix}${option.shopCode}`)
		}
		IMApi.getMyOwnGroup().then(res=>{
			res.data.forEach(groupId=>{
				uni.$TUIKit.getConversationProfile(`GROUP${groupId}`).then(res => {})
			})
		})
		this.getConversationList();
		uni.$TUIKit.on(uni.$TUIKitEvent.CONVERSATION_LIST_UPDATED, this.onConversationListUpdated);
	},
	onUnload() {
		uni.$TUIKit.off(uni.$TUIKitEvent.SDK_READY, this.onConversationListUpdated);
	},
	methods: {
		handleRoute(id) {
			uni.navigateTo({
				url:`/pages/im/TUI-Chat/chat?conversationID=${id}`
			});
		},
		onConversationListUpdated(event) {
			this.setData({
				conversationList: event.data
			});
		},
		pinMyGroup(shopCode){
			uni.$TUIKit.pinConversation({ conversationID: `GROUP${this.imPrefix}${shopCode}`, isPinned: true })
		},
		getConversationList() {
			uni.$TUIKit.getConversationList().then(imResponse => {
				this.setData({
					conversationList: imResponse.data.conversationList
				});
			});
		},
		goHomePage() {
			uni.switchTab({
				url: '../../TUI-Index/index'
			});
		},
	}
};
</script>
<style scoped>
@import './conversation.css';
</style>
