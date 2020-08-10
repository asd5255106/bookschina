import request from "@/utils/request";

export default {
    // 书名查询
    getList(page,pagesize,search){
        return request.get('manager/ordlist',{
            params:{
                page,
                pagesize,
                search        //查询条件
            }
        })
    },

    // 编辑商品信息
    editOrder(form){
        return request({
            method:'put',
            url:"manager/editord",
            headers:{
                'Content-Type': 'multipart/form-data',
            },
            data:form
        })
    },

}