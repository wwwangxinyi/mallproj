<template>
  <div class="tabbarItem"
       @click="itemClick()">
    <slot v-if="!isActivate">
      <slot name="item-icon"></slot>
    </slot>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-name"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabbarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'palevioletred'
    }
  },
  computed: {
    isActivate () {
      return this.$route.path.indexOf(this.path) != -1//find!
    },
    activeStyle () {
      return this.isActivate ? { color: this.activeColor } : {}
    }
  },
  methods: {
    itemClick () {
      console.log("click")
      this.$router.push(this.path).catch(err => { })
    }
  }
};
</script>

<style scoped>
.tabbarItem {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tabbarItem img {
  margin-top: 3px;
  vertical-align: middle;
  width: 24px;
  height: 24px;
}
.active {
  color: palevioletred;
}
</style>
