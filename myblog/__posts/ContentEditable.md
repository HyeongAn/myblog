---
title: 'React ContentEditable'
description: '이전엔 input태그를 활용하여 입력할 text를 받았었는데, 이번 프로젝트를 진행하면서 div태그에서도 contentEditable이라는 속성으로 text입력을 받을 수 있다는걸 알았다. 이에 대한 방법과 코드를 기록해두려고 한다.'
coverImage: 'https://velog.velcdn.com/images/song961003/post/50ec1b07-d367-477f-80fb-6f3fbd91fc54/image.png'
date: '2023/07/18'
keywords: ['react', 'contenteditable', 'yoonhu']
category: 'react'
outline: '엘리먼트의 내용을 수정할때 사용하는 ContentEditable을 알아보자.'
---

![](https://velog.velcdn.com/images/song961003/post/50ec1b07-d367-477f-80fb-6f3fbd91fc54/image.png)

이전엔 `<input>`태그를 활용하여 입력할 text를 받았었는데, 이번 프로젝트를 진행하면서 `<div>`에서도 contentEditable이라는 속성으로 text입력을 받을 수 있다는걸 알았다. 이에 대한 방법과 코드를 기록해두려고 한다.

## contentEditable

HTML5의 모든 엘리먼트는 `contentEditable='true'`로 설정함으로써 해당 엘리먼트 내부에 텍스트를 작성할 수 있게할 수 있다. 즉, `input`, `textarea`와 같이 텍스트필드로 사용되던 엘리먼트 이외에 `div`, `span`등의 엘리먼트도 텍스트 필드로 변화시킬 수 있는 것이다.

`contentEditable`속성은 열거형(enum)속정인데 `true` `false`이외에도 `inherit`을 가질 수 있다. 기본 속성은 부모요소에서 편집가능 여부를 상속받는 `inherit`이다.

참고로, `HTMLElement.isContentEditble`과 같이 접근하여 `HTMLElement`의 `contentEditable` 속성을 Boolean값으로 받을 수 있다.

### contentEditable 사용법

위의 이야기를 들어보면 contenteEditable은 여로모로 유용할것 같지만 React에서 사용하기엔 조금 힘든면이 있다. `input`과 동작방식이 많이 다르기 때문에 change event가 아니라 input event가 동작한다. 또한 `input`값이 아니기 때문에 `value`또한 없다. 이 때문에 제어 컴포넌트 처럼 DOM을 제어할 수가 없다.

```tsx
// test.tsx

const Test: React.FC = () => {
  const onInputHandler = () => {
    console.log('입력되었습니다.')
  }

  return (
    <div onInput={() => onInputHandler()} contentEditable={true}>
      {content}
    </div>
  )
}
```

```tsx
// test2.tsx

import { useRef, useState } from 'react'

const Test2: React.FC = () => {
	const [nameEditable, setNameEditable] = useState<boolean>(true)
    const [name, setName] = useState<string>('hello world!')
    const nameRef = useRef<HTMLParagraphElement>(null)

    const onEditNameHandler = (e: MouseEvent) => {
    	if(nameRef !== null && e.target !== nameRef.current){
        	if(nameRef.current?.textContent) setName(nameRef.current.textcontent) {
           		setNameEditable(!nameEditable)
              	window.removeEventListener('click', onEditNameHandler)
            }
        }
    }

    const onNameKeyDownHandler = () => {

    }

    return (
    	<div>
      		<p
              ref={nameRef}
              contenteditable={nameEditable}
              onClick={() => window.addEventListener('click', (e) => onEditNameHandler(e))}
              >{name}</p>
      	</div>
    )

}


```

### React에서의 문제점과 해결

위의 두 방법으로 사용하면 될것이라고 생각이들테다. 하지만 세상은 그리 호락호락하지 않은법. 아래의 그림과 같은 React경고가 나타나게 된다.

![](https://velog.velcdn.com/images/ahsy92/post/d22e0c8c-62df-44ea-955e-b2c0265e80d4/image.jpg)

React는 virtual DOM을 구현하는데, 상태를 이용해 나중에 그릴 가상의 DOM을 만들어 놓고, 실제 DOM과 비교해가면서 변경이 필요한 노드를 업데이트하는 방식으로 가상 DOM을 만들어 바뀐 요소를 빠르게 파악하여 업데이트 하는 방식이다.

그렇기에 React 외부에서 DOM을 변경하면 React가 이러한 요소를 업데이트할때 영향을 받거나 문제가 발생할 수 있기에 나타나는 경고이다.

만약 `contentEditable`을 사용하는 것을 인지하고 있다면 `suppressContentEditableWarning={true}`를 설정해주어 위의 경고를 없앨 수 있겠다.

[Stack OverFlow](https://stackoverflow.com/questions/49639144/why-does-react-warn-against-an-contenteditable-component-having-children-managed)

사실 `cotentEditable`은 문제가 많은 사용방법이다. 참조의 오늘의 집이나, 경험의 기록이라는 블로그를 보면서 해결 방법이 많다는걸 알게 되었다. 오늘의 집처럼 DOM을 상태로 바꾸고, 이전/다음 상태를 비교해서 어떤 부분에서 변경이 필요하진 파악하는 로직을 위해 vitrual DOM을 거꾸로 만든다거나, 경험의 기록의 블로그처럼`contentEditable`요소에 렌더링이 발생하지 않도록 데이터를 직접 관리하는 방법이 있다는 것을 찾을 수 있었다.

두 방법모두 아직 초짜 개발자인 나에게 어렵기만한 내용이다...ㅠㅠ

### Reference

[공식문서](https://ko.reactjs.org/docs/dom-elements.html)

[오늘의 집](https://www.bucketplace.com/post/2020-09-18-%EC%9B%90%ED%99%9C%ED%95%9C-%EC%BD%98%ED%85%90%EC%B8%A0-%EC%9E%91%EC%84%B1%EC%9D%84-%EC%9C%84%ED%95%9C-%EC%97%90%EB%94%94%ED%84%B0-%EA%B0%9C%EB%B0%9C%EA%B8%B0/)

[경험의 기록](https://blog.dalgu.app/dev/2)

[곤이씨](https://yung-developer.tistory.com/109)
