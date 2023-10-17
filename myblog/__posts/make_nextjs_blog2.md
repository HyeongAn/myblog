---
title: 'NextJS Blog (2)'

description: '이전에 원티드 Pre-on-Boarding에서 배운 NextJS를 좀 더 활용하고자 정적인 Blog를 만들어 본다. 이번엔 NextJS v13의 `Dynamic Routes`의 `Segment`, `Loading / Error UI`, 마크다운 변환에 관한 `React-MarkDown`과 플러그인에 대해 사용했던 방법들과 트러블 슈팅에 대해 적어보겠다.'

coverImage: 'https://velog.velcdn.com/images/ahsy92/post/8077a889-90ed-4696-acfa-5fb34d3c8a9f/image.png'

date: '2023/10/11'

keywords: ['NextJS', 'NextJS13', 'Blog', 'Dynamic Routes', 'loading ui', 'error ui', 'react markdown', 'yoonhu']

category: 'makeblog'

outline: 'NextJS v13으로 정적인 블로그를 만들어보며 겪었던, 해결했던 문제들을 적어둔다.'
---

![](https://velog.velcdn.com/images/ahsy92/post/8077a889-90ed-4696-acfa-5fb34d3c8a9f/image.png)

# NextJS 정적 블로그 만들기

이전에 원티드 Pre-on-Boarding에서 배운 NextJS를 좀더 활용하고자 정적인 Blog를 간단하게 만들어 보았었다. 헌데 방법을 알았다고 해서 모든걸 다 경험한것은 아닐것 같아 공부겸 조금더 다듬어 개인 Blog를 만들어 보고싶었다. 이번엔 NextJS v13의 `Dynamic Routes`의 `Segment`, `Loading / Error UI`, 마크다운 변환에 관한 `React-MarkDown`과 플러그인에 대해 사용했던 방법들과 트러블 슈팅에 대해 적어보겠다.

## NexJS 13 Dynamic Routes

이전에 [NextJS Pre-Rendering](https://velog.io/@ahsy92/NextJS-Pre-Rendering)에 관한 글을 쓰면서 Dynamic Routes에 관한 글을 썼던 적이 있다. v12에 관한 내용이 주를 이루었기 때문에 v13을 다시 정리한다.

### Generating Static Params

기본적인 원리는 v12와 같다. 다만 폴더의 구조가 app/[slug]/page.tsx와 같이 동적 세그먼트로 바뀌어야 하며 v12에서 사용되었던 `getStaticProps`이 `generateStaticParams`로 바뀌어 사용된다. `generateStaticParams`함수는 동적 라우트 세그먼트와 결합하여 라우트를 빌드 시간에 정적으로 생성하는데 사용된다.

```tsx
// app/[category]/page.tsx

const Category = async ({ params }: CategoryProps) => {
  const categories = await getCategory()
  const postData = (await getPosts()).filter((post) => post.data.category === params.category)
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <MainContainer>
        <MainHeader categories={categories} />
      </MainContainer>
      <PostsListContainer>
        <Posts postData={postData} />
      </PostsListContainer>
      <SlideMenuProfile />
    </div>
  )
}

export const generateStaticParams = async () => {
  const categories = await getCategoryId()

  return categories.map((category) => {
    category: category.params.category.toString()
  })
}

export default Category
```

`generateStaticParams`함수 내에서 `fetch`요청을 사용하여 동일한 콘텐츠를 가져오는 경우 자동으로 중복을 제거된다. 이는 여러 `generateStaticParams`, 레이아웃 및 페이지에서 동일한 인수를 가진 `fetch` 요청이 한번만 실행되므로 빌드시간을 단축할 수 있다.

### Catch-all Segments

app/[slug]/page.tsx의 구조에서 대괄호안에 `...`를 추가하여 동적 세그먼트를 모든 후속 세그먼트로 확장할 수 있다.

예로, Route가 `app/category/[...slug]/page.tsx`일 경우 `slug`의 URL prams로 `{slug: ['nextjs', 'blog']}` 넘겨주게 되면 `/category/nextjs/blog`와 같은 경로로 만들 수 있게 되는 것이다. URL params에 추가하면 계속해서 확장할 수 있게 된다.

| Route                           | URL params              | URL             |
| ------------------------------- | ----------------------- | --------------- |
| app/category/[...slug]/page.tsx | {slug: ['a']}           | /category/a     |
| app/category/[...slug]/page.tsx | {slug: ['a', 'b']}      | /category/a/b   |
| app/category/[...slug]/page.tsx | {slug: ['a', 'b', 'c']} | /category/a/b/c |

### Optional Catch-all Segments

위와 같이 만들면 무한정으로 확장이 가능할 것으로 예상되지만, 여기에는 몇가지 문제점이 존재한다.

첫 번째로 사용자가 원하는 페이지로 들어가기 위해서는 항상 유니크 아이디를 알고 주소창에 직접입력해야한다.

두 번째로 `url/category`로 접근했을때 404에러가 발생한다는 점이다. 이는 `catch-all Segments [...slug]`가 `/category` URL path로 접근 했을 때 이 path를 포함하지 않기 때문이다.

이에 대한 해결법으로 `Optional Catch-all Segments`를 사용해 볼 수 있겠다. `Optional Catch-all Segments`를 사용하기 위해서는 다음과 같이 `segments`를 한번 더 감싸주면 되겠다. `[[...slug]]`

| Route                             | URL params              | URL             |
| --------------------------------- | ----------------------- | --------------- |
| app/category/[[...slug]]/page.tsx | {}                      | /category       |
| app/category/[[...slug]/page.tsx  | {slug: ['a']}           | /category/a     |
| app/category/[[...slug]/page.tsx  | {slug: ['a', 'b']}      | /category/a/b   |
| app/category/[[...slug]/page.tsx  | {slug: ['a', 'b', 'c']} | /category/a/b/c |

하여 위의 예시코드를 살짝 바꿔보면 아래와 같이 될 수 있겠다.

```tsx
// app/[[...category]]/page.tsx

...

const Category = async ({ params }: CategoryProps) => {
  const categories = params.category?.[0] ?? null
  const postData = (await getPosts()).filter((post) => post.data.category === params.category)
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {categories ? (
      	<MainContainer>
        	<MainHeader categories={categories} />
      	</MainContainer>
      	<PostsListContainer>
        	<Posts postData={postData} />
      	</PostsListContainer>
      	<SlideMenuProfile />
      ) : (
        <CategoryList/>
      )}

    </div>
  )
}

export const generateStaticParams = async () => {
  const categories = await getCategoryId()

  return categories.map((category) => {
    category: category.params.category.toString()
  })
}

export default Category
```

물론 예시코드에선 많은 부분이 생략되어 있지만 3항 연산자로 컴포넌트를 분기하여 원하는 페이지를 보여줄 수 있도록 하면 되겠다.

## Loading / Error UI 구현하기

리액트에서 Loading을 표현하는 방법으로는 state을 사용하여 Loading상태를 표현하는 방법이 있을 수 있겠고, React v18에서 정식으로 지원하는 Suspense를 사용하여 fallback UI를 보여주는 방법이 있겠다.

### Loading UI 구현하기

#### State로 Loading UI 구현하기

```tsx
const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  return <div>{isLoading ? <div>Loading...</div> : <div>Hello world!</div>}</div>
}
```

#### Suspense로 Loading UI 구현하기

```tsx
const App = () => {
  return (
  	<div>
      <Suspense fallback={<div>Loading...</div>}>
        <ShowConpoenets>
      </Suspense>
    </div>
  )
}
```

#### Instance Loading State

NextJS 13 app Router의 로딩 UI는 조금 다르다. 특정 컴포넌트 내부에서 위의 두 방법으로 선언적으로 작성하는것이 아닌 특정 세그먼트에서 UI를 담당할 파일을 만들면 되겠다. loading.tsx가 Special files에 포함 되기 때문에 해당 파일을 생성하면 자동으로 loading시 해당 컴포넌트를 보여주게 되겠다. 유저가 페이지의 로딩을 기다리는 동안 앱이 동작하는 느낌을 줄 수 있도록 loading.tsx를 통해 스켈레톤 UI를 보여줄 수도 있다.

Loading.tsx는 loading template라고도 한다. 이러한 탬플릿 기반의 로딩 인디케이터는 loading.tsx.에서 작성한 템플릿이 실제 렌더링 될 때 서버 컴포넌트의 Suspense 내부에서 실행이 되고 내부적으로 스트리밍이 적용되어 서버 사이드 렌더링 시에도 로딩 템플릿이 사용자에게 노출 될 수 있다.

```tsx
// ./app/[category]/loading.tsx

const Loading = () => {
  return <LoadingSkeleton />
}

export default Loading
```

### Error UI 구현하기

`Loading template`이 `loading.tsx`에 선언된 컴포넌트를 `Suspense`의 `fallback`에 자동으로 래핑해준다면 `Error template`는 `error.tsx`에 선언된 컴포넌트를 [React Error Boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)에 자동으로 래핑해준다.

`Error template`도 `Loading template`과 마찬가지로 Special files에 포함되기 때문에 해당 파일을 생성하면 자동으로 Error 컴포넌트를 보여주게 되겠다.

```tsx
// ./app/[category]/error.tsx

const Error = () => {
  return <Error404>
}

export default Error
```

하지만 위와 같이 작성하면 아래와 같이 complie에러가 나게된다.

<Blockquote type="danger">
	Failed to compile
  ./app/[category]/error.tsx must be a Client Component. Add the "use Client" directive the top of the file to resolve this issue.
</Blockquote>

위와 같은 에러를 통해 `error.tsx`는 클라이언트 컴포넌트가 되어야 하는걸 알 수 있다. 그렇다면 `error.tsx`는 왜 클라이언트 컴포넌트가 되어야 할까? 사실 생각해보면 간단하다. `Error template`는 기본적으로 UI표기와 함께 앱을 새로고침 하지 않아도 복구가능한 기능을 제공해야한다. 복구가 되지 않는다면 새로고침으로 페이지 요청을 다시 해도 되지만, 이에 따라 사용자는 전체 페이지를 렌더링 해야한다.

에러가 발생 후 앱의 복구는 특별한 규제가 없는한 `유저의 인터렉션`이 될 것이다. 하지만, 서버 컴포넌트는 `유저의 인터렉션`을 담당하는 이벤트 핸들러를 넣을 수 없다. React의 Hook도 마찬가지로 작성할 수 없을 것이다. 따라서 인터렉션이 지원 되어야할 `error.tsx`는 클라이언트 컴포넌트로 만드는것이 자연스러운 것이라고 할 수 있겠다.

앞서 에러가 알려준 것처럼 `error.tsx`의 맨 위에 `use client`를 추가해주면 되겠다.

```tsx
// ./app/[category]/error.tsx
'use client'

const Error = () => {
  return <Error404>
}

export default Error
```

## 마크다운 변환

기존의 마크다운을 그대로 사용하면 각각의 요소들을 커스텀해야하는 번거로움이 있다. 또한 인용으로 사용하는 `blockquote`을 커스텀으로 사용하고 싶었다.

```tsx
// ./lib/ssg.module.ts

export const getPostData = async (slug: string) => {
  const filePath = path.join(process.cwd(), '__posts', `${slug}.md`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)

  return {
    slug,
    data,
    content,
  }
}
```

`.md`파일을 fs 모듈로 읽어와 `matter`를 이용하여 `content`를 서버 컴포넌트에서 받아오게 된다. 이 데이터를 `React-Markdown`을 활용해 `md`를 변환하는 컴포넌트를 만들면 되겠다. `React-Markdown`은 내부적으로 `remark` 패키지를 활용하여 React 엘리먼트를 만들게 된다.

또한, vscode와 같이 code에 색을 입혀줄 기능이 필요하기 때문에 `React-Markdown`과 같이 사용할 수 있는 `Syntax Highlight`을 적용해 template을 적용 시켜야 했다. [React-Markdown](https://www.npmjs.com/package/react-markdown)과 [React-Syntax-Highlighter](https://www.npmjs.com/package/react-syntax-highlighter), [bayabennett.com](https://www.bayanbennett.com/posts/markdown-with-custom-components-in-nextjs-devlog-007/)의 설명으로 `MarkdownView`컴포넌트를 만들 수 있었다.

`React-Markdown`의 [Architecture](https://www.npmjs.com/package/react-markdown#architecture)는 여기서 확인해 보면 되겠다.

- markdown을 mdast로 구문을 분석한다 (markdown syntax tree)
- Remark 변환 (markdown ecosystem)
- mdast를 hast로 변환 (HTML syntax tree)
- rehype를 통한 변환 (HTML ecosystem)
- React component로 render

### React-Markdown 커스텀 하기

먼저 `components`속성을 `ReactMarkdown`태그 안에 추가해주고, 수정하고 싶은 태그를 적고 수정된 결과물을 `return `에 넣으면 되겠다.

```tsx
<ReactMarkdown
  components={{
    // 수정할 태그
    ({node, inline, className, children, ...props}) {
      return // 수정된 태그
    }
  }}
  />
```

예로 아래와 같이 사용할 수 있겠다.

```tsx
<ReactMarkdown
  components={{
    code({ node, inline, className, children, ...props }) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
  }}
/>
```

ReactMarkdown이 HTML로 변환한 코드를 하나씩 읽고 components 안에 속하는 태그를 찾는다. (위의 예시에는 code 태그를 찾는다.) 이후 조건문을 통해 커스텀을 하는 조건을 선택하고 조건을 만족한 수정된 태그를 반환하는 형식이다.

그렇다면 여기에 `Syntax Highlight`을 적용시켜 code 블록에 template을 적용시켜주면 되겠다.

먼저 code블록엔 사용언어에 따른 구분이 필요하다. `const match = /language-(\w+)/.exec(className || '')`로 사용 언어를 가져올 수 있다. (언억다 설정되지 않은 code 블록은 match값이 false로 되겠다.) 또한 `Syntax Highlight` 여러 template을 지원하고 있다.

```ts
// node_modules/@types/react-syntax-highlighter/index.d.ts

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  export { default as a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism/a11y-dark'
  export { default as atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark'
  export { default as base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/esm/styles/prism/base16-ateliersulphurpool.light'
  export { default as cb } from 'react-syntax-highlighter/dist/esm/styles/prism/cb'
  export { default as coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism/coldark-cold'
  export { default as coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism/coldark-dark'
  export { default as coy } from 'react-syntax-highlighter/dist/esm/styles/prism/coy'
  export { default as darcula } from 'react-syntax-highlighter/dist/esm/styles/prism/darcula'
  export { default as dark } from 'react-syntax-highlighter/dist/esm/styles/prism/dark'
  export { default as dracula } from 'react-syntax-highlighter/dist/esm/styles/prism/dracula'
  export { default as duotoneDark } from 'react-syntax-highlighter/dist/esm/styles/prism/duotone-dark'
  export { default as duotoneEarth } from 'react-syntax-highlighter/dist/esm/styles/prism/duotone-earth'
  export { default as duotoneForest } from 'react-syntax-highlighter/dist/esm/styles/prism/duotone-forest'
  export { default as duotoneLight } from 'react-syntax-highlighter/dist/esm/styles/prism/duotone-light'
  export { default as duotoneSea } from 'react-syntax-highlighter/dist/esm/styles/prism/duotone-sea'
  export { default as duotoneSpace } from 'react-syntax-highlighter/dist/esm/styles/prism/duotone-space'
  export { default as funky } from 'react-syntax-highlighter/dist/esm/styles/prism/funky'
  export { default as ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism/ghcolors'
  export { default as gruvboxDark } from 'react-syntax-highlighter/dist/esm/styles/prism/gruvbox-dark'
  export { default as gruvboxLight } from 'react-syntax-highlighter/dist/esm/styles/prism/gruvbox-light'
  export { default as hopscotch } from 'react-syntax-highlighter/dist/esm/styles/prism/hopscotch'
  export { default as materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism/material-dark'
  export { default as materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism/material-light'
  export { default as materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism/material-oceanic'
  export { default as nord } from 'react-syntax-highlighter/dist/esm/styles/prism/nord'
  export { default as okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism/okaidia'
  export { default as oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark'
  export { default as oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism/one-light'
  export { default as pojoaque } from 'react-syntax-highlighter/dist/esm/styles/prism/pojoaque'
  export { default as prism } from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
  export { default as shadesOfPurple } from 'react-syntax-highlighter/dist/esm/styles/prism/shades-of-purple'
  export { default as solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism/solarizedlight'
  export { default as synthwave84 } from 'react-syntax-highlighter/dist/esm/styles/prism/synthwave84'
  export { default as tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism/tomorrow'
  export { default as twilight } from 'react-syntax-highlighter/dist/esm/styles/prism/twilight'
  export { default as vs } from 'react-syntax-highlighter/dist/esm/styles/prism/vs'
  export { default as vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus'
  export { default as xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism/xonokai'
}
```

이중 마음에 드는 template을 찾아 style props으로 넣어 적용하면 되겠다. 나는 `oneDark`를 사용했다.

```tsx
<ReactMarkdown
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
  }}
>
  {post}
</ReactMarkdown>
```

이후로 인용 표시는 `blockquote`형식으로 표시되기 때문에 커스텀으로 컴포넌트를 만들어주었다.

```tsx
'use client'
import type { PropsWithChildren } from 'react'
import { BlockquoteDanger, BlockquoteDefault, BlockquoteInfo, BlockquoteWarn } from '../style/markdown'
import bulb from '../../../assets/svg/bulb-icon.svg'
import lightning from '../../../assets/svg/lightning-icon.svg'
import danger from '../../../assets/svg/danger-icon.svg'
import paper from '../../../assets/svg/paper-icon.svg'
import Image from 'next/image'

interface BlockquoteProps extends PropsWithChildren {
  type?: 'warn' | 'info' | 'danger'
}

const blockquoteStyles = {
  display: 'flex',
  padding: '16px 18px',
  borderRadius: '10px',
  marginTop: '20px',
  gap: '20px',
}

const Blockquote = (props: BlockquoteProps) => {
  switch (props.type) {
    case 'warn':
      return (
        <BlockquoteWarn style={blockquoteStyles}>
          <div>
            <Image src={lightning} alt="lightning image" style={{ width: '18px' }} />
          </div>
          <div>
            <span>{props.children}</span>
          </div>
        </BlockquoteWarn>
      )
    case 'info':
      return (
        <BlockquoteInfo style={blockquoteStyles}>
          <div>
            <Image src={bulb} alt="bulb image" style={{ width: '18px' }} />
          </div>
          <div>
            <span>{props.children}</span>
          </div>
        </BlockquoteInfo>
      )
    case 'danger':
      return (
        <BlockquoteDanger style={blockquoteStyles}>
          <div>
            <Image src={danger} alt="danger image" style={{ width: '18px' }} />
          </div>
          <div>
            <span>{props.children}</span>
          </div>
        </BlockquoteDanger>
      )
    default:
      return (
        <BlockquoteDefault style={blockquoteStyles}>
          <div>
            <Image src={paper} alt="paper image" style={{ width: '18px' }} />
          </div>
          <div>
            <span>{props.children}</span>
          </div>
        </BlockquoteDefault>
      )
  }
}

export default Blockquote
```

위와 같이 컴포넌트를 만들었다면 `React-Markdown`의 `components`로 넘겨주어 커스텀해주면 되겠다.

```tsx
'use client'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Blockquote from './blockquote'

interface MarkdownViewProps {
  post: string
}

const MarkdownView = ({ post }: MarkdownViewProps) => {
  return (
    <ReactMarkdown
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

헌데 잘 될 줄 알았던 `blockquote`가 `HTML`로 인식하지 못하고 문자열 그대로 출력되는 현상이 있었다. 이를 해결하기 위해서는 `rehype-raw`가 필요했다. `.md`파일에 있는 문서를 다시 구문 분석하는 플러그인이며 간단하게 설치할 수 있다.

추가적으로 github 마크다운 문법에 맞게 변환해주는 플러그인이 필요하여 `remark-gfm`도 같이 설치해주었다.

```shell
  npm install rehype-raw
  npm install remark-gfm
```

설치 이후 `React-Markdown`에 플러그인에 적용해주면 되겠다.

```tsx
'use client'
import ReactMarkdown from 'react-markdown'
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
      rehypePlugins={[raw]}
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

위와 같이 설정하면 2가지 오류가 생긴다.

### TypeError: Cannot read properties of undefined (reading 'inTable')

<Blockquote type="danger">
	TypeError: Cannot read properties of undefined (reading 'inTable')
</Blockquote>

이 에러는 `remark-gfm`을 사용하면서 나오게된 에러인데, 이 문제를 검색해보면 [stackoverflow](https://stackoverflow.com/questions/77138105/reactmarkdown-remarkgfm-everything-renders-as-expected-except-tables-typee)에 버전이 문제가 된다고 한다. 현재 `React-Markdown`의 버전은 `8.0.7`이고 `remark-gfm`의 버전은 `4.0.0` 이상의 버전이었다. 하여 [on Sep 18, 2023](https://github.com/remarkjs/remark-gfm/releases/tag/4.0.0)에 릴리즈된 버전이 아닌 다운그레이드 버전 을 사용하면 위와 같은 에러가 사라지게 된다.

```shell
  npm uninstall remark-gfm
  npm install remark-gfm@3.0.1
```

### ts-expect-error

<Blockquote type="danger">
	Type '(options?: void | Options) => void | Transformer< Root, Root >' is not assignable to type 'Pluggable< any[], Settings >'.<br/>
  Type '(options?: void | Options) => void | Transformer< Root, Root >' is not assignable to type 'Plugin< any[], Settings >'.
</Blockquote>

위의 type에러가 생기는 이유는 [Git Discussions](https://github.com/orgs/rehypejs/discussions/63)에 나와있다. type의 지정이 제대로 이루어지지 않아 문제가 생기는것 같으니 `plugin`에 들어가는 타입을 `as`로 직접 설정해주면서 오류를 해결할 수 있다.

```tsx
// node_modules/react-markdown/lib/react-markdown.d.ts

/**
 * React component to render markdown.
 *
 * @param {ReactMarkdownOptions} options
 * @returns {ReactElement}
 */
export function ReactMarkdown(options: ReactMarkdownOptions): ReactElement
export namespace ReactMarkdown {
  namespace propTypes {
    const children: PropTypes.Requireable<string>
    const className: PropTypes.Requireable<string>
    const allowElement: PropTypes.Requireable<(...args: any[]) => any>
    const allowedElements: PropTypes.Requireable<(string | null | undefined)[]>
    const disallowedElements: PropTypes.Requireable<(string | null | undefined)[]>
    const unwrapDisallowed: PropTypes.Requireable<boolean>
    const remarkPlugins: PropTypes.Requireable<(object | null | undefined)[]>
    const rehypePlugins: PropTypes.Requireable<(object | null | undefined)[]>
    const sourcePos: PropTypes.Requireable<boolean>
    const rawSourcePos: PropTypes.Requireable<boolean>
    const skipHtml: PropTypes.Requireable<boolean>
    const includeElementIndex: PropTypes.Requireable<boolean>
    const transformLinkUri: PropTypes.Requireable<NonNullable<boolean | ((...args: any[]) => any) | null | undefined>>
    const linkTarget: PropTypes.Requireable<NonNullable<string | ((...args: any[]) => any) | null | undefined>>
    const transformImageUri: PropTypes.Requireable<(...args: any[]) => any>
    const components: PropTypes.Requireable<object>
  }
}
export type ReactNode = import('react').ReactNode
export type ReactElement = import('react').ReactElement<{}>
export type PluggableList = import('unified').PluggableList // <- use this type
export type Root = import('hast').Root
export type FilterOptions = import('./rehype-filter.js').Options
export type TransformOptions = import('./ast-to-react.js').Options
export type CoreOptions = {
  children: string
}
export type PluginOptions = {
  remarkPlugins?: import('unified').PluggableList
  rehypePlugins?: import('unified').PluggableList
  remarkRehypeOptions?: import('remark-rehype').Options | undefined
}
export type LayoutOptions = {
  className?: string
}
export type ReactMarkdownOptions = CoreOptions & PluginOptions & LayoutOptions & FilterOptions & TransformOptions
export type Deprecation = {
  id: string
  to?: string
}
import PropTypes from 'prop-types'
```

이렇게 `React-Markdown` component를 완성하면 되겠다.

```tsx
'use client'
import ReactMarkdown from 'react-markdown'
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
      rehypePlugins={[raw] as PluggableList}
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
