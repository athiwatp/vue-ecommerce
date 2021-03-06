import './detail.scss'

import Top from 'components/top/top.vue'
import Search from 'components/search/search.vue'
import Foot from 'components/foot/foot.vue'
import Logstate from 'components/logstate/logstate.vue'
import Minicart from 'components/minicart/minicart.vue'
import { Message } from 'element-ui'
import Utils from 'js/utils.js'
import cart from 'js/cartService.js'
import bus from 'js/bus.js'
import order from 'js/orderService.js'

import { fetch, rap } from 'js/fetch.js'
let url = {
  detail: '/product/detail.do'
}
url = rap(url)

new Vue({
  el: '#app',
  data: {
    state: parseInt(Utils.getQuery('state')),
    attrList: '',
    merchandise: '',
    id: Utils.getQuery('id'),
    number: 1,
    month: 3,
    imgs: '',
    imgIndex: 0,
    showIndex: 0,
    isCollect: false,
    liWidth: 0
  },
  computed: {
    countMoney() {
      let cm = this.merchandise.discount || this.merchandise.price
      if (this.state == 1) {
        cm *= this.month
      }
      return cm.toFixed(2)
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      fetch(url.detail).then( res => {
        let data = res.data
        this.attrList = data.atrList
        this.merchandise = data.merchandise
        this.imgs = this.merchandise.imageList
        this.isCollect = this.merchandise.collect
        this.$nextTick(() => {
          //获取li宽度=width+padding+margin
          let li = document.getElementById("imageList").getElementsByTagName("li")
          let liStyle = getComputedStyle(li[0], null)
          this.liWidth = parseInt(liStyle.width)+parseInt(liStyle.marginLeft)*2+parseInt(liStyle.borderWidth)*2
        })
      })
    },
    change(number) {
      if (this.imgIndex <= 0 && number < 0) {
        this.imgIndex = 0
        return
      }
      if (this.imgIndex >= this.imgs.length-4 && number > 0) {
        this.imgIndex = this.imgs.length-4
        return
      }
      this.imgIndex += number
    },
    collect() {

    },
    reduceNumber() {
      if (this.number <= 1) {
        this.number = 1
        return
      }
      this.number--
    },
    addNumber() {
      if (this.state == 3 && this.number >= this.merchandise.stock) {
        this.number = this.merchandise.stock
        return
      }
      this.number++
    },
    reduceMonth() {
      if (this.month <= 3) {
        this.month = 3
        return
      }
      this.month--
    },
    addMonth() {
      this.month++
    },
    addCart(item) {
      cart.add({
        month: this.state == 1 ? 1 : undefined,
        number: 1,
        type: this.state,
        unifiedMerchandiseId: item.unifiedMerchandiseId
      }).then(res => {
        Message(res.message)
        // bus.$emit('add',"520000198603154526")
        bus.$emit('addCart',item.unifiedMerchandiseId)
      })
    },
    goApply() {
      let product = {
        month: this.month,
        number:　this.number,
        unifiedMerchandiseId: this.id
      }
      order.toOrder([product], this.state)
    }
  },
  components: {
    Top,
    Foot,
    Search,
    Logstate,
    Minicart
  }
})
