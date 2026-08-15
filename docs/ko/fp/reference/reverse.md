# reverse (함수형 프로그래밍)

배열을 뒤집은 복사본을 반환하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, reverse());
```

::: info

이 헬퍼는 `es-toolkit/fp` 전용이에요. 이 동작을 [`pipe`](./pipe.md) 파이프라인의 한 단계로 조합하고 싶을 때 사용하세요.

:::

## 사용법

`reverse`는 파이프된 배열의 값을 역순으로 담은 새 배열을 반환해요. 입력 배열은 변경하지 않아요.

```typescript
import { pipe, reverse } from 'es-toolkit/fp';

const array = [1, 2, 3];

pipe(array, reverse()); // => [3, 2, 1]
array; // => [1, 2, 3]
```

#### 파라미터

이 함수는 인자를 받지 않아요. `reverse()`처럼 호출하세요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 뒤집은 복사본으로 변환하는 함수예요.
