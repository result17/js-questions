import React, { FC } from 'react'
import { Typography } from 'antd'
const { Title, Paragraph, Text } = Typography

const UploadDoc: FC = () => {
  return (
    <>
      <Typography>
        <Title level={3}>说明</Title>
        <Paragraph>
          上传js-question题库，文件格式为json，请用户确保自己的json格式无误后，再进行上传。题目暂时只支持单选题。具体格式如上的代码所示。
        </Paragraph>
        <Title level={3}>格式说明</Title>
        <Paragraph>
          <Text code>name</Text>，题库名字，字符串类型。
          <Text code>author</Text>, 题库作者，字符串类型。
          <Text code>lever</Text>，题库难度，由低到高为easy, medium和diffcult，字符串类型。
          <Text code>questions</Text>是题目数组，元素为各个不同<Text code>id</Text>的题目。题目有<Text code>id</Text>，<Text code>code</Text>，<Text code>title</Text>，<Text code>options</Text>，<Text code>explanation</Text>
        及<Text code>__typename</Text>属性。除<Text code>options</Text>和<Text code>id</Text>外都为字符串类型。<Text code>code</Text>属性会交由code mirror进行渲染。而<Text code>options</Text>为选项数组，<Text code>text</Text>为选项内容，<Text code>correct</Text>为选项正确性，格式为布尔值。
        每个属性为必选属性，即格式中每个属性必须被包含，但除了<Text code>code</Text>属性外，不允许出现空值''。<Text code>__typename</Text>属性固定为选项<Text code>Option</Text>，问题元素为<Text code>Question</Text>
        </Paragraph>
        <Title level={3}>验证</Title>
        <Paragraph>
          上传的json文件会经由服务器进行校验，校验需花费一定时间，在得出提交结果前请勿关闭页面。校验成功后，则会自动添加到题库，点击<Text code>题库管理</Text>查看。
          校验失败，服务器则会忽略此文件，请先核对json格式再进行上传。
        </Paragraph>
      </Typography>
    </>
  )
}

export default UploadDoc