# trimStart (Lodash 호환성)

::: warning `es-toolkit`의 `trimStart`를 사용하세요

이 `trimStart` 함수는 `null`이나 `undefined` 처리, 파라미터 순서 변경 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [trimStart](../../string/trimStart.md)를 사용하세요.

:::

문자열의 앞쪽 공백이나 지정된 문자들을 제거해요.

```typescript
const trimmed = trimStart(str, chars);
```

## 레퍼런스

### `trimStart(str, chars)`

문자열의 앞쪽에서 공백이나 특정 문자들을 제거하고 싶을 때 `trimStart`를 사용하세요. `chars`를 지정하지 않으면 앞쪽 공백만 제거해요.

```typescript
import { trimStart } from 'es-toolkit/compat';

// 앞쪽 공백 제거
trimStart('  abc  ');
// Returns: 'abc  '

// 지정된 문자 제거
trimStart('-_-abc-_-', '_-');
// Returns: 'abc-_-'

// 문자열의 앞쪽에만 적용
trimStart('abc', 'c');
// Returns: 'abc'
```

`null`이나 `undefined`는 빈 문자열로 처리해요.

```typescript
import { trimStart } from 'es-toolkit/compat';

trimStart(null); // ''
trimStart(undefined); // ''
```

#### 파라미터

- `str` (`string`, 선택): 앞쪽을 정리할 문자열이에요.
- `chars` (`string`, 선택): 제거할 문자들이에요. 지정하지 않으면 공백을 제거해요.

#### 반환 값

(`string`): 앞쪽의 지정된 문자들이 제거된 문자열을 반환해요.
