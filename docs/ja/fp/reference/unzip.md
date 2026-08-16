# unzip (関数型プログラミング)

zip された配列を位置ごとに再グループ化する関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, unzip());
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`unzip`](../../reference/array/unzip.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`unzip` はグループ化された値の配列を受け取り、各位置の値を集めた配列を返します。

返される配列の長さは最も長い内部配列の長さに合わせられ、短い内部配列で足りない位置は `undefined` で埋められます。

```typescript
import { pipe, unzip } from 'es-toolkit/fp';

pipe(
  [
    [1, 'a'],
    [2, 'b'],
  ],
  unzip()
); // => [[1, 2], ['a', 'b']]
```

#### パラメータ

この関数は引数を受け取りません。`unzip()` のように呼び出してください。

#### 戻り値

(`(zipped: ReadonlyArray<[...T]>) => Unzip<T>`): zip された行を位置ごとの配列に変換する関数です。
