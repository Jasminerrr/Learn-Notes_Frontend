<template>
  <div>
   <Card/>
   <Sale/>
   <Observe/>
  </div>
</template>

<script>
// 引入子组件
import Card from './Card'
import Sale from './Sale'
import Observe from './Observe'
export default {
  name: 'Dashboard',
  // 注册子组件
  components:{
    Card,Sale,Observe
  },
  mounted() {
    this.$store.dispatch('getData')
  },
}
</script>

<style lang="scss" scoped>

</style>
