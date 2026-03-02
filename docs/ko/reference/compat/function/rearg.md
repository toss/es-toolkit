# rearg (Lodash 호환성)

::: warning 화살표 함수를 사용하세요

이 `rearg` 함수는 인자 순서를 재배열하는 복잡한 래퍼를 만들어 느리게 동작해요. 화살표 함수를 사용해서 인자 순서를 직접 재배열하면 더 명확하고 빠른 코드를 작성할 수 있어요.

대신 더 빠르고 현대적인 화살표 함수를 사용하세요.

:::

함수의 인자 순서를 지정한 순서대로 재배열하는 새로운 함수를 생성해요.

```typescript
const rearranged = rearg(func, ...indices);
```

## 사용법

### `rearg(func, ...indices)`

함수를 호출할 때 인자의 순서를 바꾸고 싶을 때 `rearg`를 사용하세요. 지정한 인덱스 순서대로 인자를 재배열해서 원래 함수를 호출해요.

```typescript
import { rearg } from 'es-toolkit/compat';

const greet = (greeting, name) => `${greeting}, ${name}!`;

// 인자 순서를 바꿔요 (1번째, 0번째)
const rearrangedGreet = rearg(greet, 1, 0);
rearrangedGreet('World', 'Hello');
// Returns: "Hello, World!"

// 원래 함수는 그대로
greet('Hello', 'World');
// Returns: "Hello, World!"
```

배열로도 인덱스를 전달할 수 있어요.

```typescript
import { rearg } from 'es-toolkit/compat';

const fn = (a, b, c) => [a, b, c];

// 배열로 인덱스 지정
const rearranged = rearg(fn, [2, 0, 1]);
rearranged('a', 'b', 'c');
// Returns: ['c', 'a', 'b']
```

일부 인자만 재배열하고 나머지는 그대로 둘 수 있어요.

```typescript
import { rearg } from 'es-toolkit/compat';

const fn = (a, b, c, d) => [a, b, c, d];

// 처음 두 인자만 재배열
const rearranged = rearg(fn, 1, 0);
rearranged('first', 'second', 'third', 'fourth');
// Returns: ['second', 'first', 'third', 'fourth']
```

존재하지 않는 인덱스는 `undefined`로 처리돼요.

```typescript
import { rearg } from 'es-toolkit/compat';

const fn = (a, b, c) => [a, b, c];

// 존재하지 않는 인덱스 5를 포함
const rearranged = rearg(fn, 5, 1, 0);
rearranged('a', 'b', 'c');
// Returns: [undefined, 'b', 'a']
```

중첩된 배열도 평탄화해서 처리해요.

```typescript
import { rearg } from 'es-toolkit/compat';

const fn = (a, b, c, d) => [a, b, c, d];

// 중첩된 배열 인덱스
const rearranged = rearg(fn, [1, [2, 0]], 3);
rearranged('a', 'b', 'c', 'd');
// Returns: ['b', 'c', 'a', 'd']
```

#### 파라미터

- `func` (`(...args: any[]) => any`): 인자 순서를 재배열할 함수예요.
- `...indices` (`Array<number | number[]>`): 재배열할 인자의 인덱스들이에요. 중첩된 배열도 지원해요.

#### 반환 값

(`(...args: any[]) => any`): 인자 순서가 재배열된 새로운 함수를 반환해요.
