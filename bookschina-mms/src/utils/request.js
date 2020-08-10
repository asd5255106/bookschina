/*
 * @description: 
 * @author: 黄升滨，成启航，Lk李铠岚
 * @Date: 2020-07-25 16:55:58
 * @LastEditTime: 2020-07-31 16:54:46
 */ 

import axios from "axios";

// 封装
let request = axios.create({
    baseURL:'/dev-api',  //基础路径
    timeout:3000   //请求超时时间：3s；如果3s后都没有响应，我就断开请求
})


export default request;//封装好就导出request