<template>
  <div>
    <!-- 行内表单 -->
    <el-form inline>
      <el-form-item>
        <el-input v-model="tempSearchObj.roleName" placeholder="角色名称"></el-input>
      </el-form-item>
      <!-- 查询与清空的按钮 -->
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
      <el-button @click="clear">清空</el-button>
    </el-form>
    <!-- 添加与批量删除的按钮 -->
    <div style="margin-bottom: 20px">     
      <el-button type="primary" @click="addRole">添加</el-button>
      <el-button type="danger" @click="removeRoles" :disabled="selectedRoles.length < 1">批量删除</el-button>
    </div>
    <!-- table表格展示用户信息：selection-change	当选择项发生变化时会触发该事件 -->
    <el-table :data="roles" border style="width: 960px" v-loading="listLoading" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
      <el-table-column label="角色名称" prop="roleName">
        <!-- 此处解构需要input和span来回切换 -->
        <template slot-scope="{row,$index}">
          <!-- 此时edit为定义，为undefined，所以不显示input -->
          <template v-if="row.edit">
            <el-input v-model="row.roleName" class="edit-input" size="mini"></el-input>
            <el-button type="warning" icon="el-icon-refresh" size="small" class="cancel-btn" @click="cancelEdit(row)">取消</el-button>
          </template>
          <span v-else>{{ row.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <hint-button type="info" icon="el-icon-info" size="mini" title="分配权限" @click="getPermission(row)"></hint-button>
          <hint-button type="primary" icon="el-icon-edit" size="mini" title="修改角色" @click="showEdit(row)" v-if="!row.edit"></hint-button>
          <hint-button type="primary" icon="el-icon-check" size="mini" title="确定" @click="editRole(row)" v-else></hint-button>
          <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除角色" @click="deleteRole(row)"></hint-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[3, 5, 7]"
      style="padding: 20px 0;"
      layout="prev, pager, next, jumper, ->, sizes, total"  
      @current-change="getRoles"
      @size-change="handleSizeChange"
    /> 
    
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      page:1, // 当前页码
      limit:5, // 展示页码限制条数
      total:0,
      listLoading:true, // 是否显示列表加载
      searchObj:{// 收集请求条件的搜索框的数据
        roleName:''
      }, 
      tempSearchObj:{// 收集搜索框的数据
        roleName:''
      },
      roles:[],// 收集所有角色管理列表
      selectedRoles:[], //收集所有选中带有id的数组
    }
  },
  created(){
    // 当页面创建完毕时获取角色管理列表数据
    this.getRoles()
  },
  methods: {
    async getRoles(pager = 1){
      this.page = pager
      // 显示加载
      this.listLoading = true
      const {page,limit,searchObj} = this
      let result = await this.$API.role.reqGetRolesList(page,limit,searchObj)
      if(result.code == 20000){
        // 数据回来不在加载
        this.listLoading = false
        const {total} = result.data
        this.total = total
        this.roles = result.data.items
      }
    },
    // 点击查询按钮
    search(){
      // // 将收集到的数据浅拷贝一份给searchObj（为了不破坏对象）
      this.searchObj = {...this.tempSearchObj}
      // 带着params参数再次获取列表
      this.getRoles()
    },
    // 点击清空按钮
    clear(){
      this.searchObj = {
        roleName:''
      } 
      this.tempSearchObj = {
        roleName:''
      }
      // 再次请求数据
      this.getRoles()
    },
    // 每页展示条数改变时触发
    handleSizeChange(pageSize){
      // 将展示的条数改为触发事件时传入的参数
      this.limit = pageSize
      this.getRoles()
    },
    // 点击添加角色按钮的回调
    addRole(){
      // 调用$prompt方法即可打开消息提示
      this.$prompt('请输入新名称', '添加角色', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
      // 当用户点击确定按钮时触发,value为输入框收集的值
      .then(async ({value}) => { 
      // 向服务器发请求
      let result = await this.$API.role.reqAddRole({roleName:value})
        // 如果删除成功
        if(result.code == 20000){
          this.$message({
          type: 'success',
          message: '删除成功!'
          });
          // 再次获取商品列表数据
          this.getRoles()
        }
      })
      // 当用户点击取消按钮时触发
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消添加'
        });
      });
    },
    // 监听勾选框状态的回调
    handleSelectionChange(selection){
      // （收集选中id的用户） 参数为选中的选项 
      this.selectedRoles = selection.map(item => item.id)
    },
    // 根据id列表批量删除按钮的回调
    removeRoles(){
      // 调用$confirm方法即可打开消息提示
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let result = await this.$API.role.reqRemoveRolesById(this.selectedRoles)
        if(result.code == 20000){
          this.$message({
            type: 'success',
            message: '删除成功!' 
          });
          // 再次获取列表数据(如果删除后当前页数据条数大于1，停留在当前页；小于1 则返回上一页)
          this.getRoles(this.roles.length > 1 ? this.page : this.page-1)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      })
    },
    // 点击修改按钮
    showEdit(row){
      // Vue无法检测普通新增的属性，需要用$set方法书写响应式属性（数据变化视图也变）
      // this.$set(每一个对象,新的响应式属性,属性值)
      this.$set(row,'edit',true)
       // Vue无法检测普通新增的属性，需要用通过数组的方法来让vue监听到数据变化（因为数组方法会触发vue视图更新）
      //  arr.concat([])：合并空数组
      // this.roles = this.roles.concat([])
      // 在变成编辑状态时，将原来的角色名称保存一份（用于后面取消修改）
      row.originRoleName = row.roleName
    },
    // 点击修改角色的确定按钮
    async editRole(row){
      // 将edit置为false，显示span为查看状态
      row.edit = false
      // 点击确定按钮后将当前数据传给服务器
      const {id,roleName} = row
      let result = await this.$API.role.reqEditRole({id,roleName})
      if(result.code == 20000){
        this.$message({
          type:'success',
          message:'修改成功'
        })
        // 再次发请求
        this.getRoles(this.page)
      }
    },
    // 点击修改里面input的取消按钮
    cancelEdit(row){
      // 变为可查看状态
      row.edit = false
      // 让角色名变成原来的名称
      row.roleName = row.originRoleName
      this.$message({
        type: 'info',
        message: '已取消修改'
      })
    },
    // 删除角色回调
    deleteRole(row){
      // 调用$confirm方法即可打开消息提示
      this.$confirm(`你确定删除${row.roleName} ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      // 当用户点击确定按钮时触发
      .then(async () => { 
      // 向服务器发请求
      let result = await this.$API.role.reqDeleteRole(row.id)
        // 如果删除成功
        if(result.code == 20000){
          this.$message({
          type: 'success',
          message: '删除成功!'
          });
          // 再次获取商品列表数据(如果删除后当前页数据条数大于1，停留在当前页；小于1 则返回上一页)
          this.getRoles(this.roles.length > 1 ? this.page : this.page - 1)
        }
      })
      // 当用户点击取消按钮时触发
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }, 
    // 点击当前用户的分配权限按钮
    async getPermission(row){
      // 跳转路由
      this.$router.push(`/acl/role/auth/${row.id}?roleName=${row.roleName}`)
    },
  },
}
</script>

<style scoped>
.edit-input{
  padding-right: 100px;
}
.cancel-btn{
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>