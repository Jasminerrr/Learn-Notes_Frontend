<template>
  <div>
    <h2>女儿有存款{{money}}</h2>
    <button @click="GiveMoney(100)">给爸爸钱:100</button>
  </div>
</template>

<script>
import MyMixin from './MyMixin'
export default {
  name:'',
  // ​	局部混入
  mixins:[MyMixin],
  data(){
    return {
      money:10000
    }
  },

}
</script>

<style>

</style>