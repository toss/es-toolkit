# every (`Iterator`)

イテレータのすべての要素が条件を満たすかどうかを返す関数を作成します。関数型プログラミングの [`pipe`](../../fp/reference/pipe.md) と一緒に使用します。

```typescript
const result = pipe(source, every(predicate));
```

::: info

パイプラインとして組み合わせない通常のコードでは、ネイティブの [`Iterator.prototype.every`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/every)（`source.every(predicate)`）を使うのがおすすめです。`pipe` で変換をつなげるときは、この `es-toolkit/fp/iterator` 版を使用してください。

:::

## 使用法

### `every(predicate)`

`every` は終端操作です。`predicate` が偽と評価される値を返すまでイテレータを消費し、すべての要素が条件を満たしたかどうかを返します。条件を満たさない最初の要素で取り出しを停止するため、条件を満たさない要素が現れる限り、無限イテレータでも完了できます。ネイティブの `Iterator.prototype.every` に処理を委譲します。

```typescript
import { pipe } from 'es-toolkit/fp';
import { every } from 'es-toolkit/fp/iterator';

// すべての要素が偶数です。
pipe([2, 4, 6].values(), every(x => x % 2 === 0));
// 結果: true

// 最初の奇数で停止します。
pipe([2, 3, 4].values(), every(x => x % 2 === 0));
// 結果: false
```

#### パラメータ

- `predicate` (`(value: T, index: number) => unknown`): 各要素とそのインデックスとともに呼び出されます。偽と評価される値を返すと、その時点で打ち切って `false` になります。

#### 戻り値

(`(source: Iterator<T>) => boolean`): イテレータを消費し、すべての要素が条件を満たしたかどうかを返す関数です。
