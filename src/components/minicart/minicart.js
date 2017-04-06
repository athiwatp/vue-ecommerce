import './minicart.scss'
import { Message } from 'element-ui'
import cart from 'js/cartService.js'

export default {
  props: ['state'],
  data() {
    return {
      saleData: '',
      rentData: '',
      partsData: '',
      curIndex: 0
    }
  },
  created() {
    this.getLists(1)
    this.getLists(2)
    this.getLists(3)
  },
  methods: {
    getLists(type) {
      cart.list({
        pageNum: 1,
        pageSize: 4,
        type
      }).then(res => {
        let data = res.data
        switch (type) {
          case 1:
            this.rentData = data
            break
          case 2:
            this.saleData = data
            break
          case 3:
            this.partsData = data
            break
        }
      })
    },
    add(para) {
      cart.add({
        month: para.month,
        number: para.number,
        type: para.type,
        unifiedMerchandiseId: para.item.unifiedMerchandiseId
      }).then(res => {
        if(para.month) {
          para.item.month++
        }else {
          para.item.number++
        }
        para.item.sum += para.item.discount
        para.data.sum += para.item.discount
      })
    },
    reduce(para) {
      if (para.month) {
        if(para.item.month <= 3) {
          para.item.month = 3
          return
        }
      }else {
        if (para.item.number <= 1) {
          para.item.number = 1
          return
        }
      }
      cart.reduce({
        month: para.month,
        number: para.number,
        type: para.type,
        unifiedMerchandiseId: para.item.unifiedMerchandiseId
      }).then(res => {
        if(para.month) {
          para.item.month--
        }else {
          para.item.number--
        }
        para.item.sum -= para.item.discount
        para.data.sum -= para.item.discount
      })
    }
  }
}
