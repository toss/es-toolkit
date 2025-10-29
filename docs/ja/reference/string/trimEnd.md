# trimEnd

文字列の末尾にある空白文字または指定された文字を削除します。

```typescript
const trimmed = trimEnd(str, chars);
```

## 参照

### `trimEnd(str, chars?)`

文字列の末尾から不要な文字を削除したい場合は `trimEnd` を使用してください。特定の文字を指定しない場合は、空白文字を削除します。

```typescript
import { trimEnd } from 'es-toolkit/string';

// 基本的な空白文字の削除
trimEnd('hello  '); // 'hello'
trimEnd('hello\t\n  '); // 'hello'

// 特定の文字の削除
trimEnd('hello---', '-'); // 'hello'
trimEnd('123000', '0'); // '123'
trimEnd('abcabcabc', 'c'); // 'abcabcab'
```

複数の文字を配列として指定すると、そのいずれかに該当する文字がすべて削除されます。

```typescript
import { trimEnd } from 'es-toolkit/string';

// 複数の文字を配列として指定
trimEnd('hello!!@@', ['!', '@']); // 'hello'

// 数字と特殊文字の削除
trimEnd('abc123', ['1', '2', '3']); // 'abc'

// 文字と空白文字を一緒に削除
trimEnd('hello__  ', ['_', ' ']); // 'hello'
```

#### パラメータ

- `str` (`string`): 末尾から文字を削除する文字列です。
- `chars` (`string | string[]`, オプション): 削除する文字です。文字列または文字の配列を使用できます。デフォルトは空白文字です。

#### 戻り値

(`string`): 指定された文字が末尾から削除された新しい文字列を返します。

#### エラー

`chars` が文字列で、長さが 1 でない場合はエラーが発生します。
