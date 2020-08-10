/*
 * @description: 
 * @author: 黄升滨，成启航，Lk李铠岚
 * @Date: 2020-07-28 19:42:59
 * @LastEditTime: 2020-07-31 16:55:37
 */ 


//  路由守卫
import router from "@/router";   //引入router对象
import { getToken } from "@/utils/auth";
import usersApi from "@/api/usersApi";

/*
权限校验：
    通过router路由前置钩子函数 beforeEach() ，
    在跳转路由前进行拦截判断是否已经登录，
    如果已登录，则进行路由跳转，如果没有则回到登录页
*/
router.beforeEach(async (to, from, next) => {
        /**
         * @to   即将要进入的路由，路由对象
         * @from    准备离开的路由，路由对象
         * @next   是否能进入下一个钩子
         */

        if (to.meta.permission == false) {
            // 登录注册页面不需要拦截
            next();
        } else {
            // 需要拦截的
            let token = getToken();
            if(token) {
                try{
                    let p = await usersApi.checkToken(token);
                    if(p.data.flag){
                        next();
                    }else{
                        next('/login')
                    }
                }catch(err){
                    next("/login");
                }
            }else{
                // 没有token
                next("/login")
            }
        }
})



