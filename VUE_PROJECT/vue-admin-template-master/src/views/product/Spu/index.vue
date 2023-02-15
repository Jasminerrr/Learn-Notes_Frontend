<template>
  <div>
    <el-card style="margin:20px 0px">
      <!-- 直接使用三级联动全局组件 -->
      <CategorySelect @getCategoryId="getCategoryId" :show="!show"/>
    </el-card>
    <el-card>
      <!-- 底下有三部分的结构进行切换 -->
      <div v-show="scene==0">
        <!-- 展示spu列表 category3Id为空 假，则取反true 不能使用 -->
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加SPU</el-button>
        <el-table style="width:100%" border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width" align="center"></el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width" align="center"></el-table-column>
          <el-table-column prop="prop" label="操作" width="width" align="center">
            <template slot-scope="{row,$index}">
              <!-- 此处按钮将来用hintButton替换 -->
              <hint-button type="success" icon="el-icon-plus" size="mini" title="添加spu"></hint-button>
              <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改spu" @click="updateSpu(row)"></hint-button>
              <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前spu全部sku列表"></hint-button>
              <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除spu"></hint-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination 
          style="text-align:center"
          :total="total" 
          :current-page="page"
          :page-sizes="[3,5,10]" 
          :page-size="limit"
          layout="prev, pager, next, jumper,->,sizes,total"
          @current-change="getSpuList"
          @size-change="handleSizeChange"
          >
        </el-pagination>
      </div>
      <!-- 添加spu|修改spu -->
      <SpuForm v-show="scene==1" @changeScene="changeScene" ref="spu"/>
      <!-- 添加sku -->
      <SkuForm v-show="scene==2"/>
    </el-card>
  </div>
</template>

<script>
// 引入子组件
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
  name:'Spu',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',     
      show: true, // 控制三级联动可操作性      
      page:1, // 分页器当前第几页    
      limit:3, // 每一页要展示的数据     
      total: 0, // 数据总条数      
      records:[], // spu列表展示的数据
      scene:0, // 0：展示spu列表数据，1：添加spu|修改spu，2：添加sku
    }
  },
  methods:{
    // 三级联动自定义事件的回调，把子组件相应的id传给父组件
    getCategoryId({ categoryId, level }) {
      // level区分一、二、三级分类相应的id，以及父组件进行存储
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
        // 获取spu列表数据进行展示
        this.getSpuList()
      }
    },
    // 获取spu列表数据进行展示 默认展示第一页| 点击分页器页数的回调(参数为点击的页码page)
    async getSpuList(pages = 1){
      // 修改页码参数
      this.page = pages
      // 解构数据
      const{page,limit,category3Id} =this
      // 携带3个参数：page：第几页，limit：每条展示数据,category3Id：三级分类id
      let result = await this.$API.spu.reqSpuList(page,limit,category3Id)
      if(result.code == 200){
        this.total = result.data.total
        this.records = result.data.records
      }
    },
    // 分页器的每页展示条数发生变化的回调
    handleSizeChange(limit){
      // 修改参数
      this.limit = limit
      // 再次发请求
      this.getSpuList()
    },
    // 点击添加SPU按钮的回调
    addSpu(){
      this.scene = 1
    },
    // 修改某一个spu按钮回调
    updateSpu(row){
      this.scene = 1 
      // 在父组件Spu中通过$refs（$children）获取到子组件SpuForm(属性、方法)，每一次都可以调用子组件的方法
       this.$refs.spu.initSpuData(row)
    },
    // SpuForm自定义事件回调
    changeScene(scene){
      this.scene = scene
    },
  },
  // 注册子组件
  components:{
    SpuForm,
    SkuForm,
  }
}
</script>

<style>

</style>