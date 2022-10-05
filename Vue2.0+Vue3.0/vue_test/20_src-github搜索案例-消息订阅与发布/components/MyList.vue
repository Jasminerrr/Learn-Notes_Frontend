<template>
  <div class="row">
    <!-- 展示用户列表 --> 
    <div class="card" v-for="user in info.users" :key="user.login" >
      <!-- 链接跳转：动态绑定用户链接地址 -->
      <a :href="user.html_url" target="_blank">
        <!-- 动态绑定用户头像 -->
        <img :src="user.avatar_url" style='width: 100px' />
      </a>
      <!-- 用户登录名 -->
      <p class="card-text">{{user.login}}</p>
    </div>
    <!-- 展示欢迎词 -->
    <h2 v-show="info.isFirst">欢迎你</h2>
    <!-- 展示加载中 -->
    <h2 v-show="info.isLoading">加载中</h2>
    <!-- 展示错误信息 -->
    <h2 v-show="info.errMsg">{{info.errMsg}}</h2>
  </div>
</template>

<script>
  import pubsub from 'pubsub-js';
  export default {
    name: 'MyList',
    data(){
      return {
        info:{
          isFirst:true,
          isLoading:false,
          errMsg:'',
          users:[]
        }
      }
    },
    mounted(){
      // 接收数据，绑定自定义事件
      pubsub.subscribe('updateListData',(msgName,dataObj)=>{
        // 收到数据后 用dataObj替换info (通过字面量形式去合并对象:重名属性以后面为主，其他则保留)
        this.info = {...this.info,...dataObj}
      })
    }
  }
</script>

<style scoped>
  .album {
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f7f7f7;
  }

  .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
  }

  .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
  }

  .card-text {
    font-size: 85%;
  }
</style>