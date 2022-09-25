import jlRequest from '@/common/utils/jlRequest'

/**
 * 我的-资金管理相关接口
 */
export default class FundApi {
    /**
     * 获取资金信息
     */
    static myown(config = {}){
        config.path = '/api/client/mine/account/v1/own'
        return new jlRequest().post(config)
    }
	
	/**
	 * 提现-发送验证码
	 */
	static smsPhone(config = {}){
	    config.path = '/api/client/sms/v1/phone'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 提现-校验验证码
	 */
	static smsVerify(config = {}){
	    config.path = '/api/client/sms/v1/verify'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 提现-获取实名信息和余额
	 */
	static accountInfo(config = {}){
	    config.path = '/api/client/mine/account/v1/person'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 提现-计算服务费
	 */
	static withdrawFee(config = {}){
	    config.path = '/api/client/mine/account/v1/service'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 提现-提现申请
	 */
	static withdrawApply(config = {}){
	    config.path = '/api/client/mine/account/v1/cashOut'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 提现-提现记录
	 */
	static withdrawList(config = {}){
	    config.path = '/api/client/mine/account/v1/cashOutList'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 账户和收入明细列表
	 */
	static incomenexpenseList(config = {}){
	    config.path = '/api/client/mine/account/v1/list'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 账户和收入明细详情
	 */
	static incomenexpenseInfo(config = {}){
	    config.path = '/api/client/mine/account/v1/info'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 待入账明细列表
	 */
	static toIncomeList(config = {}){
	    config.path = '/api/client/mine/account/v1/toBeSettled'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 待入账明细详情
	 */
	static toIncomeInfo(config = {}){
	    config.path = '/api/client/mine/account/v1/toBeSettledInfo'
	    return new jlRequest().post(config)
	}
	
	/**
	 * 提现记录
	 */
	static withdrawList(config = {}){
	    config.path = '/api/client/mine/account/v1/cashOutList'
	    return new jlRequest().post(config)
	}
	
	
	
	
}