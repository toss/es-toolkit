# join (함수형 프로그래밍)

배열 값을 문자열로 이어 붙이는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, join(separator));
```

::: info

이 헬퍼는 `es-toolkit/fp` 전용이에요. 이 동작을 [`pipe`](./pipe.md) 파이프라인의 한 단계로 조합하고 싶을 때 사용하세요.

:::

## 사용법

`join`은 파이프된 배열의 값을 `separator`로 이어 붙여 문자열로 바꿔요. `separator`를 생략하면 쉼표를 사용해요.

```typescript
import { join, pipe } from 'es-toolkit/fp';

pipe(['a', 'b', 'c'], join('-')); // => 'a-b-c'

pipe(['a', 'b', 'c'], join()); // => 'a,b,c'
```

#### 파라미터

- `separator` (`string, optional`): 값 사이에 넣을 문자열이에요. 기본값은 `,`예요.

#### 반환 값

(`(array: readonly T[]) => string`): `readonly T[]`를 이어 붙인 문자열로 변환하는 함수예요.
