# invokeMap (Lodash 호환성)

::: warning `Array.map`과 `Object.values(...).map`를 사용하세요

이 `invokeMap` 함수는 `null`이나 `undefined` 처리, 메서드 탐색 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Array.map`과 `Object.values(...).map`를 사용하세요.

예를 들어, `invokeMap([1, 2, 3], 'toString')` 은 `[1, 2, 3].map(x => x.toString())`처럼 쓸 수 있어요.

:::

배열이나 객체의 각 요소에서 지정한 메서드를 호출하고, 결과를 배열로 반환해요.

```typescript
const result = invokeMap(collection, method, ...args);
```

## 레퍼런스

### `invokeMap(collection, method, ...args)`

배열이나 객체의 각 요소에서 지정한 메서드를 호출해요. 메서드 이름을 문자열로 전달하거나 직접 함수를 전달할 수 있어요. 추가 인자들은 각 메서드 호출 시 전달돼요.

```typescript
import { invokeMap } from 'es-toolkit/compat';

// 배열의 각 요소에서 메서드 호출하기
invokeMap(
  [
    [5, 1, 7],
    [3, 2, 1],
  ],
  'sort'
);
// => [[5, 1, 7].sort(), [3, 2, 1].sort()]
// => [[1, 5, 7], [1, 2, 3]]

// 인자와 함께 메서드 호출하기
invokeMap([123, 456], 'toString', 2);
// => [(123).toString(2), (456).toString(2)]
// => ['1111011', '111001000']

// 함수를 직접 전달하기
invokeMap(['a', 'b', 'c'], String.prototype.toUpperCase);
// => [String.prototype.toUpperCase('a'), String.prototype.toUpperCase('b'), String.prototype.toUpperCase('c')]
// => ['A', 'B', 'C']
```

객체의 경우 각 값에서 메서드를 호출해요.

```typescript
import { invokeMap } from 'es-toolkit/compat';

const obj = { a: 1.1, b: 2.2, c: 3.3 };
invokeMap(obj, 'toFixed', 1);
// => ['1.1', '2.2', '3.3']
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { invokeMap } from 'es-toolkit/compat';

invokeMap(null, 'toString'); // []
invokeMap(undefined, 'toString'); // []
```

#### 파라미터

- `collection` (`ArrayLike<T> | Record<string, T> | null | undefined`): 메서드를 호출할 배열이나 객체예요.
- `method` (`string | ((...args: any[]) => R)`): 호출할 메서드 이름이나 함수예요.
- `...args` (`any[]`): 각 메서드 호출 시 전달할 추가 인자들이에요.

#### 반환 값

(`Array<R | undefined>`): 각 메서드 호출 결과를 담은 새로운 배열을 반환해요.
