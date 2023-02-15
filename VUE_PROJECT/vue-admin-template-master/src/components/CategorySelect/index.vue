<template>
  <div>
    <!-- inline是行内表单，代表一行可以放多个元素 -->
    <!-- model表单数据对象：把表单的数据收集到那个对象的身上，将来表单验证，也需要这个属性; -->
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <!-- 收集到category1Id，然后绑定自定义事件
        value：select单选框里面的属性，用来收集数据 -->
        <el-select
          placeholder="请选择" 
          v-model="cForm.category1Id" 
          @change="handler1" 
          :disabled="show">
          <el-option 
          :label="c1.name" 
          :value="c1.id" 
          v-for="(c1,index) in list1" 
          :key="c1.id"
          >
        </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select 
        placeholder="请选择" 
        v-model="cForm.category2Id" 
        @change="handler2" 
        :disabled="show">
          <el-option 
          :label="c2.name" 
          :value="c2.id" 
          v-for="(c2,index) in list2" 
          :key="c2.id"
          >
        </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select 
          placeholder="请选择" 
          v-model="cForm.category3Id"  
          @change="handler3"
          :disabled="show">
          <el-option 
          :label="c3.name" 
          :value="c3.id" 
          v-for="(c3,index) in list3" 
          :key="c3.id"
          >
        </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props:['show'],
  data(){
    return {
      // 一级分类数据
      list1:[],
      // 二级分类数据
      list2:[],
      // 三级分类数据
      list3:[],
      // 收集相应一、二、三级分类的id
      cForm:{
        category1Id:'',
        category2Id:'',
        category3Id:'',
      }, 
    }
  },
  mounted(){
    // 获取一级分类数据的方法
    this.getCategoryList()
  },
  methods:{
    // 获取一级分类数据的方法
    async getCategoryList(){
      // 获取一级分类的请求，不需要携带参数
      let result = await this.$API.attr.reqCategory1List()
      // 如果成功，则展示服务器的数据
      if(result.code == 200){
        this.list1 = result.data
      }
    },
    // 一级分类的select事件回调（当一级分类的option改变时，获取相应二级分类的数据）
    async handler1(){
      // option变化时，首先要清除二三级的数据
      this.list2 = []
      this.list3 = []
      this.cForm.category2Id = ''
      this.cForm.category3Id = ''
      // 解构出一级分类id，获取相应二级分类的数据
      const { category1Id } = this.cForm
      // 触发时需要把id通过组件的自定义事件给父组件传过去(在子组件触发)
      // 为了让父组件区分是几级分类id，需要打标记
      this.$emit('getCategoryId',{categoryId:category1Id,level:1})
      let result = await this.$API.attr.reqCategory2List(category1Id)
      if(result.code == 200){      
        this.list2 = result.data
      }
    },
    // 二级分类的select事件回调（当二级分类的option改变时，获取相应三级分类的数据）
    async handler2(){
      // option变化时，首先要清除三级的数据
      this.list3 = []
      this.cForm.category3Id = ''
      // 解构出二级分类id，获取相应三级分类的数据
      const { category2Id } = this.cForm
      // 触发时需要把id通过组件的自定义事件给父组件传过去(在子组件触发)
      this.$emit('getCategoryId',{categoryId:category2Id,level:2})
      let result = await this.$API.attr.reqCategory3List(category2Id)
      if(result.code == 200){      
        this.list3 = result.data
      }
    },
    // 获取三级分类得id
    handler3(){
      const { category3Id } = this.cForm
      // 触发时需要把id通过组件的自定义事件给父组件传过去(在子组件触发)
      this.$emit('getCategoryId',{categoryId:category3Id,level:3})
    },
  }
}
</script>

<style>

</style>