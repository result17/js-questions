import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import { tokenOperations } from './TokenOperations'

const requestConfig: AxiosRequestConfig = {
  baseURL: '/api',
  method: 'POST',
  timeout: 5000,
  headers: {
    'Content-Type': "application/json;charset=utf-8"
  }
}

const instance: AxiosInstance = axios.create(requestConfig)

// 请求添加认证token
instance.interceptors.request.use(config => {
  if (tokenOperations.hasToken()) {
    const token = tokenOperations.getToken()
    config.headers.common['Authorization'] = token
  }
  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use(response => {
  return response
}, err => {
  switch (err.response.status) {
    case 401:
      tokenOperations.delToken()
        break
    case 403:
        break
    case 404:
        break
    case 500:
        break
    default:
        console.error(err.response.status)
  }
  return Promise.reject(err)
})

export default instance