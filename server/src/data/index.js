export default [
  {
    "id": 1,
    "title": "1. 输出是什么？",
    "code": "function sayHi() {\r\n  console.log(name)\r\n  console.log(age)\r\n  var name = 'Lydia'\r\n  let age = 21\r\n}\r\n\r\nsayHi()\r\n",
    "options": [
      {
        "correct": false,
        "text": "`Lydia` 和 `undefined`"
      },
      {
        "correct": false,
        "text": "`Lydia` 和 `ReferenceError`"
      },
      {
        "correct": false,
        "text": "`ReferenceError` 和 `21`"
      },
      {
        "correct": true,
        "text": "`undefined` 和 `ReferenceError`"
      }
    ],
    "explanation": "在函数内部，我们首先通过 `var` 关键字声明了 `name` 变量。这意味着变量被提升了（内存空间在创建阶段就被设置好了），直到程序运行到定义变量位置之前默认值都是 `undefined`。因为当我们打印 `name` 变量时还没有执行到定义变量的位置，因此变量的值保持为 `undefined`。\r\n\r\n通过 `let` 和 `const` 关键字声明的变量也会提升，但是和 `var` 不同，它们不会被<i>初始化</i>。在我们声明（初始化）之前是不能访问它们的。这个行为被称之为暂时性死区。当我们试图在声明之前访问它们时，JavaScript 将会抛出一个 `ReferenceError` 错误。"
  },
  {
    "id": 2,
    "title": "2. 输出是什么？",
    "code": "for (var i = 0; i < 3; i++) {\r\n  setTimeout(() => console.log(i), 1)\r\n}\r\n\r\nfor (let i = 0; i < 3; i++) {\r\n  setTimeout(() => console.log(i), 1)\r\n}\r\n",
    "options": [
      {
        "correct": false,
        "text": "`0 1 2` 和 `0 1 2`"
      },
      {
        "correct": false,
        "text": "`0 1 2` 和 `3 3 3`"
      },
      {
        "correct": true,
        "text": "`3 3 3` 和 `0 1 2`"
      }
    ],
    "explanation": "由于 JavaScript 的事件循环，`setTimeout` 回调会在*遍历结束后*才执行。因为在第一个遍历中遍历 `i` 是通过 `var` 关键字声明的，所以这个值是全局作用域下的。在遍历过程中，我们通过一元操作符 `++` 来每次递增 `i` 的值。当 `setTimeout` 回调执行的时候，`i` 的值等于 3。\r\n\r\n在第二个遍历中，遍历 `i` 是通过 `let` 关键字声明的：通过 `let` 和 `const` 关键字声明的变量是拥有块级作用域（指的是任何在 {} 中的内容）。在每次的遍历过程中，`i` 都有一个新值，并且每个值都在循环内的作用域中。"
  },
  {
    "id": 3,
    "title": "3. 输出是什么？",
    "code": "const shape = {\r\n  radius: 10,\r\n  diameter() {\r\n    return this.radius * 2\r\n  },\r\n  perimeter: () => 2 * Math.PI * this.radius\r\n}\r\n\r\nshape.diameter()\r\nshape.perimeter()\r\n",
    "options": [
      {
        "correct": false,
        "text": "`20` and `62.83185307179586`"
      },
      {
        "correct": true,
        "text": "`20` and `NaN`"
      },
      {
        "correct": false,
        "text": "`20` and `63`"
      },
      {
        "correct": false,
        "text": "`NaN` and `63`"
      }
    ],
    "explanation": "注意 `diameter` 的值是一个常规函数，但是 `perimeter` 的值是一个箭头函数。\r\n\r\n对于箭头函数，`this` 关键字指向的是它当前周围作用域（简单来说是包含箭头函数的常规函数，如果没有常规函数的话就是全局对象），这个行为和常规函数不同。这意味着当我们调用 `perimeter` 时，`this` 不是指向 `shape` 对象，而是它的周围作用域（在例子中是 `window`）。\r\n\r\n在 `window` 中没有 `radius` 这个属性，因此返回 `undefined`。"
  },
  {
    "id": 4,
    "title": "4. 输出是什么？",
    "code": "+true;\r\n!\"Lydia\";\r\n",
    "options": [
      {
        "correct": true,
        "text": "`1` and `false`"
      },
      {
        "correct": false,
        "text": "`false` and `NaN`"
      },
      {
        "correct": false,
        "text": "`false` and `false`"
      }
    ],
    "explanation": "一元操作符加号尝试将 bool 转为 number。`true` 转换为 number 的话为 `1`，`false` 为 `0`。\r\n\r\n字符串 `'Lydia'` 是一个真值，真值取反那么就返回 `false`。"
  },
  {
    "id": 5,
    "title": "5. 哪一个是正确的？",
    "code": "const bird = {\r\n  size: 'small'\r\n}\r\n\r\nconst mouse = {\r\n  name: 'Mickey',\r\n  small: true\r\n}\r\n",
    "options": [
      {
        "correct": true,
        "text": "`mouse.bird.size`是无效的"
      },
      {
        "correct": false,
        "text": "`mouse[bird.size]`是无效的"
      },
      {
        "correct": false,
        "text": "`mouse[bird[\"size\"]]`是无效的"
      },
      {
        "correct": false,
        "text": "以上三个选项都是有效的"
      }
    ],
    "explanation": "在 JavaScript 中，所有对象的 keys 都是字符串（除非对象是 Symbol）。尽管我们可能不会定义它们为字符串，但它们在底层总会被转换为字符串。\r\n\r\n当我们使用括号语法时（[]），JavaScript 会解释（或者 unboxes）语句。它首先看到第一个开始括号 `[` 并继续前进直到找到结束括号 `]`。只有这样，它才会计算语句的值。\r\n\r\n`mouse[bird.size]`：首先计算 `bird.size`，这会得到 `small`。`mouse[\"small\"]` 返回 `true`。\r\n\r\n然后使用点语法的话，上面这一切都不会发生。`mouse` 没有 `bird` 这个 key，这也就意味着 `mouse.bird` 是 `undefined`。然后当我们使用点语法 `mouse.bird.size` 时，因为 `mouse.bird` 是 `undefined`，这也就变成了 `undefined.size`。这个行为是无效的，并且会抛出一个错误类似 `Cannot read property \"size\" of undefined`。"
  },
  {
    "id": 6,
    "title": "6. 输出是什么？",
    "code": "let c = { greeting: 'Hey!' }\r\nlet d\r\n\r\nd = c\r\nc.greeting = 'Hello'\r\nconsole.log(d.greeting)\r\n",
    "options": [
      {
        "correct": true,
        "text": "`Hello`"
      },
      {
        "correct": false,
        "text": "`undefined`"
      },
      {
        "correct": false,
        "text": "`ReferenceError`"
      },
      {
        "correct": false,
        "text": "`TypeError`"
      }
    ],
    "explanation": "在 JavaScript 中，当设置两个对象彼此相等时，它们会通过*引用*进行交互。\r\n\r\n首先，变量 `c` 的值是一个对象。接下来，我们给 `d` 分配了一个和 `c` 对象相同的引用。\r\n\r\n<img src=\"https://i.imgur.com/ko5k0fs.png\" width=\"200\">\r\n\r\n因此当我们改变其中一个对象时，其实是改变了所有的对象。"
  },
  {
    "id": 7,
    "title": "7. 输出是什么？",
    "code": "let a = 3\r\nlet b = new Number(3)\r\nlet c = 3\r\n\r\nconsole.log(a == b)\r\nconsole.log(a === b)\r\nconsole.log(b === c)\r\n",
    "options": [
      {
        "correct": false,
        "text": "`true` `false` `true`"
      },
      {
        "correct": false,
        "text": "`false` `false` `true`"
      },
      {
        "correct": true,
        "text": "`true` `false` `false`"
      },
      {
        "correct": false,
        "text": "`false` `true` `true`"
      }
    ],
    "explanation": "`new Number()` 是一个内建的函数构造器。虽然它看着像是一个 number，但它实际上并不是一个真实的 number：它有一堆额外的功能并且它是一个对象。\r\n\r\n当我们使用 `==` 操作符时，它只会检查两者是否拥有相同的*值*。因为它们的值都是 `3`，因此返回 `true`。\r\n\r\n然后，当我们使用 `===` 操作符时，两者的值以及*类型*都应该是相同的。`new Number()` 是一个对象而不是 number，因此返回 `false`。"
  },
  {
    "id": 8,
    "title": "8. 输出是什么？",
    "code": "class Chameleon {\r\n  static colorChange(newColor) {\r\n    this.newColor = newColor\r\n    return this.newColor\r\n  }\r\n\r\n  constructor({ newColor = 'green' } = {}) {\r\n    this.newColor = newColor\r\n  }\r\n}\r\n\r\nconst freddie = new Chameleon({ newColor: 'purple' })\r\nfreddie.colorChange('orange')\r\n",
    "options": [
      {
        "correct": false,
        "text": "`orange`"
      },
      {
        "correct": false,
        "text": "`purple`"
      },
      {
        "correct": false,
        "text": "`green`"
      },
      {
        "correct": true,
        "text": "`TypeError`"
      }
    ],
    "explanation": "`colorChange` 是一个静态方法。静态方法被设计为只能被创建它们的构造器使用（也就是 `Chameleon`），并且不能传递给实例。因为 `freddie` 是一个实例，静态方法不能被实例使用，因此抛出了 `TypeError` 错误。"
  },
  {
    "id": 9,
    "title": "9. 输出是什么？",
    "code": "let greeting\r\ngreetign = {} // Typo!\r\nconsole.log(greetign)\r\n",
    "options": [
      {
        "correct": true,
        "text": "`{}`"
      },
      {
        "correct": false,
        "text": "`ReferenceError: greetign is not defined`"
      },
      {
        "correct": false,
        "text": "`undefined`"
      }
    ],
    "explanation": "代码打印出了一个对象，这是因为我们在全局对象上创建了一个空对象！当我们将 `greeting` 写错成 `greetign` 时，JS 解释器实际在上浏览器中将它视为 `global.greetign = {}` （或者 `window.greetign = {}`）。\r\n\r\n为了避免这个为题，我们可以使用 `\"use strict\"。这能确保当你声明变量时必须赋值。"
  },
  {
    "id": 10,
    "title": "10. 当我们这么做时，会发生什么？",
    "code": "function bark() {\r\n  console.log('Woof!')\r\n}\r\n\r\nbark.animal = 'dog'\r\n",
    "options": [
      {
        "correct": true,
        "text": "正常运行!"
      },
      {
        "correct": false,
        "text": "`SyntaxError`. 你不能通过这种方式给函数增加属性。"
      },
      {
        "correct": false,
        "text": "`undefined`"
      },
      {
        "correct": false,
        "text": "`ReferenceError`"
      }
    ],
    "explanation": "这在 JavaScript 中是可以的，因为函数是对象！（除了基本类型之外其他都是对象）\r\n\r\n函数是一个特殊的对象。你写的这个代码其实不是一个实际的函数。函数是一个拥有属性的对象，并且属性也可被调用。"
  },
  {
    "id": 11,
    "title": "11. 输出是什么？",
    "code": "function Person(firstName, lastName) {\r\n  this.firstName = firstName;\r\n  this.lastName = lastName;\r\n}\r\n\r\nconst member = new Person(\"Lydia\", \"Hallie\");\r\nPerson.getFullName = function () {\r\n  return `${this.firstName} ${this.lastName}`;\r\n}\r\n\r\nconsole.log(member.getFullName());\r\n",
    "options": [
      {
        "correct": true,
        "text": "`TypeError`"
      },
      {
        "correct": false,
        "text": "`SyntaxError`"
      },
      {
        "correct": false,
        "text": "`Lydia Hallie`"
      },
      {
        "correct": false,
        "text": "`undefined` `undefined`"
      }
    ],
    "explanation": "你不能像常规对象那样，给构造函数添加属性。如果你想一次性给所有实例添加特性，你应该使用原型。因此本例中，使用如下方式：\r\n\r\n```js\r\nPerson.prototype.getFullName = function () {\r\n  return `${this.firstName} ${this.lastName}`;\r\n}\r\n```\r\n\r\n这才会使 `member.getFullName()` 起作用。为什么这么做有益的？假设我们将这个方法添加到构造函数本身里。也许不是每个 `Person` 实例都需要这个方法。这将浪费大量内存空间，因为它们仍然具有该属性，这将占用每个实例的内存空间。相反，如果我们只将它添加到原型中，那么它只存在于内存中的一个位置，但是所有实例都可以访问它！"
  },
  {
    "id": 12,
    "title": "12. 输出是什么？",
    "code": "function Person(firstName, lastName) {\r\n  this.firstName = firstName\r\n  this.lastName = lastName\r\n}\r\n\r\nconst lydia = new Person('Lydia', 'Hallie')\r\nconst sarah = Person('Sarah', 'Smith')\r\n\r\nconsole.log(lydia)\r\nconsole.log(sarah)\r\n",
    "options": [
      {
        "correct": true,
        "text": "`Person {firstName: \"Lydia\", lastName: \"Hallie\"}` and `undefined`"
      },
      {
        "correct": false,
        "text": "`Person {firstName: \"Lydia\", lastName: \"Hallie\"}` and `Person {firstName: \"Sarah\", lastName: \"Smith\"}`"
      },
      {
        "correct": false,
        "text": "`Person {firstName: \"Lydia\", lastName: \"Hallie\"}` and `{}`"
      },
      {
        "correct": false,
        "text": "`Person {firstName: \"Lydia\", lastName: \"Hallie\"}` and `ReferenceError`"
      }
    ],
    "explanation": "对于 `sarah`，我们没有使用 `new` 关键字。当使用 `new` 时，`this` 引用我们创建的空对象。当未使用 `new` 时，`this` 引用的是**全局对象**（global object）。\r\n\r\n我们说 `this.firstName` 等于 `\"Sarah\"`，并且 `this.lastName` 等于 `\"Smith\"`。实际上我们做的是，定义了 `global.firstName = 'Sarah'` 和 `global.lastName = 'Smith'`。而 `sarah` 本身是 `undefined`。"
  },
  {
    "id": 13,
    "title": "13. 事件传播的三个阶段是什么？",
    "code": "\r\n\r\n###### 13.",
    "options": [
      {
        "correct": false,
        "text": "Target > Capturing > Bubbling"
      },
      {
        "correct": false,
        "text": "Bubbling > Target > Capturing"
      },
      {
        "correct": false,
        "text": "Target > Bubbling > Capturing"
      },
      {
        "correct": true,
        "text": "Capturing > Target > Bubbling"
      }
    ],
    "explanation": "在**捕获**（capturing）阶段中，事件从祖先元素向下传播到目标元素。当事件达到**目标**（target）元素后，**冒泡**（bubbling）才开始。\r\n\r\n<img src=\"https://i.imgur.com/N18oRgd.png\" width=\"200\">"
  },
  {
    "id": 14,
    "title": "14. 所有对象都有原型。",
    "code": "\r\n\r\n###### 14.",
    "options": [
      {
        "correct": false,
        "text": "对"
      },
      {
        "correct": true,
        "text": "错"
      }
    ],
    "explanation": "除了**基本对象**（base object），所有对象都有原型。基本对象可以访问一些方法和属性，比如 `.toString`。这就是为什么你可以使用内置的 JavaScript 方法！所有这些方法在原型上都是可用的。虽然 JavaScript 不能直接在对象上找到这些方法，但 JavaScript 会沿着原型链找到它们，以便于你使用。"
  },
  {
    "id": 15,
    "title": "15. 输出是什么？",
    "code": "function sum(a, b) {\r\n  return a + b\r\n}\r\n\r\nsum(1, '2')\r\n",
    "options": [
      {
        "correct": false,
        "text": "`NaN`"
      },
      {
        "correct": false,
        "text": "`TypeError`"
      },
      {
        "correct": true,
        "text": "`\"12\"`"
      },
      {
        "correct": false,
        "text": "`3`"
      }
    ],
    "explanation": "JavaScript 是一种**动态类型语言**：我们不指定某些变量的类型。值可以在你不知道的情况下自动转换成另一种类型，这种类型称为**隐式类型转换**（implicit type coercion）。**Coercion** 是指将一种类型转换为另一种类型。\r\n\r\n在本例中，JavaScript 将数字 `1` 转换为字符串，以便函数有意义并返回一个值。在数字类型（`1`）和字符串类型（`'2'`）相加时，该数字被视为字符串。我们可以连接字符串，比如 `\"Hello\" + \"World\"`，这里发生的是 `\"1\" + \"2\"`，它返回 `\"12\"`。"
  },
  {
    "id": 16,
    "title": "16. 输出是什么？",
    "code": "let number = 0\r\nconsole.log(number++)\r\nconsole.log(++number)\r\nconsole.log(number)\r\n",
    "options": [
      {
        "correct": false,
        "text": "`1` `1` `2`"
      },
      {
        "correct": false,
        "text": "`1` `2` `2`"
      },
      {
        "correct": true,
        "text": "`0` `2` `2`"
      },
      {
        "correct": false,
        "text": "`0` `1` `2`"
      }
    ],
    "explanation": "一元**后自增**运算符 `++`：\r\n\r\n1. 返回值（返回 `0`）\r\n2. 值自增（number 现在是 `1`）\r\n\r\n一元**前自增**运算符 `++`：\r\n\r\n1. 值自增（number 现在是 `2`）\r\n2. 返回值（返回 `2`）\r\n\r\n结果是 `0 2 2`."
  },
  {
    "id": 17,
    "title": "17. 输出是什么？",
    "code": "function getPersonInfo(one, two, three) {\r\n  console.log(one)\r\n  console.log(two)\r\n  console.log(three)\r\n}\r\n\r\nconst person = 'Lydia'\r\nconst age = 21\r\n\r\ngetPersonInfo`${person} is ${age} years old`\r\n",
    "options": [
      {
        "correct": false,
        "text": "`\"Lydia\"` `21` `[\"\", \" is \", \" years old\"]`"
      },
      {
        "correct": true,
        "text": "`[\"\", \" is \", \" years old\"]` `\"Lydia\"` `21`"
      },
      {
        "correct": false,
        "text": "`\"Lydia\"` `[\"\", \" is \", \" years old\"]` `21`"
      }
    ],
    "explanation": "如果使用标记模板字面量，第一个参数的值总是包含字符串的数组。其余的参数获取的是传递的表达式的值！"
  },
  {
    "id": 18,
    "title": "18. 输出是什么？",
    "code": "function checkAge(data) {\r\n  if (data === { age: 18 }) {\r\n    console.log('You are an adult!')\r\n  } else if (data == { age: 18 }) {\r\n    console.log('You are still an adult.')\r\n  } else {\r\n    console.log(`Hmm.. You don't have an age I guess`)\r\n  }\r\n}\r\n\r\ncheckAge({ age: 18 })\r\n",
    "options": [
      {
        "correct": false,
        "text": "`You are an adult!`"
      },
      {
        "correct": false,
        "text": "`You are still an adult.`"
      },
      {
        "correct": true,
        "text": "`Hmm.. You don't have an age I guess`"
      }
    ],
    "explanation": "在测试相等性时，基本类型通过它们的值（value）进行比较，而对象通过它们的引用（reference）进行比较。JavaScript 检查对象是否具有对内存中相同位置的引用。\r\n\r\n题目中我们正在比较的两个对象不是同一个引用：作为参数传递的对象引用的内存位置，与用于判断相等的对象所引用的内存位置并不同。\r\n\r\n这也是 `{ age: 18 } === { age: 18 }` 和 `{ age: 18 } == { age: 18 }` 都返回 `false` 的原因。"
  },
  {
    "id": 19,
    "title": "19. 输出是什么？",
    "code": "function getAge(...args) {\r\n  console.log(typeof args)\r\n}\r\n\r\ngetAge(21)\r\n",
    "options": [
      {
        "correct": false,
        "text": "`\"number\"`"
      },
      {
        "correct": false,
        "text": "`\"array\"`"
      },
      {
        "correct": true,
        "text": "`\"object\"`"
      },
      {
        "correct": false,
        "text": "`\"NaN\"`"
      }
    ],
    "explanation": "扩展运算符（`...args`）会返回实参组成的数组。而数组是对象，因此 `typeof args` 返回 `\"object\"`。"
  },
  {
    "id": 20,
    "title": "20. 输出是什么？",
    "code": "function getAge() {\r\n  'use strict'\r\n  age = 21\r\n  console.log(age)\r\n}\r\n\r\ngetAge()\r\n",
    "options": [
      {
        "correct": false,
        "text": "`21`"
      },
      {
        "correct": false,
        "text": "`undefined`"
      },
      {
        "correct": true,
        "text": "`ReferenceError`"
      },
      {
        "correct": false,
        "text": "`TypeError`"
      }
    ],
    "explanation": "使用 `\"use strict\"`，你可以确保不会意外地声明全局变量。我们从来没有声明变量 `age`，因为我们使用 `\"use strict\"`，它将抛出一个引用错误。如果我们不使用 `\"use strict\"`，它就会工作，因为属性 `age` 会被添加到全局对象中了。"
  },
  {
    "id": 21,
    "title": "21. 输出是什么？",
    "code": "const sum = eval('10*10+5')\r\n",
    "options": [
      {
        "correct": true,
        "text": "`105`"
      },
      {
        "correct": false,
        "text": "`\"105\"`"
      },
      {
        "correct": false,
        "text": "`TypeError`"
      },
      {
        "correct": false,
        "text": "`\"10*10+5\"`"
      }
    ],
    "explanation": "代码以字符串形式传递进来，`eval` 对其求值。如果它是一个表达式，就像本例中那样，它对表达式求值。表达式是 `10 * 10 + 5`。这将返回数字 `105`。"
  },
  {
    "id": 22,
    "title": "22. cool_secret 可访问多长时间？",
    "code": "sessionStorage.setItem('cool_secret', 123)\r\n",
    "options": [
      {
        "correct": false,
        "text": "永远，数据不会丢失。"
      },
      {
        "correct": true,
        "text": "当用户关掉标签页时。"
      },
      {
        "correct": false,
        "text": "当用户关掉整个浏览器，而不只是关掉标签页。"
      },
      {
        "correct": false,
        "text": "当用户关闭电脑时。"
      }
    ],
    "explanation": "关闭 **tab 标签页** 后，`sessionStorage` 存储的数据才会删除。\r\n\r\n如果使用 `localStorage`，那么数据将永远在那里，除非调用了 `localStorage.clear()`。"
  },
  {
    "id": 23,
    "title": "23. 输出是什么？",
    "code": "var num = 8\r\nvar num = 10\r\n\r\nconsole.log(num)\r\n",
    "options": [
      {
        "correct": false,
        "text": "`8`"
      },
      {
        "correct": true,
        "text": "`10`"
      },
      {
        "correct": false,
        "text": "`SyntaxError`"
      },
      {
        "correct": false,
        "text": "`ReferenceError`"
      }
    ],
    "explanation": "使用 `var` 关键字，你可以用相同的名称声明多个变量。然后变量将保存最新的值。\r\n\r\n你不能使用 `let` 或 `const` 来实现这一点，因为它们是块作用域的。"
  },
  {
    "id": 24,
    "title": "24. 输出是什么？",
    "code": "const obj = { 1: 'a', 2: 'b', 3: 'c' }\r\nconst set = new Set([1, 2, 3, 4, 5])\r\n\r\nobj.hasOwnProperty('1')\r\nobj.hasOwnProperty(1)\r\nset.has('1')\r\nset.has(1)\r\n",
    "options": [
      {
        "correct": false,
        "text": "`false` `true` `false` `true`"
      },
      {
        "correct": false,
        "text": "`false` `true` `true` `true`"
      },
      {
        "correct": true,
        "text": "`true` `true` `false` `true`"
      },
      {
        "correct": false,
        "text": "`true` `true` `true` `true`"
      }
    ],
    "explanation": "所有对象的键（不包括 Symbol）在底层都是字符串，即使你自己没有将其作为字符串输入。这就是为什么 `obj.hasOwnProperty('1')` 也返回 `true`。\r\n\r\n对于集合，它不是这样工作的。在我们的集合中没有 `'1'`：`set.has('1')` 返回 `false`。它有数字类型为 `1`，`set.has(1)` 返回 `true`。"
  },
  {
    "id": 25,
    "title": "25. 输出是什么？",
    "code": "const obj = { a: 'one', b: 'two', a: 'three' }\r\nconsole.log(obj)\r\n",
    "options": [
      {
        "correct": false,
        "text": "`{ a: \"one\", b: \"two\" }`"
      },
      {
        "correct": false,
        "text": "`{ b: \"two\", a: \"three\" }`"
      },
      {
        "correct": true,
        "text": "`{ a: \"three\", b: \"two\" }`"
      },
      {
        "correct": false,
        "text": "`SyntaxError`"
      }
    ],
    "explanation": "如果你有两个名称相同的键，则键会被替换掉。它仍然位于第一个键出现的位置，但是值是最后出现那个键的值。"
  },
  {
    "id": 26,
    "title": "26. JavaScript 全局执行上下文为你做了两件事：全局对象和 this 关键字。",
    "code": "\r\n\r\n###### 26.",
    "options": [
      {
        "correct": true,
        "text": "对"
      },
      {
        "correct": false,
        "text": "错"
      },
      {
        "correct": false,
        "text": "看情况"
      }
    ],
    "explanation": "基本执行上下文是全局执行上下文：它是代码中随处可访问的内容。"
  },
  {
    "id": 27,
    "title": "27. 输出是什么？",
    "code": "for (let i = 1; i < 5; i++) {\r\n  if (i === 3) continue\r\n  console.log(i)\r\n}\r\n",
    "options": [
      {
        "correct": false,
        "text": "`1` `2`"
      },
      {
        "correct": false,
        "text": "`1` `2` `3`"
      },
      {
        "correct": true,
        "text": "`1` `2` `4`"
      },
      {
        "correct": false,
        "text": "`1` `3` `4`"
      }
    ],
    "explanation": "如果某个条件返回 `true`，则 `continue` 语句跳过本次迭代。"
  },
  {
    "id": 28,
    "title": "28. 输出是什么？",
    "code": "String.prototype.giveLydiaPizza = () => {\r\n  return 'Just give Lydia pizza already!'\r\n}\r\n\r\nconst name = 'Lydia'\r\n\r\nname.giveLydiaPizza()\r\n",
    "options": [
      {
        "correct": true,
        "text": "`\"Just give Lydia pizza already!\"`"
      },
      {
        "correct": false,
        "text": "`TypeError: not a function`"
      },
      {
        "correct": false,
        "text": "`SyntaxError`"
      },
      {
        "correct": false,
        "text": "`undefined`"
      }
    ],
    "explanation": "`String` 是内置的构造函数，我们可以向它添加属性。我只是在它的原型中添加了一个方法。基本类型字符串被自动转换为字符串对象，由字符串原型函数生成。因此，所有 string(string 对象)都可以访问该方法！"
  },
  {
    "id": 29,
    "title": "29. 输出是什么？",
    "code": "const a = {}\r\nconst b = { key: 'b' }\r\nconst c = { key: 'c' }\r\n\r\na[b] = 123\r\na[c] = 456\r\n\r\nconsole.log(a[b])\r\n",
    "options": [
      {
        "correct": false,
        "text": "`123`"
      },
      {
        "correct": true,
        "text": "`456`"
      },
      {
        "correct": false,
        "text": "`undefined`"
      },
      {
        "correct": false,
        "text": "`ReferenceError`"
      }
    ],
    "explanation": "对象的键被自动转换为字符串。我们试图将一个对象 `b` 设置为对象 `a` 的键，且相应的值为 `123`。\r\n\r\n然而，当字符串化一个对象时，它会变成 `\"[object Object]\"`。因此这里说的是，`a[\"[object Object]\"] = 123`。然后，我们再一次做了同样的事情，`c` 是另外一个对象，这里也有隐式字符串化，于是，`a[\"[object Object]\"] = 456`。\r\n\r\n然后，我们打印 `a[b]`，也就是 `a[\"[object Object]\"]`。之前刚设置为 `456`，因此返回的是 `456`。"
  },
  {
    "id": 30,
    "title": "30. 输出是什么？",
    "code": "const foo = () => console.log('First')\r\nconst bar = () => setTimeout(() => console.log('Second'))\r\nconst baz = () => console.log('Third')\r\n\r\nbar()\r\nfoo()\r\nbaz()\r\n",
    "options": [
      {
        "correct": false,
        "text": "`First` `Second` `Third`"
      },
      {
        "correct": true,
        "text": "`First` `Third` `Second`"
      },
      {
        "correct": false,
        "text": "`Second` `First` `Third`"
      },
      {
        "correct": false,
        "text": "`Second` `Third` `First`"
      }
    ],
    "explanation": "我们有一个 `setTimeout` 函数，并首先调用它。然而，它是最后打印日志的。\r\n\r\n这是因为在浏览器中，我们不仅有运行时引擎，还有一个叫做 `WebAPI` 的东西。`WebAPI` 提供了 `setTimeout` 函数，也包含其他的，例如 DOM。\r\n\r\n将 _callback_ 推送到 WebAPI 后，`setTimeout` 函数本身(但不是回调！)将从栈中弹出。\r\n\r\n<img src=\"https://i.imgur.com/X5wsHOg.png\" width=\"200\">\r\n\r\n现在，`foo` 被调用，打印 `\"First\"`。\r\n\r\n<img src=\"https://i.imgur.com/Pvc0dGq.png\" width=\"200\">\r\n\r\n`foo` 从栈中弹出，`baz` 被调用. 打印 `\"Third\"`。\r\n\r\n<img src=\"https://i.imgur.com/WhA2bCP.png\" width=\"200\">\r\n\r\nWebAPI 不能随时向栈内添加内容。相反，它将回调函数推到名为 _queue_ 的地方。\r\n\r\n<img src=\"https://i.imgur.com/NSnDZmU.png\" width=\"200\">\r\n\r\n这就是事件循环开始工作的地方。一个**事件循环**查看栈和任务队列。如果栈是空的，它接受队列上的第一个元素并将其推入栈。\r\n\r\n<img src=\"https://i.imgur.com/uyiScAI.png\" width=\"200\">\r\n\r\n`bar` 被调用，打印 `\"Second\"`，然后它被栈弹出。"
  },
  {
    "id": 31,
    "title": "31. 当点击按钮时，event.target是什么？",
    "code": "nclick=\"console.log('first div')\">\r\n  <div onclick=\"console.log('second div')\">\r\n    <button onclick=\"console.log('button')\">\r\n      Click!\r\n    </button>\r\n  </div>\r\n</div>\r\n",
    "options": [
      {
        "correct": false,
        "text": "Outer `div`"
      },
      {
        "correct": false,
        "text": "Inner `div`"
      },
      {
        "correct": true,
        "text": "`button`"
      },
      {
        "correct": false,
        "text": "一个包含所有嵌套元素的数组。"
      }
    ],
    "explanation": "导致事件的最深嵌套的元素是事件的 target。你可以通过 `event.stopPropagation` 来停止冒泡。"
  },
  {
    "id": 32,
    "title": "32. 当您单击该段落时，日志输出是什么？",
    "code": "nclick=\"console.log('div')\">\r\n  <p onclick=\"console.log('p')\">\r\n    Click here!\r\n  </p>\r\n</div>\r\n",
    "options": [
      {
        "correct": true,
        "text": "`p` `div`"
      },
      {
        "correct": false,
        "text": "`div` `p`"
      },
      {
        "correct": false,
        "text": "`p`"
      },
      {
        "correct": false,
        "text": "`div`"
      }
    ],
    "explanation": "如果我们点击 `p`，我们会看到两个日志：`p` 和 `div`。在事件传播期间，有三个阶段：捕获、目标和冒泡。默认情况下，事件处理程序在冒泡阶段执行（除非将 `useCapture` 设置为 `true`）。它从嵌套最深的元素向外传播。"
  },
  {
    "id": 33,
    "title": "33. 输出是什么？",
    "code": "const person = { name: 'Lydia' }\r\n\r\nfunction sayHi(age) {\r\n  console.log(`${this.name} is ${age}`)\r\n}\r\n\r\nsayHi.call(person, 21)\r\nsayHi.bind(person, 21)\r\n",
    "options": [
      {
        "correct": false,
        "text": "`undefined is 21` `Lydia is 21`"
      },
      {
        "correct": false,
        "text": "`function` `function`"
      },
      {
        "correct": false,
        "text": "`Lydia is 21` `Lydia is 21`"
      },
      {
        "correct": true,
        "text": "`Lydia is 21` `function`"
      }
    ],
    "explanation": "使用这两种方法，我们都可以传递我们希望 `this` 关键字引用的对象。但是，`.call` 是**立即执行**的。\r\n\r\n`.bind` 返回函数的**副本**，但带有绑定上下文！它不是立即执行的。"
  },
  {
    "id": 34,
    "title": "34. 输出是什么？",
    "code": "function sayHi() {\r\n  return (() => 0)()\r\n}\r\n\r\ntypeof sayHi()\r\n",
    "options": [
      {
        "correct": false,
        "text": "`\"object\"`"
      },
      {
        "correct": true,
        "text": "`\"number\"`"
      },
      {
        "correct": false,
        "text": "`\"function\"`"
      },
      {
        "correct": false,
        "text": "`\"undefined\"`"
      }
    ],
    "explanation": "`sayHi` 方法返回的是立即执行函数(IIFE)的返回值.此立即执行函数的返回值是 `0`， 类型是 `number`\r\n\r\n参考：只有7种内置类型：`null`，`undefined`，`boolean`，`number`，`string`，`object` 和 `symbol`。 ``function`` 不是一种类型，函数是对象，它的类型是``object``。"
  },
  {
    "id": 35,
    "title": "35. 下面哪些值是 falsy?",
    "code": "0\r\nnew Number(0)\r\n('')\r\n(' ')\r\nnew Boolean(false)\r\nundefined\r\n",
    "options": [
      {
        "correct": true,
        "text": "`0`, `''`, `undefined`"
      },
      {
        "correct": false,
        "text": "`0`, `new Number(0)`, `''`, `new Boolean(false)`, `undefined`"
      },
      {
        "correct": false,
        "text": "`0`, `''`, `new Boolean(false)`, `undefined`"
      },
      {
        "correct": false,
        "text": "All of them are falsy"
      }
    ],
    "explanation": "只有 6 种 [falsy](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy) 值:\r\n\r\n\r\n\r\n- `undefined`\r\n- `null`\r\n- `NaN`\r\n- `0`\r\n- `''` (empty string)\r\n- `false`\r\n\r\n`Function` 构造函数, 比如 `new Number` 和 `new Boolean`，是 [truthy](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)。"
  },
  {
    "id": 36,
    "title": "36. 输出是什么？",
    "code": "console.log(typeof typeof 1)\r\n",
    "options": [
      {
        "correct": false,
        "text": "`\"number\"`"
      },
      {
        "correct": true,
        "text": "`\"string\"`"
      },
      {
        "correct": false,
        "text": "`\"object\"`"
      },
      {
        "correct": false,
        "text": "`\"undefined\"`"
      }
    ],
    "explanation": "`typeof 1` 返回 `\"number\"`。\r\n`typeof \"number\"` 返回 `\"string\"`。"
  },
  {
    "id": 37,
    "title": "37. 输出是什么？",
    "code": "const numbers = [1, 2, 3]\r\nnumbers[10] = 11\r\nconsole.log(numbers)\r\n",
    "options": [
      {
        "correct": false,
        "text": "`[1, 2, 3, 7 x null, 11]`"
      },
      {
        "correct": false,
        "text": "`[1, 2, 3, 11]`"
      },
      {
        "correct": true,
        "text": "`[1, 2, 3, 7 x empty, 11]`"
      },
      {
        "correct": false,
        "text": "`SyntaxError`"
      }
    ],
    "explanation": "当你为数组设置超过数组长度的值的时候， JavaScript 会创建名为 \"empty slots\" 的东西。它们的值实际上是 `undefined`。你会看到以下场景：\r\n\r\n`[1, 2, 3, 7 x empty, 11]`\r\n\r\n这取决于你的运行环境（每个浏览器，以及 node 环境，都有可能不同）"
  },
  {
    "id": 38,
    "title": "38. 输出是什么？",
    "code": "(() => {\r\n  let x, y\r\n  try {\r\n    throw new Error()\r\n  } catch (x) {\r\n    (x = 1), (y = 2)\r\n    console.log(x)\r\n  }\r\n  console.log(x)\r\n  console.log(y)\r\n})()\r\n",
    "options": [
      {
        "correct": true,
        "text": "`1` `undefined` `2`"
      },
      {
        "correct": false,
        "text": "`undefined` `undefined` `undefined`"
      },
      {
        "correct": false,
        "text": "`1` `1` `2`"
      },
      {
        "correct": false,
        "text": "`1` `undefined` `undefined`"
      }
    ],
    "explanation": "`catch` 代码块接收参数 `x`。当我们传递参数时，这与之前定义的变量 `x` 不同 。这个 `x` 是属于 `catch` 块级作用域的。\r\n\r\n然后，我们将块级作用域中的变量赋值为 `1`，同时也设置了变量 `y` 的值。现在，我们打印块级作用域中的变量 `x`，值为 `1`。\r\n\r\n`catch` 块之外的变量 `x` 的值仍为 `undefined`， `y` 的值为 `2`。当我们在 `catch` 块之外执行 `console.log(x)` 时，返回 `undefined`，`y` 返回 `2`。"
  },
  {
    "id": 39,
    "title": "39. JavaScript 中的一切都是？",
    "code": "\r\n\r\n###### 39.",
    "options": [
      {
        "correct": true,
        "text": "基本类型与对象"
      },
      {
        "correct": false,
        "text": "函数与对象"
      },
      {
        "correct": false,
        "text": "只有对象"
      },
      {
        "correct": false,
        "text": "数字与对象"
      }
    ],
    "explanation": "JavaScript 只有基本类型和对象。\r\n\r\n基本类型包括 `boolean`, `null`, `undefined`, `bigint`, `number`, `string`, `symbol`。"
  },
  {
    "id": 40,
    "title": "40. 输出是什么？",
    "code": "[[0, 1], [2, 3]].reduce(\r\n  (acc, cur) => {\r\n    return acc.concat(cur)\r\n  },\r\n  [1, 2]\r\n)\r\n",
    "options": [
      {
        "correct": false,
        "text": "`[0, 1, 2, 3, 1, 2]`"
      },
      {
        "correct": false,
        "text": "`[6, 1, 2]`"
      },
      {
        "correct": true,
        "text": "`[1, 2, 0, 1, 2, 3]`"
      },
      {
        "correct": false,
        "text": "`[1, 2, 6]`"
      }
    ],
    "explanation": "`[1, 2]`是初始值。初始值将会作为首次调用时第一个参数 `acc` 的值。在第一次执行时， `acc` 的值是 `[1, 2]`， `cur` 的值是 `[0, 1]`。合并它们，结果为 `[1, 2, 0, 1]`。\r\n第二次执行， `acc` 的值是 `[1, 2, 0, 1]`， `cur` 的值是 `[2, 3]`。合并它们，最终结果为 `[1, 2, 0, 1, 2, 3]`"
  },
  {
    "id": 41,
    "title": "41. 输出是什么？",
    "code": "!!null\r\n!!''\r\n!!1\r\n",
    "options": [
      {
        "correct": false,
        "text": "`false` `true` `false`"
      },
      {
        "correct": true,
        "text": "`false` `false` `true`"
      },
      {
        "correct": false,
        "text": "`false` `true` `true`"
      },
      {
        "correct": false,
        "text": "`true` `true` `false`"
      }
    ],
    "explanation": "`null` 是 [falsy](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)。 `!null` 的值是 `true`。 `!true` 的值是 `false`。\r\n\r\n`\"\"` 是 [falsy](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)。 `!\"\"` 的值是 `true`。  `!true` 的值是 `false`。\r\n\r\n`1` 是 [truthy](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)。 `!1` 的值是 `false`。 `!false` 的值是 `true`。"
  },
  {
    "id": 42,
    "title": "42. `setInterval` 方法的返回值是什么？",
    "code": "setInterval(() => console.log('Hi'), 1000)\r\n",
    "options": [
      {
        "correct": true,
        "text": "一个唯一的id"
      },
      {
        "correct": false,
        "text": "该方法指定的毫秒数"
      },
      {
        "correct": false,
        "text": "传递的函数"
      },
      {
        "correct": false,
        "text": "`undefined`"
      }
    ],
    "explanation": "`setInterval` 返回一个唯一的 id。此 id 可被用于 `clearInterval` 函数来取消定时。"
  },
  {
    "id": 43,
    "title": "43. 输出是什么？",
    "code": "[...'Lydia']\r\n",
    "options": [
      {
        "correct": true,
        "text": "`[\"L\", \"y\", \"d\", \"i\", \"a\"]`"
      },
      {
        "correct": false,
        "text": "`[\"Lydia\"]`"
      },
      {
        "correct": false,
        "text": "`[[], \"Lydia\"]`"
      },
      {
        "correct": false,
        "text": "`[[\"L\", \"y\", \"d\", \"i\", \"a\"]]`"
      }
    ],
    "explanation": "string 类型是可迭代的。扩展运算符将迭代的每个字符映射成一个元素。"
  },
  {
    "id": 44,
    "title": "44. 输出是什么?",
    "code": "function* generator(i) {\r\n  yield i;\r\n  yield i * 2;\r\n}\r\n\r\nconst gen = generator(10);\r\n\r\nconsole.log(gen.next().value);\r\nconsole.log(gen.next().value);\r\n",
    "options": [
      {
        "correct": false,
        "text": "`[0, 10], [10, 20]`"
      },
      {
        "correct": false,
        "text": "`20, 20`"
      },
      {
        "correct": true,
        "text": "`10, 20`"
      },
      {
        "correct": false,
        "text": "`0, 10 and 10, 20`"
      }
    ],
    "explanation": "一般的函数在执行之后是不能中途停下的。但是，生成器函数却可以中途“停下”，之后可以再从停下的地方继续。当生成器遇到`yield`关键字的时候，会生成`yield`后面的值。注意，生成器在这种情况下不 _返回_ (_return_ )值，而是 _生成_ (_yield_)值。\r\n\r\n首先，我们用`10`作为参数`i`来初始化生成器函数。然后使用`next()`方法一步步执行生成器。第一次执行生成器的时候，`i`的值为`10`，遇到第一个`yield`关键字，它要生成`i`的值。此时，生成器“暂停”，生成了`10`。\r\n\r\n然后，我们再执行`next()`方法。生成器会从刚才暂停的地方继续，这个时候`i`还是`10`。于是我们走到了第二个`yield`关键字处，这时候需要生成的值是`i*2`，`i`为`10`，那么此时生成的值便是`20`。所以这道题的最终结果是`10,20`。"
  },
  {
    "id": 45,
    "title": "45. 返回值是什么?",
    "code": "const firstPromise = new Promise((res, rej) => {\r\n  setTimeout(res, 500, \"one\");\r\n});\r\n\r\nconst secondPromise = new Promise((res, rej) => {\r\n  setTimeout(res, 100, \"two\");\r\n});\r\n\r\nPromise.race([firstPromise, secondPromise]).then(res => console.log(res));\r\n",
    "options": [
      {
        "correct": false,
        "text": "`\"one\"`"
      },
      {
        "correct": true,
        "text": "`\"two\"`"
      },
      {
        "correct": false,
        "text": "`\"two\" \"one\"`"
      },
      {
        "correct": false,
        "text": "`\"one\" \"two\"`"
      }
    ],
    "explanation": "当我们向`Promise.race`方法中传入多个`Promise`时，会进行 _优先_ 解析。在这个例子中，我们用`setTimeout`给`firstPromise`和`secondPromise`分别设定了500ms和100ms的定时器。这意味着`secondPromise`会首先解析出字符串`two`。那么此时`res`参数即为`two`，是为输出结果。"
  },
  {
    "id": 46,
    "title": "46. 输出是什么?",
    "code": "let person = { name: \"Lydia\" };\r\nconst members = [person];\r\nperson = null;\r\n\r\nconsole.log(members);\r\n",
    "options": [
      {
        "correct": false,
        "text": "`null`"
      },
      {
        "correct": false,
        "text": "`[null]`"
      },
      {
        "correct": false,
        "text": "`[{}]`"
      },
      {
        "correct": true,
        "text": "`[{ name: \"Lydia\" }]`"
      }
    ],
    "explanation": "首先我们声明了一个拥有`name`属性的对象 `person`。\r\n\r\n<img src=\"https://i.imgur.com/TML1MbS.png\" width=\"200\">\r\n\r\n然后我们又声明了一个变量`members`. 将首个元素赋值为变量`person`。 当设置两个对象彼此相等时，它们会通过 _引用_ 进行交互。但是当你将引用从一个变量分配至另一个变量时，其实只是执行了一个 _复制_ 操作。（注意一点，他们的引用 _并不相同_!）\r\n\r\n<img src=\"https://i.imgur.com/FSG5K3F.png\" width=\"300\">\r\n\r\n接下来我们让`person`等于`null`。\r\n\r\n<img src=\"https://i.imgur.com/sYjcsMT.png\" width=\"300\">\r\n\r\n我们没有修改数组第一个元素的值，而只是修改了变量`person`的值,因为元素（复制而来）的引用与`person`不同。`members`的第一个元素仍然保持着对原始对象的引用。当我们输出`members`数组时，第一个元素会将引用的对象打印出来。"
  },
  {
    "id": 47,
    "title": "47. 输出是什么?",
    "code": "const person = {\r\n  name: \"Lydia\",\r\n  age: 21\r\n};\r\n\r\nfor (const item in person) {\r\n  console.log(item);\r\n}\r\n",
    "options": [
      {
        "correct": false,
        "text": "`{ name: \"Lydia\" }, { age: 21 }`"
      },
      {
        "correct": true,
        "text": "`\"name\", \"age\"`"
      },
      {
        "correct": false,
        "text": "`\"Lydia\", 21`"
      },
      {
        "correct": false,
        "text": "`[\"name\", \"Lydia\"], [\"age\", 21]`"
      }
    ],
    "explanation": "在`for-in`循环中,我们可以通过对象的key来进行迭代,也就是这里的`name`和`age`。在底层，对象的key都是字符串（如果他们不是Symbol的话）。在每次循环中，我们将`item`设定为当前遍历到的key.所以一开始，`item`是`name`，之后 `item`输出的则是`age`。"
  },
  {
    "id": 48,
    "title": "48. 输出是什么?",
    "code": "console.log(3 + 4 + \"5\");\r\n",
    "options": [
      {
        "correct": false,
        "text": "`\"345\"`"
      },
      {
        "correct": true,
        "text": "`\"75\"`"
      },
      {
        "correct": false,
        "text": "`12`"
      },
      {
        "correct": false,
        "text": "`\"12\"`"
      }
    ],
    "explanation": "当所有运算符的 _优先级_ 相同时，计算表达式需要确定运算符的结合顺序，即从右到左还是从左往右。在这个例子中，我们只有一类运算符`+`，对于加法来说，结合顺序就是从左到右。\r\n\r\n`3 + 4`首先计算，得到数字`7`.\r\n\r\n由于类型的强制转换，`7 + '5'`的结果是`\"75\"`. JavaScript将`7`转换成了字符串，可以参考问题15.我们可以用`+`号把两个字符串连接起来。 `\"7\" + \"5\"` 就得到了`\"75\"`."
  },
  {
    "id": 49,
    "title": "49. `num`的值是什么?",
    "code": "const num = parseInt(\"7*6\", 10);\r\n",
    "options": [
      {
        "correct": false,
        "text": "`42`"
      },
      {
        "correct": false,
        "text": "`\"42\"`"
      },
      {
        "correct": true,
        "text": "`7`"
      },
      {
        "correct": false,
        "text": "`NaN`"
      }
    ],
    "explanation": "只返回了字符串中第一个字母. 设定了 _进制_ 后 (也就是第二个参数，指定需要解析的数字是什么进制: 十进制、十六机制、八进制、二进制等等……),`parseInt` 检查字符串中的字符是否合法. 一旦遇到一个在指定进制中不合法的字符后，立即停止解析并且忽略后面所有的字符。\r\n\r\n`*`就是不合法的数字字符。所以只解析到`\"7\"`，并将其解析为十进制的`7`. `num`的值即为`7`."
  },
  {
    "id": 50,
    "title": "50. 输出是什么?",
    "code": "[1, 2, 3].map(num => {\r\n  if (typeof num === \"number\") return;\r\n  return num * 2;\r\n});\r\n",
    "options": [
      {
        "correct": false,
        "text": "`[]`"
      },
      {
        "correct": false,
        "text": "`[null, null, null]`"
      },
      {
        "correct": true,
        "text": "`[undefined, undefined, undefined]`"
      },
      {
        "correct": false,
        "text": "`[ 3 x empty ]`"
      }
    ],
    "explanation": "对数组进行映射的时候,`num`就是当前循环到的元素. 在这个例子中，所有的映射都是number类型，所以if中的判断`typeof num === \"number\"`结果都是`true`.map函数创建了新数组并且将函数的返回值插入数组。\r\n\r\n但是，没有任何值返回。当函数没有返回任何值时，即默认返回`undefined`.对数组中的每一个元素来说，函数块都得到了这个返回值，所以结果中每一个元素都是`undefined`."
  },
  {
    "id": 51,
    "title": "51. 输出的是什么?",
    "code": "function getInfo(member, year) {\r\n  member.name = \"Lydia\";\r\n  year = \"1998\";\r\n}\r\n\r\nconst person = { name: \"Sarah\" };\r\nconst birthYear = \"1997\";\r\n\r\ngetInfo(person, birthYear);\r\n\r\nconsole.log(person, birthYear);\r\n",
    "options": [
      {
        "correct": true,
        "text": "`{ name: \"Lydia\" }, \"1997\"`"
      },
      {
        "correct": false,
        "text": "`{ name: \"Sarah\" }, \"1998\"`"
      },
      {
        "correct": false,
        "text": "`{ name: \"Lydia\" }, \"1998\"`"
      },
      {
        "correct": false,
        "text": "`{ name: \"Sarah\" }, \"1997\"`"
      }
    ],
    "explanation": "普通参数都是 _值_ 传递的，而对象则不同，是 _引用_ 传递。所以说，`birthYear`是值传递，因为他是个字符串而不是对象。当我们对参数进行值传递时，会创建一份该值的 _复制_ 。（可以参考问题46）\r\n\r\n变量`birthYear`有一个对`\"1997\"`的引用，而传入的参数也有一个对`\"1997\"`的引用，但二者的引用并不相同。当我们通过给 `year`赋值`\"1998\"`来更新`year`的值的时候我们只是更新了`year`（的引用）。此时`birthYear`仍然是`\"1997\"`.\r\n\r\n而`person`是个对象。参数`member`引用与之 _相同的_ 对象。当我们修改`member`所引用对象的属性时,`person`的相应属性也被修改了,因为他们引用了相同的对象. `person`的 `name`属性也变成了 `\"Lydia\"`."
  },
  {
    "id": 52,
    "title": "52. 输出是什么?",
    "code": "function greeting() {\r\n  throw \"Hello world!\";\r\n}\r\n\r\nfunction sayHi() {\r\n  try {\r\n    const data = greeting();\r\n    console.log(\"It worked!\", data);\r\n  } catch (e) {\r\n    console.log(\"Oh no an error:\", e);\r\n  }\r\n}\r\n\r\nsayHi();\r\n",
    "options": [
      {
        "correct": false,
        "text": "`\"It worked! Hello world!\"`"
      },
      {
        "correct": false,
        "text": "`\"Oh no an error: undefined`"
      },
      {
        "correct": false,
        "text": "`SyntaxError: can only throw Error objects`"
      },
      {
        "correct": true,
        "text": "`\"Oh no an error: Hello world!`"
      }
    ],
    "explanation": "通过`throw`语句，我么可以创建自定义错误。 而通过它，我们可以抛出异常。异常可以是一个<b>字符串</b>, 一个 <b>数字</b>, 一个 <b>布尔类型</b> 或者是一个 <b>对象</b>。在本例中，我们的异常是字符串`'Hello world'`.\r\n\r\n通过 `catch`语句，我们可以设定当`try`语句块中抛出异常后应该做什么处理。在本例中抛出的异常是字符串`'Hello world'`. `e`就是这个字符串，因此被输出。最终结果就是`'Oh an error: Hello world'`."
  },
  {
    "id": 53,
    "title": "53. 输出是什么?",
    "code": "function Car() {\r\n  this.make = \"Lamborghini\";\r\n  return { make: \"Maserati\" };\r\n}\r\n\r\nconst myCar = new Car();\r\nconsole.log(myCar.make);\r\n",
    "options": [
      {
        "correct": false,
        "text": "`\"Lamborghini\"`"
      },
      {
        "correct": true,
        "text": "`\"Maserati\"`"
      },
      {
        "correct": false,
        "text": "`ReferenceError`"
      },
      {
        "correct": false,
        "text": "`TypeError`"
      }
    ],
    "explanation": "返回属性的时候，属性的值等于 _返回的_ 值，而不是构造函数中设定的值。我们返回了字符串 `\"Maserati\"`，所以 `myCar.make`等于`\"Maserati\"`."
  },
  {
    "id": 54,
    "title": "54. 输出是什么?",
    "code": "(() => {\r\n  let x = (y = 10);\r\n})();\r\n\r\nconsole.log(typeof x);\r\nconsole.log(typeof y);\r\n",
    "options": [
      {
        "correct": true,
        "text": "`\"undefined\", \"number\"`"
      },
      {
        "correct": false,
        "text": "`\"number\", \"number\"`"
      },
      {
        "correct": false,
        "text": "`\"object\", \"number\"`"
      },
      {
        "correct": false,
        "text": "`\"number\", \"undefined\"`"
      }
    ],
    "explanation": "`let x = y = 10;` 是下面这个表达式的缩写:\r\n\r\n```javascript\r\ny = 10;\r\nlet x = y;\r\n```\r\n\r\n我们设定`y`等于`10`时,我们实际上增加了一个属性`y`给全局对象(浏览器里的`window`, Nodejs里的`global`)。在浏览器中， `window.y`等于`10`.\r\n\r\n然后我们声明了变量`x`等于`y`,也是`10`.但变量是使用 `let`声明的，它只作用于 _块级作用域_, 仅在声明它的块中有效；就是案例中的立即调用表达式(IIFE)。使用`typeof`操作符时, 操作值 `x`没有被定义：因为我们在`x`声明块的外部，无法调用它。这就意味着`x`未定义。未分配或是未声明的变量类型为`\"undefined\"`. `console.log(typeof x)`返回`\"undefined\"`.\r\n\r\n而我们创建了全局变量`y`，并且设定`y`等于`10`.这个值在我们的代码各处都访问的到。 `y`已经被定义了，而且有一个`\"number\"`类型的值。 `console.log(typeof y)`返回`\"number\"`."
  },
  {
    "id": 55,
    "title": "55. 输出是什么?",
    "code": "class Dog {\r\n  constructor(name) {\r\n    this.name = name;\r\n  }\r\n}\r\n\r\nDog.prototype.bark = function() {\r\n  console.log(`Woof I am ${this.name}`);\r\n};\r\n\r\nconst pet = new Dog(\"Mara\");\r\n\r\npet.bark();\r\n\r\ndelete Dog.prototype.bark;\r\n\r\npet.bark();\r\n",
    "options": [
      {
        "correct": true,
        "text": "`\"Woof I am Mara\"`, `TypeError`"
      },
      {
        "correct": false,
        "text": "`\"Woof I am Mara\"`,`\"Woof I am Mara\"`"
      },
      {
        "correct": false,
        "text": "`\"Woof I am Mara\"`, `undefined`"
      },
      {
        "correct": false,
        "text": "`TypeError`, `TypeError`"
      }
    ],
    "explanation": "我们可以用`delete`关键字删除对象的属性，对原型也是适用的。删除了原型的属性后，该属性在原型链上就不可用了。在本例中，函数`bark`在执行了`delete Dog.prototype.bark`后不可用, 然而后面的代码还在调用它。\r\n\r\n当我们尝试调用一个不存在的函数时`TypeError`异常会被抛出。在本例中就是 `TypeError: pet.bark is not a function`，因为`pet.bark`是`undefined`."
  },
  {
    "id": 56,
    "title": "56. 输出是什么?",
    "code": "const set = new Set([1, 1, 2, 3, 4]);\r\n\r\nconsole.log(set);\r\n",
    "options": [
      {
        "correct": false,
        "text": "`[1, 1, 2, 3, 4]`"
      },
      {
        "correct": false,
        "text": "`[1, 2, 3, 4]`"
      },
      {
        "correct": false,
        "text": "`{1, 1, 2, 3, 4}`"
      },
      {
        "correct": true,
        "text": "`{1, 2, 3, 4}`"
      }
    ],
    "explanation": "`Set`对象是独一无二的值的集合：也就是说同一个值在其中仅出现一次。\r\n\r\n我们传入了数组`[1, 1, 2, 3, 4]`，他有一个重复值`1`.以为一个集合里不能有两个重复的值，其中一个就被移除了。所以结果是 `{1, 2, 3, 4}`."
  },
  {
    "id": 57,
    "title": "57. 输出是什么?",
    "code": "// counter.js\r\nlet counter = 10;\r\nexport default counter;\r\n",
    "options": [
      {
        "correct": false,
        "text": "`10`"
      },
      {
        "correct": false,
        "text": "`11`"
      },
      {
        "correct": true,
        "text": "`Error`"
      },
      {
        "correct": false,
        "text": "`NaN`"
      }
    ],
    "explanation": "引入的模块是 _只读_ 的: 你不能修改引入的模块。只有导出他们的模块才能修改其值。\r\n\r\n当我们给`myCounter`增加一个值的时候会抛出一个异常： `myCounter`是只读的，不能被修改。"
  },
  {
    "id": 58,
    "title": "58. 输出是什么?",
    "code": "const name = \"Lydia\";\r\nage = 21;\r\n\r\nconsole.log(delete name);\r\nconsole.log(delete age);\r\n",
    "options": [
      {
        "correct": true,
        "text": "`false`, `true`"
      },
      {
        "correct": false,
        "text": "`\"Lydia\"`, `21`"
      },
      {
        "correct": false,
        "text": "`true`, `true`"
      },
      {
        "correct": false,
        "text": "`undefined`, `undefined`"
      }
    ],
    "explanation": "`delete`操作符返回一个布尔值： `true`指删除成功，否则返回`false`. 但是通过 `var`, `const` 或 `let` 关键字声明的变量无法用 `delete` 操作符来删除。\r\n\r\n`name`变量由`const`关键字声明，所以删除不成功:返回 `false`. 而我们设定`age`等于`21`时,我们实际上添加了一个名为`age`的属性给全局对象。对象中的属性是可以删除的，全局对象也是如此，所以`delete age`返回`true`."
  },
  {
    "id": 59,
    "title": "59. 输出是什么?",
    "code": "const numbers = [1, 2, 3, 4, 5];\r\nconst [y] = numbers;\r\n\r\nconsole.log(y);\r\n",
    "options": [
      {
        "correct": false,
        "text": "`[[1, 2, 3, 4, 5]]`"
      },
      {
        "correct": false,
        "text": "`[1, 2, 3, 4, 5]`"
      },
      {
        "correct": true,
        "text": "`1`"
      },
      {
        "correct": false,
        "text": "`[1]`"
      }
    ],
    "explanation": "我们可以通过解构赋值来解析来自对象的数组或属性的值，比如说：\r\n\r\n```javascript\r\n[a, b] = [1, 2];\r\n```\r\n\r\n<img src=\"https://i.imgur.com/ADFpVop.png\" width=\"200\">\r\n\r\n`a`的值现在是`1`，`b`的值现在是`2`.而在题目中，我们是这么做的:\r\n\r\n```javascript\r\n[y] = [1, 2, 3, 4, 5];\r\n```\r\n\r\n<img src=\"https://i.imgur.com/NzGkMNk.png\" width=\"200\">\r\n\r\n也就是说，`y`等于数组的第一个值就是数字`1`.我们输出`y`， 返回`1`."
  },
  {
    "id": 60,
    "title": "60. 输出是什么?",
    "code": "const user = { name: \"Lydia\", age: 21 };\r\nconst admin = { admin: true, ...user };\r\n\r\nconsole.log(admin);\r\n",
    "options": [
      {
        "correct": false,
        "text": "`{ admin: true, user: { name: \"Lydia\", age: 21 } }`"
      },
      {
        "correct": true,
        "text": "`{ admin: true, name: \"Lydia\", age: 21 }`"
      },
      {
        "correct": false,
        "text": "`{ admin: true, user: [\"Lydia\", 21] }`"
      },
      {
        "correct": false,
        "text": "`{ admin: true }`"
      }
    ],
    "explanation": "扩展运算符`...`为对象的组合提供了可能。你可以复制对象中的键值对，然后把它们加到另一个对象里去。在本例中，我们复制了`user`对象键值对，然后把它们加入到`admin`对象中。`admin`对象就拥有了这些键值对，所以结果为`{ admin: true, name: \"Lydia\", age: 21 }`."
  },
  {
    "id": 61,
    "title": "61. 输出是什么?",
    "code": "const person = { name: \"Lydia\" };\r\n\r\nObject.defineProperty(person, \"age\", { value: 21 });\r\n\r\nconsole.log(person);\r\nconsole.log(Object.keys(person));\r\n",
    "options": [
      {
        "correct": false,
        "text": "`{ name: \"Lydia\", age: 21 }`, `[\"name\", \"age\"]`"
      },
      {
        "correct": true,
        "text": "`{ name: \"Lydia\", age: 21 }`, `[\"name\"]`"
      },
      {
        "correct": false,
        "text": "`{ name: \"Lydia\"}`, `[\"name\", \"age\"]`"
      },
      {
        "correct": false,
        "text": "`{ name: \"Lydia\"}`, `[\"age\"]`"
      }
    ],
    "explanation": "通过`defineProperty`方法，我们可以给对象添加一个新属性，或者修改已经存在的属性。而我们使用`defineProperty`方法给对象添加了一个属性之后，属性默认为 _不可枚举(not enumerable)_. `Object.keys`方法仅返回对象中 _可枚举(enumerable)_ 的属性，因此只剩下了`\"name\"`.\r\n\r\n用`defineProperty`方法添加的属性默认不可变。你可以通过`writable`, `configurable` 和 `enumerable`属性来改变这一行为。这样的话， 相比于自己添加的属性，`defineProperty`方法添加的属性有了更多的控制权。"
  },
  {
    "id": 62,
    "title": "62. 输出是什么?",
    "code": "const settings = {\r\n  username: \"lydiahallie\",\r\n  level: 19,\r\n  health: 90\r\n};\r\n\r\nconst data = JSON.stringify(settings, [\"level\", \"health\"]);\r\nconsole.log(data);\r\n",
    "options": [
      {
        "correct": true,
        "text": "`\"{\"level\":19, \"health\":90}\"`"
      },
      {
        "correct": false,
        "text": "`\"{\"username\": \"lydiahallie\"}\"`"
      },
      {
        "correct": false,
        "text": "`\"[\"level\", \"health\"]\"`"
      },
      {
        "correct": false,
        "text": "`\"{\"username\": \"lydiahallie\", \"level\":19, \"health\":90}\"`"
      }
    ],
    "explanation": "`JSON.stringify`的第二个参数是 _替代者(replacer)_. 替代者(replacer)可以是个函数或数组，用以控制哪些值如何被转换为字符串。\r\n\r\n如果替代者(replacer)是个 _数组_ ，那么就只有包含在数组中的属性将会被转化为字符串。在本例中，只有名为`\"level\"` 和 `\"health\"` 的属性被包括进来， `\"username\"`则被排除在外。 `data` 就等于 `\"{\"level\":19, \"health\":90}\"`.\r\n\r\n而如果替代者(replacer)是个 _函数_，这个函数将被对象的每个属性都调用一遍。\r\n函数返回的值会成为这个属性的值，最终体现在转化后的JSON字符串中（译者注：Chrome下，经过实验，如果所有属性均返回同一个值的时候有异常，会直接将返回值作为结果输出而不会输出JSON字符串），而如果返回值为`undefined`，则该属性会被排除在外。"
  },
  {
    "id": 63,
    "title": "63. 输出是什么?",
    "code": "let num = 10;\r\n\r\nconst increaseNumber = () => num++;\r\nconst increasePassedNumber = number => number++;\r\n\r\nconst num1 = increaseNumber();\r\nconst num2 = increasePassedNumber(num1);\r\n\r\nconsole.log(num1);\r\nconsole.log(num2);\r\n",
    "options": [
      {
        "correct": true,
        "text": "`10`, `10`"
      },
      {
        "correct": false,
        "text": "`10`, `11`"
      },
      {
        "correct": false,
        "text": "`11`, `11`"
      },
      {
        "correct": false,
        "text": "`11`, `12`"
      }
    ],
    "explanation": "一元操作符 `++` _先返回_ 操作值, _再累加_ 操作值。`num1`的值是`10`, 因为`increaseNumber`函数首先返回`num`的值，也就是`10`，随后再进行 `num`的累加。\r\n\r\n`num2`是`10`因为我们将 `num1`传入`increasePassedNumber`. `number`等于`10`（`num1`的值。同样道理，`++` _先返回_ 操作值, _再累加_ 操作值。） `number`是`10`，所以`num2`也是`10`."
  },
  {
    "id": 64,
    "title": "64. 输出什么?",
    "code": "const value = { number: 10 };\r\n\r\nconst multiply = (x = { ...value }) => {\r\n  console.log(x.number *= 2);\r\n};\r\n\r\nmultiply();\r\nmultiply();\r\nmultiply(value);\r\nmultiply(value);\r\n",
    "options": [
      {
        "correct": false,
        "text": "`20`, `40`, `80`, `160`"
      },
      {
        "correct": false,
        "text": "`20`, `40`, `20`, `40`"
      },
      {
        "correct": true,
        "text": "`20`, `20`, `20`, `40`"
      },
      {
        "correct": false,
        "text": "`NaN`, `NaN`, `20`, `40`"
      }
    ],
    "explanation": "在ES6中，我们可以使用默认值初始化参数。如果没有给函数传参，或者传的参值为 `\"undefined\"` ，那么参数的值将是默认值。上述例子中，我们将 `value` 对象进行了解构并传到一个新对象中，因此 `x` 的默认值为 `{number：10}` 。\r\n\r\n默认参数在调用时才会进行计算，每次调用函数时，都会创建一个新的对象。我们前两次调用 `multiply` 函数且不传递值，那么每一次 `x` 的默认值都为 `{number：10}` ，因此打印出该数字的乘积值为`20`。\r\n\r\n第三次调用 `multiply` 时，我们传递了一个参数，即对象`value`。 `*=`运算符实际上是`x.number = x.number * 2`的简写，我们修改了`x.number`的值，并打印出值`20`。\r\n\r\n第四次，我们再次传递`value`对象。 `x.number`之前被修改为`20`，所以`x.number * = 2`打印为`40`。"
  },
  {
    "id": 65,
    "title": "65. 输出什么?",
    "code": "[1, 2, 3, 4].reduce((x, y) => console.log(x, y));\r\n",
    "options": [
      {
        "correct": false,
        "text": "`1` `2` and `3` `3` and `6` `4`"
      },
      {
        "correct": false,
        "text": "`1` `2` and `2` `3` and `3` `4`"
      },
      {
        "correct": false,
        "text": "`1` `undefined` and `2` `undefined` and `3` `undefined` and `4` `undefined`"
      },
      {
        "correct": true,
        "text": "`1` `2` and `undefined` `3` and `undefined` `4`"
      }
    ],
    "explanation": "`reducer` 函数接收4个参数:\r\n\r\n1. Accumulator (acc) (累计器)\r\n2. Current Value (cur) (当前值)\r\n3. Current Index (idx) (当前索引)\r\n4. Source Array (src) (源数组)\r\n\r\n`reducer` 函数的返回值将会分配给累计器，该返回值在数组的每个迭代中被记住，并最后成为最终的单个结果值。\r\n\r\n`reducer` 函数还有一个可选参数`initialValue`, 该参数将作为第一次调用回调函数时的第一个参数的值。如果没有提供`initialValue`，则将使用数组中的第一个元素。\r\n\r\n在上述例子，`reduce`方法接收的第一个参数(Accumulator)是`x`, 第二个参数(Current Value)是`y`。\r\n\r\n在第一次调用时，累加器`x`为`1`，当前值`“y”`为`2`，打印出累加器和当前值：`1`和`2`。\r\n\r\n例子中我们的回调函数没有返回任何值，只是打印累加器的值和当前值。如果函数没有返回值，则默认返回`undefined`。 在下一次调用时，累加器为`undefined`，当前值为“3”, 因此`undefined`和`3`被打印出。\r\n\r\n在第四次调用时，回调函数依然没有返回值。 累加器再次为 `undefined` ，当前值为“4”。 `undefined`和`4`被打印出。"
  },
  {
    "id": 66,
    "title": "66. 使用哪个构造函数可以成功继承`Dog`类?",
    "code": "class Dog {\r\n  constructor(name) {\r\n    this.name = name;\r\n  }\r\n};\r\n\r\nclass Labrador extends Dog {\r\n  // 1 \r\n  constructor(name, size) {\r\n    this.size = size;\r\n  }\r\n  // 2\r\n  constructor(name, size) {\r\n    super(name);\r\n    this.size = size;\r\n  }\r\n  // 3\r\n  constructor(size) {\r\n    super(name);\r\n    this.size = size;\r\n  }\r\n  // 4 \r\n  constructor(name, size) {\r\n    this.name = name;\r\n    this.size = size;\r\n  }\r\n\r\n};\r\n",
    "options": [
      {
        "correct": false,
        "text": "1"
      },
      {
        "correct": true,
        "text": "2"
      },
      {
        "correct": false,
        "text": "3"
      },
      {
        "correct": false,
        "text": "4"
      }
    ],
    "explanation": "在子类中，在调用`super`之前不能访问到`this`关键字。 如果这样做，它将抛出一个`ReferenceError`：1和4将引发一个引用错误。\r\n\r\n使用`super`关键字，需要用给定的参数来调用父类的构造函数。 父类的构造函数接收`name`参数，因此我们需要将`name`传递给`super`。\r\n\r\n`Labrador`类接收两个参数，`name`参数是由于它继承了`Dog`，`size`作为`Labrador`类的额外属性，它们都需要传递给`Labrador`的构造函数，因此使用构造函数2正确完成。"
  },
  {
    "id": 67,
    "title": "67. 输出什么?",
    "code": "// index.js\r\nconsole.log('running index.js');\r\nimport { sum } from './sum.js';\r\nconsole.log(sum(1, 2));\r\n\r\n// sum.js\r\nconsole.log('running sum.js');\r\nexport const sum = (a, b) => a + b;\r\n",
    "options": [
      {
        "correct": false,
        "text": "`running index.js`, `running sum.js`, `3`"
      },
      {
        "correct": true,
        "text": "`running sum.js`, `running index.js`, `3`"
      },
      {
        "correct": false,
        "text": "`running sum.js`, `3`, `running index.js`"
      },
      {
        "correct": false,
        "text": "`running index.js`, `undefined`, `running sum.js`"
      }
    ],
    "explanation": "`import`命令是编译阶段执行的，在代码运行之前。因此这意味着被导入的模块会先运行，而导入模块的文件会后执行。\r\n\r\n这是CommonJS中`require（）`和`import`之间的区别。使用`require()`，您可以在运行代码时根据需要加载依赖项。 如果我们使用`require`而不是`import`，`running index.js`，`running sum.js`，`3`会被依次打印。"
  },
  {
    "id": 68,
    "title": "68. 输出什么?",
    "code": "console.log(Number(2) === Number(2))\r\nconsole.log(Boolean(false) === Boolean(false))\r\nconsole.log(Symbol('foo') === Symbol('foo'))\r\n",
    "options": [
      {
        "correct": true,
        "text": "`true`, `true`, `false`"
      },
      {
        "correct": false,
        "text": "`false`, `true`, `false`"
      },
      {
        "correct": false,
        "text": "`true`, `false`, `true`"
      },
      {
        "correct": false,
        "text": "`true`, `true`, `true`"
      }
    ],
    "explanation": "每个`Symbol`都是完全唯一的。传递给`Symbol`的参数只是给`Symbol`的一个描述。 `Symbol`的值不依赖于传递的参数。 当我们测试相等时，我们创建了两个全新的符号：第一个`Symbol（'foo'）`，第二个`Symbol（'foo'）`, 这两个值是唯一的，彼此不相等，因此返回`false`。"
  },
  {
    "id": 69,
    "title": "69. 输出什么?",
    "code": "const name = \"Lydia Hallie\"\r\nconsole.log(name.padStart(13))\r\nconsole.log(name.padStart(2))\r\n",
    "options": [
      {
        "correct": false,
        "text": "`\"Lydia Hallie\"`, `\"Lydia Hallie\"`"
      },
      {
        "correct": false,
        "text": "`\"           Lydia Hallie\"`, `\"  Lydia Hallie\"` (`\"[13x whitespace]Lydia Hallie\"`, `\"[2x whitespace]Lydia Hallie\"`)"
      },
      {
        "correct": true,
        "text": "`\" Lydia Hallie\"`, `\"Lydia Hallie\"` (`\"[1x whitespace]Lydia Hallie\"`, `\"Lydia Hallie\"`)"
      },
      {
        "correct": false,
        "text": "`\"Lydia Hallie\"`, `\"Lyd\"`"
      }
    ],
    "explanation": "使用`padStart`方法，我们可以在字符串的开头添加填充。传递给此方法的参数是字符串的总长度（包含填充）。字符串`Lydia Hallie`的长度为`12`, 因此`name.padStart（13）`在字符串的开头只会插入1（`13 - 12 = 1`）个空格。\r\n\r\n如果传递给`padStart`方法的参数小于字符串的长度，则不会添加填充。"
  },
  {
    "id": 70,
    "title": "70. 输出什么?",
    "code": "console.log(\"🥑\" + \"💻\");\r\n",
    "options": [
      {
        "correct": true,
        "text": "`\"🥑💻\"`"
      },
      {
        "correct": false,
        "text": "`257548`"
      },
      {
        "correct": false,
        "text": "A string containing their code points"
      },
      {
        "correct": false,
        "text": "Error"
      }
    ],
    "explanation": "使用`+`运算符，您可以连接字符串。 上述情况，我们将字符串`“🥑”`与字符串`”💻“`连接起来，产生`”🥑💻“`。"
  },
  {
    "id": 71,
    "title": "71. 如何能打印出`console.log`语句后注释掉的值？",
    "code": "function* startGame() {\r\n  const 答案 = yield \"Do you love JavaScript?\";\r\n  if (答案 !== \"Yes\") {\r\n    return \"Oh wow... Guess we're gone here\";\r\n  }\r\n  return \"JavaScript loves you back ❤️\";\r\n}\r\n\r\nconst game = startGame();\r\nconsole.log(/* 1 */); // Do you love JavaScript?\r\nconsole.log(/* 2 */); // JavaScript loves you back ❤️\r\n",
    "options": [
      {
        "correct": false,
        "text": "`game.next(\"Yes\").value` and `game.next().value`"
      },
      {
        "correct": false,
        "text": "`game.next.value(\"Yes\")` and `game.next.value()`"
      },
      {
        "correct": true,
        "text": "`game.next().value` and `game.next(\"Yes\").value`"
      },
      {
        "correct": false,
        "text": "`game.next.value()` and `game.next.value(\"Yes\")`"
      }
    ],
    "explanation": "`generator`函数在遇到`yield`关键字时会“暂停”其执行。 首先，我们需要让函数产生字符串`Do you love JavaScript?`，这可以通过调用`game.next().value`来完成。上述函数的第一行就有一个`yield`关键字，那么运行立即停止了，`yield`表达式本身没有返回值，或者说总是返回`undefined`, 这意味着此时变量 `答案` 为`undefined`\r\n\r\n`next`方法可以带一个参数，该参数会被当作上一个 `yield` 表达式的返回值。当我们调用`game.next(\"Yes\").value`时，先前的 `yield` 的返回值将被替换为传递给`next()`函数的参数`\"Yes\"`。此时变量 `答案` 被赋值为 `\"Yes\"`，`if`语句返回`false`，所以`JavaScript loves you back ❤️`被打印。"
  },
  {
    "id": 72,
    "title": "72. 输出什么?",
    "code": "console.log(String.raw`Hello\\nworld`);\r\n",
    "options": [
      {
        "correct": false,
        "text": "`Hello world!`"
      },
      {
        "correct": false,
        "text": "`Hello` <br />&nbsp; &nbsp; &nbsp;`world`"
      },
      {
        "correct": true,
        "text": "`Hello\\nworld`"
      },
      {
        "correct": false,
        "text": "`Hello\\n` <br /> &nbsp; &nbsp; &nbsp;`world`"
      }
    ],
    "explanation": "`String.raw`函数是用来获取一个模板字符串的原始字符串的，它返回一个字符串，其中忽略了转义符（`\\n`，`\\v`，`\\t`等）。但反斜杠可能造成问题，因为你可能会遇到下面这种类似情况：\r\n\r\n```javascript\r\nconst path = `C:\\Documents\\Projects\\table.html`\r\nString.raw`${path}`\r\n```\r\n\r\n这将导致：\r\n\r\n`\"C:DocumentsProjects able.html\"`\r\n\r\n直接使用`String.raw`\r\n```javascript\r\nString.raw`C:\\Documents\\Projects\\table.html`\r\n```\r\n它会忽略转义字符并打印：`C:\\Documents\\Projects\\table.html`\r\n\r\n上述情况，字符串是`Hello\\nworld`被打印出。"
  },
  {
    "id": 73,
    "title": "73. 输出什么?",
    "code": "async function getData() {\r\n  return await Promise.resolve(\"I made it!\");\r\n}\r\n\r\nconst data = getData();\r\nconsole.log(data);\r\n",
    "options": [
      {
        "correct": false,
        "text": "`\"I made it!\"`"
      },
      {
        "correct": false,
        "text": "`Promise {<resolved>: \"I made it!\"}`"
      },
      {
        "correct": true,
        "text": "`Promise {<pending>}`"
      },
      {
        "correct": false,
        "text": "`undefined`"
      }
    ],
    "explanation": "异步函数始终返回一个promise。`await`仍然需要等待promise的解决：当我们调用`getData()`并将其赋值给`data`，此时`data`为`getData`方法返回的一个挂起的promise，该promise并没有解决。\r\n\r\n如果我们想要访问已解决的值`\"I made it!\"`，可以在`data`上使用`.then()`方法：\r\n\r\n`data.then(res => console.log(res))`\r\n\r\n这样将打印 `\"I made it!\"`"
  },
  {
    "id": 74,
    "title": "74. 输出什么?",
    "code": "function addToList(item, list) {\r\n  return list.push(item);\r\n}\r\n\r\nconst result = addToList(\"apple\", [\"banana\"]);\r\nconsole.log(result);\r\n",
    "options": [
      {
        "correct": false,
        "text": "`['apple', 'banana']`"
      },
      {
        "correct": true,
        "text": "`2`"
      },
      {
        "correct": false,
        "text": "`true`"
      },
      {
        "correct": false,
        "text": "`undefined`"
      }
    ],
    "explanation": "`push()`方法返回新数组的长度。一开始，数组包含一个元素（字符串`\"banana\"`），长度为1。 在数组中添加字符串`\"apple\"`后，长度变为2，并将从`addToList`函数返回。\r\n\r\n`push`方法修改原始数组，如果你想从函数返回数组而不是数组长度，那么应该在push `item`之后返回`list`。"
  },
  {
    "id": 75,
    "title": "75. 输出什么?",
    "code": "const box = { x: 10, y: 20 };\r\n\r\nObject.freeze(box);\r\n\r\nconst shape = box;\r\nshape.x = 100;\r\nconsole.log(shape)\r\n",
    "options": [
      {
        "correct": false,
        "text": "`{ x: 100, y: 20 }`"
      },
      {
        "correct": true,
        "text": "`{ x: 10, y: 20 }`"
      },
      {
        "correct": false,
        "text": "`{ x: 100 }`"
      },
      {
        "correct": false,
        "text": "`ReferenceError`"
      }
    ],
    "explanation": "`Object.freeze`使得无法添加、删除或修改对象的属性（除非属性的值是另一个对象）。\r\n\r\n当我们创建变量`shape`并将其设置为等于冻结对象`box`时，`shape`指向的也是冻结对象。你可以使用`Object.isFrozen`检查一个对象是否被冻结，上述情况，`Object.isFrozen（shape）`将返回`true`。\r\n\r\n由于`shape`被冻结，并且`x`的值不是对象，所以我们不能修改属性`x`。 `x`仍然等于`10`，`{x：10，y：20}`被打印。\r\n\r\n注意，上述例子我们对属性`x`进行修改，可能会导致抛出TypeError异常（最常见但不仅限于严格模式下时）。"
  },
  {
    "id": 76,
    "title": "76. 输出什么?",
    "code": "const { name: myName } = { name: \"Lydia\" };\r\n\r\nconsole.log(name);\r\n",
    "options": [
      {
        "correct": false,
        "text": "`\"Lydia\"`"
      },
      {
        "correct": false,
        "text": "`\"myName\"`"
      },
      {
        "correct": false,
        "text": "`undefined`"
      },
      {
        "correct": true,
        "text": "`ReferenceError`"
      }
    ],
    "explanation": "当我们从右侧的对象解构属性`name`时，我们将其值`Lydia`分配给名为`myName`的变量。\r\n\r\n使用`{name：myName}`，我们是在告诉JavaScript我们要创建一个名为`myName`的新变量，并且其值是右侧对象的`name`属性的值。\r\n\r\n当我们尝试打印`name`，一个未定义的变量时，就会引发`ReferenceError`。"
  },
  {
    "id": 77,
    "title": "77. 以下是个纯函数么?",
    "code": "function sum(a, b) {\r\n  return a + b;\r\n}\r\n",
    "options": [
      {
        "correct": true,
        "text": "Yes"
      },
      {
        "correct": false,
        "text": "No"
      }
    ],
    "explanation": "纯函数一种若输入参数相同，则永远会得到相同输出的函数。\r\n\r\n`sum`函数总是返回相同的结果。 如果我们传递`1`和`2`，它将总是返回`3`而没有副作用。 如果我们传递`5`和`10`，它将总是返回`15`，依此类推，这是纯函数的定义。"
  },
  {
    "id": 78,
    "title": "78. 输出什么?",
    "code": "const add = () => {\r\n  const cache = {};\r\n  return num => {\r\n    if (num in cache) {\r\n      return `From cache! ${cache[num]}`;\r\n    } else {\r\n      const result = num + 10;\r\n      cache[num] = result;\r\n      return `Calculated! ${result}`;\r\n    }\r\n  };\r\n};\r\n\r\nconst addFunction = add();\r\nconsole.log(addFunction(10));\r\nconsole.log(addFunction(10));\r\nconsole.log(addFunction(5 * 2));\r\n",
    "options": [
      {
        "correct": false,
        "text": "`Calculated! 20` `Calculated! 20` `Calculated! 20`"
      },
      {
        "correct": false,
        "text": "`Calculated! 20` `From cache! 20` `Calculated! 20`"
      },
      {
        "correct": true,
        "text": "`Calculated! 20` `From cache! 20` `From cache! 20`"
      },
      {
        "correct": false,
        "text": "`Calculated! 20` `From cache! 20` `Error`"
      }
    ],
    "explanation": "`add`函数是一个记忆函数。 通过记忆化，我们可以缓存函数的结果，以加快其执行速度。上述情况，我们创建一个`cache`对象，用于存储先前返回过的值。\r\n\r\n如果我们使用相同的参数多次调用`addFunction`函数，它首先检查缓存中是否已有该值，如果有，则返回缓存值，这将节省执行时间。如果没有，那么它将计算该值，并存储在缓存中。\r\n\r\n我们用相同的值三次调用了`addFunction`函数：\r\n\r\n在第一次调用，`num`等于`10`时函数的值尚未缓存，if语句`num in cache`返回`false`，else块的代码被执行：`Calculated! 20`，并且其结果被添加到缓存对象，`cache`现在看起来像`{10：20}`。\r\n\r\n第二次，`cache`对象包含`10`的返回值。 if语句 `num in cache` 返回`true`，`From cache! 20`被打印。\r\n\r\n第三次，我们将`5 * 2`(值为10)传递给函数。 `cache`对象包含`10`的返回值。 if语句 `num in cache` 返回`true`，`From cache! 20`被打印。"
  },
  {
    "id": 79,
    "title": "79. 输出什么?",
    "code": "const myLifeSummedUp = [\"☕\", \"💻\", \"🍷\", \"🍫\"]\r\n\r\nfor (let item in myLifeSummedUp) {\r\n  console.log(item)\r\n}\r\n\r\nfor (let item of myLifeSummedUp) {\r\n  console.log(item)\r\n}\r\n",
    "options": [
      {
        "correct": true,
        "text": "`0` `1` `2` `3` and `\"☕\"` ` \"💻\"` `\"🍷\"` `\"🍫\"`"
      },
      {
        "correct": false,
        "text": "`\"☕\"` ` \"💻\"` `\"🍷\"` `\"🍫\"` and `\"☕\"` ` \"💻\"` `\"🍷\"` `\"🍫\"`"
      },
      {
        "correct": false,
        "text": "`\"☕\"` ` \"💻\"` `\"🍷\"` `\"🍫\"` and `0` `1` `2` `3`"
      },
      {
        "correct": false,
        "text": "`0` `1` `2` `3` and `{0: \"☕\", 1: \"💻\", 2: \"🍷\", 3: \"🍫\"}`"
      }
    ],
    "explanation": "通过`for-in`循环，我们可以遍历一个对象**自有的**、**继承的**、**可枚举的**、**非Symbol的**属性。 在数组中，可枚举属性是数组元素的“键”， 即它们的索引。 类似于下面这个对象：\r\n\r\n`{0: \"☕\", 1: \"💻\", 2: \"🍷\", 3: \"🍫\"}`\r\n\r\n其中键则是可枚举属性，因此 `0`，`1`，`2`，`3`被记录。\r\n\r\n通过`for-of`循环，我们可以迭代**可迭代对象**（包括 `Array`，`Map`，`Set`，`String`，`arguments`等）。当我们迭代数组时，在每次迭代中，不同属性的值将被分配给变量`item`, 因此`“☕”`，`“💻”`，`“🍷”`，`“🍫”`被打印。"
  },
  {
    "id": 80,
    "title": "80. 输出什么?",
    "code": "const list = [1 + 2, 1 * 2, 1 / 2]\r\nconsole.log(list)\r\n",
    "options": [
      {
        "correct": false,
        "text": "`[\"1 + 2\", \"1 * 2\", \"1 / 2\"]`"
      },
      {
        "correct": false,
        "text": "`[\"12\", 2, 0.5]`"
      },
      {
        "correct": true,
        "text": "`[3, 2, 0.5]`"
      },
      {
        "correct": false,
        "text": "`[1, 1, 1]`"
      }
    ],
    "explanation": "数组元素可以包含任何值。 数字，字符串，布尔值，对象，数组，`null`，`undeifned`, 以及其他表达式，如日期，函数和计算。\r\n\r\n元素将等于返回的值。 `1 + 2`返回`3`，`1 * 2`返回'2`，'1 / 2`返回`0.5`。"
  },
  {
    "id": 81,
    "title": "81. 输出什么?",
    "code": "function sayHi(name) {\r\n  return `Hi there, ${name}`\r\n}\r\n\r\nconsole.log(sayHi())\r\n",
    "options": [
      {
        "correct": false,
        "text": "`Hi there, `"
      },
      {
        "correct": true,
        "text": "`Hi there, undefined`"
      },
      {
        "correct": false,
        "text": "`Hi there, null`"
      },
      {
        "correct": false,
        "text": "`ReferenceError`"
      }
    ],
    "explanation": "默认情况下，如果不给函数传参，参数的值将为`undefined`。 上述情况，我们没有给参数`name`传值。 `name`等于`undefined`，并被打印。\r\n\r\n在ES6中，我们可以使用默认参数覆盖此默认的`undefined`值。 例如：\r\n\r\n`function sayHi（name =“Lydia”）{...}`\r\n\r\n在这种情况下，如果我们没有传递值或者如果我们传递`undefined`，`name`总是等于字符串`Lydia`"
  },
  {
    "id": 82,
    "title": "82. 输出什么?",
    "code": "var status = \"😎\"\r\n\r\nsetTimeout(() => {\r\n  const status = \"😍\"\r\n\r\n  const data = {\r\n    status: \"🥑\",\r\n    getStatus() {\r\n      return this.status\r\n    }\r\n  }\r\n\r\n  console.log(data.getStatus())\r\n  console.log(data.getStatus.call(this))\r\n}, 0)\r\n",
    "options": [
      {
        "correct": false,
        "text": "`\"🥑\"` and `\"😍\"`"
      },
      {
        "correct": true,
        "text": "`\"🥑\"` and `\"😎\"`"
      },
      {
        "correct": false,
        "text": "`\"😍\"` and `\"😎\"`"
      },
      {
        "correct": false,
        "text": "`\"😎\"` and `\"😎\"`"
      }
    ],
    "explanation": "`this`关键字的指向取决于使用它的位置。 在**函数**中，比如`getStatus`，`this`指向的是调用它的对象，上述例子中`data`对象调用了`getStatus`，因此`this`指向的就是`data`对象。 当我们打印`this.status`时，`data`对象的`status`属性被打印，即`\"🥑\"`。\r\n\r\n使用`call`方法，可以更改`this`指向的对象。`data.getStatus.call(this)`是将`this`的指向由`data`对象更改为全局对象。在全局对象上，有一个名为`status`的变量，其值为`”😎“`。 因此打印`this.status`时，会打印`“😎”`。"
  },
  {
    "id": 83,
    "title": "83. 输出什么?",
    "code": "const person = {\r\n  name: \"Lydia\",\r\n  age: 21\r\n}\r\n\r\nlet city = person.city\r\ncity = \"Amsterdam\"\r\n\r\nconsole.log(person)\r\n",
    "options": [
      {
        "correct": true,
        "text": "`{ name: \"Lydia\", age: 21 }`"
      },
      {
        "correct": false,
        "text": "`{ name: \"Lydia\", age: 21, city: \"Amsterdam\" }`"
      },
      {
        "correct": false,
        "text": "`{ name: \"Lydia\", age: 21, city: undefined }`"
      },
      {
        "correct": false,
        "text": "`\"Amsterdam\"`"
      }
    ],
    "explanation": "我们将变量`city`设置为等于`person`对象上名为`city`的属性的值。 这个对象上没有名为`city`的属性，因此变量`city`的值为`undefined`。\r\n\r\n请注意，我们没有引用`person`对象本身，只是将变量`city`设置为等于`person`对象上`city`属性的当前值。\r\n\r\n然后，我们将`city`设置为等于字符串`“Amsterdam”`。 这不会更改person对象：没有对该对象的引用。\r\n\r\n因此打印`person`对象时，会返回未修改的对象。"
  },
  {
    "id": 84,
    "title": "84. 输出什么?",
    "code": "function checkAge(age) {\r\n  if (age < 18) {\r\n    const message = \"Sorry, you're too young.\"\r\n  } else {\r\n    const message = \"Yay! You're old enough!\"\r\n  }\r\n\r\n  return message\r\n}\r\n\r\nconsole.log(checkAge(21))\r\n",
    "options": [
      {
        "correct": false,
        "text": "`\"Sorry, you're too young.\"`"
      },
      {
        "correct": false,
        "text": "`\"Yay! You're old enough!\"`"
      },
      {
        "correct": true,
        "text": "`ReferenceError`"
      },
      {
        "correct": false,
        "text": "`undefined`"
      }
    ],
    "explanation": "`const`和`let`声明的变量是具有**块级作用域**的，块是大括号（`{}`）之间的任何东西, 即上述情况`if / else`语句的花括号。 由于块级作用域，我们无法在声明的块之外引用变量，因此抛出`ReferenceError`。"
  },
  {
    "id": 85,
    "title": "85. 什么样的信息将被打印?",
    "code": "fetch('https://www.website.com/api/user/1')\r\n  .then(res => res.json())\r\n  .then(res => console.log(res))\r\n",
    "options": [
      {
        "correct": false,
        "text": "`fetch`方法的结果"
      },
      {
        "correct": false,
        "text": "第二次调用`fetch`方法的结果"
      },
      {
        "correct": true,
        "text": "前一个`.then()`中回调方法返回的结果"
      },
      {
        "correct": false,
        "text": "总是`undefined`"
      }
    ],
    "explanation": "第二个`.then`中`res`的值等于前一个`.then`中的回调函数返回的值。 你可以像这样继续链接`.then`，将值传递给下一个处理程序。"
  },
  {
    "id": 86,
    "title": "86. 哪个选项是将`hasName`设置为`true`的方法，前提是不能将`true`作为参数传递?",
    "code": "function getName(name) {\r\n  const hasName = //\r\n}\r\n",
    "options": [
      {
        "correct": true,
        "text": "`!!name`"
      },
      {
        "correct": false,
        "text": "`name`"
      },
      {
        "correct": false,
        "text": "`new Boolean(name)`"
      },
      {
        "correct": false,
        "text": "`name.length`"
      }
    ],
    "explanation": "使用逻辑非运算符`!`，将返回一个布尔值，使用`!! name`，我们可以确定`name`的值是真的还是假的。 如果`name`是真实的，那么`!name`返回`false`。 `!false`返回`true`。\r\n\r\n通过将`hasName`设置为`name`，可以将`hasName`设置为等于传递给`getName`函数的值，而不是布尔值`true`。\r\n\r\n`new Boolean（true）`返回一个对象包装器，而不是布尔值本身。\r\n\r\n`name.length`返回传递的参数的长度，而不是布尔值`true`。"
  },
  {
    "id": 87,
    "title": "87. 输出什么?",
    "code": "console.log(\"I want pizza\"[0])\r\n",
    "options": [
      {
        "correct": false,
        "text": "`\"\"\"`"
      },
      {
        "correct": true,
        "text": "`\"I\"`"
      },
      {
        "correct": false,
        "text": "`SyntaxError`"
      },
      {
        "correct": false,
        "text": "`undefined`"
      }
    ],
    "explanation": "可以使用方括号表示法获取字符串中特定索引的字符，字符串中的第一个字符具有索引0，依此类推。 在这种情况下，我们想要得到索引为0的元素，字符`'I'`被记录。\r\n\r\n请注意，IE7及更低版本不支持此方法。 在这种情况下，应该使用`.charAt（）`"
  },
  {
    "id": 88,
    "title": "88. 输出什么?",
    "code": "function sum(num1, num2 = num1) {\r\n  console.log(num1 + num2)\r\n}\r\n\r\nsum(10)\r\n",
    "options": [
      {
        "correct": false,
        "text": "`NaN`"
      },
      {
        "correct": true,
        "text": "`20`"
      },
      {
        "correct": false,
        "text": "`ReferenceError`"
      },
      {
        "correct": false,
        "text": "`undefined`"
      }
    ],
    "explanation": "您可以将默认参数的值设置为函数的另一个参数，只要另一个参数定义在其之前即可。 我们将值`10`传递给`sum`函数。 如果`sum`函数只接收1个参数，则意味着没有传递`num2`的值，这种情况下，`num1`的值等于传递的值`10`。 `num2`的默认值是`num1`的值，即`10`。 ```num1 + num2```返回`20`。\r\n\r\n如果您尝试将默认参数的值设置为后面定义的参数，则可能导致参数的值尚未初始化，从而引发错误。比如：\r\n```js\r\nfunction test(m = n, n = 2) {\r\n\tconsole.log(m, n)\r\n}\r\ntest() // Uncaught ReferenceError: Cannot access 'n' before initialization\r\ntest(3) // 3 2\r\ntest(3, 4) // 3 4\r\n```"
  },
  {
    "id": 89,
    "title": "89. 输出什么?",
    "code": "// module.js \r\nexport default () => \"Hello world\"\r\nexport const name = \"Lydia\"\r\n\r\n// index.js \r\nimport * as data from \"./module\"\r\n\r\nconsole.log(data)\r\n",
    "options": [
      {
        "correct": true,
        "text": "`{ default: function default(), name: \"Lydia\" }`"
      },
      {
        "correct": false,
        "text": "`{ default: function default() }`"
      },
      {
        "correct": false,
        "text": "`{ default: \"Hello world\", name: \"Lydia\" }`"
      },
      {
        "correct": false,
        "text": "Global object of `module.js`"
      }
    ],
    "explanation": "使用`import * as name`语法，我们将`module.js`文件中所有`export`导入到`index.js`文件中，并且创建了一个名为`data`的新对象。 在`module.js`文件中，有两个导出：默认导出和命名导出。 默认导出是一个返回字符串“Hello World”的函数，命名导出是一个名为`name`的变量，其值为字符串`“Lydia”`。\r\n\r\n`data`对象具有默认导出的`default`属性，其他属性具有指定exports的名称及其对应的值。"
  },
  {
    "id": 90,
    "title": "90. 输出什么?",
    "code": "class Person {\r\n  constructor(name) {\r\n    this.name = name\r\n  }\r\n}\r\n\r\nconst member = new Person(\"John\")\r\nconsole.log(typeof member)\r\n",
    "options": [
      {
        "correct": false,
        "text": "`\"class\"`"
      },
      {
        "correct": false,
        "text": "`\"function\"`"
      },
      {
        "correct": true,
        "text": "`\"object\"`"
      },
      {
        "correct": false,
        "text": "`\"string\"`"
      }
    ],
    "explanation": "类是构造函数的语法糖，如果用构造函数的方式来重写`Person`类则将是：\r\n\r\n```javascript\r\nfunction Person() {\r\n  this.name = name\r\n}\r\n```\r\n\r\n通过`new`来调用构造函数，将会生成构造函数`Person`的实例，对实例执行`typeof`关键字将返回`\"object\"`，上述情况打印出`\"object\"`。"
  },
  {
    "id": 91,
    "title": "91. 输出什么?",
    "code": "let newList = [1, 2, 3].push(4)\r\n\r\nconsole.log(newList.push(5))\r\n",
    "options": [
      {
        "correct": false,
        "text": "`[1, 2, 3, 4, 5]`"
      },
      {
        "correct": false,
        "text": "`[1, 2, 3, 5]`"
      },
      {
        "correct": false,
        "text": "`[1, 2, 3, 4]`"
      },
      {
        "correct": true,
        "text": "`Error`"
      }
    ],
    "explanation": "`.push`方法返回数组的长度，而不是数组本身！ 通过将`newList`设置为`[1,2,3].push(4)`，实际上`newList`等于数组的新长度：`4`。\r\n\r\n然后，尝试在`newList`上使用`.push`方法。 由于`newList`是数值`4`，抛出TypeError。"
  },
  {
    "id": 92,
    "title": "92. 输出什么?",
    "code": "function giveLydiaPizza() {\r\n  return \"Here is pizza!\"\r\n}\r\n\r\nconst giveLydiaChocolate = () => \"Here's chocolate... now go hit the gym already.\"\r\n\r\nconsole.log(giveLydiaPizza.prototype)\r\nconsole.log(giveLydiaChocolate.prototype)\r\n",
    "options": [
      {
        "correct": false,
        "text": "`{ constructor: ...}` `{ constructor: ...}`"
      },
      {
        "correct": false,
        "text": "`{}` `{ constructor: ...}`"
      },
      {
        "correct": false,
        "text": "`{ constructor: ...}` `{}`"
      },
      {
        "correct": true,
        "text": "`{ constructor: ...}` `undefined`"
      }
    ],
    "explanation": "常规函数，例如`giveLydiaPizza`函数，有一个`prototype`属性，它是一个带有`constructor`属性的对象（原型对象）。 然而，箭头函数，例如`giveLydiaChocolate`函数，没有这个`prototype`属性。 尝试使用`giveLydiaChocolate.prototype`访问`prototype`属性时会返回`undefined`。"
  },
  {
    "id": 93,
    "title": "93. 输出什么?",
    "code": "const person = {\r\n  name: \"Lydia\",\r\n  age: 21\r\n}\r\n\r\nfor (const [x, y] of Object.entries(person)) {\r\n  console.log(x, y)\r\n}\r\n",
    "options": [
      {
        "correct": true,
        "text": "`name` `Lydia` and `age` `21`"
      },
      {
        "correct": false,
        "text": "`[\"name\", \"Lydia\"]` and `[\"age\", 21]`"
      },
      {
        "correct": false,
        "text": "`[\"name\", \"age\"]` and `undefined`"
      },
      {
        "correct": false,
        "text": "`Error`"
      }
    ],
    "explanation": "`Object.entries()`方法返回一个给定对象自身可枚举属性的键值对数组，上述情况返回一个二维数组，数组每个元素是一个包含键和值的数组：\r\n\r\n`[['name'，'Lydia']，['age'，21]]`\r\n\r\n使用`for-of`循环，我们可以迭代数组中的每个元素，上述情况是子数组。 我们可以使用`const [x，y]`在`for-of`循环中解构子数组。 `x`等于子数组中的第一个元素，`y`等于子数组中的第二个元素。\r\n\r\n第一个子阵列是`[“name”，“Lydia”]`，其中`x`等于`name`，而`y`等于`Lydia`。\r\n第二个子阵列是`[“age”，21]`，其中`x`等于`age`，而`y`等于`21`。"
  },
  {
    "id": 94,
    "title": "94. 输出什么?",
    "code": "function getItems(fruitList, ...args, favoriteFruit) {\r\n  return [...fruitList, ...args, favoriteFruit]\r\n}\r\n\r\ngetItems([\"banana\", \"apple\"], \"pear\", \"orange\")\r\n",
    "options": [
      {
        "correct": false,
        "text": "`[\"banana\", \"apple\", \"pear\", \"orange\"]`"
      },
      {
        "correct": false,
        "text": "`[[\"banana\", \"apple\"], \"pear\", \"orange\"]`"
      },
      {
        "correct": false,
        "text": "`[\"banana\", \"apple\", [\"pear\"], \"orange\"]`"
      },
      {
        "correct": true,
        "text": "`SyntaxError`"
      }
    ],
    "explanation": "`... args`是剩余参数，剩余参数的值是一个包含所有剩余参数的数组，**并且只能作为最后一个参数**。上述示例中，剩余参数是第二个参数，这是不可能的，并会抛出语法错误。\r\n\r\n```javascript\r\nfunction getItems(fruitList, favoriteFruit, ...args) {\r\n  return [...fruitList, ...args, favoriteFruit]\r\n}\r\n\r\ngetItems([\"banana\", \"apple\"], \"pear\", \"orange\")\r\n```\r\n\r\n上述例子是有效的，将会返回数组：`[ 'banana', 'apple', 'orange', 'pear' ]`"
  },
  {
    "id": 95,
    "title": "95. 输出什么?",
    "code": "function nums(a, b) {\r\n  if\r\n  (a > b)\r\n  console.log('a is bigger')\r\n  else \r\n  console.log('b is bigger')\r\n  return \r\n  a + b\r\n}\r\n\r\nconsole.log(nums(4, 2))\r\nconsole.log(nums(1, 2))\r\n",
    "options": [
      {
        "correct": false,
        "text": "`a is bigger`, `6` and `b is bigger`, `3`"
      },
      {
        "correct": true,
        "text": "`a is bigger`, `undefined` and `b is bigger`, `undefined`"
      },
      {
        "correct": false,
        "text": "`undefined` and `undefined`"
      },
      {
        "correct": false,
        "text": "`SyntaxError`"
      }
    ],
    "explanation": "在JavaScript中，我们不必显式地编写分号(`;`)，但是JavaScript引擎仍然在语句之后自动添加分号。这称为**自动分号插入**。例如，一个语句可以是变量，或者像`throw`、`return`、`break`这样的关键字。\r\n\r\n在这里，我们在新的一行上写了一个`return`语句和另一个值`a + b `。然而，由于它是一个新行，引擎并不知道它实际上是我们想要返回的值。相反，它会在`return`后面自动添加分号。你可以这样看:\r\n\r\n```javascript\r\n  return;\r\n  a + b\r\n```\r\n\r\n这意味着永远不会到达`a + b`，因为函数在`return`关键字之后停止运行。如果没有返回值，就像这里，函数返回`undefined`。注意，在`if/else`语句之后没有自动插入!"
  },
  {
    "id": 96,
    "title": "96. 输出什么?",
    "code": "class Person {\r\n  constructor() {\r\n    this.name = \"Lydia\"\r\n  }\r\n}\r\n\r\nPerson = class AnotherPerson {\r\n  constructor() {\r\n    this.name = \"Sarah\"\r\n  }\r\n}\r\n\r\nconst member = new Person()\r\nconsole.log(member.name)\r\n",
    "options": [
      {
        "correct": false,
        "text": "`\"Lydia\"`"
      },
      {
        "correct": true,
        "text": "`\"Sarah\"`"
      },
      {
        "correct": false,
        "text": "`Error: cannot redeclare Person`"
      },
      {
        "correct": false,
        "text": "`SyntaxError`"
      }
    ],
    "explanation": "我们可以将类设置为等于其他类/函数构造函数。 在这种情况下，我们将`Person`设置为`AnotherPerson`。 这个构造函数的名字是`Sarah`，所以新的`Person`实例`member`上的name属性是`Sarah`。"
  },
  {
    "id": 97,
    "title": "97. 输出什么?",
    "code": "const info = {\r\n  [Symbol('a')]: 'b'\r\n}\r\n\r\nconsole.log(info)\r\nconsole.log(Object.keys(info))\r\n",
    "options": [
      {
        "correct": false,
        "text": "`{Symbol('a'): 'b'}` and `[\"{Symbol('a')\"]`"
      },
      {
        "correct": false,
        "text": "`{}` and `[]`"
      },
      {
        "correct": false,
        "text": "`{ a: \"b\" }` and `[\"a\"]`"
      },
      {
        "correct": true,
        "text": "`{Symbol('a'): 'b'}` and `[]`"
      }
    ],
    "explanation": "`Symbol`类型是不可枚举的。`Object.keys`方法返回对象上的所有可枚举的键属性。`Symbol`类型是不可见的，并返回一个空数组。 记录整个对象时，所有属性都是可见的，甚至是不可枚举的属性。\r\n\r\n这是`Symbol`的众多特性之一：除了表示完全唯一的值（防止对象意外名称冲突，例如当使用2个想要向同一对象添加属性的库时），您还可以`隐藏`这种方式对象的属性（尽管不完全。你仍然可以使用`Object.getOwnPropertySymbols()`方法访问 `Symbol`。"
  },
  {
    "id": 98,
    "title": "98. 输出什么?",
    "code": "const getList = ([x, ...y]) => [x, y]\r\nconst getUser = user => { name: user.name, age: user.age }\r\n\r\nconst list = [1, 2, 3, 4]\r\nconst user = { name: \"Lydia\", age: 21 }\r\n\r\nconsole.log(getList(list))\r\nconsole.log(getUser(user))\r\n",
    "options": [
      {
        "correct": true,
        "text": "`[1, [2, 3, 4]]` and `undefined`"
      },
      {
        "correct": false,
        "text": "`[1, [2, 3, 4]]` and `{ name: \"Lydia\", age: 21 }`"
      },
      {
        "correct": false,
        "text": "`[1, 2, 3, 4]` and `{ name: \"Lydia\", age: 21 }`"
      },
      {
        "correct": false,
        "text": "`Error` and `{ name: \"Lydia\", age: 21 }`"
      }
    ],
    "explanation": "`getList`函数接收一个数组作为其参数。 在`getList`函数的括号之间，我们立即解构这个数组。 您可以将其视为：\r\n\r\n `[x, ...y] = [1, 2, 3, 4]`\r\n\r\n\r\n使用剩余的参数`... y`，我们将所有剩余参数放在一个数组中。 在这种情况下，其余的参数是`2`，`3`和`4`。 `y`的值是一个数组，包含所有其余参数。 在这种情况下，`x`的值等于`1`，所以当我们打印`[x，y]`时，会打印`[1，[2,3,4]]`。\r\n\r\n `getUser`函数接收一个对象。对于箭头函数，如果只返回一个值，我们不必编写花括号。但是，如果您想从一个箭头函数返回一个对象，您必须在圆括号之间编写它，否则不会返回任何值!下面的函数将返回一个对象:\r\n\r\n```const getUser = user => ({ name: user.name, age: user.age })```\r\n\r\n由于在这种情况下不返回任何值，因此该函数返回`undefined`。"
  },
  {
    "id": 99,
    "title": "99. 输出什么?",
    "code": "const name = \"Lydia\"\r\n\r\nconsole.log(name())\r\n",
    "options": [
      {
        "correct": false,
        "text": "`SyntaxError`"
      },
      {
        "correct": false,
        "text": "`ReferenceError`"
      },
      {
        "correct": true,
        "text": "`TypeError`"
      },
      {
        "correct": false,
        "text": "`undefined`"
      }
    ],
    "explanation": "变量`name`保存字符串的值，该字符串不是函数，因此无法调用。\r\n\r\n当值不是预期类型时，会抛出`TypeErrors`。 JavaScript期望`name`是一个函数，因为我们试图调用它。 但它是一个字符串，因此抛出`TypeError`：`name is not a function`\r\n\r\n当你编写了一些非有效的JavaScript时，会抛出语法错误，例如当你把`return`这个词写成`retrun`时。\r\n当JavaScript无法找到您尝试访问的值的引用时，抛出`ReferenceErrors`。"
  },
  {
    "id": 100,
    "title": "100. 输出什么?",
    "code": "// 🎉✨ This is my 100th question! ✨🎉\r\n\r\nconst output = `${[] && 'Im'}possible!\r\nYou should${'' && `n't`} see a therapist after so much JavaScript lol`\r\n",
    "options": [
      {
        "correct": false,
        "text": "`possible! You should see a therapist after so much JavaScript lol`"
      },
      {
        "correct": true,
        "text": "`Impossible! You should see a therapist after so much JavaScript lol`"
      },
      {
        "correct": false,
        "text": "`possible! You shouldn't see a therapist after so much JavaScript lol`"
      },
      {
        "correct": false,
        "text": "`Impossible! You shouldn't see a therapist after so much JavaScript lol`"
      }
    ],
    "explanation": "`[]`是一个真值。 使用`&&`运算符，如果左侧值是真值，则返回右侧值。 在这种情况下，左侧值`[]`是一个真值，所以返回`Im`。\r\n\r\n`\"\"`是一个假值。 如果左侧值是假的，则不返回任何内容。 `n't`不会被退回。"
  },
  {
    "id": 101,
    "title": "101.输出什么?",
    "code": "const one = (false || {} || null)\r\nconst two = (null || false || \"\")\r\nconst three = ([] || 0 || true)\r\n\r\nconsole.log(one, two, three)\r\n",
    "options": [
      {
        "correct": false,
        "text": "`false` `null` `[]`"
      },
      {
        "correct": false,
        "text": "`null` `\"\"` `true`"
      },
      {
        "correct": true,
        "text": "`{}` `\"\"` `[]`"
      },
      {
        "correct": false,
        "text": "`null` `null` `true`"
      }
    ],
    "explanation": "使用`||`运算符，我们可以返回第一个真值。 如果所有值都是假值，则返回最后一个值。\r\n\r\n`（false || {} || null）`：空对象`{}`是一个真值。 这是第一个（也是唯一的）真值，它将被返回。`one`等于`{}`。\r\n\r\n`（null || false ||“”）`：所有值都是假值。 这意味着返回传递的值`\"\"`。 `two`等于`\"\"`。\r\n\r\n`（[] || 0 ||“”）`：空数组`[]`是一个真值。 这是第一个返回的真值。 `three`等于`[]`。"
  },
  {
    "id": 102,
    "title": "102. 依次输出什么?",
    "code": "const myPromise = () => Promise.resolve('I have resolved!')\r\n\r\nfunction firstFunction() {\r\n  myPromise().then(res => console.log(res))\r\n  console.log('second')\r\n}\r\n\r\nasync function secondFunction() {\r\n  console.log(await myPromise())\r\n  console.log('second')\r\n}\r\n\r\nfirstFunction()\r\nsecondFunction()\r\n",
    "options": [
      {
        "correct": false,
        "text": "`I have resolved!`, `second` and `I have resolved!`, `second`"
      },
      {
        "correct": false,
        "text": "`second`, `I have resolved!` and `second`, `I have resolved!`"
      },
      {
        "correct": false,
        "text": "`I have resolved!`, `second` and `second`, `I have resolved!`"
      },
      {
        "correct": true,
        "text": "`second`, `I have resolved!` and `I have resolved!`, `second`"
      }
    ],
    "explanation": "有了promise，我们通常会说：当我想要调用某个方法，但是由于它可能需要一段时间，因此暂时将它放在一边。只有当某个值被resolved/rejected，并且执行栈为空时才使用这个值。\r\n\r\n我们可以在`async`函数中通过`.then`和`await`关键字获得该值。 尽管我们可以通过`.then`和`await`获得promise的价值，但是它们的工作方式有所不同。\r\n\r\n在 `firstFunction`中，当运行到`myPromise`方法时我们将其放在一边，即promise进入微任务队列，其他后面的代码（`console.log('second')`）照常运行，因此`second`被打印出，`firstFunction`方法到此执行完毕，执行栈中宏任务队列被清空，此时开始执行微任务队列中的任务，`I have resolved`被打印出。\r\n\r\n在`secondFunction`方法中，我们通过`await`关键字，暂停了后面代码的执行，直到异步函数的值被解析才开始后面代码的执行。这意味着，它会等着直到 `myPromise` 以值`I have resolved`被解决之后，下一行`second`才开始执行。"
  },
  {
    "id": 103,
    "title": "103. 输出什么?",
    "code": "const set = new Set()\r\n\r\nset.add(1)\r\nset.add(\"Lydia\")\r\nset.add({ name: \"Lydia\" })\r\n\r\nfor (let item of set) {\r\n  console.log(item + 2)\r\n}\r\n",
    "options": [
      {
        "correct": false,
        "text": "`3`, `NaN`, `NaN`"
      },
      {
        "correct": false,
        "text": "`3`, `7`, `NaN`"
      },
      {
        "correct": true,
        "text": "`3`, `Lydia2`, `[Object object]2`"
      },
      {
        "correct": false,
        "text": "`\"12\"`, `Lydia2`, `[Object object]2`"
      }
    ],
    "explanation": "“+”运算符不仅用于添加数值，还可以使用它来连接字符串。 每当JavaScript引擎发现一个或多个值不是数字时，就会将数字强制为字符串。 \r\n\r\n第一个是数字1。 1 + 2返回数字3。\r\n\r\n但是，第二个是字符串“Lydia”。 “Lydia”是一个字符串，2是一个数字：2被强制转换为字符串。 “Lydia”和“2”被连接起来，产生字符串“Lydia2”。\r\n\r\n`{name：“ Lydia”}`是一个对象。 数字和对象都不是字符串，因此将二者都字符串化。 每当我们对常规对象进行字符串化时，它就会变成`[Object object]`。 与“2”串联的“ [Object object]”成为“[Object object]2”。"
  },
  {
    "id": 104,
    "title": "104. 结果是什么?",
    "code": "Promise.resolve(5)\r\n",
    "options": [
      {
        "correct": false,
        "text": "`5`"
      },
      {
        "correct": false,
        "text": "`Promise {<pending>: 5}`"
      },
      {
        "correct": true,
        "text": "`Promise {<resolved>: 5}`"
      },
      {
        "correct": false,
        "text": "`Error`"
      }
    ],
    "explanation": "我们可以将我们想要的任何类型的值传递`Promise.resolve`，无论是否`promise`。 该方法本身返回带有已解析值的`Promise`。 如果您传递常规函数，它将是具有常规值的已解决`promise`。 如果你通过了promise，它将是一个已经resolved的且带有传的值的promise。\r\n\r\n上述情况，我们传了数字5，因此返回一个resolved状态的promise，resolve值为`5`"
  },
  {
    "id": 105,
    "title": "105. 输出什么?",
    "code": "function compareMembers(person1, person2 = person) {\r\n  if (person1 !== person2) {\r\n    console.log(\"Not the same!\")\r\n  } else {\r\n    console.log(\"They are the same!\")\r\n  }\r\n}\r\n\r\nconst person = { name: \"Lydia\" }\r\n\r\ncompareMembers(person)\r\n",
    "options": [
      {
        "correct": false,
        "text": "`Not the same!`"
      },
      {
        "correct": true,
        "text": "`They are the same!`"
      },
      {
        "correct": false,
        "text": "`ReferenceError`"
      },
      {
        "correct": false,
        "text": "`SyntaxError`"
      }
    ],
    "explanation": "对象通过引用传递。 当我们检查对象的严格相等性（===）时，我们正在比较它们的引用。\r\n\r\n我们将“person2”的默认值设置为“person”对象，并将“person”对象作为“person1”的值传递。\r\n\r\n这意味着两个值都引用内存中的同一位置，因此它们是相等的。\r\n\r\n运行“ else”语句中的代码块，并记录`They are the same!` 。"
  },
  {
    "id": 106,
    "title": "106. 输出什么?",
    "code": "const colorConfig = {\r\n  red: true,\r\n  blue: false,\r\n  green: true,\r\n  black: true,\r\n  yellow: false,\r\n}\r\n\r\nconst colors = [\"pink\", \"red\", \"blue\"]\r\n\r\nconsole.log(colorConfig.colors[1])\r\n",
    "options": [
      {
        "correct": false,
        "text": "`true`"
      },
      {
        "correct": false,
        "text": "`false`"
      },
      {
        "correct": false,
        "text": "`undefined`"
      },
      {
        "correct": true,
        "text": "`TypeError`"
      }
    ],
    "explanation": "在JavaScript中，我们有两种访问对象属性的方法：括号表示法或点表示法。 在此示例中，我们使用点表示法（`colorConfig.colors`）代替括号表示法（`colorConfig [“ colors”]`）。\r\n\r\n使用点表示法，JavaScript会尝试使用该确切名称在对象上查找属性。 在此示例中，JavaScript尝试在colorconfig对象上找到名为colors的属性。 没有名为“colors”的属性，因此返回“undefined”。\r\n然后，我们尝试使用`[1]`访问第一个元素的值。 我们无法对未定义的值执行此操作，因此会抛出`Cannot read property '1' of undefined`。\r\n\r\nJavaScript解释（或取消装箱）语句。 当我们使用方括号表示法时，它会看到第一个左方括号`[`并一直进行下去，直到找到右方括号`]`。 只有这样，它才会评估该语句。 如果我们使用了colorConfig [colors [1]]，它将返回colorConfig对象上red属性的值。"
  },
  {
    "id": 107,
    "title": "107. 输出什么?",
    "code": "console.log('❤️' === '❤️')\r\n",
    "options": [
      {
        "correct": true,
        "text": "`true`"
      },
      {
        "correct": false,
        "text": "`false`"
      }
    ],
    "explanation": "在内部，表情符号是unicode。 heat表情符号的unicode是`“ U + 2764 U + FE0F”`。 对于相同的表情符号，它们总是相同的，因此我们将两个相等的字符串相互比较，这将返回true。"
  },
  {
    "id": 108,
    "title": "108. 哪些方法修改了原数组?",
    "code": "const emojis = ['✨', '🥑', '😍']\r\n\r\nemojis.map(x => x + '✨')\r\nemojis.filter(x => x !== '🥑')\r\nemojis.find(x => x !== '🥑')\r\nemojis.reduce((acc, cur) => acc + '✨')\r\nemojis.slice(1, 2, '✨') \r\nemojis.splice(1, 2, '✨')\r\n",
    "options": [
      {
        "correct": false,
        "text": "`All of them`"
      },
      {
        "correct": false,
        "text": "`map` `reduce` `slice` `splice`"
      },
      {
        "correct": false,
        "text": "`map` `slice` `splice`"
      },
      {
        "correct": true,
        "text": "`splice`"
      }
    ],
    "explanation": "使用`splice`方法，我们通过删除，替换或添加元素来修改原始数组。 在这种情况下，我们从索引1中删除了2个元素（我们删除了`'🥑'`和`'😍'`），同时添加了✨emoji表情。\r\n\r\n`map`，`filter`和`slice`返回一个新数组，`find`返回一个元素，而`reduce`返回一个减小的值。"
  },
  {
    "id": 109,
    "title": "109. 输出什么?",
    "code": "const food = ['🍕', '🍫', '🥑', '🍔']\r\nconst info = { favoriteFood: food[0] }\r\n\r\ninfo.favoriteFood = '🍝'\r\n\r\nconsole.log(food)\r\n",
    "options": [
      {
        "correct": true,
        "text": "`['🍕', '🍫', '🥑', '🍔']`"
      },
      {
        "correct": false,
        "text": "`['🍝', '🍫', '🥑', '🍔']`"
      },
      {
        "correct": false,
        "text": "`['🍝', '🍕', '🍫', '🥑', '🍔']`"
      },
      {
        "correct": false,
        "text": "`ReferenceError`"
      }
    ],
    "explanation": "我们将`info`对象上的`favoriteFood`属性的值设置为披萨表情符号“🍕”的字符串。字符串是原始数据类型。在JavaScript中，原始数据类型通过值起作用\r\n\r\n在这种情况下，我们将`info`对象上的`favoriteFood`属性的值设置为等于`food`数组中的第一个元素的值，字符串为披萨表情符号（`'🍕'` ）。字符串是原始数据类型，并且通过值进行交互，我们更改`info`对象上`favoriteFood`属性的值。 food数组没有改变，因为favoriteFood的值只是该数组中第一个元素的值的复制，并且与该元素上的元素没有相同的内存引用食物`[0]`。当我们记录食物时，它仍然是原始数组`['🍕'，'🍫'，'🥑'，'🍔']`。"
  },
  {
    "id": 110,
    "title": "110. 这个函数干了什么?",
    "code": "JSON.parse()\r\n",
    "options": [
      {
        "correct": true,
        "text": "Parses JSON to a JavaScript value"
      },
      {
        "correct": false,
        "text": "Parses a JavaScript object to JSON"
      },
      {
        "correct": false,
        "text": "Parses any JavaScript value to JSON"
      },
      {
        "correct": false,
        "text": "Parses JSON to a JavaScript object only"
      }
    ],
    "explanation": "使用`JSON.parse()`方法，我们可以将JSON字符串解析为JavaScript值。\r\n\r\n```javascript\r\n// 将数字字符串化为有效的JSON，然后将JSON字符串解析为JavaScript值:\r\nconst jsonNumber = JSON.stringify(4) // '4'\r\nJSON.parse(jsonNumber) // 4\r\n\r\n// 将数组值字符串化为有效的JSON，然后将JSON字符串解析为JavaScript值:\r\nconst jsonArray = JSON.stringify([1, 2, 3]) // '[1, 2, 3]'\r\nJSON.parse(jsonArray) // [1, 2, 3]\r\n\r\n// 将对象字符串化为有效的JSON，然后将JSON字符串解析为JavaScript值:\r\nconst jsonArray = JSON.stringify({ name: \"Lydia\" }) // '{\"name\":\"Lydia\"}'\r\nJSON.parse(jsonArray) // { name: 'Lydia' }\r\n```"
  },
  {
    "id": 111,
    "title": "111. 输出什么?",
    "code": "let name = 'Lydia'\r\n\r\nfunction getName() {\r\n  console.log(name)\r\n  let name = 'Sarah'\r\n}\r\n\r\ngetName()\r\n",
    "options": [
      {
        "correct": false,
        "text": "Lydia"
      },
      {
        "correct": false,
        "text": "Sarah"
      },
      {
        "correct": false,
        "text": "`undefined`"
      },
      {
        "correct": false,
        "text": "`ReferenceError`"
      }
    ],
    "explanation": "每个函数都有其自己的执行上下文。 `getName`函数首先在其自身的上下文（范围）内查找，以查看其是否包含我们尝试访问的变量`name`。 上述情况，`getName`函数包含其自己的`name`变量：我们用`let`关键字和`Sarah`的值声明变量`name`。\r\n\r\n带有`let`关键字（和`const`）的变量被提升，但是与`var`不同，它不会被***初始化***。 在我们声明（初始化）它们之前，无法访问它们。 这称为“暂时性死区”。 当我们尝试在声明变量之前访问变量时，JavaScript会抛出`ReferenceError: Cannot access 'name' before initialization`。\r\n\r\n如果我们不在`getName`函数中声明`name`变量，则javascript引擎会查看原型练。会找到其外部作用域有一个名为`name`的变量，其值为`Lydia`。 在这种情况下，它将打印`Lydia`：\r\n\r\n```javascript\r\nlet name = 'Lydia'\r\n\r\nfunction getName() {\r\n  console.log(name)\r\n}\r\n\r\ngetName() // Lydia\r\n```"
  },
  {
    "id": 112,
    "title": "112. 输出什么？",
    "code": "function* generatorOne() {\r\n  yield ['a', 'b', 'c'];\r\n}\r\n\r\nfunction* generatorTwo() {\r\n  yield* ['a', 'b', 'c'];\r\n}\r\n\r\nconst one = generatorOne()\r\nconst two = generatorTwo()\r\n\r\nconsole.log(one.next().value)\r\nconsole.log(two.next().value)\r\n",
    "options": [
      {
        "correct": false,
        "text": "`a` and `a`"
      },
      {
        "correct": false,
        "text": "`a` and `undefined`"
      },
      {
        "correct": true,
        "text": "`['a', 'b', 'c']` and `a`"
      },
      {
        "correct": false,
        "text": "`a` and `['a', 'b', 'c']`"
      }
    ],
    "explanation": "通过 `yield` 关键字, 我们在 `Generator` 函数里执行`yield`表达式. 通过 `yield*` 关键字, 我们可以在一个`Generator` 函数里面执行（`yield`表达式）另一个 `Generator` 函数, 或可遍历的对象 (如数组).\r\n\r\n在函数 `generatorOne` 中, 我们通过 `yield` 关键字 yield 了一个完整的数组 `['a', 'b', 'c']`。函数`one`通过`next`方法返回的对象的`value` 属性的值 (`one.next().value`) 等价于数组 `['a', 'b', 'c']`.\r\n\r\n```javascript\r\nconsole.log(one.next().value) // ['a', 'b', 'c']\r\nconsole.log(one.next().value) // undefined\r\n```\r\n\r\n在函数 `generatorTwo` 中, 我们使用 `yield*` 关键字。就相当于函数`two`第一个`yield`的值, 等价于在迭代器中第一个 `yield` 的值。数组`['a', 'b', 'c']`就是这个迭代器. 第一个 `yield` 的值就是 `a`, 所以我们第一次调用 `two.next().value`时, 就返回`a`。\r\n\r\n```javascript\r\nconsole.log(two.next().value) // 'a'\r\nconsole.log(two.next().value) // 'b'\r\nconsole.log(two.next().value) // 'c'\r\nconsole.log(two.next().value) // undefined\r\n```"
  },
  {
    "id": 113,
    "title": "113. 输出什么？",
    "code": "console.log(`${(x => x)('I love')} to program`)\r\n",
    "options": [
      {
        "correct": true,
        "text": "`I love to program`"
      },
      {
        "correct": false,
        "text": "`undefined to program`"
      },
      {
        "correct": false,
        "text": "`${(x => x)('I love') to program`"
      },
      {
        "correct": false,
        "text": "`TypeError`"
      }
    ],
    "explanation": "带有模板字面量的表达式首先被执行。相当于字符串会包含表达式，这个立即执行函数 `(x => x)('I love')` 返回的值. 我们向箭头函数 `x => x` 传递 `'I love'` 作为参数。`x` 等价于返回的 `'I love'`。这就是结果 `I love to program`。"
  },
  {
    "id": 114,
    "title": "114. 将会发生什么?",
    "code": "let config = {\r\n  alert: setInterval(() => {\r\n    console.log('Alert!')\r\n  }, 1000)\r\n}\r\n\r\nconfig = null\r\n",
    "options": [
      {
        "correct": false,
        "text": "`setInterval` 的回调不会被调用"
      },
      {
        "correct": false,
        "text": "`setInterval` 的回调被调用一次"
      },
      {
        "correct": true,
        "text": "`setInterval` 的回调仍然会被每秒钟调用"
      },
      {
        "correct": false,
        "text": "我们从没调用过 `config.alert()`, config 为 `null`"
      }
    ],
    "explanation": "一般情况下当我们将对象赋值为 `null`, 那些对象会被进行 _垃圾回收（garbage collected）_ 因为已经没有对这些对象的引用了。然而，`setInterval`的参数是一个箭头函数（所以上下文绑定到对象 `config` 了），回调函数仍然保留着对 `config`的引用。只要存在引用，对象就不会被垃圾回收。因为没有被垃圾回收，`setInterval` 的回调每1000ms (1s)会被调用一次。"
  },
  {
    "id": 115,
    "title": "115. 哪一个方法会返回 `'Hello world!'` ？",
    "code": "const myMap = new Map()\r\nconst myFunc = () => 'greeting'\r\n\r\nmyMap.set(myFunc, 'Hello world!')\r\n\r\n//1\r\nmyMap.get('greeting')\r\n//2\r\nmyMap.get(myFunc)\r\n//3\r\nmyMap.get(() => 'greeting')\r\n",
    "options": [
      {
        "correct": false,
        "text": "1"
      },
      {
        "correct": true,
        "text": "2"
      },
      {
        "correct": false,
        "text": "2 and 3"
      },
      {
        "correct": false,
        "text": "All of them"
      }
    ],
    "explanation": "当通过 `set` 方法添加一个键值对，一个传递给 `set`方法的参数将会是键名，第二个参数将会是值。在这个case里，键名为 _函数_ `() => 'greeting'`，值为`'Hello world'`。 `myMap` 现在就是 `{ () => 'greeting' => 'Hello world!' }`。\r\n\r\n1 是错的，因为键名不是 `'greeting'` 而是 `() => 'greeting'`。\r\n3 是错的，因为我们给`get` 方法传递了一个新的函数。对象受 _引用_ 影响。函数也是对象，因此两个函数严格上并不等价，尽管他们相同：他们有两个不同的内存引用地址。"
  },
  {
    "id": 116,
    "title": "116. 输出什么？",
    "code": "const person = {\r\n  name: \"Lydia\",\r\n  age: 21\r\n}\r\n\r\nconst changeAge = (x = { ...person }) => x.age += 1\r\nconst changeAgeAndName = (x = { ...person }) => {\r\n  x.age += 1\r\n  x.name = \"Sarah\"\r\n}\r\n\r\nchangeAge(person)\r\nchangeAgeAndName()\r\n\r\nconsole.log(person)\r\n",
    "options": [
      {
        "correct": false,
        "text": "`{name: \"Sarah\", age: 22}`"
      },
      {
        "correct": false,
        "text": "`{name: \"Sarah\", age: 23}`"
      },
      {
        "correct": true,
        "text": "`{name: \"Lydia\", age: 22}`"
      },
      {
        "correct": false,
        "text": "`{name: \"Lydia\", age: 23}`"
      }
    ],
    "explanation": "函数 `changeAge` 和函数 `changeAgeAndName` 有着不同的参数，定义一个 _新_ 生成的对象 `{ ...person }`。这个对象有着所有 `person` 对象 中 k/v 值的副本。\r\n\r\n首项, 我们调用 `changeAge` 函数并传递 `person` 对象作为它的参数。这个函数对 `age` 属性进行加一操作。`person` 现在是 `{ name: \"Lydia\", age: 22 }`。\r\n\r\n然后，我们调用函数 `changeAgeAndName` ，然而我们没有传递参数。取而代之，`x` 的值等价 _new_ 生成的对象: `{ ...person }`。因为它是一个新生成的对象，它并不会对对象 `person` 造成任何副作用。`person` 仍然等价于 `{ name: \"Lydia\", age: 22 }`。"
  },
  {
    "id": 117,
    "title": "117. 下面那个选项将会返回 `6`?",
    "code": "function sumValues(x, y, z) {\r\n\treturn x + y + z;\r\n}\r\n",
    "options": [
      {
        "correct": false,
        "text": "`sumValues([...1, 2, 3])`"
      },
      {
        "correct": false,
        "text": "`sumValues([...[1, 2, 3]])`"
      },
      {
        "correct": true,
        "text": "`sumValues(...[1, 2, 3])`"
      },
      {
        "correct": false,
        "text": "`sumValues([1, 2, 3])`"
      }
    ],
    "explanation": "通过展开操作符 `...`，我们可以 _暂开_ 单个可迭代的元素。函数 `sumValues` function 接收三个参数： `x`, `y` 和 `z`。`...[1, 2, 3]` 的执行结果为 `1, 2, 3`，将会传递给函数 `sumValues`。"
  },
  {
    "id": 118,
    "title": "118. 输出什么？",
    "code": "let num = 1;\r\nconst list = [\"🥳\", \"🤠\", \"🥰\", \"🤪\"];\r\n\r\nconsole.log(list[(num += 1)]);\r\n",
    "options": [
      {
        "correct": false,
        "text": "`🤠`"
      },
      {
        "correct": true,
        "text": "`🥰`"
      },
      {
        "correct": false,
        "text": "`SyntaxError`"
      },
      {
        "correct": false,
        "text": "`ReferenceError`"
      }
    ],
    "explanation": "通过 `+=` 操作符，我们对值 `num` 进行加 `1` 操作。 `num` 有初始值 `1`，因此 `1 + 1` 的执行结果为 `2`。数组 `list` 的第二项为 🥰，`console.log(list[2])` 输出 🥰."
  },
  {
    "id": 119,
    "title": "119. 输出什么？",
    "code": "const person = {\r\n\tfirstName: \"Lydia\",\r\n\tlastName: \"Hallie\",\r\n\tpet: {\r\n\t\tname: \"Mara\",\r\n\t\tbreed: \"Dutch Tulip Hound\"\r\n\t},\r\n\tgetFullName() {\r\n\t\treturn `${this.firstName} ${this.lastName}`;\r\n\t}\r\n};\r\n\r\nconsole.log(person.pet?.name);\r\nconsole.log(person.pet?.family?.name);\r\nconsole.log(person.getFullName?.());\r\nconsole.log(member.getLastName?.());\r\n",
    "options": [
      {
        "correct": false,
        "text": "`undefined` `undefined` `undefined` `undefined`"
      },
      {
        "correct": true,
        "text": "`Mara` `undefined` `Lydia Hallie` `undefined`"
      },
      {
        "correct": false,
        "text": "`Mara` `null` `Lydia Hallie` `null`"
      },
      {
        "correct": false,
        "text": "`null` `ReferenceError` `null` `ReferenceError`"
      }
    ],
    "explanation": "通过 ES10 或 TS3.7+[可选链操作符 `?.`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/%E5%8F%AF%E9%80%89%E9%93%BE)，我们不再需要显式检测更深层的嵌套值是否有效。如果我们尝试获取 `undefined` 或 `null` 的值 (_nullish_)，表达将会短路并返回 `undefined`.\r\n\r\n`person.pet?.name`： `person` 有一个名为 `pet` 的属性： `person.pet` 不是 nullish。它有个名为 `name` 的属性，并返回字符串 `Mara`。\r\n`person.pet?.family?.name`： `person` 有一个名为 `pet` 的属性： `person.pet` 不是 nullish. `pet` _并没有_ 一个名为 `family` 的属性, `person.pet.family` 是 nullish。表达式返回 `undefined`。\r\n`person.getFullName?.()`： `person` 有一个名为 `getFullName` 的属性： `person.getFullName()` 不是 nullish 并可以被调用，返回字符串 `Lydia Hallie`。\r\n`member.getLastName?.()`: `member` is not defined: `member.getLastName()` is nullish. The expression returns `undefined`."
  },
  {
    "id": 120,
    "title": "120. 输出什么？",
    "code": "const groceries = [\"banana\", \"apple\", \"peanuts\"];\r\n\r\nif (groceries.indexOf(\"banana\")) {\r\n\tconsole.log(\"We have to buy bananas!\");\r\n} else {\r\n\tconsole.log(`We don't have to buy bananas!`);\r\n}\r\n",
    "options": [
      {
        "correct": false,
        "text": "We have to buy bananas!"
      },
      {
        "correct": true,
        "text": "We don't have to buy bananas"
      },
      {
        "correct": false,
        "text": "`undefined`"
      },
      {
        "correct": false,
        "text": "`1`"
      }
    ],
    "explanation": "我们传递了一个状态 `groceries.indexOf(\"banana\")` 给if条件语句。`groceries.indexOf(\"banana\")` 返回 `0`， 一个 falsy 的值。因为if条件语句的状态为 falsy，`else` 块区内的代码执行，并且 `We don't have to buy bananas!` 被输出."
  },
  {
    "id": 121,
    "title": "121. 输出什么?",
    "code": "const config = {\r\n\tlanguages: [],\r\n\tset language(lang) {\r\n\t\treturn this.languages.push(lang);\r\n\t}\r\n};\r\n\r\nconsole.log(config.language);\r\n",
    "options": [
      {
        "correct": false,
        "text": "`function language(lang) { this.languages.push(lang }`"
      },
      {
        "correct": false,
        "text": "`0`"
      },
      {
        "correct": false,
        "text": "`[]`"
      },
      {
        "correct": true,
        "text": "`undefined`"
      }
    ],
    "explanation": "方法 `language` 是一个 `setter`。Setters 并不保存一个实际值，它们的使命在于 _修改_ 属性。当调用方法 `setter`， 返回 `undefined`。"
  },
  {
    "id": 122,
    "title": "122. 输出什么？",
    "code": "const name = \"Lydia Hallie\";\r\n\r\nconsole.log(!typeof name === \"object\");\r\nconsole.log(!typeof name === \"string\");\r\n",
    "options": [
      {
        "correct": false,
        "text": "`false` `true`"
      },
      {
        "correct": false,
        "text": "`true` `false`"
      },
      {
        "correct": true,
        "text": "`false` `false`"
      },
      {
        "correct": false,
        "text": "`true` `true`"
      }
    ],
    "explanation": "`typeof name` 返回 `\"string\"`。字符串 `\"string\"` 是一个 truthy 的值，因此 `!typeof name` 返回一个布尔值 `false`。 `false === \"object\"` 和 `false === \"string\"` 都返回 `false`。\r\n\r\n（如果我们想检测一个值的类型，我们不应该用 `!==` 而不是 `!typeof`）"
  },
  {
    "id": 123,
    "title": "123. 输出什么?",
    "code": "const add = x => y => z => {\r\n\tconsole.log(x, y, z);\r\n\treturn x + y + z;\r\n};\r\n\r\nadd(4)(5)(6);\r\n",
    "options": [
      {
        "correct": true,
        "text": "`4` `5` `6`"
      },
      {
        "correct": false,
        "text": "`6` `5` `4`"
      },
      {
        "correct": false,
        "text": "`4` `function` `function`"
      },
      {
        "correct": false,
        "text": "`undefined` `undefined` `6`"
      }
    ],
    "explanation": "函数 `add` 是一个返回 返回箭头函数的箭头函数 的箭头函数（still with me?）。第一个函数接收一个值为 `4` 的参数 `x`。我们调用第二个函数，它接收一个值为 `5` 的参数 `y`。然后我们调用第三个函数，它接收一个值为 `6` 的参数 `z`。当我们尝试在最后一个箭头函数中获取 `x`, `y` 和 `z` 的值，JS 引擎根据作用域链去找 `x` 和 `y` 的值。得到 `4` `5` `6`."
  },
  {
    "id": 124,
    "title": "124. 输出什么？",
    "code": "async function* range(start, end) {\r\n\tfor (let i = start; i <= end; i++) {\r\n\t\tyield Promise.resolve(i);\r\n\t}\r\n}\r\n\r\n(async () => {\r\n\tconst gen = range(1, 3);\r\n\tfor await (const item of gen) {\r\n\t\tconsole.log(item);\r\n\t}\r\n})();\r\n",
    "options": [
      {
        "correct": false,
        "text": "`Promise {1}` `Promise {2}` `Promise {3}`"
      },
      {
        "correct": false,
        "text": "`Promise {<pending>}` `Promise {<pending>}` `Promise {<pending>}`"
      },
      {
        "correct": true,
        "text": "`1` `2` `3`"
      },
      {
        "correct": false,
        "text": "`undefined` `undefined` `undefined`"
      }
    ],
    "explanation": "我们给 函数range 传递： `Promise{1}`, `Promise{2}`, `Promise{3}`，Generator 函数 `range` 返回一个全是 async object promise 数组。我们将 async object 赋值给变量 `gen`，之后我们使用`for await ... of` 进行循环遍历。我们将返回的 Promise 实例赋值给 `item`： 第一个返回 `Promise{1}`， 第二个返回 `Promise{2}`，之后是 `Promise{3}`。因为我们正 _awaiting_ `item` 的值，resolved 状态的 promsie，promise数组的resolved _值_ 以此为： `1`，`2`，`3`."
  },
  {
    "id": 125,
    "title": "125. 输出什么？",
    "code": "const myFunc = ({ x, y, z }) => {\r\n\tconsole.log(x, y, z);\r\n};\r\n\r\nmyFunc(1, 2, 3);\r\n",
    "options": [
      {
        "correct": false,
        "text": "`1` `2` `3`"
      },
      {
        "correct": false,
        "text": "`{1: 1}` `{2: 2}` `{3: 3}`"
      },
      {
        "correct": false,
        "text": "`{ 1: undefined }` `undefined` `undefined`"
      },
      {
        "correct": true,
        "text": "`undefined` `undefined` `undefined`"
      }
    ],
    "explanation": "`myFunc` 期望接收一个包含 `x`, `y` 和 `z` 属性的对象作为它的参数。因为我们仅仅传递三个单独的数字值 (1, 2, 3) 而不是一个含有 `x`, `y` 和 `z` 属性的对象 ({x: 1, y: 2, z: 3})， `x`, `y` 和 `z` 有着各自的默认值 `undefined`."
  },
  {
    "id": 126,
    "title": "126. 输出什么？",
    "code": "function getFine(speed, amount) {\r\n  const formattedSpeed = new Intl.NumberFormat({\r\n    'en-US',\r\n    { style: 'unit', unit: 'mile-per-hour' }\r\n  }).format(speed)\r\n\r\n  const formattedAmount = new Intl.NumberFormat({\r\n    'en-US',\r\n    { style: 'currency', currency: 'USD' }\r\n  }).format(amount)\r\n\r\n  return `The driver drove ${formattedSpeed} and has to pay ${formattedAmount}`\r\n}\r\n\r\nconsole.log(getFine(130, 300))\r\n",
    "options": [
      {
        "correct": false,
        "text": "The driver drove 130 and has to pay 300"
      },
      {
        "correct": true,
        "text": "The driver drove 130 mph and has to pay \\$300.00"
      },
      {
        "correct": false,
        "text": "The driver drove undefined and has to pay undefined"
      },
      {
        "correct": false,
        "text": "The driver drove 130.00 and has to pay 300.00"
      }
    ],
    "explanation": "通过方法 `Intl.NumberFormat`，我们可以格式化任意区域的数字值。我们对数字值 `130` 进行 `mile-per-hour` 作为 `unit` 的 `en-US` 区域 格式化，结果为 `130 mph`。对数字值 `300` 进行 `USD` 作为 `currentcy` 的 `en-US` 区域格式化，结果为 `$300.00`."
  },
  {
    "id": 127,
    "title": "127. 输出什么？",
    "code": "const spookyItems = [\"👻\", \"🎃\", \"🕸\"];\r\n({ item: spookyItems[3] } = { item: \"💀\" });\r\n\r\nconsole.log(spookyItems);\r\n",
    "options": [
      {
        "correct": false,
        "text": "`[\"👻\", \"🎃\", \"🕸\"]`"
      },
      {
        "correct": true,
        "text": "`[\"👻\", \"🎃\", \"🕸\", \"💀\"]`"
      },
      {
        "correct": false,
        "text": "`[\"👻\", \"🎃\", \"🕸\", { item: \"💀\" }]`"
      },
      {
        "correct": false,
        "text": "`[\"👻\", \"🎃\", \"🕸\", \"[object Object]\"]`"
      }
    ],
    "explanation": "通过解构对象们，我们可以从右手边的对象中拆出值，并且将拆出的值分配给左手边对象同名的属性。在这种情况下，我们将值 \"💀\" 分配给 `spookyItems[3]`。相当于我们正在篡改数组 `spookyItems`，我们给它添加了值 \"💀\"。当输出 `spookyItems` 时，结果为 `[\"👻\", \"🎃\", \"🕸\", \"💀\"]`。"
  },
  {
    "id": 128,
    "title": "128. 输出什么？",
    "code": "const name = \"Lydia Hallie\";\r\nconst age = 21;\r\n\r\nconsole.log(Number.isNaN(name));\r\nconsole.log(Number.isNaN(age));\r\n\r\nconsole.log(isNaN(name));\r\nconsole.log(isNaN(age));\r\n",
    "options": [
      {
        "correct": false,
        "text": "`true` `false` `true` `false`"
      },
      {
        "correct": false,
        "text": "`true` `false` `false` `false`"
      },
      {
        "correct": true,
        "text": "`false` `false` `true` `false`"
      },
      {
        "correct": false,
        "text": "`false` `true` `false` `true`"
      }
    ],
    "explanation": "通过方法 `Number.isNaN`，你可以检测你传递的值是否为 _数字值_ 并且是否等价于 `NaN`。`name` 不是一个数字值，因此 `Number.isNaN(name)` 返回 `false`。`age` 是一个数字值，但它不等价于 `NaN`，因此 `Number.isNaN(age)` 返回 `false`.\r\n\r\n通过方法 `isNaN`， 你可以检测你传递的值是否一个 number。`name` 不是一个 `number`，因此 `isNaN(name)` 返回 `true`. `age` 是一个 `number` 因此 `isNaN(age)` 返回 `false`."
  },
  {
    "id": 129,
    "title": "129. 输出什么？",
    "code": "const randomValue = 21;\r\n\r\nfunction getInfo() {\r\n\tconsole.log(typeof randomValue);\r\n\tconst randomValue = \"Lydia Hallie\";\r\n}\r\n\r\ngetInfo();\r\n",
    "options": [
      {
        "correct": false,
        "text": "`\"number\"`"
      },
      {
        "correct": false,
        "text": "`\"string\"`"
      },
      {
        "correct": false,
        "text": "`undefined`"
      },
      {
        "correct": true,
        "text": "`ReferenceError`"
      }
    ],
    "explanation": "通过 `const` 关键字声明的变量在被初始化之前不可被引用：这被称之为 _暂时性死去_。在函数 `getInfo` 中, 变量 `randomValue` 声明在`getInfo` 的作用域的此法环境中。在想要对 `typeof randomValue` 进行log之前，变量 `randomValue` 仍未被初始化： 错误`ReferenceError` 被抛出! JS引擎并不会根据作用域链网上寻找该变量，因为我们已经在 `getInfo` 函数中声明了 `randomValue` 变量。"
  },
  {
    "id": 130,
    "title": "130. 输出什么？",
    "code": "const myPromise = Promise.resolve(\"Woah some cool data\");\r\n\r\n(async () => {\r\n\ttry {\r\n\t\tconsole.log(await myPromise);\r\n\t} catch {\r\n\t\tthrow new Error(`Oops didn't work`);\r\n\t} finally {\r\n\t\tconsole.log(\"Oh finally!\");\r\n\t}\r\n})();\r\n",
    "options": [
      {
        "correct": false,
        "text": "`Woah some cool data`"
      },
      {
        "correct": false,
        "text": "`Oh finally!`"
      },
      {
        "correct": true,
        "text": "`Woah some cool data` `Oh finally!`"
      },
      {
        "correct": false,
        "text": "`Oops didn't work` `Oh finally!`"
      }
    ],
    "explanation": "在 `try` 块区，我们打印 `myPromise` 变量的 awaited 值： `\"Woah some cool data\"`。因为`try` 块区没有错误抛出，`catch` 块区的代码并不执行。`finally` 块区的代码 _总是_ 执行，`\"Oh finally!\"` 被输出。"
  },
  {
    "id": 131,
    "title": "131. 输出什么？",
    "code": "const emojis = [\"🥑\", [\"✨\", \"✨\", [\"🍕\", \"🍕\"]]];\r\n\r\nconsole.log(emojis.flat(1));\r\n",
    "options": [
      {
        "correct": false,
        "text": "`['🥑', ['✨', '✨', ['🍕', '🍕']]]`"
      },
      {
        "correct": true,
        "text": "`['🥑', '✨', '✨', ['🍕', '🍕']]`"
      },
      {
        "correct": false,
        "text": "`['🥑', ['✨', '✨', '🍕', '🍕']]`"
      },
      {
        "correct": false,
        "text": "`['🥑', '✨', '✨', '🍕', '🍕']`"
      }
    ],
    "explanation": "通过方法 `flat`， 我们可以创建一个新的, 已被扁平化的数组。被扁平化的深度取决于我们传递的值。在这个case里，我们传递了值 `1` (并不必要，这是默认值)，相当于只有第一层的数组才会被连接。即这个 case 里的 `['🥑']` and `['✨', '✨', ['🍕', '🍕']]`。连接这两个数组得到结果 `['🥑', '✨', '✨', ['🍕', '🍕']]`."
  },
  {
    "id": 132,
    "title": "132. 输出什么？",
    "code": "class Counter {\r\n\tconstructor() {\r\n\t\tthis.count = 0;\r\n\t}\r\n\r\n\tincrement() {\r\n\t\tthis.count++;\r\n\t}\r\n}\r\n\r\nconst counterOne = new Counter();\r\ncounterOne.increment();\r\ncounterOne.increment();\r\n\r\nconst counterTwo = counterOne;\r\ncounterTwo.increment();\r\n\r\nconsole.log(counterOne.count);\r\n",
    "options": [
      {
        "correct": false,
        "text": "`0`"
      },
      {
        "correct": false,
        "text": "`1`"
      },
      {
        "correct": false,
        "text": "`2`"
      },
      {
        "correct": true,
        "text": "`3`"
      }
    ],
    "explanation": "`counterOne` 是类 `Counter` 的一个实例。类 Counter 包含一个`count` 属性在它的构造函数里， 和一个 `increment` 方法。首先，我们通过 `counterOne.increment()` 调用方法 `increment` 两次。现在, `counterOne.count` 为 `2`.\r\n\r\n<img src=\"https://i.imgur.com/KxLlTm9.png\" width=\"400\">\r\n\r\n然后，我们创建一个新的变量 `counterTwo` 并将 `counterOne` 的引用地址赋值给它。因为对象受引用地址的影响，我们刚刚创建了一个新的对象，其引用地址和 `counterOne` 的等价。因此它们指向同一块内存地址，任何对其的副作用都会影响 `counterTwo`。现在 `counterTwo.count` 为 `2`。\r\n\r\n我们调用 `counterTwo.increment()` 将 `count` 的值设为 `3`。然后，我们打印 `counterOne` 里的count，结果为 `3`。\r\n\r\n<img src=\"https://i.imgur.com/BNBHXmc.png\" width=\"400\">"
  },
  {
    "id": 133,
    "title": "133. 输出什么？",
    "code": "const myPromise = Promise.resolve(Promise.resolve(\"Promise!\"));\r\n\r\nfunction funcOne() {\r\n\tmyPromise.then(res => res).then(res => console.log(res));\r\n\tsetTimeout(() => console.log(\"Timeout!\", 0));\r\n\tconsole.log(\"Last line!\");\r\n}\r\n\r\nasync function funcTwo() {\r\n\tconst res = await myPromise;\r\n\tconsole.log(await res);\r\n\tsetTimeout(() => console.log(\"Timeout!\", 0));\r\n\tconsole.log(\"Last line!\");\r\n}\r\n\r\nfuncOne();\r\nfuncTwo();\r\n",
    "options": [
      {
        "correct": false,
        "text": "`Promise! Last line! Promise! Last line! Last line! Promise!`"
      },
      {
        "correct": false,
        "text": "`Last line! Timeout! Promise! Last line! Timeout! Promise!`"
      },
      {
        "correct": false,
        "text": "`Promise! Last line! Last line! Promise! Timeout! Timeout!`"
      },
      {
        "correct": true,
        "text": "`Last line! Promise! Promise! Last line! Timeout! Timeout!`"
      }
    ],
    "explanation": "首先，我们调用 `funcOne`。在函数 `funcOne` 的第一行，我们调用`myPromise` promise _异步操作_。当JS引擎在忙于执行 promise，它继续执行函数 `funcOne`。下一行 _异步操作_ `setTimeout`，其回调函数被 Web API 调用。 (详情请参考我关于event loop的文章.)\r\n\r\npromise 和 timeout 都是异步操作，函数继续执行当JS引擎忙于执行promise 和 处理 `setTimeout` 的回调。相当于 `Last line!` 首先被输出， 因为它不是异步操作。执行完 `funcOne` 的最后一行，promise 状态转变为 resolved，`Promise!` 被打印。然而，因为我们调用了 `funcTwo()`, 调用栈不为空，`setTimeout` 的回调仍不能入栈。\r\n\r\n我们现在处于 `funcTwo`，先 _awaiting_ myPromise。通过 `await` 关键字， 我们暂停了函数的执行直到 promise 状态变为 resolved (或 rejected)。然后，我们输出 `res` 的 awaited 值（因为 promise 本身返回一个 promise）。 接着输出 `Promise!`。\r\n\r\n下一行就是 _异步操作_ `setTimeout`，其回调函数被 Web API 调用。\r\n\r\n我们执行到函数 `funcTwo` 的最后一行，输出 `Last line!`。现在，因为 `funcTwo` 出栈，调用栈为空。在事件队列中等待的回调函数（`() => console.log(\"Timeout!\")` from `funcOne`, and `() => console.log(\"Timeout!\")` from `funcTwo`）以此入栈。第一个回调输出 `Timeout!`，并出栈。然后，第二个回调输出 `Timeout!`，并出栈。得到结果 `Last line! Promise! Promise! Last line! Timeout! Timeout!`"
  },
  {
    "id": 134,
    "title": "134. 我们怎样才能在 `index.js` 中调用 `sum.js?` 中的 `sum`？",
    "code": "// sum.js\r\nexport default function sum(x) {\r\n\treturn x + x;\r\n}\r\n\r\n// index.js\r\nimport * as sum from \"./sum\";\r\n",
    "options": [
      {
        "correct": false,
        "text": "`sum(4)`"
      },
      {
        "correct": false,
        "text": "`sum.sum(4)`"
      },
      {
        "correct": true,
        "text": "`sum.default(4)`"
      },
      {
        "correct": false,
        "text": "默认导出不用 `*` 来导入，只能具名导出"
      }
    ],
    "explanation": "使用符号 `*`，我们引入文件中的所有值，包括默认和具名。如果我们有以下文件：\r\n\r\n```javascript\r\n// info.js\r\nexport const name = \"Lydia\";\r\nexport const age = 21;\r\nexport default \"I love JavaScript\";\r\n\r\n// index.js\r\nimport * as info from \"./info\";\r\nconsole.log(info);\r\n```\r\n\r\n将会输出以下内容：\r\n\r\n```javascript\r\n{\r\n  default: \"I love JavaScript\",\r\n  name: \"Lydia\",\r\n  age: 21\r\n}\r\n```\r\n\r\n以 `sum` 为例，相当于以下形式引入值 `sum`：\r\n\r\n```javascript\r\n{ default: function sum(x) { return x + x } }\r\n```\r\n\r\n我们可以通过调用 `sum.default` 来调用该函数"
  },
  {
    "id": 135,
    "title": "135. 输出什么？",
    "code": "const handler = {\r\n\tset: () => console.log(\"Added a new property!\"),\r\n\tget: () => console.log(\"Accessed a property!\")\r\n};\r\n\r\nconst person = new Proxy({}, handler);\r\n\r\nperson.name = \"Lydia\";\r\nperson.name;\r\n",
    "options": [
      {
        "correct": false,
        "text": "`Added a new property!`"
      },
      {
        "correct": false,
        "text": "`Accessed a property!`"
      },
      {
        "correct": true,
        "text": "`Added a new property!` `Accessed a property!`"
      },
      {
        "correct": false,
        "text": "没有任何输出"
      }
    ],
    "explanation": "使用 Proxy 对象，我们可以给一个对象添加自定义行为。在这个 case，我们传递一个包含以下属性的对象 `handler` : `set` and `get`。每当我门 _设置_ 属性值时 `set` 被调用，每当我们 _获取_ 时 `get` 被调用。\r\n\r\n第一个参数是一个空对象 `{}`，作为 `person` 的值。对于这个对象，自定义行为被定义在对象 `handler`。如果我们向对象 `person` 添加属性，`set` 将被调用。如果我们获取 `person` 的属性, `get` 将被调用。\r\n\r\n首先，我们向 proxy 对象(`person.name = \"Lydia\"`)添加一个属性 `name`。`set` 被调用并输出 `\"Added a new property!\"`。\r\n\r\n然后，我们获取 proxy 对象的一个属性，对象 handler 的属性 `get` 被调用。输出 `\"Accessed a property!\"`。"
  },
  {
    "id": 136,
    "title": "136. 以下哪一项会对对象 `person` 有副作用？",
    "code": "const person = { name: \"Lydia Hallie\" };\r\n\r\nObject.seal(person);\r\n",
    "options": [
      {
        "correct": true,
        "text": "`person.name = \"Evan Bacon\"`"
      },
      {
        "correct": false,
        "text": "`person.age = 21`"
      },
      {
        "correct": false,
        "text": "`delete person.name`"
      },
      {
        "correct": false,
        "text": "`Object.assign(person, { age: 21 })`"
      }
    ],
    "explanation": "使用 `Object.seal` 我们可以防止新属性 _被添加_，或者存在属性 _被移除_.\r\n\r\n然而，你仍然可以对存在属性进行更改。"
  },
  {
    "id": 137,
    "title": "137. 以下哪一项会对对象 `person` 有副作用？",
    "code": "const person = {\r\n\tname: \"Lydia Hallie\",\r\n\taddress: {\r\n\t\tstreet: \"100 Main St\"\r\n\t}\r\n};\r\n\r\nObject.freeze(person);\r\n",
    "options": [
      {
        "correct": false,
        "text": "`person.name = \"Evan Bacon\"`"
      },
      {
        "correct": false,
        "text": "`delete person.address`"
      },
      {
        "correct": true,
        "text": "`person.address.street = \"101 Main St\"`"
      },
      {
        "correct": false,
        "text": "`person.pet = { name: \"Mara\" }`"
      }
    ],
    "explanation": "使用方法 `Object.freeze` 对一个对象进行 _冻结_。不能对属性进行添加，修改，删除。\r\n\r\n然而，它仅 对对象进行 _浅_ 冻结，意味着只有 对象中的 _直接_ 属性被冻结。如果属性是另一个 object，像案例中的 `address`，`address` 中的属性没有被冻结，仍然可以被修改。"
  },
  {
    "id": 138,
    "title": "138. 以下哪一项会对对象 `person` 有副作用？",
    "code": "const person = {\r\n\tname: \"Lydia Hallie\",\r\n\taddress: {\r\n\t\tstreet: \"100 Main St\"\r\n\t}\r\n};\r\n\r\nObject.freeze(person);\r\n",
    "options": [
      {
        "correct": false,
        "text": "`person.name = \"Evan Bacon\"`"
      },
      {
        "correct": false,
        "text": "`delete person.address`"
      },
      {
        "correct": true,
        "text": "`person.address.street = \"101 Main St\"`"
      },
      {
        "correct": false,
        "text": "`person.pet = { name: \"Mara\" }`"
      }
    ],
    "explanation": "使用方法 `Object.freeze` 对一个对象进行 _冻结_。不能对属性进行添加，修改，删除。\r\n\r\n然而，它仅 对对象进行 _浅_ 冻结，意味着只有 对象中的 _直接_ 属性被冻结。如果属性是另一个 object，像案例中的 `address`，`address` 中的属性没有被冻结，仍然可以被修改。"
  },
  {
    "id": 139,
    "title": "139. 输出什么？",
    "code": "const add = x => x + x;\r\n\r\nfunction myFunc(num = 2, value = add(num)) {\r\n\tconsole.log(num, value);\r\n}\r\n\r\nmyFunc();\r\nmyFunc(3);\r\n",
    "options": [
      {
        "correct": true,
        "text": "`2` `4` and `3` `6`"
      },
      {
        "correct": false,
        "text": "`2` `NaN` and `3` `NaN`"
      },
      {
        "correct": false,
        "text": "`2` `Error` and `3` `6`"
      },
      {
        "correct": false,
        "text": "`2` `4` and `3` `Error`"
      }
    ],
    "explanation": "首先我们不传递任何参数调用 `myFunc()`。因为我们没有传递参数，`num` 和 `value` 获取它们各自的默认值：num 为 `2`, 而 `value` 为函数 `add` 的返回值。对于函数 `add`，我们传递值为2的 `num` 作为参数。函数 `add` 返回 `4` 作为 `value` 的值。\r\n\r\n然后，我们调用 `myFunc(3)` 并传递值 `3` 参数 `num` 的值。我们没有给 `value` 传递值。因为我们没有给参数 `value` 传递值，它获取默认值：函数 `add` 的返回值。对于函数 `add`，我们传递值为3的 `num`给它。函数 `add` 返回 `6` 作为 `value` 的值。"
  },
  {
    "id": 140,
    "title": "140. 输出什么？",
    "code": "class Counter {\r\n  #number = 10\r\n\r\n  increment() {\r\n    this.#number++\r\n  }\r\n\r\n  getNum() {\r\n    return this.#number\r\n  }\r\n}\r\n\r\nconst counter = new Counter()\r\ncounter.increment()\r\n\r\nconsole.log(counter.#number)\r\n",
    "options": [
      {
        "correct": false,
        "text": "`10`"
      },
      {
        "correct": false,
        "text": "`11`"
      },
      {
        "correct": false,
        "text": "`undefined`"
      },
      {
        "correct": true,
        "text": "`SyntaxError`"
      }
    ],
    "explanation": "在 ES2020 中，通过 `#` 我们可以给 class 添加私有变量。在 class 的外部我们无法获取该值。当我们尝试输出 `counter.#number`，语法错误被抛出：我们无法在 class `Counter` 外部获取它!"
  },
  {
    "id": 141,
    "title": "141. 选择哪一个？",
    "code": "const teams = [\r\n\t{ name: \"Team 1\", members: [\"Paul\", \"Lisa\"] },\r\n\t{ name: \"Team 2\", members: [\"Laura\", \"Tim\"] }\r\n];\r\n\r\nfunction* getMembers(members) {\r\n\tfor (let i = 0; i < members.length; i++) {\r\n\t\tyield members[i];\r\n\t}\r\n}\r\n\r\nfunction* getTeams(teams) {\r\n\tfor (let i = 0; i < teams.length; i++) {\r\n\t\t// ✨ SOMETHING IS MISSING HERE ✨\r\n\t}\r\n}\r\n\r\nconst obj = getTeams(teams);\r\nobj.next(); // { value: \"Paul\", done: false }\r\nobj.next(); // { value: \"Lisa\", done: false }\r\n",
    "options": [
      {
        "correct": false,
        "text": "`yield getMembers(teams[i].members)`"
      },
      {
        "correct": true,
        "text": "`yield* getMembers(teams[i].members)`"
      },
      {
        "correct": false,
        "text": "`return getMembers(teams[i].members)`"
      },
      {
        "correct": false,
        "text": "`return yield getMembers(teams[i].members)`"
      }
    ],
    "explanation": "为了遍历 `teams` 数组中对象的属性 `members` 中的每一项，我们需要将 `teams[i].members` 传递给 Generator 函数 `getMembers`。Generator 函数返回一个 generator 对象。为了遍历这个 generator 对象中的每一项，我们需要使用 `yield*`.\r\n\r\n如果我们没有写 `yield`，`return yield` 或者 `return`，整个 Generator 函数不会第一时间 return 当我们调用 `next` 方法."
  },
  {
    "id": 142,
    "title": "142. 输出什么？",
    "code": "const person = {\r\n\tname: \"Lydia Hallie\",\r\n\thobbies: [\"coding\"]\r\n};\r\n\r\nfunction addHobby(hobby, hobbies = person.hobbies) {\r\n\thobbies.push(hobby);\r\n\treturn hobbies;\r\n}\r\n\r\naddHobby(\"running\", []);\r\naddHobby(\"dancing\");\r\naddHobby(\"baking\", person.hobbies);\r\n\r\nconsole.log(person.hobbies);\r\n",
    "options": [
      {
        "correct": false,
        "text": "`[\"coding\"]`"
      },
      {
        "correct": false,
        "text": "`[\"coding\", \"dancing\"]`"
      },
      {
        "correct": true,
        "text": "`[\"coding\", \"dancing\", \"baking\"]`"
      },
      {
        "correct": false,
        "text": "`[\"coding\", \"running\", \"dancing\", \"baking\"]`"
      }
    ],
    "explanation": "函数 `addHobby` 接受两个参数，`hobby` 和有着对象 `person` 中数组 `hobbies` 默认值的 `hobbies`。\r\n\r\n首相，我们调用函数 `addHobby`，并给 `hobby` 传递 `\"running\"` 以及给 `hobbies` 传递一个空数组。因为我们给 `hobbies` 传递了空数组，`\"running\"` 被添加到这个空数组。\r\n\r\n然后，我们调用函数 `addHobby`，并给 `hobby` 传递 `\"dancing\"`。我们不向 `hobbies` 传递值，因此它获取其默认值 —— 对象 `person` 的 属性 `hobbies`。我们向数组 `person.hobbies` push `dancing`。\r\n\r\n最后，我们调用函数 `addHobby`，并向 `hobby` 传递 值 `\"bdaking\"`，并且向 `hobbies` 传递 `person.hobbies`。我们向数组 `person.hobbies` push `dancing`。\r\n\r\npushing `dancing` 和 `baking` 之后，`person.hobbies` 的值为 `[\"coding\", \"dancing\", \"baking\"]`"
  },
  {
    "id": 143,
    "title": "143. 输出什么？",
    "code": "class Bird {\r\n\tconstructor() {\r\n\t\tconsole.log(\"I'm a bird. 🦢\");\r\n\t}\r\n}\r\n\r\nclass Flamingo extends Bird {\r\n\tconstructor() {\r\n\t\tconsole.log(\"I'm pink. 🌸\");\r\n\t\tsuper();\r\n\t}\r\n}\r\n\r\nconst pet = new Flamingo();\r\n",
    "options": [
      {
        "correct": false,
        "text": "`I'm pink. 🌸`"
      },
      {
        "correct": true,
        "text": "`I'm pink. 🌸` `I'm a bird. 🦢`"
      },
      {
        "correct": false,
        "text": "`I'm a bird. 🦢` `I'm pink. 🌸`"
      },
      {
        "correct": false,
        "text": "Nothing, we didn't call any method"
      }
    ],
    "explanation": "我们创建了类 `Flamingo` 的实例 `pet`。当我们实例化这个实例，`Flamingo` 中的 `constructor` 被调用。首相，输出 `\"I'm pink. 🌸\"`, 之后我们调用`super()`。`super()` 调用父类的构造函数，`Bird`。`Bird` 的构造函数被调用，并输出 `\"I'm a bird. 🦢\"`。"
  },
  {
    "id": 144,
    "title": "144. 哪一个选项会导致报错？",
    "code": "const emojis = [\"🎄\", \"🎅🏼\", \"🎁\", \"⭐\"];\r\n\r\n/* 1 */ emojis.push(\"🦌\");\r\n/* 2 */ emojis.splice(0, 2);\r\n/* 3 */ emojis = [...emojis, \"🥂\"];\r\n/* 4 */ emojis.length = 0;\r\n",
    "options": [
      {
        "correct": false,
        "text": "1"
      },
      {
        "correct": false,
        "text": "1 and 2"
      },
      {
        "correct": false,
        "text": "3 and 4"
      },
      {
        "correct": true,
        "text": "3"
      }
    ],
    "explanation": "`const` 关键字意味着我们不能 _重定义_ 变量中的值，它 _仅可读_。而然，值本身不可修改。数组 `emojis` 中的值可被修改，如 push 新的值, 拼接，又或者将数组的长度设置为0。"
  },
  {
    "id": 145,
    "title": "145. 我们需要向对象 `person` 添加什么，以致执行 `[...person]` 时获得形如 `[\"Lydia Hallie\", 21]` 的输出？",
    "code": "const person = {\r\n  name: \"Lydia Hallie\",\r\n  age: 21\r\n}\r\n\r\n[...person] // [\"Lydia Hallie\", 21]\r\n",
    "options": [
      {
        "correct": false,
        "text": "不需要，对象默认就是可迭代的"
      },
      {
        "correct": false,
        "text": "`*[Symbol.iterator]() { for (let x in this) yield* this[x] }`"
      },
      {
        "correct": true,
        "text": "`*[Symbol.iterator]() { for (let x in this) yield* Object.values(this) }`"
      },
      {
        "correct": false,
        "text": "`*[Symbol.iterator]() { for (let x in this) yield this }`"
      }
    ],
    "explanation": "对象默认并不是可迭代的。如果迭代规则被定义，则一个对象是可迭代的（An iterable is an iterable if the iterator protocol is present）。我们可以通过添加迭代器symbol `[Symbol.iterator]` 来定义迭代规则，其返回一个 generator 对象，比如说构建一个 generator 函数 `*[Symbol.iterator]() {}`。如果我们想要返回数组 `[\"Lydia Hallie\", 21]`: `yield* Object.values(this)`，这个 generator 函数一定要 yield 对象 `person` 的`Object.values`。"
  }
]