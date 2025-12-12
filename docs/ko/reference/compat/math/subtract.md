# subtract (Lodash 호환성)

::: warning `-` 연산자를 사용하세요

이 `subtract` 함수는 추가적인 함수 호출로 인해 느리게 동작해요.

대신 더 빠르고 간단한 `-` 연산자를 사용하세요.

:::

두 숫자를 빼요.

```typescript
const result = subtract(value, other);
```

## 사용법

### `subtract(value, other)`

두 숫자를 빼고 싶을 때 `subtract`를 사용하세요.

```typescript
import { subtract } from 'es-toolkit/compat';

// 기본 빼기
subtract(6, 4);
// Returns: 2

subtract(10, 3);
// Returns: 7

// 음수 처리
subtract(-6, 4);
// Returns: -10

subtract(6, -4);
// Returns: 10

// NaN 처리
subtract(NaN, 4);
// Returns: NaN

subtract(6, NaN);
// Returns: NaN

subtract(NaN, NaN);
// Returns: NaN
```

#### 파라미터

- `value` (`number`): 빼기의 기준이 되는 첫 번째 숫자예요.
- `other` (`number`): 빼는 두 번째 숫자예요.

#### 반환 값

(`number`): 첫 번째 숫자에서 두 번째 숫자를 뺀 결과를 반환해요. 둘 중 하나라도 NaN이면 NaN을 반환해요.
