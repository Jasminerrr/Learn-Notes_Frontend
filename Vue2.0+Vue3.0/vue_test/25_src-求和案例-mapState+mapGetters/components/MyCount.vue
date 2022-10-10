<template>
  <div>
    <h3>当前求和为{{sum}}</h3>
    <h2>当前求和放大10倍为{{bigSum}}</h2>
    <h2>我在{{school}}学习{{subject}}</h2>
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
  // 引入mapState,mapGetters
  import {mapState,mapGetters} from 'vuex'
  export default {
    name:'MyCount',
    data(){
      return {
        n:1,
      }
    },
    computed:{
      // 靠程序员自己亲自写计算属性
      /* sum(){
        return this.$store.state.sum
      },
      school(){
        return this.$store.state.school
      },
      subject(){
        return this.$store.state.subject
      }, */
      // 借助mapState生成计算属性，从state中读取数据（对象写法）
      // ...mapState({sum:'sum',school:'school',subject:'subject'}),

      // 数组写法
      ...mapState(['sum','school','subject']),
      /* *************************************************** */
      
      /* bigSum(){
        return this.$store.state.bigSum
      } */
      // 借助mapGetters生成计算属性，从Getters中读取数据（对象写法）
      // ...mapGetters({bigSum:'bigSum'})
      // 数组写法
      ...mapGetters(['bigSum'])
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