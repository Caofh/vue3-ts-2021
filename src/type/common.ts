import { AxiosResponse } from "axios";

export interface ResponseData extends AxiosResponse {
  code?: number
  msg?: string
  update_time?: number
}
export interface callApiHeaders {
  'content-type'?: string
}
