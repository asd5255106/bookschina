/*
 * @description: 
 * @author: 黄升滨，成启航，Lk李铠岚
 * @Date: 2020-07-31 10:26:00
 * @LastEditTime: 2020-07-31 16:56:08
 */ 

import request from "@/utils/request";

export default {
    getBookList(){
        return request.get("/good/checkfenlei")
    }
}