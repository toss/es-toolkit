# some (`Iterator`向け)

イテレータのいずれかの要素が条件を満たすかどうかを返す関数を作成します。関数型プログラミングの [`pipe`](../../fp/reference/pipe.md) と一緒に使用します。

```typescript
const result = pipe(source, some(predicate));
```

::: info

パイプラインとして組み合わせない通常のコードでは、ネイティブの [`Iterator.prototype.some`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/some)（`source.some(predicate)`）を使うのがおすすめです。`pipe` で変換をつなげるときは、この `es-toolkit/fp/iterator` 版を使用してください。

:::

## 使用法

### `some(predicate)`

`some` は終端操作です。`predicate` が真と評価される値を返すまでイテレータを消費し、条件を満たす要素があったかどうかを返します。最初に条件を満たした時点で取り出しを停止するため、条件を満たす要素が現れる限り、無限イテレータでも完了できます。ネイティブの `Iterator.prototype.some` に処理を委譲します。

```typescript
import { pipe } from 'es-toolkit/fp';
import { some } from 'es-toolkit/fp/iterator';

// 偶数が見つかった時点で停止します。
pipe([1, 3, 4, 5].values(), some(x => x % 2 === 0));
// 結果: true

pipe([1, 3, 5].values(), some(x => x % 2 === 0));
// 結果: false
```

#### パラメータ

- `predicate` (`(value: T, index: number) => unknown`): 各要素とそのインデックスとともに呼び出されます。真と評価される値を返すと、その時点で打ち切って `true` になります。

#### 戻り値

(`(source: Iterator<T>) => boolean`): イテレータを消費し、条件を満たす要素があったかどうかを返す関数です。
