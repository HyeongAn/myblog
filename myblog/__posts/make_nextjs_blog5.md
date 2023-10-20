---

title: 'NextJS Blog (5)'
description: 'NextJS를 좀더 활용하고자 정적인 Blog를 간단하게 만들어 보았었다. 이번엔 이전 다크모드를 구현하면서 SVG아이콘의 색이 변경되지 않았던 문제를 해결하고, 댓글기능을 위한 gitscus, NextJS의 Metadata를 등록하기 위한 방법들을 적어두도록 하겠다.'
coverImage: 'https://velog.velcdn.com/images/ahsy92/post/8077a889-90ed-4696-acfa-5fb34d3c8a9f/image.png'
date: '2023/10/20'
keywords: ['NextJS', 'NextJS13', 'Blog', 'react markdown', 'yoonhu']
category: 'makeblog'
outline: 'NextJS v13으로 정적인 블로그를 만들어보며 겪었던, 해결했던 문제들을 적어둔다.'

---

![](https://velog.velcdn.com/images/ahsy92/post/8077a889-90ed-4696-acfa-5fb34d3c8a9f/image.png)

# NextJS 정적 블로그 만들기

이전에 원티드 Pre-on-Boarding에서 배운 NextJS를 좀더 활용하고자 정적인 Blog를 간단하게 만들어 보았었다. 헌데 방법을 알았다고 해서 모든걸 다 경험한것은 아닐것 같아 공부겸 조금더 다듬어 개인 Blog를 만들어 보고싶었다. 이번엔 이전 다크모드를 구현하면서 SVG아이콘의 색이 변경되지 않았던 문제를 해결하고, 댓글기능을 위한 gitscus, NextJS의 Metadata를 등록하기 위한 방법들을 적어두도록 하겠다.

## SVG

`SVG` 이미지 파일은 `XML`문법을 기본으로 하는 문서이다. 로고나 아이콘 그래프에 사용되는데 2차원 그래픽을 표현하기 위해 만들어진 `XML`파일 형식의 마크업 언어라도 할 수 있다. 다른 `.png`, `.jpg` 이미지 파일에 비해 `CSS`나 `JS`로 수정이 가능하다는 점이 가장 큰 장점이 있다. 또한 확장이 가능하다는 점에서 확대해도 이미지의 품질이 떨어지지 않는다는 특징이 있다.

다크모드를 구현하면서 제일 걱정이 `img`태그에 쓰이는 `svg`파일의 색을 어떻게 반전시키는가였다. 현재의 이미지 파일은 아래와 같이 되어 있다.

```tsx
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M17.9999 12.0001V14.6701C17.9999 17.9801 15.6499 19.3401 12.7799 17.6801L10.4699 16.3401L8.15995 15.0001C5.28995 13.3401 5.28995 10.6301 8.15995 8.97005L10.4699 7.63005L12.7799 6.29005C15.6499 4.66005 17.9999 6.01005 17.9999 9.33005V12.0001Z"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeMiterlimit="10"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
```

`SVG`는 도형과 선으로 이루어져 있다. 주로  `<g>`, `<path>`의 값으로 이루어져있다.

`SVG`파일의 실제 벡터 드로잉 데이터는 `<svg>`태그 안에 표현되고, `<g>`태그는 좌표를 보정하는 역할을 하며, `<path>`태그는 실제 도형을 그리는 역할을 한다. 정형 도형을 그릴때는 `<ellipse>`, `<rectangle>`, `<circle>`, 등의 도형 태그로 표현한다.

### SVG 크기 변경

위의 코드에서도 볼 수 있겠지만 `SVG`의 크기를 변경하려면 `SVG`태그 내부에 `width`와 `height` 속성을 주면 간단하게 크기를 바꿀 수 있다.

```tsx
<svg width="24" height="24" viewBox="0 0 24 24" ...>
  ...
</svg>
```

또한 , `viewBox`를 이용하여 보고자 하는 이미지를 확대, 축소하여 볼 수 있다. 좌표와 가로, 세로의 비율을 결정하는 특성인데 `viewPort`와 `viewBox`가 동일하다면 원래 크기와 동일한 엘리먼트가 보이게 된다.

반면 `viewPort`가 `viewBox`보다 작다면 축소되어 보이고, `viewPort`가 `viewBox`보다 크다면 확대되어 보이게 된다. 

<Blockquote type="info">


  **viewPort**<br/>
  `svg`가 보이는 영역이다. `css`를 통해 `svg`의 `width`, `height`를 변경할 경우 `viewPort`의 너비와 높이가 변경되게 된다. 쉽게말해 스크린에 비추는 빔 프로젝트를 생각하면 되겠다. 빔프로젝트에서 출력되는 영상이 스크린 밖으로 삐져나가게 된다면 영상이 짤려서 보이게 되고, 반대로 영상이 작아지면 화면에 보이지 않게 되어 버린다. <br/><br/>
  **viewBox**<br/>
  좌표와 가로, 세로의 비율을 결정하는 특성. 위의 예시처럼 `viewPort`와 `viewBox`의 비율이 같으면 이미지가 정상적으로 보이겠지만, `width=24px`, `height=24px`, `viewBox=0 0 18 18`이라고 했을 경우 이미지가 확대되어 짤려 보이게 되고 반대로 `width=18px`, `height=18px`, `viewBox=0 0 24 24`일경우 이미지가 축소되어 작아 보이게 된다.



</Blockquote>



### SVG 색상 변경

`SVG`태그 안에 `style`, `fill`이라는 속성을 볼 수 있다. 이 속성이 벡터 데이터에 색상을 채우는 컬러 값을 지정하는 속성인것이다.

```tsx
<svg width='100%' height='100%' fill='blue'...>
	<path style='fill:rgb(42,224,196);' .../>
</svg>
```

`fill` 프로퍼티를 바로 인라인으로 사용해도 되고, 인라인 `style`프로퍼티 안에 `css`속성값으로 사용해도된다.

```tsx
// fill 프로퍼티로 사용하는 경우
<svg width='100%' height='100%' fill='blue'...>
	<path .../>
</svg>

// style 프로퍼티로 사용하는 경우
<svg width='100%' height='100%' style='fill: blue'...>
	<path .../>
</svg>
```

`SVG`도 똑같은 마크업 스타일 속성이라 당연히 `css`파일로 제어가 가능하다.

```css
svg {
  fill: blue;
}
```



### 다크모드 SVG

SVG의 기본적인 개념과 동작을 알아보았다. 그렇다면 다크/라이트 모드로 바뀌었을때 색상을 어떻게 바꾸면 좋을까? `fill`의 색상을 바꾸어 주면될 것같은데 각각의 모드일 경우에 색이 자동으로 변경되어야 한다. 이때 사용할 수 있는 가장 좋은 방법으로 `css`의 `currentColor`키워드이다. `currentColor`를 사용하여 `color`속성 값을 그대로 상속받아 사용할 수 있도록 해주면 되겠다.

<Blockquote type='info'>

  `currentColor` 키워드는 요소의 `color`속성 값을 나타낸다. 이를 통해 다른 속성이 `color`속성값을 따라가도록 설정할 수 있다.<br/>[MDN CSS](https://developer.mozilla.org/ko/docs/Web/CSS/color_value#currentcolor_%ED%82%A4%EC%9B%8C%EB%93%9C) 

</Blockquote>

이전의 다크모드를 구현했을때의 `css`코드는 아래와 같다. 각 모드가 바뀔  때, `color`의 값도 자동으로 바뀌고 있으니 `fill`혹은 `stroke`의 값을  `currentColor`로 넘겨주어 모드에 따른 `color`의 값으로 변경하면 되겠다.

```css
/* ./globals.css */

body[data-theme='dark'] {
  background-color: #202125;
  color: rgba(255, 255, 255, 0.91);
  ...
}

body[data-theme='light'] {
  background-color: white;
  color: #202125;
	...
}
```

```tsx
// ./icon/icon.svg

<svg width="24" height="24" viewBox="0 0 24 24" fill='currentColor' ...>
  ...
</svg>
```



## giscus

`giscus`는 `GitHub Discusstions`을 활용하여 댓글을 작성하는 것이 특징이다. 정적인 페이지만 두고, 따로 서버를 두지 않는 페이지를 만든다는 점에서 댓글기능이 있는 `giscus`는 매력적일 수 밖에 없었다. 대댓글과 테마, 로딩 UI를 지원하며, `React` 프레임 워크를 위한 컴포넌트 라이브러리를 제공하는 등 정적인 페이지를 만드는데 좋은 선택이 될 것 같았다.

### 사용하기

#### 저장소 설정하기

1. 먼저 레포지토리는 `public`이어야 한다.
   - 만약 `private`라면 해당 레포지토리로 이동후, `Settings` > `General` > `Danger Zone`으로 들어가 `Change visibility`를 누르면 `manke public`으로 공개 전환할 수 있다.
2.  GtiHub계정에 [giscus App](https://github.com/apps/giscus) 설치하기
3. `Discussions` 기능 활성화 하기
   - 1의 공개 저장소 변경과 마찬가지로 `GitHub`에서 레포지토리로 접근 후 `Settings` > `General` > `Featrues`가 있는데 `Disscussions`에 있는 체크박스에 체크해준다.

#### Giscus 활성화 하기

저장소 셋팅이 끝났다면 [giscus](https://giscus.app/ko)에서 설정을 해주게 되면 `script config`를 생성하면 되겠다.

1. 저장소에 레포지토리 이름 `myusername/myrepo`를 입력
2. `Discussion` 카테고리 선택
   - 일반적으로 `General`을 사용한다.
3. 특정 기능 사용여부 선택하기
   - 메인 포스트에 반응 남기기를 선택하면 `DisCussion`의 메인 포스트에 대한 반응을 이모티콘으로 댓글 위에 표시하게 된다.
4. 생성된 `script config`를 확인한다.

```tsx
<script src="https://giscus.app/client.js"
        data-repo="myusername/myrepo"
        data-repo-id="xxx"
        data-category="General"
        data-category-id="xxx"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="ko"
        crossorigin="anonymous"
        async>
</script>
```



#### 커스텀하기

위에서 생성된 `script config`를 바탕으로 블로그에서 활용할 수 있도록 컴포넌트를 만들자. 다크/라이트 모드에 따른 `giscus` 테마도 바꿔주기위해서 `contextAPI`로 상태 설정을 가져와 바꾸어 주었다.

```tsx
'use client'

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { themeContext } from '../../lib/context.module'

const Giscus = () => {
  const { theme } = useContext(themeContext)

  const loadGiscus = useCallback(() => {
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'myusername/myrepo')
    script.setAttribute('data-repo-id', 'xxx')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-lang', 'ko')
    script.setAttribute('data-category', 'General')
    script.setAttribute('data-category-id', 'xxx')
    script.setAttribute('data-theme', theme === 'dark' ? 'dark_dimmed' : 'light_protanopia')
    script.setAttribute('crossorigin', 'anonymous')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.async = true

    const comments = document.getElementById('giscusComments')
    if (comments) comments.appendChild(script)

    return () => {
      const comments = document.getElementById('giscusComments')
      if (comments) comments.innerHTML = ''
    }
  }, [theme])

  useEffect(() => {
    loadGiscus()
  }, [loadGiscus])

  return <section id="giscusComments" style={{ margin: '100px 0' }} />
}

export default Giscus
```



## Metadata

데이터를 설명하는 데이터로 `meta data`를 정의하게 되면 브라우저나 검색 엔진이 해당 웹 페이지에 대한 정보를 `meta data`를 토대로 분석하게 된다. 데이터를 표현하기 위한 목적으로 사용되며, 데이터를 더 빨리 찾기위한 목적으로 사용된다.

### meta 요소

`HTML`의 메타 태그를 사용하여 메타 데이터를 정의하며 `<head>`안에 다양한 형태의 `<meta>`가 `<meta name='' content=''>` 등의 형식으로 구성되어 있다. 예를들어 저자와 설명을 추가하기 위해서 `<meta>`요소가 `name`과 `content`속성을 갖는다. 

- `name`은 메타 요소가 어떤 정보의 형태를 갖고 있는지 알려준다.
- `content`는 실제 메타 데이터의 컨텐츠이다.

```html
<meta name="author" content="Chris Mills" />
<meta
  name="description"
  content="The MDN Learning Area aims to provide
complete beginners to the Web with all they need to know to get
started with developing web sites and applications." />
```

저가를 지정하는건, `content` 작성자에 대한 정보를 볼 수 있게 해주며 일부 `content` 관리 시스템에는 페이지 작성자 정보를 자동으로 추출해서 사용해줄 수 있는 기능이 있다.  **페이지 `content`관련 키워드를 포함시키는 것은 검색엔진에서 이 페이지가 더 많이 표시될 수 있는 가능성([SEO](https://developer.mozilla.org/ko/docs/Glossary/SEO))이 생기게 할 수 있다.**

<Blockquote type='info'>

 이처럼 유용할것 같은 `<meta>`태그는 분명 유용한 기능이지만,  많은 `<meta>`의 기능들중 사용되지 않는 것들이 있다. 예를들어 `<meta name='keywords' content='...'>`같이 해당 페이지의 관련성을 부여하는 `keywords`는 스팸 발송자들이 키워드 목록에 수백개의 키워드를 채워버리는 악용사례가 많아져 검색엔진들은 아예 크롤링하지 않도록 바뀌게 되었다.

</Blockquote>

### Other types of meta data

웹 페이지를 돌아다니다 보면 다른 종류의 메타 데이터를 꽤나 많이 찾아볼 수 있다. 웹 사이트에서 볼수 있는 기능들은 특정 사이트(SNS)에 사용할 수 있는 특정 정보를 제공하도록 설계된 독점 제작물인 것이다.

#### Open Graph Data

`Open Graph Data`는 FaceBook이 웹 사이트에 더욱 풍부한 메타 데이터를 제공하기 위해 발명한 메타 데이터 프로토콜이다.

```html
<meta
  property="og:image"
  content="https://developer.mozilla.org/mdn-social-share.png" />
<meta
  property="og:description"
  content="The Mozilla Developer Network (MDN) provides
information about Open Web technologies including HTML, CSS, and APIs for both Web sites
and HTML5 Apps. It also documents Mozilla products, like Firefox OS." />
<meta property="og:title" content="Mozilla Developer Network" />

```

예로 FaceBook에서 페이지에 MDN 링크를 넣으면 이미지와 설명이 함께 나타나게 된다. 사용자에게 한번에 볼 수 있는 정보를 보여줄 수 있게 되는 것이다. 현재로써는 표준처럼 사용되고 있다. [MDN Other types of metadata](https://developer.mozilla.org/ko/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML#other_types_of_metadata)

![Open graph protocol data from the MDN homepage as displayed on facebook, showing an image, title, and description.](https://developer.mozilla.org/ko/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML/facebook-output.png)

Twitter에도 유사한 형태의 독점적인 자체 메타 데이터를 가지고 있는데, 특정 웹 사이트의 url이 twitter.com에 표시될 때와 유사한 효과를 가지고 있게 된다.

```html
<meta name="twitter:title" content="yoonhu blog" />
```

위의 `<meta>`의 `property`에 `Open Graph data`를 주면서 `content`의 예시로 아래와 같이 사용한다. `SEO`에 최적화 될 수 있도록 적절히 사용하면 되겠다.

```html
<!-- 필수 og 태그 -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://example.com/page.html">
<meta property="og:title" content="Content Title">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:description" content="Description Here">
<meta property="og:site_name" content="Site Name">
<meta property="og:locale" content="en_US">
 
<!-- 필수는 아니지만, 추천하는 og 태그 -->
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<!-- naver 블로그, 카카오톡 미리보기 설정 -->
<meta property="og:title" content="콘텐츠 제목" /> 
<meta property="og:url" content="웹페이지 URL" />
<meta property="og:type" content="웹페이지 타입(blog, website 등)" />
<meta property="og:image" content="표시되는 이미지" /> 
<meta property="og:title" content="웹사이트 이름" /> 
<meta property="og:description" content="웹페이지 설명" />

<!-- 트위터 미리보기 -->
<meta name="twitter:card" content="트위터 카드 타입(요약정보, 사진, 비디오)" /> 
<meta name="twitter:title" content="콘텐츠 제목" /> 
<meta name="twitter:description" content="웹페이지 설명" /> 
<meta name="twitter:image" content="표시되는 이미지 " />

<!-- 모바일 앱 미리보기 -->
<--iOS-->
<meta property="al:ios:url" content=" ios 앱 URL" />
<meta property="al:ios:app_store_id" content="ios 앱스토어 ID" /> 
<meta property="al:ios:app_name" content="ios 앱 이름" /> 
 
<!-- Android -->
<meta property="al:android:url" content="안드로이드 앱 URL" />
<meta property="al:android:app_name" content="안드로이드 앱 이름" />
<meta property="al:android:package" content="안드로이드 패키지 이름" /> 
<meta property="al:web:url" content="안드로이드 앱 URL" />
```



### NextJS에서  Metadata 사용하기

NextJS에는 향상된  `SEO` 및 웹 공유 가능성을 위해서 애플리케이션 메타 데이터를 정의하는데 사용할 수 있는 메타데이터  API가 있다.

#### Static MetaData

정적 메타 데이터를 정의하려면 `layout.tsx`또는 정적 `page.tsx`파일에서  `metadata object` 를 내보내면 되겠다.

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '...',
  description: '...',
}

export page = () => {
  ... 
  return (
  	...
  )
}

export default page
```



#### Dynamic Metadata

NextJS에서는 `Dynamic Route`로 페이지별로 동적인 metadata를 설정해줄 필요가 있다. 이때 `generateMetadata`함수를 사용하여 동적 값이 필요한 메타 데이터를 가져올 수 있다.

```tsx
import type { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id
 
  // fetch data
  const product = await fetch(`https://.../${id}`).then((res) => res.json())
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}
 
export default function Page({ params, searchParams }: Props) {}
```

<Blockquote type='info'>

`generateMetadata`를 통한 정적, 동적 메타 데이터는 모두 서버 컴포넌트에서만 지원이 된다. 또한, 경로를 렌더링 할 때 `generateMetadata`, `generateStaticParams`, `Layouts`, `Pages` 및 서버 컴포넌트에서 동일한 데이터를 기억하여 중복적인 `requst`요청을 제거한다. `requst`요청을 사용할 수 없는 경우 `React`의 `cache`를 이용할 수 있다.<br/>

<br/>

NextJS는  UI를 클라이언트로 스트리밍 하기전, `generateMetadata` 내에서 데이터  `requst`가 완료될 때까지 대기한 후 스트리밍 응답의 첫 번째 부분인  `<head>`태그에 포함되게 된다.

</Blockquote>

#### Metadata 설정하기

위의 내용을 바탕으로 `Dynamic Metadata`를 설정하여  메타 데이터를 설정해보자.

```tsx
import { getPostData } from './lib/ssg.module'
import { Metadata } from 'next'

interface PostProps {
  params: { category: string; slug: string }
}

const Post = async ({ params }: PostProps) => {
  ...
  return (
    ...
  )
}

export const generateStaticParams = async () => {
  ...
  return params
}

export const generateMetadata = async ({ params }: PostProps): Promise<Metadata> => {
  const { data } = await getPostData(params.slug)
  return {
    title: data.title,
    description: data.description,
    authors: { name: 'yoonhu' },
    generator: 'Next.js',
    creator: 'yoonhu',
    publisher: 'Vercel',
    keywords: data.keywords,
    openGraph: {
      url: `https://yoonhu.vercel.app/blog/${params.category}/${params.slug}`,
      siteName: 'yoonhu blog',
      title: data.title,
      description: data.description,
      images: data.coverImage,
      locale: 'ko_KR',
      type: 'blog',
      authors: 'yoonhu',
      publishedTime: data.date,
    },
  }
}

export default Post

```

이제 `SEO`최적화를 위해서 구검색엔진에 등록해보자.


