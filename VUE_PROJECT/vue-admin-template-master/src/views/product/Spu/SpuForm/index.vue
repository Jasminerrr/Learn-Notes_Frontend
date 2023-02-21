<template>
  <div>
    <!-- form表单：添加spu|修改spu；el-form设置label-width="80px"：下面的所以item会继承此属性 -->
    <el-form label-width="80px">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option :label="tm.tmName" :value="tm.id" v-for="(tm,index) in tradeMarkList" :key="tm.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" rows="4" placeholder="SPU描述" v-model="spu.description"></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!-- 上传图片：
          SpuForm照片墙图片收集：1.预览图片不需要收集(数据已经有了)，2.删除图片 3.添加图片
          action：图片上传的地址(服务器真实的地址)
          list-type：文件列表的类型
          on-preview：图片预览功能
          on-remove：删除图片的回调
          file-list：显示照片墙的数据（数组：数组里面的元素必须要有name、url属性）
          on-success：文件上传成功的回调
        -->
        <el-upload 
          action="/dev-api/admin/product/fileUpload" 
          list-type="picture-card"
          :on-preview="handlePictureCardPreview" 
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="handlerSuccess"
          >
          <i class="el-icon-plus"></i>
        </el-upload>
        <!-- 控制对话框的显示与隐藏 -->
        <el-dialog :visible.sync="dialogVisible">
          <!-- 动态绑定图片数据 -->
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectSaleAttr.length}未选择`" v-model="attrIdAndAttrName">
          <el-option :label="unSelect.name" :value="`${unSelect.id}:${unSelect.name}`" v-for="(unSelect,index) in unSelectSaleAttr" :key="unSelect.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addSaleAttr">添加销售属性</el-button>
        <el-table style="width:100%" :data="spu.spuSaleAttrList" border>
          <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width"></el-table-column>
          <el-table-column prop="saleAttrValueName" label="属性值名称列表" width="width">
            <!-- row：每一条销售属性的数据；tag：每一个销售属性值 -->
            <template slot-scope="{row,$index}">
              <!-- el-tag：展示已有属性值列表的数据 closable：关闭按钮 disable-transitions：过渡动画 -->
              <el-tag
                :key="tag.id"
                v-for="(tag,index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="handleClose(row,index)"
                >
                {{tag.saleAttrValueName}}
              </el-tag>
              <!-- 此处的v-if="inputVisible"类似之前attr组件写过的span与input切换 -->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="tmName" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteSaleAttr($index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      //存储SPU信息属性（spu属性初始化的时候是一个空对象），在修改spu的时候，会向服务器发请求，把服务器返回的数据(对象)赋值给spu属性，修改时可利用这个对象收集最新的数据提交给服务器
      // 添加SPU，并没有向服务器发请求，数据收集在哪里，有哪些的字段需要看接口文档
      spu: {
        category3Id: 0,  // 三级分类的id
        description: '',  // 描述
        spuName: '', // SPU名称
        tmId: '', // 品牌id
        spuImageList: [ // 收集SPU图片的信息
          /* {
            id: 0,
            imgName: '',
            imgUrl: '',
            spuId: 0
          } */
        ],
        spuSaleAttrList: [  // 平台销售属性与属性值收集
          /* {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: '',
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: '',
                saleAttrName: '',
                saleAttrValueName: '',
                spuId: 0
              }
            ]
          } */
        ],
      },
      tradeMarkList: [], // 存储品牌信息
      spuImageList: [], // 存储SPU图片数据
      saleAttrList: [], // 存储销售属性数据
      attrIdAndAttrName:'',  // 收集未选择的销售属性的id和name
    };
  },
  methods: {
    // 照片墙删除某个图片会触发
    // file：删除的图片
    // fileList：删除图片后剩余的其他图片
    handleRemove(file, fileList) {
      // 收集照片墙图片的数据（对于已有图片中name和url字段，服务器不需要，将来提交数据给服务器时需要处理。）
      this.spuImageList = fileList
    },
    // 照片墙图片预览的回调
    handlePictureCardPreview(file) {
      // 讲图片地址赋值给图片属性
      this.dialogImageUrl = file.url;
      // 显示对话框
      this.dialogVisible = true;
    },
    // 在子组件里面初始化SpuForm数据（在父组件Spu里面通过$refs获取到子组件的此方法，通过子组件发请求）
    async initSpuData(spu) {
      // 获取SPU信息
      let spuResult = await this.$API.spu.reqSpu(spu.id)
      if (spuResult.code == 200) {
        // 在修改spu的时候，需要像服务器发请求，把服务器返回的数据(对象)赋值给spu属性
        this.spu = spuResult.data
      }
      // 获取品牌信息
      let tradeMarkResult = await this.$API.spu.reqTrademarkList()
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data
      }
      // 获取SPU图片数据
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id)
      if (spuImageResult.code == 200) {
        let listArr = spuImageResult.data
        // 由于照片墙的显示的图片数据是数组，里面的元素必须要有name和url字段，
        // 则将服务器返回的数据进行修改
        listArr.forEach(item => {
          item.name = item.imgName
          item.url = item.imgUrl
        });
        // 再把整理好的数据赋值给spuImageList
        this.spuImageList = listArr
      }
      // 获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList()
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data
      }
    },
    // 照片墙图片上传成功的回调
    handlerSuccess(response, file, fileList){
      // 收集成功后图片的信息
      this.spuImageList = fileList
    },
    // 点击添加销售属性的事件
    addSaleAttr(){
      // 需要添加的销售属性的信息（已收集）
      // 把收集到的销售属性数据用split方法进行分割，然后解构
      const [baseSaleAttrId,saleAttrName] = this.attrIdAndAttrName.split(':')
      // 整理数据，向SPU对象里面的spuSaleAttrList销售属性里面添加新的销售属性
      let newSaleAttr = {baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]}
      this.spu.spuSaleAttrList.push(newSaleAttr)
      // 选择属性后清空选择框的数据
      this.attrIdAndAttrName = ''
    },
    // 点击添加销售属性值的回调，需要将button变为input，通过当前销售属性的inputVisible切换
    addSaleAttrValue(row){
      // 由于row对象身上无这两个属性，需要通过$set(谁，'添加的属性'，'初始值')响应式数据收集新增的销售属性值
      this.$set(row,'inputVisible',true)
      this.$set(row,'inputValue','')
    },
    // 销售属性值el-input失去焦点回调
    handleInputConfirm(row){
      // 解构销售属性中需要收集的数据
      const {baseSaleAttrId,inputValue} = row
      // 新增的属性值不能为空，要在新增前判断
      if(inputValue.trim()==''){
        this.$message('属性值不能为空！')
        return
      }
      // 属性值不能重复,some方法，筛选符合条件返回true，则不在遍历
      let result = row.spuSaleAttrValueList.some(item =>{
        return item.saleAttrValueName == inputValue
      })
      // 如果为真（有重复），则返回 不执行以下代码
      if(result) return

      // 新增的销售属性值(baseSaleAttrId,saleAttrValueName是后台表格中需要收集的字段)
      let newSaleAttrValue = {baseSaleAttrId,saleAttrValueName:inputValue}
      // 将新增属性对象的属性值放入属性值的列表(展示数据)
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      // 修改inputVisible属性为false，则不显示input，显示button
      row.inputVisible = false
    },
    // 关闭 Tag(属性值)时触发的事件
    // splice(从哪开始，删除个数)
    handleClose(row,index){
      row.spuSaleAttrValueList.splice(index,1)
    },
    // 点击操作删除按钮 从表格销售数组里面删除销售属性回调
    deleteSaleAttr($index){
      this.spu.spuSaleAttrList.splice($index,1)
    },
    // 保存按钮的回调
    async addOrUpdateSpu(){
      // 整理参数：照片墙的数据，对于新增的图片参数需要携带imgName和imgUrl给服务器
      // map():返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
      this.spu.spuImageList = this.spuImageList.map(item =>{
        return {
          imgName:item.name,
          // 图片地址取决新增图片还是已有的图，如果有response就是新增图片的地址，原有的图片地址则是url
          imgUrl:item.response?item.response.data:item.url
        }
      })
      // 发请求
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
      // 请求成功后弹出成功消息框，
      if(result.code == 200){
        this.$message({type:'success',message:'保存成功'})
        // 通知父组件页面scene回到0（展示spu列表数据）
        this.$emit('changeScene',{scene:0,flag:this.spu.id ? '修改':'添加'})
      }
      // 利用Object.assign()合并方法清除数据
      Object.assign(this._data,this.$options.data())
    },
    // 点击添加SPU按钮，发请求获取品牌信息和品牌属性数据
    async addSpuData(category3Id){
      // 添加SPU的时候需要收集category3Id
      this.spu.category3Id = category3Id
      // 获取品牌信息
      let tradeMarkResult = await this.$API.spu.reqTrademarkList()
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data
      }
      // 获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList()
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data
      }
    },
    // 取消按钮的回调
    cancel(){
      // 通知父组件切换场景为0
      this.$emit('changeScene', {scene:0,flag:''})
      // 清除spu数据,利用Object.assign(目标对象，源对象)：方法用于对象的合并
      // 组件实例this._data，可以操作data当中的响应式数据
      // this.$options可以获取配置对象，配置对象的data函数执行，返回的响应式数据是空的（返回的是初始值）
      Object.assign(this._data,this.$options.data())
    },
  },
  computed:{
    // 计算出还未选择的销售属性
    unSelectSaleAttr(){
      // 整个平台共三个销售属性：saleAttrList 尺寸、颜色、版本
      // 当前spu有自己的销售属性：spu.spuSaleAttrList 颜色
      // filter数组过滤方法：从已有的数组中过滤出用户需要的元素，返回 True 或 False，最后将True放到新数组中
      let result = this.saleAttrList.filter(item =>{
        // every遍历数组：符合条件返回true，不符合返回false
        // 先遍历平台总共属性，再遍历spu自己属性，符合条件(平台属性名字不等于spu属性名字)，则返回true给filter方法，filter将true的属性放入新数组中，最后返回新数组unSelectSaleAttr
        return this.spu.spuSaleAttrList.every(item1 => {
          return item.name != item1.saleAttrName
        },)
      })
      return result
    },
  },
}
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>