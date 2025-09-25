# words (Lodash 호환성)

::: warning `es-toolkit`의 `words`를 사용하세요

이 `words` 함수는 `null`이나 `undefined` 처리, 복잡한 유니코드 지원 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [words](../../string/words.md)를 사용하세요.

:::

문자열을 단어들로 나누어요.

```typescript
const wordArray = words(str, pattern);
```

## 레퍼런스

### `words(str, pattern)`

문자열을 단어 단위로 나누고 싶을 때 `words`를 사용하세요. 기본적으로 영문자, 숫자, 이모지 등을 인식하여 단어를 추출해요.

```typescript
import { words } from 'es-toolkit/compat';

// 기본 단어 추출
words('fred, barney, & pebbles');
// Returns: ['fred', 'barney', 'pebbles']

// 카멜 케이스에서 단어 추출
words('camelCaseWord');
// Returns: ['camel', 'Case', 'Word']

// 숫자가 포함된 문자열
words('hello123world');
// Returns: ['hello', '123', 'world']
```

사용자 정의 패턴을 사용하여 단어를 추출할 수도 있어요.

```typescript
import { words } from 'es-toolkit/compat';

// 정규식을 사용한 단어 추출
words('hello world', /\w+/g);
// Returns: ['hello', 'world']

// 문자열 패턴 사용
words('one-two-three', '-');
// Returns: ['-', '-']
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { words } from 'es-toolkit/compat';

words(null); // []
words(undefined); // []
```

#### 파라미터

- `str` (`string`, 선택): 단어로 나눌 문자열이에요.
- `pattern` (`RegExp | string`, 선택): 단어를 매치할 패턴이에요. 기본값은 내장 유니코드 단어 패턴이에요.

#### 반환 값

(`string[]`): 추출된 단어들의 배열을 반환해요.
