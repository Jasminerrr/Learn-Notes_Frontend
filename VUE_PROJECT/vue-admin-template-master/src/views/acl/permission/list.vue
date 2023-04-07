<template>
  <div>
     <!-- 
      code: "Acl" // 标识名称
      deleted: false
      gmtCreate: "2020-11-30 16:40:08"
      gmtModified: "2020-11-30 16:40:08"
      id: "1333329957008228353"
      level: 2
      name: "权限管理"
      pid: "1" // 所属节点的id
      select: false
      status: null
      toCode: ""
      type: 1  // 1: 路由 2: 按钮

      children: []
      code: "btn.Role.assgin"
      deleted: false
      gmtCreate: "2020-11-30 16:50:13"
      gmtModified: "2020-12-01 08:13:47"
      id: "1333332492158812161"
      level: 4
      name: "分配权限"
      pid: "1333330152781561858"
      select: false
      status: null
      toCode: "RoleAuth"
      type: 2
    -->
    <el-table :data="permissionList" border :expand-row-keys="expandKeys" row-key="id">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="code" label="权限值"></el-table-column>
      <el-table-column prop="toCode" label="跳转权限值"></el-table-column>
      <el-table-column prop="prop" label="操作">
        <template slot-scope="{row}">
          <hint-button type="primary" icon="el-icon-plus" size="mini" :title="getAddTitle(row.level)" :disabled="row.level === 4" @click="addPermission(row)"></hint-button>
          <hint-button type="primary" icon="el-icon-edit" size="mini" :title="row.level===4?'修改功能':'修改菜单'" :disabled="row.level === 1" @click="updatePermission(row)" ></hint-button>
          <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除" :disabled="row.level === 1" @click="removePermission(row)"></hint-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改菜单||修改功能对话框 -->
    <el-dialog :title="editTitle" :visible.sync="dialogEditVisible">
      <el-form :model="permission" label-width="120px" :rules="rule" ref="editPermission">
        <el-form-item label="名称" prop="name">
          <el-input v-model="permission.name"></el-input>
        </el-form-item>
        <el-form-item label="功能权限值" prop="code">
          <el-input v-model="permission.code"></el-input>
        </el-form-item>
        <el-form-item label="跳转路由权限值" v-if="permission.level === 4" prop="toCode">
          <el-input v-model="permission.toCode"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdate">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加菜单||添加功能对话框 -->
    <el-dialog :title="addTitle" :visible.sync="dialogAddVisible">
      <el-form :model="permission" label-width="120px" :rules="rule" ref="addPermission">
        <el-form-item label="父级名称" prop="name" v-if="permission.level > 2">
          <el-input v-model="permission.pname" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="permission.name"></el-input>
        </el-form-item>
        <el-form-item label="功能权限值" prop="code">
          <el-input v-model="permission.code"></el-input>
        </el-form-item>
        <el-form-item label="跳转路由权限值" v-if="permission.level === 4" prop="toCode">
          <el-input v-model="permission.toCode"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="saveAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      expandKeys:[], // 收集需要自动展开的项
      permissionList:[], // 收集管理权限的列表
      permission:{  // 收集当前操作菜单的权限对象
        level:0,
        name:'',
        code:'',
        toCode:'',
      },
      dialogEditVisible:false, // 修改菜单对话框默认隐藏
      dialogAddVisible:false,// 添加菜单对话框默认隐藏
      rule: {  // 表单验证规则
        name: [{ required: true, message: '请输入名称',trigger: 'blur',}],
        code: [{ required: true, message: '请输入功能权限值',trigger: 'blur',}],
      },
    }
  },
  mounted() {
    this.getPermissionList()
  },
  methods: {
    // 获取菜单管理权限列表
    async getPermissionList(){
      let result = await this.$API.permission.reqGetPermissionList()
      if(result.code == 20000){
        this.permissionList = result.data.children
        this.expandKeys = [this.permissionList[0].id]
      }
    },

    // 获得是添加菜单还是添加功能的title
    getAddTitle(level){
      if(level === 1 || level === 2){
        return '添加菜单'
      }else if(level === 3){
        return '添加功能'
      }
    },

    // 修改菜单||修改功能的回调
    updatePermission(row){
      // 先显示对话框
      this.dialogEditVisible = true
      // 将已有的信息赋值给当前对象进行展示
      // 不能将服务器返回的数据直接赋值给permission（会直接修改表格数据），需要浅拷贝
      this.permission = {...row}
       // 2是按钮，1是路由
      this.permission.type = this.permission.level===4 ? 2 : 1  
      // 在对话框节点渲染完毕后再调用一次，必须在界面更新后清除表单验证规则
      this.$nextTick(() => this.$refs.editPermission.clearValidate())
    },

    // 点击确定修改的按钮回调
    saveEdit(){
      // 当表单验证通过再书写逻辑业务
      this.$refs.editPermission.validate(async success => {
        if(success){
          // 发请求
          let result = await this.$API.permission.reqEditPermission(this.permission)
          if(result.code == 20000){
            // 隐藏对话框
            this.dialogEditVisible = false
            this.$message({
              type:'success',
              message:'修改成功'
            })
            // 清除数据
            this.resetData()
            // 再次发请求获取列表
            this.getPermissionList()
          }
        }else{
          console.log('error submit!!');
          return false;
        }
      })
    },

    // 点击修改的取消按钮
    cancelUpdate(){
      // 隐藏对话框
      this.dialogEditVisible = false
      // 清除数据
      this.resetData()
    },

    // 重置数据（点击取消或修改数据后，对话框还会残留上一次数据）
    resetData(){
      // 清除数据
      this.permission = {
        level:0,
        name:'',
        code:'',
        toCode:'',
      }
    },

    // 点击添加菜单||添加功能按钮
    addPermission(row){
      // 先显示对话框
      this.dialogAddVisible = true
      // 清除上一次的数据
      this.permission.pname = row.name // 用于显示父级名称，但提交请求不需要
      this.permission.pid = row.id // 父级id，提交请求需要
      this.permission.level = row.level + 1 // 因为是添加下一级的level，所以添加当前的level要+1（提交请求需要）
      this.permission.type = this.permission.level===4 ? 2 : 1   // 2是按钮，1是路由
      // 清楚表单验证
      this.$nextTick(() => this.$refs.addPermission.clearValidate())
    },

    // 点击添加确定按钮回调
    saveAdd(){
      // 当表单验证通过后再书写逻辑
      this.$refs.addPermission.validate( async success =>{
        if(success){
          // 提交请求
          let result = await this.$API.permission.reqAddPermission(this.permission)
          if(result.code == 20000){
            // 隐藏对话框
            this.dialogAddVisible = false
            this.$message({
              type:'success',
              message:'添加成功'
            })
            // 清除数据
            this.resetData()
            // 重新获取列表数据
            this.getPermissionList()
          }
        }else{
          console.log('error submit!!');
          return false;
        }
      })
    },

    // 点击添加的取消按钮
    cancelAdd(){
      // 隐藏对话框
      this.dialogAddVisible = false
      // 清除数据
      this.resetData()
    },

    // 点击删除按钮回调--删除某个权限节点
    removePermission(row){
      this.$confirm('此操作将永久删除该记录，是否继续？','提示',
      {type:'warning'
    }).then(async ()=>{
      let result = await this.$API.permission.reqRemovePermission(row.id)
      if(result.code == 20000){
        this.$message({
          type: 'success',
          message: '删除成功!' 
        })
        // 再次获取列表数据
        this.getPermissionList()
      }
    }).catch((error)=>{
      if(error){
        this.$message({
          type:'info',
          message:'已取消删除'
        })
      }
    })
      
    },
  },
  computed:{
    // 动态计算出修改菜单||修改功能对话框的title
    editTitle(){
     const {level} = this.permission
     if(level === 4){
       return '修改菜单'
     }else{
       return '修改功能'
     }
    },

    // 动态计算出菜单||修改功能对话框的title
    addTitle(){
     const {level} = this.permission
     if(level === 4){
       return '添加功能'
     }else{
       return `添加${level===2?'一':'二'}级菜单`
     }
    },
  }
}
</script>

<style>

</style>