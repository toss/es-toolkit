# upperCase (Lodash 호환성)

::: warning `es-toolkit`의 `upperCase`를 사용하세요

이 `upperCase` 함수는 `null`이나 `undefined` 처리를 위한 정규화 로직으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [upperCase](../../string/upperCase.md)를 사용하세요.

:::

문자열을 대문자 케이스로 변환해요.

```typescript
const upperCased = upperCase(str);
```

## 레퍼런스

### `upperCase(str)`

문자열을 대문자 케이스(UPPER CASE)로 변환하고 싶을 때 `upperCase`를 사용하세요. 대문자 케이스는 각 단어를 대문자로 쓰고 공백으로 연결하는 명명 규칙이에요.

```typescript
import { upperCase } from 'es-toolkit/compat';

// 카멜 케이스 변환
upperCase('camelCase');
// Returns: 'CAMEL CASE'

// 공백으로 구분된 문자열 변환
upperCase('some whitespace');
// Returns: 'SOME WHITESPACE'

// 하이픈으로 구분된 문자열 변환
upperCase('hyphen-text');
// Returns: 'HYPHEN TEXT'

// 대문자가 연속으로 나타나는 경우
upperCase('HTTPRequest');
// Returns: 'HTTP REQUEST'
```

`null`이나 `undefined`는 빈 문자열로 처리해요.

```typescript
import { upperCase } from 'es-toolkit/compat';

upperCase(null); // ''
upperCase(undefined); // ''
```

#### 파라미터

- `str` (`string`, 선택): 대문자 케이스로 변환할 문자열이에요.

#### 반환 값

(`string`): 대문자 케이스로 변환된 문자열을 반환해요.
