/*
 * @description: 
 * @author: 黄升滨，成启航，Lk李铠岚
 * @Date: 2020-07-24 20:14:50
 * @LastEditTime: 2020-07-31 16:53:31
 */ 

import request from "@/utils/request";

// 方法1：
request.get("http://localhost:8080/data.json").then(res => {
    console.log(res.data,111);
}).catch(err => {
    console.log(err)
});

// 方法2
request({
    method:'get',
    url:'http://localhost:8080/data.json'
}).then(res =>{
    console.log(res.data,222)
}).catch(err => {
    console.log(err)
});


// 方法3：工作用的方法
export default {
    getData(){
        return request({
            method:"get",
            url:"http://localhost:8080/data.json"
        })
    }
}