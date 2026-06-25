# omit (関数型プログラミング)

オブジェクトから指定したキーを取り除く関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(obj, omit(keys));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`omit`](../../reference/object/omit.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`omit` は、入力オブジェクトから指定した `keys` を取り除いた新しいオブジェクトを返します。

```typescript
import { omit, pipe } from 'es-toolkit/fp';

pipe({ a: 1, b: 2, c: 3 }, omit(['b', 'c'])); // => { a: 1 }
```

#### パラメータ

- `keys` (`readonly K[]`): 新しいオブジェクトから除外するキーです。

#### 戻り値

(`(obj: T) => Omit<T, K>`): オブジェクト `T` を、除外したキーを持たない新しいオブジェクトに変換する関数です。
