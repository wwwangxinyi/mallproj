<template>
  <div id="home">
    <navBar class="home-nav">
      <div slot="center">购物街</div>
    </navBar>
    <tabControl
      ref="tabControl1"
      :titles="['流行','新款','精选']"
      @tabClick='tabClick'
      class="tabControl"
      v-if="isShowTab"
    />
    <BScroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probeType="3"
      :pull-up-load="true"
      @pullingUp="LoadMore"
    >
      <!-- scroll必须设定高度 -->
      <HomeSwiper
        :banners='banners'
        @swiperImgLoad="swiperImgLoad"
      />
      <HomeRecommend :recommends='recommends' />
      <Feature />
      <tabControl
        ref="tabControl2"
        :titles="['流行','新款','精选']"
        @tabClick='tabClick'
      />
      <goodsList :goods=showGoods />
    </BScroll>
    <BackToTop
      @click.native="backToTop"
      v-show="isShowBack"
    />
  </div>
</template>

<script>
import navBar from 'components/common/navbar/navBar.vue'
import BScroll from 'components/common/BScroll/BScroll.vue'

import tabControl from "components/content/tabControl/tabcontrol.vue";
import goodsList from "components/content/goods/goodsList.vue";
import BackToTop from 'components/content/backToTop/backToTop.vue';

import HomeSwiper from './components/homeSwiper';
import HomeRecommend from './components/homeRecommend';
import Feature from './components/homeFeature';

import { getHomeMultiData, getHomeGoods } from "network/home.js";

export default {
  name: 'home',
  components: {
    navBar,
    HomeSwiper,
    HomeRecommend,
    Feature,
    tabControl,
    goodsList,
    BScroll,
    BackToTop
  },
  data () {
    return {
      banners: [],
      recommends: [],
      titles: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] },
      },
      currentType: 'pop',
      isShowBack: false,
      tabOfffset: 0,
      isShowTab: false,
      saveY: 0
    }
  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /*************事件监听*************/
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
        default:
          this.currentType = 'pop'
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backToTop () {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll (pos) {
      //判断是否展示back-to-top
      this.isShowBack = -pos.y > 1200

      //判断是否显示吸顶元素
      this.isShowTab = -pos.y > this.tabOfffset
    },
    LoadMore () {
      console.log('more')
      this.GetHomeGoods(this.currentType)
    },
    //防抖函数
    //如果直接执行refresh，将执行30次
    //将refresh函数传入debouce函数中，生成一个新函数
    debounce (func, delay) {
      let timer = null//虽然是局部变量，但是被闭包函数引用后，不被销毁

      return function (...args) {
        //reset timer //将先前延迟执行的函数取消 直至最后一次
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    },
    swiperImgLoad () {
      this.tabOfffset = this.$refs.tabControl2.$el.offsetTop
    },
    /*************网络请求*************/
    GetHomeMultiData () {
      getHomeMultiData().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
        //console.log(res)
      })
    },
    GetHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page = page

        this.$refs.scroll.finishPullUp()
      })

    }
  },
  created () {
    this.GetHomeMultiData()//异步操作

    this.GetHomeGoods('pop')
    this.GetHomeGoods('new')
    this.GetHomeGoods('sell')
  },
  mounted () {
    //监听图片加载完成
    const refresh = this.debounce(this.$refs.scroll.refresh)//传递函数 无()
    this.$bus.$on('imgLoad', () => {
      refresh()
    })

    //吸顶效果
    this.tabOfffset = this.$refs.tabControl2.$el.offsetTop
  },
  activated () {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)//(x,y,time=0)
    this.$refs.scroll.refresh()
  },
  deactivated () {
    this.saveY = this.$refs.scroll.getposY()
    console.log(this.saveY)
  }
}
</script>

<style scoped>
#home {
  position: relative;
  padding-top: 44px;
  height: 100vh;
}

.home-nav {
  background: var(--color-tint);
  color: white;

  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  z-index: 9;
}
.content {
  overflow: hidden; /*使吸顶导航条失效*/
  position: absolute;
  top: 44px;
  bottom: 49px;
}
.tabControl {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 44px;
  z-index: 9;
}
</style>