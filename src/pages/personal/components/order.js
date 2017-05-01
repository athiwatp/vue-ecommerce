import Pagination from 'components/pagination/pagination.vue'
import order from 'js/orderService.js'
import { MessageBox } from 'element-ui'
import { Message } from 'element-ui'

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
      MessageBox.confirm('此操作将取消该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        order.cancel({
          orderId: orderId
        }).then(res => {
          Message({
            type: 'success',
            message: '取消订单成功!'
          })
          this.getLists()
        })
      }).catch(() => {
        Message({
          type: 'info',
          message: '未取消订单'
        });
      });
    },
    remove(orderId) {
      MessageBox.confirm('此操作将删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        order.delete({
          orderId: orderId
        }).then(res => {
          Message({
            type: 'success',
            message: '删除订单成功!'
          })
          this.getLists()
        })
      }).catch(() => {
        Message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    sign(orderId) {
      MessageBox.confirm('是否确定已收到货物?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        order.sign({
          orderId: orderId
        }).then(res => {
          Message({
            type: 'success',
            message: '已确认收货!'
          })
          this.getLists()
        })
      }).catch(() => {
        Message({
          type: 'info',
          message: '已取消'
        });
      });
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
