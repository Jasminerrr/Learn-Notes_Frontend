<template>
  <div>
    <el-card style="margin:20px 0px">
      <!-- 直接使用三级联动全局组件，给组件传了一个show，控制三级联动可操作性 ，场景不为0时，true，则禁用三级联动组件 -->
      <CategorySelect @getCategoryId="getCategoryId" :show="scene!=0"/>
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
              <hint-button type="success" icon="el-icon-plus" size="mini" title="添加sku" @click="addSku(row)"></hint-button>
              <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改spu" @click="updateSpu(row)"></hint-button>
              <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前spu全部sku列表" @click="handler(row)"></hint-button>
              <!-- confirm事件：点击确认按钮时触发，此处因为版本不同，需要写onConfirm -->
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
                <!-- slot='reference'：触发 Popconfirm 显示的 HTML 元素 -->
                <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除spu" slot="reference"></hint-button>
              </el-popconfirm>
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
      <spu-form v-show="scene==1" @changeScene="changeScene" ref="spu"/>
      <!-- 添加sku -->
      <sku-form v-show="scene==2" ref="sku" @changeScenes="changeScenes"/>
    </el-card>
    <!-- 查看spu的对话框 -->
    <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible" :before-close="close">
      <!-- 自定义指令v-loading，值为布尔值，用来显示加载效果 -->
      <el-table :data="skuList" style="width:100%" border  v-loading="loading">
        <el-table-column prop="skuName" label="名称" width="width"></el-table-column>
        <el-table-column prop="price" label="价格" width="width"></el-table-column>
        <el-table-column prop="weight" label="重量" width="width"></el-table-column>
        <el-table-column label="默认图片" width="width">
          <template slot-scope="{row,$index}">
            <img :src="row.skuDefaultImg" style="width:100px;height:100px">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
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
      page:1, // 分页器当前第几页    
      limit:3, // 每一页要展示的数据     
      total: 0, // 数据总条数      
      records:[], // spu列表展示的数据
      scene:0, // 0：展示spu列表数据，1：添加spu|修改spu，2：添加sku
      dialogTableVisible:false, // 控制SKU对话框的显示与隐藏
      spu:{},  // 存储spu
      skuList:[], // 存储sku列表数据
      loading:true, // 设置加载效果初始值为显示
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
      // 切换场景为1
      this.scene = 1
      // 通知子组件SpuForm发2个请求：获取品牌列表数据和品牌属性数据
      // 需要把category3Id传过去
      this.$refs.spu.addSpuData(this.category3Id)
    },
    // 修改某一个spu按钮回调
    updateSpu(row){
      this.scene = 1 
      // 在父组件Spu中通过$refs（$children）获取到子组件SpuForm(属性、方法)，每一次都可以调用子组件的方法
       this.$refs.spu.initSpuData(row)
    },
    // 子组件的SpuForm自定义事件回调
    changeScene({scene,flag}){
      // 让页面为0（展示Spu列表数据）
      this.scene = scene
      // 当子组件通知父组件切换场景时，需要再次获取Spu列表数据展示(停留在当前修改页)
      // flag形参：区分保存按钮是修改还是添加
      if(flag == '修改'){
        // 为修改则页面停留在当前页
        this.getSpuList(this.page)
      }else{
        // 为添加则页面回到第一页（默认）
        this.getSpuList()
      }
      
    },
    // 点击操作的删除按钮回调
    async deleteSpu(row){
      let result = await this.$API.spu.reqDeleteSpu(row.id)
      if(result.code == 200){
        this.$message({type:'success',message:'删除成功'})
        // 删除成功后再次获取列表数据
        // 需要判断，如果SPU页面个数大于1，则删除后停留在当前页，如果小于1，则返回上一页
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1)
      }
    },
    // 点击添加SKU按钮的回调
    addSku(row){
      // 先切换场景为2
      this.scene = 2
      // 父组件通知子组件调用方法--发3个请求，把子组件需要的参数带过去
      this.$refs.sku.getData(this.category1Id,this.category2Id,row)
    },
    // skuForm通知父组件修改场景
    changeScenes(scene){
      // 此处保存按钮，只需要切换场景，不要再次发请求获取SPU数据
      this.scene = scene
    },
    // 查看SKU按钮的回调
    async handler(spu){
      // 点击按钮，让对话框显示
      this.dialogTableVisible = true
      this.spu = spu
      // 发请求，获取SKU列表进行展示
      let result = await this.$API.spu.reqSkuInfo(spu.id)
      if(result.code == 200){
        this.skuList = result.data
        // 当数据回来以后，设置loading效果为隐藏
        this.loading = false
      }
    },
    // 关闭对话框的回调,done 用于关闭 Dialog
    close(done){
      // 让loaing属性再次变为真，显示加载效果
      this.loading = true
      // 清除sku列表的数据
      this.skuList = []
      // 关闭对话框
      done()
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