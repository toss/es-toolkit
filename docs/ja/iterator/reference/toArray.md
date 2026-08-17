# toArray (`Iterator`向け)

イテレータの要素を配列に集める関数を作成します。関数型プログラミングの [`pipe`](../../fp/reference/pipe.md) と一緒に使用します。

```typescript
const result = pipe(source, toArray());
```

::: info

パイプラインとして組み合わせない通常のコードでは、ネイティブの [`Iterator.prototype.toArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/toArray)（`source.toArray()`）を使うのがおすすめです。`pipe` で変換をつなげるときは、この `es-toolkit/fp/iterator` 版を使用してください。

:::

## 使用法

### `toArray()`

`toArray` はイテレータのパイプラインで最も一般的な終端操作です。すべての要素を取り出し、配列として返します。イテレータ全体を消費するため、無限イテレータに対して使用してはいけません。先に [`take`](./take.md) や [`takeWhile`](./takeWhile.md) でパイプラインを区切ってください。ネイティブの `Iterator.prototype.toArray` に処理を委譲します。

```typescript
import { pipe } from 'es-toolkit/fp';
import { map, toArray } from 'es-toolkit/fp/iterator';

// 変換された要素を配列にします。
pipe([1, 2, 3].values(), map(x => x * 2), toArray());
// 結果: [2, 4, 6]
```

#### 戻り値

(`(source: Iterator<T>) => T[]`): イテレータを消費し、その要素を配列として返す関数です。
