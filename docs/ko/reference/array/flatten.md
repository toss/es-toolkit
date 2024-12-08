# flatten

중첩된 배열을 원하는 깊이까지 풀어서 평탄화해요.

JavaScript 언어에 포함된 [Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)과 동일하게 동작하지만, 더 빨라요.

## 인터페이스

```typescript
function flatten<T, D extends number = 1>(arr: T[], depth?: D): Array<FlatArray<T[], D>>;
```

### 파라미터

- `arr` (`T[]`): 평탄화할 중첩 배열이에요.
- `depth` (`D`): 평탄화할 깊이예요. 기본값은 1이에요.

### 반환 값

(`Array<FlatArray<T[], D>>`): 원하는 깊이까지 평탄해진 새로운 배열이에요.

## 예시

```typescript
const array = [1, [2, 3], [4, [5, 6]]];

const result1 = flatten(array);
// [1, 2, 3, 4, [5, 6]]를 반환해요.

const result2 = flatten(array, 1);
// [1, 2, 3, 4, [5, 6]]를 반환해요.

const result3 = flatten(array, 2);
// [1, 2, 3, 4, 5, 6]를 반환해요.
```
