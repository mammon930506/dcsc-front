import jlRequest from '@/common/utils/jlRequest'

/**
 * 我的相关接口
 */
export default class MineApi {
	
	/**
	 * 默认我的
	 */
	static content(config = {}){
	    config.path = '/api/client/mine/v1/content'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 关注列表
	 */
	static myFollowings(config = {}){
	    config.path = '/api/client/mine/v1/attention'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 粉丝列表
	 */
	static myFollowers(config = {}){
	    config.path = '/api/client/mine/v1/fans'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 我的获赞与收藏
	 */
	static mylikenstar(config = {}){
	    config.path = '/api/client/mine/v1/storeup'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 我的最近浏览
	 */
	static myBrowseHistory(config = {}){
	    config.path = '/api/client/mine/v1/browseHistory'
	    return new jlRequest().post(config)
	}

	
	/**
	 * 店铺信息
	 */
	static storeInfo(config = {}){
	    config.path = '/api/client/mine/shop/v1/info'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 店铺尚品
	 */
	static storeNft(config = {}){
	    config.path = '/api/client/mine/shop/v1/nft'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 店铺订单
	 */
	static shopOrder(config = {}){
	    config.path = '/api/client/mine/shop/v1/order'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 我的分享
	 */
	static myInvitedUser(config = {}){
	    config.path = '/api/client/mine/v1/share'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 邀请订单
	 */
	static myInvitedOrder(config = {}){
	    config.path = '/api/client/mine/v1/shareOrder'
	    return new jlRequest().post(config)
	}
	

	/**
	 * 上传文件
	 */
	static uploadFile(config = {}){
	    config.path = '/api/client/file/v1/upload'
	    return new jlRequest().uploadFile(config)
	}
	
	/**
	 * 发布普通尚品
	 */
	static publishNormal(config = {}){
	    config.path = '/api/client/mine/shop/v1/publish'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 个人实名发送短信
	 */
	static smsPerson(config = {}){
	    config.path = '/api/client/sms/v1/person'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 个人实名认证
	 */
	static authPerson(config = {}){
	    config.path = '/api/client/mine/auth/v1/person'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 获取个人实名认证信息
	 */
	static personInfo(config = {}){
	    config.path = '/api/client/mine/auth/v1/personInfo'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 邀请有礼
	 */
	static myInviteInfo(config = {}){
	    config.path = '/api/client/mine/v1/recommender'
	    return new jlRequest().post(config)
	}


	/**
	 * 联系客服
	 */
	static consumerCare(config = {}){
	    config.path = '/api/client/mine/v1/contactUS'
	    return new jlRequest().post(config)
	}
	
	
	/**
	 * 关于我们
	 */
	static aboutUS(config = {}){
	    config.path = '/api/client/mine/v1/aboutUS'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 尚品状态操作
	 */
	static updateNftStatus(config = {}){
	    config.path = '/api/client/mine/shop/v1/status'
	    return new jlRequest().post(config)
	}
	
	
	/**
	 * 个人信息
	 */
	static mineInfo(config = {}){
	    config.path = '/api/client/mine/info/v1/info'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 保存头像
	 */
	static saveHeader(config = {}){
	    config.path = '/api/client/mine/info/v1/saveHeader'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 保存昵称
	 */
	static saveNickName(config = {}){
	    config.path = '/api/client/mine/info/v1/saveNickName'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 获取标签
	 */
	// static getMarker(config = {}){
	//     config.path = '/api/client/mine/info/v1/getMarker'
	//     return new jlRequest().post(config)
	// }
	
	/**
	 * 保存标签
	 */
	static saveMarker(config = {}){
	    config.path = '/api/client/mine/info/v1/saveMarker'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 二维码
	 */
	static qrcode(config = {}){
	    config.path = '/api/client/mine/info/v1/qrcode'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 保存个人简介
	 */
	static saveIntro(config = {}){
	    config.path = '/api/client/mine/info/v1/saveBriefIntroduction'
	    return new jlRequest().post(config)
	}

	/**
	 * 保存性别
	 */
	static saveGender(config = {}){
	    config.path = '/api/client/mine/info/v1/saveGender'
	    return new jlRequest().post(config)
	}

	/**
	 * 保存生日
	 */
	static saveBirthday(config = {}){
	    config.path = '/api/client/mine/info/v1/saveBirthday'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 我收藏的笔记
	 */
	static myStarPost(config = {}){
	    config.path = '/api/client/mine/note/v1/storeup'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 我收藏的尚品
	 */
	static myStarNft(config = {}){
	    config.path = '/api/client/mine/nft/v1/storeup'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 我收藏的话题
	 */
	static myStarTopic(config = {}){
	    config.path = '/api/client/mine/subject/v1/storeup'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 我收藏的话题
	 */
	static myStarTopic(config = {}){
	    config.path = '/api/client/mine/subject/v1/storeup'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 我购买的尚品
	 */
	static myPurchases(config = {}){
	    config.path = '/api/client/mine/nft/v1/list'
	    return new jlRequest().post(config)
	}
	
	
	/**
	 * 我购买的尚品详情
	 */
	static myPurchasesInfo(config = {}){
	    config.path = '/api/client/mine/nft/v1/info'
	    return new jlRequest().post(config)
	}
	
	
	/**
	 * 发送验证码
	 */
	static getVerificationCode(config = {}){
	    config.path = '/api/client/login/v1/getVerificationCode'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 识别验证码
	 */
	static verificationCodeAuth(config = {}){
	    config.path = '/api/client/forgotPwd/v1/verificationCodeAuth'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 设置密码
	 */
	static setPassword(config = {}){
	    config.path = '/api/client/forgotPwd/v1/setPassword'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 验证实名信息
	 */
	static idCardNoAuth(config = {}){
	    config.path = '/api/client/forgotPwd/v1/idCardNoAuth'
	    return new jlRequest().post(config)
	}
	
	/**
	 *  浏览历史
	 */
	static browseHistory(config = {}){
		config.path = '/api/client/mine/history/v1/page'
		return new jlRequest().post(config)
	}
	
	/**
	 * 历史浏览保存
	 */
	static saveHistory(config = {}){
	    config.path = '/api/client/mine/history/v1/save'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 店铺藏品-查看审核拒绝/下架原因
	 */
	static shopNftRemark(config = {}){
	    config.path = '/api/client/mine/shop/v1/shopNftRemark'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 粉丝贡献单排行榜
	 */
	static artFans(config = {}){
	    config.path = '/api/client/mine/v1/artFans'
	    return new jlRequest().post(config)
	}
	
	
	/**
	 * 我的团队信息
	 */
	static myGroup(config = {}){
	    config.path = '/api/client/mine/group/v1/info'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 店铺藏品-查看发行量和库存数量
	 */
	static shopNftStock(config = {}){
	    config.path = '/api/client/mine/shop/v1/shopNftStock'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 店铺藏品-修改发行量
	 */
	static updateNftIssueCount(config = {}){
	    config.path = '/api/client/mine/shop/v1/updateNftIssueCount'
	    return new jlRequest().post(config)
	}
	
	
	/**
	 * 店铺盲盒藏品-查看发行量和库存数量
	 */
	static shopNftBoxStock(config = {}){
	    config.path = '/api/client/mine/shop/v1/shopNftBoxStock'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 店铺盲盒藏品-修改发行量
	 */
	static updateNftBoxIssueCount(config = {}){
	    config.path = '/api/client/mine/shop/v1/updateNftBoxIssueCount'
	    return new jlRequest().post(config)
	}
	
	
	
	
	/**
	 * 我的团队-队员列表
	 */
	static referencesPage(config = {}){
	    config.path = '/api/client/mine/group/v1/referencesPage'
	    return new jlRequest().post(config)
	}
	
	
	/**
	 * 我的团队-间接队员
	 */
	static referencesIndirectPage(config = {}){
	    config.path = '/api/client/mine/group/v1/referencesIndirectPage'
	    return new jlRequest().post(config)
	}
	
	
	/**
	 * 我的团队-活性创作者
	 */
	static activeArtPage(config = {}){
	    config.path = '/api/client/mine/group/v1/activeArtPage'
	    return new jlRequest().post(config)
	}
	
	
	/**
	 * 我的团队-活性创作者粉丝排行榜
	 */
	static activeArtRank(config = {}){
	    config.path = '/api/client/mine/group/v1/activeArtRank'
	    return new jlRequest().post(config)
	}
	
	
	/**
	 * 是否设置密码
	 */
	static havePwd(config = {}){
	    config.path = '/api/client/mine/login/v1/havePwd'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 店铺是否审核中
	 */
	static have(config = {}){
	    config.path = '/api/client/mine/shop/v1/have'
	    return new jlRequest().post(config)
	}
	
	
	/**
	 * 个人信息收集清单
	 */
	static categoryList(config = {}){
	    config.path = '/api/client/sns/v1/categoryList'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 个人信息收集清单子类列表
	 */
	static collect(config = {}){
	    config.path = '/api/client/sns/v1/subClassList'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 个人信息收集清单子类详情
	 */
	static collect(config = {}){
	    config.path = '/api/client/sns/v1/subClassOne'
	    return new jlRequest().post(config)
	}
	
}