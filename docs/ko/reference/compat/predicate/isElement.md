# isElement

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`value`가 DOM 요소인지 확인해요. 구조적으로 확인하기 때문에 결과가 정확하지 않을 수 있어요.

## 인터페이스

```typescript
function isElement(value?: any): boolean;
```

### 파라미터

- `value` (`any`): 확인할 값.

### 반환 값

(`boolean`): `value`가 DOM 요소이면 `true`, 그렇지 않으면 `false`.

## 예시

```typescript
console.log(isElement(document.body)); // true
console.log(isElement('<body>')); // false
```
