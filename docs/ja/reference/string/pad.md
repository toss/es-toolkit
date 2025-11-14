# pad

文字列の両側に文字を追加して指定された長さにします。

```typescript
const padded = pad(str, length, chars);
```

## 使用法

### `pad(str, length, chars?)`

文字列が指定された長さよりも短い場合、両側に文字を追加して長さを合わせたいときに `pad` を使用してください。両側に均等に分配できない場合、右側が1文字長くパディングされます。

```typescript
import { pad } from 'es-toolkit/string';

// デフォルトの空白でパディング
pad('abc', 8);
// => '  abc   '

// カスタム文字でパディング
pad('abc', 8, '_-');
// => '_-abc_-_'

// 文字列がすでに目標の長さ以上の場合
pad('abc', 3);
// => 'abc'

pad('abcdef', 3);
// => 'abcdef'
```

パディング文字が目標の長さに均等に分配できない場合、右側が長くなります。

```typescript
import { pad } from 'es-toolkit/string';

pad('abc', 9, '123');
// => '123abc123' (左側3文字、右側3文字)

pad('abc', 10, '123');
// => '123abc1231' (左側3文字、右側4文字)
```

#### パラメータ

- `str` (`string`): パディングする文字列です。
- `length` (`number`): 目標の長さです。
- `chars` (`string`, オプション): パディングに使用する文字です。デフォルト値は `' '` です。

#### 戻り値

(`string`): パディングされた文字列を返します。
