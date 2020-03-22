<template>
  <div class="goods">
    <goods-list-item
      v-for="(item,index) in goods"
      :key="index"
      :goods-item="item"
    />
  </div>
</template>

<script>
import goodsListItem from "./goodsListItem.vue";
export default {
  name: 'goodslist',
  components: {
    goodsListItem
  },
  props: {
    goods: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>