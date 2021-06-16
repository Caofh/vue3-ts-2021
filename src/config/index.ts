import projectConfig from './projectConfig/install'
import pluginConfig from './pluginSource/pluginConfig'

const ENV: string | undefined = process.env.VUE_APP_ENV

// 项目环境配置信息
const envConfig = ENV ? projectConfig[ENV] : ''

export { envConfig, pluginConfig }
