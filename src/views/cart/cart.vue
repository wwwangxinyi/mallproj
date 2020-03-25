<template>
  <div id="cart">
    <navBar class="nav-bar">
      <div slot="center">购物车({{getCartLength}})</div>
    </navBar>
    <cartList class="cart-list" />

    <bottom-bar class="bottomBar" />
  </div>
</template>

<script>
import cartList from "./components/cartList.vue";
import bottomBar from "./components/bottomBar.vue"
import navBar from "components/common/navbar/navBar.vue"

import { mapGetters } from "vuex"
export default {
  name: 'cart',
  components: {
    bottomBar,
    cartList,
    navBar
  },
  computed: {
    ...mapGetters(['getCartLength', 'getCartList'])
  }
}
</script>

<style>
#cart {
  /*position: relative;*/
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.cart-list {
  position: absolute;
  top: 44px;
  bottom: 49px;
  width: 100%;
}

.bottomBar {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 50px;
}
</style>