# pipe (関数型プログラミング)

左から右へ関数を合成し、一連の関数に値を通します。

```typescript
const result = pipe(value, ...functions);
```

::: info

`pipe` は `es-toolkit/fp` の合成を始めるための入り口です。値を左から右へ複数の変換に通したいときに使用してください。

:::

## 使用法

`pipe` は `es-toolkit/fp` のエントリーポイントです。初期値 `value` を受け取り、各関数を順番に適用して、ある関数の結果を次の関数の入力として渡します。変換が実行される順序と同じく上から下へ読めるため、ネストや一時変数がなくなります。

`es-toolkit/fp` のすべての関数はデータを受け取る関数を返すため、そのまま `pipe` に組み込めます。

```typescript
import { map, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3],
  map(x => x * 3)
); // => [3, 6, 9]
```

es-toolkit の関数だけでなく、任意の単項関数を `pipe` の中で使えます。

```typescript
import { pipe } from 'es-toolkit/fp';

pipe(
  '  Hello  ',
  s => s.trim(),
  s => s.toLowerCase()
); // => 'hello'
```

### 遅延評価

遅延評価に対応した関数（`map`、`filter`、`take` など）が連続して並ぶと、`pipe` はそれらを融合し、各ステップごとに中間配列を作るのではなく入力を要素ごとに処理します。末尾の `take` は走査を早期に終了できるため、それより前の関数は残りの入力に対して実行されません。

```typescript
import { filter, map, pipe, take } from 'es-toolkit/fp';

// 最初の 2 つの偶数の平方だけが計算されます。配列の残りは処理されません。
pipe(
  [1, 2, 3, 4, 5, 6, 7, 8],
  map(x => x * x),
  filter(x => x % 2 === 0),
  take(2)
); // => [4, 16]
```

#### パラメータ

- `value` (`T`): パイプラインに最初に渡される値です。
- `functions` (`Array<(input: any) => any>`): 左から右へ適用する関数です。各関数は直前の関数の出力を受け取ります。

#### 戻り値

(`unknown`): すべての関数を `value` に順番に適用した結果です。公開されているオーバーロードは、チェーンから正確な型を推論します。
