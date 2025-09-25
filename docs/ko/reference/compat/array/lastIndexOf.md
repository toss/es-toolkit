# lastIndexOf (Lodash 호환성)

::: warning `Array.lastIndexOf`를 사용하세요

이 `lastIndexOf` 함수는 `null`이나 `undefined` 처리, `NaN` 값 탐색 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Array.lastIndexOf`를 사용하세요.

:::

배열에서 지정한 요소가 마지막으로 나타나는 인덱스를 찾아요.

```typescript
const index = lastIndexOf(array, searchElement, fromIndex);
```

## 레퍼런스

### `lastIndexOf(array, searchElement, fromIndex)`

배열에서 지정한 요소가 마지막으로 나타나는 인덱스를 반환해요. 네이티브 `Array.lastIndexOf`와 비슷하지만 `NaN` 값도 찾을 수 있어요.

```typescript
import { lastIndexOf } from 'es-toolkit/compat';

// 일반적인 사용
lastIndexOf([1, 2, 1, 2], 2);
// => 3

// 시작 인덱스 지정하기
lastIndexOf([1, 2, 1, 2], 2, 2);
// => 1

// NaN 값 찾기 (네이티브 lastIndexOf는 NaN을 찾을 수 없어요)
lastIndexOf([1, 2, NaN, 4, NaN], NaN);
// => 4

// 음수 인덱스 사용하기
lastIndexOf([1, 2, 3, 4], 3, -2);
// => 2
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { lastIndexOf } from 'es-toolkit/compat';

lastIndexOf(null, 1); // -1
lastIndexOf(undefined, 1); // -1
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 검색할 배열이에요.
- `searchElement` (`T`): 찾을 요소예요.
- `fromIndex` (`true | number`, 선택): 검색을 시작할 인덱스예요. `true`를 전달하면 배열 끝부터 검색해요. 기본값은 `array.length - 1`이에요.

#### 반환 값

(`number`): 마지막으로 일치하는 요소의 인덱스를 반환해요. 찾을 수 없으면 `-1`을 반환해요.
