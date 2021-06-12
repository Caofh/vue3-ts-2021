/* 封装axios */

import axios, { AxiosInstance, AxiosPromise, AxiosResponse } from 'axios' // 文档：http://www.axios-js.com/zh-cn/docs/#axios-create-config
import Qs from 'qs'
import { callApiHeaders, ResponseData } from '@/type'

/* 自定义content-type方式示例如下，默认'content-type': 'application/json'
  const hostDev = baseHost.hostDev
  const axios_www = callApi(hostDev, {
    'content-type': 'application/x-www-form-urlencoded',
  });
*/
const callApi = (apiRoot = '/' as string, headers = {} as callApiHeaders): AxiosInstance => {
  let axiosObj = {} as AxiosInstance
  const axiosDefault = {
    baseURL: apiRoot,
    timeout: 20000,
    headers: {
      'content-type': 'application/json'
    }
  }

  let defHeaders = axiosDefault.headers

  // 合并传入的header和默认的header
  if (headers) {
    defHeaders = Object.assign(defHeaders, headers) // 合并header
  }

  // 整理最终headers
  axiosDefault.headers = defHeaders

  // 设置axios
  axiosObj = axios.create(axiosDefault)

  // 添加请求拦截器
  axiosObj.interceptors.request.use(
    (config) => {
      // 针对get参数做处理(兼容get情况传入data的情况)
      if (config.method == 'get' && config.data) {
        let paramsObj = config.params ? config.params : {}
        paramsObj = Object.assign(paramsObj, config.data)
        paramsObj.r = new Date().getTime() // get请求增加时间戳

        config.params = paramsObj
      }

      // 针对post模式对象做x-www-form-urlencoded处理
      if (config.data && config.headers['content-type'] == 'application/x-www-form-urlencoded' && Object.prototype.toString.call(config.data).slice(8, -1) == 'Object') {
        config.data = Qs.stringify(config.data)
      }

      // 针对post模式对象做form-data处理
      if (config.data && config.headers['content-type'] == 'multipart/form-data' && Object.prototype.toString.call(config.data).slice(8, -1) == 'Object') {
        const formData = new FormData()
        for (const key in config.data) {
          formData.append(key, config.data[key])
        }

        config.data = formData
      }

      return config
    },
    (err) => {
      // 对请求错误做些什么
      return Promise.reject(err)
    }
  )

  // 添加响应拦截器
  axiosObj.interceptors.response.use(
    (res: AxiosResponse) => {
      // const config: any = res.config // 请求相关信息
      const data: ResponseData = res.data // 返回数据
      const code = data.code || '' // 兼容code码

      // 判断登录信息是否过期
      if (code === 1006 || code === 103) {
        // console.log("---------");
        // console.log("问题接口：" + (config.baseURL + config.url));
        // console.log("问题返回：");
        // console.log(data);
        // console.log("---------");

        // 响应错误
        return Promise.reject(data)
      } else {
        // console.log("---------");
        // console.log("请求成功接口：" + (config.baseURL + config.url));
        // console.log("返回数据：");
        // console.log(data);
        // console.log("---------");

        return data
      }
    },
    (err) => {
      // 对响应错误做点什么
      return Promise.reject(err)
    }
  )

  return axiosObj
}

// 请求接口中间层
const service = (baseURL: string, data = {}): AxiosPromise<any> => {
  const axios = callApi(baseURL)
  return axios(data)
}

export { callApi, service }
