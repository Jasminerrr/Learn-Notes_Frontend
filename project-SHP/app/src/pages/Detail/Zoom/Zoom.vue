<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuImageList'],
    data() {
      return {
        currentIndex:0
      }
    },
    computed:{
      // 如果服务器数据还没回来，skuImageList为空数组,则skuImageList.[0]为undefined，要至少保证数据skuImageList[0]为空对象
      imgObj(){
        return this.skuImageList[this.currentIndex] || {}
      }
    },
    // 接收兄弟组件Zoom的索引值
    mounted(){
      this.$bus.$on('getIndex',(index)=>{
        // 修改当前响应式数据currentIndex
        this.currentIndex = index
      })
    },
    methods:{
      handler(e){
        let mask = this.$refs.mask
        let big = this.$refs.big
        // 鼠标到目标元素的x - 遮罩层自身的一半
        // 算出遮罩层移动的距离
        let x = e.offsetX - mask.offsetWidth / 2
        let y = e.offsetY - mask.offsetHeight / 2
        // 控制遮罩层不超出目标元素
        if(x <= 0) x = 0
        if(x >= mask.offsetWidth) x = mask.offsetWidth
        if(y <= 0) y = 0
        if(y >= mask.offsetHeight) y = mask.offsetHeight
        // 改变元素的left|top的值
        mask.style.left = x + 'px'
        mask.style.top = y + 'px'
        // 大图的移动方向和遮罩层相反，为负，且大图是原图的2倍，移动距离也放大2倍
        big.style.left = - 2 * x + 'px'
        big.style.top = - 2 * y + 'px'
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>