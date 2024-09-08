# flattenDepth

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

배열을 지정된 깊이까지 평평하게 만듭니다.

## 인터페이스

```typescript
function flattenDepth<T, D extends number = 1>(value: T[] | object, depth: D): Array<FlatArray<T[], D>> | [];
```

### 파라미터

- `value` (`T[] | object`): 평평하게 할 값이에요.
- `depth` (`D`): 중첩 배열 구조가 얼마나 깊게 평평해져야 하는지 지정하는 깊이 수준이에요. 기본값은 1이에요.

### 반환 값

(`Array<FlatArray<T[], D>> | []`): 평평해진 새로운 배열이에요.

## 예시

```typescript
const arr = flattenDepth([1, [2, 3], [4, [5, 6]]], 1);
// Returns: [1, 2, 3, 4, [5, 6]]

const arr = flattenDepth([1, [2, 3], [4, [5, 6]]], 2);
// Returns: [1, 2, 3, 4, 5, 6]
```
