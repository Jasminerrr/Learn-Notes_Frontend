<template>
  <div>
    <h2>爸爸有存款：{{money}}</h2>
    <button @click="BorrowSon(100)">找儿子借100</button>
    <button @click="BorrowDaughter(150)">找女儿借150</button>
    <button @click="BorrowAll(200)">找所有孩子借200</button>
    <br>
    <br>
    <Son ref="boy"/>
    <br>
    <Daughter ref="girl"/>
  </div>
</template>

<script>
import Son from './Son';
import Daughter from './Daughter';
  // 默认暴露-直接暴露组件配置对象
  export default {
    name: "App",
    components:{Son,Daughter},
    data(){
      return {
        money:1000
      }
    },
    methods:{
      // 找儿子借钱，爸爸的钱累加100
      BorrowSon(money){
        this.money += money
        // ref可以获取真实DOM节点，也可以获取子组件标签（操作子组件的数据和方法）
        this.$refs.boy.money -= money

      },
      // 找女儿借钱，爸爸的钱累加150
      BorrowDaughter(money){
        this.money += money
        this.$refs.girl.money -= money
      },
      // 找所有孩子借钱，爸爸的钱累加200 * 2
      BorrowAll(money){
        this.money += 2 * money
        // 此处不再用ref属性
        // $children：组件实例身上属性，可以获取到当前组件中的全部子组件
        // 注意：多个组件返回是一个数组，不能通过数组索引值操作，因为组件多了之后不能确定第0项
        this.$children.forEach(item => {
          item.money -= money
        })
      }
    }
};
</script>

