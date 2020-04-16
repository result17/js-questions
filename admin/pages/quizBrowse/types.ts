interface QuestionInfoItem {
  id: number,
  name: string,
  level: 'easy',
  author: string,
  create_at: string,
  update_at: string,
}

interface QuestionInfoRes {
  list: QuestionInfoItem[],
  flag: 0 | 1
}

export { QuestionInfoItem, QuestionInfoRes }