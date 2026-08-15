# windowed (関数型プログラミング)

配列からスライディングウィンドウを返す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, windowed(size, step, options));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`windowed`](../../reference/array/windowed.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`windowed` は長さ `size` のサブ配列を返し、毎回 `step` ずつ前に進みます。完全なウィンドウだけを返す形式は [`pipe`](./pipe.md) の中で遅延評価に対応しています。

```typescript
import { pipe, windowed } from 'es-toolkit/fp';

pipe([1, 2, 3, 4], windowed(2)); // => [[1, 2], [2, 3], [3, 4]]

pipe([1, 2, 3, 4], windowed(2, 2)); // => [[1, 2], [3, 4]]
```

#### パラメータ

- `size` (`number`): 各ウィンドウの長さです。
- `step` (`number, optional`): ウィンドウ間で進む位置数です。デフォルトは `1` です。
- `options` (`WindowedOptions, optional`): 末尾の部分ウィンドウを含めるかどうかなどのオプションです。

#### 戻り値

(`(array: readonly T[]) => T[][]`): `readonly T[]` をスライディングウィンドウの配列に変換する関数です。

#### エラー

`size` または `step` が正の整数でない場合、エラーを投げます。
