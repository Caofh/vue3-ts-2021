/* 用户身份信息 */
import { itemsType } from '@/type'

const state = {
  items: [1, 2, 3]
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  change: (state: itemsType, payload: Array<any>): void => {
    state.items = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
