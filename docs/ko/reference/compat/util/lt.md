# lt

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

값이 다른 값보다 작은지 확인해요.

## 인터페이스

```typescript
function lt(value: unknown, other: unknown): boolean;
```

### 파라미터

- `value` (`unknown`): 비교할 값.
- `other` (`unknown`): 비교할 다른 값.

### 반환 값

(`boolean`): 값이 다른 값보다 작으면 `true`, 그렇지 않으면 `false`.

## 예시

```typescript
lt(1, 3); // true
lt(3, 3); // false
lt(3, 1); // false
```
