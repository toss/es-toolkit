# initial

배열의 마지막 요소를 제외한 나머지 요소들로 구성된 새로운 배열을 반환해요.

빈 배열이나 길이가 1인 배열의 경우, 빈 배열(`[]`)을 반환해요.

## 인터페이스

```typescript
function initial<T>(arr: T[]): T[];
```

### 파라미터

- `arr`(`T[]`): 마지막 요소를 제외할 배열.

### 반환 값

(`T[]`): 배열의 마지막 요소를 제외한 나머지 배열. 빈 배열이나 길이가 1인 배열의 경우, 빈 배열(`[]`)을 반환해요.

## 예시

```typescript
const arr1 = [1, 2, 3];
const result = initial(arr1);
// result는 [1, 2]에요.

const arr2: number[] = [];
const result = initial(arr2);
// result는 []에요.

const arr3: number[] = [1];
const result = initial(arr3);
// result는 []에요.

const largeArray = Array(1000)
  .fill(0)
  .map((_, i) => i);
const result = initial(largeArray);
// result는 [0, 1, 2 ..., 998]에요.

const nestedArray = [
  [3, 1],
  [3, 2],
  [3, 3],
];
const result = initial(nestedArray);
// result는 [[3, 1], [3, 2]]에요.
```
