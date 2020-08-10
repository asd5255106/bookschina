// 引入request
import request from "@/utils/request";

export default {
    // 获取home数据
    getTuiJian() {
        return request.get("good/checktui");
    },
    //点击退出
    logOut() {
        var now = new Date();
        now.setDate(now.getDate() - 1);
        // removeCookie("bookchina-webapp-user");
        // removeCookie("bookschina-mms-token");3
        document.cookie = `bookchina-webapp-user="";expires=${now};path=/`;
        document.cookie = `bookschina-webapp-token="";expires=${now};path=/`;
    },
    // 获取用户信息
    getUserInf(id){
        return request.get("user/checkId", {
            params: {
                id
            }
        });
    },
}