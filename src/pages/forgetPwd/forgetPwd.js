import 'normalize.css'
import 'pages/register/register.scss'

import Top from 'components/top/top.vue'
import Foot from 'components/foot/foot.vue'
import Register from 'components/register/register.vue'

new Vue({
  el: '#body',
  components: {
    Top,
    Register,
    Foot
  }
})

