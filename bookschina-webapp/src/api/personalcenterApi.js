// 引入request
import request from "@/utils/request";

export default {
    // 获取个人用户信息
    getUserInf(id){
        return request.get("user/checkId", {
            params: {
                id
            }
        });
    },

    // 修改个人用户信息
    updateUserInf(form) {
        return request({
            method: "put",
            url: "user/editquery",
            headers:{
                'Content-Type': 'multipart/form-data',
            },
            data: form
        });
    }
}