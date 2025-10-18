# escape (Lodash 호환성)

::: warning `es-toolkit`의 `escape`를 사용하세요

이 `escape` 함수는 문자열이 아닌 입력값 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [escape](../../string/escape.md)를 사용하세요.

:::

문자열에서 HTML 특수 문자를 HTML 엔티티로 변환해요.

```typescript
const result = escape(str);
```

## 레퍼런스

### `escape(str)`

문자열에서 `&`, `<`, `>`, `"`, `'` 문자를 해당하는 HTML 엔티티로 변환해요. HTML 문서에 텍스트를 안전하게 삽입할 때 XSS 공격을 방지하는 데 유용해요.

```typescript
import { escape } from 'es-toolkit/compat';

escape('This is a <div> element.'); // 'This is a &lt;div&gt; element.'
escape('This is a "quote"'); // 'This is a &quot;quote&quot;'
escape("This is a 'quote'"); // 'This is a &#39;quote&#39;'
escape('This is a & symbol'); // 'This is a &amp; symbol'
```

문자열이 아닌 값도 문자열로 변환해서 처리해요.

```typescript
import { escape } from 'es-toolkit/compat';

escape(123); // '123'
escape(null); // ''
escape(undefined); // ''
```

#### 파라미터

- `str` (`string`, 선택): HTML 특수 문자를 이스케이프할 문자열이에요.

#### 반환 값

(`string`): HTML 특수 문자가 엔티티로 변환된 문자열을 반환해요.
