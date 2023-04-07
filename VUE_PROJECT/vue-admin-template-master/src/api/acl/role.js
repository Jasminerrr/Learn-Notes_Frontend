// 角色管理接口模块

// 引入二次封装的axios
import request from '@/utils/request';

// 获取角色管理列表接口：GET /admin/acl/role/{page}/{limit}
export const reqGetRolesList = (page,limit,searchObj) => request({url:`/admin/acl/role/${page}/${limit}`,method:'GET',params:searchObj})

// 新增角色接口：POST /admin/acl/role/save
export const reqAddRole = (role) => request({url:'/admin/acl/role/save',method:'POST',data:role})

// 修改角色接口：PUT /admin/acl/role/update
export const reqEditRole = (role) => request({url:'/admin/acl/role/update',method:'PUT',data:role})

// 删除角色接口：DELETE /admin/acl/role/remove/{id}
export const reqDeleteRole = (id) => request({url:`/admin/acl/role/remove/${id}`,method:'DELETE'})

// 根据id列表批量删除角色接口：DELETE  /admin/acl/role/batchRemove
export const reqRemoveRolesById = (selectedRoles) => request({url:'/admin/acl/role/batchRemove',method:'POST',data:selectedRoles})

// 获取权限接口：GET /admin/acl/permission/toAssign/{roleId}
export const reqGetPermission = (roleId) => request({url:`/admin/acl/permission/toAssign/${roleId}`,method:'GET'})


