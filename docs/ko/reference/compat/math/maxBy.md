# maxBy (Lodash 호환성)

::: warning `reduce()`를 사용하세요

이 `maxBy` 함수는 iteratee 함수 처리와 타입 변환으로 인해 느리게 동작해요.

대신 직접 계산하세요: `array.reduce((max, item) => fn(item) > fn(max) ? item : max)`

:::

조건에 맞는 값 중에서 최댓값 요소를 찾아요.

```typescript
const maxItem = maxBy(array, iteratee);
```

## 레퍼런스

### `maxBy(array, iteratee)`

배열에서 함수로 계산한 값이 가장 큰 요소를 찾아요.

```typescript
import { maxBy } from 'es-toolkit/compat';

// 객체 배열에서 특정 속성이 최대인 요소
const people = [
  { name: '홍길동', age: 25 },
  { name: '김철수', age: 30 },
  { name: '이영희', age: 35 }
];

maxBy(people, person => person.age);
// Returns: { name: '이영희', age: 35 }

// 속성명으로도 가능
maxBy(people, 'age');
// Returns: { name: '이영희', age: 35 }
```

함수로 값을 변환해서 최댓값을 찾아요.

```typescript
import { maxBy } from 'es-toolkit/compat';

const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
maxBy(items, x => x.a);
// Returns: { a: 3 }

const numbers = [-1, -2, -3];
maxBy(numbers, x => Math.abs(x));
// Returns: -3 (절댓값이 가장 큰 요소)
```

배열 요소로 접근해요.

```typescript
import { maxBy } from 'es-toolkit/compat';

const arrays = [[1, 2], [3, 4], [0, 5]];
maxBy(arrays, 0);  // 첫 번째 요소가 최대인 배열
// Returns: [3, 4]

maxBy(arrays, 1);  // 두 번째 요소가 최대인 배열
// Returns: [0, 5]
```

객체의 특정 속성과 값이 일치하는 경우를 찾아요.

```typescript
import { maxBy } from 'es-toolkit/compat';

const users = [
  { name: '홍길동', age: 25, active: true },
  { name: '김철수', age: 30, active: false },
  { name: '이영희', age: 35, active: true }
];

// active가 true인 요소들 중에서 첫 번째
maxBy(users, ['active', true]);
// Returns: { name: '홍길동', age: 25, active: true }

// 객체로 조건 지정
maxBy(users, { active: true });
// Returns: { name: '홍길동', age: 25, active: true }
```

빈 배열은 undefined를 반환해요.

```typescript
import { maxBy } from 'es-toolkit/compat';

maxBy([], x => x.a);
// Returns: undefined

maxBy(null);
// Returns: undefined

maxBy(undefined);
// Returns: undefined
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 검색할 배열이에요.
- `iteratee` (`ValueIteratee<T>`, 선택): 각 요소에 적용할 함수, 속성명, 또는 조건이에요.

### 반환 값

(`T | undefined`): 조건에 맞는 값이 가장 큰 요소를 반환해요. 빈 배열이면 `undefined`를 반환해요.