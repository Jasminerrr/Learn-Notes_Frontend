// 用户管理接口模块

// 引入二次封装的axios
import request from '@/utils/request';

// 获取当前用户权限列表接口：GET /admin/acl/index/menu
export const reqGetMenu = () => request({url:'/admin/acl/index/menu',method:'GET'})

// 获取管理用户分页列表：GET /admin/acl/user/{page}/{limit}
export const reqGetPageList = (page,limit,searchObj) => request({url:`/admin/acl/user/${page}/${limit}`,method:'GET',params:searchObj})

// 根据id删除某一个管理用户的接口：DELETE /admin/acl/user/remove/{id}
export const reqRemoveById = (id) => request({url:`/admin/acl/user/remove/${id}`,method:'DELETE'})

// 添加|修改管理用户的接口：POST /admin/acl/user/save、PUT /admin/acl/user/update（靠是否携带id区分）
export const reqAddOrUpdateUser = (user) => {
  if(user.id){
    return request({url:'/admin/acl/user/update',method:'PUT',data:user})
  }else{
    return request({url:'/admin/acl/user/save',method:'POST',data:user})
  }
}

// 根据id列表删除管理用户：DELETE /admin/acl/user/batchRemove
export const reqRemoveUsersById = (selectedIds) => request({url:`/admin/acl/user/batchRemove`,method:'post',data:selectedIds})

// 根据用户获取角色的接口：GET /admin/acl/user/toAssign/{userId}
export const reqAssignRoles = (userId) => request({url:`/admin/acl/user/toAssign/${userId}`,method:'GET'})



