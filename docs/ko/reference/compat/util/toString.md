# toString

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`value`를 문자열로 변환해요.

`null` 및 `undefined` 값에 대해서는 빈 문자열을 반환해요. `-0`의 부호는 유지돼요.

## 인터페이스

```typescript
function toString(value?: unknown): string;
```

### 파라미터

- `value` (`unknown`): 변환할 값.

### 반환 값

(`string`): 변환된 문자열.

## 예시

```typescript
toString(null); // returns ''
toString(undefined); // returns ''
toString(-0); // returns '-0'
toString([1, 2, -0]); // returns '1,2,-0'
toString([Symbol('a'), Symbol('b')]); // returns 'Symbol(a),Symbol(b)'
```
