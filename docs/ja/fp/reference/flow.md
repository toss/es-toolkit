# flow (関数型プログラミング)

左から右へ関数を合成しますが、すぐには実行せず、再利用できる関数を返します。

```typescript
const fn = flow(...functions);
const result = fn(...args);
```

::: info

`flow` は [`pipe`](./pipe.md) の遅延実行版です。パイプラインを一度作っておき、あとで別のデータで何度も呼び出したいときは `flow` を、すでに値があってすぐに結果が欲しいときは `pipe` を使用してください。

:::

## 使用法

`flow` は一連の関数を受け取り、左から右へ 1 つの関数に合成します。最初の関数は任意の数の引数を受け取れますが、それ以降の関数はすべて単項で、直前の関数の結果を受け取ります。

`pipe` との主な違いは次のとおりです。

- `pipe(value, ...functions)` は具体的な `value` を関数群に**すぐに**通して結果を返します。
- `flow(...functions)` は、呼び出すたびに同じ合成を適用する**新しい関数**を返すため、再利用できます。

```typescript
import { flow } from 'es-toolkit/fp';

const addThenSquare = flow(
  (x: number, y: number) => x + y,
  n => n * n
);

addThenSquare(1, 2); // => 9
addThenSquare(2, 3); // => 25
```

`flow` は内部で `pipe` に委譲するため、任意の `es-toolkit/fp` 関数（または単項関数）を同じように組み込めますし、遅延評価に対応した関数も同じように融合されます。

```typescript
import { filter, flow, map, take } from 'es-toolkit/fp';

const firstTwoEvenSquares = flow(
  map((x: number) => x * x),
  filter(x => x % 2 === 0),
  take(2)
);

firstTwoEvenSquares([1, 2, 3, 4, 5, 6, 7, 8]); // => [4, 16]
```

### 遅延評価

`flow` は `pipe` を通して実行されるため、遅延評価に対応した関数（`map`、`filter`、`take` など）が連続して並ぶと、それらを融合し、各ステップごとに中間配列を作るのではなく入力を要素ごとに処理します。末尾の `take` は走査を早期に終了できるため、それより前の関数は残りの入力に対して実行されません。`pipe` とまったく同じ動作です。

```typescript
import { filter, flow, map, take } from 'es-toolkit/fp';

// 最初の 2 つの偶数の平方だけが計算されます。配列の残りは処理されません。
const pipeline = flow(
  map((x: number) => x * x),
  filter(x => x % 2 === 0),
  take(2)
);

pipeline([1, 2, 3, 4, 5, 6, 7, 8]); // => [4, 16]
```

#### パラメータ

- `functions` (`Array<(...args: any[]) => any>`): 左から右へ合成する関数です。最初の関数は任意の数の引数を受け取れますが、残りはすべて単項で、直前の関数の出力を受け取ります。

#### 戻り値

(`(...args: any[]) => unknown`): すべての関数を順番に適用する新しい関数です。最初の関数と同じパラメータを受け取り、最後の関数の結果を返します。公開されているオーバーロードは、チェーンから正確な型を推論します。
