# zip (`Iterator`向け)

複数のイテレータを、タプルからなる 1 つのイテレータに遅延的に結合します。

```typescript
const pairs = zip(source1, source2);
```

## 使用法

### `zip(...sources)`

複数のシーケンスを足並みをそろえて走査したいときに `zip` を使用してください。たとえば、インデックスと値、名前とスコアをペアにする場合などです。対応する位置の要素がタプルにまとめられ、**最も短い** ソースが尽きた時点でイテレーションが停止します。（配列版の [`zip`](../../reference/array/zip.md) のように最も長いソースに合わせて埋めるのではなく）最も短いソースで停止するからこそ、有限のイテレータと無限のイテレータを安全に組み合わせられます。イテレーションが終了すると — ソースが尽きた場合でも、消費側が早期に停止した場合でも — すべてのソースが `return` メソッドを通じて閉じられます。

```typescript
import { zip } from 'es-toolkit/iterator';

// 対応する位置の要素をペアにします。
zip([1, 2, 3].values(), ['a', 'b', 'c'].values()).toArray();
// 結果: [[1, 'a'], [2, 'b'], [3, 'c']]

// 最も短いソースが結果の長さを決めます。
zip([1, 2, 3].values(), ['a', 'b'].values()).toArray();
// 結果: [[1, 'a'], [2, 'b']]

// 上限のないカウンターで任意のシーケンスに番号を付けます。
import { range } from 'es-toolkit/iterator';

zip(range(0, Infinity), ['a', 'b', 'c'].values()).toArray();
// 結果: [[0, 'a'], [1, 'b'], [2, 'c']]
```

#### パラメータ

- `sources` (`Array<Iterator<unknown>>`): まとめて結合するイテレータです。

#### 戻り値

(`IteratorObject<[...], undefined>`): ペアにした要素のタプルを生成する遅延評価のイテレータで、型はソースに応じて決まります。ネイティブのイテレータヘルパー（`map`、`take`、`toArray` など）をすべて備えているため、そのままチェーンを続けられます。

### `pipe` と一緒に使う `zip(other)`

[`pipe`](../../fp/reference/pipe.md) で変換をつなげるときは、`es-toolkit/fp/iterator` からカリー化された形式をインポートしてください。もう 1 つのイテレータを受け取り、パイプで渡されたイテレータの要素とペアにします。

```typescript
import { pipe } from 'es-toolkit/fp';
import { toArray, zip } from 'es-toolkit/fp/iterator';

pipe([1, 2, 3].values(), zip(['a', 'b', 'c'].values()), toArray());
// 結果: [[1, 'a'], [2, 'b'], [3, 'c']]
```
