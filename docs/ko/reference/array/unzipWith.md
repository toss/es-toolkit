# unzipWith

입력된 배열을 분리하거나 변환하여 새로운 배열로 반환하는 함수입니다. 이 함수는 중첩된 배열을 받아서 각 요소들을 분리하여 새로운 배열을 만들거나, 선택적으로 제공된 함수를 이용해 변환된 값으로 새로운 배열을 생성합니다.

## 인터페이스

```typescript
function unzipWith<T>(target: readonly T[][] | null | undefined): T[][];
function unzipWith<T, R>(target: readonly T[][] | null | undefined, iteratee: (...args: T[]) => R): R[];
```

### 파라미터

- `target`(`T[][] | null | undefined`): 분리하거나 변환할 중첩된 배열입니다. 배열이 null 또는 undefined인 경우 빈 배열을 반환합니다.
- `iteratee` (`(...args: T[]) => R`, 선택 사항): 각 그룹의 요소를 변환할 함수입니다. 이 함수가 제공되면, 그룹의 요소들을 전달받아 변환된 값을 반환합니다.

### 반환 값

(`T[][]`): iteratee 함수가 제공되지 않은 경우, 분리된 배열의 배열을 반환합니다.
(`R[]`): iteratee 함수가 제공된 경우, 변환된 값을 포함하는 배열을 반환합니다.

## 예시

```typescript
const nestedArray = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const result = unzipWith(nestedArray, (item, item2, item3) => item + item2 + item3);
// [9, 12]
```
