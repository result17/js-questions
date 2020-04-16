interface QuestionContext {
  id: number,
  code: string,
  title: string,
  options: QuestionOption[],
  explanation: string,
  __typename: 'Question',
}

interface QuestionOption {
  text: string,
  correct: boolean,
  __typename: 'Option',
}

interface QuestionContextSet {
  questions: QuestionContext[],
}

interface QuestionContextRes {
  flag: 0 | 1,
  source: QuestionContextSet,
}

interface QuestionItemProps {
  data: QuestionContext,
  style: React.CSSProperties,
}

interface QuestionItemState {
  hasChosen: boolean,
  clickBtnIdx: number,
}

enum ItemAction {
  CHOOSE = 'CHOOSE',
}

interface QuestionItemAction {
  type: ItemAction.CHOOSE,
  idx: number,
}

interface IContextProps {
  url: string
}

interface TitleProps {
  title: string,
  id: number
}

interface TitleProps {
  title: string,
  id: number
}

interface QuestionOptionsProps<T> {
  options: T[],
  chosen: boolean,
  clickBtnIdx: number
  dispatch: Function
}

interface QuestionCodeProps {
  code: string
}

interface QuestionExplanationProps {
  text: string,
  chosen: boolean
}

export { 
  QuestionContext, 
  QuestionOption, 
  QuestionContextRes, 
  QuestionItemProps, 
  QuestionItemState, 
  QuestionItemAction, 
  ItemAction, 
  IContextProps, 
  TitleProps,  
  QuestionOptionsProps, 
  QuestionCodeProps, 
  QuestionExplanationProps 
}