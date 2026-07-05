# zipObject (함수형 프로그래밍)

키와 값으로 객체를 만드는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, zipObject(values));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`zipObject`](../../reference/array/zipObject.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`zipObject`는 파이프된 배열을 키로 사용하고, 각 키를 `values`의 같은 인덱스 값과 짝지어요.

```typescript
import { pipe, zipObject } from 'es-toolkit/fp';

pipe(['a', 'b'] as const, zipObject([1, 2])); // => { a: 1, b: 2 }
```

#### 파라미터

- `values` (`readonly V[]`): 파이프된 배열의 키에 인덱스별로 할당할 값들이에요.

#### 반환 값

(`(keys: readonly P[]) => Record<P, V>`): 키 배열을 `values`로 만든 객체로 변환하는 함수예요.
