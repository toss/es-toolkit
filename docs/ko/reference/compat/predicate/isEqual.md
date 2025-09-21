# isEqual (Lodash 호환성)

::: warning `es-toolkit`의 [isEqual](../../predicate/isEqual.md)를 사용하세요
이 `isEqual` 함수는 Lodash 호환성을 위한 복잡한 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [isEqual](../../predicate/isEqual.md)를 사용하세요.
:::

두 값이 같은지 깊이 비교해서 확인해요.

```typescript
const result = isEqual(value1, value2);
```

## 레퍼런스

### `isEqual(a, b)`

두 값이 같은지 깊이 비교해서 확인하고 싶을 때 `isEqual`를 사용하세요. Date, RegExp, 객체, 배열 등 복잡한 타입도 내용까지 비교해요.

```typescript
import { isEqual } from 'es-toolkit/compat';

// 기본 타입 비교
isEqual(1, 1); // true
isEqual('hello', 'hello'); // true
isEqual(true, true); // true

// 객체 깊이 비교
isEqual({ a: 1, b: 2 }, { a: 1, b: 2 }); // true
isEqual({ a: 1, b: 2 }, { b: 2, a: 1 }); // true
isEqual({ a: 1 }, { a: 1, b: undefined }); // false

// 배열 깊이 비교
isEqual([1, 2, 3], [1, 2, 3]); // true
isEqual([1, [2, 3]], [1, [2, 3]]); // true

// Date 객체 비교
isEqual(new Date('2020-01-01'), new Date('2020-01-01')); // true
isEqual(new Date('2020-01-01'), new Date('2020-01-02')); // false

// RegExp 객체 비교
isEqual(/abc/g, /abc/g); // true
isEqual(/abc/g, /abc/i); // false
```

중첩된 객체나 배열도 재귀적으로 비교해요.

```typescript
import { isEqual } from 'es-toolkit/compat';

const obj1 = {
  user: {
    name: 'John',
    details: {
      age: 30,
      hobbies: ['reading', 'gaming'],
    },
  },
};

const obj2 = {
  user: {
    name: 'John',
    details: {
      age: 30,
      hobbies: ['reading', 'gaming'],
    },
  },
};

isEqual(obj1, obj2); // true
```

#### 파라미터

- `a` (`unknown`): 비교할 첫 번째 값이에요.
- `b` (`unknown`): 비교할 두 번째 값이에요.

### 반환 값

(`boolean`): 두 값이 같으면 `true`, 다르면 `false`를 반환해요.
