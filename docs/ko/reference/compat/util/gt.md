# gt

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

값이 다른 값보다 큰지 확인합니다.

## 인터페이스

```typescript
function gt(value: unknown, other: unknown): boolean;
```

### 파라미터

- `value` (`unknown`): 비교할 값입니다. 문자열.
- `other` (`unknown`): 비교할 다른 값입니다. 문자열.

### 반환 값

(`boolean`): 값이 다른 값보다 크면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. 문자열.

## 예시

```typescript
gt(3, 1); // true
gt(3, 3); // false
gt(1, 3); // false
```