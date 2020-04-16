import { DataFetchActions, DataFetchAction, DataFetchState } from './types'

const dataFetchReducer = <T, U>(state: DataFetchState<T>, action: DataFetchAction<U>): DataFetchState<T> => {
  switch (action.type) {
    case DataFetchActions.init:
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case DataFetchActions.success:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      }  
    case DataFetchActions.fail:
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {}
      }
    default:
      throw new Error()
  }
}

export default dataFetchReducer