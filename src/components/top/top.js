import './top.scss'
import {fetch,rap} from 'js/fetch.js'

let url = {
  info: '/user/getUser.do',
  logout: '/user/logout.do'
}
url = rap(url)

export default {
  name: 'top',
  data: function () {
    return {
      mobile: '',
      isLogin: false
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      fetch(url.info).then( res => {
        this.mobile = res.data.user.mobile
        this.isLogin = true
      })
    },
    logout() {
      fetch(url.logout).then ( res => {
        this.mobile = ''
        this.isLogin = false
      })
    }
  }
}
