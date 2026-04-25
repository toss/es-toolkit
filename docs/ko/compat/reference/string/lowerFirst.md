# lowerFirst (Lodash 호환성)

::: warning `es-toolkit`의 `lowerFirst`를 사용하세요

이 `lowerFirst` 함수는 문자열이 아닌 입력값 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [lowerFirst](../../string/lowerFirst.md)를 사용하세요.

:::

문자열의 첫 글자를 소문자로 변환해요.

```typescript
const result = lowerFirst(str);
```

## 사용법

### `lowerFirst(str)`

문자열의 첫 글자를 소문자로 변환해요. 나머지 글자들은 그대로 유지돼요. 변수명을 camelCase로 만들거나 첫 글자만 소문자로 바꾸고 싶을 때 유용해요.

```typescript
import { lowerFirst } from 'es-toolkit/compat';

lowerFirst('fred'); // 'fred'
lowerFirst('Fred'); // 'fred'
lowerFirst('FRED'); // 'fRED'
lowerFirst(''); // ''
```

문자열이 아닌 값도 문자열로 변환해서 처리해요.

```typescript
import { lowerFirst } from 'es-toolkit/compat';

lowerFirst(123); // '123'
lowerFirst(null); // ''
lowerFirst(undefined); // ''
```

#### 파라미터

- `str` (`string`, 선택): 첫 글자를 소문자로 변환할 문자열이에요.

#### 반환 값

(`string`): 첫 글자가 소문자로 변환된 문자열을 반환해요.
