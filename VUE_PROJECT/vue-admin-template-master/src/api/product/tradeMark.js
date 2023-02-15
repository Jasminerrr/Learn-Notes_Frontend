// 此模块主要获取的是品牌管理的数据

// 引入二次封装的axios
import request from '@/utils/request';

// 获取品牌列表接口
// /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page,limit) =>request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'});

// 添加品牌：POST /admin/product/baseTrademark/save 携带参数：logoUrl品牌logo、tmName品牌名称（不需要传id，id是由服务器生成）

// 修改品牌：PUT /admin/product/baseTrademark/update 参数：id、logoUrl、tmName
export const reqAddOrUpdateTradeMark = (tradeMark) => {
  // 如果有id，则是修改
  if(tradeMark.id){
    return request({url:'/admin/product/baseTrademark/update',method:'put',data:tradeMark})
  }else{
    // 没有id就是添加
    return request({url:'/admin/product/baseTrademark/save',method:'post',data:tradeMark})
  }
}

// 删除品牌的接口：DELETE /admin/product/baseTrademark/remove/{id}
export const reqdeleteTradeMark = (id) =>request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'});


