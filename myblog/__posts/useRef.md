---
title: 'React useRef에 대한 고찰'
description: '사실 Ref에 관한 포스팅을 여러번 했었다. 부모컴포넌트에서 자식컴포넌트 호출하기 위한 forwordRef, onBlur, onFocus를 사용하면서 Ref를 직접 사용가기도 하고 focus설정이라던지, contentEditable을 사용할때도 사용했다. 사실 React를 사용하다보면 엘리먼트를 직접 선택해서 사용하는 경우가 많았다.'
coverImage: 'https://velog.velcdn.com/images/song961003/post/50ec1b07-d367-477f-80fb-6f3fbd91fc54/image.png'
date: '2023/08/24'
keywords: ['react', 'useRef', 'MutableRefObject', 'RefObject', '고찰', 'yoonhu']
category: 'react'
outline: 'React useRef에 대해 자세히 알아보려고 쓴글이다.'
---

사실 `Ref`에 관한 포스팅을 여러번 했었다. 부모컴포넌트에서 자식컴포넌트 호출하기 위한 `forwordRef`, `onBlur`, `onFocus`를 사용하면서 `Ref`를 직접 사용가기도 하고 `focus`설정이라던지, `contentEditable`을 사용할때도 사용했다. 사실 React를 사용하다보면 엘리먼트를 직접 선택해서 사용하는 경우가 많았다.

이번엔 사용방법뿐만 아니라 개념과 예시를 다시 포스팅해보면서 정리하려고 한다.

# Ref와 useRef

이 `Ref`를 React에서 사용하기 위해서는 그저 `useRef`를 사용해야하는구나로 알고 있었어서 조금 더 다르게 활용한다던가, `ref`값에 다른게 들어가면 헷갈리는 부분이 생기게 되었다.

이 부분의 정확한 차이를 알고 있어야 실전에서 잘 쓸 수 있지 않을까?

## Ref

`Ref`는 render메서드에서 생성된 DOM노드나 React엘리먼트에 접근하는 방법을 제공한다. 일반적인 데이터 플로우에서 벗어나 직접적으로 자식을 수정해야하는 경우도 있을 수 있으며 수정할 자식은 React 컴포넌트의 인스턴스일 수도 있고 DOM 엘리먼트일 수도 있다.

즉, ref를 사용하는 케이스는 크게 두가지의 경우가 있다는 말이다.

1. 자식 컴포넌트를 직접 접근하여 수정할 때.
2. DOM 엘리먼트에 접근하고 싶을 때.

1번의 경우는 이전에 포스팅한 `contentEditable`과 같은 경우일 수도 있겠다. 하지만 이러한 방법은 React에서 지양하고 있는 방법으로 요소를 업데이트할때 영향을 받거나 문제가 발생할 수 있기에 경고가 뜨게 된다.

2번의 경우가 사실 대부분이긴하다. 특정 DOM엘리먼트에 접근해서 해당 이벤트를 실행시킨다거나, `attribute`들에 접근할 수 있다.

```tsx
import { useState, useEffect, useRef } from 'react'

const useDropDown = (initialState: boolean): [boolean, React.RefObject<HTMLDivElement>, () => void] => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState)
  const selectedRef = useRef<HTMLDivElement>(null)

  const removeHandler = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClick = (e: React.BaseSyntheticEvent | MouseEvent) => {
      if (selectedRef.current !== null && !selectedRef.current.contains(e.target)) {
        setIsOpen(!isOpen)
      }
    }

    if (isOpen) window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [isOpen])

  return [isOpen, selectedRef, removeHandler]
}

export default useDropDown
```

DropDown을 구현하면서 만든 Hook이다. `Ref`를 이용해서 해당 엘리먼트 클릭에서 벗어나게 되면 해당 `Ref`를 가지고 있는 컴포넌트가 click이벤트에 포함된 이벤트인지 확인하게 된다.

```tsx
// 활용

import useDropDown from 'hooks/useDropDown'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

interface Dropdown {
  isOpen: boolean
}

const Test = () => {
	const [isOpen, selectedRef, removeHandler] = useDropDown(false)

    return (
    	<button
          ref={selectedRef}
          onClick={removeHandler}
          >
      		Click!
      	</button>
      	<DropDownComponent isOpen={isOpen}/>
    )
}

const DropDownComponent = styled.section<Dropdown>`
	width: 145px;
	height: 100px;
	display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: white;
    padding: 10px 0;
    z-index: 999;
    border-radius: 8px;
    box-shadow: 0 4px 20px 0 rgb(174 174 174 / 20%);
    position: absolute;
    visibility: hidden;
    transform: translate(-50%, -50px);
    transition: opacity 0.4s ease, transform 0.4s ease;

    ${({ isDropped }) =>
      isDropped &&
      css`
        opacity: 1;
        visibility: visible;
        transform: translate(-50%, 0);
        right: -155px;
        bottom: -80px;
      `}
`

export default Test

```

위처럼 특정 엘리먼트를 지목하고, 사용할 수 있다. 실제 `ref`를 활용하는데 큰 문제는 없지만 이번에는 좀 더 깊게 정리해보려고 한다.

### ref의 타입

`ref`는 아래의 타입을 가지고 있는 하나의 객체를 선언해주는 함수이다.

```ts
interface RefObject<T> {
  readonly current: T | null
}
```

그리고 아래의 타입은 실제 @types/react에 담겨있는 ref props의 타입들이다.

```ts
// index.d.ts

interface RefObject<T> {
  readonly current: T | null
}

// Bivariance hack for consistent unsoundness with RefObject
type RefCallback<T> = {
  bivarianceHack(instance: T | null): void
}['bivarianceHack']
type Ref<T> = RefCallback<T> | RefObject<T> | null
type LegacyRef<T> = string | Ref<T>
```

여기서 `ref`속성에 직접적으로 들어가는 타입은 `LegacyRef<T>`의 타입이다. `LegacyRef<T>`는 `string`, 혹은 `Ref<T>`가 들어갈 수 있는것을 볼 수 있다.

그 위에`Ref<T>`는 또 `RefCallback<T>`, `RefObject<T> `, `null`이 가능하므로 `string`이 들어가는건 `Legacy`이므로 제외, `null`도 제외하면 실제로 `ref`에 들어가는 형태는 크게 `RefCallback<T>`, `RefObject<T> `가 되겠다.

## useRef

`useRef`는 React hooks의 일종으로, 인자로 넘어온 초깃값을 `useRef`객체의 `.current`프로퍼티에 저장하게 된다. DOM 객체를 직접 가리켜서 내부 값을 변경하거나 `forcus()`메소드를 사용하거나 값이 변경되어도 컴포넌트가 리렌더링 되지 않도록 하기 위한 값들을 저장하기 위해서도 사용한다.

다시 정리하자면, `useRef`가 내용이 변경되어도 이를 알려주지 않기 때문에 리렌더링이 되지 않는것이다. `.current`프로퍼티를 변경시키는건 리렌더링을 발생시키지 않기에 로컬 변수 용도로도 사용할 수 있는 것이다.

```ts
interface RefObject<T> {
  readonly current: T | null
}
```

`useRef`는 위의 타입을 가지고 있는 하나의 객체를 선언해주는데, 결과값은 항상 위와 같은 타입을 갖게 된다. 테스트로 React의 컴포넌트 안에서 `useRef`를 호출하고 `console.log`로 결과를 보자.

```tsx
// test.tsx

import { useRef } from 'react'

const Test = () => {
  const testRef = useRef(null)

  console.log({ testRef })
  return (
    <div>
      <div></div>
    </div>
  )
}

export default Test
```

`useRef`의 결과 값은 항상 위와 같은 타입을 갖게 된다. React 컴포넌트 안에서 `useRef`를 콘솔로 찍어보면 아래와 같이 나오게 된다.

![](https://velog.velcdn.com/images/ahsy92/post/ca6ad255-7771-43ec-8834-e260d286b1c8/image.jpg)

특별한게 없어보이지만 자세한 이야기는 아래의 `useRef`의 타입을 보면 더 자세하게 이해할 수 있겠다.

### useRef의 타입

본질적으로 `useRef`는 `.current`프로퍼티에 변경가능한 값을 담고 있는 상자와 같다고 한다.

이말은 `useRef`의 반환타입인 `MutableRefObject`와 `RefObject`의 정의를 보면 더욱 명확하게 이해할 수 있다.

```ts
// index.d.ts

function useRef<T>(initialValue: T): MutableRefObject<T>
function useRef<T>(initialValue: T | null): RefObject<T>
function useRef<T = undefined>(): MutableRefObject<T | undefined>

interface MutableRefObject<T> {
  current: T
}

interface RefObject<T> {
  readonly current: T | null
}
```

위에서 볼 수 있는 `useRef`의 타입은 3가지다.(몰랐음..) 하지만, 일반적으로 `useRef` hooks로 호출되는 값의 타입으로는 아래와 같다.

```ts
// index.d.ts

function useRef<T = undefined>(): MutableRefObject<T | undefined>

interface MutableRefObject<T> {
  current: T
}
```

이 타입을 보게 되면 `useRef`는 결국 컴포넌트의 생태주기를 함께하는 `{current: T}`형태의 객체를 선언하는 것에 불과한것이다. 즉 그저 함수 초깃값을 `.current`에 저장할 뿐이다.

즉, `useRef`**로 인해 반환된 객체는 컴포넌트의 전 생애주기를 통해 유지된다.**

`useRef`로 만들어진 객체는 React가 만든 전역 저장소에 저장이 되기 때문에 함수를 재호출 하더라도 해당 컴포넌트의 생애주기동안은 계속 `.current`값을 유지하고 있을 수 있다는 뜻이다.

또한 `useState`와는 다르게`useRef`로 부터 생성된 객체는 `.current`값이 변화해도 렌더링에 관여하지 않는다.

공식문서에도 아래와 같이 설명하고 있다.

> `useRef`로 생성된 객체와 일반적인 {current: ...} 객체의 차이점이라면 `useRef`는 매번 렌더링을 할 때 동일한 `ref`객체를 제공한다. `useRef`는 순수 JS객체를 생성하기 때문이다.
> [React-공식문서](https://ko.reactjs.org/docs/hooks-reference.html#useref)

그렇다면 일반적으로 사용하던 `ref`를 통해 엘리먼트 노드에 접근하는 것은 어떻게 가능한 것일까?

바로 React에서 이미 컴포넌트의 `ref props`로 들어온 객체의 `.current`프로퍼티를 설정하도록 미리 구현이 되어있기 때문이다. 즉, `ref`에 `useRef`를 통해 생성된 객체를 넣어주면 해당 컴포넌트가 변경될 때마다 객체의 `.current`프로퍼티가 컴포넌트의 DOM 객치로 설정이 되고 우리는 그 DOM객체를 이용할 수 있게 되는 것이다.

## Ref와 useRef 예

위의 메커니즘을 알았다면 아래 두개의 예시가 어떻게 출력이 되는지 예상이 될 것이다.

```tsx
// App.tsx

interface InputRefType {
  current: null | HTMLInputElement
}

const inputRef: InputRefType = { current: null }

const App = () => {
  const onClickHandler = () => {
    if (inputRef.current !== null) {
      inputRef.current.focus()
      inputRef.current.click()
    }
  }

  const onInputClickHandler = () => {
    alert('input clicked!')
  }

  console.log({ appRef: inputRef })

  return (
    <div>
      App.js
      <input ref={inputRef} type="text" onClick={() => onInputClickHandler()} />
      <button onClick={() => onClickHandler()}>Focus on input</button>
    </div>
  )
}

export default App
```

```tsx
// test.tsx

import { useRef } from 'react'

const Test = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const onClickHandler = () => {
    if (inputRef.current !== null) {
      inputRef.current.focus()
      inputRef.current.click()
    }
  }

  const onInputClickHandler = () => {
    alert('input clicked!')
  }

  console.log({ testRef: inputRef })

  return (
    <div>
      <input ref={inputRef} type="text" onClick={() => onInputClickHandler()} />
      <button onClick={() => onClickHandler()}>Focus on input</button>
    </div>
  )
}

export default Test
```

결과는 두 예제 모두 같은 결과값이 나오게 된다. 첫 번째는 `useRef`대신에 global변수로 `inputRef`를 선언하여 `.current`의 프로퍼티를 받을 수 있게 해준것이다.

`useRef`의 타입에서 보았듯, `.current`프로퍼티 즉, `{current: T}`형태의 객체를 선언하는 것에 불과했다. 위의 `App.tsx`에서의 케이스에서도 똑이 작용하여 global로 선언된 객체는 리렌더링을 만들지 않으므로 똑같이 작용하게 되는것이다.

다면 여기서 주의해야할 점은 `.current`프로퍼티를 변경하는것 자체가 리렌더링을 발생시키지는 않는 것이다. 만약 React가 DOM 노드에 `ref`를 추가하거나 제거할 때 코드를 실행하려면 `callbackRef`를 사용해야한다.

![](https://velog.velcdn.com/images/ahsy92/post/5a8ad04d-ab2b-46de-a0dc-43648cca7c54/image.jpg)

---

# Ref와 useRef 번외

## RefCallback

> `ref`속성에 직접적으로 들어가는 타입은 `LegacyRef<T>`의 타입이다. `LegacyRef<T>`는 `string`, 혹은 `Ref<T>`가 들어갈 수 있는것을 볼 수 있다.
>
> 그 위에`Ref<T>`는 또 `RefCallback<T>`, `RefObject<T> `, `null`이 가능하므로 `string`이 들어가는건 `Legacy`이므로 제외, `null`도 제외하면 실제로 `ref`에 들어가는 형태는 크게 `RefCallback<T>`, `RefObject<T>`가 되겠다.

위에서 언급했던것 처럼 `useRef`에 이어 지금까지 이야기 했던것 `ref`는 `RefObject<T>` 형태의 `ref`였다.

그렇다면 `RefCallback<T>` 형태의 `ref`는 도대체 무엇일까? 이름에서도 바로 알 수 있듯 **callbackRef**이다. `ref`에는 callback형태로도 값을 집어넣을 수 있다. 이 callbackRef를 이용해서 `ref`가 설정되고, 해제되는 상황의 동작을 세세하게 다룰 수 있다.

```tsx
import { useState } from 'react'

const Test = () => {
  const [height, setHeight] = useState(0)

  const callbackRef = (element: HTMLInputElement | null) => {
    if (element) {
      setHeight(element.getBoundingClientRect().height)
    }
  }

  return (
    <>
      Height:
      <input ref={(el) => callbackRef(el)} value={height} />
    </>
  )
}

export default Test
```

이번엔 `useRef`를 사용하지 않고 `callbackRef`를 사용하여 해당 엘리먼트 값에 함수를 실행시켜주고 있다. `input`엘리먼트에 `height`의 값을 바로 가져와 바로 `value`에 표시해주고 있다.

이처럼 `ref`는 객체 뿐만아니라 함수까지 넘겨줄 수 있는 것을 볼 수 있다.

## useRef의 오버로딩

위에서 보았듯 `index.d.ts`에서 `useRef`의 정의가 오버로딩되어 있는 것을 볼 수 있었다. 가끔 언제 어떤 `useRef`가 쓰이는지 몰라서 코드를 짤때 에러가 생하게 되는데 오버로딩 되는 `useRef`를 하나씩 뜯어보자.

### 1. useRef< T >(initalValue: T): MutableRefObject< T >

인자의 타입과 `generic`의 타입이 `T`로 일치하는 경우 `MutableRefObject<T>`를 반환한다. 즉, `MutableRefObject<T>`의 경우 `current`프로퍼티 그 자체를 직접 변경할 수 있다.

```tsx
// test.tsx

import { useRef } from 'react'

const Test = () => {
  const firstRef = useRef(0)

  const onClickHandler = () => {
    firstRef.current++
    console.log(firstRef.current)
  }

  return (
    <>
      <button onClick={onClickHandler}>버튼</button>
    </>
  )
}

export default Test
```

간단하게 `useRef`를 로컬변수 용도로 사용하는 경우이다. 버튼을 클릭할 경우 `firstRef`의 `.current`프로퍼티의 값이 1씩 증가한다.

`useRef`에 `generic` 타입과 동일한 타입의 초기 인자를 줬으므로 여기에 사용된 `useRef`는 `useRef<T>(initalValue: T): MutableRefObject<T>`의 케이스가 되겠다. 그러므로 `.current`를 직접 수정하여 로컬 변수처럼 사용할 수 있는 것이다. 만약 `useRef`에 인자를 `null`로 초기화했다면 어떤 일이 벌어질까?

![](https://velog.velcdn.com/images/ahsy92/post/3dff626f-e8bd-4651-b540-8469769bfa02/image.jpg)

`.current`프로퍼티를 수정할 수 없는 것을 볼 수 있다. 이는 `useRef` 두 번째 케이스이므로 `readonly`인 `RefObject`를 반환했기 때문이다.

### 2. useRef< T >(initialValue: T|null): RefObject< T >

인자의 타입이 `null`을 허용하는 경우 `RefObject<T>`를 반환한다. `RefObject<T>`는 위의 예제에서 보았듯이 `.current`프로퍼티를 직접 수정할 수 없다.

다른 예시를 봐보자.

```tsx
import { useRef } from 'react'

const Test = () => {
  const secondRef = useRef<HTMLInputElement>(null)

  const onClickHandler = () => {
    if (secondRef.current) {
      secondRef.current.value = ''
    }
  }

  return (
    <div>
      <input ref={secondRef} />
      <button onClick={() => onClickHandler()}>Clear</button>
    </div>
  )
}

export default Test
```

`input element`를 `ref`로 받아서 버튼을 클릭하면 `input`의 `value`를 직접 빈 문자열로 수정하는 예제이다.

![](https://velog.velcdn.com/images/ahsy92/post/e0eee8dd-f981-4cbe-b624-b346c2b5b0f8/image.gif)

이 경우에는 위의 결과를 보면 정상적으로 작동하는 것을 볼 수 있다. `.current`의 프로퍼티만 읽기 전용이므로 `.current`의 하위 프로퍼티인 `.value`는 여전히 수정 가능한 상태이다. 이는 `readonly`가 shallow(얕기)하기 때문이다.

### 3. useRef<T = undefined>(): MutableRefObject<T | undefined>

위에서 이야기 했듯 `useRef` hooks로 호출되는 값의 타입이다. `generic`에 `undefined`를 넣는 경우이다. `MutableRefObject`를 반환하게 되며 매개변수가 아예 없을때 사용된다.

위의 두 번째 예제에서 매개변수를 없애고 `undefined`가 되었을 때의 에러를 살펴보면 아래와 같이 나오게 된다.

```tsx
import { useRef } from 'react'

const Test = () => {
  const thirdRef = useRef<HTMLInputElement>()

  const onClickHandler = () => {
    if (thirdRef.current) {
      thirdRef.current.value = ''
    }
  }

  return (
    <div>
      <input ref={thirdRef} /> //여기서 에러 발생
      <button onClick={() => onClickHandler()}>Clear</button>
    </div>
  )
}

export default Test
```

![](https://velog.velcdn.com/images/ahsy92/post/a6c7874b-7e96-408f-b1d9-20f59b03a1c1/image.png)

현재 `ref` 프로퍼티는 `RefObject`형만 받는데 `inputRef`는 정의상 `MutableRefObject`가 되고, 이를 `ref`프로퍼티에 집어넣으려고 해서 발생하는 에러인 것이다.

### 정리

위의 3가지 타입을 뜯어보았다. `useRef`는 크게 2가지의 경우를 생각하면 될것 같다.

**1. 전역 변수로 사용되는 경우**

```tsx
const initalValue = useRef<number>(0)
```

위와 같이 전역 변수 용도로 `useRef`가 사용되는 경우 `MutableRefObject<T>`를 사용해야 하므로 `generic`과 같은 타입의 초깃값을 넣어주면 되겠다.

**2. DOM을 조작하는 경우**

```tsx
const inputRef = useRef<HTMLInputElement>(null)
```

DOM을 직접 조작하기 위한 `ref` 프로퍼티로 `useRef`객체를 사용할 경우, `RefObject<T>`를 사용해야 하므로 초깃값으로 `null`을 선언하여 사용하면 되겠다.

참고
[공식문서](https://ko.legacy.reactjs.org/docs/hooks-reference.html#useref)
[개발자 아저씨들 힘을 모아](https://programming119.tistory.com/265)
[driip.me](https://driip.me/7126d5d5-1937-44a8-98ed-f9065a7c35b5)
[itchallenger](https://itchallenger.tistory.com/673)
