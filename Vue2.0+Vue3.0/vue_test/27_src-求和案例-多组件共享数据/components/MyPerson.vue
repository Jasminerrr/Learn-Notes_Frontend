<template>
  <div>
    <h1>人员列表</h1>
    <input type="text" placeholder="请输入名字" v-model="name">
    <button @click="add">添加</button>
    <h1>MyCount组件求和为{{sum}}</h1>
    <ul>
      <li v-for="p in personList" :key="p.id">{{p.name}}</li>
    </ul>
  </div>
</template>

<script>
  import {nanoid} from 'nanoid'
  export default {
    name:'MyPerson',
    data(){
      return {
        name:''
      }
    },
    computed:{
      // 自己写方法
      personList(){
        return this.$store.state.personList
      },
      sum(){
        return this.$store.state.sum
      }
    },
    methods:{
      add(){
        const personObj = {id:nanoid(),name:this.name}
        this.$store.commit('ADD_PERSON',personObj)
        this.name = ''

      }
    }
  }
</script>
