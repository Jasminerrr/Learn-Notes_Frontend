<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin:10px 0px" @click="showDialog">添加</el-button>
    <!-- 表格组件
        data:表格组件将来需要展示的数据--只有数组类型
        border:给表格添加边框
        prop：要展示属性的k
        column属性：
          label：显示标题
          width：对应列的宽度 --string
          align：标题的对其方式：left、center、right
    -->
    <el-table style="width:100%" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width"></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <!-- row：作用域插槽回传的每一条（行）数据，$index是数据索引值，是固定好的，不能瞎写 -->
        <template slot-scope="{row,$index}">
          <img :src="row.logoUrl" alt="" style="width:100px;height:100px">
        </template>
      </el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器：
        1.当前页数：current-page
        2.数据总条数：total
        3.每页展示条数：page-size
        4.连续页码数：page-count 展示页码按钮数量，连续页码则-2
        5.设置每一页展示多少条数据：page-sizes
        6.分页器布局：layout（布局取决于顺序） 
        7. @current-change="currentChange"：current-page改变时触发，默认会将点击的页码传进去（pager）
        8. @size-change="sizeChange" ：page-size每页展示条数改变时触发，参数为每页数据个数    
    -->
    <el-pagination 
      style="margin-top: 20px; text-align: center;" 
      :current-page="page" 
      :total="total" 
      :page-size="limit"
      :page-count="7" 
      :page-sizes="[3, 5, 10]" 
      layout="prev, pager, next, jumper,->,sizes,total"
      @current-change="getPageList" 
      @size-change="sizeChange">
    </el-pagination>
    <!-- 对话框：
        :visible.sync---控制对话框的显示与隐藏
    -->
    <el-dialog :title="tmForm.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">
      <!-- form表单：       
        model表单数据对象：把表单的数据收集到那个对象的身上，将来表单验证，也需要这个属性;
        on-success：可以检测到图片上传成功，当图片上传成功时，就会执行一次；
        before-upload：在图片上传前会执行一次；
        Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。
       -->
      <el-form style="width:80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>

        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload class="avatar-uploader" action="/dev-api/admin/product/fileUpload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'tardeMark',
  // 准备一些响应式数据，存储服务器返回的数据进行展示
  data() {
    // 自定义校验规则
    var validatetmName = (rule, value, callback) => {
      if (value.length < 2 || value.length > 10) {
        callback(new Error('品牌名称为2-10位'));
      } else {
        // 校验成功则放行
        callback()
      }
    }
    return {
      // 代表的分页器第几页
      page: 1,
      // 限制当前页数展示数据的条数
      limit: 3,
      // 数据总条数
      total: 0,
      // 列表展示的数据个数
      list: [],
      // 默认对话框隐藏
      dialogFormVisible: false,
      // 上传图片使用得属性
      imageUrl: '',
      // 收集品牌信息：对象身上的属性需要看文档，不能瞎写
      tmForm: {
        tmName: '',
        logoUrl: '',
      },
      // 表单验证规则rules：required必须验证字段（前面带星号）,message提示信息，trigger用户行为设置(事件设置)：blur失焦/change文本改变时触发
      rules: {
        // 品牌名称验证规则
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          // 自定义表单验证
          { validator: validatetmName, trigger: 'change' }
        ],
        // 品牌logo验证规则
        logoUrl: [
          { required: true, message: '请选择品牌图片' }
        ],
      }
    }
  },
  // 组件挂载完毕发请求，获取数据
  mounted() {
    // 获取列表数据方法
    this.getPageList();
  },
  methods: {
    //获取品牌列表的数据,
    async getPageList(pager = 1) {
      // 默认当前页码为1，当点击改变页码时，传入点击的页码（传入参数），则使用传参的数据
      this.page = pager
      // 解构参数
      const { page, limit } = this
      // 获取品牌的列表的接口
      // 当向服务器发请求时，函数要带着参数，传递给服务器（在data中初始化两个参数）
      let result = await this.$API.trademark.reqTradeMarkList(page, limit)
      if (result.code == 200) {
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    // 每页展示条数变化方法
    sizeChange(limit) {
      // 将展示的条数改为触发事件时传入的参数
      this.limit = limit
      // 再次发请求获取列表数据
      this.getPageList()
    },
    // 点击添加品牌按钮 显示对话框
    showDialog() {
      this.dialogFormVisible = true
      // 添加完后清除表单的数据
      this.tmForm = {
        tmName: '',
        logoUrl: ''
      }
    },
    // 点击修改品牌时显示对话框
    // row：当前用户选中的这个品牌信息（作用域插槽传过来的每一条品牌数据）
    updateTradeMark(row) {
      // 点击修改按钮 显示对话框
      this.dialogFormVisible = true
      // 将已有的品牌信息赋值给tmForm进行展示
      // 不能将服务器返回的数据直接赋值给tmForm（会直接修改表格数据），需要浅拷贝
      // this.tmForm = row
      this.tmForm = { ...row }
    },
    // 图片上传成功的回调
    handleAvatarSuccess(res, file) {
      // res：上传成功之后返回给前端数据，data：是图片在服务器的真实地址
      // file：成功后服务器返回前端数据
      this.tmForm.logoUrl = res.data
    },
    // 图片上传前检查格式的回调
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 点击对话框确定按钮，添加品牌/修改品牌
    addOrUpdateTradeMark() {
      // 当全部验证字段通过，再去书写逻辑 ，validate：表单验证
      this.$refs.ruleForm.validate(async (success) => {
        if (success) {
          // 先让对话框隐藏
          this.dialogFormVisible = false
          // 发请求（修改或添加品牌）需要携带参数
          let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm)
          if (result.code == 200) {
            // 成功则弹出消息提示框message组件（可能是添加或修改成功），通过判断带给服务器的参数有没有id
            this.$message({
              // 设置提示框颜色
              type: 'success',
              message: this.tmForm.id ? '修改品牌成功' : '添加品牌成功',
            })
            // 成功则再次发请求获取品牌列表信息
            // 添加品牌需要停留在第1页，修改品牌则要停留在当前页(用是否携带id判断)
            this.getPageList(this.tmForm.id ? this.page : 1)
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    // 点击删除品牌操作
    deleteTradeMark(row) {
      // 弹框
      this.$confirm(`你确定删除${row.tmName} ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      // 当用户点击确定按钮时触发
      .then(async () => { 
      // 向服务器发请求
      let result = await this.$API.trademark.reqdeleteTradeMark(row.id)
        // 如果删除成功
        if(result.code == 200){
          this.$message({
          type: 'success',
          message: '删除成功!'
          });
          // 再次获取商品列表数据(如果删除后当前页数据条数大于1，停留在当前页；小于1 则返回上一页)
          this.getPageList(this.list.length > 1 ? this.page : this.page - 1)
        }
      })
      // 当用户点击取消按钮时触发
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>