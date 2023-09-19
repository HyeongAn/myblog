---
title: 'Javascript Generator와 Yield'
description: '프로젝트에서 vs코드와 비슷한 탭분할의 기능을 만들기 위해 사용했던 Generator와 Yield이다. JavaScript뿐만 아니라, 다른 언어에서 지원했던 기능을 ES6부터 사용가능하게 되었다고한다.'
coverImage: 'https://velog.velcdn.com/images/hanblueblue/post/3a0b0464-a4f4-44b9-820a-d14e47f98eec/js.png'
date: '2023/08/22'
keywords: ['react', 'generator', 'yield', 'yoonhu', 'js', 'javascript', 'div']
category: 'javascript'
outline: '프로젝트를 진행하며 재귀컴포넌트를 만들었을 떄 사용했던 ES6에 추가된 Generator와 Yield에대해 자세히 알아보자.'
---

![](https://velog.velcdn.com/images/hanblueblue/post/3a0b0464-a4f4-44b9-820a-d14e47f98eec/js.png)

프로젝트에서 vs코드와 비슷한 탭분할의 기능을 만들기 위해 사용했던 `Generator`와 `Yield`이다. JavaScript뿐만 아니라, 다른 언어에서 지원했던 기능을 ES6부터 사용가능하게 되었다고한다.

## Generator

먼저 `generator`를 먼저 알아보도록 하자. `generator`를 사용하는 함수는 사용자의 요구에 따라서 다른 시간 간격으로 여러 값을 반환할 수 있게 된다. 내부의 상태관리를 할 수 있는 함수이며 아래와 같이 사용하게 된다.

```js
function* Test() {
  // 내용입력
}
```

함수 뒤에 astrok(\*)을 붙이이면 이를 `generator`함수형태가 된다. 이 함수는 비동기처리를할 수 있는 함수이며, 단 한번의 실행으로 함수의 끝까지 실행이 완료되는 일반적인 함수와는 달리 `generator`함수는 사용자의 요구(`yield`와 `next`를 통해)에 따라서 일시적으로 정지될 수도 있고 다시 시작될 수도 있다. 또한 `generator`함수의 반환으로는 `generator`함수가 반환된다.

글로써는 `generator`함수가 뭔지 정확하게 이해하기 힘들 수 있다. 아래의 예제를 살펴보자.

```js
function* call() {
  console.log(1)
  yield 10
  console.log(2)
  yield 20
  console.log(3)
  yield 30
}
```

위의 함수를 실행해보기전 `yield`의 기능과 `next()`를 먼저 알아야 `generator`에 대해 좀 더 자세히 이해할 수 있을 것이다.

### Yield

`generator`함수 안에 `yield`키워드를 사용한 곳들을 기준으로 코드가 잘려서 실행된다고 볼 수 있는데, `yield`문을 만날때까지 특정 처리를 수행했다면, 함수는 잠깐 잘린 상태로 정지해 있다가 다시 `next()`함수를 호출 했을 때 멈추었던 부분 부터 실행을 이어서 하고, 다음 `yield`문을 만날때까지 쭉 실행시키게 된다.

`generator`는 이렇게 `yield`를 기준으로 처리가 나눠진 곳들을 실행시키는, 명령을 외부로 넘기는 형태가 만들어지게 되는 것이다.

### next()

`generator`함수에서 반환한 데이터를 `generator`라고 부르는데, `generator`의 `next()`함수를 실행하면 `{value, done}`이라는 데이터를 반환한다. 참고로 이 `next()`함수를 실행하는 이유는 `generator`의 반복구조인 `iterator`를 사용하는 구조이기 때문이다.

자, 위의 `yield`와 `next()`를 보았으면 대충 위의 예제가 어떻게 출력이 될지 예상이 되겠다.

![](https://velog.velcdn.com/images/ahsy92/post/8703814f-931f-4c55-b64d-b10a9e4d8ee2/image.jpg)
위의 경우는 `next()`함수를 사용하여 `generator`의 결과를 나타낸 것이다.

![](https://velog.velcdn.com/images/ahsy92/post/221511d0-46ff-42f1-a894-1f7dd81dd02c/image.jpg)

for문을 사용해서 결과를 볼 수도 있다.

### Generator 함수의 return

`return`은 수행되고 있는 `iterator`를 종료시키며 `return`뒤에 오는 값은 `IteratorResult`객체의 `value`프로퍼티에 할당되게 되며 `done`프로퍼티는 `true`가 할당되게 된다.

```js
function* call() {
  return 10
}

const calling = call()
console.log(calling.next()) // {value: 10, done: true}
```

### Generator 종료하기

`generator`에는 `next`외에도 `throw`, `return`등의 메소드가 있는데 이 둘을 통해 `generator`를 종료할 수 있다. 다만 이 둘은 조금의 차이가 존재한다.

#### return

```js
function* call() {
  console.log('start')
  let i = 0

  try {
    while (true) {
      yield i++
    }
  } catch (e) {
    console.log('error', e)
  }
}

const calling = call()
console.log(calling.next())
console.log(calling.next())
console.log(calling.next())
console.log(calling.return(10))
console.log(calling.next())

// 'start'
// {value: 0, done: false}
// {value: 1, done: false}
// {value: 2, done: false}
// {value: 10, done: true}
// {value: undefined, done: true}
```

`return`이 호출되고 나면, `value`에는 `return`의 인자가 할당되고 `done`은
`true`가 된다.

#### return & try/finally

`return`메소드가 호출되었을 때 `generator`함수의 코드가 `finally`안에 있으면 시퀀스가 종료되지 않는다. `return`이후 `finally`블록의 `yield`표현식이 실행되며, 이후 시퀀스가 `finally`를 벗어나게 되면 `yield`표현식이 남아있어도 실행되지 않고 `return`에 전달된 값으로 종료되게 된다.

```js
function* call() {
  yield 1

  try {
    yield 2
  } finally {
    yield 3
    yield 4
  }

  yield 5
}

// try에서 return을 했을 경우
const testCalling1 = call()
console.log(testCalling1.next()) // {value: 1, done: false}
console.log(testCalling1.return(10)) // {value: 10, done: true}
console.log(testCalling1.next()) // {value: undefined, done: true}
console.log(testCalling1.next()) // {value: undefined, done: true}
console.log(testCalling1.next()) // {value: undefined, done: true}

// finally에서 return을 했을경우
const testCalling2 = call()
console.log(testCalling1.next()) // {value: 1, done: false}
console.log(testCalling1.next()) // {value: 2, done: false}
console.log(testCalling1.return(10)) // {value: 3, done: false}
console.log(testCalling1.next()) // {value: 4, done: false}
console.log(testCalling1.next()) // {value: 10, done: true}
```

#### throw

`throw`가 호출되면, `catch`블록에 `throw`의 인자가 전달되게 된다.

```js
function* call() {
  console.log('start')
  let i = 0

  try {
    while (true) {
      yield i++
    }
  } catch (e) {
    console.log('error', e)
  }
}

const calling = call()
console.log(calling.next())
console.log(calling.next())
console.log(calling.throw(-1))
console.log(calling.next())

// 'start'
// {value: 0, done: false}
// {value: 1, done: false}
// 'error' -1
// {value: undefined, done: true}
// {value: undefined, done: true}
```

#### throw & yield

`throw`의 인자를 받은 `catch`에서 `yield`을 사용하게 되면 `next()`를 한번 더 사용할때가지 이터레이터(반복자)는 끝나지 않게 된다.

```js
function* call() {
  console.log('start')
  let i = 0
  try {
    while (true) {
      yield i++
    }
  } catch (e) {
    console.log('error', i)
    yield e
  }
}

const calling = call()
console.log(calling.next())
console.log(calling.next())
console.log(calling.next())
console.log(calling.throw(-1))
console.log(calling.next())

// 'start'
// {value: 0, done: false}
// {value: 1, done: false}
// {value: 2, done: false}
// 'error' 3
// {value: -1, done: false}
// {value: undefined, done: true}
```

### Generator & Yield\*

`generator`와 같이 사용하는 방법중에 하나인 `yield*`의 구문이 있다. `yield`에 `*`를 붙여 사용하게 되면 `generator`또는 이터러블 객체에 `yield`를 위힘할때 사용된다. 즉, `yield*`와 함께 표현된 이터러블 객체를 순회하게 되는 것이다.

무슨말인지 사실 알기 어렵다. 예제를 보면서 과정을 살펴보자.

```js
function* call1() {
  yield 30
  yield 40
}

function* call2() {
  yield* call1()
  yield 50
}

const calling1 = call1()
const calling2 = call2()

console.log(calling1.next())
console.log(calling1.next())
console.log(calling1.next())

// {value: 30, done: false}
// {value: 40, done: false}
// {value: undefoned, done: true}

console.log(calling2.next())
console.log(calling2.next())
console.log(calling2.next())
console.log(calling2.next())

// {value: 30, done: false}
// {value: 40, done: false}
// {value: 50, done: false}
// {value: undefoned, done: true}
```

`yield*`표현은 피연산자를 반복하고 반환되는 값을 `yield`한다. `yield*`표현 자체의 값은 이터레이터(반복자)가 종료될 때 반환되는 값이다.(`{done: true}`일때.)

생성기 객체 말고도 `yield*`는 다른 반복 가능한 객체(배열, 문자열, arguments객체)도 `yield`할 수 있다.

```js
// 예제1

function* call() {
  yield* [1, 2]
  yield* '34'
  yield* Array.from(arguments)
}

const calling = call(5, 6)

console.log(calling.next())
console.log(calling.next())
console.log(calling.next())
console.log(calling.next())
console.log(calling.next())
console.log(calling.next())
console.log(calling.next())

// { value: 1, done: false }
// { value: 2, done: false }
// { value: "3", done: false }
// { value: "4", done: false }
// { value: 5, done: false }
// { value: 6, done: false }
// { value: undefined, done: true }
```

```js
// 예제 2
function* call() {
  const a = 1
  yield a
  yield* [1, 2, 3].map((el) => el * 10)
}

const calling = call()

console.log(calling.next())
console.log(calling.next())
console.log(calling.next())
console.log(calling.next())
console.log(calling.next())

// {value: 1, done: false}
// {value: 10, done: false}
// {value: 20, done: false}
// {value: 30, done: false}
// {value: undefined, done: true}
```

#### 다른 Generator 함수에 컨텍스트 위임하기

`generator`는 앞에서 본 `yield*`를 통해 다른 generator함수를 실행할 수 있다.

```js
function* call() {
  yield* [4, 5, 6]
}

function* generator() {
  yield* [1, 2, 3]
  const calling = call()
  console.log(calling)
  yield* call()
}

const callingGenerator = generator()

console.log(callingGenerator.next())
console.log(callingGenerator.next())
console.log(callingGenerator.next())
console.log(callingGenerator.next())
console.log(callingGenerator.next())
console.log(callingGenerator.next())
console.log(callingGenerator.next())
```

위의 예제의 결과를 보면 아래의 사진과 같다.
![](https://velog.velcdn.com/images/ahsy92/post/5feffdf4-b2ff-4223-9408-514b65026970/image.jpg)

위의 예제에서 `call()`함수를 호출하면 객체가 반환되지만 실제로 `call()`함수가 실행되지는 않는다.
![](https://velog.velcdn.com/images/ahsy92/post/05acdd81-f803-4c10-b8d5-b6ef3a565ae5/image.jpg)

#### iterable Generator

위의 설명들을 종합해보면 `generator`는 `iterable(배열을 일반화한 객체)`한 객체인것을 알 수 있다. `iterable`이라는 개념을 사용하면`for..of`를 통해 `generator`를 순회할 수 있으며 `spread(...)`연산자도 사용이 가능하다.

```js
function* call() {
  yield 'H'
  yield 'E'
  yield 'L'
  yield 'L'
  yield 'O'
}

const calling1 = call()
for (let el of calling1) {
  console.log(el)
}
// "H"
// "E"
// "L"
// "L"
// "O"

const calling2 = call()
console.log([...calling2])
// ["H", "E", "L", "L", "O"]
```

### Reference

[mdn-generator](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[mdn-yield](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/yield)

[JAVASCRIPT INFO-generator](https://ko.javascript.info/generators)

[JAVASCRIPT INFO-Iterable](https://ko.javascript.info/iterable)

[JAEWONISM](https://wonism.github.io/javascript-generator/)
