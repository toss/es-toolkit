# kebabCase

文字列をケバブケースに変換します。

```typescript
const result = kebabCase(str);
```

## 参照

### `kebabCase(str)`

文字列をケバブケースに変換したい場合は `kebabCase` を使用してください。ケバブケースは、各単語を小文字で書き、単語間をダッシュ（-）で繋ぐ命名規則です。

```typescript
import { kebabCase } from 'es-toolkit/string';

// キャメルケースをケバブケースに変換する
kebabCase('camelCase');
// 結果：'camel-case'

// 空白を含む文字列を変換する
kebabCase('some whitespace');
// 結果：'some-whitespace'

// すでにケバブケースの文字列はそのまま保持する
kebabCase('hyphen-text');
// 結果：'hyphen-text'

// 大文字を含む文字列を変換する
kebabCase('HTTPRequest');
// 結果：'http-request'
```

この関数は、APIエンドポイントやCSSクラス名、HTML属性などを作成する際に便利です。

#### パラメータ

- `str` (`string`)：ケバブケースに変換する文字列です。

#### 戻り値

(`string`)：ケバブケースに変換された文字列です。
