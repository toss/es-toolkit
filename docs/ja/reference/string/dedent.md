# dedent

複数行の文字列のすべての行から共通のインデントを削除します。

コードのインデントに合わせて複数行の文字列を書いても、そのインデントが実際の文字列に含まれないようにします。

```typescript
const text = dedent`
  Hello
  World
`;
```

## 使用法

### `` dedent`text` ``

インデントされたコードの中で複数行の文字列を書きたい時に、タグ付きテンプレートリテラルとして `dedent` を使用してください。空でない行が共通して持つ最小のインデントを見つけてすべての行から削除するため、行同士の相対的なインデントの差は保たれます。最初の行や最後の行が空白のみの場合は削除されます。

```typescript
import { dedent } from 'es-toolkit/string';

// コードのインデントが削除されます
const message = dedent`
  Hello
  World
`;
// messageは'Hello\nWorld'になります

// 行同士の相対的なインデントは保たれます
const list = dedent`
  Items:
    - First
    - Second
`;
// listは'Items:\n  - First\n  - Second'になります

// 補間された値はインデントを削除する前に挿入されます
const name = 'es-toolkit';
const greeting = dedent`
  Hello, ${name}!
`;
// greetingは'Hello, es-toolkit!'になります
```

空白のみの行は空の行になり、Windowsの改行（`\r\n`）は`\n`に正規化されます。

```typescript
import { dedent } from 'es-toolkit/string';

// 空白のみの行は空の行になります
const text = dedent`
  First

  Second
`;
// textは'First\n\nSecond'になります
```

#### パラメータ

- `str` (`TemplateStringsArray`): インデントを削除するテンプレートリテラルです。
- `values` (`unknown[]`): テンプレートリテラルに補間する値です。

#### 戻り値

(`string`): 共通のインデントが削除された文字列を返します。

### `dedent(str)`

ファイルから読み込んだり、コードの他の場所で作られた文字列がすでにある場合は、`dedent` を通常の関数として使用してください。

```typescript
import { dedent } from 'es-toolkit/string';

// すでにある文字列から共通のインデントを削除します
const raw = '  Hello\n    World';
const text = dedent(raw);
// textは'Hello\n  World'になります
```

#### パラメータ

- `str` (`string`): インデントを削除する文字列です。

#### 戻り値

(`string`): 共通のインデントが削除された文字列を返します。

### `dedent(tagFn)`

TC39の`String.dedent`提案のように、他のタグ関数がインデントの削除されたテンプレート文字列を受け取るようにしたい時は、`dedent` にタグ関数を渡してください。

```typescript
import { dedent } from 'es-toolkit/string';

// 他のタグ関数と合成します
const html = dedent((strings, ...values) => strings.join(''));

const result = html`
  <div>Hello</div>
`;
// resultは'<div>Hello</div>'になります
```

#### パラメータ

- `tagFn` (`(strings: TemplateStringsArray, ...values: unknown[]) => T`): 合成するタグ関数です。

#### 戻り値

(`(strings: TemplateStringsArray, ...values: unknown[]) => T`): テンプレート文字列から共通のインデントを削除してから`tagFn`に渡す、新しいタグ関数を返します。
