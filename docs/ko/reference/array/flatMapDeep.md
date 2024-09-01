# flatMapDeep

중첩된 배열의 각 요소를 주어진 iteratee 함수로 매핑 후, 모든 깊이를 풀어서 평탄화해요.

JavaScript 언어에 포함된 [Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)을 [Array#map](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)과 함께 `map(iteratee).flat(Infinity)`으로 호출했을 때와 동일하게 동작하지만, 더 빨라요.

## 인터페이스

```typescript
// 중첩된 배열을 재귀적으로 풀어내어 가장 내부의 요소 타입을 추출하는 유틸리티 타입이에요.
type ExtractNestedArrayType<T> = T extends ReadonlyArray<infer U> ? ExtractNestedArrayType<U> : T;

function flattenDeep<T>(arr: readonly T[]): Array<ExtractNestedArrayType<T>>;
```

### 파라미터

- `arr` (`T[]`): 평탄화할 중첩 배열이에요.
- `iteratee` (`T[]`): 각 배열 요소를 매핑하는 함수에요.

### 반환 값

(`Array<ExtractNestedArrayType<T>>`): 각 요소가 매핑되고, 모든 깊이가 평탄해진 새로운 배열이에요.

## 예시

```typescript
const array = [1, 2, 3];

const result1 = flatMapDeep(array, item => [item, item]);
// [1, 1, 2, 2, 3, 3]를 반환해요.

const result2 = flatMapDeep(array, item => [[item, item]]);
// [1, 1, 2, 2, 3, 3]를 반환해요.

const result3 = flatMapDeep(array, item => [[[item, item]]]);
// [1, 1, 2, 2, 3, 3]를 반환해요.
```
