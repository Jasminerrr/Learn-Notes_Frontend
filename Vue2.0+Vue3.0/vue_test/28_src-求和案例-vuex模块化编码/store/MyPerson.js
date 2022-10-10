import axios from "axios"
import { nanoid } from "nanoid"

//人员管理相关配置
export default {
  // 开启命名空间
  namespaced:true,
  actions:{
    // 此时value是person对象                                                                  
    addPersonWang(context,value){
      if(value.name.indexOf('王') === 0){
        context.commit('ADD_PERSON',value)
      }else{
        alert('添加的人必须姓王')
      }
    },
    addPersonServer(context){
      axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
        // 成功则联系mutation,把请求回来的文字作为人名
        response => {
          context.commit('ADD_PERSON',{id:nanoid(),name:response.data})
        },
        error => {
          alert(error.message)
        }
      )
    }
  },
  mutations:{
    ADD_PERSON(state,value){
      state.personList.unshift(value)
    }
  },
  state:{
    personList:[
      {id:'001',name:'张三'}
    ]
  },
  getters:{
    firstPersonName(state){
      return state.personList[0].name
    }
  }
}