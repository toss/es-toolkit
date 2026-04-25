# startCase (Lodash 互換性)

::: warning `es-toolkit`の`startCase`を使用してください

この`startCase`関数は、`null`または`undefined`を処理するための正規化ロジックにより、動作が遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[startCase](../../string/startCase.md)を使用してください。

:::

文字列をスタートケースに変換します。

```typescript
const startCased = startCase(str);
```

## 使用法

### `startCase(str)`

文字列をスタートケース(Start Case)に変換したい場合は、`startCase`を使用してください。スタートケースは、各単語の最初の文字を大文字にし、スペースで区切る命名規則です。

```typescript
import { startCase } from 'es-toolkit/compat';

// 通常の文字列を変換
startCase('hello world');
// 戻り値: 'Hello World'

// すでに大文字の単語はそのまま保持
startCase('HELLO WORLD');
// 戻り値: 'HELLO WORLD'

// ハイフンで区切られた文字列を変換
startCase('hello-world');
// 戻り値: 'Hello World'

// アンダースコアで区切られた文字列を変換
startCase('hello_world');
// 戻り値: 'Hello World'
```

`null`または`undefined`は空文字列として処理されます。

```typescript
import { startCase } from 'es-toolkit/compat';

startCase(null); // ''
startCase(undefined); // ''
```

#### パラメータ

- `str` (`string`, オプション): スタートケースに変換する文字列です。

#### 戻り値

(`string`): スタートケースに変換された文字列を返します。
