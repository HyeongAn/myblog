---
title: 'TypeScript Enum'
description: 'TypeScript를 사용해보면서 새로운 타입을 알게되어 적어둔다. TypeScript는 기본의 타입이외에도 다른 타입을 더 제공하는데 그중 하나가 열거형이라고 부르는 enum이다. enum은 말그대로, 여러 값들에 미리 이름을 정의하여 열거해두고 사용하는 타입이다.'
coverImage: 'https://velog.velcdn.com/images/404/post/0769177d-7b12-493b-aa09-d5ba5a87f171/TS-logo.jpg'
date: '2023/04/05'
keywords: ['typescript', 'enum', 'treeshaking', 'uniontype', 'yoonhu']
category: 'typescript'
outline: 'TypeScript의 상수, Enum을 사용하면서 공부한 기록을 적어둔다.'
---

![](https://velog.velcdn.com/images/404/post/0769177d-7b12-493b-aa09-d5ba5a87f171/TS-logo.jpg)

# Enum

TypeScript를 사용해보면서 새로운 타입을 알게되어 적어둔다.
TypeScript는 기본의 타입이외에도 다른 타입을 더 제공하는데 그중 하나가 열거형이라고 부르는 enum이다. enum은 말그대로, 여러 값들에 미리 이름을 정의하여 열거해두고 사용하는 타입이다.

```ts
	enum Weather {
    	sun = 'sunny',
      	cloud = 'cloudy',
      	rain = 'rainy'
    }
	
	// 아무것도 지정하지 않은 경우에는 0부터 숫자를 매긴다.
	enum OsType {
    	IOS, // 0
      	ANDROID // 1
    }
```
사용자별로, 원하는 값을 고정시키고 사용할때 주로 사용한다.

근데 왜 굳이 `enum`으로 사용하는것일까?

사실 JavaScript에서도 `enum`과 같이 비슷 구현할 수 있다.

```js
	const Wearther = {
    	sun = 'sunny',
      	cloud = 'cloudy',
      	rain = 'rainy'
    }
```

위처럼 객체의 형태로 선언하여 `Weather.sun`과 같이 사용하면 되는것이다. 하지만, 객체의 `Key`와`value`값은 변경될 수 있다.

**불변한 상수의 열거를 위해 `enum`은 선언한 값을 외부에서도 변경할 수 없도록 한다.**

### Enum의 필요성
**1. 분야별 종류를 정의하여 명확한 사용과 가독성의 증가**

```ts
// IOS === 0
// ANDROID === 1

if(OsType === 0) {
	console.log("OS는 IOS입니다.")
}
	
```
예를 들어 OS별로 0은 IOS, 1은 ANDROID로 설정하여 관리한다고 할 경우, 개발자는 `IOS === 0`이라는 것을 기억해두고 코드를 만들어야 할 것이다.

하지만 이러한 값들을 모두가 기억하고 사용하기란 쉽지않다. 관리하는 값이 늘어나게 되면 실수하게 되어버리니 말이다.


하지만, `enum`으로 정의해두면 OS분야만 따로 모아 열거해두고 의미를 정확하게 파악할 수 있게 된다.
```ts
	enum OsType {
    	IOS, // 0
      	ANDROID, // 1
      	NOKIA // 2
    }

if(OsType === OsType.IOS) {
	console.log("OS는 IOS입니다.")
}
```
혹여나 다른 사람이 코드를 보았을 때도, OS여부를 체크하는 코드임을 직관적으로 알 수 있게 되는 것이다.

**2. 하드코딩의 실수를 줄이기 위해서**
이부분은 JavaScript를 사용하면서 실수를 방지하기 위한 방법으로도 사용되는 방법이기도 하다.
```ts
const weatherCondition = (weatherType: string) => {
	switch(weatherType) {
      case 'sunny':
        console.log('오늘의 날씨는 sunny 입니다.')
        break
      case 'Sunny':
        console.log('오늘의 날씨는 대왕 Sunny 입니다.')
        break
      case 'cloud':
        console.log('오늘의 날씨는 cloudy 입니다.')
        break
      case 'Cloud':
        console.log('오늘의 날씨는 대왕 Cloudy 입니다.')
        break
      case 'rain':
        console.log('오늘의 날씨는 rainy 입니다.')
      case 'Rain':
        console.log('오늘의 날씨는 대왕 Rainy 입니다.')
        break
      default:
        console.log('weatherType을 잘못 입력하셨습니다.')
        break
    }
}
```
여러 파일을 작업하다보면, 동일한 `sunny`라는 값을 사용할 때, `Sunny`를 입력하게 되면 출력값이 달라지게 된다. 이런 혼동을 줄이기 위해서 아래와 같이 고칠 수 있겠다.

```ts
enum Weather {
    	sun = 'sunny',
      	cloud = 'cloudy',
      	rain = 'rainy'
    }

const weatherCondition = (weatherType: string) => {
	switch(weatherType) {
      case Weather.sun:
        console.log('오늘의 날씨는 sunny 입니다.')
        break
      case Weather.cloud:
        console.log('오늘의 날씨는 cloudy 입니다.')
        break
      case Weather.rain:
        console.log('오늘의 날씨는 rainy 입니다.')
      default:
        console.log('weatherType을 잘못 입력하셨습니다.')
        break
    }
}
```
enum에 상수를 열거해둔다면, 위의 예제와 다르게 출력값으 다르게 나오는 것을 볼 수 있다. `Sunny`를 입력하게 되면 위의 예제에서는 `오늘의 날씨는 대왕 Sunny 입니다.`가 출력되고 `enum`을 사용한 예제에서는 `weatherType을 잘못 입력하셨습니다.`가 출력되게 된다.


### Enum의 문제점
TypeScript의 `enum`을 이리저리 찾아보다 Tree-shaking에 대한 문제점이 있다는 글들을 쉽게 볼 수 있었다.

과연 문제가 무엇이며, 또 Tree-shacking이라는건 뭘까..

#### Tree-shaking
Tree-shaking이란 간단히 말해 사용하지 않는 코드를 삭제하는 기능을 말한다. 나무를 흔들면 죽은 잎사귀들이 떨어지는 모습에 착안하여 Tree-shaking이라고 부른다고 한다. Tree-shaking을 통해 export했지만 아무데서도 import하지 않은 모듈이나 사용하지 않는 코드를 삭제하여 번들의 크기를 줄여 렌더링 시간을 줄일 수 있게 되는 것이다.

#### TypeScript에서 Enum을 사용하면 Tree-shaking이 되지 않는다.
앞에서 `enum`을 설명했듯, 편리한 기능이긴하지만, TypeScript자체적으로 구현했기 때문에 발생하는 문제가 있다. 

```ts 
export enum OsType {
  IOS, // 0
  ANDROID, // 1
  NOKIA // 2
}

// 문자열을 할당한 경우
export enum OsType {
	IOS= 'iOS',
  	ANDROID= 'Android',
  	NOKIA= 'Nokia'
}
```
브라우저는 TypeScript가 아닌 JavaScript를 읽을 수 있으므로 TypeScript를 JavaScript로 변환해야한다.

위의 코드를 트랜스파일하면 아래와같은 JavsScript코드가 된다.
```js
export var OsType
(function (OsType) {
	OsType[OsType['IOS']=0] = 'IOS'
  	OsType[OsType['ANDROID']=0] = 'ANDROID'
  	OsType[OsType['NOKIA']=0] = 'NOKIA'
})(OsType || (OsType = {}))

// 문자열을 할당한 경우
export var OsType
(function (OsType) {
 	OsType['IOS'] = 'iOS'
   	OsType['ANDROID'] = 'Android'
   	OsType['NOKIA'] = 'Nokia'
})(OsType || (OsType = {}))
```
JavaScript에 존재하지 않는 것을 구현하기 위해 TypeScript 컴파일러는 IIFE(즉시 실행 함수)를 포함한 코드를 생성한다. 하지만 [Rollup](https://rollupjs.org/introduction/) ([참조](https://www.peterkimzz.com/rollupjs-lets-start-bundling/))과 같은 번들러는 IIFE를 '사용하지 않는 코드'라고 판단할 수 없어서 Tree-shaking이 되지 않는다. 결국 위의 예제의 `OsType`을 `import`하고 실제로 사용하지 않더라도 최종 번들에는 포함되는 것이다.

![](https://velog.velcdn.com/images/ahsy92/post/964afbf1-2e50-45dd-9a4a-6ffb60e57e63/image.jpg)

[Rollup](https://rollupjs.org/repl/?version=3.20.2&shareable=JTdCJTIyZXhhbXBsZSUyMiUzQW51bGwlMkMlMjJtb2R1bGVzJTIyJTNBJTVCJTdCJTIyY29kZSUyMiUzQSUyMiUyRiUyRiUyMFRSRUUtU0hBS0lORyU1Q25pbXBvcnQlMjAlN0IlMjBPc1R5cGUlMjAlN0QlMjBmcm9tJTIwJy4lMkZtYXRocy5qcyclM0IlNUNuJTVDbmNvbnNvbGUubG9nKCdoZWxsbyUyMHdvcmxkJyklM0IlMjIlMkMlMjJpc0VudHJ5JTIyJTNBdHJ1ZSUyQyUyMm5hbWUlMjIlM0ElMjJtYWluLmpzJTIyJTdEJTJDJTdCJTIyY29kZSUyMiUzQSUyMmV4cG9ydCUyMHZhciUyME9zVHlwZSU1Q24oZnVuY3Rpb24lMjAoT3NUeXBlKSUyMCU3QiU1Q24lMjAlNUN0T3NUeXBlJTVCJ0lPUyclNUQlMjAlM0QlMjAnaU9TJyU1Q24lMjAlMjAlMjAlNUN0T3NUeXBlJTVCJ0FORFJPSUQnJTVEJTIwJTNEJTIwJ0FuZHJvaWQnJTVDbiUyMCUyMCUyMCU1Q3RPc1R5cGUlNUInTk9LSUEnJTVEJTIwJTNEJTIwJ05va2lhJyU1Q24lN0QpKE9zVHlwZSUyMCU3QyU3QyUyMChPc1R5cGUlMjAlM0QlMjAlN0IlN0QpKSUyMiUyQyUyMmlzRW50cnklMjIlM0FmYWxzZSUyQyUyMm5hbWUlMjIlM0ElMjJtYXRocy5qcyUyMiU3RCU1RCUyQyUyMm9wdGlvbnMlMjIlM0ElN0IlMjJvdXRwdXQlMjIlM0ElN0IlMjJmb3JtYXQlMjIlM0ElMjJlcyUyMiU3RCUyQyUyMnRyZWVzaGFrZSUyMiUzQXRydWUlN0QlN0Q=)에서 위의 예제를 넣어봄으로써 최종번들에 포함이 되는것을 확인할 수 있다.

### Enum의 더 나은 방법
#### Union Type의 사용
Union은 합집합이다(A U B) `|`로 구분하고 JavaScript의 OR 연산자와 비슷한 역할을 한다. 그렇다면 모든 요소를 다 포함할 수 있다. 즉, 하나의 변수에 여러 타입을 설정해 주는 것이다.

```ts
let age: number | string

age = 10
console.log(age) // 10

age = '10'
console.log(age) // '10'
```

위의 type의 경우는 `any`로 대체될 수 있지만, TypeScript를 쓰는 장점이 없어져서 되도록 `any`는 지양하는것이 좋겠다.

이 Union type을 문자열 리터럴(Literal)타입에 적용할 수 있는데 예제는 아래와 같다.
```ts
type Color = "Red" | "Blue" | "Green"

let color: Color;
color= "Red"

console.log(color) // "Red"

color= "Yellow"
console.log(color) // error 발생
```
`Color`type에 존재하지 않는 값을 할당하는 경우 오류를 뱉게 된다. 이러한 방법을 응용하여 번들링되었던 IIFE를 제거하여 사용할 수 있다.

```ts
const OsType = {
	IOS: 'iOS'
  	ANDROID: 'Android'
  	NOKIA: 'Nokia'
} as const

type OsType = typeof OsType[keyof typeof OsType]
```
위의 TypeScript 코드를 JavaScript로 트랜스파일링 하게 되면 아래와 같이 바뀌게 된다.

```js
const OsType = {
	IOS: 'iOS'
  	ANDROID: 'Android'
  	NOKIA: 'Nokia'
}
```
TypeScript코드에서는 `OsType`타입을 정의한 이점을 그대로 가져올 수 있으면서 JavaScript로 트랜스파일해도 IIFE가 생성되지 않으므로 Tree-shaking을 할 수 있게 된다.

#### const enum의 사용
TypeScript에서 `const enum`을 사용해보면 `enum`과 거의 같다고 느껴지지만 `enum`의 내용이 트랜스파일할 때 인라인으로 확장된다는 점이 다르다. 

```ts
const enum OsType {
	IOS = 'iOS',
  	ANDROID = 'Android',
  	NOKIA = 'Nokia'
}

const ios = OsType.IOS
```
위의 TypeScript 코드를 JavaScript로 트랜스파일링하게 되면 아래와 같이 된다.

```js
const ios = 'iOS'
```
순수 `enum`보다 더 간결하고 IIFE를 사용하지 않으니, Tree-shaking도 더 잘 될것만 같지만 문제가 있다.

타입스크립트에서 `--isolateModules`컴파일 옵션을 활성화하면 앰비언트 컨텍스트 (`*d.ts`파일 안이나 `declare`구문)에서 선언된 `const enum`에 다른 모듈에서 액세스하면 컴파일 오류가 발생하기 때문이다. `const enum`을 내부적으로 만사용하고 밖에서는 이용하지 않는다거나, 코드가 컴파일 될 때 옵션을 제어할 수 있으면 좋지만 그렇지 않기에 문제가 되는 것이다. 
[참조](https://www.kabuku.co.jp/developers/good-bye-typescript-enum)

즉, TypeScript 코드를 Babel과 같은 트랜스파일러를 사용하여  JavaScript코드를 만드는것이 일반적이다. 그러나 트랜스파일러는 한 번에 하나의 파일에서만 작동하므로 전체 유형 시스템에 의존하는 코드 변환을 적용할 수 없다.

<Blockquote type="info">

`const enum`의 값을 읽어오기 위해 해당 코드가 존재하는 모듈도 실행되어야 할테지만, `isolatedModules`가 켜져있다면 해당 작업을 수행할 수 없다.

</Blockquote>

이러한 제한으로 `const enum`과같은 TypeScript기능에 런타임 문제가 발생할 수 있게 되는 것이다. 
[참조](https://www.typescriptlang.org/tsconfig#isolatedModules)

또한, 긴 문자열을 할당하는 경우에는 Union Types와 비교해 다소 불리한점이 있다.
```ts
// TypeScript
const enum NAME {
  	JUGEM = '寿限無寿限無五劫の擦り切れ海砂利水魚の…', // 일본에서 '김수한무 거북이와 두루미 삼천갑자 동방삭...'과 비슷한 용도로 사용하는 긴 이름입니다.
	TARO = '다로', 
	JIRO = '지로', 
} 
const isJugem = name === NAME.JUGEM
 
// JavaScript 트랜스파일 후
const isJugem = name === "u5BFFu9650u7121u5BFFu9650u7121u4E94u52ABu306Eu64E6u308Au5207u308Cu6D77u7802u5229u6C34u9B5Au306Eu2026" /* JUGEM */;
```

`const enum`은 Babel로 트랜스파일할 수 없고, TypeScript의 `--isolatedModules`가 활성화된 설정에서는 큰 의미가 없어지게 된다.


### 결과
Tree-shaking의 관점에서 보았을 때는 UnionType을 사용하는것이 더 좋은 코드가 되는것이 아닐까 생각해본다.


### References
[TS 공식문서](https://www.typescriptlang.org/tsconfig#isolatedModules)

[LINE Engineering](https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking/)

[kabuku](https://www.kabuku.co.jp/developers/good-bye-typescript-enum)

[yceffort](https://yceffort.kr/2020/09/typescript-enum-not-treeshaked)

[허브의 개발일지](https://velog.io/@hhhminme/%EB%84%A4-Enum-%EB%88%84%EA%B0%80-Typescript%EC%97%90%EC%84%9C-Enum%EC%9D%84-%EC%93%B0%EB%83%90)





