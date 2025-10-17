# flow (Lodash 互換性)

::: warning `es-toolkit` の `flow` を使用してください
この `flow` 関数は Lodash 互換性のために配列のフラット化処理が追加されており、複雑です。

代わりに、より高速で現代的な `es-toolkit` の [flow](../../function/flow.md) を使用してください。
:::

与えられた関数を左から右へ順次実行する新しい関数を作成します。

```typescript
const combinedFunc = flow(...functions);
```

## 参照

### `flow(...functions)`

複数の関数を左から右へ順次実行する1つの合成関数を作成したい場合は `flow` を使用してください。データ変換パイプラインを作成する際に便利です。

```typescript
import { flow } from 'es-toolkit/compat';

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

// 左から右へ実行: double(square(add(x, y)))
const calculate = flow(add, square, double);
console.log(calculate(1, 2)); // double(square(add(1, 2))) = double(square(3)) = double(9) = 18

// 配列で関数を渡す
const calculate2 = flow([add, square], double);
console.log(calculate2(2, 3)); // 50

// 現代的な代替案（推奨）
const modernCalculate = (x, y) => double(square(add(x, y)));
console.log(modernCalculate(1, 2)); // 18

// パイプ演算子を使用（将来の JavaScript）
const pipeCalculate = (x, y) => add(x, y) |> square |> double;

// またはチェーンパターン
class Calculator {
  constructor(value) {
    this.value = value;
  }

  add(n) {
    this.value += n;
    return this;
  }

  square() {
    this.value *= this.value;
    return this;
  }

  double() {
    this.value *= 2;
    return this;
  }

  valueOf() {
    return this.value;
  }
}

const chainedResult = new Calculator(3).square().double().valueOf(); // 18
```

#### パラメータ

- `...functions` (`Array<Function | Function[]>`): 左から右へ実行する関数です。配列で渡すこともできます。

#### 戻り値

(`Function`): すべての関数を左から右へ順次実行する新しい合成関数を返します。
