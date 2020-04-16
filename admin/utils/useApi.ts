import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios'
import { useState, useCallback, useEffect, useRef } from 'react'
import instance from './createAxiosInst'

function useApi(config: AxiosRequestConfig, willMountReq: Boolean = false): AxiosResponse {
  const source: CancelTokenSource = axios.CancelToken.source()
  // 不能直接修改config，浅拷贝config（非修改config则可）
  const axiosConfig = { ...config, cancelToken: source.token }
  const isMount = useRef(willMountReq)
  const [res, setRes] = useState(null)
  const loginReq = useCallback(async () => {
    try {
      const response: AxiosResponse = await instance(axiosConfig)
      setRes(response)
    } catch (e) {
      setRes({
        status: e.response.status
      })
      console.error(e)
    }
  }, [config])
  
  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true
      return undefined
    }
    loginReq()
    return () => source.cancel()
  }, [loginReq])

  return res
}

export { useApi }