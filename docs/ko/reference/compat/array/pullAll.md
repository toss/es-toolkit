# pullAll

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

지정된 모든 값을 배열에서 제거합니다.

이 함수는 `arr`을 제자리에서 변경합니다.
원본 배열을 수정하지 않고 값을 제거하려면 `difference`를 사용하세요.

## 인터페이스

```typescript
function pullAll<T>(arr: T[], valuesToRemove: ArrayLike<T>): T[];
```

### 파라미터

- `arr` (`T[]`): 수정할 배열입니다. 문자열.
- `valuesToRemove` (`ArrayLike<T>`): 배열에서 제거할 값입니다. 문자열.

### 반환 값

(`T[]`): 지정된 값이 제거된 수정된 배열입니다.
문자열.

## 예시

```typescript
const numbers = [1, 2, 3, 4, 5, 2, 4];
pullAll(numbers, [2, 4]);
console.log(numbers); // [1, 3, 5]
```
