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
      v-show="isShowTab"
    />
    <BScroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      @pullingUp="LoadMore"
      :probeType="3"
      :pull-up-load="true"
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
      @click.native="backTop"
      v-show="showBackTop"
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

import { itemListenerMixin, backTopMixin } from "common/mixin.js";
import { debounce } from 'common/utils'
export default {
  name: 'home',
  components: {
    navBar,
    HomeSwiper,
    HomeRecommend,
    Feature,
    tabControl,
    goodsList,
    BScroll
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
      showBackTop: false,
      tabOffset: 0,
      isShowTab: false,
      saveY: 0
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
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
      this.$refs.tabControl1.currentIdx = index;
      this.$refs.tabControl2.currentIdx = index;
    },
    // backToTop () {
    //   this.$refs.scroll.scrollTo(0, 0, 300)
    // },
    contentScroll (pos) {
      //判断是否展示back-to-top
      this.listenShowBack(pos)

      //判断是否显示吸顶元素
      this.isShowTab = -pos.y > this.tabOffset
    },
    LoadMore () {
      this.GetHomeGoods(this.currentType)
    },
    swiperImgLoad () {
      this.tabOffset = this.$refs.tabControl2.$el.offsetTop
    },
    /*************网络请求*************/
    GetHomeMultiData () {
      getHomeMultiData().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
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
  },
  activated () {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)//(x,y,time=0)
    this.$refs.scroll.refresh()
  },
  deactivated () {
    this.saveY = this.$refs.scroll.getposY()
    this.$bus.$off('imgLoad', this.itemImgListener)
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