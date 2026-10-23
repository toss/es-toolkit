# zip (`Iterator`)

イテレータの要素を、別のイテレータの要素と遅延的にペアにする関数を作成します。関数型プログラミングの [`pipe`](../pipe.md) と一緒に使用します。

```typescript
const result = pipe(source, zip(other));
```

::: info

パイプラインとして組み合わせない通常のコードでは、`es-toolkit/iterator` の [`zip`](../../../reference/iterator/zip.md)（`zip(source, other)`）を使うのがおすすめです。`pipe` で変換をつなげるときは、この `es-toolkit/fp/iterator` 版を使用してください。

:::

## 使用法

### `zip(other)`

`zip` は別のイテレータを 1 つ受け取り、パイプで渡されたイテレータの要素と `other` の要素を 1 つずつペアにする関数を返します。どちらかのイテレータが尽きた時点でイテレーションが停止します。

```typescript
import { pipe } from 'es-toolkit/fp';
import { toArray, zip } from 'es-toolkit/fp/iterator';

// それぞれの数を文字とペアにします。
pipe([1, 2, 3].values(), zip(['a', 'b', 'c'].values()), toArray());
// 結果: [[1, 'a'], [2, 'b'], [3, 'c']]
```

#### パラメータ

- `other` (`Iterator<U>`): パイプで渡されたイテレータとペアにするイテレータです。

#### 戻り値

(`(source: Iterator<T>) => IteratorObject<[T, U], undefined>`): イテレータを、`[element, otherElement]` のペアを生成する遅延評価のイテレータに変換する関数です。
