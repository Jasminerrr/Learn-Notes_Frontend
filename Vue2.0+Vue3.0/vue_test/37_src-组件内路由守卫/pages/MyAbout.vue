<template>
  <div>
    <h2>我是About的内容</h2>
  </div>
</template>

<script>
  export default {
    name:'MyAbout',
    beforeRouteEnter (to, from, next) {
      if(to.meta.isAuth){// 判断当前路由是否需要鉴定权限
        if(localStorage.getItem('school') === 'abc'){ // 权限控制的具体规则
          next()// 放行
        }else{
          alert('学校名不对，无权限')
        }
      }else{
        next()
      }
    },
    beforeRouteLeave (to, from, next) {
      next()
    }
  }
</script>