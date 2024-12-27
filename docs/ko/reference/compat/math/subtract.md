# subtract

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

두 숫자의 차이를 반환하는 함수예요.

둘 중 하나라도 `NaN`이면 `NaN`을 반환해요.

## 인터페이스

```typescript
function subtract(value: number, other: number): number;
```

### 파라미터

- `value` (`number`): 기준이 되는 숫자예요.
- `other` (`number`): `value`에서 뺄 숫자예요.

### 반환 값

(`number`): `value`에서 `other`를 뺀 값을 반환해요. 둘 중 하나라도 `NaN`이면 `NaN`을 반환해요.

## 예시

```typescript
subtract(6, 4); // 2를 반환해요.
subtract(-6, 4); // -10을 반환해요.
subtract(NaN, 4); // value가 NaN이기 때문에 NaN을 반환해요.
subtract(6, NaN); // other이 NaN이기 때문에 NaN을 반환해요.
subtract(NaN, NaN); // 인수가 모두 NaN이기 때문에 NaN을 반환해요.
```
