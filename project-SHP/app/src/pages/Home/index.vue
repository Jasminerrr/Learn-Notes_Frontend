<template>
  <div>
    <!-- 三级联动全局组件：已经全局注册， 不需要再引入 -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <!-- Floor组件内部没有发请求，数据是父组件给的，当父组件有数据后，才渲染的子组件 -->
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
  </div>
</template>

<script>
  // 引入插件
  import ListContainer from '@/pages/Home/ListContainer';
  import Recommend from '@/pages/Home/Recommend';
  import Rank from '@/pages/Home/Rank';
  import Like from '@/pages/Home/Like';
  import Floor from '@/pages/Home/Floor';
  import Brand from '@/pages/Home/Brand';

  // 引入mapState
  import {mapState} from 'vuex'
  export default {
    name:'',
    components: { ListContainer,Recommend,Rank,Like,Floor,Brand },
    mounted(){
      // 派发action，获取floor组件的数据
      this.$store.dispatch('getFloorList')
      // 获取用户信息，在首页展示
      // this.$store.dispatch('getUserInfo')
    },
    computed:{
      ...mapState({
        floorList:state => state.home.floorList
      }),
    }
  }
</script>

<style>

</style>