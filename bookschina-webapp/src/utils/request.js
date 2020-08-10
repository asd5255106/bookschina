import axios from "axios";

// 封装
let request = axios.create({
    baseURL:'/dev-api',  //基础路径
    timeout:10000   //请求超时时间：10s；如果3s后都没有响应，我就断开请求
})

// 封装好就导出request
export default request;