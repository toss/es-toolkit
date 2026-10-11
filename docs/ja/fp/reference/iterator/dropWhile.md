# dropWhile (`Iterator`)

条件が成り立つ間、イテレータの先頭の要素を遅延的にスキップし、残りの要素を生成する関数を作成します。関数型プログラミングの [`pipe`](../pipe.md) と一緒に使用します。

```typescript
const result = pipe(source, dropWhile(shouldDrop));
```

::: info

パイプラインとして組み合わせない通常のコードでは、`es-toolkit/iterator` の [`dropWhile`](../../../reference/iterator/dropWhile.md)（`dropWhile(source, shouldDrop)`）を使うのがおすすめです。`pipe` で変換をつなげるときは、この `es-toolkit/fp/iterator` 版を使用してください。

:::

## 使用法

### `dropWhile(shouldDrop)`

`dropWhile` は条件関数を受け取り、条件関数が真と評価される値を返す間、要素をスキップする関数を返します。偽と評価される値を返した最初の要素からは、その要素も含めて残りのすべての要素が生成されます。

```typescript
import { pipe } from 'es-toolkit/fp';
import { dropWhile, toArray } from 'es-toolkit/fp/iterator';

// 先頭にある 3 未満の数をスキップします。
pipe(
  [1, 2, 3, 1].values(),
  dropWhile(x => x < 3),
  toArray()
);
// 結果: [3, 1]
```

#### パラメータ

- `shouldDrop` (`(value: T, index: number) => boolean`): 各要素とそのインデックスとともに呼び出されます。真と評価される値を返す間、要素がスキップされます。

#### 戻り値

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): イテレータを、スキップされた先頭部分の後の要素を生成する遅延評価のイテレータに変換する関数です。
