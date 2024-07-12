# flattenDeep

중첩된 배열의 모든 깊이를 풀어서 평탄화해요.

JavaScript 언어에 포함된 [Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)을 `flat(Infinity)`로 호출했을 때와 동일하게 동작하지만, 더 빨라요.

## 인터페이스

```typescript
// 중첩된 배열을 재귀적으로 풀어내어 가장 내부의 요소 타입을 추출하는 유틸리티 타입이에요.
type ExtractNestedArrayType<T> = T extends ReadonlyArray<infer U> ? ExtractNestedArrayType<U> : T;

function flattenDeep<T>(arr: T[]): Array<ExtractNestedArrayType<T>>;
```

### 파라미터

- `arr` (`T[]`): 평탄화할 중첩 배열이에요.

### 반환 값

(`Array<ExtractNestedArrayType<T>>`): 모든 깊이가 평탄해진 새로운 배열이에요.

## 예시

```typescript
const array = [1, [2, [3]], [4, [5, 6]]];

const result = flattenDeep(array);
// [1, 2, 3, 4, 5, 6]를 반환해요.
```
