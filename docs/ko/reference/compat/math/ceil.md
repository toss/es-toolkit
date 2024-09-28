# ceil

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

숫자를 지정된 자릿수로 올림하는 함수에요.

## 인터페이스

```typescript
function ceil(number: number | string, precision: number | string): number;
```

### 파라미터

- `number` (`number | string`): 반올림할 숫자.
- `precision` (`number | string`): 반올림할 자릿수.

### 반환 값

(`number`): 반올림된 숫자.
문자열.

## 예시

```typescript
ceil(4.006); // => 5
ceil(6.004, 2); // => 6.01
ceil(6040, -2); // => 6100
```
