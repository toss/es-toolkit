# spread (Lodash 互換性)

::: warning 現代的なスプレッド演算子を使用してください

この `spread` 関数は、特定のインデックスの配列引数を個別の引数に展開する複雑なロジックを処理するため、処理速度が遅くなる可能性があります。

代わりに、より高速で現代的なスプレッド演算子(`...`)を直接使用してください。

:::

配列引数を個別の引数に展開して関数を呼び出す新しい関数を作成します。

```typescript
const spreadFunc = spread(func, argsIndex);
```

## 参照

### `spread(func, argsIndex)`

配列引数を個別の引数に展開して関数を呼び出したい場合は、`spread` を使用してください。配列の位置を指定できるため、他の引数と一緒に使用できます。

```typescript
import { spread } from 'es-toolkit/compat';

// 基本的な使用法 - 最初の引数が配列
function add(a, b) {
  return a + b;
}

const spreadAdd = spread(add);
spreadAdd([1, 2]); // 3

// 2番目の引数が配列の場合
function greet(greeting, names) {
  return `${greeting}, ${names.join(' and ')}!`;
}

const spreadGreet = spread(greet, 1);
spreadGreet('Hello', ['Alice', 'Bob']); // 'Hello, Alice and Bob!'

// 現代的なスプレッド演算子の使用例(推奨)
function modernAdd(a, b) {
  return a + b;
}

const numbers = [1, 2];
modernAdd(...numbers); // 3 - よりシンプルで高速
```

特に配列を関数の引数として渡すときに便利ですが、現代の JavaScript では、スプレッド演算子を使用するのがより一般的です。

#### パラメータ

- `func` (`Function`): 変換する関数です。
- `argsIndex` (`number`, オプション): 配列引数の位置です。デフォルト値は `0` です。

#### 戻り値

(`Function`): 配列引数を展開して呼び出す新しい関数を返します。
