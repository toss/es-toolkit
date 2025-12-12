# startCase (Lodash 호환성)

::: warning `es-toolkit`의 `startCase`를 사용하세요

이 `startCase` 함수는 `null`이나 `undefined` 처리를 위한 정규화 로직으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [startCase](../../string/startCase.md)를 사용하세요.

:::

문자열을 스타트 케이스로 변환해요.

```typescript
const startCased = startCase(str);
```

## 사용법

### `startCase(str)`

문자열을 스타트 케이스(Start Case)로 변환하고 싶을 때 `startCase`를 사용하세요. 스타트 케이스는 각 단어의 첫 글자를 대문자로 쓰고 공백으로 구분하는 명명 규칙이에요.

```typescript
import { startCase } from 'es-toolkit/compat';

// 일반 문자열 변환
startCase('hello world');
// Returns: 'Hello World'

// 이미 대문자인 단어는 그대로 유지
startCase('HELLO WORLD');
// Returns: 'HELLO WORLD'

// 하이픈으로 구분된 문자열 변환
startCase('hello-world');
// Returns: 'Hello World'

// 밑줄로 구분된 문자열 변환
startCase('hello_world');
// Returns: 'Hello World'
```

`null`이나 `undefined`는 빈 문자열로 처리해요.

```typescript
import { startCase } from 'es-toolkit/compat';

startCase(null); // ''
startCase(undefined); // ''
```

#### 파라미터

- `str` (`string`, 선택): 스타트 케이스로 변환할 문자열이에요.

#### 반환 값

(`string`): 스타트 케이스로 변환된 문자열을 반환해요.
