# trimEnd (Lodash 호환성)

::: warning `es-toolkit`의 `trimEnd`를 사용하세요

이 `trimEnd` 함수는 `null`이나 `undefined` 처리, 파라미터 순서 변경 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [trimEnd](../../string/trimEnd.md)를 사용하세요.

:::

문자열의 뒤쪽 공백이나 지정된 문자들을 제거해요.

```typescript
const trimmed = trimEnd(str, chars);
```

## 사용법

### `trimEnd(str, chars)`

문자열의 뒤쪽에서 공백이나 특정 문자들을 제거하고 싶을 때 `trimEnd`를 사용하세요. `chars`를 지정하지 않으면 뒤쪽 공백만 제거해요.

```typescript
import { trimEnd } from 'es-toolkit/compat';

// 뒤쪽 공백 제거
trimEnd('  abc  ');
// Returns: '  abc'

// 지정된 문자 제거
trimEnd('-_-abc-_-', '_-');
// Returns: '-_-abc'

// 문자열의 뒤쪽에만 적용
trimEnd('abc', 'a');
// Returns: 'abc'
```

`null`이나 `undefined`는 빈 문자열로 처리해요.

```typescript
import { trimEnd } from 'es-toolkit/compat';

trimEnd(null); // ''
trimEnd(undefined); // ''
```

#### 파라미터

- `str` (`string`, 선택): 뒤쪽을 정리할 문자열이에요.
- `chars` (`string`, 선택): 제거할 문자들이에요. 지정하지 않으면 공백을 제거해요.

#### 반환 값

(`string`): 뒤쪽의 지정된 문자들이 제거된 문자열을 반환해요.
