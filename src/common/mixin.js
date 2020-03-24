import {
  debounce
} from './utils'
export const itemListenerMixin = {
  data() {
    return {
      itemListenerMixin: null
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 50) //传递函数 无()
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('imgLoad', this.itemImgListener)
  }
}

import {
  POP,
  NEW,
  SELL
} from "./const";

export const backTopMixin = {
  data: function () {
    return {
      showBackTop: false
    }
  },
  methods: {
    backTop: function () {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
