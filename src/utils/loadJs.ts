/* eslint-disable */

// 动态加载js或css方法

/*
  // 需要的第三方插件url集合,js资源结构
  const sourceJs = {
    eruda: {
      name: 'eruda', //页面调试工具；文档：https://github.com/liriliri/eruda
      global: 'eruda',
      ver: '0.0.1',
      isLoad: true,
      cache: false,
      // src: 'https://mstatic.secooimg.com/activity2018/js/comm/eruda.min.js'
      // src: 'https://cdn.jsdelivr.net/npm/eruda'
      src: `${gateWay.pluginsHost}/plugins/eruda/eruda.min.js`,
    },
  }

  // 需要的第三方插件url集合,css资源结构
  const sourceCss = {
    element: { // 文档：http://momentjs.cn/
      name: 'momentCss',
      global: 'momentCss', // 第三方插件的全局变量名，用于避免重复加载
      ver: '0.0.1',
      isLoad: true,
      cache: false,
      src: 'https://unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css'
      // src: `${gateWay.pluginsHost}/plugins/moment/moment.min.js`,
    },
  }
*/
import { LoadJsCreatDom } from '@/type' // ts数据类型
import { pluginConfig } from '@/config'
const sourceJs = pluginConfig.sourceJs
const sourceCss = pluginConfig.sourceCss

const win = window
const doc = document

//工具类方法集合
const tools = {
  //返回传递给他的任意对象的类(返回：array、object、number、string)
  typeOf(o: any) {
    if (o === null) return 'Null'
    if (o === undefined) return 'Undefined'

    return Object.prototype.toString.call(o).slice(8, -1).toLowerCase()
  },

  /*	创建dom元素(不可创建img元素，未做onload事件处理)
   * 	@param option.dom 			创建的dom名
   * 	@param option.attrs 		dom属性设置 JSON格式的键值对
   *  @param option.fatherDom 	所创建dom放在哪个父级元素里（不指定父元素，则默认加在head里）
   *  @param option.callback		dom创建完成后执行的回调
   */
  creatDom(option: LoadJsCreatDom) {
    let attrs = option.attrs
    var script = document.createElement('script')
    let callBack = option.callBack

    script.type = 'text/javascript'
    script.src = attrs.url
    //重点！！！！script加载成功
    script.onload = function () {
      callBack && callBack()
    }
    var head = document.getElementsByTagName('head')[0]
    ;(head || document.body).appendChild(script)
  },
  creatDomCss(option: any) {
    let attrs = option.attrs
    var link = document.createElement('link')
    let callBack = option.callBack

    link.rel = 'stylesheet'
    link.href = attrs.url
    //重点！！！！script加载成功
    link.onload = function () {
      callBack && callBack()
    }
    var head = document.getElementsByTagName('head')[0]
    ;(head || document.body).appendChild(link)
  },

  loadJs(urls: any, callback: any) {
    const maxI = urls.length // 加载js的数量
    let jsDone = false // 所有js加载状态
    let curI = 0 // 加载js的当前索引

    //每个js加载完成后的回调
    const loadCallback = (res: any) => {
      const curUrl: any = urls[curI]
      tools.typeOf(curUrl) === 'object' &&
        curUrl.isLoad &&
        this.creatDom({
          dom: 'script',
          attrs: {
            name: curUrl && curUrl.name ? curUrl.name : 'js',
            // html: res,
            url: curUrl.src,
            async: curUrl.async
          },
          callBack: function () {
            jsDone = curI === maxI - 1
            callback && jsDone && callback()

            //开始加载下一个
            curI++
            curI < maxI && loadFn(urls[curI])
          }
        })
    }

    const loadFn = (curJsData: any) => {
      loadCallback(curJsData)
    }

    loadFn(urls[curI])
  },

  loadCss(urls: any, callback: any) {
    const maxI = urls.length // 加载js的数量
    let jsDone = false // 所有js加载状态
    let curI = 0 // 加载js的当前索引

    //每个js加载完成后的回调
    const loadCallback = (res: any) => {
      const curUrl = urls[curI]
      tools.typeOf(curUrl) === 'object' &&
        curUrl.isLoad &&
        this.creatDomCss({
          dom: 'link',
          attrs: {
            name: curUrl.name || 'css',
            url: curUrl.src,
            async: curUrl.async
          },
          callBack: function () {
            jsDone = curI === maxI - 1
            callback && jsDone && callback()

            //开始加载下一个
            curI++
            curI < maxI && loadFn(urls[curI])
          }
        })
    }

    const loadFn = (curJsData: any) => {
      loadCallback(curJsData)
    }

    loadFn(urls[curI])
  }
}

/* 自定义动态加载js方法(支持jsList:字符串、对象、数组)，示例如下
  initAsyn([
    'bscroll',
    {
      name: 'bscroll',
      global: 'BScroll',
      ver: '0.0.1',
      isLoad: true,
      cache: false,
      src: 'https://mstatic.secooimg.com/js/bscroll.min.js'
    },
    [
      {
        name: 'bscroll',
        global: 'BScroll',
        ver: '0.0.1',
        isLoad: true,
        cache: false,
        src: 'https://mstatic.secooimg.com/js/bscroll.min.js'
      },
      {
        name: 'bscroll',
        global: 'BScroll',
        ver: '0.0.1',
        isLoad: true,
        cache: false,
        src: 'https://mstatic.secooimg.com/js/bscroll.min.js'
      }
    ]
  ], () => {
    console.log('加载完毕')


  })
*/
function initAsyn(jsList: any[] = [], callback: any) {
  // js加载列表
  let concatJsListArr: any = []

  jsList.map((item) => {
    if (tools.typeOf(item) === 'string') {
      // 禁止页面重复加载第三方js逻辑
      if (!sourceJs[item].global || !window[sourceJs[item].global]) {
        concatJsListArr.push(sourceJs[item])
      }
    } else if (tools.typeOf(item) === 'object') {
      // 禁止页面重复加载第三方js逻辑
      if (!item.global || !window[item.global]) {
        concatJsListArr.push(item)
      }
    } else if (tools.typeOf(item) === 'array') {
      concatJsListArr = [].concat(concatJsListArr, item)

      // 禁止页面重复加载第三方js逻辑
      concatJsListArr.map((item: any) => {
        return !item.global || !window[item.global]
      })
    }
  })

  // 加载所有对应的js
  if (concatJsListArr.length) {
    tools.loadJs(concatJsListArr, () => {
      // 所有js加载完毕后的回调
      if (callback) {
        console.log('自定义动态js加载完毕(本次动态加载' + jsList.length + '个js):', jsList)
        callback()
      }
    })
  } else {
    callback && callback()
  }
}

/*
 initAsyn的promise版本
*/
function initAsyn_promise(jsList: any[] = []) {
  return new Promise((resolve: any, reject: any) => {
    // js加载列表
    let concatJsListArr: any = []

    jsList.map((item: any) => {
      if (tools.typeOf(item) === 'string') {
        // 禁止页面重复加载第三方js逻辑
        if (!sourceJs[item].global || !window[sourceJs[item].global]) {
          // 个人设置全局插件变量，避免重复加载
          if (!window[sourceJs[item].selfAddGlobal]) {
            concatJsListArr.push(sourceJs[item])

            if (sourceJs[item].selfAddGlobal) {
              window[sourceJs[item].selfAddGlobal] = sourceJs[item].selfAddGlobal
            }
          }
        }
      } else if (tools.typeOf(item) === 'object') {
        // 禁止页面重复加载第三方js逻辑
        if (!item.global || !window[item.global]) {
          concatJsListArr.push(item)
        }
      } else if (tools.typeOf(item) === 'array') {
        concatJsListArr = [].concat(concatJsListArr, item)

        // 禁止页面重复加载第三方js逻辑
        concatJsListArr.map((item: any, index: any) => {
          if (!item.global || !window[item.global]) {
            console.log(`加载cdn资源列表中存在已经加载过的plugin：${item}，已从加载列表中删除`)
            concatJsListArr.splice(index, 1)
          }
        })
      }
    })

    // 加载所有对应的js
    if (concatJsListArr.length) {
      tools.loadJs(concatJsListArr, () => {
        // 所有js加载完毕后的回调
        console.log('自定义动态js加载完毕(本次动态加载' + jsList.length + '个js):', jsList)
        resolve()
      })
    } else {
      resolve()
    }
  })
}

/* 自定义动态加载css方法(支持jsList:字符串、对象、数组)，示例如下
  initAsyn([
    'bscroll',
    {
      name: 'bscroll',
      global: 'BScroll',
      ver: '0.0.1',
      isLoad: true,
      cache: false,
      src: 'https://mstatic.secooimg.com/js/bscroll.min.js'
    },
    [
      {
        name: 'bscroll',
        global: 'BScroll',
        ver: '0.0.1',
        isLoad: true,
        cache: false,
        src: 'https://mstatic.secooimg.com/js/bscroll.min.js'
      },
      {
        name: 'bscroll',
        global: 'BScroll',
        ver: '0.0.1',
        isLoad: true,
        cache: false,
        src: 'https://mstatic.secooimg.com/js/bscroll.min.js'
      }
    ]
  ], () => {
    console.log('加载完毕')
  })
*/
function initAsynCss(cssList: any[] = [], callback: Function) {
  // css加载列表
  let concatCssListArr: any = []

  cssList.map((item: any) => {
    if (tools.typeOf(item) === 'string') {
      // 禁止页面重复加载第三方js逻辑
      if (!sourceCss[item].global || !window[sourceCss[item].global]) {
        concatCssListArr.push(sourceCss[item])
      }
    } else if (tools.typeOf(item) === 'object') {
      // 禁止页面重复加载第三方js逻辑
      if (!item.global || !window[item.global]) {
        concatCssListArr.push(item)
      }
    } else if (tools.typeOf(item) === 'array') {
      concatCssListArr = [].concat(concatCssListArr, item)

      // 禁止页面重复加载第三方js逻辑
      concatCssListArr.map((item: any) => {
        return !item.global || !window[item.global]
      })
    }
  })

  // 加载所有对应的js
  if (concatCssListArr.length) {
    tools.loadCss(concatCssListArr, () => {
      // 所有js加载完毕后的回调
      if (callback) {
        console.log('自定义动态css加载完毕(本次动态加载' + cssList.length + '个css):', cssList)
        callback()
      }
    })
  } else {
    callback && callback()
  }
}

/*
 initAsynCss的promise版本
*/
function initAsynCss_promise(cssList: any[] = []) {
  return new Promise((resolve: Function, reject: Function) => {
    // js加载列表
    let concatCssListArr: any = []

    cssList.map((item: any) => {
      if (tools.typeOf(item) === 'string') {
        // 禁止页面重复加载第三方js逻辑
        if (!sourceCss[item].global || !window[sourceCss[item].global]) {
          concatCssListArr.push(sourceCss[item])
        }
      } else if (tools.typeOf(item) === 'object') {
        // 禁止页面重复加载第三方js逻辑
        if (!item.global || !window[item.global]) {
          concatCssListArr.push(item)
        }
      } else if (tools.typeOf(item) === 'array') {
        concatCssListArr = [].concat(concatCssListArr, item)

        // 禁止页面重复加载第三方js逻辑
        concatCssListArr.map((item: any) => {
          return !item.global || !window[item.global]
        })
      }
    })

    // 加载所有对应的js
    if (concatCssListArr.length) {
      tools.loadCss(concatCssListArr, () => {
        // 所有js加载完毕后的回调
        console.log('自定义动态css加载完毕(本次动态加载' + cssList.length + '个css):', cssList)
        resolve()
      })
    } else {
      resolve()
    }
  })
}

export { initAsyn, initAsyn_promise, initAsynCss, initAsynCss_promise }
