export default class faceId{
	static detect (filePath){
		let url = 'https://api-cn.faceplusplus.com/facepp/v3/detect';
		let params={
			api_key:'HYLUL7k3TNs3DxqkgXGSGd8o8sdRWeCE',
			api_secret:'YRrAMP1HCargSaibUxcdoAQZJBHR6Mt1',
		}
		uni.showLoading({
			title: '正在上传...',
		})
		uni.uploadFile({
			url: url,
			filePath: filePath,
			name: 'image_file',
			formData: params,
			success: res => {
				// console.log(res); 
				console.log(res)
				
			},
			fail: res =>  {
					//关闭动画		
				console.log(res)
			},
			complete: function(res) {
		
				uni.hideLoading()
			}
		})
		// {
		//   "face_num" : 1,
		//   "faces" : [
		//     {
		//       "" : "",
		//       "face_rectangle" : {
		//         "height" : 320,
		//         "left" : 146,
		//         "top" : 286,
		//         "width" : 320
		//       },
		//       "face_token" : "9667bef643a1345846d3aad8c6350ceb"
		//     }
		//   ],
		//   "image_id" : "bx8lYYXsFT4PzthDro6Qyg==",
		//   "request_id" : "1590031026,4e680b60-16d7-4965-8f87-69a7fb72df8b",
		//   "time_used" : 701
		// }
		
		// {
		//   "confidence" : 97.086,
		//   "faces2" : [
		//     {
		//       "face_rectangle" : {
		//         "height" : 320,
		//         "left" : 146,
		//         "top" : 286,
		//         "width" : 320
		//       },
		//       "face_token" : "7ee0c37abeb3ca9bc706955c36a7bdf7"
		//     }
		//   ],
		//   "image_id2" : "bx8lYYXsFT4PzthDro6Qyg==",
		//   "request_id" : "1590037821,e3890177-1641-4a3d-b4fc-f5fe4e878e86",
		//   "thresholds" : {
		//     "1e-3" : 62.327,
		//     "1e-4" : 69.101,
		//     "1e-5" : 73.975
		//   },
		//   "time_used" : 502
		// }
		
		// {
		//   "confidence" : 28.26,
		//   "faces2" : [
		//     {
		//       "face_rectangle" : {
		//         "height" : 310,
		//         "left" : 207,
		//         "top" : 378,
		//         "width" : 310
		//       },
		//       "face_token" : "911dc736834df91ee97f27027b267fb5"
		//     }
		//   ],
		//   "image_id2" : "iS9tedehJkdwZ1SFJ8hFfA==",
		//   "request_id" : "1590037915,9c03abaf-7f25-4ea7-9f64-70000f136da1",
		//   "thresholds" : {
		//     "1e-3" : 62.327,
		//     "1e-4" : 69.101,
		//     "1e-5" : 73.975
		//   },
		//   "time_used" : 485
		// }
		
		// {
		//   "confidence" : 87.621,
		//   "faces2" : [
		//     {
		//       "face_rectangle" : {
		//         "height" : 685,
		//         "left" : 151,
		//         "top" : 669,
		//         "width" : 685
		//       },
		//       "face_token" : "7d47839bdc99f2fe093854b9e1e02397"
		//     }
		//   ],
		//   "image_id2" : "ouL4Y2kzsR3qNqMdFJReRg==",
		//   "request_id" : "1590038046,0a8d0f3c-990e-48f8-89d3-501ba668d6d0",
		//   "thresholds" : {
		//     "1e-3" : 62.327,
		//     "1e-4" : 69.101,
		//     "1e-5" : 73.975
		//   },
		//   "time_used" : 1057
		// }
		// {
		//   "confidence" : 82.759,
		//   "faces2" : [
		//     {
		//       "face_rectangle" : {
		//         "height" : 188,
		//         "left" : 715,
		//         "top" : 817,
		//         "width" : 188
		//       },
		//       "face_token" : "7e9abc74ee297703b2ecb8ab5bf79756"
		//     }
		//   ],
		//   "image_id2" : "sKnimvroFgVn4q0MXCmImQ==",
		//   "request_id" : "1590038822,e1da7a3b-f107-4438-91ff-cdf7e87f8b6a",
		//   "thresholds" : {
		//     "1e-3" : 62.327,
		//     "1e-4" : 69.101,
		//     "1e-5" : 73.975
		//   },
		//   "time_used" : 914
		// }
	}
	static compareImg(filePath){
		let url = 'https://api-cn.faceplusplus.com/facepp/v3/compare';
		let params={
			api_key:'HYLUL7k3TNs3DxqkgXGSGd8o8sdRWeCE',
			api_secret:'YRrAMP1HCargSaibUxcdoAQZJBHR6Mt1',
			face_token1:'9667bef643a1345846d3aad8c6350ceb',//46c51633ac8547a764640fe6a537060d
			
		}
		uni.showLoading({
			title: '正在上传...',
		})
		uni.uploadFile({
			url: url,
			filePath: filePath,
			name: 'image_file2',
			formData: params,
			success: res => {
				// console.log(res); 
				console.log(res)
				
			},
			fail: res =>  {
					//关闭动画		
				console.log(res)
			},
			complete: function(res) {
		
				uni.hideLoading()
			}
		})
	}
	jumpUrl(){
		location.href = 'https://api.megvii.com/faceid/lite/do?token=' + this.token;
	}
	
	
}
	