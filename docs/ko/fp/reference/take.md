# take (함수형 프로그래밍)

배열의 처음 `count`개 요소를 반환하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, take(count));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`take`](../../reference/array/take.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`take`는 처음 `count`개 요소를 반환해요. `count`가 배열 길이보다 크면 배열 전체를 반환해요. `count`가 0 이상의 정수일 때는 **지연 평가가 가능해요**. [`pipe`](./pipe.md) 안에서는 `count`개 요소가 모이는 즉시 순회를 끝내기 때문에, 앞에 오는 지연 연산들은 나머지 입력을 처리하지 않아요.

```typescript
import { map, pipe, take } from 'es-toolkit/fp';

pipe([1, 2, 3, 4, 5], take(3)); // => [1, 2, 3]

// `count`가 길이보다 크면 배열 전체를 반환해요.
pipe([1, 2, 3], take(5)); // => [1, 2, 3]

// 일찍 멈춰요. `map`은 세 번만 실행돼요.
pipe([1, 2, 3, 4, 5], map(expensiveTransform), take(3));
```

#### 파라미터

- `count` (`number`): 배열 앞쪽에서 가져올 요소의 개수예요. `count`가 음수이면 `es-toolkit`의 `take`를 따라서 대신 뒤쪽에서 제거해요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 최대 `count`개 요소를 가진 새로운 `T[]`로 변환하는 함수예요.
