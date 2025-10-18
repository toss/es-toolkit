# each (Lodash 호환성)

::: warning `Array.prototype.forEach`를 사용하세요

이 `each` 함수는 복잡한 타입 처리와 다양한 컬렉션 타입 지원으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Array.prototype.forEach`를 사용하세요.

:::

배열이나 객체의 각 요소에 대해 반복 작업을 수행해요.

```typescript
const result = each(collection, iteratee);
```

## 레퍼런스

### `each(collection, iteratee)`

배열, 객체, 문자열의 각 요소를 순회하면서 주어진 함수를 실행해요. 배열의 경우 인덱스 순서대로, 객체의 경우 열거 가능한 속성들을 순회해요.

```typescript
import { each } from 'es-toolkit/compat';

// 배열 순회
each([1, 2, 3], (value, index) => console.log(value, index));
// 로그: 1 0, 2 1, 3 2

// 객체 순회
each({ a: 1, b: 2 }, (value, key) => console.log(key, value));
// 로그: 'a' 1, 'b' 2

// 문자열 순회
each('hello', (char, index) => console.log(char, index));
// 로그: 'h' 0, 'e' 1, 'l' 2, 'l' 3, 'o' 4
```

함수가 `false`를 반환하면 순회를 중단해요.

```typescript
import { each } from 'es-toolkit/compat';

each([1, 2, 3, 4], value => {
  console.log(value);
  return value !== 2; // 2에서 중단
});
// 로그: 1, 2
```

#### 파라미터

- `collection` (`ArrayLike<T> | Record<any, any> | string | null | undefined`): 순회할 컬렉션이에요.
- `iteratee` (`(item: any, index: any, collection: any) => unknown`, 선택): 각 요소에 대해 실행할 함수예요. 기본값은 `identity` 함수예요.

#### 반환 값

(`ArrayLike<T> | Record<any, any> | string | null | undefined`): 원본 컬렉션을 반환해요.
