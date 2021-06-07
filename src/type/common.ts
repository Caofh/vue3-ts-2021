import { AxiosResponse } from 'axios'

export interface ResponseData extends AxiosResponse {
  code?: string
  message?: string
  loginUrl?: string
}

export interface callApiHeaders {
  'content-type'?: string
}
