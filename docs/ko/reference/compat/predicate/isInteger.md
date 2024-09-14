# isInteger

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`value`가 정수인지 확인해요.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 `number`로 좁혀요.

## 인터페이스

```typescript
function isInteger(value?: unknown): value is number;
```

### 파라미터

- `value` (`unknown`): 정수인지 확인할 값.

### 반환 값

(`boolean`): `value`가 정수면 `true`, 그렇지 않으면 `false`.

## 예시

```typescript
isInteger(3); // Returns: true
isInteger(Infinity); // Returns: false
isInteger('3'); // Returns: false
isInteger([]); // Returns: false
```
