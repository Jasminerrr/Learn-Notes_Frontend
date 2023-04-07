<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart, index) in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked == 1" @change="updateChecked(cart, $event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <!-- <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li> -->
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus', -1, cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt"
              @change="handler('change', $event.target.value * 1, cart)">
            <a href="javascript:void(0)" class="plus" @click="handler('add', 1, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input 
        class="chooseAll" 
        type="checkbox" 
        :checked="isAllChecked && cartInfoList.length > 0"
        @change="updateAllCartChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{checkedNum}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// 最好引入方式：按需加载，只是引入节流函数，其他函数没有引入（打包项目的时候体积会小）
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$store.dispatch('getShopCart')
    },
    // 修改购物车某个产品个数(需要用到函数节流：采用键值对形式创建函数，将handler定义为节流函数，设置50ms才会执行一次，防止用户触发频繁)
    handler: throttle(async function (type, disNum, cart) {
      // type：区别这三个元素点击是哪个
      // disNum：变化量（+、-），input里面的最终个数（不是变化量）
      // cart：点击的是购物车哪个产品（身上有id）
      // 向服务器发请求 修改数量
      switch (type) {
        case 'minus':
          // 判断产品个数大于1 才能给服务器-1；等于1，传0（数量不变）
          disNum = cart.skuNum > 1 ? -1 : 0
          break;
        case 'add':
          // +1
          disNum = 1
          break;
        case 'change':
          // 如果用户输入非法的最终量（汉字字母|负数），则传0（数量不变）
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0
          } else {
            // 正常输入，有小数则取整：传给服务器的值 = 取整后的用户输入数量 - 原来的数量
            disNum = parseInt(disNum) - cart.skuNum
          }
          break;
      }
      // 派发action 
      try {
        await this.$store.dispatch('addOrUpdateShopCart', { skuId: cart.skuId, skuNum: disNum })
        // 再次发请求获取服务器数据进行展示
        this.getData()
      } catch (error) {
      }
    }, 500),
    // 删除某个产品的操作
    async deleteCartById(cart) {
      try {
        // 等待删除成功的结果
        await this.$store.dispatch('deleteCartListBySkuId', cart.skuId)
        // 成功之后再发请求 获取新数据进行展示
        this.getData();
      } catch (error) {
        alert(error.message)
      }
    },
    // 修改某一个产品勾选的状态
    async updateChecked(cart, event) {
      try {
        // 带给服务器的参数isChecked，不应该是布尔值，而是0|1
        let isChecked = event.target.checked ? '1' : '0'
        await this.$store.dispatch('updataCheckedById', { skuId: cart.skuId, isChecked })
        // 修改成功之后再发请求 获取服务器里面购物车的新数据
        this.getData();
      } catch (error) {
        // 失败也需要获取购物车当前的数据
        this.getData();
      }
    },
    // 删除选中状态的全部产品
    // 此回调无法获取到有用的数据（不传参）
    async deleteAllCheckedCart() {
      try {
        await this.$store.dispatch('deleteAllCheckedCart')
        // 成功后再次发请求获取服务器数据---购物车的列表
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 修改全选框的状态---全部产品勾选状态
    async updateAllCartChecked(event){
      try {
        let isChecked = event.target.checked ? '1' : '0'
        // 派发action
        await this.$store.dispatch('updataAllCartIsChecked',isChecked)
        // 成功后再次发请求 获取购物车数据
        this.getData()
      } catch (error) {
        alert(error.massage)
      }
    }
  },
  computed: {
    ...mapGetters(['cartList']),
    // 购物车数据
    cartInfoList() {
      // 如果this.cartList返回为空对象，则至少保证cartInfoList为空数组
      return this.cartList.cartInfoList || []
    },
    // 计算购物车产品的总价格
    totalPrice() {
      let sum = 0
      this.cartInfoList.forEach(item => {
        if(item.isChecked){
          sum += item.skuPrice * item.skuNum
        }
      })
      return sum
    },
    // 判断全选框的状态：全部产品勾选，才全选
    // 数组方法：every()：看作&& 全真则真；some()：看作 || 一个真，则真
    isAllChecked() {
      // 遍历购物车数组里面的元素 isChecked是否都为1 全为1 返回真
      return this.cartInfoList.every(item => item.isChecked == 1)
    },
    checkedNum(){
      let num = 0
      this.cartInfoList.forEach(item => {
        if(item.isChecked){
          num += item.skuNum
        }
      })
      return num
    }
  }
}
</script>


<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        /* .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          } */

        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>