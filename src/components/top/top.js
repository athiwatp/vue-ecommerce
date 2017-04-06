import './top.scss'
import user from 'js/userService'
import bus from 'js/bus.js'

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
    bus.$on('login', (user) => {
      this.isLogin = true
      this.mobile = user.mobile
    })
  },
  methods: {
    getInfo() {
      user.getInfo().then( res => {
        let user = res.data.user
        this.mobile = user.mobile
        this.isLogin = true
        bus.$emit('login',user)
      })
    },
    logout() {
     user.logout().then ( res => {
        this.isLogin = false
        this.mobile = ''
        bus.$emit('logout')
      })
    }
  }
}
