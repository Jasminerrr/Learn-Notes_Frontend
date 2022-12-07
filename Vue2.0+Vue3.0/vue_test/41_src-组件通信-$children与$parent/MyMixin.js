// 对外暴露的对象，可以放置组件重复的js业务逻辑
export default {
  methods: {
    GiveMoney(money){
      // 女儿少100
      this.money -= money
      // 需要在子组件内部获取父组件，让父组件的数据加上100
      // $parent：组件实例身上的属性，可以获取到某一组件的父组件，操作父组件的数据和方法
      this.$parent.money += money
    }
  },
}