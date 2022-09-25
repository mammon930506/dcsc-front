
import jlConfig from './jlConfig'
import { createContent, resolveContent} from '@/common/utils/tripledes3'
/**
 * 缓存类
 */
export default class jlCatche {
    /**
     * 储存信息异步接口
     * @param {*} key
     * @param {*} value
     */
    static async setStorage(key, value) {
        return new Promise((resolve, reject) => {
            uni.setStorage({
                key: key,
                data: value,
                success: function () {
                    resolve();
                },
                fail: function (e) {
                    reject(e)
                }
            });
        });


    }
    /**
     * 储存信息同步接口
     * 需要结合try catch 使用
     * @param {*} key
     * @param {*} value
     */
    static setStorageSync(key, value) {
        uni.setStorageSync(key, value);
    }
    /**
     * 获取储存信息异步接口
     * @param {*} key
     */
    static async getStorage(key) {
        return new Promise((resolve, reject)=>{
            uni.getStorage({
                key: key,
                success: function (res) {
                    // console.log(res.data);
                    resolve(res.data);
                },
                fail: function (e) {
                    reject(e)
                }
            });
        });

    }
    /**
     * 获取储存信息同步接口
     * 需要结合try catch 使用
     * @param {*} key
     */
    static getStorageSync(key){
        return uni.getStorageSync(key);
    }


    static setEncJSONStorageSync(key, obj) {
        let val = createContent(obj)
        uni.setStorageSync(key, val);
    }

    static getEncJSONStorageSync(key){
        let val = uni.getStorageSync(key);
        if(!val)return {}
        let obj = resolveContent(val)
        return obj
    }

    static setCacheUserInfo(key,value){
        let userInfo = this.getEncJSONStorageSync('userInfo')
        userInfo[key] = value
        this.setEncJSONStorageSync('userInfo',userInfo)
    }

    static getCacheUserInfo(key){
        let userInfo = this.getEncJSONStorageSync('userInfo')
        return userInfo[key]
    }

}
const CatchPrefix = '_Catch_' + jlConfig.appId + '_';
export const KEY_OPENID = CatchPrefix + 'OPENID'; // 微信appid 缓存
export const KEY_QRMIX = CatchPrefix + 'QRMIX'; // 微信二维码缓存地址前缀
export const KEY_TOKEN = CatchPrefix + 'TOKEN'; // 对应缓存token
export const KEY_HEADIMG = CatchPrefix + 'HEADIMG';
export const KEY_NICKNAME = CatchPrefix+ 'NICKNAME'
