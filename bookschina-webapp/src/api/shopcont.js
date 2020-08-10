// 引入request
import request from "@/utils/request";

export default {
    // 获取home数据
    getShopCont(id) {
        // console.log(id)
        return request.get("good/checkscont", {
            params: {
                id
            }
        });
    },
    //获取订单的总数量
    getNum(user_id) {
        return request.get("ord/checknum", {
            params: {
                user_id
            }
        });
    }

}