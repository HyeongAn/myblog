---
title: 'NextJS Blog (4)'
description: '이전에 원티드 Pre-on-Boarding에서 배운 NextJS를 좀 더 활용하고자 정적인 Blog를 만들어 본다.하여 이번엔 해보지 않은 Infinity Scroll을 구현해보고 싶었다. 또한 눈의 피로를 줄이기 위한 다크모드도 정리해보고자 한다.'
coverImage: 'https://velog.velcdn.com/images/ahsy92/post/8077a889-90ed-4696-acfa-5fb34d3c8a9f/image.png'
date: '2023/10/18'
keywords: ['NextJS', 'NextJS13', 'Blog', 'react markdown', 'yoonhu']
category: 'makeblog'
outline: 'NextJS v13으로 정적인 블로그를 만들어보며 겪었던, 해결했던 문제들을 적어둔다.'
---

![nextjs로 블로그 만들기 이미지](https://velog.velcdn.com/images/ahsy92/post/8077a889-90ed-4696-acfa-5fb34d3c8a9f/image.png)

# NextJS 정적 블로그 만들기

이전에 원티드 Pre-on-Boarding에서 배운 NextJS를 좀더 활용하고자 정적인 Blog를 간단하게 만들어 보았었다. 헌데 방법을 알았다고 해서 모든걸 다 경험한것은 아닐것 같아 공부겸 조금더 다듬어 개인 Blog를 만들어 보고싶었다. 아주 [오래전 프로젝트](https://github.com/HyeongAn/codestates-fe-advanced-course)에서 페이지 네이션을 구현 했던 적이 있다. 하여 이번엔 해보지 않은 Infinity Scroll을 구현해보고 싶었다. 또한 눈의 피로를 줄이기 위한 다크모드도 정리해보고자 한다.

<Blockquote type="info">
  PS. 구글도 페이지 네이션 대신 infinity Scroll로 바뀌었다.
</Blockquote>

## Infinity Scroll 구현하기

`infinity Scroll` 또한 `IntersectionObserver`를 이용해 쉽게 구현할 수 있었다. 어느 시점이 되었을 때(관찰 되었을 때) 나머지 post들을 보여주면 되는 것이다. `IntersectionObserver`는 이전 포스팅에 자세한 내용을 적어두었으니, 같은 내용을 또 다시 적어두진 않겠다.

현재 post들을 보여주고 있는 컴포넌트는 아래와 같다. 모든 데이터를 `postData`로 받아서 맵핑해주어 `PostCard`를 만들어 주고 있다.

```tsx
// ./components/posts.posts.tsx

'use client'
import { PostGridContainer } from '@/components/style/container'
import { PostListProps } from '../../../../types/props'
import PostCard from './post-card'
import { AnimatePresence, motion } from 'framer-motion'

const Posts = ({ postData }: PostListProps) => {
  return (
    <AnimatePresence>
      <motion.div
        style={{ width: '100%' }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
        }}
      >
        <PostGridContainer>
          {postData && postData.map((data, index) => <PostCard postData={data} key={`post-card-${index}`} />)}
        </PostGridContainer>
      </motion.div>
    </AnimatePresence>
  )
}

export default Posts
```

먼저, post 컴포넌트로 들어오고 있는 `postData`를 몇개씩 보여줄 것인지 정해서 `slice`로 잘라 주면 좋을것 같다. 또한 `IntersectionObserver`를 통해 감시할 `element`를 지정해 두면 좋을것 같다. `useRef`를 이용해 `div`에 `observer`를 걸어두면 좋겠다.

```js
const NUMBER_OF_ITEMS_PER_PAGE = 10

const Posts = ({ postData }: PostListProps) => {
  const [count, setCount] = useState < number > 1
  const targetRef = useRef < HTMLDivElement > null

  // ...

  return (
    <>
      // ..
      {postData && postData.map((data, index) => <PostCard postData={data} key={`post-card-${index}`} />)}
      <div ref={targetRef} />
    </>
  )
}
```

위와 같이 되었으면, `IntersectionObserver`가 감지 되었을 때 실행되는 callback을 작성해두면 되겠다.

```ts
const handleIntersect = useCallback(
  ([entry]: IntersectionObserverEntry[], observe: IntersectionObserver) => {
    // 교차 상태가 되었을 경우 count를 하나씩 증가시킴
    if (entry.isIntersecting) {
      setCount((prev) => prev + 1)
      // count의 증가가 끝나면 대상의 관찰을 중단.
      observe.disconnect()
    }
  },
  [count]
)
```

이후 `intersectionObserver`를 사용하기 위해서 `useEffect`안에서 실행할 수 있도록 로직을 만들어 준다.

```tsx
useEffect(() => {
  // IntersectionObserver에 위에서 만든 callback 함수인 handleIntersect 함수를 넘겨주어 새로운 인스턴스 생성.
  const observe = new IntersectionObserver(handleIntersect, defaultOption)
  // 지정해둔 div element가 null이 아닐때, 지정한 div element를 관찰.
  targetRef.current && observe.observe(targetRef.current)

  // 언마운트시, 관찰을 중단.
  return () => {
    observe.disconnect()
  }
}, [handleIntersect, targetRef.current])
```

위의 로직을 하나의 hooks로 만들어 묶어두면 좋을것 같아 아래와 같이 useInfiteScroll을 만들었다.

```tsx
// ./lib/hooks/useInfiniteScroll.tsx

import React, { useCallback, useEffect, useRef, useState } from 'react'

const defaultOption = {
  threshold: 0.5,
  root: null,
  rootMargin: '0px 0px 0px 0px',
}

const useInfiniteScroll = (): [React.RefObject<HTMLDivElement>, number] => {
  const [count, setCount] = useState(1)
  const targetRef = useRef<HTMLDivElement>(null)

  const handleIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[], observe: IntersectionObserver) => {
      if (entry.isIntersecting) {
        setCount((prev) => prev + 1)
        observe.disconnect()
      }
    },
    [count]
  )

  useEffect(() => {
    const observe = new IntersectionObserver(handleIntersect, defaultOption)
    targetRef.current && observe.observe(targetRef.current)

    return () => {
      observe.disconnect()
    }
  }, [handleIntersect, targetRef.current])
  return [targetRef, count]
}

export default useInfiniteScroll
```

## 다크모드 구현하기

다크모드가 크게 중요한 부분을 차지 하지 않지만, 이전에 해보지 못했던 기능들을 하나씩 넣어보자 하고 해서 넣은 기능이었다. NextJS의 `theme`를 바꾸는 라이브러리인 `next-themes`를 사용하면 손쉽게 다크모드를 구현할 수 있지만, 기능 구현을 너무 라이브러리에 치중하는 느낌이라 새롭게 만들어 보고자 했다. 여러 방법 태그 데이터 속성(dataset)과 CSS 사용자 속성(CSS Custom Properties)을 사용해보고자 한다.

그렇다면 먼저 데이터 속성(dataset)을 먼저 알아보자.

### 데이터 속성(dataset) 사용하기

`HTML` 태그에는 표준으로 정의된 속성들이 존재하는데 데이터 속성의 경우에는 사용자가 지정한 속성을 표시하는데 표준화된 방법을 제공하기 위해 `HTML5`에서 새로 확장된 속성이다.

```html
<article id="blog" data-name="mine-it-record" data-columns="3" data-index-number="12314" data-new-title="dataSet" />
```

#### JavaScript에서 사용하기

값을 읽기 위한 `HTML`의 이름과 `getAttribute()`를 사용해도 되지만, 조금 더 간단한 방법으로 `DOMStringMap`은 `dataset`속성을 읽어 낼 수 있다. [MDN](https://developer.mozilla.org/ko/docs/Learn/HTML/Howto/Use_data_attributes)

`DOM`속성으로 변환될 때 `data-`는 제외하고 속성명만 실제 속성 이름으로 사용하며 `DOM` 생성 시점에 `data-`로 시작하는 속성들을 하나로 모아 `dataset` 맵으로 따로 모아 관리하게 된다.

`dataset` 객체를 통해 `data`속성을 가져오기 위해서는 속성 이름의 `data-***` 뒷 부분을 사용한다.

```js
var article = document.getElementById('electriccars')

article.dataset.columns // "3"
article.dataset.indexNumber // "12314"
article.dataset.name // "mine-it-record"
```

각 속성은 문자열이며 읽거나 쓸 수 있다. 위의 경우에서 `article.dataset.columns = 10`으로 설정하면 `"10"`으로 변경된다.

#### CSS에서 접근하기

데이터 속성(dataset)은 순수 `HTML`속성이기 때문에 CSS에서도 접근할 수 있다.

```css
article[data-columns='3'] {
  width: 400px;
}
article[data-columns='4'] {
  width: 600px;
}
```

`CSS`의 속성 선택자로 데이터에 따라 스타일을 바꾸는데 사용할 수 있다.

데이터 속성(dataset)은 `React`의 `state`와 같이 변하는 값도 저장할 수 있다. 다만, 보여지는 값이기때문에 보안에 관련된 데이터는 저장하는게 좋지 않을 것이다.

### CSS 사용자 속성(CSS Custom Properties)

CSS 변수(CSS Variable)은 예전에 Sass와 같은 CSS 전처리기를 통해서 접할 수 있었던 기능이었다고 한다. 하지만 최근에는 CSS 스펙 자체에 CSS 변수 개념이 추가되어 CSS 전처리기 없이도 CSS 변수를 사용할 수 있게 되었다.

#### CSS 변수(CSS Variable)

CSS 변수가 CSS 사용자 속성이라고 불리는 이유는 CSS 일반 속성과 동일한 문법으로 정의가 가능하기 때문이다. 기존의 속성과의 차이점이라면 `--`로 시작해야한다는 점이다.

```css
body {
  --background: black;
  background: white;
}
```

배경의 색을 지정해주는 `background-color` 속성과 달리 `--background-color`속성이 있다고 해서 스타일 효과를 내지는 못한다. 이를 위해서는 CSS 변수(CSS Variable)에 접근해야한다.

**접근**

CSS 변수(CSS Variable)가 스타일하는데 사용되려면 CSS 일반속성에 설정을 해주어야 하는데 `var()`함수를 사용하여 접근하게 된다.

```css
body {
  --background: black;
  backgoround: var(--background);
}
```

위와같이 `--background-color`속성에 저장된 CSS 변수값을 읽어서 `background`속성에 할당할 수 있다.

`var()`함수는 두번째 인자로 기본값을 받게 되는데 CSS 변수에 접근할 때 해당 CSS 변수가 정의되어 있지 않을 경우에 활용할 수 있다.

```css
body {
  --background: black;
  backgoround: var(--background, white);
}
```

위의 스타일은 `--background`가 정의 되어 있는 경우에 변수값이 `background`속성으로 사용되고 그렇지 않을 경우에는 `white`가 대신 `bakground`속성값으로 들어가게 된다.

**상속**

CSS 변수는 상위 엘리먼트에서 하위 엘리먼트로 상속이 된다. 즉, 상위 엘리먼트에서 정의된 CSS 변수는 하위 엘리먼트에서 접근할 수 있게 된다는 것이다.

```html
<body>
  <p class="dark">다크모드일 경우</p>
  <p class="light">라이트모드일 경우</p>
</body>
```

```css
body {
  --dark: black;
  --light: white;
}

p.dark {
  color: var(--dark);
}

p.light {
  color: var(--light);
}
```

### 구현

```css
// ./globals.css

body[data-theme='dark'] {
  background-color: #202125;
  color: rgba(255, 255, 255, 0.91);
  ...;
}

body[data-theme='light'] {
  background-color: white;
  color: #202125;
  ...;
}
```

위에서 설명했던 데이터 속성(dataset)의 선택자로 다크와 라이트 모드를 분류해주고, 각각의 테마에서 사용할 CSS 변수들을 지정해 두면 되겠다. 테마가 변경 되면서 지정해둔 CSS 변수로 스타일이 적용될 것이다.

이후 header에 다크모드를 위한 버튼을 추가해주고, 다크모드가 적용되는지 살펴보면 되겠다.

```tsx
// ./components/layout/header.tsx

const themeModeHandle = () => {
  const newTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark'
  document.body.dataset.theme = newTheme
}
```

언뜻 보면 잘 되는것 같다. 하지만, 새로고침을 했을 경우 지정해 두었던 `theme`가 다시 되돌아가 버리는 현상이 있었다. 페이지 네이션에서 구현 했던것 처럼 `theme`라는 데이터 또한 `localStorage`에 넣어 주어 관리하면 좋을것 같았다. 그런데 문제가 생겼다. 첫 페이지의 로딩은 서버에서 할텐데 어떻게 `localStorage`에 접근할 것인가였다.

#### useEffect 사용

그렇다면 먼저 클라이언트에서 마운트 되었을 때 `localStorage`에 접근하여 `set`과 `get`으로 `theme`를 관리해주면 될 것 같았다.

<Blockquote type="warn">
  `const [theme, setTheme] = useState(window.localstorage)`와 같이 window객체에 접근하면 window is not defined 에러가 나게 된다. <br/> 이 이유는 저번 포스팅에서 다루었으니 여기서 따로 다루지는 않겠다.
</Blockquote>

```tsx
useEffect(() => {
  const savedTheme = window.localStorage.getItem('theme')
  if (!savedtheme) localStorage.theme = 'light'
  document.body.dataset.theme = 'light'
}, [])
```

이렇게 보면 잘 되는 것 같았지만, 다크모드에서 페이지의 새로고침을 했을 때, 라이트모드로 깜빡였다가 다시 다크모드로 된 것을 볼 수 있었다. 원인은 역시나 클라이언트에서 일어나기 때문에 일어나는 현상이었다. 그렇다면 서버에서 사용자에게 페이지를 보여줄 때 `localStorage`에 접근할 수 있어야한다.

#### Script 태그 사용

찾아보니 역시나 방법은 있었다. 바로 `<script>`를 이용하여 `<body>`에 주입하는 형식으로 만들어주면 되는 것이다. 이렇게 되면 NextJS가 `hydrate`하기전에 테마를 설정할 수 있을 것이다.

```tsx
// ./app/layout.tsx

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const setThemeMode = `
    if(!window.localStorage.getItem('theme')){
      localStorage.theme = 'light'
    }
    document.body.dataset.theme = window.localStorage.getItem('theme')
  `
  return (
    <html>
      <body suppressHydrationWarning={true}>
        <script
          dangerouslySetInnerHTML={{
            __html: setThemeMode,
          }}
        />
        {children}
      </body>
    </html>
  )
}
```

```tsx
// ./components/layout/header.tsx

const themeModeHandle = () => {
  const newTheme = localStorage.theme === 'dark' ? 'light' : 'dark'
  localStorage.theme = newTheme
  document.body.dataset.theme = newTheme
}
```

이렇게 되면 위의 `useEffect`를 사용하지 않고 깜빡임 없이 다크모드를 구현할 수 있을 것이다.

#### Warning: Extra attributes from the server: data-theme

<Blockquote type="warn">
  Warning: Extra attributes from the server: data-theme
</Blockquote>

이러한 오류가 난 이유는 애플리케이션을 렌더링하는 동안 서버에서 미리 렌더링된 React 트리와 브라우저에서 첫 번째 렌더링(수화) 중에 렌더링된 React 트리 간에 차이가 있기 때문에 나타나는 경고문이다.

`suppressHydrationWarning`을 `true`로 설정하게 되면 React는 어트리뷰트와 그 엘리먼트 내용의 불일치에 대해 경고하지 않으나, 너무 많이 사용하게 되 성능상의 저하가 되므로 자주 사용하지 않는 것이 좋겠다.
