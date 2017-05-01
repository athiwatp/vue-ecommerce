import Pagination from 'components/pagination/pagination.vue'
import order from 'js/orderService.js'

export default {
  data() {
    return {
      index: 0,
      pageNum:  1,
      pageSize: 2,
      total: '',
      lists: ''
    }
  },
  created() {
    this.index = this.$route.query.index
    this.getLists()
  },
  methods: {
    getLists() {
      order.getOrderLists({
        state: this.index,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }).then(res => {
        this.lists = res.data.list
        this.total = res.data.total
      })
    },
    cancel(orderId) {

    },
    remove(orderId) {

    },
    sign(orderId) {

    },
    change(page) {
      this.pageNum = page
    }
  },
  watch: {
    '$route'() {
      this.index =this.$route.query.index
      this.getLists()
    }
  },
  components: {
    Pagination
  }
}
