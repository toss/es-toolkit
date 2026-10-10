# head (`Iterator`)

イテレータの最初の要素を返し、空の場合は `undefined` を返す関数を作成します。関数型プログラミングの [`pipe`](../pipe.md) と一緒に使用します。

```typescript
const result = pipe(source, head());
```

::: info

パイプラインとして組み合わせない通常のコードでは、`es-toolkit/iterator` の [`head`](../../../reference/iterator/head.md)（`head(source)`）を使うのがおすすめです。`pipe` で変換をつなげるときは、この `es-toolkit/fp/iterator` 版を使用してください。

:::

## 使用法

### `head()`

`head` はイテレータのパイプラインの終端操作です。要素を 1 つだけ取り出した後、ソースのイテレータを `return` メソッドを通じて閉じるため、無限イテレータでも安全に使用できます。

```typescript
import { pipe } from 'es-toolkit/fp';
import { filter, head } from 'es-toolkit/fp/iterator';

// 最初の偶数を取り出します。
pipe(
  [1, 2, 3, 4].values(),
  filter(x => x % 2 === 0),
  head()
);
// 結果: 2
```

#### 戻り値

(`(source: Iterator<T>) => T | undefined`): イテレータの最初の要素を返す関数です。イテレータが何も生成しない場合は `undefined` を返します。
