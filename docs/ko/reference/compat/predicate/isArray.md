# isArray

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

주어진 값이 배열인지 확인해요.

이 함수는 주어진 값이 배열인지 확인해요.
값이 배열이라면 `true`, 아니면 `false`를 반환해요.

TypeScript의 타입 가드로 주로 사용되는데요, 파라미터로 주어진 값을 배열 타입으로 좁힐 수 있어요.

## 인터페이스

```typescript
function isArray(value?: unknown): value is any[];
```

### 파라미터

- `value` (`unknown`): 배열인지 확인할 값.

### 반환 값

(`value is any[]`): 값이 배열이면 `true`, 아니면 `false`.

## 예시

```typescript
const value1 = [1, 2, 3];
const value2 = 'abc';
const value3 = () => {};

console.log(isArray(value1)); // true
console.log(isArray(value2)); // false
console.log(isArray(value3)); // false
```
