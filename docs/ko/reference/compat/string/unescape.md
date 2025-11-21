# unescape (Lodash 호환성)

::: warning `es-toolkit`의 `unescape`를 사용하세요

이 `unescape` 함수는 `null`이나 `undefined` 처리를 위한 변환 로직으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [unescape](../../string/unescape.md)를 사용하세요.

:::

HTML 엔터티를 원래 문자로 변환해요.

```typescript
const unescaped = unescape(str);
```

## 사용법

### `unescape(str)`

HTML 엔터티 `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`를 원래 문자로 되돌리고 싶을 때 `unescape`를 사용하세요. 이는 `escape` 함수의 반대 동작을 해요.

```typescript
import { unescape } from 'es-toolkit/compat';

// HTML 태그 언이스케이프
unescape('This is a &lt;div&gt; element.');
// Returns: 'This is a <div> element.'

// 따옴표 언이스케이프
unescape('This is a &quot;quote&quot;');
// Returns: 'This is a "quote"'

// 작은따옴표 언이스케이프
unescape('This is a &#39;quote&#39;');
// Returns: 'This is a 'quote''

// 앰퍼샌드 언이스케이프
unescape('This is a &amp; symbol');
// Returns: 'This is a & symbol'
```

`null`이나 `undefined`는 빈 문자열로 처리해요.

```typescript
import { unescape } from 'es-toolkit/compat';

unescape(null); // ''
unescape(undefined); // ''
```

#### 파라미터

- `str` (`string`, 선택): 언이스케이프할 문자열이에요.

#### 반환 값

(`string`): HTML 엔터티가 원래 문자로 변환된 문자열을 반환해요.
