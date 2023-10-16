---

title: 'NextJS Blog (3)'
description: '이전에 원티드 Pre-on-Boarding에서 배운 NextJS를 좀 더 활용하고자 정적인 Blog를 만들어 본다.'
coverImage: 'https://velog.velcdn.com/images/ahsy92/post/8077a889-90ed-4696-acfa-5fb34d3c8a9f/image.png'
date: '2023/10/16'
keywords: ['NextJS', 'NextJS13', 'Blog', 'react markdown', 'TOC', 'IntersectionObserver', 'yoonhu']
category: 'makeblog'
outline: 'NextJS v13으로 정적인 블로그를 만들어보며 겪었던, 해결했던 문제들을 적어둔다.'

---

![](https://velog.velcdn.com/images/ahsy92/post/8077a889-90ed-4696-acfa-5fb34d3c8a9f/image.png)

# NextJS 정적 블로그 만들기

이전에 원티드 Pre-on-Boarding에서 배운 NextJS를 좀더 활용하고자 정적인 Blog를 간단하게 만들어 보았었다. 헌데 방법을 알았다고 해서 모든걸 다 경험한것은 아닐것 같아 공부겸 조금더 다듬어 개인 Blog를 만들어 보고싶었다. 이번에는 TOC(Table of Contents)를 만들어보면서 사용했던 방법과 트러블 슈팅에 대해 적어둔다.

## TOC (Table of Contents) 만들기

현재의 블로그를 사용하기 전에는 velog를 사용했었는데 핸드폰이 아닌 데스크탑으로 보게 되면, 오른쪽에 목차가 나열되어 contents에 네비게이션 역할을 하는 것을 볼 수 있다. 그래서 이번 블로그를 만들때에는 TOC를 만들어 넣고 싶다는 생각이 있었다. 먼저 이 TOC에 관한 원리가 뭘까 하나하나 찾아보았는데 크게 2가지를 알면 좋을것 같았다. 

### a tag href 속성에 #id를 이용하기

방법에는 여러가지 방법이 있겠지만, 가장 간단하고 많이 사용하는 방법이 헤딩 태그 (h1, h2, ...,)를 추출해서 각각의 id값으로 이동하는 방법이 있겠다.

```html
<a href='#id'>
```

하지만 현재, `React-Markdown`을 사용하면서 헤딩 태그에 id값이 부여되어 있지 않은것을 볼 수 있었다. 이렇게 되면 `href`에 `#id`로 접근할 수 없을 것이다. 그렇다면 `HTML` 의 `id`를 부여하는 플러그인이 필요하겠다. 

### rehype slug

```shell
npm install rehype-slug
```

`rehype-slug`는 헤딩 태그에 자동으로 `id`를 추가해주는 플러그인이다. 이전에 작업했던 `React-Markdown`의 `plugin`에 추가해 넣어주면 자동으로 헤더 태그에 `id`가 부여된것을 볼 수 있다.

```tsx
'use client'
import ReactMarkdown from 'react-markdown'
import slug from 'rehype-slug'
import raw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Blockquote from './blockquote'
import { PluggableList } from 'unified'

interface MarkdownViewProps {
  post: string
}

const MarkdownView = ({ post }: MarkdownViewProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[raw, slug] as PluggableList}
      components={{
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter language={match[1]} PreTag="div" {...props} style={oneDark}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
        blockquote({ node, children, ...props }) {
          return <Blockquote {...props}>{children}</Blockquote>
        },
      }}
    >
      {post}
    </ReactMarkdown>
  )
}

export default MarkdownView
```



### IntersectionObserver 사용하기

[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)는 기본적으로 브라우저의 뷰포트(Viewport)와 설정한 요소의 교차점을 관찰한다. 요소가 뷰포트에 포함되는지, 포함되지 않는지, 더 쉽게는 사용자 화면에 지금 보이는 요소인지 아닌지를 구별하는 기능을 제공한다.

`IntersectionObserver`는 비동기적으로 실행되기 때문에 `scroll`같은 이벤트 기반의 요소 관찰에서 발생하는 렌더링 성능이나 이벤트 연속 호출같은 문제 없이 사용할 수 있다.

`new IntersectionObserver()`를 통해 생성한 인스턴스로 관찰자를 초기화하고 관찰할 대상(Element)을 지정한다. 생성자는 2개의 인수(`callbak`, `option`)를 갖게 된다.

```js
const observe = new IntersectionObserver(callbak, options) // 관찰자를 초기화한다.
observer(element) // 관찰할 요소를 등록한다.
```



#### callback

관찰할 대상이 등록되거나 가시성(보이는지, 보이지 않는지)에 변화가 생기면 관찰자는 callback을 실행한다. 콜백은 2개의 인수(entries, observer)를 가지게 된다.

```js
const observe = new IntersectionObserver((entries, observer) => {}, options)
observer(element)
```

**entries**

`entries`는 [IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)의 인스턴스 배열이다. `entries`의 자세한 내용은 [Refs](https://heropy.blog/2019/10/27/intersection-observer/)에서 자세하게 볼 수 있다.

- `boundingClientRect`: 관찰 대상의 사각형 정보([DOMRectReadOnly](https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly))

- `intersectionRect`: 관찰 대상의 교차한 영역 정보([DOMRectReadOnly](https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly))

- `intersectionRatio`: 관찰 대상의 교차한 영역 백분율(`intersectionRect` 영역에서 `boundingClientRect` 영역까지 비율, Number)

- `isIntersecting`: 관찰 대상의 교차 상태(Boolean)

- `rootBounds`: 지정한 루트 요소의 사각형 정보([DOMRectReadOnly](https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly))

- `target`: 관찰 대상 요소([Element](https://developer.mozilla.org/en-US/docs/Web/API/Element))

- `time`: 변경이 발생한 시간 정보([DOMHighResTimeStamp](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp))

  

**observer**

콜백이 실행되는 해당 인스턴스를 참조하게 된다.

```js
const observe = new IntersectionObserver((entries, observer) => {
  ...
}, options)

observer(element)  
```



### Options

- `root`:  타겟의 가시성을 검사하기 위해 뷰포트 대신 사용할 요쇼 객체를 지정한다. 타겟의 조상 요소이어야 하며 지정하지 않거나 `null`일 경우 브라우저의 뷰포트가 기본 사용된다. (기본값은 `null`)

- `rootMargin`: `margin`을 이용해 `root` 범위를 확장하거나 축소할 수 있다. `css`에서 사용하는 `margin`과 같이 여백을 설정할 수 있으며 단위를 꼭 입력해야한다.

- `threshold`: `observer`가 실행되기 위해 타겟의 가시성이 얼마나 필요한지 백분율로 표시한다. 기본 값은 배열 형식의 `[0]`이지만 `Number`타입의 단일 값으로도 사용할 수 있다.

  ```js
  const observe = new IntersectionObserver(callback, {
    threshold: 0.3 // or [0.3]
    threshold: [0, 0.3, 1] // 타겟의 가시성이 0%, 30%, 100%일 때 모두 옵저버가 실행된다.
  })
  ```



### Instance Methods

```js
const observe1 = new IntersectionObserver(callback, options)
const observe2 = new IntersectionObserver(callback, options)

const h = document.querySelectorAll('h1', 'h2', 'h3')
const li = document.querySelectorAll('li')
const div = document.querySelectorAll('div')
```

**.disconnect()**

모든 대상의 주시를 해제한다.

```js
observe1.observe(h) // h1, h2, h3 요소를 관찰한다.
observe1.observe(li) // li 요소를 관찰한다.
observe2.observe(div) // div 요소를 관찰한다.

observe2.disconnect() // observe2가 관찰하는 요소(div) 관찰을 중지한다.
```

**.observe()**

주어진 대상의 요소를 주시한다.

```js
observe1.observe(h) // h1, h2, h3 요소를 관찰한다.
observe1.observe(li) // li 요소를 관찰한다.
observe2.observe(div) // div 요소를 관찰한다.
```

**.unobserve()**

특정 대상 요소에 대한 주시를 해제 한다.

```js
observe1.observe(h) // h1, h2, h3 요소를 관찰한다.
observe1.observe(li) // li 요소를 관찰한다.
observe2.observe(div) // div 요소를 관찰한다.

observe1.disconnect(h) // observe1이 관찰하는 요소(h) 관찰을 중지한다.
```

**.takeRecords()**

모든 주시 대상에 대한 배열을 반환한다.



## TOC 생성

TOC를 만들기 위한 useObservation을 구현하기에 먼저 앞서 첫 번째 방법으로 헤더 태그에 있는 `id`값을 가져와야한다. TOC 컴포넌트를 만들고 헤더 태그를 HTMLElement 배열로 가져오도록 하면 되겠다.

```tsx
'use client'

const TOC = () => {
  const headingElements: HTMLElement[] = Array.from(document.querySelectorAll('h1, h2, h3'))
  console.log(headingElements)

  return (
    <>
      {headingEls?.map((heading, index) => {
        return (
          <CustomLink
            hNumber={heading.nodeName}
            isPass={heading.id === currentId}
            href={'#' + heading.id}
            key={`heading-${index}`}
          >
            {heading.innerText}
          </CustomLink>
        )
      })}
    </>
  )
}
export default TOC
```

위와 같이 하면 `HTML`의 Element로 접근하여 list로 잘 가져올것 같지만, 실상은 아래와 같은 에러가 난다.

### Unhandled Runtime Error Error: document is not defined



<Blockquote type="danger">
  Unhandled Runtime Error
	Error: document is not defined
</Blockquote>



이러한 에러가 나는 이유는 쉽게 유추할 수 있다.  `document`나 `window` 객체는 브라우저의 기능이기 때문이다. 즉, 클라이언트 측에서 정의된 전역 변수인 것이다. 서버측의 코드에서는 브라우저 객체에 엑세스할 수 없기 때문에 이러한 에러가 나타나는 것이다.

즉 위의 문제를 해결하려면 클라이언트에서 렌더링이 된 후에 사용해야하는 것이다. 해결법으로는 크게 3가지가 있겠다.

### document, window의 typeof

가장 원시적인 판단으로 `if`로 `document`와 `window`객체가 `undefined`인지 분기하는 것이다.

```tsx
if (typeof document !== undefined) {
  const element = Array.from(document.querySelectorAll('h1, h2, h3'))
}
```

위의 예제에서는 `document`객체만 예시로 들었지만 `window`객체까지 사용하면 조건문이 더 길어지고 가독성이 떨어질 것이다.

### process.browser 사용

첫 번째 방법으로 사용하는것도 괜찮은 방법이겠지만 좀 더 세련되게 사용할 수 있방법이 있다. 바로 `process.browser`에 접근하여 판단하는 것이다. `process.browser`를 사용하면 위의 코드보다 조금 더 깔끔하게 사용할 수 있을 것이다.

```tsx
if (process.browser) {
  const element = Array.from(document.querySelectorAll('h1, h2, h3'))
}
```

### useEffect 사용

 `useEffect`는 클라이언트에서 컴포넌트가 마운트 된다음 실행하게 할 수 있다. 즉 클라이언트에서 사용할 수 있으므로 `useEffect`를 사용하는 것도 방법이 될 수 있겠다.

```tsx
const [headingEls, setHeadingEls] = useState<HTMLElement[]>([])

  useEffect(() => {
    const headingElements: HTMLElement[] = Array.from(document.querySelectorAll('h1, h2, h3'))
    setHeadingEls(headingElements)
}, [])
```



나는 위의 방법들중  `useEffect`를 사용하여 접근했고 `HTMLElement`를 list의 형태로 가져올 수 있었다.

```tsx
'use client'

import { useEffect, useState } from 'react'
import CustomLink from './custom-link'

const TOC = () => {
  const [currentId, setCurrentId] = useState<string>('')
  const [headingEls, setHeadingEls] = useState<HTMLElement[]>([])

  useEffect(() => {
    const headingElements: HTMLElement[] = Array.from(document.querySelectorAll('h1, h2, h3'))
    setHeadingEls(headingElements)
  }, [])

  return (
    <>
      {headingEls?.map((heading, index) => {
        return (
          <CustomLink
            hNumber={heading.nodeName}
            isPass={heading.id === currentId}
            href={'#' + heading.id}
            key={`heading-${index}`}
          >
            {heading.innerText}
          </CustomLink>
        )
      })}
    </>
  )
}
export default TOC
```

현재 보고있는 헤더 태그를 기억할 state를 `currentId`를 만들고 `observe`를 걸어두어 해당  `id`를 관찰하고 해당 뷰포트(Viewport)를 넘어가면 다음 `id`를 `currentId`로 저장해 두면 되겠다.



### useObservation 생성

```tsx
import { Dispatch, MutableRefObject, SetStateAction, useCallback, useEffect, useRef } from 'react'

const defaultOption = {
  threshold: 0.5,
  rootMargin: '-70px 0px -60% 0px',
}

export type ObservationType = Record<string, IntersectionObserverEntry>

const useObservation = (setState: Dispatch<SetStateAction<string>>, headingElements: HTMLElement[]) => {

  // heading element를 담아서 사용하기 위한 ref.
  const headingElementsRef: MutableRefObject<ObservationType> = useRef({})

  // IntersectionObserver의 callback에 들어갈 함수 관찰되었을 때 실행될 로직.
  const handleIntersect: IntersectionObserverCallback = useCallback((entry: IntersectionObserverEntry[]) => {
    headingElementsRef.current = {}

    // 헤더 태그의 id를 순회하여 headingElementRef에 키 밸류 형태로 할당.
    headingElementsRef.current = entry.reduce((map: ObservationType, headingElement) => {
      map[headingElement.target.id] = headingElement
      return map
    }, headingElementsRef.current)

    // 화면의 상단에 보여지고 있는 제목을 찾아 visibleHeadings의 배열의 형태로 담아둔다.
    const visibleHeadings: IntersectionObserverEntry[] = []
    Object.keys(headingElementsRef.current).forEach((key) => {
      const headingElement = headingElementsRef.current[key]

      // isIntersecting이 true라면 즉, 관찰상태가 교차가 되었다면 visibleHeadings에 push.
      if (headingElement.isIntersecting) visibleHeadings.push(headingElement)
    })

    // 관찰 영역(ViewPort)에 여러개의 제목이 있을경우 가장 상단에 존재하는 id를 찾는다.
    const getIndexFromId = (id: string) => headingElements.findIndex((heading) => heading.id === id)

    if (visibleHeadings.length === 1) {
      // 화면에 보이고 있는 제목이 1개라면 해당 element의 target.id를 setActiveId로 set해준다.
      setState(visibleHeadings[0].target.id)
    } else if (visibleHeadings.length > 1) {
      // 2개 이상이라면 sort로 더 상단에 있는 제목을 set해준다.
      const sortedVisibleHeadings = visibleHeadings.sort(
        (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id)
      )
      setState(sortedVisibleHeadings[0].target.id)
    }
  }, [])

  useEffect(() => {
    
    // IntersectionObserver에 위에서 만든 callback 함수인 handleIntersect 함수를 넘겨주어 새로운 인스턴스 생성.
    const observe = new IntersectionObserver(handleIntersect, defaultOption)
    
    // 헤더 태그 요소들을 observer로 관찰한다.
    headingElements.map((header) => {
      observe.observe(header)
    })
    
    // 컴포넌드가 언마운트 되었을 경우 observe의 관찰을 멈춘다. 
    return () => observe.disconnect();
    
  }, [headingElements])
}

export default useObservation
```

이번에 만든  `useObservation`을 뭔가 하나하나 설명하기 보다는 각각의 어떤 의미로 작성이 되었는지를 주석으로 달아두었다. `rootMargin`의 값을 바꿔서 감지하고 싶은 영역을 조금씩 바꿔봐도 좋을것 같다.







































