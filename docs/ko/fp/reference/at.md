# at (함수형 프로그래밍)

주어진 인덱스에 있는 값을 반환하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, at(indices));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`at`](../../reference/array/at.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`at`는 `indices`의 각 인덱스에 있는 값을 파이프된 배열에서 읽어요. 음수 인덱스는 `Array.prototype.at`처럼 배열 끝에서부터 세요.

```typescript
import { at, pipe } from 'es-toolkit/fp';

pipe(['a', 'b', 'c'], at([0, -1])); // => ['a', 'c']
```

#### 파라미터

- `indices` (`number[]`): 파이프된 배열에서 읽을 인덱스들이에요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 선택된 값 배열로 변환하는 함수예요.
