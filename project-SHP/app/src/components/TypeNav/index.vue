<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派|事件代理 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <!-- 通过事件代理给父节点添加goSearch -->
            <div class="all-sort-list2" @click="goSearch">
              <div 
              class="item" 
              v-for="(c1,index) in categoryList.slice(0,15)" 
              :key="c1.categoryId" 
              :class="{cur:currentIndex==index}"
              >
                <h3 @mouseenter="changeIndex(index)" >
                  <a 
                  :data-categoryName="c1.categoryName" 
                  :data-category1Id="c1.categoryId"
                  >{{c1.categoryName}}</a>
                </h3>
                <!-- 二级、三级分类  --> 
                <div 
                class="item-list clearfix" 
                :style="{display:currentIndex==index?'block':'none'}"
                >
                  <div 
                  class="subitem" 
                  v-for="(c2,index) in c1.categoryChild" 
                  :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a 
                        :data-categoryName="c2.categoryName" 
                        :data-category2Id="c2.categoryId"
                        >{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                          <a 
                          :data-categoryName="c3.categoryName" 
                          :data-category3Id="c3.categoryId"
                          >{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 这种引入方式是把lodash功能函数全部引入
// import _ from 'lodash'
// 最好引入方式：按需加载，只是引入节流函数，其他函数没有引入（打包项目的时候体积会小）
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  data(){
    return {
      currentIndex:-1,
      show:true,
    }
  },
  // 组件挂载完毕，可以向服务器发请求
  mounted(){
    // 当组件挂载完毕时，将TypeNav商品分类组件隐藏
    if(this.$route.path != '/home'){
      this.show = false
    }
  },
  computed:{
    ...mapState({
      //右侧需要的是一个函数，当使用这个计算属性时，函数会立即执行一次
      // 注入一个参数state，即为大仓库中的数据
      // categoryList:state=>state.home.categoryList 简写
      categoryList:(state)=>{
        return state.home.categoryList
      } 
    })
  },
  methods:{
    // 鼠标经过时，修改响应式数据currentIndex属性
    // 采用键值对形式创建函数，将changeIndex定义为节流函数，该函数触发很频繁时，设置50ms才会执行一次
    // throttle回调函数不能写箭头函数，this指向不一样
    changeIndex:throttle(function(index){
      // index：鼠标经过时的元素索引值
      this.currentIndex = index
    },50),
    
    // 鼠标进入的回调
    enterShow(){
      // 默认显示
      this.show = true
    },
    // 一级分类鼠标移出的回调
    leaveShow(){
      // 鼠标移除时，让索引值为-1，隐藏商品分类
      this.currentIndex = -1
      // 鼠标移除时，不是Home路由组件，则将TypeNav的商品分类进行隐藏
      if(this.$route.path != '/home'){
        this.show = false
      }
    },
    // 进行路由跳转的方法
    goSearch(event){
      // 最好的解决方案是：编程式导航+事件代理(声明式导航会导致点击过快卡顿占内存)
      // 1. 把全部子节点的事件委派给父节点
      // 2. 如何区分点击的是a：在子节点中的a标签添加自定义属性data-categoryName,其余节点是没有的(自定义属性以data-开头，才能被dateset函数获取到)
      // 3. 节点有一个dataset属性，可以获取节点的自定义属性与属性值
      // 4. 区分一、二、三级目录：添加自定义属性data-category1Id...
      let element = event.target
      // 此处是将dataset对象中的属性解构赋值出来
      let {categoryname,category1id,category2id,category3id} = element.dataset
/*       let categoryname = element.dataset.categoryname
      let category1id = element.dataset.category1id
      let category2id = element.dataset.category2id
      let category3id = element.dataset.category3id */
      // 判断点击的元素是否有categoryname，是a标签才会进入
      if(categoryname){
        // 整理路由跳转的参数
        let location = {name:'search'}
        let query = {categoryName:categoryname}
        // 判断一、二、三级的id
        if(category1id){
          query.category1Id = category1id
        }else if (category2id){
          query.category2Id = category2id
        }else {
          query.category3Id = category3id
        }
        // 判断：如果路由跳转携带params参数，也要传递过去
        if(this.$route.params){
          location.params = this.$route.params
          // 整理完参数，合并对象 ，动态给location配置对象添加query属性
          location.query = query
          // 点击后路由跳转
          this.$router.push(location)
        }
      }
    },
  },
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 过渡动画的样式
    // 进入的开始状态 
    .sort-enter{
      height: 0px;
    }
    // 进入的结束状态
    .sort-enter-to{
      height: 461px;
    }
    // 进入的过渡样式
    .sort-enter-active{
      transition: all .5s linear;
    }

  }
}
</style>