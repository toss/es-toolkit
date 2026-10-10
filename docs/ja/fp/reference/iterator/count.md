# count (`Iterator`)

イテレータを消費して、生成される要素の数を返す関数を作成します。関数型プログラミングの [`pipe`](../pipe.md) と一緒に使用します。

```typescript
const result = pipe(source, count());
```

::: info

パイプラインとして組み合わせない通常のコードでは、`es-toolkit/iterator` の [`count`](../../../reference/iterator/count.md)（`count(source)`）を使うのがおすすめです。`pipe` で変換をつなげるときは、この `es-toolkit/fp/iterator` 版を使用してください。

:::

## 使用法

### `count()`

`count` はイテレータのパイプラインの終端操作です。すべての要素を取り出し、その数を返します。イテレータ全体を消費するため、無限イテレータに対して使用してはいけません。

```typescript
import { pipe } from 'es-toolkit/fp';
import { count, filter } from 'es-toolkit/fp/iterator';

// 偶数の個数を数えます。
pipe(
  [1, 2, 3, 4].values(),
  filter(x => x % 2 === 0),
  count()
);
// 結果: 2
```

#### 戻り値

(`(source: Iterator<T>) => number`): イテレータを消費し、生成された要素の数を返す関数です。
