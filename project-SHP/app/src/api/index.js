// 统一管理项目API接口的模块 
// 引入二次封装的axios（带有请求、响应的拦截器）
import requests from "./ajax";
import mockRequests from './mockAjax'

// 注意：发请求：axios发请求返回结果Promise对象
// 三级联动接口 /api/product/getBaseCategoryList get 无参数
// 对外暴露一个函数，只要外部调用这个函数 就可以像服务器发Ajax请求、获取三级菜单数据。
// 注意：当前函数执行需要把服务器返回的数据返回
export const reqgetCategoryList = ()=>{
  return requests.get(`/product/getBaseCategoryList`);
}
// 获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get('/banner')

// 获取floor组件的数据
export const reqFloorList = () => mockRequests.get('/floor')

// 获取search模块数据 地址：/api/list 请求方式：post 参数：需要
/* {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
} */
export const reqGetSearchInfo = (params) =>requests({url:'/list',method:'POST',data:params})

// 获取产品详情信息的接口，地址：/api/item/{ skuId }，请求方式：get
export const reqGoodsInfo = (skuId)=> requests({url:`/item/${skuId}`,method:'get'})

// 产品加购或更新产品个数的接口 
// 地址：/api/cart/addToCart/{ skuId }/{ skuNum } 请求：post 参数：skuId、skuNum
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

// 获取购物车列表数据的接口
// URL:/api/cart/cartList GET 无参数
export const reqCartList = () => requests({url:'/cart/cartList',method:'get'})

// 删除购车产品的接口
// URL:/api/cart/deleteCart/{skuId}   DELITE 参数：skuId
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

// 修改商品选中状态的接口
// url:/api/cart/checkCart/{skuId}/{isChecked}  GET  参数：skuId，isChecked
export const reqUpdataCheckedById = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 获取验证码的接口
// url:/api/user/passport/sendCode/{phone}  GET  参数：phone
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

// 用户注册的接口
// url:/api/user/passport/register   POST  参数：phone，password，code  此处带data:data 省略v
export const reqUserRegister = (data) => requests({url:'/user/passport/register',data,method:'post'})

// 用户登录接口
// url:/api/user/passport/login  POST 参数：phone，password
export const reqUserLogin = (data) => requests({url:`/user/passport/login`,data,method:'post'})

// 获取用户信息
// url:/api/user/passport/auth/getUserInfo  GET  无参数
export const reqUserInfo = () => requests({url:'/user/passport/auth/getUserInfo',method:'get'})

// 退出登录的接口
// url:/api/user/passport/logout  GET  无参数
export const reqLogout = () => requests({url:'/user/passport/logout',method:'get'})

// 获取用户地址信息
// url:/api/user/userAddress/auth/findUserAddressList  GET
export const reqAddressInfo = () => requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

// 获取订单交易页信息 ---商品清单
// url:/api/order/auth/trade  GET
export const reqOrderInfo = () => requests({url:'/order/auth/trade',method:'get'})

// 提交订单接口
// /api/order/auth/submitOrder?tradeNo={tradeNo}  POST 参数：tradeNo,data(包括6个参数)
export const reqSubmitOrder = (tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

// 获取订单支付信息
// url:/api/payment/weixin/createNative/{orderId}   GET   参数：orderId
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 获取订单支付状态
// url:/api/payment/weixin/queryPayStatus/{orderId}   GET  参数：orderId
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取个人中心--我的订单数据接口
// url:/api/order/auth/{page}/{limit}    GET   参数：page、limit
export const reqMyOrderList = (page,limit) => requests({url:`/order/auth/${page}/${limit}`,method:'get'})

