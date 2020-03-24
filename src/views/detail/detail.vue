<template>
  <div id="detail">
    <detail-nav-bar class="detailnavbar" />
    <BScroll
      class="detailcontent"
      ref="scroll"
      :probeType="3"
      :pull-up-load="true"
    >
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <!-- <detail-goods-info :detailInfo="detailInfo" /> -->
      <detail-param-info :param-info="paramInfo" />
      <detail-comment-info :commentInfo='commentInfo' />
      <goods-list :goods="recommends" />
    </BScroll>
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

import BScroll from "components/common/BScroll/BScroll.vue"
import goodsList from 'components/content/goods/goodsList.vue'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'

import { itemListenerMixin } from "common/mixin.js";
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
      recommends: []
    }
  },
  mixins: [itemListenerMixin],
  components: {
    detailNavBar,
    detailSwiper,
    detailBaseInfo,
    detailGoodsInfo,
    detailShopInfo,
    detailParamInfo,
    detailCommentInfo,
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
        //console.log(data.rate)
        this.commentInfo = data.rate.list[0]
      }

      this.detailInfo = data.detailInfo
    })

    getRecommend().then(res => {
      console.log(res.data.list)
      this.recommends = res.data.list
    })
  },
  methods: {
    // imgLoad () {
    //   console.log('call imageLoad')
    //   this.$refs.scroll.refresh()
    // }
  },
  mounted () {
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
  height: calc(100% - 44px);
}
</style>