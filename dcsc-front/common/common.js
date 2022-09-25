import jlCatche, {KEY_TOKEN} from "@/common/utils/jlCatche";
import {
		MyIM
	} from "@/common/im/im.js"

/**
 * 通用js方法封装处理
 * Copyright (c) 2019 aidex
 */

export function replaceAll(text, stringToFind, stringToReplace) {
	if (stringToFind == stringToReplace) return this;
	var temp = text;
	var index = temp.indexOf(stringToFind);
	while (index != -1) {
		temp = temp.replace(stringToFind, stringToReplace);
		index = temp.indexOf(stringToFind);
	}
	return temp;
}

// export function isPhone(val) {
// 	var isMob =
// 		/^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[012356789][0-9]{8}|14[57][0-9]{8}|17[3678][0-9]{8})$/
// 	return val && isMob.test(val);
// }

export function getUrlValue(kValue) {
	var url = window.location.href;
	var reg = /([^?&=]+)=([^?&=]+)/g,
		obj = {},
		str = url;
	url.replace(reg, function() {
		obj[arguments[1]] = arguments[2];
	})
	for (var keyName in obj) {
		if (keyName == kValue) {
			return obj[keyName];
			// break;
		}
	}
}

export function base64ToBlob(base64Data) {
	let arr = base64Data.split(',')
	let fileType = arr[0].match(/:(.*?);/)[1]
	let bstr = atob(arr[1])
	let l = bstr.length
	let u8Arr = new Uint8Array(l)
	while (l--) {
		u8Arr[l] = bstr.charCodeAt(l)
	}
	return new Blob([u8Arr], {
		type: fileType
	})
}

export function base64ToPngApp(b64Str,imgName){
	return new Promise((resolve,reject)=>{
		let bitmap = new plus.nativeObj.Bitmap(imgName)
		bitmap.loadBase64Data(b64Str,()=>{
			bitmap.save(`_img/${imgName}.png`,{},res=>{
				bitmap.clear()
				resolve(res)
			},err=>{ 
				bitmap.clear()
				reject(err)
			})
		},err=>{
			bitmap.clear()
			reject(err)
		})
	})
}


export function snsImgs(post){
	if(!post.imgs){
		post.imgs = []
		return
	}
	post.realImgs = JSON.parse(post.imgs)
	let temp = JSON.parse(post.imgs)
	post.imgCount = temp.length
	post.imgs = []
	if(post.imgCount===1){
		post.imgs = [temp]
	}else if(post.imgCount==4){
		for(let i=0;i<2;i++){
			post.imgs.push(temp.splice(0,2))
		}
	}else{
		while(Math.floor(temp.length/3)>0){
			post.imgs.push(temp.splice(0,3))
		}
		if(temp.length>0){
			post.imgs.push(temp)
		}
	}
	//话题字段处理
	if(post.subjects){
		post.subjectList = post.subjects
	}else if(post.subjectCode&&post.subjectName){
		let codeList=post.subjectCode.split(',')
		let nameList=post.subjectName.split(',')
		if(codeList.length!==nameList.length){
			this.$u.toast('话题出错')
		}else{
			post.subjectList = []
			for(let i=0;i<codeList.length;i++){
				post.subjectList[i] = {
					subjectName:nameList[i],
					subjectCode:codeList[i]
				}
			}
		}
	}

	//转发尚品字段处理
	if(post.forRemarks){
		post.forRemarks = JSON.parse(post.forRemarks)
	}

}

export function cent2yuan(centVal){
	return centVal&&(Number(centVal)/100).toFixed(2)
}

export function payJump(actionurl,name){
	let form=document.createElement("form")
	form.id="pay_form"
	form.name="pay_form"
	form.action = actionurl
	form.method = "POST"
	let input = document.createElement("input")
	input.type='hidden'
	input.name = name
	form.appendChild(input)
	document.body.appendChild(form)
	document.pay_form.submit()
}

export function calScrollHeight(reduce,isPx){
	reduce = reduce||0
	let systemInfo=  uni.getSystemInfoSync()
	let ratio = systemInfo.windowWidth/750
	if(isPx){
		reduce = reduce/ratio
	}
	let res = systemInfo.windowHeight/ratio-reduce+'rpx'
	// uni.showToast({
	// 	title:res
	// })
	return res
}

export function validPhone(phone){
	if(/\D/.test(phone)){
		return false
	}
	if(phone.length!==11){
		return false
	}
	return true
}

export function luhnCheck(bankno) {
	if(/\D/.test(bankno)){
		return false
	}
	if(bankno.length<15||bankno.length>25){
		return false
	}
	return true

	// var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhn进行比较）
	// var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
	// var newArr = new Array();
	// for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
	// 	newArr.push(first15Num.substr(i, 1));
	// }
	// var arrJiShu = new Array(); //奇数位*2的积 <9
	// var arrJiShu2 = new Array(); //奇数位*2的积 >9
	// var arrOuShu = new Array(); //偶数位数组
	// for (var j = 0; j < newArr.length; j++) {
	// 	if ((j + 1) % 2 == 1) { //奇数位
	// 		if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);
	// 		else arrJiShu2.push(parseInt(newArr[j]) * 2);
	// 	} else //偶数位
	// 	arrOuShu.push(newArr[j]);
	// }
	// var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
	// var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
	// for (var h = 0; h < arrJiShu2.length; h++) {
	// 	jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
	// 	jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
	// }
	// var sumJiShu = 0; //奇数位*2 < 9 的数组之和
	// var sumOuShu = 0; //偶数位数组之和
	// var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
	// var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
	// var sumTotal = 0;
	// for (var m = 0; m < arrJiShu.length; m++) {
	// 	sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
	// }
	// for (var n = 0; n < arrOuShu.length; n++) {
	// 	sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
	// }
	// for (var p = 0; p < jishu_child1.length; p++) {
	// 	sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
	// 	sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
	// }
	// //计算总和
	// sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
	// //计算luhn值
	// var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
	// var luhn = 10 - k;
	// if (lastNum == luhn) {
	// 	// $("#banknoInfo").html("luhn验证通过");
	// 	return true;
	// } else {
	// 	// $("#banknoInfo").html("银行卡号必须符合luhn校验");
	// 	return false;
	// }
}

export function relogin(){
	jlCatche.setStorageSync(KEY_TOKEN,'')
	jlCatche.setStorageSync("userInfo",'')
	MyIM.logout()
	let des = "会话过期，请重新登录";
	uni.showToast({
		icon:'none',
		title:des,
		duration:4000
	})
	setTimeout(()=>{
		uni.navigateTo({
			url:"/pages/sys/login/index"
		})
	},3000)
}

export function obj2query(obj) {
	if (obj) {
		let query = ""
		for (let i in obj) {
			let value = obj[i]
			if (Array.isArray(value)) {
				value = value.join(",")
			}
			query += `&${i}=${value}`
		}
		query = query.replace('&', '?')
		return query
	}
	return ""
}


export function stamp2date(item_date) {
  let date = new Date(parseInt(item_date) * 1000);
  let YY = date.getFullYear() + "-";
  let MM =
	(date.getMonth() + 1 < 10
	  ? "0" + (date.getMonth() + 1)
	  : date.getMonth() + 1) + "-";
  let DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let hh =
	(date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  let mm =
	(date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
	":";
  let ss =
	date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return YY + MM + DD + " " + hh + mm + ss;
}
