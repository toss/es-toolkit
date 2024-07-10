# last

배열의 마지막 요소를 반환해요.

이 함수는 배열을 입력 받아 해당 배열의 첫 번 째 요소를 반환해요. 빈 배열의 경우, `undefined`를 반환해요.

## 인터페이스

```typescript
export function last<T>(arr: readonly [...T[], T]): T;
export function last<T>(arr: readonly T[]): T | undefined;
```

### 파라미터

- `arr`(`T[]`): 마지막 요소를 반환할 배열

### 반환 값

(`T | undefined`): 배열의 마지막 요소, 빈 배열의 경우, `undefined`를 반환해요.

### 에러

`arr`이 배열이 아닌 경우 에러를 던져요.

## 예시

```typescript
const arr1 = [1, 2, 3];
const result = last(arr1);
// result는 3이에요.

const arr2: number[] = [];
const result = last(arr2);
// result는 undefined에요.

const largeArray = Array(1000)
  .fill(0)
  .map((_, i) => i);
const result = last(largeArray);
// result는 99에요.

const nestedArray = [
  [3, 1],
  [3, 2],
  [3, 3],
];
const result = last(nestedArray);
// result는 [3,3]이에요.
```
