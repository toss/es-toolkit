# toSafeInteger (Lodash 호환성)

::: warning Number.isSafeInteger와 Math.trunc 사용 권장

안전한 정수로 변환할 때는 Number.isSafeInteger()와 Math.trunc()를 조합해서 사용하는 것이 더 명확하고 표준적인 방식이에요.

대신 더 빠르고 현대적인 JavaScript 내장 메서드를 사용하세요.

:::

값을 안전한 정수로 변환해요. 안전한 정수란 JavaScript의 number 타입으로 정확하게 표현되는 정수예요.

```typescript
toSafeInteger(3.2); // => 3
toSafeInteger(Infinity); // => 9007199254740991
toSafeInteger('3.2'); // => 3
```

## 레퍼런스

### `toSafeInteger(value?: unknown): number`

값을 안전한 정수로 변환해요.

#### 파라미터

- `value` (`unknown`): 변환할 값

### 반환 값

(`number`): 변환된 안전한 정수
