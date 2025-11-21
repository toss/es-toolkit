# camelCase (Lodash 호환성)

::: warning `es-toolkit`의 `camelCase`를 사용하세요

이 `camelCase` 함수는 문자열이 아닌 입력값 처리와 축약 아포스트로피 제거 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [camelCase](../../string/camelCase.md)를 사용하세요.

:::

문자열을 카멜 케이스로 변환해요.

```typescript
const result = camelCase(str);
```

## 사용법

### `camelCase(str)`

문자열을 카멜 케이스로 변환해요. 카멜 케이스는 첫 번째 단어는 소문자로 시작하고, 이후 단어들의 첫 글자는 대문자로 하여 공백 없이 연결하는 명명 규칙이에요.

```typescript
import { camelCase } from 'es-toolkit/compat';

camelCase('camelCase'); // 'camelCase'
camelCase('some whitespace'); // 'someWhitespace'
camelCase('hyphen-text'); // 'hyphenText'
camelCase('HTTPRequest'); // 'httpRequest'
```

문자열이 아닌 값도 문자열로 변환해서 처리해요.

```typescript
import { camelCase } from 'es-toolkit/compat';

camelCase(123); // '123'
camelCase(null); // ''
camelCase(undefined); // ''
```

#### 파라미터

- `str` (`string | object`, 선택): 카멜 케이스로 변환할 값이에요.

#### 반환 값

(`string`): 카멜 케이스로 변환된 문자열을 반환해요.
