# toLength (Lodash 호환성)

::: warning Math.max와 Math.floor 사용 권장

유효한 배열 길이로 변환할 때는 Math.max(0, Math.floor(value))를 사용하는 것이 더 명확하고 표준적인 방식이에요.

대신 더 빠르고 현대적인 JavaScript 내장 메서드를 사용하세요.

:::

값을 유효한 배열 인덱스로 변환해요. 0 이상 2^32 - 1 이하의 정수로 제한해요.

```typescript
toLength(3.2); // => 3
toLength(-1); // => 0
toLength('42'); // => 42
```

## 레퍼런스

### `toLength(value?: unknown): number`

값을 유효한 배열 인덱스로 변환해요.

#### 파라미터

- `value` (`unknown`): 유효한 인덱스로 변환할 값

### 반환 값

(`number`): 유효한 인덱스로 변환된 값
