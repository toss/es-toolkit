# upperCase

문자열을 대문자 표기법으로 변환해요.

대문자 표기법은 여러 단어로 구성된 식별자의 각 단어를 대문자로 쓰고, 단어를 공백(` `)으로 연결하는 명명 규칙이에요. 예를 들어 `UPPER CASE`처럼 써요.

## 인터페이스

```typescript
function upperCase(str: string): string;
```

### 파라미터

- `str` (`string`): 대문자로 변경할 문자열.

### 반환 값

(`string`): 대문자로 변환된 문자열.

## 예시

```typescript
const convertedStr1 = upperCase('camelCase'); // returns 'CAMEL CASE'
const convertedStr2 = upperCase('some whitespace'); // returns 'SOME WHITESPACE'
const convertedStr3 = upperCase('hyphen-text'); // returns 'HYPHEN TEXT'
const convertedStr4 = upperCase('HTTPRequest'); // returns 'HTTP REQUEST'
```
