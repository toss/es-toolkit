# eq

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

두 값이 동등한지 여부를 결정하기 위해 `SameValueZero` 비교를 수행해요.

## 인터페이스

```typescript
function eq(value?: unknown, other?: unknown): boolean;
```

### 파라미터

- `value` (`unknown`): 비교할 값.
- `other` (`unknown`): 비교할 다른 값.

### 반환 값

(`boolean`): 값이 동등하면 `true`를, 그렇지 않으면 `false`를 반환해요.

## 예시

```typescript
eq(1, 1); // true
eq(0, -0); // true
eq(NaN, NaN); // true
eq('a', Object('a')); // false
```
