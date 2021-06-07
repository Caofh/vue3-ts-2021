import { AxiosPromise } from 'axios'
import { envConfig } from '@/config'
import { service } from '@/service/callApi'
import url from '@/service/url'

const baseURL = envConfig.baseURL // 接口当前根域名

// 获取数据列表
export function listPage(data = {}): AxiosPromise<any> {
  return service(baseURL, {
    url: url.getMeInfo,
    method: 'get',
    data: data
  })
}
