# sum (Lodash 호환성)

::: warning es-toolkit의 [sum](../../math/sum.md)를 사용하세요

이 `sum` 함수는 타입 변환과 null/undefined 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [sum](../../math/sum.md)를 사용하세요.

:::

배열의 모든 값을 더해요.

```typescript
const total = sum(array);
```

## 레퍼런스

### `sum(array)`

배열 안의 모든 숫자를 더해서 총합을 구해요.

```typescript
import { sum } from 'es-toolkit/compat';

// 숫자 배열
sum([1, 2, 3]);
// Returns: 6

sum([1.5, 2.5, 3]);
// Returns: 7

// 빈 배열
sum([]);
// Returns: 0
```

BigInt와 문자열도 처리해요.

```typescript
import { sum } from 'es-toolkit/compat';

// BigInt 배열
sum([1n, 2n, 3n]);
// Returns: 6n

// 문자열 배열 (연결됨)
sum(['1', '2']);
// Returns: '12'
```

잘못된 값들은 무시해요.

```typescript
import { sum } from 'es-toolkit/compat';

sum([1, undefined, 2]);
// Returns: 3 (undefined 무시)

sum(null);
// Returns: 0

sum(undefined);
// Returns: 0
```

#### 파라미터

- `array` (`ArrayLike<any> | null | undefined`): 더할 값들이 있는 배열이에요.

#### 반환 값

(`number`): 모든 값을 더한 총합을 반환해요.
