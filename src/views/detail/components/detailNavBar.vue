<template>
  <navBar>
    <div
      slot="left"
      class="back"
      @click="back"
    >
      <img src="~assets/img/common/back.svg">
    </div>
    <div
      class="title"
      slot="center"
    >
      <div
        class="title-item"
        v-for="(item,index) in titles"
        :key="index"
        :class="{activate:index==currentIdx}"
        @click="titleClick(index)"
      >
        {{item}}</div>
    </div>

  </navBar>
</template>

<script>
import navBar from 'components/common/navbar/navBar.vue'

export default {
  name: 'detailNavBar',
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIdx: 0
    }
  },
  components: {
    navBar,
  },
  methods: {
    titleClick (index) {
      this.currentIdx = index
    },
    back () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
  margin-right: 48px;
}
.title-item {
  flex: 1;
}
.activate {
  color: var(--color-high-text);
}
.back img {
  width: 18px;
  margin-top: 15px;
  margin-left: 20px;
  margin-right: 10px;
}
</style>