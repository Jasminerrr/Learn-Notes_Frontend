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

// 修改SPU|添加SPU：对于修改或添加，携带的参数大致一样，唯一区别时携带的参数是否带id
export const reqAddOrUpdateSpu = (spuInfo) =>{
  // 如果携带参数带有id，则是修改SPU：POST /admin/product/updateSpuInfo
  if(spuInfo.id){
    return request({url:'/admin/product/updateSpuInfo',method:'POST',data:spuInfo})
  }else{
    // 没有id就是添加：POST /admin/product/saveSpuInfo
    return request({url:'/admin/product/saveSpuInfo',method:'post',data:spuInfo})
  }
}

// 删除SPU的接口：DELETE /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) => request({url:`/admin/product/deleteSpu/${spuId}`,method:'DELETE'})

// 获取图片的接口：GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList2 = (spuId) => request({url:`/admin/product/spuImageList/${spuId}`,method:'GET'})

// 获取销售属性的接口：GET /admin/product/spuSaleAttrList/{spuId}
export const reqSpuSaleAttrList = (spuId) => request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'GET'})

// 获取商品基础属性接口：GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = (category1Id,category2Id,category3Id) => request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'GET'})

// 添加SKU ：POST /admin/product/saveSkuInfo
export const reqAddSku = (skuInfo) => request({url:'/admin/product/saveSkuInfo',method:'POST',data:skuInfo})

// 获取SKU列表数据接口：GET /admin/product/findBySpuId/{spuId}
export const reqSkuInfo = (spuId) => request({url:`/admin/product/findBySpuId/${spuId}`,method:'GET'})
