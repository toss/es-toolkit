# unary (Lodash 互換性)

::: warning `es-toolkit` の `ary` を使用してください

この `unary` 関数は `ary` 関数の特殊なケースとして実装されています。より多くの制御が必要な場合は、`es-toolkit` の [ary](../../function/ary.md) を直接使用する方が効率的です。

代わりに、より高速で現代的な `es-toolkit` の [ary](../../function/ary.md) を使用してください。

:::

関数が最大1つの引数のみを受け取るように制限します。

```typescript
const limitedFunc = unary(func);
```

## 参照

### `unary(func)`

関数が最大1つの引数のみを受け取るように制限したい場合は、`unary` を使用してください。追加で渡される引数はすべて無視されます。

```typescript
import { unary } from 'es-toolkit/compat';

function greet(name, greeting, punctuation) {
  return `${greeting} ${name}${punctuation}`;
}

// 最初の引数のみを受け取る関数に変換
const greetOne = unary(greet);
greetOne('Alice', 'Hello', '!'); // greet('Alice') と同じように動作

// 配列の map 関数と一緒に使用すると便利
const numbers = ['1', '2', '3'];
numbers.map(parseInt); // [1, NaN, NaN] - 予期しない結果
numbers.map(unary(parseInt)); // [1, 2, 3] - 正しい結果
```

#### パラメータ

- `func` (`(...args: any[]) => any`): 引数を制限する関数です。

#### 戻り値

(`(...args: any[]) => any`): 最大1つの引数のみを受け取る新しい関数を返します。
