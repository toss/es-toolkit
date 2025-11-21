# trim

文字列の前後にある空白または指定した文字を削除します。

```typescript
const trimmed = trim(str, chars);
```

## 使用法

### `trim(str, chars?)`

文字列の先頭と末尾から不要な文字を削除したい場合は `trim` を使用してください。特定の文字を指定しない場合は、空白文字を削除します。

```typescript
import { trim } from 'es-toolkit/string';

// 基本的な空白削除
trim('  hello  '); // 'hello'
trim('\t\n  hello  \r\n'); // 'hello'

// 特定の文字を削除
trim('--hello--', '-'); // 'hello'
trim('***hello***', '*'); // 'hello'

// 複数の文字のいずれかに該当する場合に削除
trim('##hello##world##', ['#', 'd']); // 'hello##worl'
```

配列で複数の文字を指定すると、そのいずれかに該当する文字はすべて削除されます。

```typescript
import { trim } from 'es-toolkit/string';

// 複数の文字を配列で指定
trim('!!@@hello@@!!', ['!', '@']); // 'hello'

// 数字と特殊文字を削除
trim('123abc123', ['1', '2', '3']); // 'abc'

// 文字と空白を一緒に削除
trim('  __hello__  ', ['_', ' ']); // 'hello'
```

#### パラメータ

- `str` (`string`): 前後から文字を削除する文字列です。
- `chars` (`string | string[]`, オプション): 削除する文字です。文字列または文字配列を使用できます。デフォルトは空白文字です。

#### 戻り値

(`string`): 指定した文字が前後から削除された新しい文字列を返します。
