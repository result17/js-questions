import React from 'react'
import { Tag } from 'antd'
import { Link } from 'react-router-dom'
import { ColumnsType } from 'antd/lib/table/interface'
import { QuestionInfoItem } from "./types"

const cols: ColumnsType<QuestionInfoItem> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Level',
    dataIndex: 'level',
    key: 'level',
    render: (level: string) => {
      const tagRender = () => {
        let color = 'volcano'
        if (level === 'easy') {
          color = 'green'
        } else if (level == 'medium') {
          color = 'geekblue'
        }
        return (
          <Tag color={color} key={ level }>
            { level }
          </Tag>
        )
      }
      return (
        <span>
          {
            tagRender()
          }
        </span>
      )
    }
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author'
  },
  {
    title: 'Create At',
    dataIndex: 'create_at',
    key: 'create_at',
    render: (text: string) => {
      return (
        <span>
          { `${new Date(text).toLocaleDateString()} ${new Date(text).toLocaleTimeString()}` }
        </span>
      )
    }
  },
  {
    title: 'Update At',
    dataIndex: 'update_at',
    key: 'update_at',
    render: (text: string) => {
      return (
        <span>
          { `${new Date(text).toLocaleDateString()} ${new Date(text).toLocaleTimeString()}` }
        </span>
      )
    }
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: string, record: QuestionInfoItem) => {
      return (
        <span>
          <Link to={{
            pathname: `/quizlib_browse/${record.id}`,
            state: {
              dataUrl: `/questionData?id=${record.id}`
            }
          }}>
            浏览
          </Link>
        </span>
      )
    }
  }
]

export default cols