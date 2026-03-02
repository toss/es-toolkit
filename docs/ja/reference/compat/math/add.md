# add (Lodash 互換性)

::: warning `+` 演算子を使用してください

この `add` 関数は複雑な型変換と文字列処理により動作が遅くなります。

代わりに、より高速でシンプルな `+` 演算子を使用してください。

:::

2つの値を加算します。

```typescript
const result = add(value, other);
```

## 使用法

### `add(value, other)`

2つの値を加算したい場合は `add` を使用してください。数値だけでなく文字列も処理できます。

```typescript
import { add } from 'es-toolkit/compat';

// 数値の加算
add(2, 3);
// Returns: 5

add(1.5, 2.5);
// Returns: 4

// NaN の処理
add(NaN, 5);
// Returns: NaN

add(10, NaN);
// Returns: NaN
```

文字列が含まれる場合は文字列連結として動作します。

```typescript
import { add } from 'es-toolkit/compat';

add('2', 3);
// Returns: '23'

add(1, '5');
// Returns: '15'

add('hello', 'world');
// Returns: 'helloworld'
```

`undefined` 値は特別に処理されます。

```typescript
import { add } from 'es-toolkit/compat';

add(undefined, undefined);
// Returns: 0

add(5, undefined);
// Returns: 5

add(undefined, 3);
// Returns: 3
```

#### パラメータ

- `value` (`number`): 加算する最初の値です。
- `other` (`number`): 加算する2番目の値です。

#### 戻り値

(`number | string`): 2つの値の合計を返します。文字列が含まれる場合は文字列を返し、そうでなければ数値を返します。
