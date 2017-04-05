import './logstate.scss'
import { Message } from 'element-ui'
import { checkphone } from 'js/validate.js'
import user from 'js/userService'

export default {
  data() {
    return {
      name: '',
      username: '',
      headImage: '',
      isLogin: false,
      pwd: ''
    }
  },
  created() {

  },
  methods: {
    getUserInfo() {
      user.getInfo().then(res => {
        this.isLogin = true
        let userInfo = res.data.user
        this.name = userInfo.name
        this.username = userInfo.mobile
        this.headImage = userInfo.headImage || require('./imgs/face-img2.jpg')
      })
    },
    login() {
      if (!this.username) {
        Message('请输入手机号')
        return
      }
      if (!checkphone(this.username)) {
        Message('请输入正确的手机号')
        return
      }
      if (!this.pwd) {
        Message('请输入密码')
        return
      }
      user.login({
        username: this.username,
        pwd: this.pwd
      }).then( res => {
        this.getUserInfo()
      })
    }
  }
}


