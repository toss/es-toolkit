# add

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

두 숫자를 더해요.

## 인터페이스

```typescript
function add(value: number, other: number): number;
```

### 파라미터

- `value` (`number`): 더할 첫 번째 숫자예요.
- `other` (`number`): 더할 두 번째 숫자예요.

### 반환 값

(`number`): 두 숫자의 합.

## 예시

```typescript
const result1 = add(2, 3); // 두 값은 number 타입이기 때문에 result1은 5가 돼요.
const result2 = add(NaN, 5); // value가 NaN이기 때문에 result2는 NaN이 돼요.
const result3 = add(10, NaN); // other가 NaN이기 때문에 result2는 NaN이 돼요
```
