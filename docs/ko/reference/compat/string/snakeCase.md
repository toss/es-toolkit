# snakeCase (Lodash 호환성)

::: warning `es-toolkit`의 `snakeCase`를 사용하세요

이 `snakeCase` 함수는 `null`이나 `undefined` 처리를 위한 정규화 로직으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [snakeCase](../../string/snakeCase.md)를 사용하세요.

:::

문자열을 스네이크 케이스로 변환해요.

```typescript
const snakeCased = snakeCase(str);
```

## 레퍼런스

### `snakeCase(str)`

문자열을 스네이크 케이스(snake_case)로 변환하고 싶을 때 `snakeCase`를 사용하세요. 스네이크 케이스는 각 단어를 소문자로 쓰고 밑줄(_)로 연결하는 명명 규칙이에요.

```typescript
import { snakeCase } from 'es-toolkit/compat';

// 카멜 케이스 변환
snakeCase('camelCase');
// Returns: 'camel_case'

// 공백으로 구분된 문자열 변환
snakeCase('some whitespace');
// Returns: 'some_whitespace'

// 하이픈으로 구분된 문자열 변환
snakeCase('hyphen-text');
// Returns: 'hyphen_text'

// 대문자가 연속으로 나타나는 경우
snakeCase('HTTPRequest');
// Returns: 'http_request'
```

`null`이나 `undefined`는 빈 문자열로 처리해요.

```typescript
import { snakeCase } from 'es-toolkit/compat';

snakeCase(null); // ''
snakeCase(undefined); // ''
```

#### 파라미터

- `str` (`string`, 선택): 스네이크 케이스로 변환할 문자열이에요.

### 반환 값

(`string`): 스네이크 케이스로 변환된 문자열을 반환해요.
