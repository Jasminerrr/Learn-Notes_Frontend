<template>
  <div>
    <h3>当前求和为{{sum}}</h3>
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
        sum:0
      }
    },
    methods:{
      increment(){
        this.sum += this.n
      },
      decrement(){
        this.sum -= this.n
      },
      incrementOdd(){
        if(this.sum % 2){
          this.sum += this.n
        }
      },
      incrementWait(){
        setTimeout(() => {
          this.sum += this.n
        }, 500);
      },
    }
  }
</script>

<style scoped>
  button{
    margin-left: 5px;
  }
</style>