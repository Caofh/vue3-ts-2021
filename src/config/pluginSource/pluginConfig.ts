/*
  excel基础信息配置文件
 */

import config from '@/config/projectConfig/install'
const ENV: string | undefined = process.env.VUE_APP_ENV
// 项目环境配置信息
const projectConfig = ENV ? config[ENV] : ''

// 需要的第三方插件url集合
const sourceJs: any = {
  swiper: {
    name: 'swiper',
    global: 'swiper',
    ver: '1.0.0',
    isLoad: true,
    cache: false,
    src: `${projectConfig.pluginHost}plugins/swiper/swiper.min.js`
  }
}

// 需要的第三方插件url集合,css资源结构
const sourceCss: any = {
  swiperCss: {
    name: 'swiperCss',
    global: 'swiperCss',
    ver: '1.0.0',
    isLoad: true,
    cache: false,
    src: `${projectConfig.pluginHost}plugins/swiper/swiper.min.css`
  }
}

export default { sourceJs, sourceCss } as any
