import React, { useLayoutEffect, FC } from 'react'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

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

export default Loading