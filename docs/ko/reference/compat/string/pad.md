# pad (Lodash 호환성)

::: warning `es-toolkit`의 `pad`를 사용하세요

이 `pad` 함수는 `null`이나 `undefined` 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [pad](../../string/pad.md)를 사용하세요.

:::

문자열의 앞뒤로 패딩 문자를 추가해서 지정된 길이만큼 맞춰요.

```typescript
const padded = pad(str, length, chars);
```

## 레퍼런스

### `pad(str, length, chars)`

문자열이 원하는 길이보다 짧을 때 앞뒤로 패딩 문자를 추가해서 길이를 맞추고 싶을 때 `pad`를 사용하세요. 패딩 문자가 균등하게 나누어 떨어지지 않으면, 추가 문자는 오른쪽에 배치돼요.

```typescript
import { pad } from 'es-toolkit/compat';

// 기본 공백으로 패딩
pad('abc', 8);
// Returns: '  abc   '

// 지정된 문자로 패딩
pad('abc', 8, '_-');
// Returns: '_-abc_-_'

// 이미 충분한 길이이면 그대로 반환
pad('abc', 3);
// Returns: 'abc'

// 길이가 더 짧으면 그대로 반환
pad('abc', 2);
// Returns: 'abc'
```

`null`이나 `undefined`는 빈 문자열로 처리해요.

```typescript
import { pad } from 'es-toolkit/compat';

pad(null, 5); // '     '
pad(undefined, 3, '*'); // '***'
```

#### 파라미터

- `str` (`string`, 선택): 패딩할 문자열이에요.
- `length` (`number`, 선택): 목표 길이예요. 기본값은 `0`이에요.
- `chars` (`string`, 선택): 패딩에 사용할 문자들이에요. 기본값은 공백 `' '`이에요.

### 반환 값

(`string`): 지정된 길이만큼 패딩된 문자열을 반환해요.
