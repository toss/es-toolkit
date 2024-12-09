# last

배열의 마지막 요소를 반환해요.

빈 배열의 경우, `undefined`를 반환해요.

## 인터페이스

```typescript
function last<T>(arr: [...T[], T]): T;
function last<T>(arr: T[]): T | undefined;
```

### 파라미터

- `arr`(`T[]`): 마지막 요소를 반환할 배열.

### 반환 값

(`T | undefined`): 배열의 마지막 요소, 빈 배열의 경우, `undefined`를 반환해요.

## 예시

```typescript
const arr1 = [1, 2, 3];
const result = last(arr1);
// result는 3이에요.

const arr2: number[] = [];
const result = last(arr2);
// result는 undefined예요.

const largeArray = Array(1000)
  .fill(0)
  .map((_, i) => i);
const result = last(largeArray);
// result는 999에요.

const nestedArray = [
  [3, 1],
  [3, 2],
  [3, 3],
];
const result = last(nestedArray);
// result는 [3,3]이에요.
```
