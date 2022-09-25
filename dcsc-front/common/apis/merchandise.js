import jlRequest from '@/common/utils/jlRequest'

/**
 * 尚品相关接口
 */
export default class MerchandiseApi {
    /**
     * 默认尚品
     */
    static content(config = {}){
        config.path = '/api/client/nft/v1/content'
        return new jlRequest().post(config)
    }
	
	/**
	 * 更多尚品
	 */
	static moreContent(config = {}){
	    config.path = '/api/client/nft/v1/moreContent'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 尚品类型获取
	 */
	static classifyType(config = {}){
	    config.path = '/api/client/nft/v1/classifyType'
	    return new jlRequest().post(config)
	}

	/**
	 * 根据尚品类型获取列表
	 */
	static listByClassify(config = {}){
	    config.path = '/api/client/nft/v1/listByClassify'
	    return new jlRequest().post(config)
	}

	/**
	 * 尚品搜索
	 */
	static search(config = {}){
	    config.path = '/api/client/nft/v1/search'
	    return new jlRequest().post(config)
	}
	
/* 	没code没关键词用/api/client/nft/v1/content，更多用/api/client/nft/v1/moreContent。
	有code没关键词用/api/client/nft/v1/listByClassify。
	有code有关键词用/api/client/nft/v1/search。 */
	
	/**
	 * 尚品详情
	 */
	static info(config = {}){
	    config.path = '/api/client/nft/v1/info'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 盲盒尚品详情
	 */
	static blindBoxInfo(config = {}){
	    config.path = '/api/client/nft/v1/bindBox'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 尚品收藏
	 */
	static storeUp(config = {}){
	    config.path = '/api/client/nft/v1/storeUp'
	    return new jlRequest().post(config)
	}
	
	
	/**
	 * 最近购买
	 */
	static recentBuyers(config = {}){
	    config.path = '/api/client/nft/v1/listByOrderDate'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 创建订单
	 */
	static createOrder(config = {}){
	    config.path = '/api/client/order/v1/create'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 订单支付
	 */
	static payOrder(config = {}){
	    config.path = '/api/client/order/v1/pay'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 支付订单详细
	 */
	static payInfo(config = {}){
	    config.path = '/api/client/order/v1/info'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 订单列表
	 */
	static orderList(config = {}){
	    config.path = '/api/client/order/v1/list'
	    return new jlRequest().post(config)
	}
	
	
	/**
	 * 支付取消
	 */
	static orderCancel(config = {}){
	    config.path = '/api/client/order/v1/cancel'
	    return new jlRequest().post(config)
	}
	
	
	/**
	 * 藏品分享-文案分类列表
	 */
	static copyClassifyList(config = {}){
	    config.path = '/api/client/copy/v1/copyClassifyList'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 藏品分享-文案模板列表数据
	 */
	static copyWriteList(config = {}){
	    config.path = '/api/client/copy/v1/copyWriteList'
	    return new jlRequest().post(config)
	}
	
	
	
	/**
	 * 账户余额
	 */
	static accountBalance(config = {}){
	    config.path = '/api/client/mine/account/v1/own'
	    return new jlRequest().post(config)
	}
	

}
	