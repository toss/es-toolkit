# meanBy (Lodash 호환성)

::: warning `reduce()`를 사용하세요

이 `meanBy` 함수는 iteratee 함수 처리와 타입 변환으로 인해 느리게 동작해요.

대신 직접 계산하세요: `array.reduce((sum, item) => sum + fn(item), 0) / array.length`

:::

조건에 맞는 값들의 평균을 구해요.

```typescript
const average = meanBy(array, iteratee);
```

## 레퍼런스

### `meanBy(array, iteratee)`

배열의 각 요소에 함수를 적용한 결과의 평균을 계산해요.

```typescript
import { meanBy } from 'es-toolkit/compat';

// 객체 배열에서 특정 속성의 평균
const people = [
  { name: '홍길동', age: 25 },
  { name: '김철수', age: 30 },
  { name: '이영희', age: 35 }
];

meanBy(people, person => person.age);
// Returns: 30

// 속성명으로도 가능
meanBy(people, 'age');
// Returns: 30
```

함수로 값을 변환해서 평균을 구해요.

```typescript
import { meanBy } from 'es-toolkit/compat';

const numbers = [1.5, 2.7, 3.2, 4.8];
meanBy(numbers, x => Math.floor(x));
// Returns: 2.5 (1 + 2 + 3 + 4) / 4

const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
meanBy(items, x => x.a);
// Returns: 2
```

배열 요소로 접근해요.

```typescript
import { meanBy } from 'es-toolkit/compat';

const arrays = [[2], [3], [1]];
meanBy(arrays, 0);  // 첫 번째 요소들의 평균
// Returns: 2
```

객체의 특정 속성과 값이 일치하는 경우만 계산해요.

```typescript
import { meanBy } from 'es-toolkit/compat';

const users = [
  { name: '홍길동', age: 25, active: true },
  { name: '김철수', age: 30, active: false },
  { name: '이영희', age: 35, active: true }
];

// active가 true인 사람들만
meanBy(users, { active: true });
// Returns: 30 (25 + 35) / 2
```

빈 배열은 NaN을 반환해요.

```typescript
import { meanBy } from 'es-toolkit/compat';

meanBy([], x => x.a);
// Returns: NaN

meanBy(null);
// Returns: NaN

meanBy(undefined);
// Returns: NaN
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 처리할 배열이에요.
- `iteratee` (`ValueIteratee<T>`, 선택): 각 요소에 적용할 함수, 속성명, 또는 조건이에요.

### 반환 값

(`number`): 조건에 맞는 값들의 평균을 반환해요. 빈 배열이면 `NaN`을 반환해요.