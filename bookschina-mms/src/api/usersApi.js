/*
 * @description: 
 * @author: 黄升滨，成启航，Lk李铠岚
 * @Date: 2020-07-31 10:26:00
 * @LastEditTime: 2020-07-31 16:53:37
 */ 

import request from "@/utils/request";

export default {
    // 验证用户名是否存在
    checkName(name) {
        return request.get('/user/checkname', {
            params: {
                name
            }
        })
    },

    // 注册
    reg(username,password) {
        return request.post('/manager/reg', {
            username,
            password
        })
    },

    // 登录
    login(username,password) {
        return request.get('/manager/login',{
            params:{
                username,
                password
            }
        })
    },

    // 修改密码
    editPwd(username,password,uid) {
        return request.put('/manager/modify/' + uid,{
            username,
            password
        })
    },
    
    // 校验token
    checkToken(token){
        return request.get('/manager/verify',{
            params:{
                token
            }
        })
    },

    // 获取用户列表
    getList(page,pagesize,search){
        return request.get('manager/userlist',{
            params:{
                page,      //当前第n页
                pagesize,  //一页显示xx条
                search     //查询条件
            }
        })
    },

    // 新增用户
    addUser(form){
        // console.log(form,"添加新用户")
        return request({
            method:"post",
            url:"/manager/add",
            headers:{ 'Content-Type': 'multipart/form-data' },
            data:form
        })
    },

    // 编辑用户信息
    editUser(form){
        return request({
            method:'put',
            url:"/manager/edit",
            headers:{
                'Content-Type': 'multipart/form-data',
            },
            data:form
        })
    },

    //功能：删除图片
    delPic(user_id, url) {
        return request({
            method: 'delete',
            url: '/manager/delimg',
            data: {
                user_id,
                url
            }
        })
    },

    //功能：删除用户
    delUser(id) {
        return request({
            method: 'delete',
            url: '/manager/del/' + id
        })
    }
}