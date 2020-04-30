// import { QuestionItemState, QuestionItemAction, ItemAction } from "./types"
import { ListState, QuestionItemAction,  QuestionListAction, ItemAction, ListAction, QuestionItemState } from "./types"

const listReducer = (state: ListState, action: QuestionItemAction | QuestionListAction): ListState => {
  switch (action.type) {
    case ItemAction.CHOOSE:
      return state.reduce((acc, item, index) => {
        if (index === action.itemIdx) {
          acc.push({
            hasChosen: true,
            clickBtnIdx: action.idx,
          })
        } else {
          acc.push(item)
        }
        return acc
      }, [])
    case ListAction.INIT:
      // 创建列表状态数组
      const listState = new Array(action.questionsNum)
      for (let i = 0; i < action.questionsNum; i++) {
        const itemState: QuestionItemState = {
          hasChosen: false,
          clickBtnIdx: -1,
        }
        listState[i] = itemState
      }
      return listState as ListState
    default: 
      return state
  }
}

export default listReducer