// https://www.robinwieruch.de/react-hooks-fetch-data

enum DataFetchActions {
  init = 'FETCH_INIT',
  success = 'FETCH_SUCCESS',
  fail = 'FETCH_FAILURE',
}

interface DataFetchAction<U> {
  type: DataFetchActions.init | DataFetchActions.success | DataFetchActions.fail,
  payload?: U
}

interface DataFetchState<T> {
  data: T | {},
  isLoading: boolean,
  isError: boolean,
}

export { DataFetchActions, DataFetchAction, DataFetchState }