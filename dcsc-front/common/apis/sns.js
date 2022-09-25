import jlRequest from '@/common/utils/jlRequest'

/**
 * 社区相关接口
 */
export default class SnsApi {
    /**
     * 获取默认内容
     */
    static content(config = {}){
        config.path = '/api/client/sns/v1/content'
        return new jlRequest().post(config)
    }
	
	/**
	 * 社区首页分页获取笔记
	 */
	static notePage(config = {}){
	    config.path = '/api/client/sns/v1/notePage'
	    return new jlRequest().post(config)
	}
	
	
	/**
	 * 更多内容
	 */
	static moreContent(config = {}){
	    config.path = '/api/client/sns/v1/moreContent'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 话题详情
	 */
	static topicDetail(config = {}){
	    config.path = '/api/client/subject/v1/info'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 笔记详情
	 */
	static postDetail(config = {}){
	    config.path = '/api/client/note/v1/info'
	    return new jlRequest().post(config)
	}	
	
	/**
	 * 发布笔记
	 */
	static postPublish(config = {}){
	    config.path = '/api/client/note/v1/publish'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 收藏话题
	 */
	static topicStoreUp(config = {}){
	    config.path = '/api/client/subject/v1/storeUp'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 收藏笔记
	 */
	static postStoreUp(config = {}){
	    config.path = '/api/client/note/v1/storeUp'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 点赞笔记
	 */
	static postLike(config = {}){
	    config.path = '/api/client/note/v1/likes'
	    return new jlRequest().post(config)
	}
	

	/**
	 * 评论笔记
	 */
	static noteReply(config = {}){
	    config.path = '/api/client/note/v1/noteReply'
	    return new jlRequest().post(config)
	}

	/**
	 * 转发笔记
	 */
	static forward(config = {}){
	    config.path = '/api/client/note/v1/forward'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 关注用户
	 */
	static followUser(config = {}){
	    config.path = '/api/client/mine/v1/toAttention'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 查询个人信息
	 */
	static myInfo(config = {}){
	    config.path = '/api/client/mine/info/v1/info'
	    return new jlRequest().post(config)
	}
	
}