import { RouterMount, createRouter } from 'uni-simple-router';
 
const router = createRouter({
	platform: process.env.UNI_PLATFORM,
	routes: [...ROUTES,{"path":"/"}]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
//权限控制登录
	if(to.meta.auth){
		console.log("需要登录");
		if("token"){
			next();
		}else{
			console.log("请登录");
		}
	}else{
		console.log("不需要登录");
         next();
	}
	
	console.log("前置守卫"+JSON.stringify(to));
	
});
// 全局路由后置守卫
router.afterEach((to, from) => {
	console.log('跳转结束')
})
 
export {
	router,
	RouterMount
}