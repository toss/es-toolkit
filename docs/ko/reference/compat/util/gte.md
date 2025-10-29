# gte (Lodash 호환성)

::: warning `>=` 연산자를 사용하세요

이 `gte` 함수는 `toNumber` 함수 호출과 문자열 타입 확인 등의 추가 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `>=` 연산자를 사용하세요.

:::

값이 다른 값보다 크거나 같은지 확인해요.

```typescript
const result = gte(value, other);
```

## 레퍼런스

### `gte(value, other)`

두 값을 비교해서 첫 번째 값이 두 번째 값보다 크거나 같은지 확인하고 싶을 때 `gte`를 사용하세요. 문자열끼리는 사전순으로 비교하고, 다른 타입들은 숫자로 변환해서 비교해요.

```typescript
import { gte } from 'es-toolkit/compat';

gte(3, 1);
// Returns: true

gte(3, 3);
// Returns: true

gte(1, 3);
// Returns: false

// 문자열 비교 (사전순)
gte('def', 'abc');
// Returns: true

gte('abc', 'def');
// Returns: false

// 다른 타입들은 숫자로 변환되어 비교
gte('10', 5);
// Returns: true (10 >= 5)

gte(1, null);
// Returns: true (1 >= 0)
```

#### 파라미터

- `value` (`unknown`): 비교할 첫 번째 값이에요.
- `other` (`unknown`): 비교할 두 번째 값이에요.

#### 반환 값

(`boolean`): 첫 번째 값이 두 번째 값보다 크거나 같으면 `true`, 그렇지 않으면 `false`를 반환해요.
