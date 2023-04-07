// 角色管理接口模块

// 引入二次封装的axios
import request from '@/utils/request';

// 给当前角色新增授权接口：POST /admin/acl/permission/doAssign
export const reqDoAssign = (roleId,permissionId) => request({url:'/admin/acl/permission/doAssign',method:'POST',params:{roleId,permissionId}})

// 获取菜单权限数据列表接口：GET /admin/acl/permission
export const reqGetPermissionList = () => request({url:'/admin/acl/permission',method:'GET'})

// 修改菜单||修改功能的接口：PUT /admin/acl/permission/update
export const reqEditPermission = (permission) => request({url:'/admin/acl/permission/update',method:'PUT',data:permission})

// 添加菜单||添加功能接口：POST  /admin/acl/permission/save
export const reqAddPermission = (permission) => request({url:'/admin/acl/permission/save',method:'POST',data:permission})

// 删除菜单接口：DELETE /admin/acl/permission/remove/{id}
export const reqRemovePermission = (id) => request({url:`/admin/acl/permission/remove/${id}`,method:'DELETE'})


