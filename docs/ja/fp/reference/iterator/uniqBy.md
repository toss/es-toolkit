# uniqBy (`Iterator`)

変換したキーがまだ登場していないイテレータの要素を遅延的に生成する関数を作成します。関数型プログラミングの [`pipe`](../pipe.md) と一緒に使用します。

```typescript
const result = pipe(source, uniqBy(getKey));
```

::: info

パイプラインとして組み合わせない通常のコードでは、`es-toolkit/iterator` の [`uniqBy`](../../../reference/iterator/uniqBy.md)（`uniqBy(source, getKey)`）を使うのがおすすめです。`pipe` で変換をつなげるときは、この `es-toolkit/fp/iterator` 版を使用してください。

:::

## 使用法

### `uniqBy(getKey)`

`uniqBy` はキー関数を受け取り、キーが初めて登場した要素を元の順序のまま生成する関数を返します。キーは `Set` が値を比べるのと同じ方法で比較されます。

```typescript
import { pipe } from 'es-toolkit/fp';
import { toArray, uniqBy } from 'es-toolkit/fp/iterator';

// 整数部分ごとに最初の数を残します。
pipe([1.1, 1.2, 2.3, 2.4].values(), uniqBy(Math.floor), toArray());
// 結果: [1.1, 2.3]
```

#### パラメータ

- `getKey` (`(value: T) => K`): 要素を、重複の検出に使うキーに変換します。

#### 戻り値

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): イテレータを、重複したキーを持つ要素を取り除いた遅延評価のイテレータに変換する関数です。
