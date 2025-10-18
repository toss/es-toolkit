# divide (Lodash 호환성)

::: warning `/` 연산자를 사용하세요

이 `divide` 함수는 추가적인 함수 호출로 인해 느리게 동작해요.

대신 더 빠르고 간단한 `/` 연산자를 사용하세요.

:::

두 숫자를 나눠요.

```typescript
const result = divide(value, other);
```

## 레퍼런스

### `divide(value, other)`

두 숫자를 나누고 싶을 때 `divide`를 사용하세요.

```typescript
import { divide } from 'es-toolkit/compat';

// 기본 나눗셈
divide(6, 3);
// Returns: 2

divide(10, 5);
// Returns: 2

// 소수 나눗셈
divide(7, 2);
// Returns: 3.5

divide(1, 3);
// Returns: 0.3333333333333333

// 0으로 나누기
divide(6, 0);
// Returns: Infinity

divide(-6, 0);
// Returns: -Infinity

// NaN 처리
divide(2, NaN);
// Returns: NaN

divide(NaN, 3);
// Returns: NaN

divide(NaN, NaN);
// Returns: NaN
```

#### 파라미터

- `value` (`number`): 나눗셈의 피제수 (나누어지는 수)예요.
- `other` (`number`): 나눗셈의 제수 (나누는 수)예요.

#### 반환 값

(`number`): 첫 번째 숫자를 두 번째 숫자로 나눈 결과를 반환해요. 둘 중 하나라도 NaN이면 NaN을 반환해요.
