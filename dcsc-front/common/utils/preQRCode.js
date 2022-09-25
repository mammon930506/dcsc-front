// const jlConfig = require('./jlConfig.js');
import jlCatche from "./jlCatche.js"
import jlConfig,{KEY_QRMIX} from "./jlConfig.js"

var headUrl = '';
/**
 * 预览图片入口
 */
function showQrcode(taskCode, qrCodeUrl, avatarUrl,nickName){ 
  var domain = jlConfig.apiUrl.replace('https://','');
      domain = domain.replace('http://','');
      domain = domain.split('/')[0]; 
	  if(avatarUrl.indexOf("thirdwx.qlogo.cn")>=0){
	  		 avatarUrl = avatarUrl.replace('thirdwx.qlogo.cn', domain + '/wechat_image');
			
	  }else if(avatarUrl.indexOf("wx.qlogo.cn">=0)){
		 avatarUrl = avatarUrl.replace('wx.qlogo.cn', domain + '/wechat_mini_image'); 
	  }
	  avatarUrl = avatarUrl.replace('http://','https://')
	  var mMixUrl = '';
  try{
  	mMixUrl = jlCatche.getStorage(KEY_QRMIX + taskCode)
  }catch(e){
  	//TODO handle the exception
	
  }
  if (mMixUrl && mMixUrl.length > 0){
    uni.getImageInfo({
      src: mMixUrl,
      success: function (res) {
        previewImage(mMixUrl);
      },fail:function (res){
        downloadFiles(qrCodeUrl, avatarUrl, function (lQrCodeUrl, lAvatarUrl) {
          productImg(lQrCodeUrl, lAvatarUrl, nickName, function (url) {
            if (headUrl != '/static/icon_user.png'){
			  try{
			  	jlCatche.setStorage(KEY_QRMIX + taskCode , url)
			  }catch(e){
			  	//TODO handle the exception
			  }
            }
            previewImage(url);
          });
        });
      }
    }) 
  }else{
    // 判断当前路径是否存在
    downloadFiles(qrCodeUrl, avatarUrl, function (lQrCodeUrl, lAvatarUrl) {
      productImg(lQrCodeUrl, lAvatarUrl, nickName, function (url) {
        if (headUrl != '/static/icon_user.png') {
          jlCatche.setStorage(KEY_QRMIX + taskCode , url)
        }
        previewImage(url);
      });
    });
  }
}

/**
 * 下载并返回本地url
 */
function downloadFiles(qrCodeUrl, avatarUrl,success){
  // 下载二维码和头像
  uni.showLoading({
    title:'正在加载...'
  })

  uni.downloadFile({
    url: avatarUrl,
    header: {},
    success: function (res) {
      headUrl = res.tempFilePath;
    },
    fail: function (res) {
      headUrl = '/static/icon_user.png';
      
    },
    complete: function (res) {
      uni.downloadFile({
        url: qrCodeUrl,
        header: {},
        success: function (qrRes) {
          qrCodeUrl = qrRes.tempFilePath;
          // that.productImg(options);
          success(qrCodeUrl, headUrl);
        },
        fail: function (res) {
          uni.hideLoading()
          uni.showToast({
            title: '下载二维码失败',
            icon: 'none'
          })
        },
        complete: function (res) { },
      });
    },
  })
}
/**
 * 生成对应图片
 */
function productImg(qrCodeUrl, avatarUrl, nickName,success){
  var ctx = uni.createCanvasContext("image-cropper", this);
  var width = 1080;
  var height = 1449;
  ctx.width = width;
  ctx.height = height;
  //绘制背景
  ctx.setFillStyle('black');
  ctx.fillRect(0, 0, width, height);//画出矩形白色背景
  ctx.drawImage('/static/share_bg.png', 0, 0,width, height)
  //绘制头像
  ctx.save();
  ctx.beginPath()
  ctx.arc(106+434,106+59,106,0,Math.PI*2,false);
  ctx.stroke();
  ctx.clip();
  ctx.drawImage(avatarUrl, 434, 59, 212, 212);
  ctx.restore();
  
  //绘制圆环
  ctx.save();
  ctx.beginPath()
  ctx.arc(106 + 434, 106 + 59, 106, 0, Math.PI * 2, false);
  ctx.setLineWidth(5);
  ctx.setStrokeStyle('#ffffff');
  ctx.stroke();
  ctx.restore();
  //绘制文字并居中
  var str = nickName;
  var w = width;
  ctx.setFillStyle('#ffffff');
  ctx.setFontSize(40);
  ctx.fillText(str, (w - ctx.measureText(str).width) * 0.5, 325);
  // var str = '分享得红包';
  // var w = width;
  // ctx.setFillStyle('#000000');
  // ctx.setFontSize(40);
  // ctx.fillText(str, (w - ctx.measureText(str).width) * 0.5, 420);
  //绘制二维码
  ctx.drawImage(qrCodeUrl, 291, 579, 500, 500);
  //底部描述文字
  // var str = "*通过“恒丰心怡卡合伙人”小程序生成个人专属二维码，分享";
  // var w = width;
  // ctx.setFillStyle('#ffffff');
  // ctx.setFontSize(32);
  // ctx.fillText(str, 100, 1340);
  // ctx.fillText('还可赚取收益哦！',115,1377);
  ctx.draw(false, () => {
    setTimeout(() => {
      uni.canvasToTempFilePath({
        width: width,
        height: height,
        destWidth: width,
        destHeight: height,
        fileType: 'png',
        quality: 1,
        canvasId: "image-cropper",
        success: (res) => {

          success(res.tempFilePath);
          uni.hideLoading();
        }
      }, this)
    }, 30);
  });
}
/**
 * 本地url
 */
function previewImage(url,fail){
  uni.previewImage({
    current: url,
    urls: [url],
    success: function (res) {
      console.log('成功');
    },
    fail: function (res) {
      console.log('失败');
      if(fail){
        fail();
      }
    },
    complete: function (res) { },
  })
}

export default {
  showQrcode: showQrcode,
}

