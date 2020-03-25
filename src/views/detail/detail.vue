<template>
  <div id="detail">
    <detail-nav-bar
      class="detailnavbar"
      @titleClick="titleClick"
      ref="detailnavbar"
    />
    <BScroll
      class="detailcontent"
      ref="scroll"
      :probeType="3"
      :pull-up-load="true"
      @scroll="contentScroll"
    >
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <!-- <detail-goods-info :detailInfo="detailInfo" /> -->
      <detail-param-info
        ref="param"
        :param-info="paramInfo"
      />
      <detail-comment-info
        ref="comment"
        :commentInfo='commentInfo'
      />
      <goods-list
        ref="recommend"
        :goods="recommends"
      />
    </BScroll>
    <BackToTop
      @click.native="backTop"
      v-show="showBackTop"
    />
    <detailBottomBar @addToCart="addCart" />
  </div>
</template>

<script>
import detailNavBar from './components/detailNavBar.vue'
import detailSwiper from './components/detailSwiper.vue'
import detailBaseInfo from './components/detailBaseInfo.vue'
import detailGoodsInfo from './components/detailGoodsInfo.vue'
import detailShopInfo from './components/detailShopInfo.vue'
import detailParamInfo from './components/detailParamInfo.vue'
import detailCommentInfo from './components/detailCommentInfo.vue'
import detailBottomBar from './components/detailBottomBar.vue'

import BScroll from "components/common/BScroll/BScroll.vue"
import goodsList from 'components/content/goods/goodsList.vue'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'

import { itemListenerMixin, backTopMixin } from "common/mixin.js";
import { debounce } from 'common/utils'

//scroll必须设定高度 
export default {
  name: 'detail',
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      paramInfo: {},
      detailInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIdx: 0,
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    detailNavBar,
    detailSwiper,
    detailBaseInfo,
    detailGoodsInfo,
    detailShopInfo,
    detailParamInfo,
    detailCommentInfo,
    detailBottomBar,
    goodsList,
    BScroll
  },
  created () {
    //保存传入iid
    this.iid = this.$route.params.iid

    getDetail(this.iid).then(res => {
      const data = res.result

      this.topImages = data.itemInfo.topImages

      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      this.shop = new Shop(data.shopInfo)

      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      this.detailInfo = data.detailInfo

      this.$nextTick(() => {
        //当加入详细图片后有一定问题
        //图片未加载完成
        //参数获取有问题
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop - 49)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 49)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 49)
        this.themeTopYs.push(Number.MAX_VALUE)
      })
    })

    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  methods: {
    titleClick (index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
    },
    contentScroll (pos) {

      this.listenShowBack(pos)

      const scrollPosY = - pos.y

      let length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIdx !== i && (scrollPosY >= this.themeTopYs[i] && scrollPosY < this.themeTopYs[i + 1])) {
          this.currentIdx = i
          this.$refs.detailnavbar.currentIdx = this.currentIdx
        }
      }
    },
    addCart () {
      console.log("click")
      //获取购物车展示信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.nowPrice
      product.iid = this.iid
      product.count = 0

      //通过vuex将信息添加到购物车
      this.$store.dispatch('addToCart', product).then(res => {
        //添加成功
        console.log('res')
      })

    }
  },
  mounted () {
    // this.themeTopYs.push(0)
    // this.themeTopYs.push(this.$refs.param.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.recommand.$el.offsetTop)
    //>>0,undefined,undefined,
  }
}
</script>

<style>
#detail {
  background: #fff;
  position: relative;
  z-index: 9;
  height: 100vh;
}
.detailnavbar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detailcontent {
  /* margin-top: 44px; */
  background: #fff;
  height: calc(100% - 93px);
}
</style>