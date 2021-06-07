/* eslint-disable @typescript-eslint/no-var-requires */
// 兼容node环境中不识别webpack语法
process.env.NODE_ENV === 'test' && require('./register.js')()
// 引入所有svg
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
const req = require.context('./', true, /\.svg$/)
requireAll(req)
