# toFinite

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`value`를 유한한 숫자로 변환해요.

## 인터페이스

```typescript
function toFinite(value: any): number;
```

### 파라미터

- `value` (`any`): 변환할 값.

### 반환 값

(`number`): 유한한 숫자.

## 예시

```typescript
toFinite(3.2); // => 3.2
toFinite(Number.MIN_VALUE); // => 5e-324
toFinite(Infinity); // => 1.7976931348623157e+308
toFinite('3.2'); // => 3.2
toFinite(Symbol.iterator); // => 0
toFinite(NaN); // => 0
```
