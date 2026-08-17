# find (`Iterator`向け)

条件を満たすイテレータの最初の要素を返す関数を作成します。関数型プログラミングの [`pipe`](../../fp/reference/pipe.md) と一緒に使用します。

```typescript
const result = pipe(source, find(predicate));
```

::: info

パイプラインとして組み合わせない通常のコードでは、ネイティブの [`Iterator.prototype.find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/find)（`source.find(predicate)`）を使うのがおすすめです。`pipe` で変換をつなげるときは、この `es-toolkit/fp/iterator` 版を使用してください。

:::

## 使用法

### `find(predicate)`

`find` は終端操作です。`predicate` が真と評価される値を返すまでイテレータを消費し、その要素を返します。どの要素も条件を満たさない場合は `undefined` を返します。最初に条件を満たした時点で取り出しを停止してソースを閉じるため、条件を満たす要素が現れる限り、無限イテレータでも安全に使用できます。ネイティブの `Iterator.prototype.find` に処理を委譲します。

```typescript
import { pipe } from 'es-toolkit/fp';
import { find } from 'es-toolkit/fp/iterator';

// しきい値を超える最初の要素を返します。
pipe([1, 2, 3, 4].values(), find(x => x > 2));
// 結果: 3

// 条件を満たす要素がなければ undefined になります。
pipe([1, 2].values(), find(x => x > 10));
// 結果: undefined
```

#### パラメータ

- `predicate` (`(value: T, index: number) => unknown`): 各要素とそのインデックスとともに呼び出されます。真と評価される値を返すと、その要素が選ばれます。

#### 戻り値

(`(source: Iterator<T>) => T | undefined`): イテレータを消費し、条件を満たす最初の要素、または `undefined` を返す関数です。
