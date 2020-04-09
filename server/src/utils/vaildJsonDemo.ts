import * as Joi from '@hapi/joi'

const test = {
  data: {
    questions: [{
      id: '1',
      title: '1. 输出是什么？',
      code: "function sayHi() {\r\n  console.log(name)\r\n  console.log(age)\r\n  var name = 'Lydia'\r\n  let age = 21\r\n}\r\n\r\nsayHi()\r\n",
      options: [{
        text: "`Lydia` 和 `undefined`",
        correct: false,
        __typename: "Option",
      }, {
        text: "`Lydia` 和 `ReferenceError`",
        correct: false,
        __typename: "Option",
      }, {
        text: "`ReferenceError` 和 `21`",
        correct: false,
        __typename: "Option",
      }, {
        text: "`undefined` 和 `ReferenceError`",
        correct: true,
        __typename: "Option"
      }],
      explanation: "在函数内部，我们首先通过 `var` 关键字声明了 `name` 变量。这意味着变量被提升了（内存空间在创建阶段就被设置好了），直到程序运行到定义变量位置之前默认值都是 `undefined`。因为当我们打印 `name` 变量时还没有执行到定义变量的位置，因此变量的值保持为 `undefined`。\r\n\r\n通过 `let` 和 `const` 关键字声明的变量也会提升，但是和 `var` 不同，它们不会被<i>初始化</i>。在我们声明（初始化）之前是不能访问它们的。这个行为被称之为暂时性死区。当我们试图在声明之前访问它们时，JavaScript 将会抛出一个 `ReferenceError` 错误。",
      __typename: 'Question'
    }, {
      id: "2",
      title: "2. 输出是什么？",
      code: "for (var i = 0; i < 3; i++) {\r\n  setTimeout(() => console.log(i), 1)\r\n}\r\n\r\nfor (let i = 0; i < 3; i++) {\r\n  setTimeout(() => console.log(i), 1)\r\n}\r\n",
      options: [
        {
          text: "`0 1 2` 和 `0 1 2`",
          correct: false,
          __typename: "Option"
        },
        {
          text: "`0 1 2` 和 `3 3 3`",
          correct: false,
          __typename: "Option"
        },
        {
          text: "`3 3 3` 和 `0 1 2`",
          correct: true,
          __typename: "Option"
        }
      ],
      explanation: "由于 JavaScript 的事件循环，`setTimeout` 回调会在*遍历结束后*才执行。因为在第一个遍历中遍历 `i` 是通过 `var` 关键字声明的，所以这个值是全局作用域下的。在遍历过程中，我们通过一元操作符 `++` 来每次递增 `i` 的值。当 `setTimeout` 回调执行的时候，`i` 的值等于 3。\r\n\r\n在第二个遍历中，遍历 `i` 是通过 `let` 关键字声明的：通过 `let` 和 `const` 关键字声明的变量是拥有块级作用域（指的是任何在 {} 中的内容）。在每次的遍历过程中，`i` 都有一个新值，并且每个值都在循环内的作用域中。",
      __typename: "Question"
    }]
  }
}

try {
  const schema = Joi.object({
    data: Joi.object({
      questions: Joi.array().max(300).items(Joi.object({
        id: Joi.string().regex(/^\d+$/).max(3),
        title: Joi.string().empty(),
        code: Joi.string(),
        options: Joi.array().max(4).items(Joi.object({
          text: Joi.string().empty(),
          correct: Joi.boolean(),
          __typename: Joi.string().valid('Option')
        })),
        explanation: Joi.string().empty(),
        __typename: Joi.string().valid('Question')
      }))
    })
  })
  Joi.assert(test, schema)
} catch(e) {
  console.log(e.name)
}

