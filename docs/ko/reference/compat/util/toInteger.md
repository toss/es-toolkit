# toInteger (Lodash 호환성)

::: warning Math.trunc 사용 권장

값을 정수로 변환할 때는 Math.trunc()나 parseInt()를 사용하는 것이 더 명확하고 표준적인 방식이에요.

대신 더 빠르고 현대적인 Math.trunc()를 사용하세요.

:::

값을 정수로 변환해요. 무한한 값인 경우 유한한 값으로 변환되고, 소숫점 아래 숫자는 버려요.

```typescript
toInteger(3.2); // => 3
toInteger(Infinity); // => 1.7976931348623157e+308
toInteger('3.2'); // => 3
```

## 레퍼런스

### `toInteger(value?: unknown): number`

값을 정수로 변환해요.

#### 파라미터

- `value` (`unknown`): 변환할 값

### 반환 값

(`number`): 변환된 정수
