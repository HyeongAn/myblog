---
title: 'React forwardRef'
description: '드롭다운을 만들면서 필요했던 forwardRef에 대해 정리해 놓으려고 한다. 이전 프로젝트에서 부모 컴포넌트에서 자식 컴포넌트로 함수를 호출했던 적이 있었는데 그 방법에 대한 forwardRef를 적어둔다.'
coverImage: 'https://velog.velcdn.com/images/ahsy92/post/cb7c819b-3c54-4b0a-83f4-11390bd8fa69/image.png'
date: '2022/11/15'
keywords: ['react', 'forwardRef', 'useRef', 'yoonhu']
category: 'react'
outline: 'React에서 ref를 props으로 넘겨주면서 사용했던 방법을 적어둔다.'
---

![](https://velog.velcdn.com/images/ahsy92/post/cb7c819b-3c54-4b0a-83f4-11390bd8fa69/image.png)

# forwardRef

드롭다운을 만들면서 필요했던 forwardRef에 대해 정리해 놓으려고 한다. 사실 이전에 [부모컴포넌트에서 자식 컴포넌트 함수 호출하기](https://velog.io/@ahsy92/React-%EB%B6%80%EB%AA%A8%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%97%90%EC%84%9C-%EC%9E%90%EC%8B%9D%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%ED%95%A8%EC%88%98-%ED%98%B8%EC%B6%9C%ED%95%98%EA%B8%B0)에서 사용된 적이 있지만 이에 대한 자세한 내용을 적어두지 않아서 여러 글을 참고 삼하 적어보려고 한다.

## useRef
React 컴포넌트에 ref prop을 넘겨 그 내부에 있는 HTML엘리먼트에 접근을 하게 해주는 함수이다. 즉, 간단하게 말하자면 ref를 자식에게 props로 내려줄 때 사용되는 함수라는 것이다.

React에서 ref는 엘리먼트의 직접 접근하기 위해서 사용된다. 예를 들어 아래와 같이 사용할 수 있다.

```js
import React, {useRef} from 'react'

const Main = () => {
	const inputRef = useRef(null);
  	
  	const focusHandler = () => {
    	inputRef.current.focus()
    }
    
    return(
     <>
      <input type='text' ref={inputRef}/>
	  <button onClick={focusHandler}>포커스 주기</button>
     </>
  	)
}
```

아래의 Main이라는 컴포넌트에서는 useRef 훅 함수로 생성한 inputRef 객체를 input엘리먼트의 ref prop으로 넘기고 있다. 이렇게 해주면 inputRef객체의 current 속성에 input 엘리먼트의 레퍼런스가 할당되는데 이를 통해 focusHandler() 이벤트 핸들러에서 input엘리먼트의 focus함수를 호출할 수 있다.

위와 같은 경우가 ref를 가장 많이 사용하는 예일 것이다. 하지만, 어떤 컴포넌트에서 다른 컴포넌트 내부에 있는 HTML엘리먼트에 접근해야할 때는 어떻게 해야할까? 

위에서 했던 방법처럼 ref를 그저 props로 내려주기만 하면 될까?

```js
import React, { useRef } from "react";

const Input = ({ ref }) => {
  return <input type="text" ref={ref} />;
}

const Main = () => {
  const inputRef = useRef(null);

  const focusHandler = () => {
    inputRef.current.focus();
  }

  return (
    <>
      <Input ref={inputRef} />
      <button onClick={focusHandler}>포커스 주기</button>
    </>
  );
}
```
위의 코드를 실행시켜 보면, 콘솔에서 아래와 같은 경고를 볼 수 있다.
```js
Warning: Input: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. 
```

위의 내용을 살펴보자면 ref는 prop이 아니라 undefined가 설정될것이고, 다른prop을 사용해야한다는 내용이다. 설명대로 ref대신에 다른 이름의 prop을 사용하도록 수정하여 이문제를 해결할 수도 있다.

하지만 다른 개발자들과의 협업을 하는 상황에서 이러한 컴포넌트 디자인은 보는 사람들로 하여금 혼란스럽게 받아들여질 수 있다. 어떻게 하면 React 컴포넌트에서도 HTML엘리먼트와 같이 ref를 ref라고 부를 수 있을까?

## forwardRef
React 컴포넌트에서 ref prop을 사용하려면 forwardRef()라는 함수를 사용해야한다. 컴포넌트를 forwardRef()로 감싸주면 컴포넌트 함수는 2번째 매개변수를 갖게 되는데 이를 통해 ref prop을 넘길 수 있게 되는 것이다.

위에서 작성한 컴포넌트를 forwardRef()방식으로 바꿔보자.
```js
import React, { useRef } from "react";

const Input = forwardRef((props, ref ) => {
  return <input type="text" ref={ref} />;
})

const Main = () => {
  const inputRef = useRef(null);

  const focusHandler = () => {
    inputRef.current.focus();
  }

  return (
    <>
      <Input ref={inputRef} />
      <button onClick={focusHandler}>포커스 주기</button>
    </>
  );
```

이제 버튼을 클릭해보면 위와 같은 오류가 아닌 입력란으로 포커스가 이동하는 것을 볼 수 있을 것이다.
