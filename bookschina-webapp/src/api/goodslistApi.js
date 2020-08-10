// 引入request
import request from "@/utils/request";

export default {
    // 获取商品列表数据
    // getGoodsList1() {
    //     return request.get("good/checkgoods");
    // },

    // 获取筛选后的数据
    // getFilterList1(opt, sort) {
    //     return request.get("good/checkindexlist", {
    //         params: {
    //             opt, sort
    //         }
    //     });
    // },

    // 获取分页的商品列表数据
    getGoodsList(page, pagesize) {
        return request.get("good/list", {
            params: {
                page, pagesize
            }
        });
    },

    // 获取分页的筛选后的数据
    getFilterList(page, pagesize, opt, sort) {
        return request.get("good/checksortfenye", {
            params: {
                page, pagesize, opt, sort
            }
        });
    },

    // 加入购物车
    addCar(good_id, user_id) {
        return request.post("good/addshop", {
            good_id, user_id
        })
    },

    // 根据good_id查询
    checkoutid(id){
        return request({
            method:'get',
            url:'/good/checkgondid',
            params:{
                id
            }

        })
    }
}