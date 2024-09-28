# constantCase

문자열을 상수 케이스로 변환해요.

상수 케이스는 각 단어가 대문자로 쓰여지고 밑줄(`_`)로 구분되는 명명 규칙이에요. 예를 들어, `CONSTANT_CASE` 처럼 표기해요.

## 인터페이스

```typescript
function constantCase(str: string): string;
```

### 파라미터

- `str` (`string`): 상수 케이스로 변경할 문자열.

### 반환 값

(`string`): 상수 케이스로 변환된 문자열.

## 예시

```typescript
const convertedStr1 = constantCase('camelCase') // returns 'CAMEL_CASE'
const convertedStr2 = constantCase('some whitespace') // returns 'SOME_WHITESPACE'
const convertedStr3 = constantCase('hyphen-text') // returns 'HYPHEN_TEXT'
const convertedStr4 = constantCase('HTTPRequest') // returns 'HTTP_REQUEST'
```