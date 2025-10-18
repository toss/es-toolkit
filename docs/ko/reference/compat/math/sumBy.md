# sumBy (Lodash 호환성)

::: warning es-toolkit의 [sumBy](../../math/sumBy.md)를 사용하세요

이 `sumBy` 함수는 iteratee 함수 처리와 타입 변환으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [sumBy](../../math/sumBy.md)를 사용하세요.

:::

조건에 맞는 값들을 더해요.

```typescript
const total = sumBy(array, iteratee);
```

## 레퍼런스

### `sumBy(array, iteratee)`

배열의 각 요소에 함수를 적용한 결과를 더해요.

```typescript
import { sumBy } from 'es-toolkit/compat';

// 숫자 배열
sumBy([1, 2, 3], value => value);
// Returns: 6

sumBy([1.5, 2.5, 3.5], value => Math.floor(value));
// Returns: 6 (1 + 2 + 3)

// 빈 배열
sumBy([], value => value);
// Returns: 0
```

### `sumBy(array)`

함수를 주지 않으면 배열 값을 그대로 더해요.

```typescript
import { sumBy } from 'es-toolkit/compat';

sumBy([1, 2, 3]);
// Returns: 6

sumBy([1n, 2n, 3n]);
// Returns: 6n
```

객체 배열에서 특정 속성을 더해요.

```typescript
import { sumBy } from 'es-toolkit/compat';

const people = [
  { name: '홍길동', age: 25 },
  { name: '김철수', age: 30 },
  { name: '이영희', age: 35 },
];

sumBy(people, person => person.age);
// Returns: 90

// 속성명으로도 가능
sumBy(people, 'age');
// Returns: 90
```

문자열도 연결해요.

```typescript
import { sumBy } from 'es-toolkit/compat';

const items = [{ a: '1' }, { a: '2' }];
sumBy(items, obj => obj.a);
// Returns: '12'
```

잘못된 값들은 무시해요.

```typescript
import { sumBy } from 'es-toolkit/compat';

sumBy([1, undefined, 2], value => value);
// Returns: 3 (undefined 무시)

sumBy(null);
// Returns: 0

sumBy(undefined);
// Returns: 0
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 처리할 배열이에요.
- `iteratee` (`((value: T) => number) | string`, 선택): 각 요소에 적용할 함수나 속성명이에요.

#### 반환 값

(`number`): 조건에 맞는 값들을 더한 총합을 반환해요.
