# lowerCase (Lodash 호환성)

::: warning `es-toolkit`의 `lowerCase`를 사용하세요

이 `lowerCase` 함수는 문자열이 아닌 입력값 처리와 축약 아포스트로피 제거 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [lowerCase](../../string/lowerCase.md)를 사용하세요.

:::

문자열을 소문자로 된 단어들을 공백으로 분리한 형태로 변환해요.

```typescript
const result = lowerCase(str);
```

## 레퍼런스

### `lowerCase(str)`

문자열을 소문자로 된 단어들을 공백으로 분리한 형태로 변환해요. 각 단어는 소문자로 변환되고 공백 문자로 연결돼요. 사람이 읽기 쉬운 텍스트 형태로 만들 때 유용해요.

```typescript
import { lowerCase } from 'es-toolkit/compat';

lowerCase('camelCase'); // 'camel case'
lowerCase('some whitespace'); // 'some whitespace'
lowerCase('hyphen-text'); // 'hyphen text'
lowerCase('HTTPRequest'); // 'http request'
```

문자열이 아닌 값도 문자열로 변환해서 처리해요.

```typescript
import { lowerCase } from 'es-toolkit/compat';

lowerCase(123); // '123'
lowerCase(null); // ''
lowerCase(undefined); // ''
```

#### 파라미터

- `str` (`string | object`, 선택): 소문자 형태로 변환할 값이에요.

#### 반환 값

(`string`): 소문자로 된 단어들이 공백으로 분리된 문자열을 반환해요.
