<template>
  <div>
    <h2>儿子有存款{{money}}</h2>
    <button @click="GiveMoney(50)">给爸爸钱:50</button>
  </div>
</template>

<script>
import MyMixin from './MyMixin'
export default {
  name:'',
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