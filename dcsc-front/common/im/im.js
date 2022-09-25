import IMApi from "@/common/apis/im.js"
import MineApi from "@/common/apis/mine.js"
// #ifdef APP-PLUS 
import TIM from 'tim-wx-sdk';
// import COS from 'cos-wx-sdk-v5';
// #endif
// #ifdef H5
import TIM from 'tim-js-sdk';
// import TIMUploadPlugin from 'tim-upload-plugin'
// #endif

const SDKAppID = 1400729362

class IMApp{
	static getInstance(){
		if(!IMApp.instance){
			IMApp.instance = new IMApp()
		}
		return IMApp.instance
	}
	constructor(){
		uni.$TUIKit = TIM.create({
			SDKAppID
			// SDKAppID: genTestUserSig('').sdkAppID
		})
		// // #ifndef H5
		// uni.$TUIKit.registerPlugin({'cos-wx-sdk': COS});
		// // #endif
		// // #ifdef H5
		// uni.$TUIKit.registerPlugin({ 'tim-upload-plugin':TIMUploadPlugin })
		// // #endif
		this.IM = uni.$TUIKit
		this.IM.on(MyIM.event.SDK_READY, this.onSDKReady)
		this.IM.on(MyIM.event.ERROR, this.onTIMError);
		this.IM.on(MyIM.event.NET_STATE_CHANGE, this.onNetStateChange);
		this.IM.on(MyIM.event.KICKED_OUT, this.onKickedOut);
		this.currentUser = undefined
	}
	onSDKReady({name}){
		let ins = IMApp.getInstance()
		if(ins.currentUser.resolveFn){
			ins.currentUser.resolveFn()
		}
	}
	onTIMError(){
		uni.showToast({
			title:"im error!"
		})
	}
	onNetStateChange(){
		// uni.showToast({
		// 	title:"net state change!"
		// })
	}
	onKickedOut() {
		IMApp.getInstance().currentUser.online = false
		uni.showToast({
			title: '您被踢下线',
			icon: 'error'
		})
	}
}


export class MyIM{
	static getInstance(userID){
		if(!(MyIM.instance&&MyIM.instance.userID===userID)){
			MyIM.instance=new MyIM(userID)
			return MyIM.instance
		}
		return MyIM.instance
	}
	static logout(){
		if(MyIM.instance){
			uni.$TUIKit.logout().then(()=>{
			}).catch(err=>{
				uni.showToast({
					title:err
				})
			})
		}
	}
	constructor(userID){
		this.online = false
		this.userID = userID
		this.userSig = ''
		IMApp.getInstance().currentUser = this
	}
	checkLogin(){
		return new Promise((resolve,reject)=>{
			if(!this.online){
				IMApi.getUsersig().then(sigObj=>{
					uni.$TUIKit.login({
						userID: this.userID,
						userSig: sigObj.usersig
						// userSig: genTestUserSig(this.userID).userSig
					}).then(()=>{
						this.online = true
						this.userSig = sigObj.usersig
						console.log('im 登录成功')
						this.resolveFn = resolve
					}).catch(err=>{
						uni.showToast({
							title:"im 登录失败!"
						})
						reject()
					})
				})
			}else{
				resolve()
			}
		})
	}
	
}

 //   - TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多实例登录被踢
  //   - TIM.TYPES.KICKED_OUT_MULT_DEVICE 多终端登录被踢
  //   - TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED 签名过期被踢（v2.4.0起支持）。
uni.$TUIKitEvent = TIM.EVENT
uni.$TUIKitTypes = TIM.TYPES
MyIM.event = TIM.EVENT