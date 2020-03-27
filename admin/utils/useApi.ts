import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios'
import { useState, useCallback, useEffect, useRef } from 'react'
import instance from './createAxiosInst'

function useApi(config: AxiosRequestConfig): AxiosResponse {
  const source: CancelTokenSource = axios.CancelToken.source()
  config.cancelToken = source.token
  const isMount = useRef(false)
  const [res, setRes] = useState(null)
  const loginReq = useCallback(async () => {
    try {
      const response: AxiosResponse = await instance(config)
      setRes(response)
    } catch (e) {
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