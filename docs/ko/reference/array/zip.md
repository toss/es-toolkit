# zip

여러 배열을 튜플의 단일 배열로 결합해요.

이 함수는 여러 배열을 입력받아 각 요소가 입력 배열의 해당 요소들을 포함하는 튜플인 새 배열을 반환해요. 입력 배열의 길이가 다를 경우, 결과 배열의 길이는 가장 긴 입력 배열의 길이를 가지며, 누락된 요소는 `undefined`로 채워져요.

## 인터페이스

```typescript
function zip<T>(arr1: T[]): [T][];
function zip<T, U>(arr1: T[], arr2: U[]): [T, U][];
function zip<T, U, V>(arr1: T[], arr2: U[], arr3: V[]): [T, U, V][];
function zip<T, U, V, W>(arr1: T[], arr2: U[], arr3: V[], arr4: W[]): [T, U, V, W][];
function zip<T>(...arrs: T[][]): T[][];
```

### 파라미터

- `...arrs` (`T[][]`): 함께 결합할 배열들이에요.

### 반환 값

(`T[][]`): 입력 배열의 요소들을 포함하는 튜플로 이루어진 새로운 배열이에요.

## 예시

```typescript
const arr1 = [1, 2, 3];
const arr2 = ['a', 'b', 'c'];
const result = zip(arr1, arr2);
// result는 [[1, 'a'], [2, 'b'], [3, 'c']]가 돼요.

const arr3 = [true, false];
const result2 = zip(arr1, arr2, arr3);
// result2는 [[1, 'a', true], [2, 'b', false], [3, 'c', undefined]]가 돼요.
```
