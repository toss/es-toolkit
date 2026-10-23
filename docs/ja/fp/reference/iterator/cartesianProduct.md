# cartesianProduct (`Iterator`)

イテレータと別のイテレータのデカルト積を遅延的に計算する関数を作成します。関数型プログラミングの [`pipe`](../pipe.md) と一緒に使用します。

```typescript
const result = pipe(source, cartesianProduct(other));
```

::: info

パイプラインとして組み合わせない通常のコードでは、`es-toolkit/iterator` の [`cartesianProduct`](../../../reference/iterator/cartesianProduct.md)（`cartesianProduct(source, other)`）を使うのがおすすめです。`pipe` で変換をつなげるときは、この `es-toolkit/fp/iterator` 版を使用してください。

:::

## 使用法

### `cartesianProduct(other)`

`cartesianProduct` は別のイテレータを 1 つ受け取り、パイプで渡されたイテレータのすべての要素を `other` のすべての要素と組み合わせる関数を返します。`other` の要素がオドメーターの桁のように最も速く進みます。`other` は反復の開始時に配列として読み込まれますが、パイプで渡されたイテレータは遅延的に読み込まれるため、パイプで渡されたイテレータは無限でも構いません。

```typescript
import { pipe } from 'es-toolkit/fp';
import { cartesianProduct, toArray } from 'es-toolkit/fp/iterator';

// すべての数をすべての文字と組み合わせます。
pipe([1, 2].values(), cartesianProduct(['a', 'b'].values()), toArray());
// 結果: [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
```

#### パラメータ

- `other` (`Iterator<U>`): 積を計算する相手のイテレータです。

#### 戻り値

(`(source: Iterator<T>) => IteratorObject<[T, U], undefined>`): イテレータを、`[element, otherElement]` のペアを生成する遅延評価のイテレータに変換する関数です。
