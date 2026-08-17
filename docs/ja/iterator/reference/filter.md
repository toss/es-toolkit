# filter (関数型プログラミング)

条件を満たすイテレータの要素だけを遅延的に残す関数を作成します。関数型プログラミングの [`pipe`](../../fp/reference/pipe.md) と一緒に使用します。

```typescript
const result = pipe(source, filter(predicate));
```

::: info

パイプラインとして組み合わせない通常のコードでは、ネイティブの [`Iterator.prototype.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/filter)（`source.filter(predicate)`）を使うのがおすすめです。`pipe` で変換をつなげるときは、この `es-toolkit/fp/iterator` 版を使用してください。

:::

## 使用法

### `filter(predicate)`

`filter` は条件関数を受け取り、条件関数が真と評価される値を返した要素だけを遅延的に残す関数を返します。条件関数が型ガード（`(value): value is S`）の場合、要素の型はそれに応じて絞り込まれます。ネイティブの `Iterator.prototype.filter` に処理を委譲します。

```typescript
import { pipe } from 'es-toolkit/fp';
import { filter, toArray } from 'es-toolkit/fp/iterator';

// 偶数だけを残します。
pipe([1, 2, 3, 4].values(), filter(x => x % 2 === 0), toArray());
// 結果: [2, 4]
```

#### パラメータ

- `predicate` (`(value: T, index: number) => unknown`): 各要素とそのインデックスとともに呼び出されます。真と評価される値を返すと、その要素が残ります。

#### 戻り値

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): イテレータを、残った要素を生成する遅延評価のイテレータに変換する関数です。
