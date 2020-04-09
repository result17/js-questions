import axios from 'axios'

interface ScrapeMDOption {
  method: 'GET' | 'POST',
  MDurl: string,
  outputPath?: string,
}

interface parseMD2Obj {
  title: string,
  code: string,
  options: string,
  explanation: string,
  __typename: 'Question'
}

interface parsedData {
  id: string,
  title: string,
  code: string,
  options: string,
  explanation: string,
}

// linux换行和window换行bug
abstract class ScrapeMD {
  protected url: string
  protected method: 'GET' | 'POST'
  protected outputPath: string
  protected optionsAry: string[] = ['A', 'B', 'C', 'D']
  protected answerStr = (answer: string): string => `#### 答案: ${answer}`
  protected reg = {
    QUESTIONS_RE: /---/,
    START_CODE_BLOCK_RE: /```[a-z]/g,
    END_CODE_BLOCK_RE: /```\r\n/g,
    OPTION_RE: /-(\s+\w+:.*)/g,
    TITLE_RE: /###### /,
    ANSWER_RE: /#### 答案: /,
  }
  constructor(option: ScrapeMDOption) {
    [ this.url, this.method, this.outputPath ] = [ option.MDurl, option.method, option.outputPath ]
  }

  async fetchMD(): Promise<parsedData[]> {
    const res = await axios({
      method: this.method,
      url: this.url
    })
    let text = res.data
    let questions: string[] = text.split(this.reg.QUESTIONS_RE).slice(1)
    text = null
    const data: parsedData[] = questions.map((question, i) => {
      return {id: (i + 1).toString(), ...this.getData(question)}
    })
    return data
  }

  getData(questionStr): parseMD2Obj {
    const hasCodeBlock = !!questionStr.match(this.reg.START_CODE_BLOCK_RE)
    const title = questionStr
      .split(hasCodeBlock ? this.reg.START_CODE_BLOCK_RE : this.reg.OPTION_RE)[0]
      .split(this.reg.TITLE_RE)[1]
      .trim()

    const code = questionStr
      .substring(
        questionStr.search(this.reg.START_CODE_BLOCK_RE) + 15,
        questionStr.search(this.reg.END_CODE_BLOCK_RE)
      )

    const rawQuestions = questionStr.match(this.reg.OPTION_RE)
    const answer = questionStr.split(this.reg.ANSWER_RE)[1].split('\r\n')[0]
    const options = rawQuestions.map((question, i) => {
      let rawQuestion = question
        .substring(question.indexOf(':') + 1, question.length)
        .trim()
      
      return {
        text: rawQuestion,
        correct: this.optionsAry.indexOf(answer) === i,
        __typename: 'Option'
      }
    })

    const explanation = questionStr
      .substring(questionStr.indexOf(this.answerStr(answer)) + 12)
      .split('</p>')[0]
      .trim()

    return {
      title,
      code,
      options,
      explanation,
      __typename: 'Question'
    }
  }
}

export { ScrapeMDOption, parsedData, ScrapeMD }