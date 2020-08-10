/*
 * @description: 
 * @author: 黄升滨，成启航，Lk李铠岚
 * @Date: 2020-07-24 20:14:50
 * @LastEditTime: 2020-07-31 16:52:59
 */ 

import request from "@/utils/request";

// request({
//     method:"get",
//     url:"/dev-api/db/sport.json"
// }).then(res => {
//     console.log(res.data,444)
// }).catch(err => {
//     console.log(err)
// })


request({
    method:"get",
    url:"/weibo/api/config/list"
}).then(res => {
    console.log(res.data,444);
}).catch(err => {
    console.log(err)
})