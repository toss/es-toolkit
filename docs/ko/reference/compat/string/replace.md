# replace (Lodash 호환성)

::: warning JavaScript의 `String.prototype.replace`를 사용하세요

이 `replace` 함수는 문자열이 아닌 값 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 JavaScript의 `String.prototype.replace`를 사용하세요.

:::

문자열에서 일치하는 패턴을 다른 문자열로 바꿔요.

```typescript
const replaced = replace(target, pattern, replacement);
```

## 사용법

### `replace(target, pattern, replacement)`

문자열에서 특정 패턴을 찾아서 다른 문자열로 바꾸고 싶을 때 `replace`를 사용하세요. 문자열이나 정규식 패턴을 사용할 수 있고, 교체할 내용은 문자열이나 함수로 지정할 수 있어요.

```typescript
import { replace } from 'es-toolkit/compat';

// 문자열 패턴으로 교체
replace('abcde', 'de', '123');
// Returns: 'abc123'

// 정규식 패턴으로 교체
replace('abcde', /[bd]/g, '-');
// Returns: 'a-c-e'
```

함수를 사용해서 동적으로 교체할 수도 있어요.

```typescript
import { replace } from 'es-toolkit/compat';

// 함수로 교체 내용 결정
replace('abcde', 'de', match => match.toUpperCase());
// Returns: 'abcDE'

// 정규식과 함수 조합
replace('abcde', /[bd]/g, match => match.toUpperCase());
// Returns: 'aBcDe'
```

`null`이나 `undefined` 대상은 빈 문자열로 처리해요.

```typescript
import { replace } from 'es-toolkit/compat';

replace(null, 'test', 'replaced');
// Returns: ''

replace(undefined, /test/g, 'replaced');
// Returns: ''
```

#### 파라미터

- `target` (`string`): 교체할 대상 문자열이에요.
- `pattern` (`string | RegExp`): 찾을 패턴이에요.
- `replacement` (`string | Function`): 교체할 내용이에요. 함수인 경우 매치된 문자열을 받아서 교체할 문자열을 반환해야 해요.

#### 반환 값

(`string`): 패턴이 교체된 새로운 문자열을 반환해요.
