# chunk

배열을 주어진 길이의 하위 배열로 나누는, 데이터를 마지막에 받는 연산자를 만들어요.

```typescript
const result = pipe(array, chunk(size));
```

## 사용법

`chunk`는 배열을 각각 길이가 `size`인 하위 배열로 나눠요. 배열을 균등하게 나눌 수 없을 때는, 마지막 청크에 남은 요소들이 담겨요.

```typescript
import { chunk, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 4, 5], chunk(2)); // => [[1, 2], [3, 4], [5]]

// `size`가 배열보다 크면 청크 하나가 만들어져요.
pipe([1, 2, 3], chunk(10)); // => [[1, 2, 3]]
```

#### 파라미터

- `size` (`number`): 각 청크의 길이예요. 양의 정수여야 해요.

#### 반환 값

(`(array: readonly T[]) => T[][]`): `readonly T[]`를 청크 배열로 변환하는, 데이터를 마지막에 받는 연산자예요.

#### 에러

`size`가 양의 정수가 아니면 에러를 던져요.
