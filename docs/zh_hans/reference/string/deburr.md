# deburr

将特殊字符和变音符号转换为ASCII字符。

```typescript
const result = deburr(str);
```

## 参考

### `deburr(str)`

当您想将字符串中的特殊字符或变音符号转换为ASCII字符时,请使用 `deburr`。它对于在URL、文件名或搜索功能中规范化字符很有用。

```typescript
import { deburr } from 'es-toolkit/string';

// 基本用法
deburr('café'); // returns 'cafe'
deburr('résumé'); // returns 'resume'
deburr('naïve'); // returns 'naive'
deburr('Zürich'); // returns 'Zurich'
```

它可以处理各种语言的特殊字符。

```typescript
import { deburr } from 'es-toolkit/string';

// 德语
deburr('München'); // returns 'Munchen'
deburr('Björk'); // returns 'Bjork'

// 法语
deburr('Crème brûlée'); // returns 'Creme brulee'
deburr('naïveté'); // returns 'naivete'

// 西班牙语
deburr('niño'); // returns 'nino'
deburr('mañana'); // returns 'manana'
```

可以用于URL生成或文件名清理。

```typescript
import { deburr } from 'es-toolkit/string';

// 生成URL slug
const title = 'Café의 특별한 메뉴';
const slug = deburr(title).toLowerCase().replace(/\s+/g, '-');
// returns 'cafe의-특별한-메뉴'

// 清理文件名
const fileName = 'résumé-김철수.pdf';
const cleanName = deburr(fileName); // returns 'resume-김철수.pdf'
```

它使搜索功能中的字符串比较更容易。

```typescript
import { deburr } from 'es-toolkit/string';

function searchMatch(query: string, target: string): boolean {
  const normalizedQuery = deburr(query.toLowerCase());
  const normalizedTarget = deburr(target.toLowerCase());
  return normalizedTarget.includes(normalizedQuery);
}

searchMatch('cafe', 'Café Mocha'); // returns true
searchMatch('resume', 'résumé.pdf'); // returns true
```

#### 参数

- `str` (`string`): 包含特殊字符或变音符号的字符串。

#### 返回值

(`string`): 返回特殊字符和变音符号转换为ASCII字符的新字符串。
