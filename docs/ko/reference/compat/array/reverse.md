# reverse

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

배열의 요소들을 제자리에서 반전시켜요.

이 함수는 배열을 반전시키면서 원본 배열을 직접 수정해요. 입력이 null 또는 undefined일 경우, 입력 값을 그대로 반환해요.

## 인터페이스

```typescript
function reverse<T>(array: T[]): T[];
```

### 파라미터

- `array` (`T[]`): 반전할 배열.

### 반환 값

(`T[]`): 반전된 배열.

## 예시

```typescript
const array = [1, 2, 3, 4, 5];
const reversedArray = reverse(array);
console.log(reversedArray); // [5, 4, 3, 2, 1]
console.log(array); // [5, 4, 3, 2, 1] (원본 배열이 수정되요)

const emptyArray = reverse([]);
console.log(emptyArray); // []

const nullArray = reverse(null);
console.log(nullArray); // null
```
