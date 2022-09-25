<template>
	<view class="container">
		<view class="tui-chatroom-navigatorbar">
			<image class="tui-chatroom-navigatorbar-back" src="/static/static/assets/ic_back_white.svg" @tap="goBack" />
			<!-- 先查 remark；无 remark 查 (c2c)nick/(group)name；最后查 (c2c)userID/(group)groupID -->
			<view class="conversation-title">{{ conversationName }}</view>
		</view>
		<view class="group-profile"><TUI-group-profile v-if="isShow" id="groip-profile" :conversation="conversation" /></view>
		<view class="message-list" @tap="triggerClose"><TUI-message-list id="message-list" ref="messageList" :conversation="conversation" /></view>
		<view v-if="showChat" class="message-input">
			<TUI-message-input id="message-input" ref="messageInput" :conversation="conversation" @sendMessage="sendMessage" />
		</view>
	</view>
</template>

<script>
import TUIMessageList from '@/components/im/tui-chat/message-list/index';
import TUIMessageInput from '@/components/im/tui-chat/message-input/index';
import TUIGroupProfile from '@/components/im/tui-group/group-profile/index';

export default {
	components: {
		TUIMessageList,
		TUIMessageInput,
		TUIGroupProfile
	},
	props: {},
	data() {
		return {
			conversationName: '',
			conversation: {},
			messageList: [],
			isShow: false,
			showChat: true,
			conversationID: '',
			videoPlay: false,
			videoMessage: {},
			config: {
				sdkAppID: '',
				userID: '',
				userSig: '',
				type: 1,
				tim: null
			}
		};
	},
	created() {
		uni.$on('videoPlayerHandler', value => {
			this.videoPlay = value.isPlay;
			this.videoMessage = value.message;
		});
	},
	onLoad(options) {
		// conversationID: C2C、 GROUP
		const { conversationID } = options;
		uni.$TUIKit.setMessageRead({
			conversationID
		}).then(() => {
			
		});
		uni.$TUIKit.getConversationProfile(conversationID).then(res => {
			const { conversation } = res.data;
			this.conversation = conversation;
			this.conversationName = this.getConversationName(conversation)
			this.isShow= conversation.type === 'GROUP'
		});
	},
	mounted() {},
	methods: {
		stopVideoHander() {
			this.videoPlay = false;
		},
		getConversationName(conversation) {
			if (conversation.type === '@TIM#SYSTEM') {
				this.setData({
					showChat: false
				});
				return '系统通知';
			}

			if (conversation.type === 'C2C') {
				return conversation.remark || conversation.userProfile.nick || conversation.userProfile.userID;
			}

			if (conversation.type === 'GROUP') {
				return conversation.groupProfile.name || conversation.groupProfile.groupID;
			}
		},

		sendMessage(event) {
			// 将自己发送的消息写进消息列表里面
			this.$refs.messageList.updateMessageList(event.detail.message);
		},

		triggerClose() {
			if (this.showChat) {
				this.$refs.messageInput.handleClose();
			}
		},

		goBack() {
			const pages = getCurrentPages(); // 当前页面栈

			if (
				pages[pages.length - 2].route === 'pages/TUI-Conversation/create-conversation/create' ||
				pages[pages.length - 2].route === 'pages/TUI-Group/create-group/create' ||
				pages[pages.length - 2].route === 'pages/TUI-Group/join-group/join'
			) {
				uni.navigateBack({
					delta: 2
				});
			} else {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
};
</script>
<style>
@import './chat.css';
</style>
