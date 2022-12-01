<template>
  <!-- 轮播图 -->
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
        <img :src="carousel.imgUrl">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props: ['list'],
  mounted() {
    var mySwiper = new Swiper(this.$refs.cur,
      {
        // autoplay: true,//可选选项，自动滑动
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    })
  },
  // 获取数据另一种方法(使用watch+nextTick)
  /* watch:{
    // 初始化swiper实例：在new Swiper实例之前，必须要有页面结构
    // 因为dispatch是异步请求，导致遍历的时候结构还不完整，所以不能直接放在mounted里面
    // 通过watch监听bannerList属性值的变化，如果执行handler方法，则代表组件实例身上此属性已经有了（数组：四个元素）但是不能保证v-for执行完毕
    // 完美解决办法：watch + nextTick
     bannerList:{
      // 初始化的时候让handler调用一下（不管数据有没有变化，立即监听一次）
      immediate:true,
      handler(newValue,oldValue){
        // nextTick：在下次DOM更新 循环结束之后，执行指定回调。在修改数据后，立即使用此方法，获取更新后的DOM
        this.$nextTick(()=>{
          // 不要直接操作DOM，使用ref属性
            // document.querySelector('.swiper-c ontainer'),
          var mySwiper = new Swiper(this.$refs.cur, 
            {
            // autoplay: true,//可选选项，自动滑动
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      }
    }
  }  */
}
</script>

<style>

</style>