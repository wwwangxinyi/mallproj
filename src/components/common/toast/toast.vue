<template>
  <div
    class="toast"
    v-show="isShow"
  >
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  // props: {
  //   message: {
  //     type: String,
  //     default: ''
  //   },
  //   isShow: {
  //     type: Boolean,
  //     default: true
  //   }
  // }
  data () {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    showToast (message, duration = 1500) {
      this.isShow = true
      this.message = message
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration);
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;

  padding: 8px 10px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  color: #fff;
}
</style>