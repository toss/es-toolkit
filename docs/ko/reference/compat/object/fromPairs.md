# fromPairs

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

키-값 쌍의 배열을 객체로 변환합니다.

## 인터페이스

```typescript
function fromPairs<T>(pairs: ArrayLike<[PropertyName, T]> | null | undefined): Record<string, T>;
function fromPairs(pairs: ArrayLike<any[]> | null | undefined): Record<string, any>;
```

### 파라미터

- `pairs` (`ArrayLike<[PropertyName, T]> | ArrayLike<any[]> | null | undefined`): 변환할 키-값 쌍의 배열이나 Map 타입 데이터. 2차원 배열의 각 하위 배열은 두 개의 요소를 가져야 하며, 첫 번째 요소는 키로, 두 번째 요소는 값으로 사용됩니다.

### 반환 값

(`Record<string, any> | Record<string, T>`): 입력 매개변수와 동일한 키와 값을 가지는 변환된 객체.

## 예시

```typescript
const pairs = [
  ['a', 1],
  ['b', 2],
];
const result = fromPairs(pairs);
// result will be: { a: 1, b: 2 }
```
