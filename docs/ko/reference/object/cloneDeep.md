# cloneDeep

주어진 객체을 깊이 복사해요.

## 인터페이스

```typescript
function cloneDeep<T>(obj: T): T;
```

### 파라미터

- `obj` (`T`): 복사할 객체.

### 반환 값

(`T`): 주어진 객체의 깊은 복사본.

## 예시

```typescript
const num = 29;
const clonedNum = cloneDeep(num);
console.log(clonedNum); // 29
console.log(clonedNum === num); // true

const arr = [1, 2, 3];
const clonedArr = cloneDeep(arr);
console.log(clonedArr); // [1, 2, 3]
console.log(clonedArr === arr); // false

const obj = { a: 1, b: 'es-toolkit', c: [1, 2, 3] };
const clonedObj = cloneDeep(obj);
console.log(clonedObj); // { a: 1, b: 'es-toolkit', c: [1, 2, 3] }
console.log(clonedObj === obj); // false

// Nested objects and arrays
const nestedObj = { a: { b: { c: 'deep' } }, d: [1, 2, { e: 'nested' }] };
const clonedNestedObj = cloneDeep(nestedObj);
console.log(clonedNestedObj); // { a: { b: { c: 'deep' } }, d: [1, 2, { e: 'nested' }] }
console.log(clonedNestedObj === nestedObj); // false
console.log(clonedNestedObj.a === nestedObj.a); // false
console.log(clonedNestedObj.d === nestedObj.d); // false
console.log(clonedNestedObj.d[2] === nestedObj.d[2]); // false
```

### 읽기 전용 프로퍼티

접근자(getter)로 정의된 읽기 전용 프로퍼티가 있는 객체를 깊은 복사하면, 새로 복사된 객체는 접근자의 반환 값을 값으로 가져요.

```tsx
const source = {
  get value() {
    return 3;
  },
};

const cloned = cloneDeep(source);
// cloned is now { value: 3 }
```

## 데모

::: sandpack

```ts index.ts
import { cloneDeep } from 'es-toolkit/object';

const original = { a: { b: { c: 'deep' } }, d: [1, 2, { e: 'nested' }] };
const cloned = cloneDeep(original);

console.log(cloned);
console.log(original !== cloned);
```

:::
