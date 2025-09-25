# forEachRight (Lodash 호환성)

::: warning `es-toolkit`의 `forEachRight`을 사용하세요

이 `forEachRight` 함수는 `null`이나 `undefined` 처리, `ArrayLike` 타입 처리, 다양한 조건 함수 형태 지원 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [forEachRight](../../array/forEachRight.md)을 사용하세요.

:::

배열이나 객체의 요소들을 오른쪽에서 왼쪽으로 순회하면서 각 요소에 대해 함수를 실행해요.

```typescript
const result = forEachRight(collection, callback);
```

## 레퍼런스

### `forEachRight(collection, callback)`

배열, 객체, 문자열을 오른쪽에서 왼쪽 순서로 순회하면서 각 요소에 대해 콜백 함수를 실행해요. 콜백이 `false`를 반환하면 순회를 중단해요.

```typescript
import { forEachRight } from 'es-toolkit/compat';

// 배열을 역순으로 순회해요
forEachRight([1, 2, 3], (value, index) => {
  console.log(value, index);
});
// 출력: 3 2, 2 1, 1 0

// 문자열을 역순으로 순회해요
forEachRight('abc', (char, index) => {
  console.log(char, index);
});
// 출력: 'c' 2, 'b' 1, 'a' 0

// 객체를 역순으로 순회해요
forEachRight({ a: 1, b: 2, c: 3 }, (value, key) => {
  console.log(value, key);
});
// 출력: 3 'c', 2 'b', 1 'a'
```

`null`이나 `undefined`는 그대로 반환해요.

```typescript
import { forEachRight } from 'es-toolkit/compat';

forEachRight(null, value => console.log(value)); // null
forEachRight(undefined, value => console.log(value)); // undefined
```

콜백이 `false`를 반환하면 순회를 중단해요.

```typescript
import { forEachRight } from 'es-toolkit/compat';

forEachRight([1, 2, 3, 4], value => {
  console.log(value);
  if (value === 2) {
    return false; // 순회 중단
  }
});
// 출력: 4, 3, 2
```

#### 파라미터

- `collection` (`ArrayLike<T> | Record<any, any> | string | null | undefined`): 순회할 컬렉션이에요. 배열, 객체, 문자열, 또는 null/undefined일 수 있어요.
- `callback` (`(item: any, index: any, arr: any) => unknown`, 선택): 각 요소에 대해 실행할 함수예요. `false`를 반환하면 순회를 중단해요. 기본값은 `identity` 함수예요.

### 반환 값

(`ArrayLike<T> | Record<any, any> | string | null | undefined`): 원본 컬렉션을 그대로 반환해요.
