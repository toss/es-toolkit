# toUpper (Lodash 호환성)

::: warning JavaScript의 `String.prototype.toUpperCase`를 사용하세요

이 `toUpper` 함수는 문자열이 아닌 값 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 JavaScript의 `String.prototype.toUpperCase`를 사용하세요.

:::

값을 문자열로 변환한 후 대문자로 바꿔요.

```typescript
const uppercased = toUpper(value);
```

## 사용법

### `toUpper(value?)`

값을 대문자 문자열로 변환하고 싶을 때 `toUpper`를 사용하세요. 어떤 타입의 값이든 먼저 문자열로 변환한 다음 대문자로 만들어요.

```typescript
import { toUpper } from 'es-toolkit/compat';

// 문자열 대문자 변환
toUpper('--foo-bar--');
// Returns: '--FOO-BAR--'

toUpper('Hello World');
// Returns: 'HELLO WORLD'

// 숫자 변환
toUpper(123);
// Returns: '123'

// 배열 변환
toUpper([1, 2, 3]);
// Returns: '1,2,3'
```

`null`이나 `undefined`는 빈 문자열로 처리해요.

```typescript
import { toUpper } from 'es-toolkit/compat';

toUpper(null);
// Returns: ''

toUpper(undefined);
// Returns: ''

toUpper();
// Returns: ''
```

#### 파라미터

- `value` (`unknown`, 선택): 대문자로 변환할 값이에요.

#### 반환 값

(`string`): 대문자로 변환된 문자열을 반환해요.
