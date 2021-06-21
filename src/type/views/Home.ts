
import {Ref} from 'vue'

/* 首页列表数据结构 */
export interface listType {
  create_time: number
  email: string
  role: string
  status: string
  uid: number
  update_time: string
}

/* Home.vue页面setup返回的数据结构 */
export interface useUserRepositoriesType {
  repositories: Ref<string[]>
  setUepositor: (data: any) => void
}
