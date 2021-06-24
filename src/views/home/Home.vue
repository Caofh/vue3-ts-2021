<template>
  <div class="home">
    <div>svg示例：</div>
    <svg-icon icon-class="sheet-add" />
    <svg-icon icon-class="excel-bold" />
    <div>-----</div>
    <div>
      <span v-for="(item, index) in repositories" :key="index">{{ item }}</span>
    </div>
    <img class="click-img" @click="clickimg" ref="img" alt="Vue logo" src="@/assets/images/logo.png" />
    你好啊
    <HelloWorld :msg="msg" />
    <div class="msg">{{ name.name || '' }}</div>
    <div class="msg">{{ name1.name || '' }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRaw, markRaw } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

/* vuex */
import { mapState, createNamespacedHelpers } from 'vuex'
const accountStore = createNamespacedHelpers('account')

/* 项目配置 */
import { envConfig } from '@/config/index'

/* 自定义方法 */

import { AppFactory } from '@/utils/appFactory'
import { initAsyn_promise, initAsynCss_promise } from '@/utils/loadJs'

/* 模版 */
import About from '@/views/About.vue'

/* 接口 */
import { listPage } from '@/service/home/home'
import { listType, ResponseData } from '@/type'

// setup
import HomeMethod from '@/views/home/homeSetup/homeMethod'

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  },
  setup() {
    // 改变内容逻辑
    let { repositories, setUepositor } = HomeMethod()

    return {
      repositories,
      setUepositor
    }
  },
  data() {
    return {
      msg: '你好啊!',
      userInfo: {
        name: '方晖',
        age: 1000
      },
      name: {
        name: '' as string
      },
      name1: {
        name: '' as string
      }
    }
  },
  computed: {
    /* 根模块的store */
    ...mapState({
      root: (state: any): Array<string | number> => state.root
    }),
    /* 子模块的store */
    ...accountStore.mapState({
      items: (state: any): Array<string | number> => state.items
    })
  },
  mounted() {
    setTimeout(() => {
      this.setUepositor(['动', '感', '光', '波'])
    }, 1000)

    // 页面级别动态加载js、css方法
    // this.lazyLoadResource()
    /* api接口测试 */
    // this.apiTest()
    /* 全局变量测试 */
    // this.globalTest()
    /* vuex测试 */
    // this.storeTest()
    /* 注入动态html模版测试 */
    // this.addTemplate()
    /* eventBus测试 */
    // this.eventBusTest()
    /* lodash测试 */
    // this.lodashTest()
    /* cookie测试 */
    // this.cookieTest()
    /* vue3.0特性：深度响应proxy测试 */
    this.v3ProxyTest()
  },
  methods: {
    /* 子模块的store */
    ...accountStore.mapMutations([
      'change' // 获取module模块中的acdount模块vuex
    ]),

    clickimg() {
      this.msg = '哈哈哈呵呵呵'
    },

    v3ProxyTest() {
      /**
       * 文档：
       * https://v3.cn.vuejs.org/api/basic-reactivity.html#toraw
       * https://v3.cn.vuejs.org/api/basic-reactivity.html#markraw
       * https://v3.cn.vuejs.org/api/basic-reactivity.html#shallowreactive
       */

      // 一。vue3.0针对对象、数组等引用类型进行深度响应 => 打印出来为proxy包的一层，并非原始数据，正常使用没问题。但是第三方的一些库的示例不应该这样。
      console.log('一')
      const name = { name: '大大大' }
      this.name = name
      console.log(this.name)
      setTimeout(() => {
        this.name.name = '花擦'
        console.log(this.name)
      }, 1000)
      console.log('一')

      //  二。利用toRaw逃生舱得到原始数据
      console.log('二')
      console.log(this.userInfo)
      console.log(toRaw(this.userInfo))
      console.log('二')

      //  三。利用markRaw方法定义非深度响应的依赖属性，改变嵌套深层的数据是，不会自动渲染视图。类似于2.0没用proxy重构之前的特性。
      console.log('三')
      const name1 = markRaw({ name: '大大大' })
      this.name1 = name1
      console.log(this.name1)
      setTimeout(() => {
        this.name1.name = '花擦'
        console.log(this.name1)
        this.$forceUpdate()
      }, 1000)
      console.log('三')
    },

    lodashTest() {
      const result = this.$lodash.chunk(['a', 'b', 'c', 'd'], 3)
      console.log(result)
    },

    eventBusTest() {
      this.$Bus.on('addMark', (msg) => {
        console.log(msg)
      })

      setTimeout(() => {
        this.$Bus.emit('addMark', '花擦勒')
      }, 3000)
    },

    apiTest() {
      const json = { test: 1 }
      listPage(json).then((res: ResponseData) => {
        console.log(res)

        const data: Array<listType> = res.data
        console.log(data)
      })
    },

    globalTest() {
      console.log(envConfig)

      console.log(this.$store)
      console.log(this.$router)
    },

    storeTest() {
      console.log(this.items)
      console.log(this.root)

      setTimeout(() => {
        this.change([7, 8, 9, 10, 15])

        console.log(this.items)
      }, 800)
    },

    async addTemplate() {
      await this.$nextTick()

      console.log('动态注入html元素')
      const about = AppFactory(About)

      // body内前面追加一个id为div的div元素
      const node = document.createElement('div')
      node.setAttribute('id', 'div')
      document.querySelectorAll('body')[0].insertBefore(node, document.querySelectorAll('body')[0].firstChild)

      about.mount('#div')
    },

    lazyLoadResource() {
      initAsyn_promise(['swiper']).then(() => {
        console.log('swiper.min.js加载完毕')
      })

      initAsynCss_promise(['swiperCss']).then(() => {
        console.log('swiper.min.css加载完毕')
      })
    },

    cookieTest() {
      this.$library.setCookie('knowledgeBase_value', 'abcd')
      // this.$library.removeCookie('knowledgeBase_value')
      const cookieValue = this.$library.getCookie('knowledgeBase_value')
      console.log('cookie:', cookieValue)
    }
  }
})
</script>
