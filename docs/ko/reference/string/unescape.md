# unescape

HTML 엔티티 문자를 원래 문자로 변환해요.

```typescript
const result = unescape(str);
```

## 레퍼런스

### `unescape(str)`

HTML에서 사용되는 엔티티 문자들을 원래 문자로 바꾸고 싶을 때 `unescape`를 사용하세요. `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;` 같은 HTML 엔티티를 `&`, `<`, `>`, `"`, `'` 문자로 변환해요. [`escape`](./escape.md) 함수의 반대 동작을 해요.

```typescript
import { unescape } from 'es-toolkit/string';

// HTML 태그 엔티티를 원래 문자로 변환해요
unescape('This is a &lt;div&gt; element.');
// 반환 값: 'This is a <div> element.'

// 따옴표 엔티티를 원래 문자로 변환해요
unescape('This is a &quot;quote&quot;');
// 반환 값: 'This is a "quote"'

// 작은따옴표 엔티티를 원래 문자로 변환해요
unescape('This is a &#39;quote&#39;');
// 반환 값: 'This is a 'quote''

// 앰퍼샌드 엔티티를 원래 문자로 변환해요
unescape('This is a &amp; symbol');
// 반환 값: 'This is a & symbol'
```

HTML 폼이나 URL에서 받은 데이터를 처리할 때 유용해요:

```typescript
// 사용자 입력에서 HTML 엔티티를 변환해요
const userInput = 'My favorite tag is &lt;button&gt;';
const converted = unescape(userInput);
console.log(converted); // 'My favorite tag is <button>'

// 여러 엔티티가 섞인 문자열도 변환할 수 있어요
const mixed = '&quot;Hello &amp; Welcome&quot; &lt;says the &gt; user';
const result = unescape(mixed);
console.log(result); // '"Hello & Welcome" <says the > user'
```

#### 파라미터

- `str` (`string`): 변환할 문자열이에요.

#### 반환 값

(`string`): HTML 엔티티가 원래 문자로 변환된 문자열을 반환해요.
