# pascalCase

문자열을 파스칼 표기법으로 변환해요.

파스칼 표기법은 여러 단어로 구성된 식별자의 각 단어의 첫 문자를 [대문자](./capitalize.md)로 연결하는 표기법이에요. 예를 들어 `PascalCase`처럼 써요.

## 인터페이스

```typescript
function pascalCase(str: string): string;
```

### 파라미터

- `str` (`string`): 파스칼 표기법으로 변환할 문자열.

### 반환 값

(`string`): 파스칼 표기법으로 변환된 문자열.

## 예시

```typescript
import { pascalCase } from 'es-toolkit/string';

const convertedStr1 = pascalCase('pascalCase'); // returns 'PascalCase'
const convertedStr2 = pascalCase('some whitespace'); // returns 'SomeWhitespace'
const convertedStr3 = pascalCase('hyphen-text'); // returns 'HyphenText'
const convertedStr4 = pascalCase('HTTPRequest'); // returns 'HttpRequest'
```

## 데모

::: sandpack

```ts index.ts
import { pascalCase } from 'es-toolkit/string';

console.log(pascalCase('pascalCase'));
```

:::
