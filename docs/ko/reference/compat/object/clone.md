# clone (Lodash 호환성)

::: warning `es-toolkit`의 `clone`을 사용하세요

이 `clone` 함수는 특수한 객체 타입들을 처리하는 복잡한 로직으로 인해 상대적으로 느려요.

대신 더 빠르고 현대적인 `es-toolkit`의 [clone](../../object/clone.md)을 사용하세요.

:::

객체의 얕은 복사본을 만들어요.

```typescript
const cloned = clone(value);
```

## 레퍼런스

### `clone(value)`

값의 얕은 복사본을 만들고 싶을 때 `clone`을 사용하세요. 다양한 타입의 객체와 원시값을 복사할 수 있어요.

```typescript
import { clone } from 'es-toolkit/compat';

// 원시 값 복사
const num = 42;
const clonedNum = clone(num);
// Returns: 42 (같은 값)

// 배열 복사
const arr = [1, 2, 3];
const clonedArr = clone(arr);
// Returns: [1, 2, 3] (새로운 배열 인스턴스)

// 객체 복사
const obj = { a: 1, b: 'hello' };
const clonedObj = clone(obj);
// Returns: { a: 1, b: 'hello' } (새로운 객체 인스턴스)

// Date 객체 복사
const date = new Date('2023-01-01');
const clonedDate = clone(date);
// Returns: new Date('2023-01-01') (새로운 Date 인스턴스)

// 정규 표현식 복사
const regex = /hello/gi;
regex.lastIndex = 3;
const clonedRegex = clone(regex);
// Returns: /hello/gi with lastIndex = 3

// Map 복사
const map = new Map([['a', 1], ['b', 2]]);
const clonedMap = clone(map);
// Returns: new Map([['a', 1], ['b', 2]])

// Set 복사
const set = new Set([1, 2, 3]);
const clonedSet = clone(set);
// Returns: new Set([1, 2, 3])
```

중첩된 객체는 얕은 복사만 수행해요.

```typescript
import { clone } from 'es-toolkit/compat';

const nested = { 
  a: 1, 
  b: { 
    c: 2 
  } 
};
const clonedNested = clone(nested);

console.log(clonedNested !== nested); // true (다른 객체)
console.log(clonedNested.b === nested.b); // true (중첩 객체는 같은 참조)
```

#### 파라미터

- `value` (`T`): 복사할 값이에요.

### 반환 값

(`T`): 복사된 값을 반환해요.
