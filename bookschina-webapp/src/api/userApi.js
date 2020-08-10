// 引入request
import request from "@/utils/request";

export default {
    // 验证用户名是否存在
    checkName(name) {
        return request.get("user/checkname", {
            params: {
                name
            }
        })
    },

    // 注册
    reg(username, password, address, Telephone) {
        return request.post("user/reg", {
            username,
            password,
            address, Telephone
        })
    },

    // 登录
    login(name, pwd) {
        return request.get("user/login", {
            params: {
                name,
                pwd
            }
        });
    },

    // 校验token
    checkToken(token){
        return request.get('user/verify',{
            params:{
                token
            }
        })
    },
}