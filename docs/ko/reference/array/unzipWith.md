# unzipWith

결합되어 있는 2차원 배열을 1차원 배열로 풀고, `iteratee` 함수로 값을 변환해서 새로운 배열을 반환해요.

## 인터페이스

```typescript
function unzipWith<T, R>(target: T[][], iteratee: (...args: T[]) => R): R[];
```

### 파라미터

- `target` (`T[][]`): 결합을 풀고 변환할 배열이에요.
- `iteratee` (`(...args: T[]) => R`): 결합이 풀린 배열을 변환할 함수예요.

### 반환 값

(`R[]`): 결합을 풀고 변환된 값들로 만들어진 새로운 배열이에요.

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
