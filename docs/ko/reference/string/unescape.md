# unescape

`&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;` 같은 HTML 엔티티 문자열을 원래 문자열로 바꿔요. [`escape`](./escape.md)의 반대 연산이에요.

## 인터페이스

```typescript
function unescape(str: string): string;
```

### 파라미터

- `str` (`string`): 변환할 문자열.

### 반환 값

(`string`): 변환된 문자열.

## 예시

```typescript
import { unescape } from 'es-toolkit/string';

unescape('This is a &lt;div&gt; element.'); // returns 'This is a <div> element.'
unescape('This is a &quot;quote&quot;'); // returns 'This is a "quote"'
unescape('This is a &#39;quote&#39;'); // returns 'This is a 'quote''
unescape('This is a &amp; symbol'); // returns 'This is a & symbol'
```
