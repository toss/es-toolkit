# NonEmptyArray

최소 한 개 이상의 요소를 가지는 배열 타입이에요. 첫 번째 요소가 `T | undefined`가 아니라 `T`로 좁혀져요.

```typescript
type Arr = NonEmptyArray<T>;
```

## 사용법

### `NonEmptyArray<T>`

"비어 있을 수 없는 배열"을 타입으로 표현하고 싶을 때 사용하세요. 빈 배열은 할당할 수 없고, 첫 요소 접근이 항상 `T`로 좁혀져서 `undefined` 체크 없이 쓸 수 있어요.

```typescript
import type { NonEmptyArray } from 'es-toolkit/types';

const a: NonEmptyArray<number> = [1, 2, 3]; // ok
const b: NonEmptyArray<number> = [1]; // ok
const c: NonEmptyArray<number> = []; // 에러: 빈 배열은 허용되지 않아요.

function first<T>(arr: NonEmptyArray<T>): T {
  // 첫 요소는 T로 좁혀지므로 undefined 체크가 필요 없어요.
  return arr[0];
}
```

#### 타입 파라미터

- `T`: 배열 요소의 타입이에요.
