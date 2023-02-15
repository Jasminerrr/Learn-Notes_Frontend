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
          action：图片上传的地址
          list-type：文件列表的类型
          on-preview：预览图片的回调
          on-remove：删除图片的回调
          file-list：显示照片墙
        -->
        <el-upload 
          action="/dev-api/admin/product/fileUpload" 
          list-type="picture-card"
          :on-preview="handlePictureCardPreview" 
          :on-remove="handleRemove"
          :file-list="spuImageList"
          >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectSaleAttr.length}未选择`" v-model="attrId">
          <el-option :label="unSelect.name" :value="unSelect.id" v-for="(unSelect,index) in unSelectSaleAttr" :key="unSelect.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrId">添加销售属性</el-button>
        <el-table :data="spu.spuSaleAttrList" border>
          <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width"></el-table-column>
          <el-table-column prop="saleAttrValueName" label="属性值名称列表" width="width">
            <!-- row：每一条销售属性的数据；tag：每一个销售属性值 -->
            <template slot-scope="{row,$index}">
              <!-- @close="handleClose(tag)" -->
              <el-tag
                :key="tag.id"
                v-for="tag in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                >
                {{tag.saleAttrValueName}}
              </el-tag>
              <!-- 此处的v-if="inputVisible"是之前attr组件写过的span与input切换 -->
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="tmName" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('changeScene', 0)">取消</el-button>
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
        tmId: 0, // 品牌id
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
      attrId:'',  // 收集未选择的销售属性的id
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
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