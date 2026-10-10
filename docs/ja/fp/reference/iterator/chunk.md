# chunk (`Iterator`)

イテレータの要素を、指定した長さの配列に遅延的にまとめる関数を作成します。関数型プログラミングの [`pipe`](../pipe.md) と一緒に使用します。

```typescript
const result = pipe(source, chunk(size));
```

::: info

パイプラインとして組み合わせない通常のコードでは、`es-toolkit/iterator` の [`chunk`](../../../reference/iterator/chunk.md)（`chunk(source, size)`）を使うのがおすすめです。`pipe` で変換をつなげるときは、この `es-toolkit/fp/iterator` 版を使用してください。

:::

## 使用法

### `chunk(size)`

`chunk` は長さを受け取り、イテレータの要素をその長さの配列にまとめる関数を返します。各配列は取り出されるときにのみ作られ、最後の配列は他より短くなることがあります。

```typescript
import { pipe } from 'es-toolkit/fp';
import { chunk, toArray } from 'es-toolkit/fp/iterator';

// 数を 2 個ずつまとめます。
pipe([1, 2, 3, 4, 5].values(), chunk(2), toArray());
// 結果: [[1, 2], [3, 4], [5]]
```

#### パラメータ

- `size` (`number`): 各チャンクの長さです。0 より大きい整数である必要があります。

#### 戻り値

(`(source: Iterator<T>) => IteratorObject<T[], undefined>`): イテレータを、最大 `size` 個の要素を持つ配列を生成する遅延評価のイテレータに変換する関数です。

#### エラー

`size` が 0 より大きい整数でない場合、エラーを投げます。
