import jlRequest from '@/common/utils/jlRequest'

/**
 * 经济人相关接口
 */
export default class BrokerApi {
    /**
     * 经济人信息查看
     */
    static brokerInfo(config = {}){
        config.path = '/api/client/mine/broker/v1/info'
        return new jlRequest().post(config)
    }
	
	/**
	 * 经济人艺术家排行
	 */
	static rankArtist(config = {}){
	    config.path = '/api/client/mine/broker/v1/rankArt'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 经济人藏品排行
	 */
	static rankNft(config = {}){
	    config.path = '/api/client/mine/broker/v1/rankNft'
	    return new jlRequest().post(config)
	}
	
	
}