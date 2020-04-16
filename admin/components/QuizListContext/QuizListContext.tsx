import React, { FC, useRef } from 'react'
import useDataFetch from '../../utils/useDataFetch/useDataFetch'
import { QuestionContextRes, IContextProps  } from './types'
import QuestionItem from './QuestionItem/QuestionItem'

import { FixedSizeList as List, ListChildComponentProps } from 'react-window'

const questionItemFactory: FC<ListChildComponentProps> = (props: ListChildComponentProps) => {

  return (
    <QuestionItem
      data={ props.data[props.index] }
      key={ props.data.id }
      style={ props.style }
    ></QuestionItem>
  )
}

const QuizListContext: FC<IContextProps> = (props: IContextProps) => {

  const axiosReqCfg = useRef({
    url: props.url,
  })

  const { data } = useDataFetch<QuestionContextRes>(axiosReqCfg.current)
  
  return (
    <div className="list-wrapper">
      {
        !!Object.keys(data).length &&
        <List
          height={ 1000 }
          itemCount={ (data as QuestionContextRes).source.questions.length }
          itemSize={ 460 }
          itemData={ (data as QuestionContextRes).source.questions }
          useIsScrolling
          width={ '100%' }
        >
          {
            questionItemFactory
          }
        </List>
      }
    </div>
  )
}

export { QuizListContext } 