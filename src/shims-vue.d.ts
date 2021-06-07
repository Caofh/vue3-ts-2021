/* 定义项目内引入.vue文件类型 */

declare module '*.vue' {
  import type { Vue, DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
