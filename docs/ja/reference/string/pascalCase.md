# pascalCase

文字列をパスカルケースに変換します。

```typescript
const converted = pascalCase(str);
```

## 使用法

### `pascalCase(str)`

文字列をパスカルケースに変換したい場合は `pascalCase` を使用してください。パスカルケースは、各単語の最初の文字を大文字にし、単語間を区切り文字なしで連結する命名規則です。

```typescript
import { pascalCase } from 'es-toolkit/string';

// 基本的な使用法
pascalCase('pascalCase'); // 'PascalCase'
pascalCase('some whitespace'); // 'SomeWhitespace'

// ハイフンやアンダースコアで連結された単語
pascalCase('hyphen-text'); // 'HyphenText'
pascalCase('snake_case'); // 'SnakeCase'

// 連続する大文字の処理
pascalCase('HTTPRequest'); // 'HttpRequest'
pascalCase('XMLHttpRequest'); // 'XmlHttpRequest'
```

様々な区切り文字が含まれる文字列も正しく処理します。

```typescript
import { pascalCase } from 'es-toolkit/string';

// 複数の区切り文字が混在する場合
pascalCase('camelCase-with_mixed.separators'); // 'CamelCaseWithMixedSeparators'

// 数字が含まれる場合
pascalCase('version2.1.0'); // 'Version210'

// 特殊文字が含まれる場合
pascalCase('user@email.com'); // 'UserEmailCom'
```

#### パラメータ

- `str` (`string`): パスカルケースに変換する文字列です。

#### 戻り値

(`string`): パスカルケースに変換された新しい文字列を返します。

## デモ

::: sandpack

```ts index.ts
import { pascalCase } from 'es-toolkit/string';

console.log(pascalCase('pascalCase'));
```

:::
