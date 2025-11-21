# trimStart

文字列の先頭にある空白または指定した文字を削除します。

```typescript
const trimmed = trimStart(str, chars);
```

## 使用法

### `trimStart(str, chars?)`

文字列の先頭から不要な文字を削除したい場合は `trimStart` を使用してください。特定の文字を指定しない場合は空白文字を削除します。

```typescript
import { trimStart } from 'es-toolkit/string';

// 基本的な空白削除
trimStart('  hello'); // 'hello'
trimStart('\t\n  hello'); // 'hello'

// 特定の文字を削除
trimStart('---hello', '-'); // 'hello'
trimStart('000123', '0'); // '123'
trimStart('abcabcabc', 'a'); // 'bcabcabc'
```

複数の文字を配列で指定すると、そのいずれかに該当する文字はすべて削除されます。

```typescript
import { trimStart } from 'es-toolkit/string';

// 複数の文字を配列で指定
trimStart('!!@@hello', ['!', '@']); // 'hello'

// 数字と特殊文字を削除
trimStart('123abc', ['1', '2', '3']); // 'abc'

// 文字と空白を一緒に削除
trimStart('  __hello', ['_', ' ']); // 'hello'
```

#### パラメータ

- `str` (`string`): 先頭から文字を削除する文字列です。
- `chars` (`string | string[]`, オプション): 削除する文字です。文字列または文字の配列を使用できます。デフォルトは空白文字です。

#### 戻り値

(`string`): 指定した文字が先頭から削除された新しい文字列を返します。
