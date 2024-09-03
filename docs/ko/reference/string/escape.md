# escape

`"&"`, `"<"`, `">"`, `'"'`, and `"'"` 같은 문자열을 HTML에 쓰기 안전한 엔티티 문자열로 바꿔요. 예를 들어서, `"<"`은 `"&lt;"`가 돼요.

## 인터페이스

```typescript
function escape(str: string): string;
```

### 파라미터

- `str` (`string`): HTML에서 쓰기 안전하게 바꿀 문자열.

### 반환 값

(`string`): 변환된 문자열.

## 예시

```typescript
import { escape } from 'es-toolkit/string';

escape('This is a <div> element.'); // returns 'This is a &lt;div&gt; element.'
escape('This is a "quote"'); // returns 'This is a &quot;quote&quot;'
escape("This is a 'quote'"); // returns 'This is a &#39;quote&#39;'
escape('This is a & symbol'); // returns 'This is a &amp; symbol'
```
