import React, { FC, useRef, useReducer, useEffect, createContext } from 'react'
import useDataFetch from '../../utils/useDataFetch/useDataFetch'
import { QuestionContextRes, IContextProps, ListAction } from './types'
import QuestionItem from './QuestionItem/QuestionItem'
import listReducer from './listReducer'

import { FixedSizeList as List, ListChildComponentProps } from 'react-window'

const questionItemFactory: FC<ListChildComponentProps> = (props: ListChildComponentProps) => {

  return (
    <QuestionItem
      itemIdx= { props.index }
      data={ props.data[props.index] }
      key={ props.data.id }
      style={ props.style }
    ></QuestionItem>
  )
}

const ListContext = createContext(null)

const QuizListContext: FC<IContextProps> = (props: IContextProps) => {
  const [listState, dispatch] = useReducer(listReducer, [])

  const axiosReqCfg = useRef({
    url: props.url,
  })

  const { data } = useDataFetch<QuestionContextRes>(axiosReqCfg.current)

  useEffect(() => {
    !!Object.keys(data).length && dispatch({
      type: ListAction.INIT,
      questionsNum: (data as QuestionContextRes).source.questions.length
    })
  }, [data])
  
  
  return (
    <div className="list-wrapper">
      {
        !!Object.keys(data).length &&
        <ListContext.Provider value={{ listState, dispatch }}>
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
        </ListContext.Provider>
      }
    </div>
  )
}

export { QuizListContext, ListContext } 