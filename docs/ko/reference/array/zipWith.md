# zipWith

사용자 정의 결합 함수를 사용하여 여러 배열을 단일 배열로 결합해요.
이 함수는 여러개의 배열과 결합 함수를 입력받아, 입력 배열의 요소들에 결합 함수를 적용한 결과로 이루어진 새 배열을 반환해요.

## 인터페이스

```typescript
function zipWith<T, R>(arr1: T[], combine: (item: T) => R): R[];
function zipWith<T, U, R>(arr1: T[], arr2: U[], combine: (item1: T, item2: U) => R): R[];
function zipWith<T, U, V, R>(arr1: T[], arr2: U[], arr3: V[], combine: (item1: T, item2: U, item3: V) => R): R[];
function zipWith<T, U, V, W, R>(
  arr1: T[],
  arr2: U[],
  arr3: V[],
  arr4: W[],
  combine: (item1: T, item2: U, item3: V, item4: W) => R
): R[];
```

### 파라미터

- `arr1` (`T[]`): 첫 번째로 결합할 배열이에요.
- `arr2` (`U[]`, 선택사항): 두 번째로 결합할 배열이에요.
- `arr3` (`V[]`, 선택사항): 세 번째로 결합할 배열이에요.
- `arr4` (`W[]`, 선택사항): 네 번째로 결합할 배열이에요.
- `combine` (`(item1: T, item2: U, item3: V, item4: W) => R`): 각 배열의 요소를 받아 단일 값을 반환하는 결합 함수예요.

### 반환 값

(`R[]`): 입력 배열의 요소들에 결합 함수를 적용한 결과로 이루어진 새로운 배열이에요.

## 예시

```typescript
// 두 배열을 사용한 예시:
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const result = zipWith(arr1, arr2, (a, b) => a + b);
// result는 [5, 7, 9]가 돼요.

// 세 배열을 사용한 예시:
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];
const result = zipWith(arr1, arr2, arr3, (a, b, c) => `${a}${b}${c}`);
// result는 ['135', '246']이 돼요.
```
