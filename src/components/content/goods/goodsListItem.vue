<template>
  <div
    class="goods-item"
    @click="itemClick"
  >
    <img
      v-lazy="showImage"
      @load="imgLoad"
    >
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="collect">收藏：{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    showImage () {
      return (this.goodsItem.image || this.goodsItem.show.img)
    }
  },
  methods: {
    imgLoad () {
      this.$bus.$emit('imgLoad')
    },
    itemClick () {
      this.$router.push('/detail/' + this.goodsItem.iid)//动态路由
    }
  }
}
</script>

<style>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0px;
  right: 0px;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  margin: 3px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; /*三者必须结合使用*/
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
</style>