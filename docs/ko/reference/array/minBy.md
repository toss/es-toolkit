# minBy

변환 함수가 반환하는 값을 기준으로, 배열에서 최솟값을 가지는 요소를 반환해요.

```typescript
const min = minBy(items, getValue);
```

## 레퍼런스

### `minBy(items, getValue)`

배열의 요소들을 변환 함수로 숫자 값으로 바꾸고, 가장 작은 값을 가진 원본 요소를 찾고 싶을 때 `minBy`를 사용하세요. 빈 배열에서는 `undefined`를 반환해요.

```typescript
import { minBy } from 'es-toolkit/array';

// 객체 배열에서 특정 속성의 최솟값을 가진 요소를 찾아요.
const people = [
  { name: 'john', age: 30 },
  { name: 'jane', age: 28 },
  { name: 'joe', age: 26 }
];
minBy(people, person => person.age);
// Returns: { name: 'joe', age: 26 }

// 숫자 배열에서 절댓값이 가장 작은 요소를 찾아요.
const numbers = [-10, -5, 0, 5, 15];
minBy(numbers, x => Math.abs(x));
// Returns: 0
```

빈 배열에서는 `undefined`를 반환해요.

```typescript
import { minBy } from 'es-toolkit/array';

minBy([], x => x.value); // undefined
```

#### 파라미터

- `items` (`T[]`): 최솟값을 가지는 요소를 찾을 배열이에요.
- `getValue` (`(element: T) => number`): 각 요소를 숫자로 변환하는 함수예요.

#### 반환 값

(`T | undefined`): 변환 함수가 반환한 값 중 가장 작은 값을 가진 요소예요. 배열이 비어 있다면 `undefined`를 반환해요.