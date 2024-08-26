# snakeCase

文字列をスネークケースに変換します。

スネークケースは、複数の単語で構成される識別子において、各単語を小文字で記述し、単語間をアンダースコア（_）で連結する命名規則です。例えば、`snake_case` のように記述します。

## インターフェース

```typescript
function snakeCase(str: string): string;
```

### パラメータ

- `str` (`string`): スネークケースに変換する文字列です。

### 戻り値

(`string`) スネークケースに変換された文字列です。

## 例

```typescript
import { snakeCase } from 'es-toolkit/string';

snakeCase('camelCase'); // 'camel_case' を返します
snakeCase('some whitespace'); // 'some_whitespace' を返します
snakeCase('hyphen-text'); // 'hyphen_text' を返します
snakeCase('HTTPRequest'); // 'http_request' を返します
```
