# defaultTo

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`null`, `undefined`, `NaN`에 대해서 기본값을 반환해요.

## 인터페이스

```typescript
function defaultTo<T>(value: T | null | undefined, defaultValue?: T): T;
function defaultTo(value?: unknown, defaultValue?: unknown): any;
```

### 파라미터

- `value` (`unknown`): 확인할 값.
- `defaultValue` (`unknown`): 값이 `null`, `undefined` 또는 `NaN`인 경우 반환할 기본값.

### 반환 값

(`unknown`): 첫 번째 값 또는 기본값.

## 예시

```typescript
defaultTo(null, 'default') // returns 'default'
defaultTo(undefined, 42) // returns 42
defaultTo(NaN, 0) // returns 0
defaultTo('actual', 'default') // returns 'actual'
defaultTo(123, 0) // returns 123
```