# overArgs

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`func` 함수의 인자들을 변환 함수로 변환해서 호출하는 새로운 함수를 생성해요.

변환 함수는 다음과 같은 형태가 될 수 있어요:

- 값을 받아서 반환하는 함수
- 각 인자에서 속성 값을 가져오는 속성 이름 (문자열)
- 인자가 객체의 속성과 일치하는지 확인하는 객체
- 인자의 속성이 값과 일치하는지 확인하는 [속성, 값] 배열

변환 함수가 `null`이나 `undefined`인 경우에는 [identity](../../function/identity.md) 함수가 대신 사용돼요.
제공된 변환 함수의 개수만큼만 인자를 변환해요.

## 인터페이스

```typescript
function overArgs<F extends (...args: any[]) => any, T extends Array<any>>(
  func: F,
  transforms: T
): (...args: any[]) => ReturnType<F>;
```

### 파라미터

- `func` (`F`): 인자를 변환해서 전달할 함수예요.
- `transforms` (`T`): 인자를 변환할 함수들의 배열이에요.

### 반환 값

(`(...args: any[]) => ReturnType<F>`): 인자들을 변환한 다음 `func`에 전달하는 새로운 함수를 반환해요.

### 오류

`func`가 함수가 아닌 경우 TypeError를 던져요.

## 예시

```typescript
import { overArgs } from 'es-toolkit/compat';

// With function transforms
function doubled(n: number) {
  return n * 2;
}

function square(n: number) {
  return n * n;
}

const func = overArgs((x, y) => [x, y], [doubled, square]);

func(5, 3);
// => [10, 9]

func(10, 5);
// => [20, 25]

// With property shorthand
const user = { name: 'John', age: 30 };
const getUserInfo = overArgs((name, age) => `${name} is ${age} years old`, ['name', 'age']);

getUserInfo(user, user);
// => "John is 30 years old"

// Only transform specific arguments
const partial = overArgs((a, b, c) => [a, b, c], [doubled]);

partial(5, 3, 2);
// => [10, 3, 2]
```
