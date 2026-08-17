# map (`Iterator`向け)

イテレータの各要素を遅延的に変換する関数を作成します。関数型プログラミングの [`pipe`](../../fp/reference/pipe.md) と一緒に使用します。

```typescript
const result = pipe(source, map(callback));
```

::: info

パイプラインとして組み合わせない通常のコードでは、ネイティブの [`Iterator.prototype.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/map)（`source.map(callback)`）を使うのがおすすめです。`pipe` で変換をつなげるときは、この `es-toolkit/fp/iterator` 版を使用してください。

:::

## 使用法

### `map(callback)`

`map` は変換関数を受け取り、イテレータを遅延的に変換する関数を返します。各要素は取り出されるときにのみ変換されるため、途中で打ち切るステップと組み合わせても余分な処理を行いません。ネイティブの `Iterator.prototype.map` に処理を委譲します。

```typescript
import { pipe } from 'es-toolkit/fp';
import { map, take, toArray } from 'es-toolkit/fp/iterator';

// 遅延的に変換します。消費される 2 個の要素だけが計算されます。
pipe([1, 2, 3, 4].values(), map(x => x * 10), take(2), toArray());
// 結果: [10, 20]
```

#### パラメータ

- `callback` (`(value: T, index: number) => U`): 各要素とそのインデックスとともに呼び出されます。変換した要素を返します。

#### 戻り値

(`(source: Iterator<T>) => IteratorObject<U, undefined>`): イテレータを、変換された要素を生成する遅延評価のイテレータに変換する関数です。
