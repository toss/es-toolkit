# trim (Lodash 호환성)

::: warning `es-toolkit`의 `trim`을 사용하세요

이 `trim` 함수는 `null`이나 `undefined` 처리, 배열 형태의 `chars` 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [trim](../../string/trim.md)을 사용하세요.

:::

문자열의 앞뒤 공백이나 지정된 문자들을 제거해요.

```typescript
const trimmed = trim(str, chars);
```

## 레퍼런스

### `trim(str, chars)`

문자열의 앞뒤에서 공백이나 특정 문자들을 제거하고 싶을 때 `trim`을 사용하세요. `chars`를 지정하지 않으면 앞뒤 공백만 제거해요.

```typescript
import { trim } from 'es-toolkit/compat';

// 앞뒤 공백 제거
trim('  hello  ');
// Returns: 'hello'

// 지정된 문자 제거
trim('--hello--', '-');
// Returns: 'hello'

// 배열로 여러 문자 제거
trim('##hello##', ['#', 'o']);
// Returns: 'hell'
```

`null`이나 `undefined`는 빈 문자열로 처리해요.

```typescript
import { trim } from 'es-toolkit/compat';

trim(null); // ''
trim(undefined); // ''
```

#### 파라미터

- `str` (`string`, 선택): 정리할 문자열이에요.
- `chars` (`string`, 선택): 제거할 문자들이에요. 지정하지 않으면 공백을 제거해요.

#### 반환 값

(`string`): 앞뒤의 지정된 문자들이 제거된 문자열을 반환해요.
