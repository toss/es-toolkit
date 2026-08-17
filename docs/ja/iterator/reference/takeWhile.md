# takeWhile (`Iterator`向け)

条件が成り立つ間、イテレータの先頭の要素を遅延的に生成します。

```typescript
const leading = takeWhile(source, shouldContinue);
```

## 使用法

### `takeWhile(source, shouldContinue)`

決まった個数ではなく条件に基づいて消費を止めたいときに `takeWhile` を使用してください。たとえば、最初の外れ値が現れるまで測定値を読み取る場合などです。`shouldContinue` が真と評価される値を返す間、要素が生成されます。偽と評価される値を返した最初の要素でイテレーションが停止し（その要素は含まれません）、残りの要素がソースから取り出されることはありません。そのため、無限イテレータを安全に区切る方法になります。ネイティブのイテレータヘルパーには個数ベースの `take` はありますが、条件ベースの `takeWhile` はないため、この関数が提供されています。

```typescript
import { takeWhile } from 'es-toolkit/iterator';

// 先頭に連続する小さい数を生成します。
takeWhile([1, 2, 3, 4, 1].values(), x => x < 3).toArray();
// 結果: [1, 2]

// 無限シーケンスを条件で区切ります。
import { iterate } from 'es-toolkit/iterator';

takeWhile(iterate(1, x => x * 2), x => x < 100).toArray();
// 結果: [1, 2, 4, 8, 16, 32, 64]
```

#### パラメータ

- `source` (`Iterator<T>`): 要素を取り出すイテレータです。
- `shouldContinue` (`(value: T, index: number) => boolean`): 各要素とそのインデックスとともに呼び出されます。偽と評価される値を返すと、イテレーションが停止します。

#### 戻り値

(`IteratorObject<T, undefined>`): 条件を満たす先頭の連続した要素を生成する遅延評価のイテレータです。ネイティブのイテレータヘルパー（`map`、`take`、`toArray` など）をすべて備えているため、そのままチェーンを続けられます。

### `pipe` と一緒に使う `takeWhile(shouldContinue)`

[`pipe`](../../fp/reference/pipe.md) で変換をつなげるときは、`es-toolkit/fp/iterator` からカリー化された形式をインポートしてください。条件関数だけを受け取り、イテレータを受け取る関数を返します。

```typescript
import { pipe } from 'es-toolkit/fp';
import { takeWhile, toArray } from 'es-toolkit/fp/iterator';

pipe(
  [1, 2, 3, 1].values(),
  takeWhile(x => x < 3),
  toArray()
);
// 結果: [1, 2]
```
