import Cookies from 'js-cookie' // 第三方cookie插件：文档地址：https://github.com/js-cookie/js-cookie
import { projectInfo } from '@/config'

// 当前项目名称
const projectName: string = projectInfo.projectName

// 判断是否是pc端
function isPC(): boolean {
  const userAgentInfo = navigator.userAgent
  const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  let flag = true
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

/* 加载img，完成后执行then后的逻辑
  let imgUrl = 'https://tpdoc.cn/erp/uploads/image/cut_133301_3487.png'
  loadImage(imgUrl).then((url) => {
    console.log(url)
  })
*/
function loadImage(url: string): Promise<unknown> {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = url
    if (img.complete) {
      resolve(url)
      return undefined
    }
    img.onload = () => {
      resolve(url)
    }
    img.onerror = () => {
      resolve(url)
    }
  })
}

//返回传递给他的任意对象的类(返回：array、object、number、string)
function typeOf(o = undefined as any): string {
  if (o === null) return 'Null'
  if (o === undefined) return 'Undefined'

  return Object.prototype.toString.call(o).slice(8, -1).toLowerCase()
}

/* H5设置本地存储(示例如下)
  1. h5.setStorage('20191111_game_v1', '哈哈哈')
  2. h5.setStorage('20191111_game_v1', {a:1, b:2})
 */
function setStorage(key: string, value: string): void {
  // if (!/^learning_manage_.*/.test(key)) {
  if (!new RegExp(`^${projectName}_.*`, 'g').test(key)) {
    throw new Error(`${projectName}项目设置localStorage的key值必须以"${projectName}_"开头，请修改!`)
  }

  const v = typeOf(value) === 'string' ? value : JSON.stringify(value) || ''
  localStorage.setItem(key, v)
}

/* H5删除本地存储(示例如下)
  h5.removeStorage('20191111_game_v1')
 */
function removeStorage(key: string): void {
  localStorage.getItem(key) && localStorage.removeItem(key)
}

/* H5获取本地存储(示例如下)
  1. let data = h5.getStorage('20191111_game_v1')
  2. let data = h5.getStorage('20191111_game_v1', 'deviceId')
  console.log(data)
 */
function getStorage(key: string, subKey: string): any {
  let res = '' as any
  const stringLocal: string = localStorage.getItem(key) || ''
  let parseLocal: any = ''

  try {
    parseLocal = JSON.parse(stringLocal)
  } catch (error) {
    parseLocal = stringLocal
  }

  // 区分是否有subKey
  if (!subKey) {
    res = parseLocal
  } else {
    if (typeOf(parseLocal) === 'object') {
      res = parseLocal[subKey] || ''
    }
  }

  return res
}

// 浏览器返回上一页
function goBack(cache = false): void {
  if (cache) {
    // 暂存上一页的input值
    window.history.go(-1)
  } else {
    // 不暂存上一页的input值，全部刷新
    window.history.back()
  }
}

// 第三方cookie插件：首页地址：https://github.com/component/cookie#readme
/* 设置cookie
  用法一：
  setCookie('topay_cli_manage_name', '123')
  用法二：
  var in15Minutes = new Date(new Date().getTime() + 15 * 60 * 1000);
  setCookie('topay_cli_manage_name', '123', {
    path: /about,
    expires: in15Minutes, // 过期时间（毫秒）
  })
*/
function setCookie(key: string, value: string, config = {} as any): void {
  if (!new RegExp(`^${projectName}.*`, 'g').test(key)) {
    throw new Error(`${projectName}_项目设置cookie的key值最必须以"${projectName}_"开头，请修改!`)
  }

  const defaultConfig = {
    path: '/'
  }
  Object.assign(defaultConfig, config)
  Cookies.set(key, value, defaultConfig)
}

/*
  用法一：
  removeCookie('topay_cli_manage_name')
  用法二：
  removeCookie('topay_cli_manage_name', {
    path: /about,
  })
*/
function removeCookie(key: string, config = {} as any): void {
  if (!new RegExp(`^${projectName}.*`, 'g').test(key)) {
    throw new Error(`${projectName}_项目设置cookie的key值最必须以"${projectName}_"开头，请修改!`)
  }

  const defaultConfig = {
    path: '/'
  }
  Object.assign(defaultConfig, config)
  Cookies.remove(key, defaultConfig) // removed!
}

/* 获取cookie
  用法一：
  getCookie('cookieName')
  用法二：
  getCookie('cookieName', {
    path: /about,
  })
*/
function getCookie(key: string, config = {} as any): string {
  const defaultConfig = {
    path: '/'
  }
  Object.assign(defaultConfig, config)
  return Cookies.get(key, defaultConfig)
}

export default {
  isPC,
  loadImage,
  typeOf,
  goBack,
  setStorage,
  getStorage,
  removeStorage,
  setCookie,
  getCookie,
  removeCookie
}
