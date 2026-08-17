# cartesianProduct (`Iterator`)

ソースイテレータのデカルト積を遅延的に計算します。

```typescript
const pairs = cartesianProduct(source1, source2);
```

## 使用法

### `cartesianProduct(...sources)`

複数のシーケンスから要素のすべての組み合わせが必要なときに `cartesianProduct` を使用してください。例えば、すべてのユーザーとすべてのロールを組み合わせたり、パラメータの集合からテストケースを生成したりする場合です。タプルは辞書式順序で生成されます。配列版の [`cartesianProduct`](../../reference/array/cartesianProduct.md) と同様に、最も右のソースがオドメーターの桁のように最も速く進みます。

最初のソース以外は何度も走査されるため、反復の開始時に配列としてバッファリングされます。最初のソースは要素を 1 つずつ遅延的に消費するので、無限イテレータでも構いません。反復が終わると — 最初のソースが尽きた場合も、他のソースが空だった場合も、消費側が早く止まった場合も — すべてのソースが `return` メソッドを通じて閉じられます。

ソースを渡さない場合は、空のタプルを 1 つだけ生成します。いずれかのソースが空の場合は、何も生成しません。

```typescript
import { cartesianProduct, range } from 'es-toolkit/iterator';

// 最初のソースのすべての要素を、2 番目のソースのすべての要素と組み合わせます。
cartesianProduct([1, 2].values(), ['a', 'b'].values()).toArray();
// 戻り値: [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

// 最も右のソースが最も速く進みます。
cartesianProduct([0, 1].values(), [0, 1].values(), [0, 1].values()).toArray();
// 戻り値: [[0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, 1], [1, 0, 0], [1, 0, 1], [1, 1, 0], [1, 1, 1]]

// 最初のソースは無限でも構いません。タプルは必要になるたびに生成されます。
cartesianProduct(range(0, Infinity), ['a', 'b'].values()).take(3).toArray();
// 戻り値: [[0, 'a'], [0, 'b'], [1, 'a']]
```

#### パラメータ

- `sources` (`Array<Iterator<unknown>>`): 積を計算するイテレータ。

#### 戻り値

(`IteratorObject<[...], undefined>`): デカルト積を表すタプルを生成する遅延イテレータ。型はソースに従って決まります。すべてのネイティブイテレータヘルパー(`map`、`take`、`toArray` など)を備えているため、続けてチェーンできます。

### `pipe` と組み合わせる `cartesianProduct(other)`

[`pipe`](../../fp/reference/pipe.md) で変換を合成する場合は、`es-toolkit/fp/iterator` からカリー化された形式をインポートしてください。他のイテレータを 1 つ受け取り、パイプで渡されたイテレータのすべての要素をそのイテレータのすべての要素と組み合わせます。他のイテレータ側がより速く進みます。

```typescript
import { pipe } from 'es-toolkit/fp';
import { cartesianProduct, toArray } from 'es-toolkit/fp/iterator';

pipe([1, 2].values(), cartesianProduct(['a', 'b'].values()), toArray());
// 戻り値: [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
```
