# forEach (Lodash 호환성)

::: warning `Array.prototype.forEach()`를 사용하세요

이 `forEach` 함수는 복잡한 객체 처리, 조기 종료 로직 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Array.prototype.forEach()`를 사용하세요.

:::

배열이나 객체의 각 요소에 대해 함수를 실행해요.

```typescript
forEach(collection, callback);
```

## 레퍼런스

### `forEach(collection, callback)`

배열이나 객체의 모든 요소를 순회하면서 각 요소에 대해 콜백 함수를 실행하고 싶을 때 `forEach`를 사용하세요. 콜백이 `false`를 반환하면 순회를 중단해요.

```typescript
import { forEach } from 'es-toolkit/compat';

// 배열 순회
const numbers = [1, 2, 3, 4, 5];
const results: number[] = [];

forEach(numbers, value => {
  results.push(value * 2);
});
// results는 [2, 4, 6, 8, 10]

// 조기 종료
const numbers2 = [1, 2, 3, 4, 5];
const results2: number[] = [];

forEach(numbers2, value => {
  if (value > 3) {
    return false; // 순회 중단
  }
  results2.push(value);
});
// results2는 [1, 2, 3]
```

객체에 대해서도 동일하게 동작해요.

```typescript
import { forEach } from 'es-toolkit/compat';

const obj = { a: 1, b: 2, c: 3 };
const keys: string[] = [];
const values: number[] = [];

forEach(obj, (value, key) => {
  keys.push(key);
  values.push(value);
});
// keys는 ['a', 'b', 'c']
// values는 [1, 2, 3]
```

`null`이나 `undefined`는 빈 컬렉션으로 처리해요.

```typescript
import { forEach } from 'es-toolkit/compat';

forEach(null, value => {
  console.log(value); // 실행되지 않음
});

forEach(undefined, value => {
  console.log(value); // 실행되지 않음
});
```

#### 파라미터

- `collection` (`ArrayLike<T> | Record<string, unknown> | null | undefined`): 순회할 배열이나 객체예요.
- `callback` (`(value: T, index: number | string, collection: any) => void | false`): 각 요소에 대해 실행할 함수예요. `false`를 반환하면 순회를 중단해요.

#### 반환 값

(`T`): 순회한 원본 컬렉션을 반환해요.
