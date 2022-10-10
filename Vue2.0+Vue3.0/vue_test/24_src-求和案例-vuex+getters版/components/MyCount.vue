<template>
  <div>
    <!-- 组件中读取vuex中的数据：$store.state.sum -->
    <h3>当前求和为{{$store.state.sum}}</h3>
    <h2>当前求和放大10倍为{{$store.getters.bigSum}}</h2>
    <!-- v-model.number强制转换为number类型 -->
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementOdd">当求和为奇数时再加</button>
    <button @click="incrementWait">等500毫秒再加</button>
  </div>
</template>

<script>
  export default {
    name:'MyCount',
    data(){
      return {
        n:1,
      }
    },
    methods:{
      increment(){
        // 没有网络请求或业务逻辑直接调用commit
        this.$store.commit('JIA',this.n)
      },
      decrement(){
        this.$store.commit('JIAN',this.n)
      },
      incrementOdd(){
        this.$store.dispatch('jiaOdd',this.n)
      },
      incrementWait(){
        this.$store.dispatch('jiaWait',this.n)
      },
    }
  }
</script>

<style scoped>
  button{
    margin-left: 5px;
  }
</style>