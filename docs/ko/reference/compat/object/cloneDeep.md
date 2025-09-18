# cloneDeep (Lodash 호환성)

::: warning `es-toolkit`의 `cloneDeep`을 사용하세요

이 `cloneDeep` 함수는 특수한 객체 타입들을 처리하는 복잡한 로직으로 인해 상대적으로 느려요.

대신 더 빠르고 현대적인 `es-toolkit`의 [cloneDeep](../../object/cloneDeep.md)을 사용하세요.

:::

객체의 깊은 복사본을 만들어요.

```typescript
const cloned = cloneDeep(value);
```

## 레퍼런스

### `cloneDeep(value)`

값의 깊은 복사본을 만들고 싶을 때 `cloneDeep`을 사용하세요. 중첩된 객체와 배열까지 완전히 새로운 인스턴스로 복사해요.

```typescript
import { cloneDeep } from 'es-toolkit/compat';

// 원시 값 복사
const num = 42;
const clonedNum = cloneDeep(num);
// Returns: 42 (같은 값)

// 배열 깊은 복사
const arr = [1, [2, 3], { a: 4 }];
const clonedArr = cloneDeep(arr);
clonedArr[1][0] = 99;
console.log(arr[1][0]); // 2 (원본은 변경되지 않음)
console.log(clonedArr[1][0]); // 99

// 객체 깊은 복사
const obj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  }
};
const clonedObj = cloneDeep(obj);
clonedObj.b.d.e = 99;
console.log(obj.b.d.e); // 3 (원본은 변경되지 않음)
console.log(clonedObj.b.d.e); // 99

// Date 객체 깊은 복사
const date = new Date('2023-01-01');
const clonedDate = cloneDeep(date);
// Returns: new Date('2023-01-01') (새로운 Date 인스턴스)

// 복잡한 중첩 구조
const complex = {
  arr: [1, { nested: true }],
  map: new Map([['key', { value: 1 }]]),
  set: new Set([{ item: 1 }]),
  date: new Date()
};
const clonedComplex = cloneDeep(complex);
// 모든 중첩된 객체들이 완전히 새로운 인스턴스로 복사됨
```

순환 참조도 올바르게 처리해요.

```typescript
import { cloneDeep } from 'es-toolkit/compat';

const obj = { a: 1 };
obj.self = obj; // 순환 참조

const cloned = cloneDeep(obj);
console.log(cloned !== obj); // true
console.log(cloned.self === cloned); // true (순환 참조 유지)
```

#### 파라미터

- `value` (`T`): 깊은 복사할 값이에요.

### 반환 값

(`T`): 깊은 복사된 값을 반환해요.
