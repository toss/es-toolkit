# capitalize (Lodash 호환성)

::: warning `es-toolkit`의 `capitalize`를 사용하세요

이 `capitalize` 함수는 문자열이 아닌 입력값 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [capitalize](../../string/capitalize.md)를 사용하세요.

:::

문자열의 첫 글자를 대문자로, 나머지 글자는 소문자로 변환해요.

```typescript
const result = capitalize(str);
```

## 레퍼런스

### `capitalize(str)`

문자열의 첫 글자를 대문자로, 나머지 글자는 소문자로 변환해요. 단어의 첫 인상을 좋게 하거나 제목 형태로 만들 때 유용해요.

```typescript
import { capitalize } from 'es-toolkit/compat';

capitalize('fred'); // 'Fred'
capitalize('FRED'); // 'Fred'
capitalize('fRED'); // 'Fred'
```

빈 문자열이나 문자열이 아닌 값도 처리할 수 있어요.

```typescript
import { capitalize } from 'es-toolkit/compat';

capitalize(''); // ''
capitalize(123); // '123'
capitalize(null); // ''
capitalize(undefined); // ''
```

#### 파라미터

- `str` (`string`, 선택): 첫 글자를 대문자로 변환할 문자열이에요.

### 반환 값

(`string`): 첫 글자가 대문자이고 나머지가 소문자인 문자열을 반환해요.
