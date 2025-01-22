# subtract

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

두 숫자를 곱하는 함수예요.

둘 중 하나라도 `NaN`이면 `NaN`을 반환해요.

## 인터페이스

```typescript
function multiply(value: number, other: number): number;
```

### 파라미터

- `value` (`number`): 곱셈에서 첫 번째 숫자예요.
- `other` (`number`): 곱셈에서 두 번째 숫자예요.

### 반환 값

(`number`): `value`와 `other`를 곱한 값을 반환해요. 둘 중 하나라도 `NaN`이면 `NaN`을 반환해요.

## 예시

```typescript
multiply(2, 3); // 6를 반환해요.
multiply(2, -3); // -6을 반환해요.
multiply(NaN, 3); // value가 NaN이기 때문에 NaN을 반환해요.
multiply(2, NaN); // other이 NaN이기 때문에 NaN을 반환해요.
multiply(NaN, NaN); // 인수가 모두 NaN이기 때문에 NaN을 반환해요.
```
