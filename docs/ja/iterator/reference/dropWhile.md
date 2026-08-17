# dropWhile (`Iterator`向け)

条件が成り立つ間、イテレータの先頭の要素を遅延的にスキップし、残りの要素を生成します。

```typescript
const rest = dropWhile(source, shouldDrop);
```

## 使用法

### `dropWhile(source, shouldDrop)`

決まった個数ではなく条件に基づいて先頭の要素をスキップしたいときに `dropWhile` を使用してください。たとえば、最初のエラーが現れるまでログの行を読み飛ばす場合などです。`shouldDrop` が真と評価される値を返す間、要素はスキップされます。条件を満たさなかった最初の要素からは、その要素自身も含めてすべて生成されます。ネイティブのイテレータヘルパーには個数ベースの `drop` はありますが、条件ベースの `dropWhile` はないため、この関数が提供されています。

```typescript
import { dropWhile } from 'es-toolkit/iterator';

// 先頭に連続する小さい数をスキップします。
dropWhile([1, 2, 3, 1].values(), x => x < 3).toArray();
// 結果: [3, 1]

// 最初の要素が条件を満たさなければ、何もスキップされません。
dropWhile([5, 1, 2].values(), x => x < 3).toArray();
// 結果: [5, 1, 2]
```

#### パラメータ

- `source` (`Iterator<T>`): 要素をスキップする対象のイテレータです。
- `shouldDrop` (`(value: T, index: number) => boolean`): 各要素とそのインデックスとともに呼び出されます。真と評価される値を返す間、要素がスキップされます。

#### 戻り値

(`IteratorObject<T, undefined>`): スキップされた先頭部分の後の要素を生成する遅延評価のイテレータです。ネイティブのイテレータヘルパー（`map`、`take`、`toArray` など）をすべて備えているため、そのままチェーンを続けられます。

### `pipe` と一緒に使う `dropWhile(shouldDrop)`

[`pipe`](../../fp/reference/pipe.md) で変換をつなげるときは、`es-toolkit/fp/iterator` からカリー化された形式をインポートしてください。条件関数だけを受け取り、イテレータを受け取る関数を返します。

```typescript
import { pipe } from 'es-toolkit/fp';
import { dropWhile, toArray } from 'es-toolkit/fp/iterator';

pipe(
  [1, 2, 3, 1].values(),
  dropWhile(x => x < 3),
  toArray()
);
// 結果: [3, 1]
```
