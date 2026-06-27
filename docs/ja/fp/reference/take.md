# take (関数型プログラミング)

配列の先頭から `count` 個の要素を返す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, take(count));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`take`](../../reference/array/take.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`take` は先頭から `count` 個の要素を返します。`count` が配列の長さより大きい場合は、配列全体を返します。`count` が非負の整数のとき、これは **遅延評価に対応** しています。[`pipe`](./pipe.md) の中では `count` 個の要素が集まった時点で走査を終了するため、それより前の遅延処理は残りの入力を処理しません。

```typescript
import { map, pipe, take } from 'es-toolkit/fp';

pipe([1, 2, 3, 4, 5], take(3)); // => [1, 2, 3]

// 長さより大きい `count` は配列全体を返します。
pipe([1, 2, 3], take(5)); // => [1, 2, 3]

// 早期終了: `map` は 3 回だけ実行されます。
pipe([1, 2, 3, 4, 5], map(expensiveTransform), take(3));
```

#### パラメータ

- `count` (`number`): 配列の先頭から取り出す要素の数です。負の `count` は `es-toolkit` の `take` に従い、末尾から取り除きます。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` を、最大で `count` 個の要素を持つ新しい `T[]` に変換する関数です。
