import jlRequest from '@/common/utils/jlRequest'

/**
 * 店铺相关接口
 */
export default class StoreApi {
    /**
     * 艺术家详情（他人查看）
     */
    static artistInfo(config = {}){
        config.path = '/api/client/user/v1/info'
        return new jlRequest().post(config)
    }
	
	/**
	 * 艺术家详情（他人查看）-帖子分页
	 */
	static artistNoteInfo(config = {}){
	    config.path = '/api/client/user/v1/noteInfo'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 艺术家详情（他人查看）-尚品分页
	 */
	static artistNftInfo(config = {}){
	    config.path = '/api/client/user/v1/nftInfo '
	    return new jlRequest().post(config)
	}

    /**
     * 店铺详情（他人查看）
     */
    static storeInfo(config = {}){
        config.path = '/api/client/artist/shop/v1/info'
        return new jlRequest().post(config)
    }
	
	/**
	 * 店铺尚品列表    
	 */
	static nft(config = {}){
	    config.path = '/api/client/artist/shop/v1/nft'
	    return new jlRequest().post(config)
	}
	
	
	/**
	 * 我的-申请开店    
	 */
	static myStoreApply(config = {}){
	    config.path = '/api/client/mine/auth/v1/shopPerson'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 我的-店铺是否审核中    
	 */
	static myStoreAuditing(config = {}){
	    config.path = '/api/client/mine/shop/v1/have'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 我的-撤销申请
	 */
	static myStoreAuditCancel(config = {}){
	    config.path = '/api/client/mine/shop/v1/cancel'
	    return new jlRequest().post(config)
	}
	
	
	/**
	 * 我的-发布盲盒-选择尚品
	 */
	static chooseNft(config = {}){
	    config.path = '/api/client/mine/shop/v1/chooseNft'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 我的-发布盲盒尚品
	 */
	static publishBindBox(config = {}){
	    config.path = '/api/client/mine/shop/v1/publishBindBox'
	    return new jlRequest().post(config)
	}
	

	
	
}