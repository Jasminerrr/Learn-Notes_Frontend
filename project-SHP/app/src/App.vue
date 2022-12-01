<template>
  <div>
    <Header/>
    <!-- 路由视图：指定组件的呈现位置(占位) -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
  import Header from './components/Header'
  import Footer from './components/Footer'
  export default {
    name:'App',
    components:{
      Header,
      Footer,
    },
    mounted(){
      // 通知Vuex发请求，获取数据存储在仓库当中
      // 在App根组件当中派发一个action，获取三级列表得数据，(mounted只会执行一次，只用发一次请求)
      this.$store.dispatch('getCategoryList')
    },
    
  }
</script>

<style>

</style>