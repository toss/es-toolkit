# add (Lodash 호환성)

::: warning `+` 연산자를 사용하세요

이 `add` 함수는 복잡한 타입 변환과 문자열 처리로 인해 느리게 동작해요.

대신 더 빠르고 간단한 `+` 연산자를 사용하세요.

:::

두 값을 더해요.

```typescript
const result = add(value, other);
```

## 레퍼런스

### `add(value, other)`

두 값을 더하고 싶을 때 `add`를 사용하세요. 숫자뿐만 아니라 문자열도 처리할 수 있어요.

```typescript
import { add } from 'es-toolkit/compat';

// 숫자 더하기
add(2, 3);
// Returns: 5

add(1.5, 2.5);
// Returns: 4

// NaN 처리
add(NaN, 5);
// Returns: NaN

add(10, NaN);
// Returns: NaN
```

문자열이 포함되면 문자열 연결로 동작해요.

```typescript
import { add } from 'es-toolkit/compat';

add('2', 3);
// Returns: '23'

add(1, '5');
// Returns: '15'

add('hello', 'world');
// Returns: 'helloworld'
```

`undefined` 값은 특별하게 처리해요.

```typescript
import { add } from 'es-toolkit/compat';

add(undefined, undefined);
// Returns: 0

add(5, undefined);
// Returns: 5

add(undefined, 3);
// Returns: 3
```

#### 파라미터

- `value` (`number`): 더할 첫 번째 값이에요.
- `other` (`number`): 더할 두 번째 값이에요.

#### 반환 값

(`number | string`): 두 값의 합을 반환해요. 문자열이 포함되면 문자열을 반환하고, 그렇지 않으면 숫자를 반환해요.
