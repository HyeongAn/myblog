---

title: 'SSR에서 React Query의 사용'

description: 'SSR에서 React Query를 사용해보자.'

coverImage: 'https://velog.velcdn.com/images/seunghwan7305/post/214e0c15-ac9c-4ea1-be4b-4fa61f887309/image.png'

date: '2024/7/31'

keywords: ['react', 'react query', 'ssr']

category: 'react'

outline: 'SSR에서 React Query를 사용해보자.'

---

![React query 대표이미지](https://velog.velcdn.com/images/seunghwan7305/post/214e0c15-ac9c-4ea1-be4b-4fa61f887309/image.png)

# React Query
[이전글](https://yoonhu.vercel.app/react/ReactQuery1)에서는 React Query를 시작하면서 기본적인 사용법에 대해 정리하였다. 이번엔 내가 NextJS에 적용하면서 겪은 React Query의 SSR 대해 글을 써보려고 한다.

NextJS의 가장 큰 장점은 SSR과 pre-rendering이 가능하다는 점에 큰 장점이 있는 프레임 워크이다. 이전에 React Query를 사용하지 않았을 때에는 데이터를 요청시 서버 컴포넌트에서 props로 계속해서 내려주는 방식으로 사용하였는데, 컴포넌트도 복잡해짐에 따라 props또한 계속 내려주다보니 불편한게 여간 한 두가지가 아니었다.

이러한 props drilling을 피하고 더 나은 코드를 만들고자 React Query의 **Hydration**을 사용해보고자 한다.

## React Query의 Hydration
React Query의 Hydration은 서버에서 prefetch된 데이터 상태를 dehydrate하고, 클라이언트에서 다시 통합하거나 rehydrate하는 과정을 말한다. 이러한 과정을 통해서 사용자는 데이터 fetching을 다시 할 필요 없이 완전한 웹 페이지를 볼 수 있게 되는것이다.

NextJS의 Hydration과 같이 서버에서 fetching한 데이터의 상태를 직렬화 하고, 클라이언트에서 rehydrate하는 원리와 비슷하다. React Query는 cache를 dehydrate하여 서버에서 클라이언트로 전달하고 클라이언트에서는 dehydrate된 cache 데이터를 QueryClient로 rehydrate하여 사용한다. 

이후 추가적인 네트워크 요청이 있을때 해당 데이터를 반환하면서 불필요한 네트워크 요청을 없앨 수 있게 되며, 이에 따른 로드타임 개선, 불필요한 로딩 상태 및 콘텐츠 깜빡임 등의 문제를 해결할 수 있다.

## 사용
자 위에서 아무리 글로 좋은 글을 적어봤자 실제로 해보는것보다야 기억에 잘 남지 않는다. 바로 실전으로 들어가보자.

### Provider 설정

[이전글](https://yoonhu.vercel.app/react/ReactQuery1)에서 ReactQueryProvider를 만들면서 `queryClient`객체를 useState에 만들어 두었던것을 기억할 것이다.

```tsx

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
```

컴포넌트가 마운트될 때마다 새로운 QueryClient 인스턴스가 생성되는것 막기 위해서(데이터 손실, 데이터 불일치, 리소스 낭비, 캐시 무효화 이슈) 위와 같이 `useState`를 사용해주었다. 이후 layout 컴포넌트에 아래와 같이 `ReactQueryProvider`로 감싸주면 되겠다.

```tsx

import ReactQueryProvider from "@/utils/ReactQueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
```

### getQueryClient 설정
이후 data prefetching을 위한 단일 queryClient를 사용해야한다. [공식문서](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#alternative-use-a-single-queryclient-for-prefetching)에 따르면 모든 서버 컴포넌트에서 재사용할 수 있는 단일 queryClient를 생성하여 관리하고 있다.

```tsx

// app/getQueryClient.jsx
import { QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

const getQueryClient = cache(() => new QueryClient())
export default getQueryClient
```
서버에서 데이터를 fetching할 때 마다 필요한 queryClient를 cache해서 사용할 수 있도록 하고 있는데 그 이유는 다음과 같다.

<Blockquote type='info'>

SSR 환경에서 각 요청마다 새로운 QueryClient를 생성하면서도, 동일한 요청 내에서는 일관된 인스턴스를 사용할 수 있게 한다.
(각 요청에 대해 격리된 QueryClient를 제공하면서도, 동일한 요청 내에서는 일관된 상태를 유지할 수 있다.)

</Blockquote>

<Blockquote type='info'>

불필요한 QueryClient 인스턴스 생성을 줄여 메모리 사용을 최적화한다. 다만, 단점이라고 하면 `dehydrate(getQueryClient())`를 호출할 때마다 전체 `queryClient`를 직렬화 하므로 이전에 직렬화된 쿼리와 현재 서버 컴포넌트와 관련 없는 쿼리까지 포함 될 수 있기 때문에 불필요한 오버헤드가 발생할 수 있다. 하지만 내가 사용하는 NextJS는 fetch()를 사용할 때 중복된 요청을 자동으로 제거하기 때문에, 단점을 고려할 필요는 없었다.

</Blockquote>


### queryKey, queryFn 정리하기
API를 서비스별로 관리하면 가독성과 유지 보수에 유리한 이점을 가져갈 수 있다. 나는 Pack이라는 서비스 API를 가지고 설명해 보도록 하겠다.

```ts
// @/services/Services.ts

import axios, { AxiosInstance } from "axios";

class Service {
  protected http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default Service;

```
먼저 PackService 클래스를 구현하기 전, Http요청을 처리하는 레이어를 구현하기 위해 간단하게 위와 같이 Service class를 구성하였다. 이후 각각의 서비스를 클래스에서 Service 클래스를 상속받아 처리하면 되겠다.

```ts

import Service from "../Services";

class PackServices extends Service {
  async getPack(id: number) {
    const { data } = await this.http.get(`/packs/${id}`);
    return data;
  }

  async getBuyNowPack() {
    const { data } = await this.http.get(`packs/ongoing?packType=buyItNows`);
    return data;
  }

  async getAuctionPack() {
    const { data } = await this.http.get(`/packs/ongoing?packType=auctions`);
    return data;
  }

  async getPackBanner() {
    const { data } = await this.http.get("/banners/active");
    return data;
  }
}

const packServices = new PackServices();
export default packServices;

```
이후 queryKey와 queryFn을 효율적으로 관리하기 위해서 [TkDodo's blog](https://tkdodo.eu/blog/effective-react-query-keys)에서 `React Query Key 관리하는 방법`을 참고로 아래와 같이 따로 관리해 두었다.

```ts

import { queryKeyType, queryOptionsType } from "@/types";
import PackServices from "./PackServices";

const queryKeys = {
  all: (key: queryKeyType) => ["pack", key.id],
  buyItNow: (key: queryKeyType) => [...queryKeys.all(key), "buyItNow"],
  auction: (key: queryKeyType) => [...queryKeys.all(key), "auction"],
  banner: () => ["banner"],
};

const queryOptions = {
  all: (key: queryOptionsType) => ({
    queryKey: queryKeys.all(key),
    queryFn: () => PackServices.getPack(key.id),
  }),
  buyItNow: (key: queryOptionsType) => ({
    queryKey: queryKeys.buyItNow(key),
    queryFn: () => PackServices.getBuyNowPack(),
  }),
  auction: (key: queryOptionsType) => ({
    queryKey: queryKeys.auction(key),
    queryFn: () => PackServices.getAuctionPack(),
  }),
  banner: () => ({
    queryKey: queryKeys.banner(),
    queryFn: () => PackServices.getPackBanner(),
  }),
};

export default queryOptions;


```

참고했던 블로그에서는 `queryKey`에 관해서만 이야기하지만, SSR에서의 Hydrate를 사용한다거나, useQuery로 해당 함수를 불러오는 경우가 많아져 `queryKey`와 비슷하게 `queryOption`으로 함수도 같이 관리하기로 하였다.

또한, 클라이언트에서 `useQuery`를 사용해서 데이터를 가져올때, 좀 더 사용하기 편하도록 usePackService라는 파일을 만들어 따로 관리해두도록 하였다.

```ts

import queryOptions from "./queries";
import { useQuery } from "@tanstack/react-query";
import { queryOptionsType } from "@/types";

export const usePack = (keys: queryOptionsType) => {
  return useQuery(queryOptions.all(keys));
};

export const useBuyNowPack = (keys: queryOptionsType) => {
  return useQuery(queryOptions.buyItNow(keys));
};

export const useAuctionPack = (keys: queryOptionsType) => {
  return useQuery(queryOptions.auction(keys));
};

export const useBanner = () => {
  return useQuery(queryOptions.banner());
};

```

### 서버에서 prefetching 하고 데이터 de/hydrate하기
이제 React Query Hydration을 위한 준비가 끝났다. prefetch를 하고 싶은 페이지에서 React query를 날려보도록 하자.

```tsx

import Pack from "@/components/Pack/Pack";
import queryOptions from "../../services/pack/queries";
import getQueryClient from "@/utils/getQueryClient";
import { queryOptionsType } from "@/types";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const Home = async () => {
  const queryClient = getQueryClient();

  const queryOption: queryOptionsType = {
    id: 198,
  };
  
  // 단일 query
  await queryClient.prefetchQuery(queryOptions.all(queryOption))

  // 복수 query
  const queryAll = queryOptions.all(queryOption);
  const queryAuction = queryOptions.auction(queryOption);
  const queryBuyItNow = queryOptions.buyItNow(queryOption);
  const queryBanner = queryOptions.banner();
  
  const queries = [queryAll, queryAuction, queryBuyItNow, queryBanner];

  await Promise.all(queries.map((query) => queryClient.prefetchQuery(query)));

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Pack />
    </HydrationBoundary>
  );
};

export default Home;

```
단일 query를 사용할경우 `await`으로 prefetchQuery를 불러 사용하면 되겠고, 여러개의 query를 사용할 경우 해당 query가 병렬적으로 실행 될 수 있도록 `Promise.all`로 묶어 주어 사용하면 되겠다.

![](https://velog.velcdn.com/images/ahsy92/post/4ef9dcff-5ddc-4bac-a0e0-5a4bd7abc326/image.png)

`ReactQueryDevtools`를 보면 SSR을 수행하고 있는 서버 컴포넌트에서 prefetching한 데이터를 hydration시켰을때 위와 같이 inactive 상태로 있는것을 볼 수 있다.

서버 컴포넌트에서의 prefetch는 생각보다 많이 사용하는 기능중 하나이다. 매번 `Promise.all`을 사용해서 써주기보다는 `dehydrate`한 결과물을 리턴하는 함수를 만들어 사용하는게 좀 더 깔끔한 코드가 될 것이다.

```tsx

interface QueryProps {
  queryKey: QueryKey;
  queryFn: () => Promise<ResponseType>;
}

export const getDehydratedQuery = async <Q extends QueryProps[]>(
  queries: Q
) => {
  const queryClient = getQueryClient();
  await Promise.all(
    queries.map(({ queryKey, queryFn }) =>
      queryClient.prefetchQuery({ queryKey, queryFn })
    )
  );

  return dehydrate(queryClient);
};
```
위와 같이 `getDehydratedQuery`함수를 만들고 서버컴포넌트에서는 아래와 같이 사용하면 되겠다.

```tsx

import Pack from "@/components/Pack/Pack";
import queryOptions from "../../services/pack/queries";
import { getDehydratedQuery } from "@/utils/getQueryClient";
import { queryOptionsType } from "@/types";
import { HydrationBoundary } from "@tanstack/react-query";

const Home = async () => {
  const queryOption: queryOptionsType = {
    id: 198,
  };

  const queryAll = queryOptions.all(queryOption);
  const queryAuction = queryOptions.auction(queryOption);
  const queryBuyItNow = queryOptions.buyItNow(queryOption);
  const queryBanner = queryOptions.banner();


  const dehydratedState = await getDehydratedQuery([queryAll,queryAuction,queryBuyItNow,queryBanner]);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Pack />
    </HydrationBoundary>
  );
};

export default Home;

```

이후 prefetch한 데이터를 클라이언트 컴포넌트에서 가져오기 위해서는 useQuery를 이용해서 가져오면 되겠다. 해당 데이터를 먼저 캐싱처리하고 있으므로, 서버로부터의 요청이 아닌 캐싱된 데이터를 가져오기 때문에 별도의 리소스를 사용하지 않게 된다.

```tsx
"use client";

import React from "react";
import { usePack } from "../../../services/pack/usePackService";
import { queryOptionsType } from "@/types";

const Pack = () => {
  const queryOption: queryOptionsType = {
    id: 198,
  };
  const { data } = usePack(queryOption);

  console.log({ data });
  return <div>안녕하세요 Pack입니다.</div>;
};

export default Pack;

```

![](https://velog.velcdn.com/images/ahsy92/post/6799cff7-d597-4289-bf10-b2aaf9540cfd/image.png)


위와 같이 클라이언트 컴포넌트에서 동일한 쿼리요청을 했을때 active상태로 바뀌는 것을 볼 수 있다. 









