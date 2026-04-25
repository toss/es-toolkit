# multiply (Lodash 호환성)

::: warning `*` 연산자를 사용하세요

이 `multiply` 함수는 추가적인 함수 호출로 인해 느리게 동작해요.

대신 더 빠르고 간단한 `*` 연산자를 사용하세요.

:::

두 숫자를 곱해요.

```typescript
const result = multiply(value, other);
```

## 사용법

### `multiply(value, other)`

두 숫자를 곱하고 싶을 때 `multiply`를 사용하세요.

```typescript
import { multiply } from 'es-toolkit/compat';

// 기본 곱셈
multiply(2, 3);
// Returns: 6

multiply(4, 5);
// Returns: 20

// 음수 처리
multiply(2, -3);
// Returns: -6

multiply(-4, -5);
// Returns: 20

// 소수 처리
multiply(2.5, 4);
// Returns: 10

// NaN 처리
multiply(NaN, 3);
// Returns: NaN

multiply(2, NaN);
// Returns: NaN

multiply(NaN, NaN);
// Returns: NaN
```

#### 파라미터

- `value` (`number`): 곱셈의 첫 번째 숫자예요.
- `other` (`number`): 곱셈의 두 번째 숫자예요.

#### 반환 값

(`number`): 두 숫자를 곱한 결과를 반환해요. 둘 중 하나라도 NaN이면 NaN을 반환해요.
