<template>
  <div>
    <el-card style="margin:20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"/>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <!-- 当category3Id为空 则假，取反为真 按钮被禁用 -->
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addAttr">
          添加属性
        </el-button>
        <!-- 表格：展示平台属性 -->
        <el-table style="width:100%" border :data="attrList">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150"></el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{row,$index}">
              <el-tag type="success" v-for="(attrValue, index) in row.attrValueList" :key="attrValue.id"
                style="margin:0px 10px">
                {{ attrValue.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{row,$index}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性|修改属性得操作 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="addAttrValue" :disabled="!attrInfo.attrName">
          添加属性值
        </el-button>
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table style="width:100%;margin:20px 0px" border :data="attrInfo.attrValueList">
          <el-table-column align="center" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{row,$index}">
              <!-- 注意：此处v-if和v-else联合使用时，中间不能有任何节点，否则失效 -->
              <el-input v-model="row.valueName" placeholder="请输入属性值名称" size="mini" v-if="row.flag" @blur="toLook(row)" @keyup.native.enter="toLook(row)" :ref="$index"></el-input>
              <span v-else @click="toEdit(row,$index)" style="display:block">{{ row.valueName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <!-- 气泡确认框 -->
              <el-popconfirm :title="`确定删除${row.valueName}吗？`" @onConfirm="deleteAttrValue($index)">
              <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length < 1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入lodasah当中的深拷贝
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Attr',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      // 接收平台属性的字段
      attrList: [],
      // 控制table表格显示与隐藏，默认显示
      isShowTable: true,
      // 收集新增属性|修改属性使用的
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [  //属性名的属性值，属性值可以是多个 需要用数组，每一个属性值都是一个对象，需要两个字段
        ],
        categoryId: 0,   //三级分类的id
        categoryLevel: 3,   //服务器需要区分是几级id
      },
    }
  },
  methods: {
    // 三级联动自定义事件的回调，把子组件相应的id传给父组件
    getCategoryId({ categoryId, level }) {
      // 区分一、二、三级分类相应的id，以及父组件进行存储
      if (level == 1) {
        this.category1Id = categoryId
        // 存储后清空上一次二三级数据
        this.category2Id = ''
        this.category3Id = ''
      } else if (level == 2) {
        this.category2Id = categoryId
        this.category3Id = ''
      } else {
        // 代表有了三级id，则发请求 获取数据进行展示
        this.category3Id = categoryId
        this.getAttrList()
      }
    },
    // 获取平台属性数据
    async getAttrList() {
      // 解构id
      const { category1Id, category2Id, category3Id } = this
      // 发请求
      let result = await this.$API.attr.reqAttrList(category1Id, category2Id, category3Id)
      if (result.code == 200) {
        this.attrList = result.data
      }
    },
    // 添加属性值的回调
    addAttrValue() {
      // 向属性值的数组里面添加元素
      // attrID：是相应的属性id，刚添加属性时，服务器还没有生成相应的id，所以带给服务器的id为undefined
      // valueName：相应属性值的名称
      this.attrInfo.attrValueList.push({
        // 对于修改某个属性，可以在已有的属性值基础上新增属性值，需要带上 已有的属性的id
        attrId: this.attrInfo.id, 
        valueName: '',
        // flag属性：给每一个属性值都添加一个标记，用户切换查看模式。好处：每一个属性可以控制自己的模式切换
        // 当前flag属性为响应式数据（数据变化 视图跟着变化）
        flag:true,
      })
      // 点击添加按钮，input自动聚焦
      this.$nextTick(()=>{
          this.$refs[this.attrInfo.attrValueList.length-1].focus()
        })
    },
    // 点击添加属性按钮的回调
    addAttr() {
      // 点击添加属性按钮时隐藏平台属性表格
      this.isShowTable = false
      // 清除之前新增或收集属性的数据
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [],  //属性名的属性值，属性值可以是多个 需要用数组，每一个属性值都是一个对象，需要两个字段  
        categoryId: this.category3Id,   //三级分类的id(点击添加属性此时已经三级id了，这里才能收集)
        categoryLevel: 3,   //服务器需要区分是几级id
      }
    },
    // 修改属性按钮的回调（row为要修改的这条数据）
    updateAttr(row){
      // 隐藏最开始的表格
      this.isShowTable = false
      // 将选中的属性赋值给attrInfo
      // 由于数据结构中存在对象里面套数组，数组里面又套对象，需要用深拷贝才能解决问题
      // 深拷贝、浅拷贝在面试的时候出现频率很高，切记要达到手写深拷贝与浅拷贝
      this.attrInfo = cloneDeep(row)
      // 在修改某个属性时，相应的属性值应该有flag标识，所以首先设置flag初始值为false，默认只可查看
      this.attrInfo.attrValueList.forEach(item =>{
        // Vue无法检测普通新增的属性，需要用$set方法书写响应式属性（数据变化视图也变）
        // this.$set(每一个对象,新的响应式属性,属性值)
        this.$set(item,'flag',false)
      })
    },
    // 失去焦点的事件：输入属性值名称，失去焦点则flag为false，展示span
    // row形参：是当前用户添加最新的属性值
    toLook(row){ 
      // 当用户输入属性值为空格时，则不能变为查看模式，应该给予提示信息
      if(row.valueName.trim()==''){
        this.$message('输入值不能为空！')
        return
      }
      // 新增的属性值不能跟已有的属性值重复
      let isRepeat = this.attrInfo.attrValueList.some(item =>{
        // 在遍历时，首先要把当前的row从已有数组中新增的属性值里面剔除，（row为最新新增的属性值）
        if(row!=item){
          // 如果不等于才走此判断，名字也相等 返回true，不等返回false
          return row.valueName == item.valueName
        }
      })
      // 如果isRepeat为真，则返回 不走下面的查看模式，为假 则继续
      if(isRepeat) return
      // 当前编辑模式变为查看模式（让input消失，显示span）
      row.flag = false
    },
    // 点击span的回调，变为编辑模式
    toEdit(row,index){
      row.flag = true
      // 获取input节点，让input表单获取焦点
      // 注意：对于浏览器而已，重绘需要耗时，点击span，不可能立马获取到input，
      // 在执行代码改变数据后，下次更新的DOM模板解析完成后vue再调用nextTick(生命周期钩子)
      // 不能直接$refs.index，index为变量
      this.$nextTick(()=>{
        this.$refs[index].focus()
      })
    },
    // 气泡确认框的确定按钮的回调
    // 最新版本的elementUI版本是2.15.6，目前模板中的版本号2.13.2 所以事件名为onConfirm，而不是confirm
    /* splice() 数组删除 splice(start[, deleteCount[, item1[, item2[, ...]]]])，返回被删除元素组成的新数组，会影响原数组；
      1. start：从0计数；
      2. deleteCount：要删除数组的元素个数
      3. item：要添加进数组的元素，从start开始，如果不指定 则splice()将只删除数组元素；
      4. 如果只删除了一个元素，则返回只包含该删除元素的数组，如果没有删除，则返回一个空数组； */
    deleteAttrValue(index){
      // 当前删除属性值的操作不需要发请求的
      this.attrInfo.attrValueList.splice(index,1)
    },
    // 保存按钮---添加属性值或修改属性值的操作
    async addOrUpdateAttr(){
      /* 整理参数：1.用户添加属性值为空的不应该提交给服务器
               2.提交给服务器数据中不应该有flag字段 */
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item=>{
        // 过滤掉属性值不是空的
        if(item.valueName != ''){
          // 删除掉flag属性
          delete item.flag
          // 返回真，则将符合条件的返回到新数组
          return true
        }
      })
      try {
        // 发请求
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        // 保存成功应该展示平台属性值（列表切换）
        this.isShowTable = true
        // 成功提示消息框
        this.$message({type:'success',message:'保存成功'})
        // 需要再次获取平台属性值进行展示
        this.getAttrList()
      } catch (error) {

      }
    },
  }
}
</script>

<style>

</style>