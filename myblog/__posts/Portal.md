---
title: 'React Portal'
description: '프로젝트를 진행하다보면 모달창이 필요할때가 있다. 이 모달창이 어떠한 컴포넌트에서 떠야할지 조절하는건 물론 개발자의 몫이겠지만, 대부분 최상위에 띄워져 사용자의 다음 스텝에 영향을 줄 수 있도록 만드는것이 목적이다.'
coverImage: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/0*yLEo2vsGtTj3JvZ9.jpg'
date: '2023/08/25'
keywords: ['react', 'portal', 'yoonhu', 'modal', 'component']
category: 'react'
outline: 'React Portal로 페이지의 가장위에 띄워지는 모달을 만들어보자.'
---

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*yLEo2vsGtTj3JvZ9.jpg)

# Portal

---

프로젝트를 진행하다보면 모달창이 필요할때가 있다. 이 모달창이 어떠한 컴포넌트에서 떠야할지 조절하는건 물론 개발자의 몫이겠지만, 대부분 최상위에 띄워져 사용자의 다음 스텝에 영향을 줄 수 있도록 만드는것이 목적이다.

이러다보니 상위 컴포넌트 바로 아래에서 실행이되는 경우가 많았다. React에서 실행되는 이러한 DOM의 구조는 context 혹은 redux를 이용하여 관리한다고 해도 복잡해지는건 사실이다.

이러한 복잡성을 나눠 사용할 수 있도록 React에서 지원한것이 `Portal`이다. 즉, 컴포넌트들의 상하 수직적인 관계 구조를 가지고 있는 DOM에서 자식 컴포넌트를 부모 컴포넌트 바깥에 있는 다른 컴포넌트에 전달할 수 있다는 것이다.

## 사용

`Portal`을 사용하는 방법은 ReactDOM의 `createPortal`메서드를 이용해 원하는 컴포넌트를 `Portal`에 넣을 수 있다.

```jsx
ReactDOM.createPortal(child, container)
```

첫 번째 파라미터인 `child`에 원하는 컴포넌트를 넣고, 두번째 인자인 `container`는 이 `Portal`이 띄워지는 목적지라고 생각하면 되겠다.

정리해서 말하자면 `child`에 넣어둔 컴포넌트는 렌더링 될때 상위 컴포넌트의 내부에서 렌더링 되는게 아닌 `container`에 넣어둔 컴포넌트에 렌더링 되게 되는것이다.

함수형 컴포넌트는 `ReactDOM.createPortal`이 만들어내는 `ReactPortal`이라는 타입의 `ReactNode`를 반환한다. TypeScript를 사용한다면 `child`의 Props의 타입을 정해줄 때, `ReactNode`로 선언하면 되겠다.

### 예제

React를 처음 설정할때, `index.html`을 보면 기본적인 `	header`, `body` 등 스크립트가 있는 것을 볼 수 있다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Web site created using create-react-app" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <div id="portal"></div>
  </body>
</html>
```

`React`는 `<div>`태그의 `id="root"`에서 모든 컴포넌트가 렌더링 되기 때문에 위에서 말한대로 자식 컴포넌트에서 바깥에 있는 다른 부모 컴포넌트에 접근할 수 있도록 새로운 `<div>`태그를 만들고 `id`를 부여하여 Modal이 띄워질 `container`를 정해주면 되겠다.

App이 마운트될 위치는 `id="root"`인 것이고, Modal이 마운트 될 위치는 `id="portal"`인 것이다.

정리해서 `portal`을 간단하게 보면 tree구조의 부모를 하나 더 만들어 독립적인 흐름을 가져간다고 보면 되겠다. `ReactDOM.createPortal`은 `<div id="root">`의 자식컴포넌트에서 `<div id="portal">`로 연결하는 포탈을 열어 컴포넌트를 마운트/언마운트 될 수 있도록 하는것이다.

### 활용

위의 설명에서 간단한 예제를 살펴보자.

먼저, `Portal`을 만들기 위해서 `index.tsx`에 있는 `App.tsx`를 렌더링하는 것과 같이, `<div id="portal">`에 렌더할 수 있는 `index.tsx`를 생성해 주는 것과 같은 작업이 필요하다.

```tsx
// src/portal/ModalContainer.tsx

import { ReactNode } from 'react'
import ReactDOM from 'react-dom'

type Props = {
  children: ReactNode
}

// 방법1
const ModalContainer: React.FC<Props> = ({ children }) => {
  return ReactDOM.createPortal(<>{children}</>, document.getElementById('portal')!)
}

// 방법2
const ModalContainer: React.FC<Props> = ({ children }) => {
  const modalRoot = document.getElementById('portal')
  return ReactDOM.createPortal(children, modalRoot!)
}

export default ModalContainer
```

이후 `Potal`에 띄울 Modal 컴포넌트를 만들고, 해당 Modal을 조절하기 위한 컴포넌트를 설정해주면 되겠다.

```tsx
// src/App.tsx

import { useState } from 'react'
import Modal from './portal/Modal'
import Test from './test'

const App = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Test isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  )
}

export default App
```

```tsx
// src/Test.tsx

interface Props {
  isOpen: boolean
  setIsOpen: (state: boolean) => void
}

const Test: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <div>
        <span>Modal PopUp!</span>
        <button onClick={(e) => setIsOpen(!isOpen)}>Click</button>
      </div>
    </>
  )
}

export default Test
```

```tsx
// src/portal/Modal.tsx

import ModalContainer from './ModalContainer'
import styled from 'styled-components'

interface ModalProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  return (
    <ModalContainer>
      <Background>
        <Container>
          <ContainerHeader>
            <h2>Modal</h2>
            <button onClick={() => setIsOpen(!isOpen)}>X</button>
          </ContainerHeader>
          <ContainerBody>Portal로 띄운 Modal입니다.</ContainerBody>
        </Container>
      </Background>
    </ModalContainer>
  )
}

export default Modal
```

여기서 주의 깊게 봐야할 것은 위에서 만든 `<ModalContainer>`안에 Modal의 내용이 들어가야한다는 것이다.

### 실행

![](https://velog.velcdn.com/images/ahsy92/post/ec4fffb4-dfe2-4172-9d52-b5bdc0dc2b1a/image.gif)

예상한 것처럼 Modal이 잘 띄워지는 것을 확인할 수 있고, 개발자도구의 Element를 확인해보니 아래와 같이 `<div id="root">`가 아닌, `<div id='portal'>`에서 컴포넌트가 마운트 되는 것을 볼 수 있다.

![](https://velog.velcdn.com/images/ahsy92/post/36fac88c-af2a-4e12-99ba-650d805071e3/image.gif)

## 정리

위에서 말했듯, 복잡성을 다루기 편하다는 장점이외에 사용하는 이점이 있을가 싶다. 당연히 있다. 물론 코드 상에서 보기 편하다는 장점도 있지만, Portal의 가장 큰 장점은 DOM트리 상에서 부모컴포넌트의 영향으로 CSS에 영향을 받지 않는다는 것과 이벤트 버블링에 있어서 가장 크지 아닐까 싶다.

- CSS 관점에서의 장점
  앞서 말했듯 `<div id="root">`에서 마운트 되는게 아닌, `<div id="portal">`에서 마운트되기 때문에 부모 컴포넌트의 CSS영향을 받지 않는다는 것이다. 가령 `z-index`이라던가 `overflow: hidden`과 같은 옵션이 부모 컴포넌트에 있다면 Modal을 조절하기가 어려워졌을 것이다.

- Portal의 전파에서의 장점
  React에서의 리렌더링이라던가, 부모 컴포넌트가 전파하는 이벤트는 개발자가 가장 신경써야하는 부분이다. 또한 Portal안에 있는 자식 컴포넌트의 이벤트가 부모 컴포넌트로 전달되어야 할 경우도 있을것이다. 그런데 DOM상에서 자식 컴포넌트를 포탈에 실어 엉뚱한 곳으로 보내버리면 어떻게 되어버릴까?
  위에서 계속 이야기 하듯, DOM이 가지고 있는 tree(`<div id="root">`)와 React가 가지고 있는 tree(`<div id="portal">`)가 구분되어 있다. DOM tree에서는 단순하게 그 위치에 이러한 컴포넌트가 있다 정도로만 확인할 수 있지만 React tree에서는 자식 컴포넌트가 있어야 하는 기존 위치에 Portal이 있다는 것을 확인할 수 있다. 따라서 이에 맞게 React tree에서는 부모 컴포넌트에서 전파되는 이벤트나 Context도 자식 컴포넌트에세 적절히 전달할 수 있게 되는 것이다.

- 이벤트 버블링에서의 장점
  반대로 자식 컴포넌트에서 발생하는 이벤트가 부모 컴포넌트로 전달되는 경우도 있을 것이다. 이벤트 버블링 처럼, 하위 컴포넌트에서 발생한 이벤트가 상위 컴포넌트에도 도달되게 되는데, 대표적으로 `onClick`이벤트가 있다.
  자식 컴포넌트에서 `onClick`을 실행하게 되면 상위 컴포넌트에 달려있는 `onClick`도 실행 되게 된다. 이렇게 자식에서 부모 컴포넌트의 이벤트 전달을 막기 위해서 `e.stopPropagation()`과 같은 메서드를 사용하기도 한다. 매번 위와 같은 메서드를 사용하면서의 불편함도 있거니와, 예상치 못한 버그가 생겨 이벤트가 작동하지 않는 경우가 있을 수도 있다.
  이러한 이벤트 버블링 또한 DOM tree내 부모의 컴포넌트가 아닌 React트리의 Portal의 부모 컴포넌트로 전달 되기 때문에 버블링에 대한 걱정도 줄어들 수 있겠다.

이번 프로젝트에서 react-reflex라는 라이브러리를 사용하면서 z-index가 최상위로 나와 있어서 그런지 모달의 한 부분이 계속해서 가려지는 현상을 겪었었다. 하지만 bootstrap으로 띄워지는 모달은 가려지지 않는 것을 보고 React의 portal을 사용해 위와 같은 이점을 본것이 아닐가하는 생각이 들었다.

React를 공부하면서 잘 사용할까? 했지만 역시나.. 뭐든 알아두면 좋은것 같다.
