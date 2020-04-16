import { QuestionItemState, QuestionItemAction, ItemAction } from "./types"

const questionReducer = (state: QuestionItemState, action: QuestionItemAction): QuestionItemState => {
  switch (action.type) {
    case ItemAction.CHOOSE:
      return {
        hasChosen: true,
        clickBtnIdx: action.idx,
      }
    default: 
      return state
  }
}

export default questionReducer