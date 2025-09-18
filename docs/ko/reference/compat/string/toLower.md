# toLower (Lodash 호환성)

::: warning JavaScript의 `String.prototype.toLowerCase`를 사용하세요

이 `toLower` 함수는 문자열이 아닌 값 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 JavaScript의 `String.prototype.toLowerCase`를 사용하세요.

:::

값을 문자열로 변환한 후 소문자로 바꿔요.

```typescript
const lowercased = toLower(value);
```

## 레퍼런스

### `toLower(value?)`

값을 소문자 문자열로 변환하고 싶을 때 `toLower`를 사용하세요. 어떤 타입의 값이든 먼저 문자열로 변환한 다음 소문자로 만들어요.

```typescript
import { toLower } from 'es-toolkit/compat';

// 문자열 소문자 변환
toLower('--FOO-BAR--');
// Returns: '--foo-bar--'

toLower('Hello World');
// Returns: 'hello world'

// 숫자 변환
toLower(123);
// Returns: '123'

// 배열 변환
toLower([1, 2, 3]);
// Returns: '1,2,3'
```

`null`이나 `undefined`는 빈 문자열로 처리해요.

```typescript
import { toLower } from 'es-toolkit/compat';

toLower(null);
// Returns: ''

toLower(undefined);
// Returns: ''

toLower();
// Returns: ''
```

#### 파라미터

- `value` (`unknown`, 선택): 소문자로 변환할 값이에요.

### 반환 값

(`string`): 소문자로 변환된 문자열을 반환해요.