# uniqWith

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

이 메서드는 `uniq`와 비슷하지만 요소의 동등성을 결정하는 데 사용되는 `comparator`를 허용해요.

배열의 중복 없는 버전을 생성하고, 각 요소의 첫 번째 발생만 유지해요.
`comparator`가 제공되면 두 개의 인수 `(arrVal, othVal)`와 함께 호출되어 요소를 비교해요.
비교자가 제공되지 않으면 얕은 동등성이 사용돼요.

결과 값의 순서는 입력 배열에 나타나는 순서에 따라 결정돼요.

## 인터페이스

```typescript
function uniqWith<T>(arr: ArrayLike<T> | null | undefined, comparator?: Comparator<T>): T[];
```

### 파라미터

- `arr` (`ArrayLike<T> | null | undefined`): 처리할 배열이에요.
- `comparator` (`Comparator<T>`): 요소의 동등성을 비교하기 위한 선택적 함수예요.

### 반환 값

(`T[]`): 비교자에 기반하여 유일한 값만 포함된 새로운 배열이에요.

## 예시

```typescript
const array = [1, 2, 2, 3];
const result = uniqWith(array);
// result will be [1, 2, 3]

const array = [1, 2, 3];
const result = uniqWith(array, (a, b) => a % 2 === b % 2)
// result will be [1, 2]
```