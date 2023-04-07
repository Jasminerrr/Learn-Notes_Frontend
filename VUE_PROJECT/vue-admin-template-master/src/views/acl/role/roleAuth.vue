<template>
  <!-- 分配权限的树形结构 -->
  <div>
    <el-input v-model="$route.query.roleName" disabled></el-input>
    <el-tree
      style="margin: 20px 0px;"
      :data="allPermissions"
      show-checkbox
      node-key="id"
      :default-expanded-keys="selected"
      :default-checked-keys="selected"
      :props="defaultProps"
      ref="tree"
      >
    </el-tree>
    <el-button type="primary" :loading="loading" @click="save">保存</el-button>
    <el-button type="info" @click="cancel">取消</el-button>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      loading:false, // 用来标识是否正在保存请求得标识，防止重复提交
      allPermissions:[], //保存所有权限 
      defaultProps: { // 配置选项（根据后台得数据来）
        children: 'children',
        label: 'name',
      },
      selected:[], // 收集默认选中的权限
    }
  },
  created(){
    this.init()
  },
  methods: {
    // 先初始化数据
    init(){
      const roleId = this.$route.params.id
      // 调用方法 获取已有权限数据
      this.getPermission(roleId)
    },
    // 点击当前用户的分配权限按钮，获取已有权限数据
    async getPermission(roleId){
      let result = await this.$API.role.reqGetPermission(roleId)
      const {children} = result.data
      if(result.code == 20000){
        this.allPermissions = children
        // 调用方法得到selected默认选择权限的数组
        this.getSelected(children[0].children)
      }
    },
    // 通过递归循环出所有带有select选项的数据，放入数组（用递归是因为数据套了很多层）
    getSelected(children){
      children.map(item => {
        if(item.select){
          this.selected.push(item.id)
        }
        if(item.children){
          this.getSelected(item.children)
        }
      })
      
    },
    // 点击保存回调--保存权限列表

    /* vue:elementUI 的tree树形控件获取父节点的实例
    修改源码 ：
    情况1: element-ui没有实现按需引入打包
          node_modules\element-ui\lib\element-ui.common.js    25382行修改源码  去掉 'includeHalfChecked &&'
          // if ((child.checked || includeHalfChecked && child.indeterminate) && (!leafOnly || leafOnly && child.isLeaf)) {
          if ((child.checked || child.indeterminate) && (!leafOnly || leafOnly && child.isLeaf)) {
    情况2: element-ui实现了按需引入打包
      node_modules\element-ui\lib\tree.js    1051行修改源码  去掉 'includeHalfChecked &&'
      // if ((child.checked || includeHalfChecked && child.indeterminate) && (!leafOnly || leafOnly && child.isLeaf)) {
      if ((child.checked || child.indeterminate) && (!leafOnly || leafOnly && child.isLeaf)) {
    */
    async save(){
      // 正在保存请求的标识
      this.loading = true
      // 先获取选中的id数组，再将数组通过join方法分割成字符串（后台需要字符串格式）
      // getCheckedKeys()：返回目前被选中的节点的 key 所组成的数组
      const ids = this.$refs.tree.getCheckedKeys().join(',')
      // 发请求，将数据传给服务器
      let result = await this.$API.permission.reqDoAssign(this.$route.params.id,ids)
      if(result.code == 20000){
        this.loading = false
        this.$message({
          type:'success',
          message:'分配权限成功'
        })
        // 需要在跳转前获取数据（跳转路由后通过this不能获取正确的数据了）
        const roleName = this.$route.query.roleName
        const roles = this.$store.getters.roles
        // 请求成功后需要路由跳转到角色管理初页面
        this.$router.replace('/acl/role/list',()=>{
          // 判断：如果角色列表包含此角色名，则重新加载页面来获取最新的数据
          // ES7新增Array.includes()方法用来检测数组中是否包含某个元素，返回布尔值；
          if(roles.includes(roleName)){
            window.location.reload()
          }
        })
      }
    },
    // 点击取消按钮回调
    cancel(){
      // 点击取消，页面需要跳转到角色管理的列表页面(替换路由)
      this.$router.replace({name: 'Role'})
    },
  },
}
</script>

<style>

</style>