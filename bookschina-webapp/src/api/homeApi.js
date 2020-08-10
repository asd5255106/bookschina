// 引入request
import request from "@/utils/request";

export default {
    // 获取home数据
    getHomeList() {
        return request.get("good/checkindexall");
    },

    // 获取首页畅销榜的商品
    getSellhotList() {
        return request.get("good/checkindexlist");
    }
}