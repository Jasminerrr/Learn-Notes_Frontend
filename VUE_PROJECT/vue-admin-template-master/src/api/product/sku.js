// sku管理模块文件

// 引入二次封装的axios
import request from '@/utils/request';

// 获取SKU列表数据接口：GET /admin/product/list/{page}/{limit}
export const reqSkuList = (page,limit) => request({url:`/admin/product/list/${page}/${limit}`,method:'GET'})

// 上架商品接口：GET /admin/product/onSale/{skuId}
export const reqSale = (skuId) => request({url:`/admin/product/onSale/${skuId}`,method:'GET'})


// 下架接口：GET /admin/product/cancelSale/{skuId}
export const reqCancel = (skuId) => request({url:`/admin/product/cancelSale/${skuId}`,method:'GET'})


