# dedent

複数行の文字列から各行の共通インデントを削除します。

## インターフェース

```typescript
function dedent(str: string): string;
function dedent(str: TemplateStringsArray, ...values: unknown[]): string;
function dedent<T>(
  tagFn: (strings: TemplateStringsArray, ...values: unknown[]) => T
): (strings: TemplateStringsArray, ...values: unknown[]) => T;
```

### パラメータ

- `str` (`string | TemplateStringsArray | Function`): インデントを削除する文字列、テンプレートリテラル、またはタグ関数。
- `values` (`unknown[]`): タグ付きテンプレートリテラルとして使用する際に挿入する値。

### 戻り値

(`string | Function`): 共通インデントが削除された文字列、または合成されたタグ関数。

## 例

```typescript
import { dedent } from 'es-toolkit/string';

// 通常の関数として使用
dedent('  hello\n  world');
// 結果: 'hello\nworld'

// タグ付きテンプレートリテラルとして使用
dedent`
  hello
  world
`;
// 結果: 'hello\nworld'

// 相対的なインデントを保持します
dedent`
  hello
    world
`;
// 結果: 'hello\n  world'

// 補間をサポートします
const name = 'world';
dedent`
  hello
  ${name}
`;
// 結果: 'hello\nworld'

// タグ合成
const html = dedent((strings, ...values) => strings.join(''));
html` <div>Hello</div> `;
// 結果: '<div>Hello</div>'
```
