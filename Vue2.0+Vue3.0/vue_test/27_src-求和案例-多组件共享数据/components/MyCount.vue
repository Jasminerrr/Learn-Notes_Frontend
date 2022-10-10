<template>
  <div>
    <h3>当前求和为{{sum}}</h3>
    <h2>当前求和放大10倍为{{bigSum}}</h2>
    <h2>我在{{school}}学习{{subject}}</h2>
    <h1>MyPerson的组件总人数是{{personList.length}}</h1>
    <!-- v-model.number强制转换为number类型 -->
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="incrementOdd(n)">当求和为奇数时再加</button>
    <button @click="incrementWait(n)">等500毫秒再加</button>
  </div>
</template>

<script>
  // 引入mapState,mapGetters
  import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
  export default {
    name:'MyCount',
    data(){
      return {
        n:1,
      }
    },
    computed:{
      // 借助mapState生成计算属性，从state中读取数据（对象写法）
      // ...mapState({sum:'sum',school:'school',subject:'subject'}),

      // 数组写法
      ...mapState(['sum','school','subject','personList']),
      /* *************************************************** */
      
      // 借助mapGetters生成计算属性，从Getters中读取数据（对象写法）
      // ...mapGetters({bigSum:'bigSum'})
      // 数组写法
      ...mapGetters(['bigSum']),
    },
    methods:{
      // 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations（对象写法）
      ...mapMutations({increment:'JIA',decrement:'JIAN'}),
      // 数组写法
      // ...mapMutations(['JIA','JIAN']),// 上面模板要改成JIA和JIAN

      /* *************************************** */

      // 借助mapActions生成对应的方法，方法中会调用dispatch去联系actions（对象写法）
      ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'}),
      // 数组写法
      // ...mapActions(['jiaOdd','jiaWait']), // 上面模板要改成jiaOdd和jiaWait
    }  
  }
</script>

<style scoped>
  button{
    margin-left: 5px;
  }
</style>