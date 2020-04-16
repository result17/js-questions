import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios'
import { useReducer, useCallback, useEffect, useRef } from 'react'
import instance from '../createAxiosInst'
import dataFetchReducer from './reducer'
import { DataFetchActions, DataFetchState } from './types'

// 自定义请求服务器Api的hooks
function useDataFetch<T>(config: AxiosRequestConfig, willMountReq: Boolean = true): DataFetchState<T> {
  /* CancelToken.source 工厂方法 
    每次组件刷新，会产生一个新的source用于组件unmount取消请求
  */
  const initState: DataFetchState<{}>  = {
    isLoading: false,
    isError: false,
    data: {}
  }
  
  const source: CancelTokenSource = axios.CancelToken.source()
  const axiosConfig = { ...config, cancelToken: source.token }
  const isMount = useRef(willMountReq)
  const [state, dispatch] = useReducer(dataFetchReducer, initState)

  const fetchData = useCallback(async () => {
    dispatch({ type: DataFetchActions.init })
    try {
      // 实例也可以config
      const response: AxiosResponse<T> = await instance(axiosConfig)
      dispatch({ type: DataFetchActions.success, payload: response.data })
    } catch (e) {
      dispatch({ type: DataFetchActions.fail})
      console.error(e)
    }
  }, [config])

  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true
      return undefined
    }
    fetchData()
    return () => source.cancel()
  }, [fetchData])

  return state
}

export default useDataFetch