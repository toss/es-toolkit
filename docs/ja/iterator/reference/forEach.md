# forEach (関数型プログラミング)

イテレータを消費し、各要素に対してコールバックを実行する関数を作成します。関数型プログラミングの [`pipe`](../../fp/reference/pipe.md) と一緒に使用します。

```typescript
pipe(source, forEach(callback));
```

::: info

パイプラインとして組み合わせない通常のコードでは、ネイティブの [`Iterator.prototype.forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/forEach)（`source.forEach(callback)`）を使うのがおすすめです。`pipe` で変換をつなげるときは、この `es-toolkit/fp/iterator` 版を使用してください。

:::

## 使用法

### `forEach(callback)`

`forEach` は副作用のための終端操作です。すべての要素を取り出し、それぞれに対して `callback` を実行します。イテレータ全体を消費するため、無限イテレータに対して使用してはいけません。ネイティブの `Iterator.prototype.forEach` に処理を委譲します。

```typescript
import { pipe } from 'es-toolkit/fp';
import { filter, forEach } from 'es-toolkit/fp/iterator';

// 各偶数をログに出力します。
pipe(
  [1, 2, 3, 4].values(),
  filter(x => x % 2 === 0),
  forEach(x => console.log(x))
);
// 出力: 2, 4
```

#### パラメータ

- `callback` (`(value: T, index: number) => void`): 各要素とそのインデックスとともに呼び出されます。

#### 戻り値

(`(source: Iterator<T>) => void`): イテレータを消費し、何も返さない関数です。
