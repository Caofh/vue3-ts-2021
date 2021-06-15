/* 定义vue属性扩展数据结构 */

import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import VueRouter from 'vue-router'
import { Route } from 'vue-router'
import { Emitter } from 'mitt'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<any>
    $router: VueRouter
    $route: Route
    $Bus: Emitter
    $lodash: any
  }
}
