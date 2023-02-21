<template>
  <div>
    <!-- 最外层大表格 -->
    <el-table style="width:100%" border :data="records">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="skuName" label="名称" width="width"></el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width"></el-table-column>
      <el-table-column label="默认图片" width="110">
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg" style="width: 80px;height: 80px;">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)" width="80"></el-table-column>
      <el-table-column prop="price" label="价格(元)" width="80"></el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row,$index}">
          <!-- isSale为1：上架，为0是下架商品 -->
          <el-button type="success" icon="el-icon-bottom" size="mini" v-if="row.isSale==0" @click="sale(row)"></el-button>
          <el-button type="info" icon="el-icon-top" size="mini" v-else @click="cancel(row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit"></el-button>
          <el-button type="info" icon="el-icon-info" size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>

        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination 
      style="margin-top: 20px; text-align: center;" 
      :current-page="page" 
      :total="total" 
      :page-size="limit"
      :page-count="7" 
      :page-sizes="[3, 5, 10]" 
      layout="prev, pager, next, jumper,->,sizes,total"
      @current-change="getSkuList"
      @size-change="sizeChange"
      >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name:'Sku',
  data() {
    return {
      page:1, // 当前页
      limit:10, // 每页展示数据条数
      records:[], // 存储SKU列表的数据
      total:0, // 分页器展示的总数据条数
    }
  },
  // 组件挂载完毕
  mounted() {
    // 挂载完毕时需要发请求 获取SKU列表方法
    this.getSkuList()
  },
  methods: {
    // 获取SKU列表事件
    async getSkuList(pager = 1){
      // 点击页码时，将当前页数传进去
      this.page = pager
      // 解构默认参数
      const {page,limit} = this
      let result = await this.$API.sku.reqSkuList(page,limit)
      if(result.code == 200){
        this.records = result.data.records
        this.total = result.data.total
      }
    },
    // 展示每页数据个数改变时触发(参数为每页数据个数    )
    sizeChange(limit){
      // 修改参数
      this.limit = limit
      // 再次发请求获取列表数据
      this.getSkuList()
    },
    // 点击箭头朝下按钮事件--上架
    async sale(row){
      // 上架操作
      let result = await this.$API.sku.reqSale(row.id)
      if(result.code == 200){
        //  让isSale状态为1，上架
        row.isSale = 1
        this.$message({type:'success',message:'上架成功'})
      }
    },
    // 点击箭头朝下架按钮事件--下架
    async cancel(row){
      // 下架操作
      let result = await this.$API.sku.reqCancel(row.id)
      if(result.code == 200){
        //  让isSale状态为0，下架
        row.isSale = 0
        this.$message({type:'success',message:'下架成功'})
      }
    },
    edit(){
      this.$message({type:'info',message:'正在开发中'})
    },
  },
}
</script>

<style>

</style>