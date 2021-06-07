<template>
  <div class="home">
    <img class="click-img" @click="clickimg" ref="img" alt="Vue logo" src="../assets/logo.png" />
    你好啊
    <HelloWorld :msg="msg" />
    <div class="msg">{{ msg || '' }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

export interface accountState {
  itemsSon?: Array<any>
}

/* vuex */
import { mapState, createNamespacedHelpers } from 'vuex'
const accountStore = createNamespacedHelpers('account')

import { AppFactory } from '@/utils/appFactory'

/* 模版 */
import About from '@/views/About.vue'

import { envConfig } from '@/config/index'

/* 接口 */
import { listPage } from '@/service/home/home'
// import $ from 'n-zepto'

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      msg: '你好啊!'
    }
  },
  computed: {
    /* 根模块的storej */
    ...mapState({
      root: (state: any) => state.root
    }),
    /* 子模块的store */
    ...accountStore.mapState({
      items: (state: any) => state.items
    })
  },
  mounted() {
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
      listPage(json).then((res: any) => {
        console.log(res)
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
    }
  }
})
</script>
