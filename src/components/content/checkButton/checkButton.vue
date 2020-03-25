<template>
  <div
    class="checkButton"
    :class="{check:ischecked}"
  >
    <img
      src="~assets/img/cart/tick.svg"
      alt=""
    >
  </div>
</template>

<script>
export default {
  name: "checkButton",
  props: {
    ischecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.checkButton {
  border-radius: 50%;
  border: 2px solid #aaa;
}
.check {
  border-color: var(--color-tint);
  background: var(--color-tint);
}
</style>
