import React, { FC, useRef } from 'react'
import useDataFetch from '../../utils/useDataFetch/useDataFetch'
import { Table } from 'antd'
import cols from './cols'
import { QuestionInfoRes } from './types'

const QuizBrowse: FC = () => {
// 特别注意： axiosReqCfg应该是不可变对象，如果每次render的时候重新构造一个新的对象，那么useDataFetch会不停执行，发起大量无效的请求，导致主线程卡死，页面无响应
  const axiosReqCfg = useRef({
    url: './questionInfo'
  })
  
  const { data } = useDataFetch<QuestionInfoRes>(axiosReqCfg.current)

  return (
    <Table columns={ cols } dataSource={ Object.keys(data).length ? (data as QuestionInfoRes).list : [] } rowKey="id"></Table>
  )
}

export default QuizBrowse