---
title: 'React Zustand'
description: '이전엔 Redux(Tool-kit)을 사용하면서 다른 상태관리를 사용해본적은 없었다. 하지만 이번 프로젝트를 진행하면서 Zustand라는 상태관리 라이브러리를 사용해 봤는데 최소한의 코드로 상태를 변경할 수 있고, 어떻게 변하는지만 직관적으로 알면 좋았던 Zustand에 대한 기본적인 문법과 사용법을 기록해두려한다.'
coverImage: 'https://velog.velcdn.com/images/ahsy92/post/39aa2db4-366c-4267-a6b9-c2e7592b4833/image.png'
date: '2023/07/17'
keywords: ['react', 'zustand', '상태관리', '사용법']
category: 'react'
outline: 'React Zustand를 사용해보자.'
---

![](https://velog.velcdn.com/images/ahsy92/post/39aa2db4-366c-4267-a6b9-c2e7592b4833/image.png)

이전엔 `Redux(Tool-kit)`을 사용하면서 다른 상태관리를 사용해본적은 없었다. 하지만 이번 프로젝트를 진행하면서 `Zustand`라는 상태관리 라이브러리를 사용해 봤는데 보일러플레이트 코드가 길지 않아서 좋았고, 무엇보다 너무 편하게 사용할 수 있어서 좋았다.

최소한의 코드로 상태를 변경할 수 있고, 어떻게 변하는지만 직관적으로 알면 좋았던 `Zustand`에 대한 기본적인 문법과 사용법을 기록해두려한다.

## Zustand

---

"Zustand"는 독일어로 상태라는 뜻이다. 이 라이브러리의 특징은 위에서 이야기 했듯 사용하기 간편하고 굉장히 쉽다는 것이다. 보일러플레이트가 필요없다 싶을 정도로 간편하다.

### 설치

[공식 Zustand](https://www.npmjs.com/package/zustand)

```shell
npm install zustand # or yarn add zustand
```

### 사용법

```ts
// store.module.ts

// js로 사용할 때.
import { create } from 'zustand'

export const projectName = create((set) => ({
  state: 0,
  setState: (newState) => set({ state: newState }),
}))

// ts로 사용할 때.
interface State1 {
  state: number
  setState: (newState: number) => void
}

export const projectName = create<State1>((set) => ({
  state: 0,
  setState: (newState) => set({ state: newState }),
}))
```

위의 방법이 아주 기본적인 사용이 되겠다. 아주 쉽게 store에 state를 만들었고, 이제 사용만 하면 되는것이다.

```tsx
// Test.tsx

import { projectName } from './store.module'

const Test = () => {
  const { state, setState } = projectName()

  return <div>{state}</div>
}
```

`React`에서 사용하는 방법을 예로 들었다. `store.module.ts`에서 `export`한 상태를 가져와 객체의 구조분해할당으로 가져오면 되겠다.

끝이다. 이렇게 쉽게 접근할 수 있는 상태관리가 있었는가..`Redux`를 사용했다면 `Zustand`보다 더 많은 코드들을 정리하고 관리했어야 했을것이다.

### 응용

[공식문서](https://plainenglish.io/blog/using-zustand-and-typescript-to-make-a-to-do-list-in-react)에 있는것과 같이 간단한 todo list를 관리하는 state를 작성해보자.

```ts
// store.module.ts

interface TodoState {
	id: string
  	description: string
  	completed: boolean
}

interface TodoListState {
	todos: TodoState[]
  	addTodo: (description: string) => void
}

export const useTodo = create<TodoListState> = ((set) => ({
	todos: []
  	addTodo: (description) => {
  		set((prevState) => ({
        	todos: [
            	...prevState.todos, {
                	id: Math.random().toString(36).substring(2,11),
					description,
                  	completed: false
                }
            ]
        })
    )}
}))
```

```tsx
// Test.tsx

import { useTodo } from './store.module'

interface TestProps {
  description: string
}

const Test: React.FC<TestProps> = ({ description }) => {
  const { todos, addTodo } = useTodo

  return (
    <div>
      <button onClick={() => addTodo(description)}>Add Todo</button>
    </div>
  )
}

// button을 누르면 addTodo가 실행되는것을 볼 수 있다.
```

위의 예제처럼 콜백함수로 `prevState`를 넘겨주고 `todos`를 추가하는 방식으로 코드를 만들 수 있겠다.

사실 위의 `store.module.ts`에서 state의 구조를 모두 만들고 사용할 수 있겠지만, 다르게 사용해도된다.

```ts
// store.module.ts

interface TodoState {
	id: string
  	description: string
  	completed: boolean
}

interface TodoListState {
	todos: TodoState[]
  	addTodo: (newTodos: TodoState[]) => void
}

const useTodo = create<TodoListState>((set) => {
	todos: [],
  	addTodo: (newTodos: TodoState[]) => set({todos: newTodos})
})
```

```tsx
// test.tsx

import { useTodo } from './store.module'

interface TestProps {
  description: string
}

const Test: React.FC<TestProps> = ({ description }) => {
  const { todos, addTodo } = useTodo

  const onClickAdd = () => {
    const copyTodos = [...todos]
    copyTodos.push({
      id: Math.random().toString(36).substring(2, 11),
      description,
      completed: false,
    })
    addTodo(copyTodos)
  }

  return (
    <div>
      <button onClick={() => onClickAdd()}>Add Todo</button>
    </div>
  )
}

// button을 누르면 addTodo가 실행되는것을 볼 수 있다.
```

이번 방법은 `store.module.ts`에서 `prevState`를 넘겨주는게 아닌 새로운 `newTodos`를 만들고 해당 배열을 새롭게 써주는 형식인 것이다.

나는 이 두가지 방법을 많이 사용했었다. 컴포넌트의 코드를 좀 더 짧게 사용하기 원한다면 위의 방법을 사용해도 되겠지만, 아래의 방법을 사용하기에도 좋은 방법이될 수 있겠다.

개인적으로 `Redux`보다 좀 더 쓰기 편하고 보일러 플레이트도 적어 사용하기 너무 편했던 상태관리 라이브러리다.

#### 참고

[공식문서](https://plainenglish.io/blog/using-zustand-and-typescript-to-make-a-to-do-list-in-react)
[TOAST UI](https://ui.toast.com/weekly-pick/ko_20210812)
