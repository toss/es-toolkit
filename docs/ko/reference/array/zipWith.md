# zipWith

여러 배열을 사용자 정의 함수로 결합해서 새 배열을 만들어요.

```typescript
const result = zipWith(...arrs, combine);
```

## 사용법

### `zipWith(...arrs, combine)`

여러 배열의 같은 위치 요소들을 원하는 방식으로 결합하고 싶을 때 `zipWith`를 사용하세요. 각 배열의 같은 인덱스 요소들을 결합 함수에 전달해서, 그 결과로 새 배열을 만들어요.

```typescript
import { zipWith } from 'es-toolkit/array';

// 두 숫자 배열을 더해요.
zipWith([1, 2, 3], [4, 5, 6], (a, b) => a + b);
// Returns: [5, 7, 9]

// 문자열을 결합해요.
zipWith(['a', 'b'], ['c', 'd'], ['e', 'f'], (a, b, c) => `${a}${b}${c}`);
// Returns: ['ace', 'bdf']
```

배열의 길이가 다르면 가장 긴 배열의 길이에 맞춰져요. 짧은 배열의 빈 자리는 `undefined`로 전달돼요.

```typescript
import { zipWith } from 'es-toolkit/array';

zipWith([1, 2], [10, 20, 30], (a, b) => (a ?? 0) + (b ?? 0));
// Returns: [11, 22, 30]
```

#### 파라미터

- `arrs` (`Array<readonly T[]>`): 결합할 배열들이에요.
- `combine` (`(...items: [...T[], number]) => R`): 각 배열의 해당 인덱스 요소들과 인덱스 자체를 받아서 새 값을 반환하는 함수예요.

#### 반환 값

(`R[]`): 결합 함수를 적용한 결과로 구성된 새 배열을 반환해요.
