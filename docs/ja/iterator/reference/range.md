# range (`Iterator`)

一定の間隔で数のシーケンスを遅延的に生成します。

```typescript
const numbers = range(end);
const numbers = range(start, end);
const numbers = range(start, end, step);
```

## 使用法

### `range(end)` / `range(start, end)` / `range(start, end, step)`

配列を確保せずに数のシーケンスを生成するには `range` を使用してください。引数が 1 つの場合は `0` から `end`（含まない）まで `1` ずつ数えます。引数が 2 つの場合は `start`（含む）から始まります。3 番目の引数は間隔を設定し、負の値にすると減っていきます。`es-toolkit/math` の配列版 [`range`](../../reference/math/range.md) と違って、イテレータが消費されるまで数は計算されないため、`range(0, Infinity)` は上限のないカウンターを書く実用的な方法になります。

```typescript
import { range } from 'es-toolkit/iterator';

// 0 から end（含まない）まで数えます。
range(4).toArray();
// 結果: [0, 1, 2, 3]

// 開始と終了を指定します。
range(1, 4).toArray();
// 結果: [1, 2, 3]

// 間隔を指定します。負の間隔も使えます。
range(0, 20, 5).toArray();
// 結果: [0, 5, 10, 15]
range(0, -4, -1).toArray();
// 結果: [0, -1, -2, -3]

// 上限のないカウンターを take で区切ります。
range(0, Infinity).take(3).toArray();
// 結果: [0, 1, 2]
```

#### パラメータ

- `start` (`number`): 範囲の開始の数（含む）です。引数が 1 つだけの場合、デフォルトは `0` です。
- `end` (`number`): 範囲の終了の数（含まない）です。
- `step` (`number`, オプション): 数どうしの間隔です。0 でない整数である必要があります。デフォルトは `1` です。

#### 戻り値

(`IteratorObject<number, undefined>`): 範囲内の数を生成する遅延評価のイテレータです。ネイティブのイテレータヘルパー（`map`、`take`、`toArray` など）をすべて備えているため、そのままチェーンを続けられます。

#### エラー

`step` が 0 でない整数でない場合、エラーを投げます。
