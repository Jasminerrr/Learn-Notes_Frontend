// spu管理模块文件

// 引入二次封装的axios
import request from '@/utils/request';
// 获取spu列表数据的接口：GET /admin/product/{page}/{limit} 参数：page,limit,category3Id
export const reqSpuList = (page,limit,category3Id) => request({url:`/admin/product/${page}/${limit}`,method:'GET',params:{category3Id}})

// 获取SPU信息：GET /admin/product/getSpuById/{spuId}
export const reqSpu = (spuId) => request({url:`/admin/product/getSpuById/${spuId}`,method:'GET'})

// 获取品牌信息的接口：GET /admin/product/baseTrademark/getTrademarkList
export const reqTrademarkList = () => request({url:'/admin/product/baseTrademark/getTrademarkList',method:'GET'})

// 获取spu图片接口：GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => request({url:`/admin/product/spuImageList/${spuId}`,method:'GET'})

// 获取平台全部销售属性，整个平台销售属性一共3个：GET /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = () => request({url:'/admin/product/baseSaleAttrList',method:'GET'})

