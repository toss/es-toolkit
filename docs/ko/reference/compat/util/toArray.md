# toArray (Lodash 호환성)

::: warning Array.from 사용 권장

값을 배열로 변환할 때는 Array.from()이나 스프레드 연산자를 사용하는 것이 더 표준적인 방식이에요.

대신 더 빠르고 현대적인 Array.from()을 사용하세요.

:::

값을 배열로 변환해요. 객체인 경우 값들을, 문자열인 경우 개별 문자를 배열로 만들어요.

```typescript
toArray({ a: 1, b: 2 }); // [1, 2]
toArray('abc'); // ['a', 'b', 'c']
toArray(1); // []
```

## 레퍼런스

### `toArray(value?: unknown): any[]`

값을 배열로 변환해요.

#### 파라미터

- `value` (`unknown`): 변환할 값

### 반환 값

(`any[]`): 변환된 배열
