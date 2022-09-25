/**
 * 通用工具方法
 */
export default class util{
    /**
     * 金额格式化
     * @param {*} s 具体金额
     */
    static formatAmt(s) {
        var reg = /^[0-9]+.?[0-9]*$/;
        if (!reg.test(s)) {
            return s;
        }
        var n = 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1];
        var t = "";
        for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    }
    /**
     * 判断是否包含表情
     * @param {*} substring 
     */
    static isEmojiCharacter(substring) {
        for (var i = 0; i < substring.length; i++) {
            var hs = substring.charCodeAt(i);
            if (0xd800 <= hs && hs <= 0xdbff) {
                if (substring.length > 1) {
                    var ls = substring.charCodeAt(i + 1);
                    var uc = (hs - 0xd800) * 0x400 + (ls - 0xdc00) + 0x10000;
                    if (0x1d000 <= uc && uc <= 0x1f77f) {
                        return true;
                    }
                }
            } else if (substring.length > 1) {
                var lss = substring.charCodeAt(i + 1);
                if (lss == 0x20e3) {
                    return true;
                }
            } else {
                if (0x2100 <= hs && hs <= 0x27ff) {
                    return true;
                } else if (0x2b05 <= hs && hs <= 0x2b07) {
                    return true;
                } else if (0x2934 <= hs && hs <= 0x2935) {
                    return true;
                } else if (0x3297 <= hs && hs <= 0x3299) {
                    return true;
                } else if (
                    hs == 0xa9 ||
                    hs == 0xae ||
                    hs == 0x303d ||
                    hs == 0x3030 ||
                    hs == 0x2b55 ||
                    hs == 0x2b1c ||
                    hs == 0x2b1b ||
                    hs == 0x2b50
                ) {
                    return true;
                }
            }
        }
    }
	/**
	 * 格式化日期
	 * @param {Object} value
	 * @param {Object} format
	 */
	static formatDate(value, format){
	  if (value) {
	    value = value.replace(/-/g, '/');
	  }
	  var Dates = new Date(value);
	  var year = Dates.getFullYear();
	  var month = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
	  var day = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
	  var h = Dates.getHours();
	  var m = Dates.getMinutes();
	  var s = Dates.getSeconds();
	  return format.replace("yyyy", util.pad(year, 4) + "").replace("MM", util.pad(month, 2) + "").replace("dd", util.pad(day, 2) + "").replace("HH", util.pad(h, 2) + "").replace("mm", util.pad(m, 2) + "").replace("ss", util.pad(s, 2) + "");
	}
    static pad(num, n) {
      var y = '00000000000000000000000000000' + num; //爱几个0就几个，自己够用就行
      return y.substr(y.length - n);
    }
}