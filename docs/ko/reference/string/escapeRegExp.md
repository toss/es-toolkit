# escapeRegExp

정규식에서 특별한 의미를 가진 문자들을 일반 문자로 바꿔요.

```typescript
const result = escapeRegExp(str);
```

## 사용법

### `escapeRegExp(str)`

문자열을 정규식 패턴에 안전하게 사용하고 싶을 때 `escapeRegExp`를 사용하세요. `^`, `$`, `\`, `.`, `*`, `+`, `?`, `(`, `)`, `[`, `]`, `{`, `}`, `|` 같은 정규식 특수 문자들을 이스케이프해서 문자 그대로 매칭되도록 해줘요.

```typescript
import { escapeRegExp } from 'es-toolkit/string';

// 기본 사용법
escapeRegExp('Hello.'); // returns 'Hello\\.'
escapeRegExp('(test)'); // returns '\\(test\\)'
escapeRegExp('user@domain.com'); // returns 'user@domain\\.com'
escapeRegExp('[abc]'); // returns '\\[abc\\]'
```

사용자 입력을 정규식 패턴으로 사용할 때 필수적이에요.

```typescript
import { escapeRegExp } from 'es-toolkit/string';

// 사용자 검색어를 정규식으로 사용
function searchInText(text: string, searchTerm: string): boolean {
  const escapedTerm = escapeRegExp(searchTerm);
  const regex = new RegExp(escapedTerm, 'i'); // 대소문자 무관
  return regex.test(text);
}

searchInText('Visit https://example.com', 'https://example.com'); // returns true
searchInText('Price: $19.99', '$19.99'); // returns true
```

문자열 치환에서도 활용할 수 있어요.

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

파일 경로나 URL 처리에 유용해요.

```typescript
import { escapeRegExp } from 'es-toolkit/string';

// 파일 확장자 검사
function hasExtension(filename: string, extension: string): boolean {
  const escapedExt = escapeRegExp(extension);
  const regex = new RegExp(`\\.${escapedExt}$`, 'i');
  return regex.test(filename);
}

hasExtension('document.pdf', 'pdf'); // returns true
hasExtension('image.jpg', 'pdf'); // returns false

// URL 매칭
function matchesUrl(text: string, url: string): boolean {
  const escapedUrl = escapeRegExp(url);
  const regex = new RegExp(escapedUrl);
  return regex.test(text);
}

const content = 'Visit our site at https://es-toolkit.dev/ for more info';
matchesUrl(content, 'https://es-toolkit.dev/'); // returns true
```

#### 파라미터

- `str` (`string`): 정규식 특수 문자를 이스케이프할 문자열이에요.

#### 반환 값

(`string`): 정규식 특수 문자가 이스케이프된 새로운 문자열을 반환해요.
