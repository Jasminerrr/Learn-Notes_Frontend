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
          <el-button type="info" icon="el-icon-info" size="mini" @click="getSkuInfo(row)"></el-button>
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
    <!-- 抽屉效果 visible：是否显示 Drawer，支持 .sync 修饰符 -->
    <el-drawer :visible.sync="drawer" :show-close="false" size="50%">
      <!-- row：行，col：列 -->
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{skuInfo.skuName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{skuInfo.skuDesc}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{skuInfo.price}}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag type="success" v-for="(attr,index) in skuInfo.skuAttrValueList" :key="attr.id" style="margin-right:10px;margin-top:2px">{{ attr.attrId }}-{{ attr.valueId }}</el-tag>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="450px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" style="width: 100%;height: 100%;">
            </el-carousel-item>
          </el-carousel>      
        </el-col>
      </el-row>
    </el-drawer>
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
      total:0, // 分页器展示的总数据条数\
      skuInfo:{},  // 存储sku数据
      drawer:false, // 抽屉初始值为假
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
    // 点击详情按钮 获取SKU详情方法
    async getSkuInfo(sku){
      // 展示数据
      // 让抽屉属性为真 显示
      this.drawer = true
      // 获取SKU数据
      let result = await this.$API.sku.reqSkuById(sku.id)
      if(result.code == 200){
        // 将服务器返回的数据存起来
        this.skuInfo = result.data
      }
    },
    
  },
}
</script>


<style>
  /* .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  } */

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>

<style scoped>
  .el-row .el-col-5{
    font-size:18px;
    text-align:right;
  }
  .el-col{
    margin:10px 10px;
  }
  /* 此处原生css用到>>>深度选择器：父组件样式添加了scoped属性，还可以影响到子组件的样式*/
  >>>.el-carousel__button{
    width:10px;
    height:10px;
    background-color:red;
    border-radius:50%;
  }
</style>