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

他のタグ関数と組み合わせて使いたい場合は、`dedent(tagFn)`のようにタグ関数を引数として渡してください。こうして作られた新しいタグ関数は、共通のインデントがあらかじめ削除されたテンプレート文字列を受け取ります。

```typescript
import { dedent } from 'es-toolkit/string';

// 受け取ったPythonコードを実行するタグ関数です
function pythonInterpreter(strings: TemplateStringsArray, ...values: unknown[]) {
  return runPython(strings.join(''));
}

// dedentでラップすると、インデントが削除されたコードを受け取るようになります
const python = dedent(pythonInterpreter);

python`
  def greet():
      print("Hello!")

  greet()
`;
// pythonInterpreterは次のコードを受け取ります:
// 'def greet():\n    print("Hello!")\n\ngreet()'
```

#### パラメータ

- `tagFn` (`(strings: TemplateStringsArray, ...values: unknown[]) => T`): 合成するタグ関数です。

#### 戻り値

(`(strings: TemplateStringsArray, ...values: unknown[]) => T`): テンプレート文字列から共通のインデントを削除してから`tagFn`に渡す、新しいタグ関数を返します。
