<template>
  <div>
    <!-- 行内表格 -->
    <el-form inline>
      <el-form-item>
        <el-input placeholder="用户名" v-model="tempSearchObj.username"></el-input>
      </el-form-item>
      <!-- 查询与情况的按钮 -->
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
      <el-button @click="clear">清空</el-button>
    </el-form>
    <!-- 添加与批量删除的按钮 -->
    <div style="margin-bottom: 20px">
      <el-button type="primary" @click="addUser">添加</el-button>
      <el-button type="danger" @click="removeUsers" :disabled="selectedIds.length < 1">批量删除</el-button>
    </div>
    <!-- table表单 selection-change：选择项发生变化时会触发该事件 -->
    <el-table :data="users" border stripe v-loading="listLoading" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
      <el-table-column prop="username" label="用户名" width="150"></el-table-column>
      <el-table-column prop="nickName" label="用户昵称" width="150"></el-table-column>
      <el-table-column prop="roleName" label="权限列表"></el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="gmtModified" label="更新时间" width="180"></el-table-column>
      <el-table-column prop="prop" label="操作" align="center" width="230">
        <template slot-scope="{row}">
          <hint-button type="info" icon="el-icon-user-solid" size="mini" title="分配角色" @click="userRoles(row)"></hint-button>
          <hint-button type="primary" icon="el-icon-edit" size="mini" title="修改用户" @click="updateUser(row)"></hint-button>
          <!-- 点击删除的气泡框，气泡框事件为：onConfirm -->
          <el-popconfirm :title="`确定删除 ${ row.username } 吗？`" @onConfirm="removeUser(row.id)">
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" title="删除用户" ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[3, 7, 10]"
      style="padding: 20px 0;"
      layout="prev, pager, next, jumper, ->, sizes, total"  
      @current-change="getUsers"
      @size-change="handleSizeChange"
    />
    <!-- 添加|修改用户管理的对话框 -->
    <el-dialog :title="user.id ? '修改用户': '添加用户'" :visible.sync="dialogUserVisible">
      <el-form :model="user" label-width="120px" :rules="userRules" ref="userForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="user.nickName"></el-input>
        </el-form-item>
        <!-- 添加用户才显示密码 -->
        <el-form-item label="用户密码" v-if="!user.id" prop="password">
          <el-input v-model="user.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色的对话框 -->
    <el-dialog title="设置角色" :visible.sync="dialogRolesVisible">
      <el-form :model="user" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="角色列表">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="assignRoles">
            <el-checkbox v-for="(role,index) in allRolesList" :label="role.id" :key="role.id"   @change="handleCheckedChange">
              {{role.roleName}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRolesVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogRolesVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 按需引入lodasah当中的深拷贝
import cloneDeep from 'lodash/cloneDeep'
export default {
  name:'',
  data() {
    // 自定义校验规则
    var validatePassword = (rule, value, callback) => {
      if (!value) { // 如果密码为空
        callback(new Error('请输入密码'));
      }else if (value.length < 6) {
        callback(new Error('密码不能小于6位数'));
      }else {
        // 校验成功则放行
        callback()
      }
    }
    return {
      user:{}, // 当前要操作的用户
      users:[], // 存储当前页的用户列表
      page:1,  //当前页初始值为1
      total:0, // 总条数
      limit:3, //初始值展示条数为3

      searchObj:{  //包含请求搜索条件数据的对象
        username:'', //用户名
      },
      tempSearchObj: { // 收集搜索条件输入的对象
        username: ''
      },
      listLoading:false, // 是否显示列表加载的提示
      dialogUserVisible:false, // 用户对话框默认隐藏
      dialogRolesVisible:false, // 角色对话框默认隐藏
      userRules: {  // 添加用户表单验证规则
        username: [
          { required: true, message: '请输入用户名' },
          { min: 4, message: '用户名不能小于4位' }
        ],
        password: [
           // 自定义表单验证
          { required: true, validator: validatePassword }
        ]
      },
      selectedIds:[], // 收集选中用户的id的数组
      allRolesList:[], // 收集所有的角色数组
      assignRoles:[], // 收集当前用户角色id的数组
      isIndeterminate:false,  // 全选框的不确定状态
      checkAll:false, // 设置全选的初始值为false
    }
  },
  // 一般请求可以在mouted里面发，也可以在created里面
  created() {
    // 组件挂载完毕时获取当前用户权限列表
    this.getUsers()
  },
  methods: {
    // 获取当前用户权限列表的回调
    async getUsers(pager = 1){
      this.page = pager
      const {page,limit,searchObj} = this
      // 显示加载
      this.listLoading = true
      let result = await this.$API.user.reqGetPageList(page,limit,searchObj)
      if(result.code == 20000){
        // 数据回来不再加载
        this.listLoading = false
        //数据总条数减去自己
        this.total = result.data.total-1
        // 获得--过滤掉自己的用户信息（管理者）
        this.users = result.data.items.filter(item => item.username !== 'admin')
      }
    },
    // 点击页码条数展示数据改变时
    handleSizeChange(pageSize){
      this.limit = pageSize
      this.getUsers()
    },
    // 点击查询按钮回调
    search(){
      // 将收集到的数据浅拷贝一份给searchObj（为了不破坏对象）
      this.searchObj = {...this.tempSearchObj}
      // 带着params参数再次获取列表
      this.getUsers()
    },
    // 点击清空回调
    clear(){
      this.searchObj = { 
        username:'', 
      }
      this.tempSearchObj = { 
        username: ''
      }
      this.getUsers()
    },
    // 点击添加用户
    addUser(){
      // 清空之前对话框收集的数据
      this.user = {}
      // 显示对话框
      this.dialogUserVisible = true
      // 在对话框节点渲染完毕后再调用一次
      this.$nextTick(() => this.$refs.userForm.clearValidate())
    },
    // 点击修改用户
    updateUser(user){
      // 显示对话框
      this.dialogUserVisible = true
      // 将选中的属性赋值给attrInfo
      // 由于数据结构中存在对象里面套数组，数组里面又套对象，需要用深拷贝才能解决问题
      // 深拷贝、浅拷贝在面试的时候出现频率很高，切记要达到手写深拷贝与浅拷贝
      this.user = cloneDeep(user)
    },
    // 删除用户回调
    async removeUser(id){
      let result = await this.$API.user.reqRemoveById(id)
      if(result.code == 20000){
        // 重新获取管理用户列表
        this.getUsers()
      }
    },
    // 点击会话框取消用户保存按钮的回调
    cancel(){
      // 让会话框隐藏
      this.dialogUserVisible = false
      // 让当前用户为空
      this.user = {}
    },
    // 点击保存按钮---修改或添加的回调
    addOrUpdateUser(){
      // 当全部验证字段通过，再去书写逻辑 validate 表单验证
      this.$refs.userForm.validate(async success =>{
        if(success){ // 表单验证通过
          // 先隐藏对话框
          this.dialogUserVisible = false
          // 再发请求，携带参数给服务器
          let result = await this.$API.user.reqAddOrUpdateUser(this.user)
          if(result.code == 20000){
            // 弹出消息框
            this.$message({
              message:this.user.id ? '修改成功': '保存成功',
              type:'success'
            })
            // 需要再次发请求获取列表数据（修改停留当前页，添加返回首页）
            this.getUsers(this.user.id ? this.page : 1)
          }
        }else{
          console.log('error submit!!');
          return false;
        }
      })
    },
    // 监听列表选中变化改变的回调 
    handleSelectionChange(selection){ // （收集选中id的用户） 参数为选中的选项 
      // map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
      this.selectedIds = selection.map(item => item.id)
    },
    // 选中用户后 点击批量删除回调
    removeUsers(){
      // 调用$confirm方法即可打开消息提示
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let result = await this.$API.user.reqRemoveUsersById(this.selectedIds)
        if(result.code == 20000){
          this.$message({
            type: 'success',
            message: '删除成功!' 
          });
          // 再次获取列表数据(如果删除后当前页数据条数大于1，停留在当前页；小于1 则返回上一页)
          this.getUsers(this.users.length > 1 ? this.page : this.page-1)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // 获取用户分配角色回调
    async userRoles(row){
      this.user.username = row.username
      // 显示对话框
      this.dialogRolesVisible = true
      let result = await this.$API.user.reqAssignRoles(row.id)
      const {allRolesList,assignRoles} = result.data
      if(result.code == 20000){
        this.allRolesList = allRolesList
        this.assignRoles = assignRoles.map(item => item.id)
      }
      // 用户默认全选框的状态
      this.checkAll = allRolesList.length === assignRoles.length
      this.isIndeterminate = assignRoles.length > 0 && assignRoles.length < allRolesList.length
    },
    // 监听勾选状态发生改变的时候
    handleCheckedChange(){
      if(this.assignRoles.length > 0){
        this.isIndeterminate = true
        if(this.allRolesList.length === this.assignRoles.length){
          this.checkAll = true
        }else{
          this.checkAll = false
        }
      }else{
        this.isIndeterminate = false
        this.checkAll = false
      }
    },
    // 监听全选框的状态
    handleCheckAllChange(){
      // 再点击全选框时，判断是否已经全部选中
      if(this.allRolesList.length === this.assignRoles.length){
        // 让当前用户角色置空
        this.assignRoles = []
        // 全选框为空
        this.checkAll = false
      }else{
        this.assignRoles = this.allRolesList.map(item => item.id)
      }
    },
  },
}
</script>

<style>

</style>