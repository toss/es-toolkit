# pick (関数型プログラミング)

オブジェクトから指定したキーだけを残す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(obj, pick(keys));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`pick`](../../reference/object/pick.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`pick` は、入力オブジェクトから指定した `keys` だけを含む新しいオブジェクトを返します。入力に存在しないキーはスキップされます。

```typescript
import { pick, pipe } from 'es-toolkit/fp';

pipe({ a: 1, b: 2, c: 3 }, pick(['a', 'c'])); // => { a: 1, c: 3 }
```

#### パラメータ

- `keys` (`readonly K[]`): 新しいオブジェクトにコピーするキーです。

#### 戻り値

(`(obj: T) => Pick<T, K>`): オブジェクト `T` を、選んだキーだけを持つ新しいオブジェクトに変換する関数です。
