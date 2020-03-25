<template>
  <div class="carList">
    <BScroll class="content">
      <cartListItem
        v-for="(item,index) in getCartList"
        :key="index"
        :product="item"
      />
    </BScroll>
  </div>
</template>

<script>
import cartListItem from "./cartListItem.vue";

import BScroll from 'components/common/BScroll/BScroll.vue'
import { mapGetters } from "vuex"

export default {
  components: {
    BScroll,
    cartListItem
  },
  computed: {
    ...mapGetters(['getCartLength', 'getCartList'])
  }
}
</script>

<style>
.carList {
  position: relative;
  height: calc(100% - 93px - 40px);
}
.content {
  overflow: hidden;
  height: 100%;
}
</style>