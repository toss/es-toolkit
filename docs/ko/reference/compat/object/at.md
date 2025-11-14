# at (Lodash 호환성)

::: warning 구조 분해 할당을 사용하세요

이 `at` 함수는 복잡한 경로 처리와 여러 형태의 인수 처리로 인해 상대적으로 느려요.

대신 구조 분해 할당이나 직접 속성 접근을 사용하세요.

:::

객체에서 지정된 경로의 값들을 배열로 반환해요.

```typescript
const result = at(object, ...paths);
```

## 사용법

### `at(object, ...paths)`

객체에서 여러 경로의 값을 한 번에 가져올 때 `at`을 사용하세요. 각 경로에 해당하는 값들을 배열로 반환해요.

```typescript
import { at } from 'es-toolkit/compat';

// 기본 사용법
const object = { a: 1, b: 2, c: 3 };
const result = at(object, 'a', 'c');
// Returns: [1, 3]

// 중첩된 객체
const nested = {
  a: {
    b: {
      c: 4,
    },
  },
  x: [1, 2, 3],
};
const result2 = at(nested, 'a.b.c', 'x[1]');
// Returns: [4, 2]

// 배열로 경로 전달
const paths = ['a', 'c'];
const result3 = at(object, paths);
// Returns: [1, 3]

// 존재하지 않는 경로
const result4 = at(object, 'nonexistent', 'a');
// Returns: [undefined, 1]
```

`null`이나 `undefined` 객체는 `undefined` 배열을 반환해요.

```typescript
import { at } from 'es-toolkit/compat';

at(null, 'a', 'b'); // [undefined, undefined]
at(undefined, 'a', 'b'); // [undefined, undefined]
```

#### 파라미터

- `object` (`T | null | undefined`): 값을 가져올 객체예요.
- `...paths` (`Array<PropertyKey | PropertyKey[] | ArrayLike<PropertyKey>>`): 가져올 값의 경로들이에요. 개별 인수로 전달하거나 배열로 전달할 수 있어요.

#### 반환 값

(`unknown[]`): 지정된 경로들에 해당하는 값들의 배열을 반환해요.
