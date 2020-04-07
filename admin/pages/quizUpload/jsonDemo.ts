const jsonDemo = `/* 请依照此示例和上面的说明，
   创建题库json，并上传。 
*/
{
  "data": {
    "questions": [
      {
        "id": "1",
        "code": "console.log('hello world!')",
        "title": "Hello World!",
        "options": [
          {
            "text": "a",
            "correct": false,
            "__typename": "Option"
          },
          {
            "text": "b",
            "correct": false,
            "__typename": "Option"
          },
          {
            "text": "c",
            "correct": true,
            "__typename": "Option"
          },
          {
            "text": "d",
            "correct": false,
            "__typename": "Option"
          }
        ],
        "explanation": "Hello World!",
        "__typename": "Question"
      }
    ]
  }
}`

export default jsonDemo