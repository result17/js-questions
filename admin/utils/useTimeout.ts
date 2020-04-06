import { useEffect, useRef } from 'react'

interface ICallback {
  (x: React.MutableRefObject<any>): void
}

function useTimeout(callback: ICallback, delay: number = 1000) {
  const id = useRef(null)

  useEffect(() => {
    if (id.current) {
      clearTimeout(id.current)
    }
    if (delay) {
      id.current = setTimeout(callback.bind(null, id), delay)
    }
    return () => {
      clearTimeout(id.current)
    }
  }, [delay])
} 

export { useTimeout, ICallback }