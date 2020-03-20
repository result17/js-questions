import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { TokenOperations } from './TokenOperations'
import { useState, useCallback, useEffect, useRef } from 'react'

const requestConfig: AxiosRequestConfig = {
  baseURL: '/api',
  method: 'POST',
  timeout: 5000,
  headers: {
    // JWT
    'Content-Type': "application/json;charset=utf-8"
  }
}

const instance: AxiosInstance = axios.create(requestConfig)
const tokenOperate = new TokenOperations()

// 请求添加认证token
instance.interceptors.request.use(config => {
  if (tokenOperate.hasToken()) {
    const token = tokenOperate.getToken()
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
        tokenOperate.delToken()
        // window.location.href
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

interface ApiResponse {
  isLoading: boolean,
  data: AxiosResponse,
  error: Error
}

// 自定义请求服务器Api的hooks
function useServerApi(config: AxiosRequestConfig): ApiResponse {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      // 实例也可以config
      const response: AxiosResponse<any> = await instance(config)
      setData({...response})
    } catch (e) {
      setError({...e})
    }
    setIsLoading(false)
  }, [config])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    isLoading,
    data,
    error
  }
}

function useApi(config: AxiosRequestConfig): AxiosResponse {
  const isMount = useRef(false)
  const [data, setData] = useState(null)
   
  const loginReq = useCallback(async () => {
    try {
      const response: AxiosResponse = await instance(config)
      setData({...response})
    } catch (e) {
      console.error(e)
    }
  }, [config])
  
  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true
      return
    }
    loginReq()
  }, [loginReq])

  return data
}

export { ApiResponse, useServerApi, useApi }