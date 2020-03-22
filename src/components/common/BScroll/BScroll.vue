<template>
  <div
    class="wrapper"
    ref="wrapper"
  >
    <div class="content">
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
  mounted () {
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
  methods: {
    scrollTo (x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    getposY () {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>
</style>