# flattenDepth (Lodash 호환성)

::: warning `es-toolkit/array`의 `flatten`이나 `Array.prototype.flat`을 사용하세요

이 `flattenDepth` 함수는 단순히 `flatten` 함수를 호출하는 추가 레이어로 인해 불필요한 오버헤드가 있어요.

대신 더 빠른 `es-toolkit/array`의 `flatten` 함수나 `Array.prototype.flat`을 직접 사용하세요.

:::

배열을 지정된 깊이까지 평평하게 만듭니다.

## 인터페이스

```typescript
function flattenDepth<T, D extends number = 1>(value: T[], depth: D): Array<FlatArray<T[], D>> | [];
```

### 파라미터

- `value` (`T[]`): 평평하게 할 값이에요.

::: info `value`는 `ArrayLike<T>`, `null`, 또는 `undefined`가 될 수 있어요.

lodash와 완전한 호환성을 보장하기 위해, `flattenDepth` 함수는 `value`를 다음과 같이 처리해요.

- `value`가 `ArrayLike<T>`인 경우, `Array.from(...)`을 사용하여 배열로 변환돼요.
- `value`가 `null` 또는 `undefined`인 경우, 빈 배열로 처리돼요.

:::

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
