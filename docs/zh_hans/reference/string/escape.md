# escape

将HTML中具有特殊意义的字符转换为安全的实体。

```typescript
const result = escape(str);
```

## 参考

### `escape(str)`

当您想在HTML中安全插入文本时,请使用 `escape`。它将 `&`、`<`、`>`、`"`、`'` 等特殊字符转换为HTML实体,以防止XSS攻击并确保HTML正确显示。

```typescript
import { escape } from 'es-toolkit/string';

// 处理基本HTML特殊字符
escape('<div>Hello World</div>'); // returns '&lt;div&gt;Hello World&lt;/div&gt;'
escape('Tom & Jerry'); // returns 'Tom &amp; Jerry'
escape('"Hello"'); // returns '&quot;Hello&quot;'
escape("'Hello'"); // returns '&#39;Hello&#39;'
```

在HTML中显示用户输入时,为了安全必须使用它。

```typescript
import { escape } from 'es-toolkit/string';

// 处理用户输入
const userInput = '<script>alert("XSS")</script>';
const safeHtml = `<div>${escape(userInput)}</div>`;
// returns '<div>&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;</div>'

// 生成动态HTML
const title = 'Article "How to & Why"';
const html = `<h1>${escape(title)}</h1>`;
// returns '<h1>Article &quot;How to &amp; Why&quot;</h1>'
```

可以在模板或评论系统中使用。

```typescript
import { escape } from 'es-toolkit/string';

// 评论系统
function renderComment(comment: string, author: string) {
  return `
    <div class="comment">
      <strong>${escape(author)}</strong>: ${escape(comment)}
    </div>
  `;
}

// 使用示例
const html = renderComment('I love <coding> & "programming"!', 'John Doe');
// returns '<div class="comment"><strong>John Doe</strong>: I love &lt;coding&gt; &amp; &quot;programming&quot;!</div>'
```

将JSON字符串放入HTML属性时也很有用。

```typescript
import { escape } from 'es-toolkit/string';

const data = { message: "Hello & \"welcome\"" };
const jsonString = JSON.stringify(data);
const htmlAttribute = `<div data-info="${escape(jsonString)}"></div>`;
// returns '<div data-info="{&quot;message&quot;:&quot;Hello &amp; \\&quot;welcome\\&quot;&quot;}"></div>'
```

#### 参数

- `str` (`string`): 要转换以在HTML中安全使用的字符串。

#### 返回值

(`string`): 返回字符转换为HTML实体的新字符串。
