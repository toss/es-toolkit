# pascalCase

문자열을 파스칼 표기법으로 변환해요.

```typescript
const converted = pascalCase(str);
```

## 사용법

### `pascalCase(str)`

문자열을 파스칼 표기법으로 변환하고 싶을 때 `pascalCase`를 사용하세요. 파스칼 표기법은 각 단어의 첫 글자를 대문자로 하고 단어 사이를 구분자 없이 연결하는 명명 규칙이에요.

```typescript
import { pascalCase } from 'es-toolkit/string';

// 기본 사용법
pascalCase('pascalCase'); // 'PascalCase'
pascalCase('some whitespace'); // 'SomeWhitespace'

// 하이픈이나 언더스코어로 연결된 단어들
pascalCase('hyphen-text'); // 'HyphenText'
pascalCase('snake_case'); // 'SnakeCase'

// 연속된 대문자 처리
pascalCase('HTTPRequest'); // 'HttpRequest'
pascalCase('XMLHttpRequest'); // 'XmlHttpRequest'
```

다양한 구분자가 포함된 문자열도 올바르게 처리해요.

```typescript
import { pascalCase } from 'es-toolkit/string';

// 여러 구분자가 섞인 경우
pascalCase('camelCase-with_mixed.separators'); // 'CamelCaseWithMixedSeparators'

// 숫자가 포함된 경우
pascalCase('version2.1.0'); // 'Version210'

// 특수 문자가 포함된 경우
pascalCase('user@email.com'); // 'UserEmailCom'
```

#### 파라미터

- `str` (`string`): 파스칼 표기법으로 변환할 문자열이에요.

#### 반환 값

(`string`): 파스칼 표기법으로 변환된 새로운 문자열을 반환해요.

## 데모

::: sandpack

```ts index.ts
import { pascalCase } from 'es-toolkit/string';

console.log(pascalCase('pascalCase'));
```

:::
