<template>
  <div class="bottomBar">
    <div class="checkContent">
      <CheckButton
        class="checkButton"
        :ischecked="ischeckedAll"
        @click.native="checkAll"
      />
      <span>全选</span>
      <div class="totalprice"> 合计:￥{{totalPrice}}</div>
      <div class="totalitems"> 结算({{checkLength}})</div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/checkButton.vue'

export default {
  name: "bottomBar",
  components: {
    CheckButton
  },
  methods: {
    checkAll () {
      if (this.ischeckedAll) {
        this.$store.state.cartList.forEach(item => item.checked = false)
      } else {
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    }
  },
  computed: {
    totalPrice () {
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength () {
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).length
    },
    ischeckedAll () {
      if (this.$store.getters.getCartLength === 0) return false
      return (!this.$store.state.cartList.find(item => item.checked === false))
    }
  }
}
</script>

<style>
.bottomBar {
  position: relative;
  height: 40px;
  line-height: 40px;
  background: #eee;
  font-size: 14px;
}
.checkContent {
  display: flex;
  align-items: center;
}
.checkButton {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-left: 10px;
  margin-right: 10px;
}
.totalprice {
  flex: 1;
  margin-left: 20px;
}
.totalitems {
  float: right;
  color: #ffffff;
  background-color: var(--color-tint);
  padding-left: 20px;
  padding-right: 20px;
}
</style>