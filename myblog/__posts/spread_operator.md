---
title: 'Javascript Spread Operator'
description: 'ES6부터는 ...이라는 새로운 형태의 문법이 추가 되었다. 점 3개가 연달아 붙어있는 이 표시는 Spread Operator를 나타낸다.'
coverImage: 'https://miro.medium.com/v2/resize:fit:2000/format:webp/1*24ayqOY008AvW_VmkqsYdA.png'
date: '2022/11/15'
keywords: ['javascript', 'spread', '스프레드', 'yoonhu']
category: 'javascript'
outline: 'ES6부터 나온 ...을 사용한 새로운 형태의 문법이 추가되었다.'
---

![es6 spread operator 이미지](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*24ayqOY008AvW_VmkqsYdA.png)

# Spread Operator

ES6부터는 ...이라는 새로운 형태의 문법이 추가 되었다. 점 3개가 연달아 붙어있는 이 표시는 Spread Operator를 나타낸다.

## 기본 문법
스프레드 연산자를 사용하면 배열, 문자열, 객체 등 반복가능한 객체를 개별 요소로 분리할 수 있다. 사실 말로 하면 확 와닿지 않는다. 예시를 봐보자.

```js
// Array

let a = [1, 2, 3, 4, 5]
let b = [...a, 6, 7, 8, 9]

console.log(b) // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// string
let c = "apple"
let d = [...c]

console.log(d) //["a", "p", "p", "l", "e"]
```
대략적으로 어떤 느낌인지 잘 보인다. spread라는 말 그대로 흩뿌린다는 의미가 강한 문법이다. 그렇다면 실제 어떻게 사용되고 있는지 확인해보자.

### 배열 Spread Operator
기존에는 두개의 배열을 합치는데 있어서 concat 메서드를 사용했었다. 하지만, ES6부터는 spread라는 연산자를 사용해서 두개의 배열을 하나로 쉽게 묶을 수 있게 되었다.

```js
// concat
let a = [1, 2, 3]
let b = [4, 5, 6]

let c = a.concat(b)
console.log(c) // [1, 2, 3, 4, 5, 6]

// spread Operator
let d = [1, 2, 3]
let e = [4, 5, 6]

let f = [...d, ...e]
console.log(f) // [1, 2, 3, 4, 5, 6]
```

### 배열의 복사
JavaScript에서 배열을 새로운 변수에 할당하는 경우 새로운 배열은 기존 배열을 참조한다. 따라서 새로운 배열을 변경하는 경우에는 원본배열 역시 변경되게 된다. 이를 해결하기 위해서 배열 참조가 아닌 배열 복사를 위해 이전에는 slice를 사용하여 배열을 복사했었다.

```js

// 배열의 참조
let a = ['a','c']
let b = a
b.push('c')

console.log(a) // ['a', 'b', 'c']
console.log(b) // ['a', 'b', 'c']

// 배열의 복사 slice
let a = [1, 2, 3, 4]
let b = a.slice(0, 3)

console.log(a) // [1, 2, 3, 4]
console.log(b) // [1, 2, 3]

b.push(5) 

console.log(a) // [1, 2, 3, 4]
console.log(b) // [1, 2, 3, 5]

// 배열의 복사 Spread Operator
let a = [1, 2, 3, 4]
let b = [...a]

console.log(a) // [1, 2, 3, 4]
console.log(b) // [1, 2, 3, 4]

b.push(5)

console.log(a) // [1, 2, 3, 4]
console.log(b) // [1, 2, 3, 4, 5]

```

Spread Operator를 사용하면 위와 같이 새로운 복사된 배열을 생성할 수 있다. 
>참고로 Spread Operator를 사용하면 **얕은 복사**를 수행하며 **배열 안에 객체가 있는 경우에는 객체 자체는 복사되지 않고 원본 값을 참조한다.** 따라서 원본 배열 내의 객체를 변경하는 경우 새로운 배열 내의 객체 값도 변경되게 된다.

```js
let a = [{점심 : '짜장면', 가격 : 1000}]
let b = [...a]

b[0].가격 = 2000

console.log(a) // [{점심 : '짜장면', 가격 : 2000}]
console.log(b) // [{점심 : '짜장면', 가격 : 2000}]


```


### 함수에서 Spread Operator
함수에서 받는 변수의 이름을 매개변수 (parameter)라고 하며 spread operator의 형태로 작성한 것을 Rest parameter라고 한다. Rest parameter를 사용하면 함수의 파라미터로 오는 값들을 모아서 배열에 넣게 된다.

```js
let a = (...bob) => {
	console.log(bob)
}

console.log(a(1,2,3)) // [1, 2, 3]

```
위의 결과를 보면 알 수 있듯 매개변수의 갯수에 상관없이 모든 인자가 하나의 배열로 압축해서 출력되는 것을 볼 수 있다. 

이를 이용하여 여러 방법으로 사용할 수 있는데 대표적으로 아래의 예와 같다.

```js
let calculator = (method, ...rest) => {
	if(method === 'add') {
    	let sum = 0
        for(let i of rest){
        	sum += i
        }
      return sum
    } else if(method === 'minus') {
    	let min = 0
        for(let i of rest){
        	min -= i
        }
      return min
    }
}

console.log(calculator('add', 1,2,3,4)) // 10
console.log(calculator('minus', 1,2,3,4)) // -10

```

여기서 중요한 점은 Reat Parameter는 항상 제일 마지막에 존재해야한다는 점이다.
```js
calculator(1,2,3,4, 'add')
```
위와 같이 사용할 수 없다는 것이다.
