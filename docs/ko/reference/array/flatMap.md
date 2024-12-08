# flatMap

중첩된 배열의 각 요소를 주어진 iteratee 함수로 매핑 후, 원하는 깊이까지 풀어서 평탄화해요.

JavaScript 언어에 포함된 [Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)을 [Array#map](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)과 함께 `map(iteratee).flat(depth)`으로 호출했을 때와 동일하게 동작하지만, 더 빨라요.

## 인터페이스

```typescript
function flatMap<T, U, D extends number = 1>(arr: T[], iteratee: (item: T) => U, depth?: D): Array<FlatArray<U[], D>>;
```

### 파라미터

- `arr` (`T[]`): 평탄화할 중첩 배열이에요.
- `iteratee` (`T[]`): 각 배열 요소를 매핑하는 함수예요.
- `depth` (`D`): 평탄화할 깊이에요. 기본값은 1이에요.

### 반환 값

(`Array<FlatArray<U[], D>>`): 각 요소가 매핑되고, 원하는 깊이까지 평탄해진 새로운 배열이에요.

## 예시

```typescript
const array = [1, 2, 3];

const result1 = flatMap(array, item => [item, item], 1);
// [1, 1, 2, 2, 3, 3]를 반환해요.

const result2 = flatMap(array, item => [[item, item]], 2);
// [1, 1, 2, 2, 3, 3]를 반환해요.

const result3 = flatMap(array, item => [[[item, item]]], 3);
// [1, 1, 2, 2, 3, 3]를 반환해요.
```
