<template>
  <div class="home">
    <div>
      <div v-for="(item, index) in repositories" :key="index">{{ item }}</div>
    </div>
    <img class="click-img" @click="clickimg" ref="img" alt="Vue logo" src="../assets/logo.png" />
    你好啊
    <HelloWorld :msg="msg" />
    <div class="msg">{{ msg || '' }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
import HomeMethod from '@/views/HomeSetup/HomeMethod'

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
      msg: '你好啊!'
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
      this.setUepositor(['他', '是', '大', '坏', '蛋'])
    }, 1000)

    // 页面级别动态加载js、css方法
    this.lazyLoadResource()
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
  },
  methods: {
    /* 子模块的store */
    ...accountStore.mapMutations([
      'change' // 获取module模块中的acdount模块vuex
    ]),

    clickimg() {
      this.msg = '哈哈哈呵呵呵'
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
      console.log(window.$)

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

      console.log(window.$)
      console.log('动态注入html元素')
      const about = AppFactory(About)

      window.$('body').prepend(`<div id='div'></div>`)
      about.mount('#div')
    },

    lazyLoadResource() {
      initAsyn_promise(['swiper']).then(() => {
        console.log('swiper.min.js加载完毕')
      })

      initAsynCss_promise(['swiperCss']).then(() => {
        console.log('swiper.min.css加载完毕')
      })
    }
  }
})
</script>
