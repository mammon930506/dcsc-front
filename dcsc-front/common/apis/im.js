import jlRequest from '@/common/utils/jlRequest'

/**
 * 即时通讯IM相关接口
 */
export default class IMApi {
	/**
	 * 获取usersig
	 */
	static getUsersig(config = {}){
	    config.path = '/api/client/im/v1/getUsersig'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 获取未读计数
	 */
	static getUnreadMsgNum(config = {}){
	    config.path = '/api/client/im/v1/getUnreadMsgNum'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 获取我的群聊
	 */
	static getMyOwnGroup(config = {}){
	    config.path = '/api/client/im/v1/ownGroup'
	    return new jlRequest().post(config)
	}
	
}