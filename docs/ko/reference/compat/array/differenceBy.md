# differenceBy (Lodash 호환성)

::: warning `es-toolkit`의 `differenceBy`를 사용하세요

이 `differenceBy` 함수는 복잡한 인자 처리와 반복자 변환으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [differenceBy](../../array/differenceBy.md)를 사용하세요.

:::

반복자 함수로 변환한 값들을 기준으로 첫 번째 배열에서 다른 배열들의 요소를 제외한 차집합을 구해요.

```typescript
const result = differenceBy(array, ...values, iteratee);
```

## 레퍼런스

### `differenceBy(array, ...values, iteratee)`

첫 번째 배열의 각 요소와 제외할 배열들의 요소들을 반복자 함수로 변환한 후, 같은 값이 나오는 요소들을 제거하고 싶을 때 `differenceBy`를 사용하세요. 객체 배열에서 특정 프로퍼티 값이나 변환된 값을 기준으로 비교할 때 유용해요.

```typescript
import { differenceBy } from 'es-toolkit/compat';

// 소수점 버림으로 비교
differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
// Returns: [1.2] (Math.floor(2.1) === Math.floor(2.3)이므로 2.1 제외)

// 문자열 길이로 비교
differenceBy(['one', 'two', 'three'], ['four', 'five'], 'length');
// Returns: ['one', 'two'] (length가 4, 5인 것들 제외, three도 length가 5라 제외)

// 객체의 프로퍼티로 비교
const users1 = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const users2 = [{ id: 1, name: 'Different Alice' }];
differenceBy(users1, users2, 'id');
// Returns: [{ id: 2, name: 'Bob' }] (id가 1인 객체 제외)
```

여러 배열을 한 번에 제외할 수 있어요.

```typescript
import { differenceBy } from 'es-toolkit/compat';

// 여러 배열에서 제외
differenceBy([2.1, 1.2, 3.5], [2.3], [1.4], [3.2], Math.floor);
// Returns: [] (모든 요소가 제외됨)

// 문자열 배열에서 길이로 비교
differenceBy(['a', 'bb', 'ccc'], ['x'], ['yy'], ['zzz'], 'length');
// Returns: [] (길이 1, 2, 3 모두 제외됨)
```

반복자 함수가 없으면 일반 `difference`처럼 동작해요.

```typescript
import { differenceBy } from 'es-toolkit/compat';

// 반복자 함수 없이 사용
differenceBy([1, 2, 3], [2, 4]);
// Returns: [1, 3]
```

`null`이나 `undefined` 배열은 빈 배열로 처리해요.

```typescript
import { differenceBy } from 'es-toolkit/compat';

differenceBy(null, [1, 2], Math.floor);
// Returns: []

differenceBy(undefined, [1, 2], x => x);
// Returns: []
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 차집합을 구할 기준 배열이에요.
- `values` (`...ArrayLike<T>[]`): 제외할 값들을 포함한 배열들이에요.
- `iteratee` (`ValueIteratee<T>`): 각 요소를 비교할 값으로 변환하는 함수예요. 함수, 프로퍼티 이름, 또는 부분 객체를 사용할 수 있어요.

#### 반환 값

(`T[]`): 반복자 함수로 변환한 값들을 기준으로 제외된 요소들을 뺀 새 배열을 반환해요.
