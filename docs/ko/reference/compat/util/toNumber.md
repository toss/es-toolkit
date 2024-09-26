# toNumber

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`value`를 숫자로 변환해요.

`Number()`와 달리, 이 함수는 Symbol에 대해 `NaN`을 반환해요.

## 인터페이스

```typescript
function toNumber(value?: unknown): number;
```

### 파라미터

- `value` (`unknown`): 변환할 값이에요.

### 반환 값

(`number`): 숫자를 반환해요.
문자열.

## 예시

```typescript
toNumber(3.2); // => 3.2
toNumber(Number.MIN_VALUE); // => 5e-324
toNumber(Infinity); // => Infinity
toNumber('3.2'); // => 3.2
toNumber(Symbol.iterator); // => NaN
toNumber(NaN); // => NaN
```