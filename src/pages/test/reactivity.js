/**
 * Created by Administrator on 2017/5/1.
 */
new Vue({
  el: '#app',
  data: {
    user: {
      name: 'tony',
      gender: 'boy'
    },
    lists: '' //尽量避免动态赋值新属性，先声明，数据类型可不考虑
  },
  created() {
    // this.user.msg = 'reactive'
    console.log(document.querySelectorAll('p').length)
    setTimeout(() => {
      this.user = {
        name: 'tony',
        gender: 'boy',
        age: 18
      }
      this.$nextTick(() => {
        // 数据刷新后对应的 dom 更新完毕
        console.log(document.querySelectorAll('p').length)
      })
    }, 1000)
  },
  mounted() {
    // this.$set(this.user,'msg','reactive')
    // this.user = Object.assign({}, this.user, {msg: 'reactive'})
  }
})
