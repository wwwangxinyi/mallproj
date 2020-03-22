<template>
  <Swiper>
    <Swiper-item
      v-for="(item,index) in banners"
      :key="index"
    >
      <a :href="item.link">
        <img
          :src="item.image"
          @load="swiperImgLoad"
        >
      </a>
    </Swiper-item>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper/index.js'
export default {
  name: 'homeswiper',
  data () {
    return {
      isLoad: false
    }
  },
  props: {
    banners: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    Swiper, SwiperItem
  },
  methods: {
    swiperImgLoad () {
      if (!this.isLoad) {
        this.$emit('swiperImgLoad')
        this.isLoad = true//发送一次
      }
    }
  }
}
</script>

<style>
</style>