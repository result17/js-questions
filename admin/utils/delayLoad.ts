const delayLoad = (componentPath: string, delayTime: number) => {
  const importPromise = import(componentPath)
  const delayPromise = new Promise(res => {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      res()
    }, delayTime)
  })
  return Promise.all([importPromise, delayPromise]).then(() => importPromise)
}

export { delayLoad }