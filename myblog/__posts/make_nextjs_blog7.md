---

title: 'NextJS Blog (7)'
description: 'NextJS를 좀더 활용하고자 정적인 Blog를 간단하게 만들어 보았었다. 이번엔 SEO에 관해 해보았던 작업의 마무리로 rss.xml을 추가하는 방법을 적어보도록 하겠다.'
coverImage: 'https://velog.velcdn.com/images/ahsy92/post/8077a889-90ed-4696-acfa-5fb34d3c8a9f/image.png'
date: '2023/10/24'
keywords: ['NextJS', 'NextJS13', 'Blog', 'react markdown', 'yoonhu']
category: 'makeblog'
outline: 'NextJS v13으로 정적인 블로그를 만들어보며 겪었던, 해결했던 문제들을 적어둔다.'

---

![](https://velog.velcdn.com/images/ahsy92/post/8077a889-90ed-4696-acfa-5fb34d3c8a9f/image.png)

# NextJS 정적 블로그 만들기

이전에 원티드 Pre-on-Boarding에서 배운 NextJS를 좀더 활용하고자 정적인 Blog를 간단하게 만들어 보았었다. 헌데 방법을 알았다고 해서 모든걸 다 경험한것은 아닐것 같아 공부겸 조금더 다듬어 개인 Blog를 만들어 보고싶었다. 이번엔 SEO에 관해 해보았던 작업의 마무리로 rss.xml을 추가하는 방법을 적어보도록 하겠다.

## Rss feed

Rss는 Really Simple Syndication또는 Rich Site Summary의 약자로 웹 사이트의 콘텐츠를 구독하고 업데이트 내용을 받아볼 수 있게해주는 기술이다. 특정 웹 사이트의 콘텐츠를 지속적으로 추적하고 싶을때 사용한다. Rss는 `SEO`에 직접적인 영향을 미치지는 않지만, 구글에서 `Stiemap`과 `Rss`를 함께 제출하는 것을 권장하고 있다. 구글 관련자의 답변에 따르면 `Rss`는 크롤링에만 도움을 줄 수 있다고 한다. `Rss`가 `SEO`에 긍정적인 영향을 미치는 경우는 기본적인 역할을 할 경우이다. 누군가 내 블로그의 `Rss`를 리더 프로그램이나 앱에 등록을 하고 자주 방문할때 재방문율이 높다는 것을 인지하게 되고 `SEO`에 좋은 영향을 미치게 된다.

하지만, `Rss`를 긁어 남의 글을 그대로 등록하는 경우가 많다. 중복 컨텐츠의 경우는 `SEO`에 악영향을 미치게 되므로 계속 모니터링하며 복제 게시물이 올라오는지 아닌지를 확인해봐야 할 것이다.

### RSS feed의 경로

Next 13이전의 버전에서는 `/public`폴더내에 `rss.xml`을 만들어두는 방식으로 만들 수 있겠지만, 나는 13 이후의 버전을 사용하고 있기때문에 동적으로 만들어야 했다.

#### Route Handler

 `app`폴더 내에 `rss.xml`를 만들어 `http://localhost:3000/rss.xml`의 형식으로 feed를 xml형식으로 렌더링하려면, NextJS의  `src/app`내에 있는 모든 디렉토리와 `route.ts(route.js)` 파일을 포함하여 경로를 만들어 주면 되겠다.

[공식문서](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)에 따르면 Route handler는 `app` 디렉토리 내의 `route.ts(routes.js)`파일에 정의되고 아래와 같은 형태로 구현된다.

```ts
export async const GET = () => {}
```

지원되는 HTTP 메서드로 `GET`, `POST`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`가 지원된다. 지원되지 않는 메서드가 호출되면 `405 Not Allowed`로 응답하게 된다.

#### 캐싱(Caching)

`GET` 메서드와 Response 객체를 사용할 때 기본적으로 Route handler는 캐싱된다. 위의 경우에서는 `app/rss.xml/route.ts`에서 `GET`메서드를 사용하는 경우의 Route handler가 캐싱되게 된다. Route handler내에서 외부의 데이터를 가져오는 경우가 있을 수도 있다. 이 데이터는 특정 API에서 가져온 것으로 가정한다.

```ts
export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })
  const data = await res.json()
 
  return Response.json({ data })
}
```



#### 캐싱 비활성화 (Opting out of caching)

캐싱을 비활성화 하려면 여러가지 방법이 있다. 

- `GET`메서드 대신 `Requst`객체를 사용하기.( `GET`메서드를 사용하지 않으면 캐싱이 비활성화 된다.)

  ```ts
  export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.DATA_API_KEY,
      },
    })
    const product = await res.json()
   
    return Response.json({ product })
  }
  ```

  `Request`객체를 사용하여 URL에서 매개변수를 추출하고 동적으로 데이터를 가져온다.

- 다른 HTTP 메서드를 사용하기. (예를 들어 `POST`메서드를 사용하면 Route Handler가 동적으로 처리된다.)
  ```ts
  export async function POST() {
    const res = await fetch('https://data.mongodb-api.com/...', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.DATA_API_KEY,
      },
      body: JSON.stringify({ time: new Date().toISOString() }),
    })
   
    const data = await res.json()
   
    return Response.json(data)
  }
  ```

  `POST`요청을 사용하여 되부 데이터를 생성하고 반환한다. `POST`메서드를 사용하면 핸들러가 동적으로 처리가 된다.

- 쿠키 및 헤더와 같은 동적 기능을 사용하기

- 세그먼트 구성 옵션을 수동으로 지정하기

#### TypeError: Response.json is not a function

<Blockquote type='danger'>
	TypeError: Response.json is not a function
</Blockquote>

TypeScript 5.2 미만을 사용하는 경우 `Response.json()`을 사용할 때 위와 같은 경고가 발생한다. 5.2 보다 더 낮은 버전을 사용하는 경우 `NextResponse.json()`을 사용하면 되겠다.

이제 이 Route handler를 이용하여 [Non-UI Responses](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#non-ui-responses)를 만들어주면 되겠다. 



### Rss.xml 만들기

공식문서대로 아래와 같이 코드를 만들어도 된다.

```ts
export async function GET() {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
			<rss version="2.0">
      <channel>
        <title>Next.js Documentation</title>
        <link>https://nextjs.org/docs</link>
        <description>The React Framework for the Web</description>
      </channel> 
			</rss>`
  )
}
```

하지만 이번엔 Rss feed 생성을 위해 [Rss](https://www.npmjs.com/package/rss) package를 사용해서 만들어보도록 하겠다.

#### Rss 설치

```shell
npm install rss
npm install -D @types/rss
```

나는 맨처음에 `devDependencies`를 왜 따로 설치해야 할까해서 위의 rss만 설치했었다. 헌데 rss.xml은 빌드 프로세스에 관련된 패키지에 포함이 되어야 하므로 `devDependencies`에 넣어주어야한다. 이렇게 하지 않으면 아래와 같은 에러가 나게 된다.

#### Module not found: Can't resolve 'rss'

<Blockquote type='danger'>
  Module not found: Can't resolve 'rss'
</Blockquote>

#### generateRss

먼저 Rss에 등록을 위한 post의 데이터를 가져오자. 이전에 사용했던 나의 경우엔 `getPosts`함수를 사용하여 데이터를 가져올 수 있었고, 만약 외부 API로 가져오거나, 서버에서 데이터를 받아올 경우 `getPosts`대신 `fetch` 해서 가져오면 되겠다.

```ts

const baseUrl = `https://yoonhu.vercel.app`

export const generateRss = async () => {
  try {
    const posts = await getPosts()
    const date = new Date()

    const feed = new Rss({
      title: 'yoonhu blog',
      description: '공부한 것을 적어두고 기록해두는 yoonhu의 블로그입니다.',
      copyright: `All rights reserved ${date.getFullYear()}, yoonhu`,
      feed_url: `${baseUrl}/rss.xml`,
      site_url: baseUrl,
      language: 'ko',
      pubDate: new Date(),
    })

    posts.forEach((post) => {
      const url = `${baseUrl}/${post.data.category}/${post.slug}`
      feed.item({
        title: post.data.title,
        url,
        description: post.data.description,
        author: 'yoonhu',
        guid: url,
        date: new Date(post.data.date.replace('/', '-')),
        custom_elements: [{ 'content:encoded': post.content }],
      })
    })

    return feed.xml()
  } catch (err) {
    console.error('Error generating Rss feed', err)
    return null
  }
}

```

이제 위의 Route handler로 경로를 만들었던 `app/rss.xml/route.ts`에 Non-UI Response를 만들어 주면 되겠다.

```ts
// ./app/rss.xml/route.ts

export const GET = async () => {
  const feedXml = await generateRss()

  if (feedXml) {
    return new Response(feedXml, {
      headers: { 'Content-Type': 'application/xml' },
    })
  } else {
    return new Response('Error generating RSS feed', { status: 500 })
  }
}

```

이제 rss.xml을 확인해보면 아래와 같이 나오게 된다.

![rss.xml 성공 이미지](https://velog.velcdn.com/images/ahsy92/post/0ab9a266-d871-48c9-ace0-d8adf7470827/image.png)



































































