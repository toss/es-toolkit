# escapeRegExp (Lodash 호환성)

::: warning `es-toolkit`의 `escapeRegExp`를 사용하세요

이 `escapeRegExp` 함수는 문자열이 아닌 입력값 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [escapeRegExp](../../string/escapeRegExp.md)를 사용하세요.

:::

문자열에서 정규 표현식 특수 문자를 이스케이프해요.

```typescript
const result = escapeRegExp(str);
```

## 사용법

### `escapeRegExp(str)`

문자열에서 정규 표현식 특수 문자 `^`, `$`, `\`, `.`, `*`, `+`, `?`, `(`, `)`, `[`, `]`, `{`, `}`, `|`를 이스케이프해요. 동적으로 정규 표현식을 생성할 때 문자열을 문자 그대로 처리하고 싶을 때 유용해요.

```typescript
import { escapeRegExp } from 'es-toolkit/compat';

escapeRegExp('[es-toolkit](https://es-toolkit.dev/)');
// '\\[es-toolkit\\]\\(https://es-toolkit\\.dev/\\)'

escapeRegExp('$^{}.+*?()[]|\\');
// '\\$\\^\\{\\}\\.\\+\\*\\?\\(\\)\\[\\]\\|\\\\'
```

문자열이 아닌 값도 문자열로 변환해서 처리해요.

```typescript
import { escapeRegExp } from 'es-toolkit/compat';

escapeRegExp(123); // '123'
escapeRegExp(null); // ''
escapeRegExp(undefined); // ''
```

#### 파라미터

- `str` (`string`, 선택): 정규 표현식 특수 문자를 이스케이프할 문자열이에요.

#### 반환 값

(`string`): 정규 표현식 특수 문자가 이스케이프된 문자열을 반환해요.
