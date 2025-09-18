# times (Lodash 호환성)

::: warning Array.from 사용 권장

반복된 작업을 통해 배열을 생성할 때는 Array.from()을 사용하는 것이 더 표준적인 JavaScript 방식이에요.

대신 더 빠르고 현대적인 Array.from()을 사용하세요.

:::

함수를 첫 번째 파라미터로 인덱스를 제공해서 `n`번 실행하고, 그 결괏값으로 이루어진 배열을 반환해요.

```typescript
const doubled = (i: number) => i * 2;
times(3, doubled); // => [0, 2, 4]
times(4); // => [0, 1, 2, 3]
```

## 레퍼런스

### `times<R = number>(n?: number, getValue?: (index: number) => R): R[]`

함수를 n번 실행해서 결괏값으로 이루어진 배열을 반환해요.

#### 파라미터

- `n` (`number`): 함수를 호출할 횟수
- `getValue` (`(index: number) => R`): 반복마다 호출되는 함수 (제공되지 않으면 인덱스 배열 반환)

### 반환 값

(`R[]`): 결괏값의 배열
