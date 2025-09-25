# padStart (Lodash 호환성)

::: warning JavaScript의 `String.prototype.padStart`를 사용하세요

이 `padStart` 함수는 문자열이 아닌 값 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 JavaScript의 `String.prototype.padStart`를 사용하세요.

:::

문자열의 앞쪽에 패딩을 추가해서 지정된 길이까지 늘려요.

```typescript
const padded = padStart(str, length, chars);
```

## 레퍼런스

### `padStart(str, length?, chars?)`

문자열이 원하는 길이보다 짧을 때 앞쪽에 패딩 문자를 추가해서 길이를 맞추고 싶을 때 `padStart`를 사용하세요.

```typescript
import { padStart } from 'es-toolkit/compat';

// 공백으로 패딩
padStart('abc', 6);
// Returns: '   abc'

// 특정 문자로 패딩
padStart('abc', 6, '_-');
// Returns: '_-_abc'

// 원래 길이가 더 길면 그대로 반환
padStart('abc', 3);
// Returns: 'abc'
```

`null`이나 `undefined`는 빈 문자열로 처리해요.

```typescript
import { padStart } from 'es-toolkit/compat';

padStart(null, 5, '*');
// Returns: '*****'

padStart(undefined, 3);
// Returns: '   '
```

#### 파라미터

- `str` (`string`, 선택): 패딩을 추가할 문자열이에요.
- `length` (`number`, 선택): 원하는 최종 문자열 길이예요. 기본값은 `0`이에요.
- `chars` (`string`, 선택): 패딩에 사용할 문자예요. 기본값은 `' '`(공백)이에요.

#### 반환 값

(`string`): 앞쪽에 패딩이 추가된 문자열을 반환해요.
