# take

배열의 처음 `count`개 요소를 반환하는, 데이터를 마지막에 받는 연산자를 만들어요.

```typescript
const result = pipe(array, take(count));
```

## 사용법

`take`는 처음 `count`개 요소를 반환해요. `count`가 배열 길이보다 크면 배열 전체를 반환해요. `count`가 음이 아닌 정수일 때는 **지연 평가가 가능해요**. [`pipe`](/ko/fp/reference/pipe) 안에서는 `count`개 요소가 모이는 즉시 순회를 끝내기 때문에, 앞에 오는 지연 연산자들은 나머지 입력을 절대 처리하지 않아요.

```typescript
import { map, pipe, take } from 'es-toolkit/fp';

pipe([1, 2, 3, 4, 5], take(3)); // => [1, 2, 3]

// `count`가 길이보다 크면 배열 전체를 반환해요.
pipe([1, 2, 3], take(5)); // => [1, 2, 3]

// 일찍 종료해요. `map`은 세 번만 실행돼요.
pipe([1, 2, 3, 4, 5], map(expensiveTransform), take(3));
```

#### 파라미터

- `count` (`number`): 배열 앞쪽에서 가져올 요소의 개수예요. `count`가 음수이면 `es-toolkit`의 `take`를 따라서, 대신 끝쪽에서 요소를 버려요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 최대 `count`개의 요소를 가진 새로운 `T[]`로 변환하는, 데이터를 마지막에 받는 연산자예요.
