# camelCase

文字列をキャメルケースに変換します。

キャメルケースは、複数の単語で構成される識別子の最初の単語を小文字で書き、続く単語の最初の文字を[大文字](./capitalize.md)で連結する命名規則です。例えば、`camelCase`のように記述します。

## インターフェース

```typescript
function camelCase(str: string): string;
```

### パラメータ

- `str` (`string`): キャメルケースに変換する文字列です。

### 戻り値

(`string`): キャメルケースに変換された文字列です。

## 例

```typescript
import { camelCase } from 'es-toolkit/string';

camelCase('camelCase'); // 'camelCase' を返します
camelCase('some whitespace'); // 'someWhitespace' を返します
camelCase('hyphen-text'); // 'hyphenText' を返します
camelCase('HTTPRequest'); // 'httpRequest' を返します
camelCase('Keep unicode 😅'); // 'keepUnicode😅' を返します
```
