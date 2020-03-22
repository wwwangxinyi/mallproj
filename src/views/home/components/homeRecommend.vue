<template>
  <div class="Recommend">
    <div
      class="RecommendItem"
      v-for="item in recommends"
    >
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeRecommend',
  props: {
    recommends: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>
.Recommend {
  display: flex;
  width: 100%;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
}
.RecommendItem {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.RecommendItem img {
  width: 65px;
  height: 65px;
  margin-bottom: 10px;
}
</style>