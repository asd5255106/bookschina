/*
 * @description: 
 * @author: 黄升滨，成启航，Lk李铠岚
 * @Date: 2020-07-30 10:40:55
 * @LastEditTime: 2020-07-31 16:53:11
 */ 
import request from "@/utils/request";
export default {
    // 书名查询
    getList(page,pagesize,search){
        return request.get('manager/goodlist',{
            params:{
                page,
                pagesize,
                search        //查询条件
            }
        })
    },
    // 价格查询
    goodList(page,pagesize,search){
        return request.get('/manager/goodprice',{
            params:{
                page,
                pagesize,
                search
            }
        })
    },
    
    // 新增商品
    addGood(form){
        return request({
            method:"post",
            url:"/manager/addgood",
            headers:{ 'Content-Type': 'multipart/form-data' },
            data:form
        })
    },

    // 删除图片
    delPic(good_id) {
        return request({
            method: 'delete',
            url: '/manager/delimgg',
            data: {
                good_id,
            }
        })
    },

    // 编辑商品信息
    editGood(form){
        return request({
            method:'put',
            url:"/manager/editgood",
            headers:{
                'Content-Type': 'multipart/form-data',
            },
            data:form
        })
    },

    //功能：删除商品
    delGood(good_id) {
        return request({
            method: 'delete',
            url: '/manager/delg/' + good_id
        })
    }
}