# divide

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

두 숫자를 나눠요.

숫자 중 하나라도 `NaN`이면, `NaN`을 반환해요.

## 인터페이스

```typescript
function divide(value: number, other: number): number;
```

### 파라미터

- `value` (`number`): 나눗셈의 첫 번째 숫자.
- `other` (`number`): 나눗셈의 두 번째 숫자.

### 반환 값

(`number`): 두 숫자를 나눈 값.

## 예시

```typescript
divide(6, 3); // => 2
divide(2, NaN); // => NaN
divide(NaN, 3); // => NaN
divide(NaN, NaN); // => NaN
```
