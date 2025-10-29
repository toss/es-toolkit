# flowRight (Lodash 互換性)

::: warning `es-toolkit` の `flowRight` を使用してください
この `flowRight` 関数は Lodash 互換性のために配列のフラット化処理が追加されており、複雑です。

代わりに、より高速で現代的な `es-toolkit` の [flowRight](../../function/flowRight.md) を使用してください。
:::

与えられた関数を右から左へ順次実行する新しい関数を作成します。

```typescript
const combinedFunc = flowRight(...functions);
```

## 参照

### `flowRight(...functions)`

複数の関数を右から左へ順次実行する1つの合成関数を作成したい場合は `flowRight` を使用してください。データ変換パイプラインを作成する際に便利です。

```typescript
import { flowRight } from 'es-toolkit/compat';

// 基本的な使い方
function add(x, y) {
  return x + y;
}

function square(n) {
  return n * n;
}

function double(n) {
  return n * 2;
}

// 右から左へ実行: double(square(add(x, y)))
const calculate = flowRight(double, square, add);
console.log(calculate(1, 2)); // double(square(add(1, 2))) = double(square(3)) = double(9) = 18

// 配列で関数を渡す
const calculate2 = flowRight([double, square], add);
console.log(calculate2(2, 3)); // 50

// 現代的な代替案（推奨）
const modernCalculate = (x, y) => double(square(add(x, y)));
console.log(modernCalculate(1, 2)); // 18

// または関数チェーンを使用
const chainedCalculate = (x, y) => [x, y]
  .reduce((acc, val, idx) => idx === 0 ? val : acc + val)
  .valueOf()
  |> (n => n * n)
  |> (n => n * 2);
```

一般的に `flow` と反対の順序で動作します。合成関数と似た方式で動作するため直感的です。

#### パラメータ

- `...functions` (`Array<Function | Function[]>`): 右から左へ実行する関数です。配列で渡すこともできます。

#### 戻り値

(`Function`): すべての関数を右から左へ順次実行する新しい合成関数を返します。
