<template>
  <div>
    <h2>Home组件内容</h2>
    <div>
      <ul class="nav nav-tabs">
        <li>
          <!-- 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。 -->
          <router-link class="list-group-item" active-class="active" to="/home/news">News</router-link>
        </li> 
        <li> 
          <router-link class="list-group-item" active-class="active" to="/home/message">Message</router-link>
        </li>
      </ul>
      <!-- 缓存路由组件：keep-alive让不展示的路由保持挂载，不被销毁，includes写的是【组件名】 -->
      <!-- 需要写在展示区所在的位置 -->

      <!-- 缓存多个路由组件 -->
      <!-- <keep-alive :include="['MyNews','MyMessage']"></keep-alive> -->
      
      <!-- 缓存一个路由组件 -->
      <keep-alive include="MyNews">
        <!-- 指定组件呈现位置 -->
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  export default {
    name:'MyHome'
  }
</script>