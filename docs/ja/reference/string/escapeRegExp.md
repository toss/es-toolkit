# escapeRegExp

正規表現で特別な意味を持つ文字を通常の文字に変換します。

```typescript
const result = escapeRegExp(str);
```

## 使用法

### `escapeRegExp(str)`

文字列を正規表現パターンで安全に使用したいときは`escapeRegExp`を使用します。`^`、`$`、`\`、`.`、`*`、`+`、`?`、`(`、`)`、`[`、`]`、`{`、`}`、`|`のような正規表現特殊文字をエスケープして、文字通りにマッチングされるようにします。

```typescript
import { escapeRegExp } from 'es-toolkit/string';

// 基本的な使い方
escapeRegExp('Hello.'); // returns 'Hello\\.'
escapeRegExp('(test)'); // returns '\\(test\\)'
escapeRegExp('user@domain.com'); // returns 'user@domain\\.com'
escapeRegExp('[abc]'); // returns '\\[abc\\]'
```

ユーザー入力を正規表現パターンとして使用するときは必須です。

```typescript
import { escapeRegExp } from 'es-toolkit/string';

// ユーザー検索語を正規表現として使用
function searchInText(text: string, searchTerm: string): boolean {
  const escapedTerm = escapeRegExp(searchTerm);
  const regex = new RegExp(escapedTerm, 'i'); // 大文字小文字を区別しない
  return regex.test(text);
}

searchInText('Visit https://example.com', 'https://example.com'); // returns true
searchInText('Price: $19.99', '$19.99'); // returns true
```

文字列置換でも活用できます。

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

ファイルパスやURLの処理に便利です。

```typescript
import { escapeRegExp } from 'es-toolkit/string';

// ファイル拡張子の確認
function hasExtension(filename: string, extension: string): boolean {
  const escapedExt = escapeRegExp(extension);
  const regex = new RegExp(`\\.${escapedExt}$`, 'i');
  return regex.test(filename);
}

hasExtension('document.pdf', 'pdf'); // returns true
hasExtension('image.jpg', 'pdf'); // returns false

// URLマッチング
function matchesUrl(text: string, url: string): boolean {
  const escapedUrl = escapeRegExp(url);
  const regex = new RegExp(escapedUrl);
  return regex.test(text);
}

const content = 'Visit our site at https://es-toolkit.dev/ for more info';
matchesUrl(content, 'https://es-toolkit.dev/'); // returns true
```

#### パラメータ

- `str` (`string`): 正規表現特殊文字をエスケープする文字列です。

#### 戻り値

(`string`): 正規表現特殊文字がエスケープされた新しい文字列を返します。
