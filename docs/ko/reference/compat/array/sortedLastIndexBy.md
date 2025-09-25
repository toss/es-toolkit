# sortedLastIndexBy (Lodash 호환성)

::: warning 이진 탐색과 변환 함수를 직접 구현하세요

이 `sortedLastIndexBy` 함수는 복잡한 iteratee 처리와 타입 변환으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 이진 탐색과 변환 함수를 직접 구현하세요.

:::

정렬된 배열에서 변환 함수를 적용한 후 값을 삽입할 가장 높은 인덱스를 찾아요.

```typescript
const index = sortedLastIndexBy(array, value, iteratee);
```

## 레퍼런스

### `sortedLastIndexBy(array, value, iteratee)`

정렬된 배열에서 변환 함수를 적용한 후 값의 가장 높은 삽입 위치를 찾을 때 `sortedLastIndexBy`를 사용하세요. 중복된 값이 있을 때 마지막 값 뒤의 인덱스를 반환해요.

```typescript
import { sortedLastIndexBy } from 'es-toolkit/compat';

// 속성으로 정렬된 객체 배열에서 마지막 삽입 위치 찾기
const objects = [{ x: 4 }, { x: 5 }, { x: 5 }];
sortedLastIndexBy(objects, { x: 5 }, 'x');
// 3을 반환해요 (마지막 x: 5 뒤의 위치)

// 함수를 사용해서 변환
const numbers = [10, 20, 20, 30];
sortedLastIndexBy(numbers, 20, n => n);
// 3을 반환해요
```

`null`이나 `undefined` 배열은 0을 반환해요.

```typescript
import { sortedLastIndexBy } from 'es-toolkit/compat';

sortedLastIndexBy(null, { x: 1 }, 'x'); // 0
sortedLastIndexBy(undefined, { x: 1 }, 'x'); // 0
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 정렬된 배열이에요. 정렬되지 않은 배열을 사용하면 잘못된 결과를 얻을 수 있어요.
- `value` (`T`): 삽입할 값이에요.
- `iteratee` (선택): 각 요소와 값에 적용할 변환 함수, 속성 이름, 또는 속성-값 배열이에요.

#### 반환 값

(`number`): 값을 삽입할 가장 높은 인덱스를 반환해요. 배열이 `null`이나 `undefined`면 0을 반환해요.
