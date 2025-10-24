# snakeCase

文字列をスネークケースに変換します。

```typescript
const converted = snakeCase(str);
```

## 参照

### `snakeCase(str)`

文字列をスネークケースに変換したい場合は `snakeCase` を使用してください。スネークケースは、各単語を小文字で記述し、単語間をアンダースコア(\_)で接続する命名規則です。

```typescript
import { snakeCase } from 'es-toolkit/string';

// 基本的な使い方
snakeCase('camelCase'); // 'camel_case'
snakeCase('some whitespace'); // 'some_whitespace'

// ハイフンや他の区切り文字で接続された単語
snakeCase('hyphen-text'); // 'hyphen_text'
snakeCase('PascalCase'); // 'pascal_case'

// 連続する大文字の処理
snakeCase('HTTPRequest'); // 'http_request'
snakeCase('XMLHttpRequest'); // 'xml_http_request'
```

さまざまな区切り文字を含む文字列も正しく処理します。

```typescript
import { snakeCase } from 'es-toolkit/string';

// 複数の区切り文字が混在している場合
snakeCase('camelCase-with_mixed.separators'); // 'camel_case_with_mixed_separators'

// 数字が含まれている場合
snakeCase('version2.1.0'); // 'version_2_1_0'

// 特殊文字が含まれている場合
snakeCase('user@email.com'); // 'user_email_com'
```

#### パラメータ

- `str` (`string`): スネークケースに変換する文字列です。

#### 戻り値

(`string`): スネークケースに変換された新しい文字列を返します。
