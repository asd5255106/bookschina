/*
 * @description: 
 * @author: 黄升滨，成启航，Lk李铠岚
 * @Date: 2020-07-31 16:51:38
 * @LastEditTime: 2020-08-01 17:14:00
 */

import request from "@/utils/request";

export default {
    getcarts(user_id) {
        return request.get("/ord/checkord", {
            params: {
                user_id
            }
        })
    },

    // 增减数量
    changeNum(user_id, good_id, Positive) {
        return request.put("/ord/upord", {
            user_id,
            good_id,
            Positive
        })
    },

    // 删除订单
    // deleteO(user_id,good_id){
    //     console.log(user_id,good_id)
    //     return request.delete("/ord/delord",{
    //         user_id:`${user_id}`,
    //         good_id:`${good_id}`
    //     })
    // },
    // 删除订单
    deleteO(user_id, good_id) {
        //   console.log(666)
        //   return request.delete('/ord/delord',{
        //       user_id:user_id,
        //       good_id:good_id
        //   })
        // return request.put("/ord/upord",{
        //     user_id,
        //     good_id,
        //     Positive:"1"
        // })
        return request({
            method: 'delete',
            url: '/ord/delord',
            data: {
                user_id,
                good_id,
            }
        })


    }
}