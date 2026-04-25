# kebabCase (Lodash 互換性)

::: warning `es-toolkit` の `kebabCase` を使用してください

この `kebabCase` 関数は、文字列以外の入力値の処理と短縮アポストロフィの除去などにより、動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [kebabCase](../../string/kebabCase.md) を使用してください。

:::

文字列をケバブケースに変換します。

```typescript
const result = kebabCase(str);
```

## 使用法

### `kebabCase(str)`

文字列をケバブケースに変換します。ケバブケースは、各単語を小文字で書き、ダッシュ(-)文字で連結する命名規則です。URLやCSSクラス名で主に使用されます。

```typescript
import { kebabCase } from 'es-toolkit/compat';

kebabCase('camelCase'); // 'camel-case'
kebabCase('some whitespace'); // 'some-whitespace'
kebabCase('hyphen-text'); // 'hyphen-text'
kebabCase('HTTPRequest'); // 'http-request'
```

文字列以外の値も文字列に変換して処理します。

```typescript
import { kebabCase } from 'es-toolkit/compat';

kebabCase(123); // '123'
kebabCase(null); // ''
kebabCase(undefined); // ''
```

#### パラメータ

- `str` (`string | object`,オプション): ケバブケースに変換する値です。

#### 戻り値

(`string`): ケバブケースに変換された文字列を返します。
