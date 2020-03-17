import React, { useLayoutEffect, FC } from 'react'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import Loadable from 'react-loadable';

// useLayoutEffect的第二个参数为[], 相当于componentWillMount，详细见react文档
const Loading: FC = () => {

  useLayoutEffect(() => {
    nprogress.start()
    return () => {
      nprogress.done()
    }
  }, [])

  return (
    <h3>Loading page...</h3>
  )
}

const LoadComp = (compImport: () => Promise<any>) => Loadable({
  loader: compImport,
  loading: Loading
})

export { LoadComp }