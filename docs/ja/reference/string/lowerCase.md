# lowerCase

文字列を小文字表記に変換します。

小文字表記は、複数の単語で構成される識別子の各単語を小文字で書き、単語をスペース( )で連結する命名規則です。例えば、`lower case`のように書きます。

## インターフェース

```typescript
function lowerCase(str: string): string;
```

### パラメータ

- `str` (`string`): 小文字に変換する文字列です。

### 戻り値

(`string`) 小文字に変換された文字列です。

## 例

```typescript
import { lowerCase } from 'es-toolkit/string';

lowerCase('camelCase'); // 'camel case' を返します
lowerCase('some whitespace'); // 'some whitespace' を返します
lowerCase('hyphen-text'); // 'hyphen text' を返します
lowerCase('HTTPRequest'); // 'http request' を返します
```
