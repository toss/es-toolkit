# upperFirst (Lodash 호환성)

::: warning `es-toolkit`의 `upperFirst`를 사용하세요

이 `upperFirst` 함수는 `null`이나 `undefined` 처리를 위한 변환 로직으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [upperFirst](../../string/upperFirst.md)를 사용하세요.

:::

문자열의 첫 번째 문자를 대문자로 변환해요.

```typescript
const upperCased = upperFirst(str);
```

## 사용법

### `upperFirst(str)`

문자열의 첫 번째 문자만 대문자로 만들고 싶을 때 `upperFirst`를 사용하세요. 나머지 문자들은 그대로 유지돼요.

```typescript
import { upperFirst } from 'es-toolkit/compat';

// 소문자로 시작하는 문자열
upperFirst('fred');
// Returns: 'Fred'

// 이미 대문자로 시작하는 문자열
upperFirst('Fred');
// Returns: 'Fred'

// 모두 대문자인 문자열
upperFirst('FRED');
// Returns: 'FRED'
```

`null`이나 `undefined`는 빈 문자열로 처리해요.

```typescript
import { upperFirst } from 'es-toolkit/compat';

upperFirst(null); // ''
upperFirst(undefined); // ''
```

#### 파라미터

- `str` (`string`, 선택): 첫 문자를 대문자로 변환할 문자열이에요.

#### 반환 값

(`string`): 첫 문자가 대문자로 변환된 문자열을 반환해요.
