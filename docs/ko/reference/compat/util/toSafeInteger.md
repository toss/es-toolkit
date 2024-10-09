# toSafeInteger

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`value`를 안전한 정수로 변환해요. 안전한 정수란, JavaScript의 `number` 타입으로 정확하게 표현되고, 다른 정수로 반올림되지 않는 정수예요. 

무한한 값인 경우, 최대 또는 최소인 안전한 정수로 변환돼요. 소숫점 아래 숫자는 버려요.

## 인터페이스

```typescript
function toSafeInteger(value?: unknown): number;
```

### 파라미터

- `value` (`unknown`): 변환할 값.

### 반환 값

(`number`): 변환된 안전한 정수.

## 예시

```typescript
toSafeInteger(3.2); // => 3
toSafeInteger(Number.MAX_VALUE); // => 9007199254740991
toSafeInteger(Infinity); // => 9007199254740991
toSafeInteger('3.2'); // => 3
toSafeInteger(NaN); // => 0
toSafeInteger(null); // => 0
toSafeInteger(-Infinity); // => -9007199254740991
```
