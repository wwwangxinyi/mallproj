<template>
  <div ref="wrapper">
    <div ref="scroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: 'BScroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  methods: {
    __initScroll () {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,//3-只要是滚动都检测
        click: true,//返回顶部
        pullUpLoad: this.pullUpLoad//上拉加载更多
      })

      //监听实时滚动并发送
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)//自定义事件scroll
        })
      }

      //底部监听
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    scrollTo (x, y, time = 300) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
    },
    refresh () {
      this.scroll && this.scroll.refresh && this.scroll.refresh()
    },
    getposY () {
      return this.scroll ? this.scroll.y : 0
    }
  },
  watch: {
    data () {
      setTimeout(this.refresh, 20)
    }
  },
  mounted () {
    setTimeout(this.__initScroll, 20);
  }
}
</script>

<style scoped>
</style>