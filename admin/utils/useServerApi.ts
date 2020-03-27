import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios'
import { useState, useCallback, useEffect, useRef } from 'react'
import instance from './createAxiosInst'

interface ApiResponse {
  isLoading: boolean,
  data: AxiosResponse,
  error: Error
}

// 自定义请求服务器Api的hooks
function useServerApi(config: AxiosRequestConfig): ApiResponse {
  /* CancelToken.source 工厂方法 
    每次组件刷新，会产生一个新的source用于组件unmount取消请求
  */
  const source: CancelTokenSource = axios.CancelToken.source()
  config.cancelToken = source.token
  const isMount = useRef(false)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      // 实例也可以config
      const response: AxiosResponse = await instance(config)
      setData(response)
    } catch (e) {
      setError(e)
    }
    setIsLoading(false)
  }, [config])

  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true
      return undefined
    }
    fetchData()
    return () => source.cancel()
  }, [fetchData])

  return {
    isLoading,
    data,
    error
  }
}

export { ApiResponse, useServerApi }