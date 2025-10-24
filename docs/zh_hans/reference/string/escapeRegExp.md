# escapeRegExp

将正则表达式中具有特殊意义的字符转换为普通字符。

```typescript
const result = escapeRegExp(str);
```

## 参考

### `escapeRegExp(str)`

当您想在正则表达式模式中安全地使用字符串时,请使用 `escapeRegExp`。它转义正则表达式特殊字符,如 `^`、`$`、`\`、`.`、`*`、`+`、`?`、`(`、`)`、`[`、`]`、`{`、`}` 和 `|`,使它们字面匹配。

```typescript
import { escapeRegExp } from 'es-toolkit/string';

// 基本用法
escapeRegExp('Hello.'); // returns 'Hello\\.'
escapeRegExp('(test)'); // returns '\\(test\\)'
escapeRegExp('user@domain.com'); // returns 'user@domain\\.com'
escapeRegExp('[abc]'); // returns '\\[abc\\]'
```

在将用户输入用作正则表达式模式时这是必不可少的。

```typescript
import { escapeRegExp } from 'es-toolkit/string';

// 将用户搜索词用作正则表达式
function searchInText(text: string, searchTerm: string): boolean {
  const escapedTerm = escapeRegExp(searchTerm);
  const regex = new RegExp(escapedTerm, 'i'); // 不区分大小写
  return regex.test(text);
}

searchInText('Visit https://example.com', 'https://example.com'); // returns true
searchInText('Price: $19.99', '$19.99'); // returns true
```

也可以用于字符串替换。

```typescript
import { escapeRegExp } from 'es-toolkit/string';

function replaceAll(text: string, search: string, replacement: string): string {
  const escapedSearch = escapeRegExp(search);
  const regex = new RegExp(escapedSearch, 'g');
  return text.replace(regex, replacement);
}

const html = '<div>Hello</div> <span>World</span>';
const result = replaceAll(html, '<div>', '<section>');
// returns '<section>Hello</div> <span>World</span>'
```

它对处理文件路径或URL很有用。

```typescript
import { escapeRegExp } from 'es-toolkit/string';

// 检查文件扩展名
function hasExtension(filename: string, extension: string): boolean {
  const escapedExt = escapeRegExp(extension);
  const regex = new RegExp(`\\.${escapedExt}$`, 'i');
  return regex.test(filename);
}

hasExtension('document.pdf', 'pdf'); // returns true
hasExtension('image.jpg', 'pdf'); // returns false

// URL匹配
function matchesUrl(text: string, url: string): boolean {
  const escapedUrl = escapeRegExp(url);
  const regex = new RegExp(escapedUrl);
  return regex.test(text);
}

const content = 'Visit our site at https://es-toolkit.dev/ for more info';
matchesUrl(content, 'https://es-toolkit.dev/'); // returns true
```

#### 参数

- `str` (`string`): 要转义正则表达式特殊字符的字符串。

#### 返回值

(`string`): 返回正则表达式特殊字符已转义的新字符串。
