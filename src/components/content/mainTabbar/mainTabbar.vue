<template>
  <Tabbar>
    <TabbarItem
      path="/home"
      activeColor="palevioletred"
    >
      <img
        slot="item-icon"
        src="~assets/img/tabbar/home.svg"
      >
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/home_active.svg"
      >
      <div slot="item-name">首页</div>
    </TabbarItem>
    <TabbarItem
      path="/category"
      activeColor="palevioletred"
    >
      <img
        slot="item-icon"
        src="~assets/img/tabbar/category.svg"
      >
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/category_active.svg"
      >
      <div slot="item-name">分类</div>
    </TabbarItem>
    <TabbarItem
      path="/cart"
      activeColor="palevioletred"
    >
      <img
        slot="item-icon"
        src="~assets/img/tabbar/shopcart.svg"
      >
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/shopcart_active.svg"
      >
      <div slot="item-name">购物车</div>
    </TabbarItem>
    <TabbarItem
      path="/profile"
      activeColor="palevioletred"
    >
      <img
        slot="item-icon"
        src="~assets/img/tabbar/profile.svg"
      >
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/home_active.svg"
      >
      <div slot="item-name">我的</div>
    </TabbarItem>
  </Tabbar>
</template>
<script>

import Tabbar from "components/common/tabbar/tabbar.vue"
import TabbarItem from "components/common/tabbar/tabbarItem.vue"

export default {
  name: 'mainTabbar',
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>

<style>
</style>