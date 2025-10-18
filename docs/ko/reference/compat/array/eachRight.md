# eachRight (Lodash 호환성)

::: warning `es-toolkit`의 `forEachRight`을 사용하세요

이 `eachRight` 함수는 `null`이나 `undefined` 처리, `ArrayLike` 타입 처리, 다양한 조건 함수 형태 지원 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [forEachRight](../../array/forEachRight.md)을 사용하세요.

:::

배열이나 객체의 각 요소에 대해 오른쪽부터 왼쪽으로 반복 작업을 수행해요.

```typescript
const result = eachRight(collection, iteratee);
```

## 레퍼런스

### `eachRight(collection, iteratee)`

배열, 객체, 문자열의 각 요소를 오른쪽부터 왼쪽으로 순회하면서 주어진 함수를 실행해요. 배열의 경우 마지막 인덱스부터 역순으로, 객체의 경우 열거 가능한 속성들을 역순으로 순회해요.

```typescript
import { eachRight } from 'es-toolkit/compat';

// 배열 역순 순회
eachRight([1, 2, 3], (value, index) => console.log(value, index));
// 로그: 3 2, 2 1, 1 0

// 객체 역순 순회
eachRight({ a: 1, b: 2 }, (value, key) => console.log(key, value));
// 로그: 'b' 2, 'a' 1

// 문자열 역순 순회
eachRight('hello', (char, index) => console.log(char, index));
// 로그: 'o' 4, 'l' 3, 'l' 2, 'e' 1, 'h' 0
```

함수가 `false`를 반환하면 순회를 중단해요.

```typescript
import { eachRight } from 'es-toolkit/compat';

eachRight([1, 2, 3, 4], value => {
  console.log(value);
  return value !== 2; // 2에서 중단
});
// 로그: 4, 3, 2
```

#### 파라미터

- `collection` (`ArrayLike<T> | Record<any, any> | string | null | undefined`): 순회할 컬렉션이에요.
- `iteratee` (`(item: any, index: any, collection: any) => unknown`, 선택): 각 요소에 대해 실행할 함수예요. 기본값은 `identity` 함수예요.

#### 반환 값

(`ArrayLike<T> | Record<any, any> | string | null | undefined`): 원본 컬렉션을 반환해요.
