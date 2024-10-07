# constant

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

항상 `value`를 반환하는 새로운 함수를 생성해요.

## 인터페이스

```typescript
function constant(): () => undefined;
function constant<T>(value: T): () => T;
```

### 파라미터

- `value` (`T`): 새로운 함수에서 반환할 값.

### 반환 값

(`() => T | undefined`): 새로운 상수 함수.

## 예시

```typescript
const object = { a: 1 };
const returnsObject = constant(object);

returnsObject(); // => { a: 1 }
returnsObject() === object; // => true
```
