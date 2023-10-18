---
title: 'Javascript Switch와 if'
description: 'switch와 if else문은 조건문을 판별하고 조건을 수행하기 위해서 많이 사용하였다. if문을 주로 사용했지만 switch가 좀더 간결하고 가독성 좋은 코드가 되는것같아 이 두개에 대해서 좀 더 찾아보고 싶었다.'
coverImage: 'https://velog.velcdn.com/images/0sunset0/post/c04d97d3-660b-4530-a000-48a08c5c64ea/clean%20code.png'
date: '2023/04/04'
keywords: ['javascript', 'switch', 'if', 'yoonhu']
category: 'javascript'
outline: '데이터나 컴포넌트의 분기에 사용하는 switch와 if에 대해 깊게 비교해보자.'
---

![clean code를 위한 이미지](https://velog.velcdn.com/images/0sunset0/post/c04d97d3-660b-4530-a000-48a08c5c64ea/clean%20code.png)

# Switch와 If

switch와 if else문은 조건문을 판별하고 조건을 수행하기 위해서 많이 사용하였다. if문을 주로 사용했지만 switch가 좀더 간결하고 가독성 좋은 코드가 되는것같아 이 두개에 대해서 좀 더 찾아보고 싶었다.

## Switch와 If
---

### Switch
swich문은 비교할 값과 조건값이 같으면 실행하는 if문과 아주 비슷한 구조로 되어있다.

```ts
const findName = (name: string) => {
	switch(name) {
      case "철수":
        console.log("철수는 뚝뚝이입니다.")
        break;
      case "영희":
        console.log("영희는 똑똑이입니다.")
        break;
      default:
        console.log("모두 똑뚝이입니다.")
    }
}
```

위의 예제처럼 `name`이라는 매개변수가 비교할 값이 되며 `철수`, `영희`가 조건값이 되는것이다. 이후 `console.log`는 동작하는 문장이 되겠다.

즉, 아래와 같이 출력되는 것이다.
``` ts
findName("철수") // "철수는 뚝뚝이입니다."
```
만약 위에서 `break`를 써주지 않는다면 모든 `case`가 실행되게 된다.

```ts
const findName = (name: string) => {
	switch(name) {
      case "철수":
        console.log("철수는 뚝뚝이입니다.")
      case "영희":
        console.log("영희는 똑똑이입니다.")
      default:
        console.log("모두 똑뚝이입니다.")
    }
}

findName("철수")
// 철수는 뚝뚝이입니다. 영희는 똑똑이입니다. 모두 똑뚝이입니다.
```
해당 `case`만 출력이 되기위해서는 `break`를 잊지말고 넣어주어야 한다. 조건값과 일치하는 조건을 찾은 다음에는 `break`를 만날때까지 모든 동작을 실행하게 되기 때문이다.

### Switch와 If 비교
위의 예제를 If문으로 충분히 바꿀 수 있다.
```ts
const findName = (name: string) => {
	if(name === '철수') console.log("철수는 뚝뚝이입니다.")
    else if(name === '영희') console.log("영희는 똑똑이입니다.")
    else console.log("모두 똑뚝이입니다.")
}
```
if문의 예제와 switch문의 예제를 살펴보면 switch가 좀더 가독성이 좋다는 장점이 있다. 두 문장 모두 특정 조건에 따라 다르게 동작하는 코드를 만들 수 있지만 넓은 범위에서는 if, 좁은 범위(특정한 값)에서는 switch문을 사용하는게 가시적인 효과가 있는것으로 보인다.

그렇다면 if와 비교해서 switch만의 특출난 장점은 가독성 밖에 없는것인가? 그렇지는 않다.

<Blockquote type="info">

**If-else** 문은 원하는 조건이 나올 때까지 순차적으로 모든 경우의 수를 하나씩 비교한다. 하지만 **switch** 문은 jump-table을 사용하여 한번에 원하는 곳에 이동이 가능하다.

</Blockquote>

즉, **If-else**의 단점은 조건을 하나씩 모두 비교해서 확인한다는 것이고, switch는 단 한번 평가된다는 것이다.

#### Switch와 If의 차이점
위에서 보았던 예제를 다시 살펴보자.

```ts
const findName = (name: string) => {
	switch(name) {
      case "철수":
        console.log("철수는 뚝뚝이입니다.")
        break
      case "영희":
        console.log("영희는 똑똑이입니다.")
        break
      default:
        console.log("모두 똑뚝이입니다.")
    }
}

const findName2 = (name: string) => {
  if(name === '철수') console.log("철수는 뚝뚝이입니다.")
  else if(name === '영희') console.log("영희는 똑똑이입니다.")
  else console.log("모두 똑뚝이입니다.")
}
```
위의 예제를 개발자도구로 살펴보면, 아래와 같이 실행되는것을 볼 수 있다.

**Switch**
![switch의 흐름 이미지](https://velog.velcdn.com/images/ahsy92/post/0dc21602-796e-4e1d-aa87-5d00cb878927/image.gif)
**If**
![if의 흐름 이미지](https://velog.velcdn.com/images/ahsy92/post/6f882254-1b91-434a-b006-7eea75d82a1b/image.gif)

switch문은 위의 해당 `name`이 case와 같을 경우를 찾아 jumping하는 것을 볼 수 있다. 반면 if문의 경우에는 if문을 하나씩 순회하면서 같은 조건을 찾아 가는것을 볼 수 있다.

그렇다면 여기서 오는 속도의 차이도 존재하지 않을까?


#### Switch와 If 속도 비교
if문은 조건문의 개수만큼 O(n)의 시간복잡도를 갖게 되어 성능에 단점이 있고, switch문은 case의 개수만큼 jump-table을 차지하므로 메모리에 단점이 있다는것이다.

때문에 성능면에서만 보면 switch문이 더 빨라 조건이 3개 이상일 경우에는 switch문을 사용하는 것이 더 좋다는 이야기가 나온다는듯하다.

하지만, 사실 이러한 차이는 컴파일러의 처리속도에 따라 차이가 생기는것이다. 2022년 기준으로 컴파일러들이 워낙 우수하기 때문에 차이가 크게 나지 않는다는 이야기가 많다.

위의 예제에서 조건을 추가한 후 `console.time`으로 시간을 체크해보면 아래와 같이 나오게 된다.

<table>
	<thead>	
  		<tr>
      		<th>조건문</th>
          	<th>10,000번</th>
          	<th>1,000번</th>
          	<th>1번</th>
      	</tr>
  	</thead>
  	<tbody>  
      	<tr>
      		<td>Switch 문</td>
          	<td>평균 1ms</td>
          	<td>평균 0.1ms</td>
          	<td>평균 0.1ms 이하</td>
      	</tr>
      	<tr>
      		<td>If 문</td>
          	<td>평균 1ms</td>
          	<td>평균 0.1ms</td>
          	<td>평균 0.1ms 이하</td>
      	</tr>
	</tbody>
</table>

1번과 100번에 큰 차이는 보이지 않았고 10,000번 부터 전체적인 시간이 소모 되었으나 결과를 보았을때는 큰 차이가 없었음을 볼 수 있었다.

#### switch의 응용
switch문을 사용하면 코드가 좀더 깔끔해지는 것을 볼 수 있었다. 이러한 장점을 활용한다면, 조건부 판별시 or과 같은 조건이 많다면 switch로 깔끔하게 정리가 가능하다.

```ts
interface userInfo {
	age: number
  	name: string
  	class: string
}

// if일때의 조건문
const testIf = (user: userInfo) => {
	if((user.age > 50 && use.class === 'B') || (user.name ==='Kim' && user.age === 32)) return `Welcome ${user.name}`
    return "허가되지 않은 사용자입니다."
}

// switch일때 if와 같은 조건문
const testSwitch = (user: userInfo) => {
	switch(true) {
      case user.age > 50 && user.class === 'B':
      case user.name === 'Kim' && user.age === 32: 
   	  	return `Welcome ${user.name}`
        default:
        	return "허가되지 않은 사용자입니다."
    }
}
```

### References

[TOASTUI](https://ui.toast.com/weekly-pick/ko_20210603)



