# curryRight

함수를 오른쪽에서 왼쪽으로 커링해서 한 번에 하나의 인자로 호출할 수 있도록 해요.

```typescript
const curriedFunc = curryRight(func);
```

## 레퍼런스

### `curryRight(func)`

함수를 오른쪽에서 왼쪽으로 부분 적용하고 싶을 때 `curryRight`를 사용하세요. 일반 `curry`와 달리 마지막 인자부터 받아요.

```typescript
import { curryRight } from 'es-toolkit/function';

function sum(a: number, b: number, c: number) {
  return a + b + c;
}

const curriedSum = curryRight(sum);

// 인자 `c`에 값 `10`을 제공해요
const add10 = curriedSum(10);

// 인자 `b`에 값 `15`를 제공해요
const add25 = add10(15);

// 인자 `a`에 값 `5`를 제공해요
// 모든 인자를 받았으므로 이제 값을 반환해요
const result = add25(5);
// Returns: 30
```

오른쪽에서 왼쪽으로 인자를 적용하는 것이 더 자연스러운 경우에 유용해요.

```typescript
function greet(greeting: string, name: string) {
  return `${greeting}, ${name}!`;
}

const curriedGreet = curryRight(greet);
const greetJohn = curriedGreet('John');

greetJohn('Hello'); // Returns: 'Hello, John!'
greetJohn('Hi'); // Returns: 'Hi, John!'
```

#### 파라미터

- `func` (`(...args: any[]) => any`): 커링할 함수예요.

#### 반환 값

(`(...args: any[]) => any`): 오른쪽에서 왼쪽으로 한 번에 하나의 인자로 호출할 수 있는 커링된 함수예요.
