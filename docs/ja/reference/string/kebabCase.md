# kebabCase

文字列をケバブケースに変換します。

ケバブケースは、複数の単語で構成される識別子の各単語を小文字で書き、単語をハイフン（-）で連結する命名規則です。例えば、`kebab-case`のように記述します。

## インターフェース

```typescript
function kebabCase(str: string): string;
```

### パラメータ

- `str` (`string`): ケバブケースに変換する文字列です。

### 戻り値

(`string`) ケバブケースに変換された文字列です。

## 例

```typescript
import { kebabCase } from 'es-toolkit/string';

kebabCase('camelCase'); // 'camel-case' を返します
kebabCase('some whitespace'); // 'some-whitespace' を返します
kebabCase('hyphen-text'); // 'hyphen-text' を返します
kebabCase('HTTPRequest'); // 'http-request' を返します
```
