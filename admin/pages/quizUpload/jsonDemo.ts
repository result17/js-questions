const jsonDemo = `/* 请依照此示例和上面的说明，
   创建题库json，并上传。 
*/
{
  "data": {
    "questions": [
      {
        "id": "1",
        "title": "1. 输出是什么",
        "code": "function sayHi() {} sayHi()",
        "options": [
          {
            "text": "\`Lydia\` 和 \`undefined\`",
            "correct": false,
            "__typename": "Option"
          },
          {
            "text": "\`Lydia\` 和 \`ReferenceError\`",
            "correct": false,
            "__typename": "Option"
          },
          {
            "text": "\`ReferenceError\` 和 \`21\`",
            "correct": true,
            "__typename": "Option"
          },
          {
            "text": "\`undefined\` 和 \`ReferenceError\`",
            "correct": false,
            "__typename": "Option"
          }
        ],
        "explanation": "在函数内部，我们首先通过 \`var\` 关键字声明了 \`name\` 变量......",
        "__typename": "Question"
      }
    ]
  }
}`

export default jsonDemo