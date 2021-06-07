import { createStore } from 'vuex'

import account from './modules/account'

export default createStore({
  state: {
    root: [5, 5, 5]
  },
  modules: {
    account
  }
})
