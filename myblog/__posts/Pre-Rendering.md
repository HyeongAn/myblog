---
title: 'NextJs Pre-Rendering'
description: '이번 강의를 들으면서 사실 부족했던 부분이 없지 않아 있었던것은 사실인것 같다. Next.js의 CSR과 SSR, pre-rendering에 관한 내용을 적어두고, static generation, Dynamic Routes등 Next.js만의 메소드와 특징에 관한 기록을 해둔다.'
coverImage: 'https://velog.velcdn.com/images/gwak2837/post/8be6cb7e-1450-41cf-800a-b82e96dd2eef/image.png'
date: '2023/09/05'
keywords:
  [
    'nextjs',
    'pre rendering',
    'csr',
    'ssr',
    'ssg',
    'getstaticprops',
    'dynamic routes',
    'getstaticpaths',
    '블로그 만들기',
    'yoonhu',
  ]
category: 'nextjs'
outline: 'NextJS v13으로 개인 Blog를 만들기위한 기초 여정에 관한 기록을 적어둔다.'
---

![nextjs 이미지](https://velog.velcdn.com/images/gwak2837/post/8be6cb7e-1450-41cf-800a-b82e96dd2eef/image.png)

# NextJs Pre-Rendering

이번 강의를 들으면서 사실 부족했던 부분이 없지 않아 있었던것은 사실인것 같다. 이런 저런 이야기를 많이 하다보니 수업 외적인 이야기도 많았고 수업 시간도 길고.. 뜯어보기에 집중이 되어 있어서 NextJs를 사용하면서 부족했던 설명들을 정리해두고자 한다.

과제를 진행하면서 getStaticProps라는 메소드를 사용한 사람들을 볼 수 있었는데 수업시간에 없었던 내용을 잘 찾아 과제를 수행하는걸 보고 아 저런 방법으로 사용하는구나 했지만 자세한 원리까지는 찾아보지 못해서 아쉽긴했었다.

하여 이번엔 NextJs의 pre-rendering을 진행하기 위한getStaticProps와 getStaticPath를 자세하게 적어보려고 한다.

# CSR과 SSR

`pre-rendering`이란 `SSR`을 구현하는 NextJs의 특징이라고 볼 수 있다. React로 구성된 CSR 같은 경우는 JS파일을 브라우저에서 해석해 렌더링하는 방식을 사용한다. 따라서 서버는 빈 HTML파일을 받게되고, 이에 따른 JS파일을 읽으며 렌더트리를 생성, 보여주기까지의 시간이 오래 걸린다는 단점이 있다. 하지만 화면의 전환이 깜빡이지 않고 부드러우며 서버의 부하를 줄일 수 있다는 장점이 있다.

이에 반해 SSR의 경우는 미리 서버에서 HTML파일을 렌더링해서 클라이언트에세 전송해주게 된다. JS파일을 다 읽기전에 이벤트 핸들링을 한다거나 페이지를 이동한다거나 하는 동작을 따로 수행할 수 없으나 렌더링 속도가 빠르다는 장점이 있다. 하지만 페이지를 옮길때 마다 매번 통신으로 인해 화면 전환이 부자연스러워 깜빡인다는 단점이 있다.

NextJs는 최소한의 JS를 이용한 Rendering을 하고 나머지는 JS파일을 읽어 클라이언트에서 JS를 읽고 렌더링하는 방식, 즉 SSR과 CSR을 같이 사용하는 방식으로 보여진다고 생각하면 되겠다.

# Pre-Rendering

NextJs에서는 두 가지 `Pre-Rendering`을 제공하고 있다. 바로 정적 생성 방식(`Static Generation`)과 SSR방식이다. NextJs에서는 정적 생성 방식을 권장하고 있다.

`Pre-Rendering`은 `NextJs`에서 가장 중요한 개념인데, 간단하게 말하자면 `HTML`을 미리 만들어 두는것을 말한다. 앞서 CSR과 SSR에 대해 설명했었다. 이 두가지의 개념을 합쳐놓은 것이 `Pre-Rendering`의 기초라고 할 수 있는데, 페이지가 사용자의 요청에 의해 보여질때 미리 생성된 HTML을 먼저 보여주고 JS를 로드하여 이후의 페이지는 React로 즉, CSR로 구동하는 방식인 것이다.

![pre rendering 이미지](https://velog.velcdn.com/images/ahsy92/post/e43417fd-ffa9-46b9-920e-bcb8f40e1851/image.png)

- Initial Load : JS 동작이 없는 HTML을 먼저 화면에 보여준다. (JS 파일 로드 전으로 이벤트나 Link 등 동작은 하지 않음)
- Hydration: Initial Load 이후 JS 파일을 HTML에 연결하는 과정이다. (React 컴포넌트가 초기화)

자세하게 보자면 각 생성된 HTML은 최소한의 JS코드만 가지고 있게 되고 페이지가 브라우저에 의해 로드되면 JS코드가 실행되고 그 코드가 완전히 동작 가능한 페이지로 만들어 주게된다. 이 과정을 Hydration이라고 하며 이벤트나 Link 등 페이지가 사용자와 상호작용하게 되는 것이다.

그런데 Pre-Rendering의 기능엔 두가지의 방식이 존재한다. 앞서 이야기한 바로 정적 생성 방식(Static Generation)과 SSR방식이다.

## Static Generation

`Static Generation` 즉 `SSG`는 `HTML`을 `Build`시 생성해 두고 요청마다 재사용하는 방법이며 매 `request`에 따라 활용/재활용 된다. `SSG`는 동일한 `HTML`을 매 요청마다 생성하는 `SSR`의 단점을 보완하기 위해 탄생한 방법이다. `NextJs` 내부에 존재하는 `Pre-Rendering` 메서드가 최초에 HTML을 `Build`할 때 동작하고 이는 CDN에 캐싱되어 다음 요청시 재사용 되게 된다.

퍼포먼스가 중요한 마케팅 페이지, 블로그 게시물, 제품 리스트 등을 정적으로 생성하여 각 요청에 동일한 문서을 반환하게 된다.

이외에도 페이지를 생성할 때 외부 데이터를 읽어서 조합할 수 있다는 특징이 있다. Build시 API를 호출한 결과로 페이지 내용을 채울 수 있고, 데이터 파일을 읽어 만들 수도 있다.

### getStaticProps

page에서 외부 데이터를 가져올 때 사용되는 메소드이다. 외부 데이터를 호출하여 리턴되는 객체에 props를 넣어주는데 여기에 들어가는 데이터가 현재 선언되고 있는 컴포넌트의 props로 들어가게 된다. (NextJs v12에서)

```tsx
// src/pages/index.tsx

const Home = (props) => {
 // ...
}

export const getStaticProps = () => {
// 외부 데이터 호출
	const data = /...

	return {
		props: {
			// ....
		}
	}
}

export default Home
```

**예시**

예시로 많이 드는 것은 Blog의 내용을 MarkDown문법으로 바꿔 가져오면서 외부 데이터로 페이지를 구성할 때 많이 쓰인다. 이 예시를 가지고 `getStaticProps`가 어떻게 사용되고 있는지 알아보자. (NextJs v12)

```tsx
// ./__posts/first.md

---
title: "first bloging"
description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
coverImage: "../assets/img/react.png"
date: "2023-07-17"
---

## 마크다운 문법으로 작성된 문장을 HTML로 변환하기

### hello hello first bloging
```

위의 md파일을 읽기 위해서는 JS가 알 수 있도록 파일을 파싱해야한다. 이를 위해 많이 사용하는것이 `gray-matter` 라이브러리이다. 이 라이브러리를 설치한 후 md파일이 있는 곳의 경로를 찾아 fs모듈로 해당 파일에 접근하여 읽어오면 되겠다.

```tsx
// ./lib/ssg.module.ts

import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { unified } from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'

export const getPosts = async () => {
  const filePath = path.join(process.cwd(), '__posts')
  const files = fs.readdirSync(filePath)
  const posts = files
    .map((file) => {
      const post = fs.readFileSync(path.join(filePath, file), 'utf8')
      const { data, content } = matter(post)
      const slug = file.replace('.md', '')
      const parseContent = unified().use(markdown).use(remark2rehype).use(html).processSync(content)
      return {
        slug,
        data,
        content: parseContent.value,
      }
    })
    .sort((a, b) => (a.data.date > b.data.date ? -1 : 1))
  return posts
}
```

이 데이터를 getStaticProps로 가져와 Home의 props로 넘겨주자.

```tsx
import { getPosts } from '../../../lib/ssg.module'

const Home = ({ posts }) => {
  // ...
}

export const getStaticProps = async () => {
  const posts = await getPosts()
  return {
    props: {
      posts,
    },
  }
}
export default Home
```

위와 같이 넘겨주게 되면 `getStaticProps`가 `Build`시 서버에서 호출되고, Home컴포넌트에 props로 넘겨줄 수 있게 되는 것이다.

위의 기능은 사실 NextJs v12 이하에서 사용되는 방법이다. v13부터는 App Routing을 사용하게 되는데 app 폴더에서 생성된 컴포넌트에서 getStaticProps라는 이름의 함수를 만들어 props로 받을 수 없도록 바뀌었다.

대신 fetch 옵션을 통해 getServerSideProps, getStaticProps 처럼 사용 가능하게 되었다.

- `{ cache: 'force-cache' }` - 기본값으로 생략가능(getStaticProps와 유사)
- `{ cache: 'no-store' }` - 모든 요청에서 최신 데이터 받아오기 (getServerSideProps와 유사)
- `{ next: { revalidate: 10 } }` - 10초 후 새 요청오면 페이지 새로 생성 (revalidate옵션이 있는 getStaticProps와 유사)

**예시**

```tsx
// ./lib/ssg.module.ts

import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

export const getPosts = async () => {
  const filePath = path.join(process.cwd(), '__posts')
  const files = fs.readdirSync(filePath)
  const posts = files
    .map((file) => {
      const post = fs.readFileSync(path.join(filePath, file), 'utf8')
      const { data, content } = matter(post)
      const slug = file.replace('.md', '')
      return {
        slug,
        data,
        content,
      }
    })
    .sort((a, b) => (a.data.date > b.data.date ? -1 : 1))
  return posts
}

// fetch 예시
export const fetchData = async () => {
  const res = await fetch(`https://.../data`)
  const data = await res.json()
  return data
}
```

v12에서 사용한 getPosts를 그대로 Home에서 불러와 사용할 수 있게 된 것이다.

```tsx
import { getPosts, fetchData } from '../../../lib/ssg.module'

const Home = async () => {
  const posts = await getPosts()
  // ...
}

// fetch 예시
const Home = async () => {
  const posts = await fetchData()
  // ...
}
```

**정리**

- `getStaticProps`는 API나 DB접근을 할 수 있다.
  `getStaticProps` 메서드는 Build 시 서버에서 호출된다. 이말은 브라우저에서 다운받는 JS번들에는 포함되지 않는 것이다. 서버에서만 사용할 코드를 작성하는 것이므로 API나 DB에 접근할 수 있다.
- Page 컴포넌트에서만 `getStaticProps` 메서드를 export할 수 있다.
  React는 페이지가 렌더링되기 전에 모든 props 데이터가 준비되어 있어야 하기 때문이다. 페이지 컴포넌트는 NextJs에서 관리하니까 가능하다. v12에서는 page하위에서 생성된 컴포넌트로 접근이 가능하지만, v13에서 app하위에서 생성된 컴포넌트에서는 `getStaticProps`를 export 할 수 없다.
- 요청마다 데이터를 호출하고 싶다면 SSR을 사용하자.

## Server-Side-Rendering

`Server-Side-Rendering` 즉 `SSR`은 요청시 마다 `HTML`을 생성해주는 방법이다. 재이동 측면에서 느리나, 항상 최신 데이터를 유지한다는 특징이 있다. 항상 최신 상태를 유지해야하거나 요청마다 다른 내용을 보여주어야 하는 제품 상세 페이지, 분석 차트 등 시기적절한 HTML을 반환할 때 사용되게 된다.

### getServerProps

`SSG`에서 사용한 `getStaticProps` 대신 `getServerProps`를 페이지 컴포넌트에 추가해주면 외부 데이터를 받아 `SSR`이 되도록한다.

```tsx
export const getServerProps = async (context) => {
  // ...
  return {
    props: {
      // ...
    },
  }
}
```

`getStaticProps`와는 다르게 `setServerProps`는 메서드의 `parameter`로 `context`가 들어가고 있다. `getServerProps`는 페이지 호출시 마다 요청되기 때문에 `context`에는 `request`파라미터가 들어있다. `parameter`에 따라서 다른 페이지를 보여주고 싶다면 `context`에서 가져오면 되겠다.

## Dynamic Routes

`Dynamic Routes`는 동적 경로로써 데이터를 이용하여 페이지의 `path`를 만들 수 있다. `getStaticProps`나 `getServerProps`를 통해서 `NextJs`가 외부 데이터를 기반으로 페이지들을 고정적으로 만들 수 있다는걸 봤다. 이 `Pre-Rendering` 덕분에 동적으로 `URL`을 생성할 수 있게 되었다.

예를 들어 아래와 같은 MarkDown 파일이 있다고 하자. 여러개의 파일이 있고 이에 따른 동적 URL을 만든다고 하면, `http://localhost:3000/posts/first와` `http://localhost:3000/posts/second` 같은 URL을 동적으로 만들 수 있는 것이다.

```tsx
// ./__posts/first.md

---
title: "first bloging"
description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
coverImage: "../assets/img/react.png"
date: "2023-07-17"
---

## 마크다운 문법으로 작성된 문장을 HTML로 변환하기

### hello hello first bloging
```

```tsx
// ./__posts/second.md

---
title: "second bloging"
description: "this is second MarkDown File"
coverImage: "../assets/img/second.png"
date: "2023-07-19"
---

## 마크다운 문법으로 작성된 Second Fire

### hello second bloging
```

위의 예시와 같은 URL을 Dynamic Routes로 어떻게 만들 수 있을까?

- Dynamic Page 생성
  먼저 Dynamic Page를 만들어 주어야 한다. Dynamic Page는 파일의 이름에 `[]`를 사용한 페이지이다. 즉, `[slug].tsx`와 같은 형식의 이름으로 만든 컴포넌트를 만들어 주면 되겠다.
- getStaticPaths 추가
  getStaticPaths 함수 추가하여 slug에 들어갈 값들의 list를 넘겨주면 되겠다.
- getStaticProps 추가
  SSG에서 사용한 getStaticProps를 사용하여 외부데이터를 가져와 slug의 값을 가져오고 params객체에서 slug의 값을 가져와 페이지들을 미리 생성한다.

### getStaticPaths

static이라는 이름이 있는것을 보니 고정적으로 호출할 경로를 만들기 위한 함수라는 것이 추측된다. 이 함수는 `getStaticProps`로 페이지 컴포넌트들을 생성할때도 사용하고 URL과 생성된 페이지를 연결 시켜주는 역할을 한다.

**예시**

```tsx
// ./src/pages/[slug].tsx

const post = () => {}

export default post
```

첫 번째로 `Dynamic Page`를 만들기 위해 `[]`를 사용하여 `[slug].tsx`를 만들어 주었다. 이제 외부 데이터에 접근하기 위해서 `getStaticPaths`를 추가해주면 되겠다.

getStaticPhaths를 추가해 주기전, slug에 들어갈 값들을 list의 형태로 가져와야 한다. 위의 컴포넌트에서 모든 것을 처리하면 복잡해지므로 module로 만들어 가져와 사용할 수 있도록 분리하자.

```tsx
// ./lib/ssg.module.ts

import path from 'path'
import fs from 'fs'

export const getPostsSlug = () => {
  const filePath = path.join(process.cwd(), '__posts')
  const files = fs.readdirSync(filePath).map((file) => {
    return {
      params: {
        slug: file.replace('.md', ''),
      },
    }
  })
  return files
}
```

사실 리턴하는 부분이 아리송하긴하다. slug의 값만 있는 배열이 리턴되는게 아니고 (`[{slug: ‘first’}, {slug: ‘second’}]`) params를 한번 더 객체로 감싸주었다.( `[{params: {slug: ‘first’}}, {params:{slug: ‘second’}}]`) slug로 넣어준 key는 Dynamic Page에서 사용한 파일명인 [slug].tsx의 slug를 의미한다. 그렇기 때문에 key값을 잘 넘겨주어야 오류가 나지 않을 것이다.

이제 slug의 값을 path로 받을 수 있도록 `getStaticPaths`를 추가해주면 되겠다.

```tsx
// ./src/pages/[slug].tsx

import { getPostsSlug } from '../../lib/ssg.module.ts'

const post = () => {
  return <></>
}

export const getStaticPaths = () => {
  const paths = getPostsSlug()
  return {
    paths,
    fallback: false,
  }
}

export default post
```

위에서 주의할 점이 있다. slug가 들어간 list는 paths라는 키의 값으로 들어가야한다는 점이다. 또한 `fallback`의 값은 false로 주었는데 이는 `getStaticPaths`에서 주지 않은 id값이 들어오면 무조건 404 page를 보여주겠다는 말이다.

true일때는 404 page가 아닌 대체된 페이지가 보여지게 된다. Post 페이지의 경우 빈 객체가 들어있어 mapping해주는 값에 데이터가 없어 정보다 없다는 React Error가 나오게 된다. 만약 별도의 에러화면을 만들어둔다면 에러화면이 뜨게 되는 것이다. (React의 Suspense와 비슷한 원리) 또한 백그라운드에서는 에러 페이지를 빌드타임에서 만든것 처럼 생성해두어 잘못된 경로로 들어갔을 경우에 생성된 페이지가 나오게 된다.

404페이지도 커스텀 하고싶다면 /pages/404.tsx로 컴포넌트를 만들어 보면 되겠다. 자세한건 [공식문서](https://nextjs.org/docs/pages/building-your-application/routing/custom-error#404-page)를 참조하자.

이제 getStaticProps를 구현하면 되겠다. 헌데 생각해보면 이전에는 title, description 등등 MarkDown으로 된 정보는 따로 사용하지 않았었다. slug값을 기준으로 해당 파일로 접근해 MarkDown으로 된 정보만을 읽어 렌더링 해주면 되겠다.

그렇다면 이번에도 외부의 데이터를 가져와야하니 getStaticProps에서 모든걸 처리하지 않기 위해 module로 분리하여 사용하도록 하자.

```tsx
// ./lib/ssg.module.ts

import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

export const getPostData = (slug: string) => {
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

이제 해당 데이터를 읽어서 Post의 데이터를 보여주면 되겠다. `getStaticPaths`에서 읽어온 slug값을 위에서 만든 getPostData의 parameter로 넣어주고, 해당 .md 파일에 접근하여 데이터를 가져오는 방식으로 사용하면 되겠다.

먼저 `getStaticPaths`에서 props로 보내주는 params의 type을 설정해주어야 한다.

```tsx
// ./types/props.ts

export interface PostProps {
  params: { slug: PostData['slug'] }
}

export interface PostData {
  data: {
    title: string
    description: string
    coverImage: string
    date: string
  }
  content: string
  slug: string
}
```

`params: {slug: PostData.slug}`로도 접근가능 할 줄 알았지만, 당연하게도 해당 값은 type이기 때문에 객체처럼 접근하면 안되고 위와 같이 접근해야할 것이다.

이제 데이터를 뿌려 확인해주면 된다. NextJs v13 이상에서는 `getStaticProps`라는 함수를 직접적으로 쓰지 못 하므로 Post라는 컴포넌트 내부에서 만들어 두었던 `getPostData`함수를 호출하고 데이터를 가져와 뿌려주는 형식으로 만들어 주면 되겠다.

```tsx
import { getPostData, getPostSlug } from '../../../../lib/ssg.module'
import { PostProps } from '../../../../types/props'

const Post = async ({ params }: PostProps) => {
  const { data, content } = await getPostData(params.slug)
  return (
    <>
      <div>
        <h1>{data.title}</h1>
        <span>{data.date}</span>
      </div>
      <div>
        <h4>{data.description}</h4>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </>
  )
}

export const getStaticPaths = () => {
  const path = getPostSlug()
  return {
    path,
    fallback: false,
  }
}

export default Post
```

`getStaticPaths`는 production 빌드시에만 실행되고 런타임에는 실행되지 않는다. 개발환경인 `npm run dev` 에는 요청시마다 호출되게 된다.

## dangerouslySetInnerHTML

`dangerouslySetInnerHTML`은 브라우저 DOM에서 `innerHTML`을 사용하기 위한 React의 대체 방법이다. 일반적으로 코드에서 HTML을 설정하는 것을 사이트 간에 스크립팅(XXS, cross-site-scripting) 공격에 쉽게 노출 될 수 있기 때문에 위험하다. 따라서 React에서 직접 HTML을 설정할 수는 있지만 위험하다는 것을 상기 시키기위해서 `dangerouslySetInnerHTML`을 작성하고 `__html` 키로 객체를 전달해야한다.

```tsx
function createMarkup() {
  return { __html: 'First &middot; Second' }
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />
}
```

### 사이트 간 스크립팅 공격 or 크로스 사이트 스크립팅 (XXS, cross-site-scripting)

- 웹 App의 취약점중 하나이다. 관리자가 아닌 사람이 페이지에 악성 스크립트를 삽입할 수 있는 취약점을 이용해 공격하며, 악성 스크립트를 통해 해커가 사용자의 정보(쿠키, 세션)을 탈취하거나 비정상적인 기능을 수행하도록 한다.
- 주로 다른 웹 사이트와 정보를 교환하는 식으로 작동하므로 사이트간 스크립팅이라고 하며 취약점을 방지하기 위해서는 사용자의 입력 값을 검사하고 사용해야한다.

### Reference

[ppsu](https://ppsu.tistory.com/)

[Next.js 13 버전 - Data Fetching](https://velog.io/@xmun74/Data-Fetching-getStaticProps-getStaticPaths-getServerSideProps)

[Next.js 개인 블로그 개발기 | 감구마 개발블로그](https://gamguma.dev/post/2022/01/nextjs-blog-development-review)
