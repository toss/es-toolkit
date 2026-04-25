# kebabCase (Lodash 호환성)

::: warning `es-toolkit`의 `kebabCase`를 사용하세요

이 `kebabCase` 함수는 문자열이 아닌 입력값 처리와 축약 아포스트로피 제거 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [kebabCase](../../string/kebabCase.md)를 사용하세요.

:::

문자열을 케밥 케이스로 변환해요.

```typescript
const result = kebabCase(str);
```

## 사용법

### `kebabCase(str)`

문자열을 케밥 케이스로 변환해요. 케밥 케이스는 각 단어를 소문자로 쓰고 대시(-) 문자로 연결하는 명명 규칙이에요. URL이나 CSS 클래스 이름에서 주로 사용돼요.

```typescript
import { kebabCase } from 'es-toolkit/compat';

kebabCase('camelCase'); // 'camel-case'
kebabCase('some whitespace'); // 'some-whitespace'
kebabCase('hyphen-text'); // 'hyphen-text'
kebabCase('HTTPRequest'); // 'http-request'
```

문자열이 아닌 값도 문자열로 변환해서 처리해요.

```typescript
import { kebabCase } from 'es-toolkit/compat';

kebabCase(123); // '123'
kebabCase(null); // ''
kebabCase(undefined); // ''
```

#### 파라미터

- `str` (`string | object`, 선택): 케밥 케이스로 변환할 값이에요.

#### 반환 값

(`string`): 케밥 케이스로 변환된 문자열을 반환해요.
