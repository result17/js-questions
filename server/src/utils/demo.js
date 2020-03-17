class A {
  constructor(msg) {
    this.msg = msg
  }
  logMsg() {
    console.log(this.msg)
    return this
  }
}

class B extends A {
  constructor(msg) {
    super(msg)
  }
  logMsgAgain() {
    console.log(`${this.msg} again!`)
    return this
  }
}

let d = new B('get up')
d.logMsgAgain()

function solution(list) {
  if (!list.length) return []
  // 正整数数组
  debugger
  let left = 0, maxX = 0, l = 0, r = 0, maxLeft = list[left] - 1
  for (; left < list.length; left++) {
    if (list[left] <= maxLeft) {
      continue
    } else {
      maxLeft = list[left]
    }
    let min = list[left], sum = list[left], tempMaxX = sum * sum, tr = left
    for (let right = left + 1; right < list.length; right++) {
      let cur = list[right]
      sum += cur
      if (cur >= min) {
        // 肯定会增加的
        tempMaxX += min * cur
        tr = right
      } else {
        // 更新了最小值，不一定会增加的
        min = cur
        let tempVal = min * sum
        if (tempVal > tempMaxX) {
          tempMaxX = tempVal
          tr = right
        }
      }
    }
    if (tempMaxX > maxX) {
      maxX = tempMaxX
      l = left
      r = tr
    }
  }
  return list.slice(l, r + 1)
}

solution([3,1,6,4,5,2])