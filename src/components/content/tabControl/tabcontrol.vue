<template>
  <div class="tab-control">
    <div
      v-for="(item,index) in titles"
      :key="index"
      :class="{activate: currentIdx==index}"
      class="tab-control-item"
      @click="itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabControl',
  data () {
    return {
      currentIdx: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    itemClick (index) {
      this.currentIdx = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background: #fff;

  /*position: sticky; */
  top: 44px;
  z-index: 9;
}
.tab-control-item {
  flex: 1;
  font-size: 14px;
}
.tab-control-item span {
  padding: 3px;
}
.activate {
  color: var(--color-high-text);
}
.activate span {
  border-bottom: 3px solid var(--color-tint);
}
</style>