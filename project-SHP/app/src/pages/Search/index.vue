<template>
  <div>
    <!-- 商品分类三级列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread面包屑：带有x的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <!-- 品牌属性值的面包屑，展示的数据：需要将数据分割为数组，取索引值为1的 -->
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">
              {{ attrValue.split(':')[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <!-- 综合、价格...结构 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a>综合<span v-show="isOne" class="iconfont"
                      :class="{ 'icon-long-arrow-up': isAsc, 'icon-long-arrow-down': isDesc }"></span></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a>价格<span v-show="isTwo" class="iconfont"
                      :class="{ 'icon-long-arrow-up': isAsc, 'icon-long-arrow-down': isDesc }"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good, index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 跳转路由时记得带id--params参数 -->
                    <router-link :to="`/detail/${good.id}`"><img v-lazy="good.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> {{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 父给子通过props传递数据 -->
          <Pagination 
          :pageNo="searchParams.pageNo" 
          :pageSize="searchParams.pageSize" 
          :total="total" 
          :continues="5" 
          @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters , mapState} from 'vuex'
export default {
  name: 'Search',
  components: {
    SearchSelector
  },
  data() {
    return {
      // 带给服务器的参数，默认为空
      searchParams: {
        // 产品对应的id
        "category1Id": "",
        "category2Id": "",
        "category3Id": "",
        // 产品名
        "categoryName": "",
        // 搜索的关键字
        "keyword": "",
        // 排序 初始值：价格|降序 1: 综合,2: 价格 asc: 升序,desc: 降序
        "order": "1:desc",
        // 分页器：第几页
        "pageNo": 1,
        // 每页展示的产品条数
        "pageSize": 10,
        // 品牌属性的操作
        "props": [],
        // 品牌
        "trademark": ""
      }
    }
  },
  // 要在组件挂载前执行一次
  beforeMount() {
    // ES6新增对象语法：Object.assign(目标对象,源对象):用于对象的合并
    // 在发请求前，整理好接口需要的参数
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  // mounted钩子在组件挂载完毕只会执行一次，所以将请求在方法里面封装成一个函数
  mounted() {
    // 在发请求前带给服务器参数（searchParams参数发生变化时的数据带给服务器）
    this.getData()
  },
  computed: {
    ...mapGetters(['goodsList', 'trademarkList', 'attrsList']),
    // 绑定class样式：如果排序为真 有1，则有active样式
    isOne() {
      return this.searchParams.order.indexOf('1') != -1
    },
    // 如果排序为有2，则有active样式
    isTwo() {
      return this.searchParams.order.indexOf('2') != -1
    },
    // 如果升序，则有升序图标
    isAsc() {
      return this.searchParams.order.indexOf('asc') != -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') != -1
    },
    //右侧需要的是一个函数，当使用这个计算属性时，函数会立即执行一次
    // 注入一个参数state，即为大仓库中的数据
    ...mapState({
      total:state => state.search.searchList.total
    })
  },
  methods: {
    // 向服务器发请求获取search数据（根据不同参数，返回不同的数据进行展示）
    // 将这次请求封装成一个函数：当需要的时候再调用
    getData() {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    // 点击 x 删除分类的面包屑名字
    removeCategoryName() {
      // 将服务器带的参数置空后，
      // 带给服务器的参数为可有可无时，可以将字段变为undefined，则不会把字段带给服务器：网络性能更好
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.searchParams.categoryName = undefined
      // 修改完参数后，还需要向服务器发请求（展示默认数据）
      this.getData()
      // 清空参数后，地址栏也需要修改：进行路由跳转（自己跳自己）
      // 注意：是要删除query参数，params参数应该保留
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params })
      }
    },
    // 删除关键字的面包屑名字
    removeKeyword() {
      // 将服务器带的参数置空
      this.searchParams.keyword = undefined
      // 需要再次向服务器发请求（展示默认数据）
      this.getData()
      // 通知兄弟组件header清除关键字
      this.$bus.$emit('clear')
      // 清空参数后，地址栏也需要修改：进行路由跳转（自己跳自己）
      // 注意：是要删除query参数，params参数应该保留
      if (this.$route.query) {
        this.$router.push({ name: 'search', query: this.$route.query })
      }
    },
    // 给子组件绑定自定义事件的回调(品牌)
    trademarkInfo(trademark) {
      // 整理品牌字段的参数：'ID:品牌名称'
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      // 整理完参数后需要再次发请求:获取search模块数据进行展示
      this.getData()
    },
    // 删除品牌的面包屑名字
    removeTrademark() {
      // 将服务器带的参数置空
      this.searchParams.trademark = undefined
      // 需要再次向服务器发请求（展示默认数据）
      this.getData()
    },
    // 给子组件绑定自定义事件的回调（品牌属性和属性值）
    attrInfo(attr, attrValue) {
      // 整理品牌属性和属性值的参数：['属性ID：属性值：属性名']
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      // 数组去重：多次点击只能有一个面包屑（if语句只有一行代码时可以省略花括号）
      if (this.searchParams.props.indexOf(props) == -1) this.searchParams.props.push(props)
      // 整理好参数再次发请求
      this.getData()
      console.log(attr, attrValue);
    },
    // 删除品牌售卖属性的面包屑名字
    removeAttr(index) {
      // 再次整理参数：删除数组里面的元素 将服务器带的参数置空
      this.searchParams.props.splice(index, 1)
      // 需要再次向服务器发请求（展示默认数据）
      this.getData()
    },
    // 点击事件排序的操作 flag：用户点击时传入的参数（1|2）
    changeOrder(flag) {
      let originOrder = this.searchParams.order
      // 获取最开始的状态 用于下次点击的判断 字符串分割为数组 split('分隔符')[数组第几项];
      let originFlag = originOrder.split(':')[0]
      let originSort = originOrder.split(':')[1]
      console.log(originFlag,originSort);
      // 准备一个新的order属性值 新的排序方式
      let newOrder = ''
      // 判断用户点击是否与上一次相同，则 重新将数据赋值
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSort == 'desc' ? 'asc' : 'desc'}`
      } else {
        // 点击其他 默认为降序desc
        newOrder = `${flag}:${'desc'}`
      }
      // 将新的newOrder重新赋值给searchParams下的order
      this.searchParams.order = newOrder
      // 修改数据后再次发请求
      this.getData()
    },
    // 子-父通信传：自定义事件回调 获取当前点击的页数：把当前点击的页面数据传给父组件search
    getPageNo(pageNo){
      // 获取当前点击页码后，整理参数带给服务器
      this.searchParams.pageNo = pageNo
      // 再次发请求
      this.getData()
    }
  },
  // 监听组件实例身上属性的属性值变化
  watch: {
    // 监听路由信息的变化，如果变化，讲再次发请求
    $route(newValue, oldValue) {
      // 在发请求前，整理合并带给服务器的参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      // 整理完参数，再次发请求
      this.getData()
      // 请求完后，需要将三级分类的id清空，接收下一次传过来的id
      // 产品名和关键字不需要清空，因为每次路由发现变化时，会赋予新的值进行替换
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>