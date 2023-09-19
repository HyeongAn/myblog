---
title: 'React Suspense'
description: '현재의 프로젝트에서 자사 라이브러리를 사용하기 위해 React.lazy를 사용하여 컴포넌트를 동적으로 임포트하고 사용했었다. 내가 사용한 react의 버전은 14인데, v16.6에서 실험적인 기능으로 suspense가 등장하게되어 현재 사용중인 React.lazy와 같이 사용할 수 있지 않을까하여 기록해 본다.'
coverImage: 'https://velog.velcdn.com/images/song961003/post/50ec1b07-d367-477f-80fb-6f3fbd91fc54/image.png'
date: '2023/08/26'
keywords: ['react', 'suspense', 'waterfall', '경쟁상태', 'fallback', '고찰', 'yoonhu']
category: 'react'
outline: 'React v18에 정식으로 등록된 Suspense에 대해 글을 써본다.'
---

![](https://velog.velcdn.com/images/song961003/post/50ec1b07-d367-477f-80fb-6f3fbd91fc54/image.png)

# Suspense

현재의 프로젝트에서 자사 라이브러리를 사용하기 위해 `React.lazy`를 사용하여 컴포넌트를 동적으로 임포트하고 사용했었다. 내가 사용한 react의 버전은 14인데, v16.6에서 실험적인 기능으로 `suspense`가 등장하게되어 현재 사용중인 `React.lazy`와 같이 사용할 수 있지 않을까하여 기록해 본다.

## Suspense의 배경

React를 사용해보면서 개발자라면 누구나 비동기로 데이터를 가져오는 작업에서 Loading처리를 위한 작업을 해보았을것이다. 나는 단지 `suspense`는 어떤 작업이 끝날때 까지 잠시 중단시키고, 다른 컴포넌트를 먼저 렌더링 한다는 장점이 있어서 사용하는구나! 라고 아주 짧은 생각으로 접근했었다.

하지만, 이전에는 어떠한 문제가 있었고 이를 해결하기 위한방법으로 어떠한 방식으로 구현이 되는지 정확하게 알필요가 있었다. 그렇다면, 이전의 방식에서 어떠한 문제점으로 인해 `suspense`라는 메소드가 나왔을까?

대표적으로는 `워터폴(waterfall)`현상과 `경쟁상태`, `데이터와 컴포넌트의 결합` 문제가 있다. `워터폴(waterfall)`현상부터 살펴보자.

### 워터폴(waterfall)

React의 컴포넌트는 부모에서 자식으로 내려오면서 순차적으로 렌더링된다. 생명주기 API인 `useEffect`를 이용해 내부에서 데이터를 불러내면 DOM Mount 이후 호출되기 때문에 렌더링 직후 데이터를 호출하기 시작한다.

상위 컴포넌트의 렌더링이 끝나지 않는다면 계층 구조에서 깊숙히 있는 하위 컴포넌트는 데이터를 호출하는 시점이 그만큼 지연되게 된다.

다시 정리하자면, 한 페이지에서 안의 여러 컴포넌트에서 동시에 비동기 데이터를 읽어올때 나타나는 현상이며, 상위 컴포넌트의 데이터 로딩이 끝나야지만 하위 컴포넌트의 데이터 로딩이 시작될 수 있다는 것이다.

![](https://velog.velcdn.com/images/ahsy92/post/f75bbddb-9d69-4bbb-b9fa-450119b876ce/image.gif)

위의 예제를 보아도 `useEffect`안에서 `fetch`를 사용하게 되면 사용자입장에서 답답한 느낌을 주며, 그리 좋지 못한 사용법이라 느껴진다. 데이터 로딩와 UI렌더링이라는 두 가지 전혀 다른 목표가 하나의 컴포넌트 안에 커플링 되어 코드가 읽기 어려워지고 테스트를 작성하기도 힘들어진다.

### 경쟁상태

비동기 통신은 반드시 요청한 순서대로 데이터가 응답된다는 보장이 없기 때문에 의도치 않게 싱크가 맞지 않은 데이터를 제공할 수도 있다는 문제이다.

React의 환경에서 경쟁상태란 여러개의 비동기의 결과가 하나의 DOM 객체에 반영되는 상황이 있을 것이다.

예를 들어 아래와 같은 상황을 가정해보자. 위의 waterfall 예제에서 버튼을 달아 각각의 userId를 바꿔주어 fetch를 보내보겠다.

![](https://velog.velcdn.com/images/ahsy92/post/717963b1-f0a8-4a9b-9f1f-208f4bcb1440/image.gif)

- 1부터 4까지 4개의 버튼이 있고, 각 버튼을 누르면 각 유저에 대한 정보를 서버로 요청하게 된다.
- 유저 정보 요청 응답을 앱이 받게 되면 해당 정보를 컴포넌트에 업데이트 하게 된다.

여기서 위와 같이 여러 버튼을 빠른 속도로 누른다고 생각해보자. 과연 마지막에 누른 버튼과 컴포넌트의 정보는 일치할까? 아마 마지막으로 누른 버튼이 4번이라고해도 1번의 정보가 표시될 수 있을 것이다.

이러한 문제가 발생하는 이유는 버튼을 순서대로 누른 유저 정보 요청에 대한 응답이 도착하고 순서대로 반영될 것이라는 흐름에 따라 발생하는 문제이다.

- 1번 유저정보 요청
- 로딩 UI렌더
- 1번 유저정보 응답
- 컴포넌트에 응답 반영

## Suspense의 도입

`Suspense`는 특정 컴포넌트에서 사용되고 있는 데이터의 준비가 아직 끝나지 않았음을 React에 알릴 수 있기 때문에 렌더링을 시작하기 전에 응답이 오기를 기다리지 않아도 된다.

- data 요청
- Suspense 하위의 컴포넌트에 요청 리소스 반영
- Suspense에 의해 로딩 UI 렌더
- data 응답
- 컴포넌트 렌더링

위와 같이 데이터 로딩의 구조를 바꿔 데이터 로딩과 UI렌더링을 분리하여 각각 실행되게 함으로써 위에서 이야기한 `waterfall`문제와 `경쟁상태`문제를 해결할 수 있게된다.

또한 `Suspense`가 응답이 언제 오는지, 시간에 대한것을 고려하지 않아도 되고, 데이터를 요청함과 동시에 해당 리소스를 반영하기 때문에 이전에 수행하고 있던 요청이 있더라도 해당 요청을 무시한채 새로운 요청으로 대체되게 된다.

여기서 주의할 점은 `Suspense`는 데이터를 호출하는 주체가 아니라는것이다. `Suspense`는 API를 호출할 때 사용하는 라이브러리들과 리엑트 컴포넌트간의 렌더링이 지연되어야 하는 시점을 연결하는 하나의 메커니즘인것이다.

### 동작 방식

현재로는 아직 `suspense`의 동작방식을 정확하게 알 수는 없다. 다만, 공식문서의 예제를 보면 `react-query`나 `swr`같은 data fetching 라이브러리를 별도로 사용하지 않았는데, 이를통해 어떤식으로 `Suspense`를 사용하게끔 만들었는지 살펴보자.

먼저 비동기의 요청에있어 Promise는 3가지 상태가 있다. `대기(pending)`, `이행(fulfilled)`, `거부(reject)`

이 3가지의 상태의 분류에따라 반환되는 값을 다르게 던져주는 것이다.
사실 말로해서는 감이 잘 오지 않으니 예제 코드를 봐보자.

```tsx
// fetch.modules.ts

export const fetchUser = (userId: number) => {
  let status = 'pending'
  let user: UserType | any
  const suspender = axios({
    url: `${process.env.REACT_APP_SUSPENSE_API}users/${userId}`,
    method: 'get',
  })
    .then((response) => {
      setTimeout(() => {
        user = response.data
        status = 'fulfilled'
      }, 3000)
    })
    .catch((e) => {
      status = 'reject'
      user = e
    })
  return {
    read() {
      if (status === 'pending') {
        throw suspender
      } else if (status === 'reject') throw user
      else if (status === 'fulfilled') return user
    },
  }
}
```

위의 `setTimeout`함수는 data의 Loading처리를 육안으로 확인하기 위해 3초의 지연시간을 준것이다.

위 함수의 반환부를 살펴보면 3가지 상태에 따른 값을 다르게 던져주고 있는것을 볼 수 있다.

```tsx
return {
  read() {
    if (status === 'pending') {
      throw suspender
    } else if (status === 'reject') throw user
    else if (status === 'fulfilled') return user
  },
}
```

위의 반환부가 핵심적인 아이디어이다. `fetch`, `axios`와 같은 http라이브러리의 호출을 promise로 한번 감싸고 응답이 오기 전까지는 계속 이 promise를 thorw해주는 것이다.

`Promise`가 `pending`상태일 경우에는 `pending`상태의 `promise`를 그대로 `throw`해주고, `fulfilled`상태일 때는 결과값을 반환해주게 되는 것이다.

> `read()`함수는 데이터 수신중에는 `suspender`변수에 저장되어 있는 API를 호출하는 코드를 반환하고 데이터 수신이 완료되면 데이터를 반환하게 된다.

이제 `Suspense`는 위의 3가지 상태를 바탕으로 컴포넌트를 마운트/언마운트를 판단하게 된다.

자식 컴포넌트를 마운트 시켰을때, **지연되어야 하는 작업\*(data fetching, 스크립트, 정적 파일 로딩 등)**이 있다면 다시 언마운트 시키고 fallback UI를 보여주게 된다. 그리고 완료된 작업이 있다면 다시 자식 컴포넌트를 마운트 시키게 되는 것이다.

### 사용

[React 공식문서](https://17.reactjs.org/docs/concurrent-mode-suspense.html)의 예제를 봐보자.

```jsx
const ProfilePage = React.lazy(() => import('./ProfilePage')) // Lazy-loaded

// Show a spinner while the profile is loading
;<Suspense fallback={<Spinner />}>
  <ProfilePage />
</Suspense>
```

생각보다 사용법은 간단하다. 비동기 요청의 응답을 기다리는 동안 컴포넌트를 감싸는 `suspense` 컴포넌트의 `fallback` prop으로 UI를 넣어주면, 컴포넌트를 가져오는 동안 보여줄 로딩 UI를 선언적으로 지정할 수 있다. JSX를 복잡하게 만들지 않고 직관적으로 로딩 UI를 지정할 수 있다는 점에서 코드가 좀 더 간결해지고 간편해진다.

### 예제

```tsx
// fetch.module.ts

import axios from 'axios'
import { PostsType, UserType } from './types'

export const fetchUser = (userId: number) => {
  let user: UserType
  const suspender = axios({
    url: `${process.env.REACT_APP_SUSPENSE_API}users/${userId}`,
    method: 'get',
  }).then((response) => {
    setTimeout(() => {
      user = response.data
    }, 3000)
  })
  return {
    read() {
      if (user === undefined) {
        throw suspender
      } else return user
    },
  }
}

export const fetchPosts = (userId: number) => {
  let posts: PostsType[]
  const suspender = axios({
    url: `${process.env.REACT_APP_SUSPENSE_API}posts?userId=${userId}`,
    method: 'get',
  }).then((response) => {
    setTimeout(() => {
      posts = response.data
    }, 3000)
  })
  return {
    read() {
      if (posts === undefined) throw suspender
      else return posts
    },
  }
}

const fetchData = (userId: number) => {
  return {
    user: fetchUser(userId),
    posts: fetchPosts(userId),
  }
}

export default fetchData
```

먼저 위에서 설명했듯이 `Suspense`를 사용하기 위한 3가지 상태를 만들고, `pending`의 상태일때 `Promise`를 `throw`해주고, `read()`함수를 이용하여 반환된 데이터에 접근할 수 있게 만들어주면 되겠다.

이제 부모 컴포넌트인 `<Main/>` 컴포넌트 안에서 비동기 처리가 될 자식 컴포넌트인 `<User/>` 컴포넌트를 `Suspense`로 감싸주면 되겠다. 이때, `<User/>` 컴포넌트가 로딩시 보여줄 컴포넌트는 `fallback`속성으로 넘겨주면 되겠다.

```tsx
// Main.tsx

import { Suspense } from 'react'
import User from './User'
import fetchData from '../fetch.module'

const Main = () => {
  return (
    <main>
      <h2>Suspense 사용</h2>
      <Suspense fallback={<div>user data Loading...</div>}>
        <User resource={fetchData(1)} />
      </Suspense>
    </main>
  )
}

export default Main
```

`<User/>` 컴포넌트에는 prop으로 유저의 정보를 가져오기 위한 `fetch.module.ts` 함수의 호출이 사용되게 된다.

```tsx
// User.tsx

import { Suspense } from 'react'
import { PostsType, UserType } from '../types'
import Posts from './Posts'

export interface ResourceType {
  resource: {
    user: {
      read(): UserType
    }
    posts: {
      read(): PostsType[]
    }
  }
}

const User: React.FC<ResourceType> = ({ resource }) => {
  const user = resource.user.read()
  return (
    <div>
      <p>
        {user.name}({user.email}) 님이 작성한 글
      </p>
      <Suspense fallback={<div>Post data Loading...</div>}>
        <Posts resource={resource} />
      </Suspense>
    </div>
  )
}

export default User
```

이제 `<User/>` 컴포넌트 안에서는 prop으로 넘어온 `resource`로 부터 유저의 데이터를 읽어올 수 있다. 마찬가지로, `<User/>`의 자식 컴포넌트인 `<Posts>` 컴포넌트 또한 `Suspense`로 감싸주어 유저의 post 데이터를 읽어올 수 있도록 하자.

```tsx
// Posts.tsx

import React from 'react'
import { ResourceType } from './User'

const Posts: React.FC<ResourceType> = ({ resource }) => {
  const posts = resource.posts.read()
  return (
    <ul>
      {posts.map((post) => {
        return (
          <li>
            {post.id}. {post.title}
          </li>
        )
      })}
    </ul>
  )
}

export default Posts
```

위의 `Suspense`를 활용한 예제는 `waterfall` 문제가 사라지고 화면에 거의 동시에 나타나는것을 확인할 수 있다.

![](https://velog.velcdn.com/images/ahsy92/post/35f5553d-5cd2-4772-8174-94adc9b4ad46/image.gif)

또한 `경쟁상태`문제도 사라진걸 확인할 수 있다.

![](https://velog.velcdn.com/images/ahsy92/post/59bc9af2-9488-407a-bad8-fefcf975dfe7/image.gif)

코드를 보면 좀더 깔끔한것을 볼 수 있듯, 데이터 로딩과 UI렌더링이 완전히 분리되어 코드 가독성이 높아진걸 볼 수 있다.

## Suspense의 고찰

`Suspense`에 대해 이것저것 시도해봤지만, 생각처럼 잘 작동하지 않았던점과 왜 그런지에 대한 정보를 적어두려한다.

위의 예제처럼 `Promise`의 3가지 상태를 이용해 `Suspense`를 사용하면되겠다는 생각으로 접근했고 `Promise`로 wrapping하여 사용하면 되겠다고 생각했다.

내가 한 실험은 아래와 같다.

```tsx
// fetch.module.ts

export const wrapPromise = (promise: Promise<any>) => {
  let status = 'pending'
  let result: any
  const suspender = promise
    .then((response) => {
      status = 'fulfilled'
      result = response
    })
    .catch((e) => {
      status = 'rejected'
      result = e
    })

  return {
    read() {
      if (status === 'pending') throw suspender
      else if (status === 'rejected') throw result
      else if (status === 'fulfilled') return result
    },
  }
}
```

`Promise`를 받아 해당 상태를 3가지로 나누고 `throw`를 던져 `read()`함수에 접근할 수 있도록 wrapping하는 함수를 만들었다.

```tsx
// fetch.module.ts

export const fetchUser = (userId: number) => {
  console.log(`user ${userId} data`)
  return new Promise((response, rejects) => {
    const data = axios({
      url: `${process.env.REACT_APP_SUSPENSE_API}/users/${userId}`,
      method: 'get',
    })

    if (data !== undefined) response(data)
    else rejects('error')
  })
}
```

이후, 유저의 정보를 받아오는 함수를 `Promise`로 반환하는 함수를 만들었고 컴포넌트에서 실행하기 위해 아래와 같이 구성했다.

### 오류

```tsx
// App.tsx

import User from './components/User'
import { Suspense } from 'react'

function App() {
  return (
    <div>
      <h1>React Suspense</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <User />
      </Suspense>
    </div>
  )
}

export default App
```

```tsx
// User.tsx

import { fetchUser, wrapPromise } from '../fetch.module'

const User = () => {
  const user = wrapPromise(fetchUser(1)).read()

  return (
    <div>
      <p>
        {user.name}({user.email}) 님이 작성한 글
      </p>
    </div>
  )
}

export default User
```

하지만 아래와 같이 fallback으로 넘겨준 컴포넌트와 `fetchUser`에 넣어둔 `console.log`만 계속해서 찍히고 있던 것이다.

![](https://velog.velcdn.com/images/ahsy92/post/a6f37b75-481c-42ad-803f-0cb4f2b23874/image.gif)

이에 대해 설명하기전에 `Suspense`가 작동하는 코드로 바꿔 비교하는게 더 좋을것 같다.

### 수정

```tsx
// App.tsx

import { Suspense } from 'react'
import User from './components/User'
import { fetchUser, wrapPromise } from './fetch.module'

function App() {
  const user1 = wrapPromise(fetchUser(1))

  return (
    <div>
      <h1>React Suspense</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <User resource={user1} />
      </Suspense>
    </div>
  )
}

export default App
```

```tsx
// User.tsx

const User = ({ resource }: UserProps) => {
  const user = resource.read()

  return (
    <div>
      <p>
        {user.name}({user.email}) 님이 작성한 글
      </p>
    </div>
  )
}

export default User
```

### 분석

자 이제 위에서의 오류가난 코드와 수정코드를 비교해보자.

오류 코드 출력을 보면 어떠한 컴포넌트도 뜨지않고 Element 탭 `<div id="root">`하위에 `fallback`으로 넘겨준 컴포넌트 이외의 어떠한 컴포넌트도 존재하지 않는걸 볼 수 있다. 또한 콘솔에는 `fetchUser`함수의 `console.log()`가 계속해서 증가하는걸 볼 수 있다.

왜 이러한 현상이 나타나는 걸까? 먼저 `console.log()`가 계속해서 찍히는 문제를 보자.

#### 왜 `console.log()`가 계속 찍힐까?

`console.log()`가 계속 찍힌다는것은 2가지의 경우를 생각해 볼 수 있다.
먼저, re-rendering이 되었을때이다. 컴포넌트가 변화가 생겼을때 React는 자동으로 인지하여 re-rendering이 실행된다. 여기서 `console.log()`이 실행되면서 `console`창에 값이 찍히게 되는것이다.

두 번째로는 컴포넌트가 언마운트 되고 다시 마운트 되었을때이다. 마운트 되었을때 `console.log()`의 값이 읽히고 언마운트, 마운트되면서 같은 값이 찍히게 되는것이다.

`Suspense`의 경우에는 두 번째의 경우이다. 이를 확인하는 방법은 `ref`를 확인하는 방법이 있다. `ref`값은 re-rendering이 되더라도 값이 변경되지 않기 때문에 컴포넌트의 re-redering인지 마운트/언마운트 인지 확인할 수 있는 기준이 될 수 있기 때문이다.

예시 코드로 확인해보자.

```tsx
const Counter = () => {
  const [count, setCount] = useState(0)
  const ref = useRef(Math.ceil(Math.random() * 1000))
  console.log({ ref: ref.current })

  useEffect(() => {
    setTimeout(() => {
      setCount((prev) => ++prev)
    }, 3000)
  }, [count])

  return (
    <div>
      <p>{count}</p>
    </div>
  )
}
```

`count`가 바뀌면서 3초마다 컴포넌트가 re-rendering이 일어나도록 만든 코드이다.

![](https://velog.velcdn.com/images/ahsy92/post/12c8f73c-9020-43f8-82d8-2400c30ef0f0/image.gif)

위 처럼 `ref`의 값은 변하지 않는다. 위의 코드를 활용하여 `User`컴포넌트에 적용해보자.

```tsx
// User.tsx

const User = () => {
  const ref = useRef(Math.ceil(Math.random() * 1000))
  console.log({ ref: ref.current })

  const user1 = wrapPromise(fetchUser(1)).read()

  return (
    <div>
      <p>{user1}</p>
    </div>
  )
}
```

![](https://velog.velcdn.com/images/ahsy92/post/88fe52dc-282d-471d-89a8-81e51fe99d5e/image.gif)

`ref`의 값이 변경되고 있다. 그렇다는건 결국, 컴포넌트가 re-rendering이 되는것이 아닌 마운트/언마운트 되고 있다는 뜻이다.

컴포넌트가 언마운트되고 다시 마운트될 때마다 새로운 `promise`객체를 만들어 `throw`하는 것이다. 결국 컴포넌트에서 참조되는 `promise`객체가 동일하지 않기 때문에 계속해서 마운트/언마운트가 무한루프에 빠지게 되는 것이다.

#### 왜 fallback으로 넘겨준 컴포넌트만 보여주게 될까?

fallback으로 넘겨준 컴포넌트만 나타나는 이유는 위의 `console.log()`가 계속 찍히는 이유에 연장선일것이다.

`Promise`의 `pending`와 `fulfilled`상태의 객체가 컴포넌트 내부에서 `throw`되면 참조되는 `promise`객체가 동일하지 않기 때문에 마운트/언마운트의 작업이 반복되는 것이라고 했다.

컴포넌트 트리 외부에서 선언하거나, 부모 컴포넌트에서 `promise`객체를 instantiate하고 props로 내려주게 되면, 컴포넌트에서 참조되는 `promise`객체가 동일하게 때문에 언마운트/마운트가 무한루프에 빠지지 않게 된다.

`useMemo`나 `ref`를 사용해도 똑같은 결과를 얻게 될 것이다. 리렌더링이 아니라 컴포넌트가 트리에서 없어졌다가 다시 생기는 것이기 때문이다. 컴포넌트의 마운트/언마운트와 관계없이 동일한 객체 참조를 유지하지 않으면 무한루프에 빠지게 된다.

## Reference

[DaleSeo](https://www.daleseo.com/react-suspense/)

[dante.log](https://velog.io/@jay/Suspense#%EC%BD%94%EB%93%9C-%EC%8A%A4%ED%94%8C%EB%A6%AC%ED%8C%85-v166)

[kasterra](https://kasterra.github.io/data-fetching-and-react-suspense/)
