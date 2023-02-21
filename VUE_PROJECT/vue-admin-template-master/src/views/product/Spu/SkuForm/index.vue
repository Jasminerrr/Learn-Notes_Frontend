<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="SPU名称">
        {{ spu.spuName }}
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input v-model="skuInfo.skuName" placeholder="SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="skuInfo.price" placeholder="价格（元）" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="skuInfo.weight" placeholder="重量（千克）"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" rows="4" placeholder="规格描述" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <!-- 此处一行有多个下拉框，需要用到行内表格，多个item需要遍历 -->
        <el-form :inline="true">
          <el-form-item :label="attr.attrName" v-for="(attr, index) in attrInfoList" :key="attr.id">
            <!-- 此处只需要收集属性的id和属性值的id -->
            <el-select v-model="attr.attrIdAndValueId" placeholder="请选择">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`"
                v-for="(attrValue, index) in attr.attrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <!-- 此处一行有多个下拉框，需要用到行内表格 -->
        <el-form :inline="true">
          <el-form-item :label="saleAttr.saleAttrName" v-for="(saleAttr, index) in spuSaleAttrList" :key="saleAttr.id">
            <el-select v-model="saleAttr.attrIdAndValueId" placeholder="请选择">
              <el-option :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`"
                v-for="(saleAttrValue, index) in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <!-- data:表格组件将来需要展示的数据--只有数组类型 -->
        <!-- table组件：selection-change	当选择项发生变化时会触发该事件 -->
        <el-table style="width:100%" width="80px" border :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column width="80" type="selection"></el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{row,$index}">
              <img :src="row.imgUrl" style="width:100px;height:100px;">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width"></el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" v-if="row.isDefault == 0" @click="changeDefault(row)">设为默认</el-button>
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      spuImageList: [],  // 存储图片数据
      spuSaleAttrList: [], // 存储销售属性数据
      attrInfoList: [],  // 存储平台商品基础属性数据
      skuInfo: {  // 收集sku数据的字段 将来提交表单要给服务器
        // 第一类收集的数据，都是父组件给的
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 第二类数据需要v-model双向绑定
        skuName: '',
        price: 0,
        weight: '',
        skuDesc: '',
        // 第三类：需要自己书写代码
        skuDefaultImg: '', // 设置默认值图片
        skuImageList: [  // 收集图片的字段
          /* {
            id: 0,
            imgName: "string",
            imgUrl: "string",
            isDefault: "string",
            skuId: 0,
            spuImgId: 0
          } */
        ],
        skuAttrValueList: [ // 平台属性
          /* {
            attrId: 0,
            valueId: 0,
          } */
        ],
        skuSaleAttrValueList: [  // 销售属性
          /* {
            id: 0,
            saleAttrId: 0,
            saleAttrName: "string",
            saleAttrValueId: 0,
            saleAttrValueName: "string",
            skuId: 0,
            spuId: 0
          } */
        ],
      },
      spu: {}, // 存储spu的数据
      imageList: [], // 收集图片的数据，但收集的数据（服务器返回）缺少isDefault字段，将来提交服务器数据的时候，需要整理参数
    }
  },
  methods: {
    // 获取skuForm数据（图片，销售、商品基础属性）
    async getData(category1Id, category2Id, spu) {
      // 收集父组件给予的数据
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.skuId = spu.id
      this.skuInfo.tmId = spu.tmId
      this.spu = spu
      // 获取图片的数据
      let spuImageResult = await this.$API.spu.reqSpuImageList2()
      if (spuImageResult.code == 200) {
        let list = spuImageResult.data
        // 将收集的数组数据加上isDefault字段
        list.forEach(item => {
          // 初始值为0：设置默认，1为默认
          item.isDefault = 0
        });
        // 将整理好的参数赋值给图片数据
        this.spuImageList = list
      }
      // 获取销售属性的数据
      let SaleResult = await this.$API.spu.reqSpuSaleAttrList(spu.id)
      if (SaleResult.code == 200) {
        this.spuSaleAttrList = SaleResult.data
      }
      // 获取商品基础属性的数据
      let AttrInfoResult = await this.$API.spu.reqAttrInfoList(category1Id, category2Id, spu.category3Id)
      if (AttrInfoResult.code == 200) {
        this.attrInfoList = AttrInfoResult.data
      }
    },
    // table表格复选框按钮事件:当勾选框发生变化时会触发，组件将勾选的params参数传过来--是数组形式
    handleSelectionChange(params) {
      // 获取到用户选中图片的数据，但是当前收集的数据中缺少isDefault字段
      this.imageList = params
    },
    // 切换默认按钮事件
    changeDefault(row) {
      // 让图片列表数据的isDefault字段变为1(默认)
      // 排他思想 先让所有的按钮变为0，再将点击按钮设为1
      this.spuImageList.forEach(item => {
        item.isDefault = 0
      })
      row.isDefault = 1
      // 收集默认图片的地址
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    // 点击取消按钮，子组件通知父组件切换场景
    cancel() {
      // 组件的自定义事件（子传父），切换场景为0
      this.$emit('changeScenes', 0)
      // 取消需要清除数据
      Object.assign(this._data, this.$options.data())
    },
    // 保存按钮事件
    async save() {
      // 整理平台属性参数方式1：使用forEach遍历
      /* 
      // 先解构参数
      const {attrInfoList,skuInfo} = this
      // 创建新数组，后面遍历数据存进来
      let arr = []
      // 遍历出平台属性的每个对象，再将对象的id参数分割成数组
      attrInfoList.forEach(item => {
        // 平台属性有attrIdAndValueId，则代表用户选择了属性值
        if(item.attrIdAndValueId){
          // 将数组参数分割，解构出来参数
          const [attrId,valueId] = item.attrIdAndValueId.split(':')
          // 将参数整理成对象
          let obj = {attrId,valueId}
          // 再将对象放进数组，赋值给skuInfo.skuAttrValueList
          arr.push(obj)
        }
      })
      // 将数组赋值给skuInfo.skuAttrValueList
      skuInfo.skuAttrValueList = arr
       */

      // 整理平台属性参数方式2：
      // 使用reduce(回调函数(pre,current),统计初始值);
      // pre：上一次值；
      // current：当前值（遍历的元素）；
      // 需要将结果返回：为最后一次调用的统计值；
      const { attrInfoList, skuInfo, spuSaleAttrList, imageList } = this  // 解构参数
      skuInfo.skuAttrValueList = attrInfoList.reduce((pre, item) => { // 使用reduce将遍历每一项，让pre初始值为空数组
        if (item.attrIdAndValueId) { // 如果对象有参数，则分割数组，解构数组里面的参数
          const [attrId, valueId] = item.attrIdAndValueId.split(':')
          pre.push({ attrId, valueId }) // 再将对象放入上一次值里面（数组）
        }
        return pre // 需要将结果返回，当作最后一次执行返回的结果
      }, [])
      // 整理销售属性数据
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((pre, item) => { // 使用reduce将遍历每一项，让pre初始值为空数组
        if (item.attrIdAndValueId) { // 如果对象有参数，则分割数组，解构数组里面的参数
          const [saleAttrId, saleAttrValueId] = item.attrIdAndValueId.split(':')
          pre.push({ saleAttrId, saleAttrValueId }) // 再将对象放入上一次值里面（数组）
        }
        return pre // 需要将结果返回，当作最后一次执行返回的结果
      }, [])
      // 整理图片数据
      skuInfo.skuImageList = imageList.map((pre, item) => { // 使用map遍历:返回一个新数组,为原始数组元素调用函数处理后的值
        return {  // 将已经收集的值，赋值给skuInfo.skuImageList数组里面
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })
      // 整理完参数后，发请求把数据传给服务器
      let result = await this.$API.spu.reqAddSku(skuInfo)
      if (result.code == 200) {
        // 请求成功，通知父组件切换场景为0，
        this.$emit('changeScenes', 0)
      }
    },
  },
}
</script>

<style></style>