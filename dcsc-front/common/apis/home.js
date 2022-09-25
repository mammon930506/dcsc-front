import jlRequest from '@/common/utils/jlRequest'

/**
 * 首页相关接口
 */
export default class HomeApi {
    /**
     * 获取默认内容
     */
    static content(config = {}){
        config.path = '/api/client/homePage/v1/content'
        return new jlRequest().post(config)
    }
	
	/**
	 * 获取更多内容
	 */
	static moreContent(config = {}){
	    config.path = '/api/client/homePage/v1/moreContent'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 热门搜索
	 */
	static hotsKeyWords(config = {}){
	    config.path = '/api/client/hotwords/v1/listPage'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 搜索
	 */
	static search(config = {}){
	    config.path = '/api/client/homePage/v1/search'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 广告详情
	 */
	static advertInfo(config = {}){
	    config.path = '/api/client/advert/v1/info'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 关注内容
	 */
	static followingTimeline(config = {}){
	    config.path = '/api/client/homePage/v1/content'
	    return new jlRequest().post(config)
	}



	
}