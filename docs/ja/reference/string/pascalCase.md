# pascalCase

文字列をパスカルケースに変換します。

パスカルケースは、複数の単語で構成される識別子の各単語の最初の文字を[大文字](./capitalize.md)にして連結する表記法です。例えば、`PascalCase`のように書きます。

## インターフェース

```typescript
function pascalCase(str: string): string;
```

### パラメータ

- `str` (`string`): パスカルケースに変換する文字列。

### 戻り値

(`string`): パスカルケースに変換された文字列。

## 例

```typescript
import { pascalCase } from 'es-toolkit/string';

const convertedStr1 = pascalCase('pascalCase'); // 'PascalCase' を返します
const convertedStr2 = pascalCase('some whitespace'); // 'SomeWhitespace' を返します
const convertedStr3 = pascalCase('hyphen-text'); // 'HyphenText' を返します
const convertedStr4 = pascalCase('HTTPRequest'); // 'HttpRequest' を返します
```

## デモ

::: sandpack

```ts index.ts
import { pascalCase } from 'es-toolkit/string';

console.log(pascalCase('pascalCase'));
```

:::
