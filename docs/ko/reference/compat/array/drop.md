# drop (Lodash 호환성)

::: warning `es-toolkit`의 `drop`을 사용하세요

이 `drop` 함수는 `null`이나 `undefined` 처리, `toInteger` 변환 등으로 인해 복잡하게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [drop](../../array/drop.md)을 사용하세요.

:::

배열의 앞에서부터 지정된 개수만큼 요소들을 제거해요.

```typescript
const result = drop(array, n);
```

## 레퍼런스

### `drop(array, n?)`

배열의 처음 부분에서 몇 개의 요소를 제거하고 나머지를 얻고 싶을 때 `drop`을 사용하세요. 기본적으로 첫 번째 요소 하나를 제거해요.

```typescript
import { drop } from 'es-toolkit/compat';

// 기본 사용법 (첫 번째 요소 제거)
drop([1, 2, 3, 4, 5]);
// Returns: [2, 3, 4, 5]

// 처음 2개 요소 제거
drop([1, 2, 3, 4, 5], 2);
// Returns: [3, 4, 5]

// 처음 3개 요소 제거
drop(['a', 'b', 'c', 'd'], 3);
// Returns: ['d']
```

0이나 음수를 지정하면 원본 배열을 그대로 반환해요.

```typescript
import { drop } from 'es-toolkit/compat';

// 0개 제거
drop([1, 2, 3], 0);
// Returns: [1, 2, 3]

// 음수 지정
drop([1, 2, 3], -1);
// Returns: [1, 2, 3]
```

배열보다 큰 수를 지정하면 빈 배열을 반환해요.

```typescript
import { drop } from 'es-toolkit/compat';

// 배열 크기보다 큰 수 지정
drop([1, 2, 3], 5);
// Returns: []

// 빈 배열에서 제거
drop([], 1);
// Returns: []
```

`null`이나 `undefined` 배열은 빈 배열로 처리해요.

```typescript
import { drop } from 'es-toolkit/compat';

drop(null, 1);
// Returns: []

drop(undefined, 2);
// Returns: []
```

유사 배열 객체도 지원해요.

```typescript
import { drop } from 'es-toolkit/compat';

// 유사 배열 객체
const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
drop(arrayLike, 1);
// Returns: ['b', 'c']
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 요소를 제거할 배열이에요.
- `n` (`number`, 선택): 제거할 요소의 개수예요. 기본값은 `1`이에요.

#### 반환 값

(`T[]`): 앞에서 지정된 개수만큼 제거된 새 배열을 반환해요.
