import React, { FC, useState, useRef } from 'react'
import cloneDeep from 'lodash/clonedeep'
import ReactEcharts  from  'echarts-for-react'
import { useTimeout, ICallback } from '../../utils/useTimeout'
import initOption from './initOption'

const EchartsDemo: FC = () => {
  const [option, setOption] = useState(initOption)
  const count = useRef(50)
  const delay: number = 2000 

  const updataAnimate: ICallback = (id: React.MutableRefObject<any>) => {
    
    setOption(option => {
      const axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'')
      const newOption = cloneDeep(option)
      const data0 = newOption.series[0].data
      const data1 = newOption.series[1].data
      data0.shift()
      data0.push(Math.round(Math.random() * 1000))
      data1.shift()
      data1.push(Number((Math.random() * 10 + 5).toFixed(1)))

      newOption.xAxis[0].data.shift()
      newOption.xAxis[0].data.push(axisData)
      newOption.xAxis[1].data.shift()
      newOption.xAxis[1].data.push((count.current++).toString())
      return newOption
    })
    id.current = window.setTimeout(updataAnimate.bind(null, id), delay)
  }

  useTimeout(updataAnimate, delay)
  
  return (
    <ReactEcharts 
      option={ option }
      style={{ height: 600, marginTop: 'calc((100vh - 64px - 600px) / 2)' }} 
    />
  )
}

export default EchartsDemo