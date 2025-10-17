# escape

HTML에서 특별한 의미를 가진 문자들을 안전한 엔티티로 바꿔요.

```typescript
const result = escape(str);
```

## 레퍼런스

### `escape(str)`

HTML에 텍스트를 안전하게 삽입하려고 할 때 `escape`를 사용하세요. `&`, `<`, `>`, `"`, `'` 같은 특수 문자들을 HTML 엔티티로 변환해서 XSS 공격을 방지하고 HTML이 올바르게 표시되도록 해줘요.

```typescript
import { escape } from 'es-toolkit/string';

// 기본 HTML 특수 문자 처리
escape('<div>Hello World</div>'); // returns '&lt;div&gt;Hello World&lt;/div&gt;'
escape('Tom & Jerry'); // returns 'Tom &amp; Jerry'
escape('"Hello"'); // returns '&quot;Hello&quot;'
escape("'Hello'"); // returns '&#39;Hello&#39;'
```

사용자 입력을 HTML에 표시할 때 보안을 위해 필수적으로 사용해야 해요.

```typescript
import { escape } from 'es-toolkit/string';

// 사용자 입력 처리
const userInput = '<script>alert("XSS")</script>';
const safeHtml = `<div>${escape(userInput)}</div>`;
// returns '<div>&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;</div>'

// 동적 HTML 생성
const title = 'Article "How to & Why"';
const html = `<h1>${escape(title)}</h1>`;
// returns '<h1>Article &quot;How to &amp; Why&quot;</h1>'
```

템플릿이나 댓글 시스템에서 활용할 수 있어요.

```typescript
import { escape } from 'es-toolkit/string';

// 댓글 시스템
function renderComment(comment: string, author: string) {
  return `
    <div class="comment">
      <strong>${escape(author)}</strong>: ${escape(comment)}
    </div>
  `;
}

// 사용 예시
const html = renderComment('I love <coding> & "programming"!', 'John Doe');
// returns '<div class="comment"><strong>John Doe</strong>: I love &lt;coding&gt; &amp; &quot;programming&quot;!</div>'
```

JSON 문자열을 HTML 속성에 넣을 때도 유용해요.

```typescript
import { escape } from 'es-toolkit/string';

const data = { message: 'Hello & "welcome"' };
const jsonString = JSON.stringify(data);
const htmlAttribute = `<div data-info="${escape(jsonString)}"></div>`;
// returns '<div data-info="{&quot;message&quot;:&quot;Hello &amp; \\&quot;welcome\\&quot;&quot;}"></div>'
```

#### 파라미터

- `str` (`string`): HTML에서 안전하게 사용하기 위해 변환할 문자열이에요.

#### 반환 값

(`string`): HTML 엔티티로 변환된 새로운 문자열을 반환해요.
