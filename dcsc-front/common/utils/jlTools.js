/**
 * 和项目相关工具方法
 */
export default class jlTools{
    /**
     * 我的业绩-申请状态
     * @param {*} value 
     */
    static sugestState(value){
        if (value == 10) {
            return '成功';
        }
        if (value == 20) {
            return '审核中';
        }
        if (value == 30) {
            return '失败';
        }
        return "未知";
    }
}